import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import {
  Search,
  Users,
  MessageSquare,
  Star,
  Shield,
  CreditCard,
} from "lucide-react";

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="container mx-auto px-4 py-24">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold tracking-tight mb-6">
            How CommuneX Works
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Get quality service from verified local professionals. Simple, fast,
            and reliable.
          </p>
        </div>

        {/* Main Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-center h-16 w-16 bg-primary/10 rounded-full mb-4">
                <Search className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-2xl">1. Search & Find</CardTitle>
              <CardDescription className="text-base mt-2">
                Browse through thousands of verified service providers in your
                area.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Browse by category</li>
                <li>• Filter by price, rating, location</li>
                <li>• Read reviews from real customers</li>
                <li>• View worker profiles and portfolios</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-center h-16 w-16 bg-primary/10 rounded-full mb-4">
                <MessageSquare className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-2xl">
                2. Request & Communicate
              </CardTitle>
              <CardDescription className="text-base mt-2">
                Submit your service request and connect directly with workers.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Describe your project needs</li>
                <li>• Get quotes from multiple workers</li>
                <li>• Chat in real-time via our platform</li>
                <li>• Compare pricing and availability</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-center h-16 w-16 bg-primary/10 rounded-full mb-4">
                <Star className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-2xl">3. Book & Review</CardTitle>
              <CardDescription className="text-base mt-2">
                Confirm your booking and leave a review after service
                completion.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Secure payment through platform</li>
                <li>• Track service progress</li>
                <li>• Rate and review your experience</li>
                <li>• Help others make informed decisions</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Features */}
        <div className="bg-muted py-16 rounded-lg mb-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Why Choose CommuneX?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="flex items-center justify-center h-16 w-16 bg-primary/10 rounded-full mx-auto mb-4">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  Verified Professionals
                </h3>
                <p className="text-muted-foreground">
                  All workers undergo background checks and verification. Your
                  safety is our priority.
                </p>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center h-16 w-16 bg-primary/10 rounded-full mx-auto mb-4">
                  <CreditCard className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Secure Payments</h3>
                <p className="text-muted-foreground">
                  Pay safely through our platform. Funds are held until you
                  confirm service completion.
                </p>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center h-16 w-16 bg-primary/10 rounded-full mx-auto mb-4">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Real Reviews</h3>
                <p className="text-muted-foreground">
                  Read authentic reviews from verified customers to make
                  informed decisions.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* For Workers Section */}
        <div className="mb-16">
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl mb-4">
                Are You a Service Provider?
              </CardTitle>
              <CardDescription className="text-lg">
                Join thousands of professionals earning money through CommuneX.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-semibold mb-4">Benefits for Workers:</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>✓ Set your own prices and availability</li>
                    <li>✓ Get matched with relevant service requests</li>
                    <li>✓ Secure, on-time payments</li>
                    <li>✓ Build your reputation through reviews</li>
                    <li>✓ Grow your business locally</li>
                    <li>✓ Real-time communication with customers</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-4">How to Get Started:</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>1. Create your worker profile</li>
                    <li>2. Add your services and pricing</li>
                    <li>3. Complete your verification</li>
                    <li>4. Start receiving requests</li>
                    <li>5. Complete jobs and get paid</li>
                    <li>6. Build your reputation</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Find the perfect professional for your next project.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button size="lg" asChild>
              <Link href="/search">Find Services</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/sign-up">Sign Up as Worker</Link>
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
