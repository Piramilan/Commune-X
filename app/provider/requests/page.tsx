import { requireRole } from "@/lib/auth";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function WorkerRequestsPage() {
  const user = await requireRole("WORKER");

  // Get requests that match worker's service categories
  const workerServices: any[] = [];
  // TODO: Implement with Drizzle

  const categoryIds: string[] = workerServices.map((s: any) => s.categoryId);

  const requests: any[] = [];
  // TODO: Implement with Drizzle

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Available Requests</h1>

      {requests.length === 0 ? (
        <Card>
          <div className="p-12 text-center">
            <p className="text-muted-foreground mb-4">
              No available requests at the moment.
            </p>
          </div>
        </Card>
      ) : (
        <div className="space-y-4">
          {requests.map((request: any) => (
            <Card key={request.id}>
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{request.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {request.category.name}
                    </p>
                  </div>
                  <Badge>{request.status}</Badge>
                </div>

                <p className="text-muted-foreground mb-4">
                  {request.description}
                </p>

                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>{request.location}</span>
                  {request.budget && (
                    <span className="font-semibold">${request.budget}</span>
                  )}
                </div>

                <div className="mt-4 flex gap-2">
                  <Button asChild>
                    <Link href={`/provider/requests/${request.id}`}>
                      View Details
                    </Link>
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
