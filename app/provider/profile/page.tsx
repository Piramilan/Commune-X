import { requireRole } from "@/lib/auth";
import { Card } from "@/components/ui/card";

export default async function ProviderProfilePage() {
  await requireRole("WORKER");

  // TODO: Implement provider profile edit form (re-use ProfileForm?)
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Edit Provider Profile</h1>
      <Card>
        <div className="p-6 text-muted-foreground">Profile editing coming soon.</div>
      </Card>
    </div>
  );
}


