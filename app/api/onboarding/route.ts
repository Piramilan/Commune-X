import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { usersTable } from "@/src/db/schema";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const role = body?.role as "CUSTOMER" | "WORKER";
    if (!role)
      return NextResponse.json({ error: "Role required" }, { status: 400 });

    // Persist role to users table (by Clerk ID) and mark onboarding as completed
    await db
      .update(usersTable)
      .set({ role, onboardingCompleted: true })
      .where(eq(usersTable.clerkId, userId));

    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json(
      { error: "Failed to save onboarding" },
      { status: 500 }
    );
  }
}
