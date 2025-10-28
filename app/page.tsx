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
import { Search, Star, Shield, Clock, Users, Briefcase } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-24 flex flex-col items-center text-center">
        <h1 className="text-5xl font-bold tracking-tight mb-6">
          Find Local Service Providers
          <br />
          <span className="text-primary">Near You</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mb-8">
          Connect with verified professionals for home repairs, cleaning,
          landscaping, and more. Get quality service at fair prices.
        </p>
        <div className="flex gap-4 flex-wrap">
          <Button size="lg" asChild>
            <Link href="/search">Find Services</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/sign-up">Become a Worker</Link>
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <Search className="h-12 w-12 text-primary mb-4" />
              <CardTitle>Easy Search</CardTitle>
              <CardDescription>
                Find trusted local workers in your area with our intelligent
                matching system.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Shield className="h-12 w-12 text-primary mb-4" />
              <CardTitle>Verified Workers</CardTitle>
              <CardDescription>
                All service providers are background-checked and verified for
                your peace of mind.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Clock className="h-12 w-12 text-primary mb-4" />
              <CardTitle>Quick Response</CardTitle>
              <CardDescription>
                Get matched with workers who respond quickly and work on your
                schedule.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* How It Works */}
      <section className="container mx-auto px-4 py-16 bg-muted/50">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">How It Works</h2>
          <p className="text-muted-foreground">
            Get started in three simple steps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center">
            <div className="rounded-full bg-primary text-primary-foreground w-16 h-16 flex items-center justify-center text-2xl font-bold mb-4">
              1
            </div>
            <h3 className="text-xl font-semibold mb-2">Post Your Request</h3>
            <p className="text-muted-foreground">
              Describe what you need using natural language. Our AI will match
              you with the right professionals.
            </p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="rounded-full bg-primary text-primary-foreground w-16 h-16 flex items-center justify-center text-2xl font-bold mb-4">
              2
            </div>
            <h3 className="text-xl font-semibold mb-2">Compare & Choose</h3>
            <p className="text-muted-foreground">
              Review profiles, ratings, and quotes from multiple workers. Pick
              the best fit.
            </p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="rounded-full bg-primary text-primary-foreground w-16 h-16 flex items-center justify-center text-2xl font-bold mb-4">
              3
            </div>
            <h3 className="text-xl font-semibold mb-2">Get It Done</h3>
            <p className="text-muted-foreground">
              The professional completes your job. You pay safely through our
              platform and leave a review.
            </p>
          </div>
        </div>
      </section>

      {/* Popular Categories */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Popular Services</h2>
          <p className="text-muted-foreground">
            Browse our most popular service categories
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((category) => (
            <Button
              key={category.name}
              variant="outline"
              className="h-24 flex-col gap-2"
              asChild
            >
              <Link href={`/search?category=${category.slug}`}>
                <span className="text-2xl">{category.icon}</span>
                <span>{category.name}</span>
              </Link>
            </Button>
          ))}
        </div>

        <div className="text-center mt-8">
          <Button variant="link" asChild>
            <Link href="/categories">View All Categories</Link>
          </Button>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 bg-primary text-primary-foreground rounded-lg">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-lg mb-8 opacity-90">
            Join thousands of satisfied customers using CommuneX
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/sign-up">Sign Up Free</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary-foreground  bg-primary-foreground text-primary"
              asChild
            >
              <Link href="/how-it-works">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

const categories = [
  { name: "Plumbing", icon: "🔧", slug: "plumbing" },
  { name: "Cleaning", icon: "🧹", slug: "cleaning" },
  { name: "Electrical", icon: "⚡", slug: "electrical" },
  { name: "Landscaping", icon: "🌳", slug: "landscaping" },
];
