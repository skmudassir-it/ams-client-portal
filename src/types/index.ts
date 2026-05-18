import type { User as PrismaUser, Invoice as PrismaInvoice, SupportTicket as PrismaTicket, TicketReply as PrismaReply } from "@prisma/client";

// ── API Response Wrapper ─────────────────────────────────
export type ApiResponse<T> = {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
};

// ── Paginated Response ───────────────────────────────────
export type PaginatedResponse<T> = {
  success: boolean;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

// ── Re-export Prisma types (for convenience) ─────────────
export type User = PrismaUser;
export type Invoice = PrismaInvoice;
export type Ticket = PrismaTicket;
export type TicketReply = PrismaReply;

export type InvoiceStatus = "paid" | "pending" | "overdue" | "cancelled";
export type TicketStatus = "open" | "in_progress" | "resolved" | "closed";
export type TicketCategory = "billing" | "technical" | "general" | "account";

// ── Dashboard Summary ────────────────────────────────────
export type DashboardSummary = {
  totalInvoices: number;
  unpaidInvoices: number;
  openTickets: number;
  resolvedTickets: number;
};

// ── Session User (returned from auth) ────────────────────
export type SessionUser = {
  id: string;
  name?: string | null;
  email?: string | null;
};
