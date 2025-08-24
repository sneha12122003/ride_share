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

    // Get all chats where the user is a participant
    const chats = await prisma.chat.findMany({
      where: {
        userIds: {
          has: session.user.id,
        },
      },
      include: {
        messages: {
          orderBy: {
            createdAt: "desc",
          },
          take: 1,
        },
      },
      orderBy: {
        updatedAt: "desc",
      },
    })

    // Get user details for each chat
    const chatsWithUsers = await Promise.all(
      chats.map(async (chat) => {
        const otherUserIds = chat.userIds.filter((id) => id !== session.user.id)
        const users = await prisma.user.findMany({
          where: {
            id: {
              in: otherUserIds,
            },
          },
          select: {
            id: true,
            name: true,
            image: true,
          },
        })

        return {
          ...chat,
          users,
          lastMessage: chat.messages[0] || null,
        }
      }),
    )

    return NextResponse.json(chatsWithUsers)
  } catch (error) {
    console.error("Error fetching chats:", error)
    return NextResponse.json({ error: "Failed to fetch chats" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { userId } = body

    // Validate required fields
    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 })
    }

    // Check if chat already exists
    const existingChat = await prisma.chat.findFirst({
      where: {
        AND: [
          {
            userIds: {
              has: session.user.id,
            },
          },
          {
            userIds: {
              has: userId,
            },
          },
        ],
      },
    })

    if (existingChat) {
      return NextResponse.json(existingChat)
    }

    // Create new chat
    const chat = await prisma.chat.create({
      data: {
        userIds: [session.user.id, userId],
      },
    })

    return NextResponse.json(chat)
  } catch (error) {
    console.error("Error creating chat:", error)
    return NextResponse.json({ error: "Failed to create chat" }, { status: 500 })
  }
}
