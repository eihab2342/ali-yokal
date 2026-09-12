import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const cleanImageUrl = (url?: string | null): string => {
  if (!url || typeof url !== "string") {
    return "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80";
  }

  let trimmed = url.trim();
  if (!trimmed) {
    return "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80";
  }

  // If the URL contains an embedded absolute URL (e.g. http://127.0.0.1:8000/uploads/services/https://img.freepik.com/...)
  const lastHttpsIndex = trimmed.lastIndexOf("https://");
  if (lastHttpsIndex > 0) {
    trimmed = trimmed.substring(lastHttpsIndex);
  } else {
    const lastHttpIndex = trimmed.lastIndexOf("http://");
    if (lastHttpIndex > 0) {
      trimmed = trimmed.substring(lastHttpIndex);
    }
  }

  const backendBase = process.env.NEXT_PUBLIC_BACKEND_BASE_URL || "http://127.0.0.1:8000/api";
  const backendHost = backendBase.replace(/\/api\/?$/, "");

  // If URL is from local Laravel without port (e.g. http://localhost/uploads/... or http://127.0.0.1/uploads/...)
  if (trimmed.startsWith("http://localhost/uploads/")) {
    return trimmed.replace("http://localhost", backendHost);
  }
  if (trimmed.startsWith("http://127.0.0.1/uploads/")) {
    return trimmed.replace("http://127.0.0.1", backendHost);
  }

  if (trimmed.startsWith("http://") || trimmed.startsWith("https://") || trimmed.startsWith("/")) {
    return trimmed;
  }

  // Handle relative image filename from backend (e.g. "1876131237887996.jpeg" or "uploads/...")
  if (trimmed.startsWith("uploads/")) {
    return `${backendHost}/${trimmed}`;
  }

  return `${backendHost}/uploads/${trimmed}`;
};