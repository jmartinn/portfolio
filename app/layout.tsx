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
    default: "Juan Pedro Martin - Developer, Writer, and Creator",
    template: "%s | Juan Pedro Martin",
  },
  description:
    "Juan Pedro Martin is a developer, writer, and creator specializing in frontend development and software engineering. Explore my projects, articles, and insights.",
  alternates: {
    canonical: "https://www.jmartinn.com",
  },
  openGraph: {
    title: "Juan Pedro Martin - Developer, Writer, and Creator",
    description:
      "Explore the work of Juan Pedro Martin - a passionate developer, insightful writer, and innovative creator in the world of software engineering.",
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
    title: "Juan Pedro Martin - Developer, Writer, and Creator",
    description:
      "Explore the work of Juan Pedro Martin - passionate developer, insightful writer, and innovative creator.",
    creator: "@jmartinn07",
  },
  verification: {
    google: "Fyg64Q58kWDqARPWRbdy4uCuy8ENcCPHLITkRgRzyW4",
  },
  authors: [{ name: "Juan Pedro Martin", url: "https://www.jmartinn.com" }],
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
        "text-black bg-white dark:text-white dark:bg-[#111010]",
        GeistSans.variable,
        GeistMono.variable
      )}
    >
      <body
        className={cn(
          GeistSans.className,
          "antialiased max-w-4xl mb-40 flex flex-col md:flex-row mx-4 mt-8 md:mt-20 lg:mx-auto lg:mt-20"
        )}
      >
        <Sidebar />
        <main className="flex-auto min-w-0 mt-6 flex flex-col px-2 md:px-0 md:mt-0">
          {children}
          <Footer />
          <Analytics />
          <SpeedInsights />
        </main>
        <Toaster />
      </body>
    </html>
  );
}
