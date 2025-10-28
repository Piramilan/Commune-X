import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { serviceCategoriesTable } from "@/src/db/schema";

export async function GET() {
  try {
    // Fetch categories from database
    const categories = await db.select().from(serviceCategoriesTable);

    return NextResponse.json({
      categories: categories.map((cat) => ({
        id: cat.id,
        name: cat.name,
        slug: cat.slug,
        description: cat.description,
        icon: cat.icon,
        _count: { services: 0 },
      })),
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json(
      { error: "Failed to fetch categories" },
      { status: 500 }
    );
  }
}
