import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
  ),
  title: {
    default: "CommuneX - Local Service Marketplace",
    template: "%s | CommuneX",
  },
  description:
    "Connect with local service providers for home repairs, cleaning, and more.",
  keywords: [
    "local services",
    "home repair",
    "cleaning",
    "plumbing",
    "electrician",
    "landscaping",
    "handyman",
  ],
  authors: [{ name: "CommuneX" }],
  openGraph: {
    type: "website",
    url: "/",
    siteName: "CommuneX",
    title: "CommuneX - Local Service Marketplace",
    description:
      "Connect with local service providers for home repairs, cleaning, and more.",
    images: [
      {
        url: "/vercel.svg",
        width: 1200,
        height: 630,
        alt: "CommuneX",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CommuneX - Local Service Marketplace",
    description:
      "Connect with local service providers for home repairs, cleaning, and more.",
    images: ["/vercel.svg"],
  },
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // If user has no role (empty string), redirect to onboarding on client routes via middleware alternative
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
          suppressHydrationWarning
        >
          {children}
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
