export type UserRole = "CUSTOMER" | "WORKER" | "ADMIN";
export type RequestStatus =
  | "PENDING"
  | "ACCEPTED"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "CANCELLED";
export type AssignmentStatus =
  | "PENDING"
  | "ACCEPTED"
  | "REJECTED"
  | "COMPLETED";
export type PaymentStatus = "PENDING" | "COMPLETED" | "FAILED" | "REFUNDED";
export type NotificationType = "MESSAGE" | "REQUEST_UPDATE" | "REVIEW_RECEIVED";

export interface NavigationItem {
  title: string;
  href: string;
  description?: string;
  icon?: string;
}

export interface DashboardStats {
  totalRequests: number;
  activeRequests: number;
  completedJobs: number;
  earnings: number;
  averageRating: number;
  totalReviews: number;
}

export interface SearchFilters {
  category?: string;
  location?: string;
  minRating?: number;
  maxPrice?: number;
  minPrice?: number;
  distance?: number;
  availability?: boolean;
}

export interface WorkerMatch {
  workerId: string;
  matchScore: number;
  distance: number;
  ratings: number;
  availability: boolean;
  priceRange?: {
    min: number;
    max: number;
  };
}
