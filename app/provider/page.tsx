import { getAuthServerSide, requireRole } from "@/lib/auth";
import { redirect } from "next/navigation";
// import { db } from "@/lib/db";
import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Briefcase, DollarSign, Star, Calendar } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

export default async function ProviderDashboard() {
  const user = await requireRole("WORKER");

  const stats: any = null;
  // TODO: Implement with Drizzle

  const totalEarnings =
    stats?.payments.reduce((sum: number, p: any) => sum + p.workerAmount, 0) ||
    0;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Worker Dashboard</h1>
        <p className="text-muted-foreground">
          Manage your services and requests
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <p className="text-sm font-medium">Total Earnings</p>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {formatCurrency(totalEarnings)}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <p className="text-sm font-medium">Pending Requests</p>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">0</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <p className="text-sm font-medium">Rating</p>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {stats?.profile?.avgRating?.toFixed(1) || "0.0"}
            </p>
            <p className="text-xs text-muted-foreground">
              {stats?._count.reviewsReceived} reviews
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <p className="text-sm font-medium">Active Services</p>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{stats?._count.services || 0}</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <h3 className="font-semibold">Quick Actions</h3>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button variant="outline" className="w-full justify-start" asChild>
              <Link href="/provider/requests">View Requests</Link>
            </Button>
            <Button variant="outline" className="w-full justify-start" asChild>
              <Link href="/provider/services">Manage Services</Link>
            </Button>
            <Button variant="outline" className="w-full justify-start" asChild>
              <Link href="/provider/availability">Set Availability</Link>
            </Button>
            <Button variant="outline" className="w-full justify-start" asChild>
              <Link href="/provider/profile">Edit Profile</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h3 className="font-semibold">Recent Activity</h3>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">No recent activity</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
