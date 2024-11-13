import "./globals.css";

import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import localFont from "next/font/local";

import { Footer } from "@/components/layout/footer";
import { Sidebar } from "@/components/layout/sidebar";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";

const GeistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const GeistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.jmartinn.com"),
  title: {
    default: "Juan Pedro Martin - Software Developer",
    template: "%s | Juan Pedro Martin",
  },
  description:
    "Juan Pedro Martin is a passionate software developer, specializing in frontend development. Explore his projects, articles, and insights.",
  alternates: {
    canonical: "https://www.jmartinn.com",
  },
  openGraph: {
    title: "Juan Pedro Martin - Software Developer",
    description:
      "Juan Pedro Martin is a passionate software developer, specializing in frontend development. Explore his projects, articles, and insights.",
    url: "https://www.jmartinn.com",
    siteName: "Juan Pedro Martin",
    locale: "en_US",
    type: "website",
  },
  keywords: [
    "Juan Pedro Martin",
    "Developer",
    "Writer",
    "Creator",
    "Frontend Development",
    "Software Engineering",
    "Web Development",
    "Tech Articles",
    "Coding Projects",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    card: "summary_large_image",
    title: "Juan Pedro Martin - Software Developer",
    description: "Minimalist code. Maximum impact.",
    creator: "@jmartinn07",
  },
  verification: {
    google: "Fyg64Q58kWDqARPWRbdy4uCuy8ENcCPHLITkRgRzyW4",
  },
  authors: [
    {
      name: "Juan Pedro Martin",
      url: "https://x.com/jmartinn07",
    },
  ],
  category: "Technology",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cn(
        "bg-white text-black dark:bg-[#111010] dark:text-gray-100",
        GeistSans.variable,
        GeistMono.variable
      )}
    >
      <body
        className={cn(
          GeistSans.className,
          "mx-4 mt-8 flex max-w-4xl flex-col antialiased md:mt-10 md:flex-row lg:mx-auto lg:mt-16"
        )}
      >
        <Sidebar />
        <main className="mt-6 flex min-w-0 flex-auto flex-col px-2 md:mt-0 md:px-0">
          {children}
          <Footer />
        </main>
        <Analytics />
        <SpeedInsights />
        <Toaster />
      </body>
    </html>
  );
}
