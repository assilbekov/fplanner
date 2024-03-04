import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { format } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function capitalizeFirstLetter(v: string) {
  return v.charAt(0).toUpperCase() + v.slice(1);
}

export function formatDate(date: Date | string) {
  return format(date, "dd MMM yyyy");
}
