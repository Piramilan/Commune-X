"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export default function OnboardingPage() {
  const router = useRouter();
  const [loading, setLoading] = useState<string | null>(null);

  const chooseRole = async (role: "CUSTOMER" | "WORKER") => {
    if (loading) return;
    setLoading(role);
    try {
      const res = await fetch("/api/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role }),
      });
      if (!res.ok) throw new Error("Failed to save onboarding");
      const next = role === "WORKER" ? "/provider" : "/dashboard";
      router.replace(next);
    } catch (e) {
      // no-op
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto px-4 py-16 flex-1">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Welcome to CommuneX</h1>
          <p className="text-muted-foreground mb-8">
            Choose how you want to use the app so we can tailor your experience.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="hover:shadow-md transition">
              <CardHeader>
                <CardTitle>I'm a Customer</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Find and book local professionals for your tasks.
                </p>
                <Button
                  className="w-full"
                  onClick={() => chooseRole("CUSTOMER")}
                  disabled={loading !== null}
                >
                  {loading === "CUSTOMER"
                    ? "Saving..."
                    : "Continue as Customer"}
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition">
              <CardHeader>
                <CardTitle>I'm a Worker</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Offer services, manage requests, and get paid.
                </p>
                <Button
                  variant="secondary"
                  className="w-full"
                  onClick={() => chooseRole("WORKER")}
                  disabled={loading !== null}
                >
                  {loading === "WORKER" ? "Saving..." : "Continue as Worker"}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
