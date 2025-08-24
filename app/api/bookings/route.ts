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
    const status = searchParams.get("status")

    const query: any = {
      userId: session.user.id,
    }

    if (status) {
      query.status = status
    }

    const bookings = await prisma.booking.findMany({
      where: query,
      include: {
        ride: {
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
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    return NextResponse.json(bookings)
  } catch (error) {
    console.error("Error fetching bookings:", error)
    return NextResponse.json({ error: "Failed to fetch bookings" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { rideId, seats } = body

    // Validate required fields
    if (!rideId || !seats) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Check if ride exists and has enough seats
    const ride = await prisma.ride.findUnique({
      where: {
        id: rideId,
      },
    })

    if (!ride) {
      return NextResponse.json({ error: "Ride not found" }, { status: 404 })
    }

    if (ride.bookedSeats + seats > ride.seats) {
      return NextResponse.json({ error: "Not enough seats available" }, { status: 400 })
    }

    // Create the booking and update ride's booked seats
    const booking = await prisma.$transaction(async (prisma) => {
      const newBooking = await prisma.booking.create({
        data: {
          rideId,
          userId: session.user.id,
          seats,
        },
      })

      await prisma.ride.update({
        where: {
          id: rideId,
        },
        data: {
          bookedSeats: {
            increment: seats,
          },
        },
      })

      return newBooking
    })

    return NextResponse.json(booking)
  } catch (error) {
    console.error("Error creating booking:", error)
    return NextResponse.json({ error: "Failed to create booking" }, { status: 500 })
  }
}
