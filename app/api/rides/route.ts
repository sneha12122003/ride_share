import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const source = searchParams.get("source")
    const destination = searchParams.get("destination")
    const date = searchParams.get("date")
    const seats = searchParams.get("seats")

    const query: any = {
      status: "active",
      bookedSeats: {
        lt: {
          _ref: "seats",
        },
      },
    }

    if (source) {
      query.source = {
        contains: source,
        mode: "insensitive",
      }
    }

    if (destination) {
      query.destination = {
        contains: destination,
        mode: "insensitive",
      }
    }

    if (date) {
      const searchDate = new Date(date)
      const nextDay = new Date(searchDate)
      nextDay.setDate(nextDay.getDate() + 1)

      query.date = {
        gte: searchDate,
        lt: nextDay,
      }
    }

    if (seats) {
      const seatsNum = Number.parseInt(seats)
      query.seats = {
        gte: seatsNum,
      }
    }

    const rides = await prisma.ride.findMany({
      where: query,
      include: {
        driver: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
        preferences: true,
      },
      orderBy: {
        date: "asc",
      },
    })

    // Get average rating for each driver
    const ridesWithRating = await Promise.all(
      rides.map(async (ride) => {
        const ratings = await prisma.rating.findMany({
          where: {
            userId: ride.driver.id,
          },
          select: {
            rating: true,
          },
        })

        const avgRating = ratings.length > 0 ? ratings.reduce((acc, curr) => acc + curr.rating, 0) / ratings.length : 0

        return {
          ...ride,
          driver: {
            ...ride.driver,
            rating: Number.parseFloat(avgRating.toFixed(1)),
          },
          preferences: ride.preferences.map((pref) => pref.name),
        }
      }),
    )

    return NextResponse.json(ridesWithRating)
  } catch (error) {
    console.error("Error fetching rides:", error)
    return NextResponse.json({ error: "Failed to fetch rides" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { source, destination, date, time, seats, price, vehicleModel, fuelType, notes, preferences } = body

    // Validate required fields
    if (!source || !destination || !date || !time || !seats || !price || !vehicleModel || !fuelType) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Combine date and time
    const [hours, minutes] = time.split(":").map(Number)
    const rideDate = new Date(date)
    rideDate.setHours(hours, minutes)

    // Create the ride
    const ride = await prisma.ride.create({
      data: {
        source,
        destination,
        date: rideDate,
        seats: Number.parseInt(seats),
        price: Number.parseFloat(price),
        vehicleModel,
        fuelType,
        notes,
        driver: {
          connect: {
            id: session.user.id,
          },
        },
        preferences: {
          create:
            preferences?.map((pref: string) => ({
              name: pref,
            })) || [],
        },
      },
    })

    return NextResponse.json(ride)
  } catch (error) {
    console.error("Error creating ride:", error)
    return NextResponse.json({ error: "Failed to create ride" }, { status: 500 })
  }
}
