import {
  pgTable,
  text,
  integer,
  boolean,
  timestamp,
  doublePrecision,
  json,
} from "drizzle-orm/pg-core";

// Users table
export const usersTable = pgTable("app_users", {
  id: text("id").primaryKey(),
  clerkId: text("clerk_id").unique().notNull(),
  email: text("email").unique().notNull(),
  firstName: text("first_name"),
  lastName: text("last_name"),
  imageUrl: text("image_url"),
  role: text("role").notNull().default("CUSTOMER"),
  verified: boolean("verified").default(false),
  onboardingCompleted: boolean("onboarding_completed").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// User Profiles table
export const userProfilesTable = pgTable("profiles", {
  id: text("id").primaryKey(),
  userId: text("user_id").unique().notNull(),
  phone: text("phone"),
  bio: text("bio"),
  city: text("city"),
  state: text("state"),
  zipCode: text("zip_code"),
  latitude: doublePrecision("latitude"),
  longitude: doublePrecision("longitude"),
  available: boolean("available").default(true),
  avgRating: doublePrecision("avg_rating").default(0),
  totalReviews: integer("total_reviews").default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Service Categories table
export const serviceCategoriesTable = pgTable("categories", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").unique().notNull(),
  description: text("description"),
  icon: text("icon"),
  parentId: text("parent_id"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Services table
export const servicesTable = pgTable("worker_services", {
  id: text("id").primaryKey(),
  workerId: text("worker_id").notNull(),
  categoryId: text("category_id").notNull(),
  title: text("title").notNull(),
  description: text("description"),
  priceType: text("price_type").notNull().default("FIXED"),
  price: doublePrecision("price").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Service Requests table
export const serviceRequestsTable = pgTable("requests", {
  id: text("id").primaryKey(),
  customerId: text("customer_id").notNull(),
  categoryId: text("category_id").notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  location: text("location"),
  latitude: doublePrecision("latitude"),
  longitude: doublePrecision("longitude"),
  budget: doublePrecision("budget"),
  status: text("status").notNull().default("PENDING"),
  dueDate: timestamp("due_date"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});
