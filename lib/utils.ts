import { clsx, type ClassValue } from "clsx";
import { unstable_noStore as noStore } from "next/cache";
import { twMerge } from "tailwind-merge";

/**
 * Merges Tailwind CSS class names without conflicts using clsx and tailwind-merge.
 * Handles conditional classes and prevents Tailwind specificity issues.
 *
 * @param inputs - Class names, objects, or arrays to merge
 * @returns Merged class name string with conflicts resolved
 *
 * @example
 * ```ts
 * cn("px-2 py-1", "px-4") // => "py-1 px-4"
 * cn("text-red-500", condition && "text-blue-500") // => conditionally applied classes
 * ```
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Calculates estimated reading time for blog post content.
 * Removes code blocks, HTML tags, and markdown formatting before calculating.
 * Uses 200 words per minute as the average reading speed for technical content.
 *
 * @param content - The raw blog post content (markdown/MDX)
 * @returns Formatted string like "5 min read"
 *
 * @example
 * ```ts
 * calculateReadingTime("This is a test post with about 200 words...") // => "1 min read"
 * ```
 */
export function calculateReadingTime(content: string): string {
  // Remove MDX/HTML tags and get plain text
  const plainText = content
    .replace(/```[\s\S]*?```/g, "") // Remove code blocks
    .replace(/<[^>]*>/g, "") // Remove HTML tags
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1") // Replace markdown links with just the text
    .replace(/[#*_`]/g, "") // Remove markdown formatting
    .trim();

  // Count words (split by whitespace and filter out empty strings)
  const words = plainText.split(/\s+/).filter((word) => word.length > 0);
  const wordCount = words.length;

  // Calculate reading time (average 200 words per minute)
  const readingTimeMinutes = Math.ceil(wordCount / 200);

  return `${readingTimeMinutes} min read`;
}

/**
 * Formats a date as a long date string with relative time.
 * Uses unstable_noStore() to prevent caching and ensure fresh relative times.
 *
 * @param input - Date string or timestamp to format
 * @returns Formatted string like "October 24, 2025 (24h ago)"
 *
 * @example
 * ```ts
 * formatDate("2025-10-24") // => "October 24, 2025 (1d ago)"
 * formatDate(Date.now()) // => "October 24, 2025 (Today)"
 * ```
 */
export function formatDate(input: string | number): string {
  noStore();

  const currentDate = new Date();
  const targetDate = new Date(input);
  const diffTime = currentDate.getTime() - targetDate.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  let formattedDate = "";
  if (diffDays >= 365) {
    formattedDate = `${Math.floor(diffDays / 365)}y ago`;
  } else if (diffDays >= 30) {
    formattedDate = `${Math.floor(diffDays / 30)}mo ago`;
  } else if (diffDays > 0) {
    formattedDate = `${diffDays}d ago`;
  } else {
    formattedDate = "Today";
  }

  const fullDate = targetDate.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return `${fullDate} (${formattedDate})`;
}
