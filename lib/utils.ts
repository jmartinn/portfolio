import { clsx, type ClassValue } from "clsx";
import { unstable_noStore as noStore } from "next/cache";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

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
