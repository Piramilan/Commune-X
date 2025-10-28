import { db } from "@/lib/db";
import { usersTable, userProfilesTable, servicesTable } from "@/src/db/schema";
import { eq } from "drizzle-orm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Phone, Mail, MapPin, Clock } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatCurrency } from "@/lib/utils";
import Link from "next/link";

export default async function WorkerProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const workerId = id;

  // Fetch worker
  const workers = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.id, workerId))
    .limit(1);

  if (workers.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardContent className="p-12 text-center">
            <h1 className="text-2xl font-bold mb-4">Worker Not Found</h1>
            <p className="text-muted-foreground mb-4">
              The worker you're looking for doesn't exist.
            </p>
            <Button asChild>
              <Link href="/search">Back to Search</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const worker = workers[0];

  // Fetch profile
  const profiles = await db
    .select()
    .from(userProfilesTable)
    .where(eq(userProfilesTable.userId, worker.id))
    .limit(1);

  const profile = profiles[0] || null;

  // Fetch services
  const services = await db
    .select()
    .from(servicesTable)
    .where(eq(servicesTable.workerId, worker.id));

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-start gap-6 mb-8">
        <Avatar className="h-24 w-24">
          <AvatarImage src={worker.imageUrl || ""} />
          <AvatarFallback>
            {worker.firstName?.[0] || "W"}
            {worker.lastName?.[0] || ""}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <h1 className="text-3xl font-bold">
            {worker.firstName} {worker.lastName}
          </h1>
          {profile?.bio && (
            <p className="text-muted-foreground mt-2">{profile.bio}</p>
          )}
          {profile?.city && profile?.state && (
            <div className="flex items-center gap-2 mt-3 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>
                {profile.city}, {profile.state}
              </span>
            </div>
          )}
        </div>
        <div className="flex flex-col items-end">
          {profile?.avgRating && (
            <div className="flex items-center gap-2 mb-2">
              <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              <span className="text-2xl font-bold">
                {profile.avgRating.toFixed(1)}
              </span>
            </div>
          )}
          {profile?.totalReviews && (
            <span className="text-sm text-muted-foreground">
              ({profile.totalReviews} reviews)
            </span>
          )}
        </div>
      </div>

      {/* Services */}
      {services.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Services Offered</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((service) => (
              <Card key={service.id}>
                <CardHeader>
                  <CardTitle>{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  {service.description && (
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                      {service.description}
                    </p>
                  )}
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold">
                        {formatCurrency(service.price)}
                      </p>
                      <Badge variant="secondary">
                        {service.priceType}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Contact Info */}
      <Card>
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {profile?.phone && (
            <div className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-muted-foreground" />
              <span>{profile.phone}</span>
            </div>
          )}
          {worker.email && (
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-muted-foreground" />
              <span>{worker.email}</span>
            </div>
          )}
          {profile?.city && profile?.state && (
            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-muted-foreground" />
              <span>
                {profile.city}, {profile.state}
              </span>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex gap-4 mt-8">
        <Button size="lg" asChild>
          <Link href={`/dashboard/requests/new?workerId=${worker.id}`}>
            Request Service
          </Link>
        </Button>
        <Button size="lg" variant="outline" asChild>
          <Link href="/search">Back to Search</Link>
        </Button>
      </div>
    </div>
  );
}

