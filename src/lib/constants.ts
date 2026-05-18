// ── Ticket Categories ────────────────────────────────────
export const TICKET_CATEGORIES = [
  { value: "billing", label: "Billing" },
  { value: "technical", label: "Technical" },
  { value: "general", label: "General" },
  { value: "account", label: "Account" },
] as const;

export type TicketCategory = (typeof TICKET_CATEGORIES)[number]["value"];

// ── Ticket Status ────────────────────────────────────────
export const TICKET_STATUSES = [
  { value: "open", label: "Open" },
  { value: "in_progress", label: "In Progress" },
  { value: "resolved", label: "Resolved" },
  { value: "closed", label: "Closed" },
] as const;

export type TicketStatus = (typeof TICKET_STATUSES)[number]["value"];

// ── Ticket Priority ──────────────────────────────────────
export const TICKET_PRIORITIES = [
  { value: "low", label: "Low" },
  { value: "normal", label: "Normal" },
  { value: "high", label: "High" },
  { value: "urgent", label: "Urgent" },
] as const;

export type TicketPriority = (typeof TICKET_PRIORITIES)[number]["value"];

// ── Invoice Status ──────────────────────────────────────
export const INVOICE_STATUSES = [
  { value: "pending", label: "Pending" },
  { value: "paid", label: "Paid" },
  { value: "overdue", label: "Overdue" },
  { value: "cancelled", label: "Cancelled" },
] as const;

export type InvoiceStatus = (typeof INVOICE_STATUSES)[number]["value"];

// ── Pagination ──────────────────────────────────────────
export const DEFAULT_PAGE = 1;
export const DEFAULT_PAGE_SIZE = 10;
export const MAX_PAGE_SIZE = 100;
