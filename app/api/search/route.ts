import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import {
  serviceCategoriesTable,
  servicesTable,
  usersTable,
  userProfilesTable,
} from "@/src/db/schema";
import { eq, ilike, and, desc } from "drizzle-orm";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("q") || "";
    const category = searchParams.get("category") || "";

    // Build search query
    let services: any[] = [];

    if (category) {
      // Get category ID from slug
      const categoryData = await db
        .select()
        .from(serviceCategoriesTable)
        .where(eq(serviceCategoriesTable.slug, category))
        .limit(1);

      if (categoryData.length > 0) {
        const filteredServices = await db
          .select()
          .from(servicesTable)
          .where(eq(servicesTable.categoryId, categoryData[0].id))
          .limit(20);

        services = filteredServices;
      }
    } else {
      // Get all services if no category filter
      services = await db.select().from(servicesTable).limit(50);
    }

    // Get worker info for each service and group by worker
    const workersMap = new Map<string, any>();

    await Promise.all(
      services.map(async (service: any) => {
        const worker = await db
          .select()
          .from(usersTable)
          .where(eq(usersTable.id, service.workerId))
          .limit(1);

        if (worker.length > 0) {
          const workerId = worker[0].id;

          if (!workersMap.has(workerId)) {
            // Get profile for this worker
            const profile = await db
              .select()
              .from(userProfilesTable)
              .where(eq(userProfilesTable.userId, workerId))
              .limit(1);

            workersMap.set(workerId, {
              id: worker[0].id,
              firstName: worker[0].firstName,
              lastName: worker[0].lastName,
              email: worker[0].email,
              imageUrl: worker[0].imageUrl,
              role: worker[0].role,
              profile: profile[0] || null,
              services: [],
            });
          }

          const workerData = workersMap.get(workerId)!;
          workerData.services.push({
            id: service.id,
            title: service.title,
            description: service.description,
            price: service.price,
            priceType: service.priceType,
          });
        }
      })
    );

    const workers = Array.from(workersMap.values());

    return NextResponse.json({ workers });
  } catch (error: any) {
    console.error("Search error:", error);
    return NextResponse.json(
      { error: "Failed to search services" },
      { status: 500 }
    );
  }
}
