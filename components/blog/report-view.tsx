"use client";

import { useEffect, useRef } from "react";

interface ReportViewProps {
  slug: string;
}

export const ReportView: React.FC<ReportViewProps> = ({ slug }) => {
  const hasReported = useRef(false);

  useEffect(() => {
    // Prevent duplicate reports in development mode
    if (hasReported.current) return;

    const reportView = async () => {
      try {
        await fetch("/api/incr", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ slug }),
        });
        hasReported.current = true;
      } catch (error) {
        console.error("Failed to report view:", error);
      }
    };

    // Add a small delay to ensure the user actually viewed the content
    const timer = setTimeout(reportView, 1000);

    return () => clearTimeout(timer);
  }, [slug]);

  return null;
};
