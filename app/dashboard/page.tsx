import { getAuthServerSide } from "@/lib/auth";
import { redirect } from "next/navigation";
// import { db } from "@/lib/db";

export default async function DashboardPage() {
  const user = await getAuthServerSide();

  if (!user) {
    redirect("/sign-in");
  }

  // Fetch user stats

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 border rounded-lg">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">
            Welcome
          </h3>
          <p className="text-2xl font-bold">
            {user.firstName} {user.lastName}
          </p>
        </div>

        <div className="p-6 border rounded-lg">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">
            Total Requests
          </h3>
          <p className="text-2xl font-bold">0</p>
        </div>

        <div className="p-6 border rounded-lg">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">
            Role
          </h3>
          <p className="text-2xl font-bold">{user.role}</p>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <a
            href="/search"
            className="p-6 border rounded-lg hover:bg-muted transition-colors"
          >
            <h3 className="font-semibold mb-2">Find Workers</h3>
            <p className="text-sm text-muted-foreground">
              Search for service providers
            </p>
          </a>

          {user.role === "WORKER" && (
            <a
              href="/provider"
              className="p-6 border rounded-lg hover:bg-muted transition-colors"
            >
              <h3 className="font-semibold mb-2">Worker Dashboard</h3>
              <p className="text-sm text-muted-foreground">
                Manage your services
              </p>
            </a>
          )}

          <a
            href="/dashboard/requests"
            className="p-6 border rounded-lg hover:bg-muted transition-colors"
          >
            <h3 className="font-semibold mb-2">My Requests</h3>
            <p className="text-sm text-muted-foreground">View your requests</p>
          </a>

          <a
            href="/dashboard/profile"
            className="p-6 border rounded-lg hover:bg-muted transition-colors"
          >
            <h3 className="font-semibold mb-2">Profile Settings</h3>
            <p className="text-sm text-muted-foreground">Update your profile</p>
          </a>
        </div>
      </div>
    </div>
  );
}
