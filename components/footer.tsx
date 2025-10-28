import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">CommuneX</h3>
            <p className="text-sm text-muted-foreground">
              Connect with local service providers for all your needs.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-3">For Customers</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/how-it-works" className="hover:text-primary">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/search" className="hover:text-primary">
                  Find Services
                </Link>
              </li>
              <li>
                <Link href="/categories" className="hover:text-primary">
                  Browse Categories
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-3">For Workers</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/provider" className="hover:text-primary">
                  Worker Dashboard
                </Link>
              </li>
              <li>
                <Link href="/sign-up" className="hover:text-primary">
                  Become a Worker
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="hover:text-primary">
                  How to Get Started
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-3">Support</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/contact" className="hover:text-primary">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-primary">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-primary">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-primary">
                  Terms
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-primary">
                  Privacy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} CommuneX. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
