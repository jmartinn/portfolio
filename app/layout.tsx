import "./globals.css";

import { GoogleAnalytics } from "@next/third-parties/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import { Newsreader } from "next/font/google";

import { ErrorBoundary } from "@/components/error-boundary";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.jmartinn.com"),
  title: {
    default: "Juan Pedro Martin",
    template: "%s | Juan Pedro Martin",
  },
  description:
    "Frontend engineer crafting thoughtful, accessible web experiences. Writing about design, development, and the spaces in between.",
  alternates: {
    canonical: "https://www.jmartinn.com",
  },
  openGraph: {
    title: "Juan Pedro Martin",
    description:
      "Frontend engineer crafting thoughtful, accessible web experiences. Writing about design, development, and the spaces in between.",
    url: "https://www.jmartinn.com",
    siteName: "Juan Pedro Martin",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/opengraph-image.jpg",
        width: 1200,
        height: 630,
        alt: "Juan Pedro Martin",
      },
    ],
  },
  keywords: [
    "Juan Pedro Martin",
    "Frontend Engineer",
    "Web Development",
    "React",
    "Next.js",
    "TypeScript",
    "Design Engineering",
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
    title: "Juan Pedro Martin",
    description: "Frontend engineer crafting thoughtful, accessible web experiences.",
    creator: "@jmartinn07",
    images: ["/opengraph-image.jpg"],
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
      suppressHydrationWarning
      className={cn(
        GeistSans.variable,
        GeistMono.variable,
        newsreader.variable
      )}
    >
      <body
        className={cn(
          "min-h-screen bg-background font-sans text-foreground antialiased"
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="mx-auto max-w-2xl px-6 py-16 md:py-24">
            <ErrorBoundary>{children}</ErrorBoundary>
          </div>
          <Toaster />
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
      <GoogleAnalytics gaId="G-SZW29GL9NX" />
    </html>
  );
}
