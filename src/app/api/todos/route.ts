import { NextRequest, NextResponse } from "next/server";
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

/**
 * List all tasks with filters
 * @param req 
 * @returns 
 */
export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const filter = url.searchParams.get("filter");
    const tasks: Task[] = (await redis.get("tasks")) || [];

    let filteredTasks: {
      id: number;
      title: string;
      completed: boolean;
    }[] = JSON.parse(JSON.stringify(tasks));

    if (filter === "completed") {
      filteredTasks = filteredTasks.filter(task => task.completed);
    } else if (filter === "incomplete") {
      filteredTasks = filteredTasks.filter(task => !task.completed);
    }

    return NextResponse.json(filteredTasks);
  } catch (error) {
    console.error({ error });
    return NextResponse.json({ error: "Failed to fetch tasks." }, { status: 500 });
  }
}

/**
 * Create a new task
 * @param req 
 * @returns 
 */
export async function POST(req: NextRequest) {
  try {
    const { title } = await req.json();
    if (!title) {
      return NextResponse.json({ error: "Title is required." }, { status: 400 });
    }

    const newTask = { id: Date.now(), title, completed: false };
    const tasks: Task[] = (await redis.get("tasks")) || [];

    tasks.push(newTask);
    await redis.set("tasks", tasks);

    return NextResponse.json(newTask, { status: 201 });
  } catch (error) {
    console.error({ error });
    return NextResponse.json({ error: "Failed to create task." }, { status: 500 });
  }
}

/**
 * Update task status
 * @param req 
 * @returns 
 */
export async function PATCH(req: NextRequest) {
  try {
    const { id, completed } = await req.json();
    const tasks: Task[] = (await redis.get("tasks")) || [];
    const task = tasks.find(task => task.id === id);
    if (!task) {
      return NextResponse.json({ error: "Task not found." }, { status: 404 });
    }
    task.completed = completed;

    await redis.set("tasks", tasks);
    return NextResponse.json(task);
  } catch (error) {
    console.error({ error });
    return NextResponse.json({ error: "Failed to update task status." }, { status: 500 });
  }
}

/**
 * Delete a task
 * @param req 
 * @returns 
 */
export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();
    if (!id) {
      return NextResponse.json({ error: "Invalid ID." }, { status: 400 });
    }
    let tasks: Task[] = (await redis.get("tasks")) || [];

    const initialLength = tasks.length;
    tasks = tasks.filter(task => task.id !== id);

    if (tasks.length === initialLength) {
      return NextResponse.json({ error: "Task not found." }, { status: 404 });
    }

    await redis.set("tasks", tasks);
    return NextResponse.json({ message: "Task deleted successfully." });
  } catch (error) {
    console.error({ error });
    return NextResponse.json({ error: "Failed to delete task." }, { status: 500 });
  }
}
