import "./globals.css";
import type { Metadata } from "next";

import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Sidebar } from "./components/sidebar";

import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GoogleAnalytics } from "@next/third-parties/google";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.jmartinn.com"),
  title: {
    default: "Juan Pedro Martin",
    template: "%s | Juan Pedro Martin",
  },
  description: "Developer, writer, and creator.",
  alternates: {
    canonical: "https://www.jmartinn.com",
  },
  openGraph: {
    title: "Juan Pedro Martin",
    description: "Developer, writer, and creator.",
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
    "Frontend",
    "Software",
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
    title: "Juan Pedro Martin",
    card: "summary_large_image",
    creator: "@juamp_m",
  },
  verification: {
    google: "Fyg64Q58kWDqARPWRbdy4uCuy8ENcCPHLITkRgRzyW4",
  },
};

const cx = (...classes) => classes.filter(Boolean).join(" ");

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cx(
        "text-black bg-white dark:text-white dark:bg-[#111010]",
        GeistSans.variable,
        GeistMono.variable,
      )}
    >
      <body className="antialiased max-w-4xl mb-40 flex flex-col md:flex-row mx-4 mt-8 md:mt-20 lg:mt-20 lg:mx-auto">
        <Sidebar />
        <main className="flex-auto min-w-0 mt-6 md:mt-0 flex flex-col px-2 md:px-0">
          {children}
          <Analytics />
          <SpeedInsights />
          <GoogleAnalytics gaId="G-SZW29GL9NX" />
        </main>
      </body>
    </html>
  );
}
