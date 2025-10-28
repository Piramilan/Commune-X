import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import {
  serviceCategoriesTable,
  usersTable,
  userProfilesTable,
  servicesTable,
} from "@/src/db/schema";
import { v4 as uuidv4 } from "uuid";

export async function POST() {
  try {
    console.log("🌱 Seeding database...");

    // Create categories
    const categories = [
      {
        id: uuidv4(),
        name: "Plumbing",
        slug: "plumbing",
        description: "Plumbing services",
        icon: "🔧",
        parentId: null,
      },
      {
        id: uuidv4(),
        name: "Electrical",
        slug: "electrical",
        description: "Electrical work",
        icon: "⚡",
        parentId: null,
      },
      {
        id: uuidv4(),
        name: "Cleaning",
        slug: "cleaning",
        description: "Cleaning services",
        icon: "🧹",
        parentId: null,
      },
      {
        id: uuidv4(),
        name: "Landscaping",
        slug: "landscaping",
        description: "Garden maintenance",
        icon: "🌳",
        parentId: null,
      },
      {
        id: uuidv4(),
        name: "Handyman",
        slug: "handyman",
        description: "General repairs",
        icon: "🔨",
        parentId: null,
      },
    ];

    for (const cat of categories) {
      await db
        .insert(serviceCategoriesTable)
        .values({
          id: cat.id,
          name: cat.name,
          slug: cat.slug,
          description: cat.description,
          icon: cat.icon,
        })
        .onConflictDoNothing();
      console.log(`✅ Created: ${cat.name}`);
    }

    // Create sample worker
    const workerId = uuidv4();
    await db
      .insert(usersTable)
      .values({
        id: workerId,
        clerkId: "worker1",
        email: "john@example.com",
        firstName: "John",
        lastName: "Smith",
        role: "WORKER",
        verified: true,
      })
      .onConflictDoNothing();

    await db
      .insert(userProfilesTable)
      .values({
        id: uuidv4(),
        userId: workerId,
        phone: "+1-555-0101",
        bio: "Expert plumber",
        city: "New York",
        state: "NY",
        available: true,
        avgRating: 4.8,
        totalReviews: 127,
      })
      .onConflictDoNothing();

    return NextResponse.json({
      success: true,
      message: "Database seeded!",
      data: {
        categories: categories.length,
        workers: 1,
        services: 0,
      },
    });
  } catch (error: any) {
    console.error("Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
