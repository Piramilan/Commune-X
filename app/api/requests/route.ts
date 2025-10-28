import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { serviceRequestsTable } from "@/src/db/schema";
import { v4 as uuidv4 } from "uuid";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { categoryId, title, description, location, city, budget, scheduledAt } = body;

    if (!categoryId || !title || !description) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create service request
    const newRequest = {
      id: uuidv4(),
      customerId: userId,
      categoryId,
      title,
      description,
      location: location || null,
      city: city || null,
      budget: budget ? Number(budget) : null,
      dueDate: scheduledAt ? new Date(scheduledAt) : null,
      status: "PENDING",
      latitude: null,
      longitude: null,
    };

    await db.insert(serviceRequestsTable).values(newRequest);

    return NextResponse.json({ success: true, id: newRequest.id });
  } catch (error: any) {
    console.error("Error creating request:", error);
    return NextResponse.json(
      { error: "Failed to create request", details: error.message },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const requests = await db
      .select()
      .from(serviceRequestsTable)
      .where(eq(serviceRequestsTable.customerId, userId));

    return NextResponse.json({ requests });
  } catch (error) {
    console.error("Error fetching requests:", error);
    return NextResponse.json(
      { error: "Failed to fetch requests" },
      { status: 500 }
    );
  }
}

