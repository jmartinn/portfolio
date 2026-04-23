import "./globals.css";

import { GoogleAnalytics } from "@next/third-parties/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import type { Metadata, Viewport } from "next";
import { Newsreader } from "next/font/google";

import { ErrorBoundary } from "@/components/error-boundary";
import { Footer } from "@/components/layout/footer";
import { Nav } from "@/components/layout/nav";
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
    "Frontend engineer at BBVA. Writing about web development and the things I learn along the way.",
  alternates: {
    canonical: "https://www.jmartinn.com",
  },
  openGraph: {
    title: "Juan Pedro Martin",
    description:
      "Frontend engineer at BBVA. Writing about web development and the things I learn along the way.",
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
    description: "Frontend engineer at BBVA. Writing about web development and the things I learn along the way.",
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

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "hsl(40 20% 98%)" },
    { media: "(prefers-color-scheme: dark)", color: "hsl(30 8% 7%)" },
  ],
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
      data-scroll-behavior="smooth"
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
          <a
            href="#main-content"
            className="sr-only rounded-md bg-background px-3 py-2 text-sm text-foreground ring-2 ring-accent focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50"
          >
            Skip to content
          </a>
          <div className="mx-auto max-w-2xl px-6 py-16 md:py-24">
            <Nav />
            <ErrorBoundary>
              <main id="main-content">{children}</main>
            </ErrorBoundary>
            <Footer />
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
