"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Search as SearchIcon, Star, MapPin } from "lucide-react";
import Link from "next/link";
import { formatCurrency } from "@/lib/utils";

export default function SearchPage() {
  const [workers, setWorkers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState<any[]>([]);

  const fetchWorkers = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (searchQuery) params.set("q", searchQuery);
      if (category) params.set("category", category);

      const res = await fetch(`/api/search?${params}`);
      if (!res.ok) {
        console.error("Search API error:", res.status);
        setWorkers([]);
        return;
      }
      const data = await res.json();
      setWorkers(data.workers || data.services || []);
    } catch (error) {
      console.error("Error fetching workers:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Fetch categories
    fetch('/api/categories')
      .then(res => res.json())
      .then(data => setCategories(data.categories || []))
      .catch(console.error);
    
    // Get category from URL on mount
    const urlParams = new URLSearchParams(window.location.search);
    const urlCategory = urlParams.get("category");
    if (urlCategory) {
      setCategory(urlCategory);
    }
  }, []);

  useEffect(() => {
    fetchWorkers();
  }, [category]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="container mx-auto px-4 py-8 flex-1">
        <h1 className="text-3xl font-bold mb-8">Find Service Providers</h1>

        {/* Search Bar */}
        <div className="flex gap-4 mb-8">
          <div className="flex-1 relative">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search for workers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && fetchWorkers()}
              className="pl-10"
            />
          </div>
          <Button onClick={fetchWorkers}>Search</Button>
        </div>

        {/* Filters */}
        <div className="flex gap-2 mb-8 flex-wrap">
          <Button
            variant={!category ? "default" : "outline"}
            onClick={() => setCategory("")}
          >
            All
          </Button>
          {categories.map((cat: any) => (
            <Button
              key={cat.id}
              variant={category === cat.slug ? "default" : "outline"}
              onClick={() => setCategory(cat.slug)}
            >
              {cat.icon} {cat.name}
            </Button>
          ))}
        </div>

        {/* Results */}
        {loading ? (
          <div className="text-center py-12">Loading...</div>
        ) : workers.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            No workers found. Try adjusting your search criteria.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {workers.map((worker) => (
              <Card
                key={worker.id}
                className="hover:shadow-lg transition-shadow"
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={worker.imageUrl || ""} />
                        <AvatarFallback>
                          {worker.firstName?.[0] || "U"}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold">
                          {worker.firstName} {worker.lastName}
                        </h3>
                        {worker.profile?.city && (
                          <div className="text-sm text-muted-foreground flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {worker.profile.city}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {worker.profile?.bio && (
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {worker.profile.bio}
                    </p>
                  )}

                  <div className="flex items-center justify-between mb-4">
                    {worker.profile?.avgRating && (
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold">
                          {worker.profile.avgRating.toFixed(1)}
                        </span>
                        {worker.profile.totalReviews && (
                          <span className="text-sm text-muted-foreground">
                            ({worker.profile.totalReviews})
                          </span>
                        )}
                      </div>
                    )}
                    {worker.services?.[0]?.price && (
                      <div className="text-sm font-semibold">
                        From {formatCurrency(worker.services[0].price)}
                      </div>
                    )}
                  </div>

                  <Button asChild className="w-full">
                    <Link href={`/worker/${worker.id}`}>View Profile</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
