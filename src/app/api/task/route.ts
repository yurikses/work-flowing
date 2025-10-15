import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth' // Import better-auth
import { prisma } from '@/lib/prisma' // Import Prisma client

// POST /api/task - Create a new task
export async function POST(request: Request) {
  try {
    const session = await auth.api.getSession({ headers: request.headers })
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 },
      )
    }

    const userId = session.user.id

    // Parse request body
    const body = await request.json()
    const { title, description, dueDate } = body

    // Validate input
    if (!title) {
      return NextResponse.json(
        { error: 'Title is required' },
        { status: 400 },
      )
    }

    // Create task in database
    const task = await prisma.task.create({
      data: {
        title,
        description: description || null, // Handle optional description
        dueDate: dueDate ? new Date(dueDate) : new Date(), // Use provided dueDate or default to now
        userId,
      },
    })

    return NextResponse.json(task, { status: 201 })
  }
  catch (error) {
    console.error('Error creating task:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    )
  }
  finally {
    // Note: With better-auth, Prisma connection management might be handled differently
    // or via a singleton pattern - adjust as per your setup
  }
}

export async function GET(request: Request) {
  try {
    const session = await auth.api.getSession({ headers: request.headers })
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 },
      )
    }

    const userId = session.user.id

    // Create task in database
    const tasks = await prisma.task.findMany({
      where: {
        userId,
      },
    })

    if (tasks.length === 0) {
      return NextResponse.json(
        { message: 'No tasks found', data: [] },
        { status: 200 },
      )
    }

    return NextResponse.json(tasks, { status: 200 })
  }
  catch (error) {
    console.error('Error getting tasks:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    )
  }
  finally {
    // Note: With better-auth, Prisma connection management might be handled differently
    // or via a singleton pattern - adjust as per your setup
  }
}

export async function PATCH(
  request: NextRequest,

) {
  try {
    const session = await auth.api.getSession({ headers: request.headers })
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { taskId, isActive } = body

    // Получаем ID задачи из URL параметров

    if (isNaN(taskId)) {
      return NextResponse.json({ error: 'Invalid task ID' }, { status: 400 })
    }

    const updatedTask = await prisma.task.update({
      where: {
        id: taskId,
      },
      data: {
        isActive,
      },
    })

    return NextResponse.json({ success: true, task: updatedTask }, { status: 200 })
  }
  catch (error) {
    console.error('Error updating task:', error)
    return NextResponse.json(
      { error: 'Failed to update task' },
      { status: 500 },
    )
  }
}
