import { requireRole } from "@/lib/auth";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function ProviderServicesPage() {
  await requireRole("WORKER");

  // TODO: Fetch worker services via Drizzle
  const services: any[] = [];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Manage Services</h1>
        <p className="text-muted-foreground">Create and manage your offered services.</p>
      </div>

      {services.length === 0 ? (
        <Card>
          <div className="p-12 text-center">
            <p className="text-muted-foreground mb-4">You have no services yet.</p>
            <Button asChild>
              <Link href="#">Add Service</Link>
            </Button>
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {services.map((s) => (
            <Card key={s.id}>
              <div className="p-6">
                <h3 className="font-semibold">{s.title}</h3>
                <p className="text-sm text-muted-foreground">{s.description}</p>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}


