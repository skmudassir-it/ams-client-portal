import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { format as dateFnsFormat, formatDistanceToNow } from "date-fns";

// ── Tailwind class merge ─────────────────────────────────
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ── Currency formatting ──────────────────────────────────
export function formatCurrency(
  amount: number,
  currency: string = "USD",
  locale: string = "en-US"
): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

// ── Date formatting ──────────────────────────────────────
export function formatDate(
  date: Date | string,
  formatStr: string = "MMM d, yyyy"
): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return dateFnsFormat(d, formatStr);
}

// ── Relative time (e.g., "2 days ago") ───────────────────
export function formatRelativeDate(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return formatDistanceToNow(d, { addSuffix: true });
}
