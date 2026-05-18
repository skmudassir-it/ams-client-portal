import { z } from "zod";

// ── Login ────────────────────────────────────────────────
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters"),
});

export type LoginInput = z.infer<typeof loginSchema>;

// ── Register ─────────────────────────────────────────────
export const registerSchema = z
  .object({
    name: z
      .string()
      .min(1, "Name is required")
      .min(2, "Name must be at least 2 characters")
      .max(100, "Name must be under 100 characters"),
    email: z
      .string()
      .min(1, "Email is required")
      .email("Please enter a valid email address"),
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must be at least 8 characters")
      .max(128, "Password must be under 128 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type RegisterInput = z.infer<typeof registerSchema>;

// ── Ticket ───────────────────────────────────────────────
export const ticketCategories = [
  "billing",
  "technical",
  "general",
  "account",
] as const;

export const ticketSchema = z.object({
  category: z.enum(ticketCategories, {
    message: "Please select a valid category",
  }),
  subject: z
    .string()
    .min(1, "Subject is required")
    .min(5, "Subject must be at least 5 characters")
    .max(200, "Subject must be under 200 characters"),
  description: z
    .string()
    .min(1, "Description is required")
    .min(10, "Description must be at least 10 characters")
    .max(5000, "Description must be under 5000 characters"),
});

export type TicketInput = z.infer<typeof ticketSchema>;

// ── Ticket Reply ─────────────────────────────────────────
export const ticketReplySchema = z.object({
  message: z
    .string()
    .min(1, "Reply cannot be empty")
    .max(5000, "Reply must be under 5000 characters"),
});

export type TicketReplyInput = z.infer<typeof ticketReplySchema>;

// ── Profile Update ──────────────────────────────────────
export const profileUpdateSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be under 100 characters"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
});

export type ProfileUpdateInput = z.infer<typeof profileUpdateSchema>;

// ── Password Change ─────────────────────────────────────
export const passwordChangeSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z
      .string()
      .min(1, "New password is required")
      .min(8, "Password must be at least 8 characters")
      .max(128, "Password must be under 128 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number"),
    confirmNewPassword: z.string().min(1, "Please confirm your new password"),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords do not match",
    path: ["confirmNewPassword"],
  });

export type PasswordChangeInput = z.infer<typeof passwordChangeSchema>;
