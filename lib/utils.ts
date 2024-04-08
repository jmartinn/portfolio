import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { unstable_noStore as noStore } from 'next/cache';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(input: string | number): string {
  noStore();

  const currentDate = new Date();
  const targetDate = new Date(input);
  const diffTime = currentDate.getTime() - targetDate.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  let formattedDate = '';
  if (diffDays >= 365) {
    formattedDate = `${Math.floor(diffDays / 365)}y ago`;
  } else if (diffDays >= 30) {
    formattedDate = `${Math.floor(diffDays / 30)}mo ago`;
  } else if (diffDays > 0) {
    formattedDate = `${diffDays}d ago`;
  } else {
    formattedDate = 'Today';
  }

  const fullDate = targetDate.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  return `${fullDate} (${formattedDate})`;
}
