import { requireAdmin } from "@/lib/auth";

export default async function AdminPage() {
  await requireAdmin();

  // TODO: Implement with Drizzle
  const [userCount, workerCount, requestCount, totalRevenue] = [0, 0, 0, 0];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="p-6 border rounded-lg">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">
            Total Users
          </h3>
          <p className="text-3xl font-bold">{userCount}</p>
        </div>

        <div className="p-6 border rounded-lg">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">
            Workers
          </h3>
          <p className="text-3xl font-bold">{workerCount}</p>
        </div>

        <div className="p-6 border rounded-lg">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">
            Requests
          </h3>
          <p className="text-3xl font-bold">{requestCount}</p>
        </div>

        <div className="p-6 border rounded-lg">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">
            Total Revenue
          </h3>
          <p className="text-3xl font-bold">${totalRevenue.toFixed(2)}</p>
        </div>
      </div>

      <div className="mt-8 p-6 border rounded-lg">
        <h2 className="text-xl font-semibold mb-4">System Information</h2>
        <p className="text-muted-foreground">
          Database: Neon Postgres with Drizzle ORM
        </p>
        <p className="text-muted-foreground">Authentication: Clerk</p>
        <p className="text-muted-foreground">AI: Next.js AI SDK with OpenAI</p>
      </div>
    </div>
  );
}
