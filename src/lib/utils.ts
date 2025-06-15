import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string) {
  return new Date(date)
    .toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    })
    .replace(",", "");
}

export function calculateReadingTime(content: string): string {
  // Average reading speed is 200-250 words per minute
  // We'll use 225 words per minute as a middle ground
  const wordsPerMinute = 225;
  
  // Remove HTML tags and count words
  const cleanContent = content.replace(/<[^>]*>/g, '');
  const wordCount = cleanContent.trim().split(/\s+/).length;
  
  const readingTimeMinutes = Math.ceil(wordCount / wordsPerMinute);
  
  return readingTimeMinutes === 1 ? "1 min read" : `${readingTimeMinutes} min read`;
}
