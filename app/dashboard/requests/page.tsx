import { getAuthServerSide } from "@/lib/auth";
import { redirect } from "next/navigation";
// import { db } from "@/lib/db";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus } from "lucide-react";

export default async function RequestsPage() {
  const user = await getAuthServerSide();

  if (!user) {
    redirect("/sign-in");
  }

  const requests: any[] = [];
  // TODO: Implement with Drizzle

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">My Requests</h1>
        <Button asChild>
          <Link href="/dashboard/requests/new">
            <Plus className="mr-2 h-4 w-4" />
            New Request
          </Link>
        </Button>
      </div>

      {requests.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <p className="text-muted-foreground mb-4">
              No requests yet. Create your first service request!
            </p>
            <Button asChild>
              <Link href="/dashboard/requests/new">Create Request</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {requests.map((request: any) => (
            <Card key={request.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-lg">{request.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {request.category.name}
                    </p>
                  </div>
                  <Badge
                    variant={
                      request.status === "COMPLETED"
                        ? "default"
                        : request.status === "IN_PROGRESS"
                        ? "secondary"
                        : "outline"
                    }
                  >
                    {request.status.replace("_", " ")}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-4">{request.description}</p>
                {request.location && (
                  <p className="text-sm text-muted-foreground">
                    📍 {request.location}
                  </p>
                )}
                {request.assignments.length > 0 && (
                  <div className="mt-4 pt-4 border-t">
                    <p className="text-sm font-medium mb-2">Workers:</p>
                    {request.assignments?.map((assignment: any) => (
                      <div
                        key={assignment.id}
                        className="flex items-center justify-between"
                      >
                        <span>
                          {assignment.worker.firstName}{" "}
                          {assignment.worker.lastName}
                        </span>
                        <Badge variant="outline">{assignment.status}</Badge>
                      </div>
                    ))}
                  </div>
                )}
                <div className="mt-4">
                  <Button variant="outline" asChild>
                    <Link href={`/dashboard/requests/${request.id}`}>
                      View Details
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
