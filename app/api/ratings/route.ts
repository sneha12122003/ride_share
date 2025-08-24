import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { bookingId, rating, review } = body

    // Validate required fields
    if (!bookingId || !rating) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Check if booking exists and belongs to the user
    const booking = await prisma.booking.findUnique({
      where: {
        id: bookingId,
      },
      include: {
        ride: {
          include: {
            driver: true,
          },
        },
      },
    })

    if (!booking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 })
    }

    if (booking.userId !== session.user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Check if rating already exists
    const existingRating = await prisma.rating.findUnique({
      where: {
        bookingId,
      },
    })

    if (existingRating) {
      return NextResponse.json({ error: "Rating already exists" }, { status: 400 })
    }

    // Create the rating
    const newRating = await prisma.rating.create({
      data: {
        bookingId,
        raterId: session.user.id,
        userId: booking.ride.driverId,
        rating,
        review,
      },
    })

    return NextResponse.json(newRating)
  } catch (error) {
    console.error("Error creating rating:", error)
    return NextResponse.json({ error: "Failed to create rating" }, { status: 500 })
  }
}
