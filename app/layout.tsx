import "./globals.css";

import type { Metadata } from "next";

import { Analytics } from "@vercel/analytics/react";
import localFont from "next/font/local";
import Sidebar from "./components/sidebar";
import clsx from "clsx";

const graphik = localFont({
  src: [
    {
      path: "../public/fonts/Graphik-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/Graphik-Medium.ttf",
      weight: "600",
      style: "bold",
    },
  ],
  variable: "--font-graphik",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://jmartinn.com"),
  title: {
    default: "Juan Pedro Martin",
    template: "%s | Juan Pedro Martin",
  },
  description: "Developer, writer, and creator.",
  alternates: {
    canonical: "https://jmartinn.com",
  },
  openGraph: {
    title: "Juan Pedro Martin",
    description: "Developer, writer, and creator.",
    url: "https://jmartinn.com",
    siteName: "Juan Pedro Martin",
    locale: "en-US",
    type: "website",
  },
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
  },
  verification: {
    google: "Fyg64Q58kWDqARPWRbdy4uCuy8ENcCPHLITkRgRzyW4",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={clsx(
        "text-black bg-white dark:text-white dark:bg-[#111010]",
        graphik.variable
      )}
    >
      <body className="antialiased max-w-4xl mb-40 flex flex-col md:flex-row mx-4 mt-8 md:mt-20 lg:mt-32 lg:mx-auto">
        <Sidebar />
        <main className="flex-auto min-w-0 mt-6 md:mt-0 flex flex-col px-2 md:px-0">
          {children}
          <Analytics />
        </main>
      </body>
    </html>
  );
}
