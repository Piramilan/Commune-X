import { auth, currentUser } from "@clerk/nextjs/server";
import { UserRole } from "./types";
import { db } from "@/lib/db";
import { usersTable } from "@/src/db/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

export async function getAuthServerSide() {
  const { userId } = await auth();

  if (!userId) {
    return null;
  }

  const clerkUser = await currentUser();

  if (!clerkUser) {
    return null;
  }

  // Try to find the user in our database
  const dbUsers = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.clerkId, userId))
    .limit(1);

  let user = dbUsers[0];

  // If user doesn't exist in our DB, create them
  if (!user) {
    const newUsers = await db
      .insert(usersTable)
      .values({
        id: uuidv4(),
        clerkId: userId,
        email: clerkUser.emailAddresses[0]?.emailAddress || "",
        firstName: clerkUser.firstName || "",
        lastName: clerkUser.lastName || "",
        imageUrl: clerkUser.imageUrl,
        role: "CUSTOMER", // Default role, will be updated during onboarding
        verified: false,
      })
      .returning();
    user = newUsers[0];
  }

  return {
    id: user.id,
    clerkId: user.clerkId,
    email: user.email,
    firstName: user.firstName || "",
    lastName: user.lastName || "",
    imageUrl: user.imageUrl || "",
    role: user.role as UserRole,
    verified: user.verified || false,
    onboardingCompleted: user.onboardingCompleted || false,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}

export async function requireAuth() {
  const user = await getAuthServerSide();

  if (!user) {
    throw new Error("Unauthorized");
  }

  return user;
}

export async function requireOnboarding() {
  const user = await requireAuth();

  // Check if user has completed onboarding
  if (!user.onboardingCompleted) {
    redirect("/onboarding");
  }

  return user;
}

export async function requireRole(role: UserRole) {
  const user = await requireOnboarding();

  // Check if user has the required role
  if (user.role !== role && user.role !== "ADMIN") {
    // Redirect to appropriate dashboard based on user's actual role
    if (user.role === "CUSTOMER") {
      redirect("/dashboard");
    } else if (user.role === "WORKER") {
      redirect("/provider");
    } else {
      redirect("/onboarding");
    }
  }

  return user;
}

export async function requireAdmin() {
  return requireRole("ADMIN");
}
