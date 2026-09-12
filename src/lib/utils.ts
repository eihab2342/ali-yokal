import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const cleanImageUrl = (url?: string | null): string => {
  if (!url) return "";

  // If the URL contains an embedded absolute URL (e.g. http://127.0.0.1:8000/uploads/services/https://img.freepik.com/...)
  const lastHttpsIndex = url.lastIndexOf("https://");
  if (lastHttpsIndex > 0) {
    return url.substring(lastHttpsIndex);
  }

  const lastHttpIndex = url.lastIndexOf("http://");
  if (lastHttpIndex > 0) {
    return url.substring(lastHttpIndex);
  }

  return url;
};