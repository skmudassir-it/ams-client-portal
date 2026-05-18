# AMS Client Portal — Implementation Plan

**Author:** Taylor — Senior Project Manager & Tech Lead, AMS IT Services
**Date:** 2026-05-18
**Repo:** `github.com/skmudassir-it/ams-client-portal`
**Deploy:** Vercel (Next.js frontend + API routes)

---

## 1. Project Goal & Success Criteria

### What We're Building
A secure, mobile-first **Client Portal** where AMS IT Services clients can:
- Register and log in with email + password
- View an account summary dashboard
- Browse and download invoices
- Submit and track support tickets
- Update their profile and password

### What Success Looks Like
- [x] All 5 feature areas ship and pass QA
- [x] Lighthouse score ≥ 90 (Performance, Accessibility, Best Practices, SEO)
- [x] WCAG AA compliant (axe DevTools reports zero violations)
- [x] Mobile-first responsive — PWA-quality on phones
- [x] Vercel deployment passes production build with zero errors
- [x] 100% of acceptance criteria met per user story

---

## 2. Architecture Summary

```
┌─────────────────────────────────────────────────┐
│                    Vercel                       │
│  ┌───────────────────────────────────────────┐  │
│  │         Next.js 15 App Router             │  │
│  │                                           │  │
│  │  ┌──────────┐  ┌──────────────────────┐   │  │
│  │  │  Server  │  │   API Route Handlers │   │  │
│  │  │Components│  │  (REST endpoints)    │   │  │
│  │  └────┬─────┘  └──────────┬───────────┘   │  │
│  │       │                   │               │  │
│  │  ┌────┴───────────────────┴───────────┐   │  │
│  │  │        Prisma ORM + SQLite         │   │  │
│  │  │    (dev: file, prod: Turso/LiteFS) │   │  │
│  │  └────────────────────────────────────┘   │  │
│  └───────────────────────────────────────────┘  │
└─────────────────────────────────────────────────┘
```

**Data Flow:** Browser → Next.js Server Component / API Route → Prisma → SQLite → JSON response → RSC serialization or client-side render.

**Auth Flow:** NextAuth.js v5 (Auth.js) with Credentials provider → JWT session stored in HTTP-only cookie → middleware protects routes via `middleware.ts`.

---

## 3. Tech Stack Details

| Layer | Technology | Version | Purpose |
|-------|-----------|---------|---------|
| Framework | Next.js | 15.x (latest stable) | Full-stack React framework |
| Language | TypeScript | 5.x | Type safety |
| Styling | Tailwind CSS | v4 | Utility-first CSS |
| Components | shadcn/ui | latest | Accessible UI primitives |
| Icons | lucide-react | latest | Icon library |
| ORM | Prisma | 6.x | Database ORM |
| Database | SQLite | 3.x | Local dev / single-file DB |
| Auth | NextAuth.js (Auth.js) | v5 | Authentication + sessions |
| Validation | Zod | latest | Schema validation |
| Forms | react-hook-form | latest | Form state management |
| Toast | sonner | latest | Toast notifications |
| Date | date-fns | latest | Date formatting |
| PDF | @react-pdf/renderer | latest | Invoice PDF generation |
| Testing | Vitest + Testing Library | latest | Unit + integration tests |
| Linting | ESLint + Prettier | latest | Code quality |
| Deployment | Vercel | — | Hosting + serverless API |

---

## 4. Complete Folder Structure

```
/home/shaik/projects/ams-client-portal/
├── .env.local                          # Environment variables (git-ignored)
├── .env.example                        # Template for env vars
├── .eslintrc.json                      # ESLint configuration
├── .gitignore                          # Git ignore rules
├── .prettierrc                         # Prettier configuration
├── next.config.ts                      # Next.js configuration
├── package.json                        # Dependencies + scripts
├── postcss.config.mjs                  # PostCSS config (Tailwind v4)
├── tailwind.config.ts                  # Tailwind configuration
├── tsconfig.json                       # TypeScript configuration
├── vitest.config.ts                    # Vitest configuration
├── PLAN.md                             # This file
├── README.md                           # Project documentation
│
├── prisma/
│   ├── schema.prisma                   # Database schema
│   ├── seed.ts                         # Seed script (demo data)
│   └── migrations/                     # Auto-generated migrations
│
├── public/
│   ├── favicon.ico                     # Site favicon
│   ├── logo.svg                        # AMS logo
│   └── placeholder-invoice.pdf         # Fallback invoice PDF
│
├── src/
│   ├── app/                            # Next.js App Router pages
│   │   ├── layout.tsx                  # Root layout
│   │   ├── page.tsx                    # Landing / redirect page
│   │   ├── loading.tsx                 # Root loading state
│   │   ├── error.tsx                   # Root error boundary
│   │   ├── not-found.tsx              # 404 page
│   │   │
│   │   ├── (auth)/                     # Auth route group (no sidebar)
│   │   │   ├── layout.tsx             # Auth layout (centered card)
│   │   │   ├── login/
│   │   │   │   └── page.tsx           # Login page
│   │   │   └── register/
│   │   │       └── page.tsx           # Registration page
│   │   │
│   │   ├── (dashboard)/               # Protected route group (with sidebar)
│   │   │   ├── layout.tsx             # Dashboard layout (sidebar + header)
│   │   │   ├── dashboard/
│   │   │   │   ├── page.tsx           # Account summary dashboard
│   │   │   │   └── loading.tsx        # Dashboard loading skeleton
│   │   │   ├── invoices/
│   │   │   │   ├── page.tsx           # Invoice list
│   │   │   │   ├── loading.tsx        # Invoice list loading
│   │   │   │   └── [id]/
│   │   │   │       ├── page.tsx       # Invoice detail + download
│   │   │   │       └── loading.tsx    # Invoice detail loading
│   │   │   ├── tickets/
│   │   │   │   ├── page.tsx           # Ticket list
│   │   │   │   ├── loading.tsx        # Ticket list loading
│   │   │   │   ├── new/
│   │   │   │   │   └── page.tsx       # Create ticket form
│   │   │   │   └── [id]/
│   │   │   │       ├── page.tsx       # Ticket detail + replies
│   │   │   │       └── loading.tsx    # Ticket detail loading
│   │   │   └── profile/
│   │   │       ├── page.tsx           # Profile management
│   │   │       └── loading.tsx        # Profile loading
│   │   │
│   │   └── api/                        # API route handlers
│   │       ├── auth/
│   │       │   ├── register/
│   │       │   │   └── route.ts       # POST /api/auth/register
│   │       │   └── [...nextauth]/
│   │       │       └── route.ts       # Auth.js catch-all
│   │       ├── dashboard/
│   │       │   └── summary/
│   │       │       └── route.ts       # GET /api/dashboard/summary
│   │       ├── invoices/
│   │       │   ├── route.ts           # GET /api/invoices
│   │       │   └── [id]/
│   │       │       ├── route.ts       # GET /api/invoices/[id]
│   │       │       └── download/
│   │       │           └── route.ts   # GET /api/invoices/[id]/download
│   │       ├── tickets/
│   │       │   ├── route.ts           # GET + POST /api/tickets
│   │       │   └── [id]/
│   │       │       ├── route.ts       # GET + PATCH /api/tickets/[id]
│   │       │       └── replies/
│   │       │           └── route.ts   # POST /api/tickets/[id]/replies
│   │       └── profile/
│   │           ├── route.ts           # GET + PATCH /api/profile
│   │           └── password/
│   │               └── route.ts       # PATCH /api/profile/password
│   │
│   ├── components/                     # React components
│   │   ├── ui/                         # shadcn/ui primitives (auto-generated)
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── input.tsx
│   │   │   ├── label.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── dropdown-menu.tsx
│   │   │   ├── select.tsx
│   │   │   ├── textarea.tsx
│   │   │   ├── skeleton.tsx
│   │   │   ├── table.tsx
│   │   │   ├── separator.tsx
│   │   │   ├── sheet.tsx
│   │   │   ├── avatar.tsx
│   │   │   ├── toast.tsx
│   │   │   └── tooltip.tsx
│   │   │
│   │   ├── layout/
│   │   │   ├── sidebar.tsx             # Desktop sidebar nav
│   │   │   ├── mobile-nav.tsx          # Mobile bottom nav / hamburger
│   │   │   ├── header.tsx              # Top header with user menu
│   │   │   └── breadcrumb.tsx          # Dynamic breadcrumb
│   │   │
│   │   ├── auth/
│   │   │   ├── login-form.tsx          # Email + password login form
│   │   │   └── register-form.tsx       # Registration form with validation
│   │   │
│   │   ├── dashboard/
│   │   │   ├── account-summary.tsx     # Stats cards row
│   │   │   ├── recent-invoices.tsx     # Last 5 invoices table
│   │   │   └── recent-tickets.tsx      # Last 5 tickets table
│   │   │
│   │   ├── invoices/
│   │   │   ├── invoice-list.tsx        # Filterable invoice table
│   │   │   ├── invoice-card.tsx        # Mobile invoice card (list view)
│   │   │   ├── invoice-detail.tsx      # Full invoice detail panel
│   │   │   ├── invoice-status-badge.tsx # Status badge component
│   │   │   └── invoice-download-btn.tsx # Download button
│   │   │
│   │   ├── tickets/
│   │   │   ├── ticket-list.tsx         # Filterable ticket table
│   │   │   ├── ticket-card.tsx         # Mobile ticket card
│   │   │   ├── ticket-form.tsx         # Create ticket form
│   │   │   ├── ticket-detail.tsx       # Full ticket detail + replies
│   │   │   ├── ticket-status-badge.tsx # Status badge
│   │   │   ├── ticket-reply-list.tsx   # Reply thread
│   │   │   └── ticket-reply-form.tsx   # New reply form
│   │   │
│   │   ├── profile/
│   │   │   ├── profile-form.tsx        # Name + email form
│   │   │   └── password-form.tsx       # Change password form
│   │   │
│   │   └── shared/
│   │       ├── empty-state.tsx         # "No data" placeholder
│   │       ├── error-state.tsx         # Error display with retry
│   │       ├── loading-skeleton.tsx    # Reusable skeleton
│   │       ├── confirm-dialog.tsx      # Confirmation modal
│   │       ├── pagination.tsx          # Page navigation
│   │       └── search-input.tsx        # Debounced search bar
│   │
│   ├── lib/                            # Utility modules
│   │   ├── auth.ts                     # Auth.js config + callbacks
│   │   ├── auth-utils.ts               # getServerSession, getUser helpers
│   │   ├── prisma.ts                   # Singleton Prisma client
│   │   ├── validations.ts              # Zod schemas for all forms
│   │   ├── utils.ts                    # cn(), formatCurrency(), formatDate()
│   │   ├── constants.ts                # Ticket categories, status enums
│   │   └── email.ts                    # Email notification stubs
│   │
│   ├── hooks/                          # Custom React hooks
│   │   ├── use-user.ts                 # Current user data hook
│   │   ├── use-invoices.ts             # Invoice fetching + filtering
│   │   ├── use-tickets.ts              # Ticket fetching + filtering
│   │   └── use-debounce.ts             # Debounce utility hook
│   │
│   ├── types/                          # TypeScript type definitions
│   │   └── index.ts                    # Shared types (User, Invoice, Ticket, ApiResponse)
│   │
│   └── middleware.ts                   # Next.js middleware (auth guard)
│
└── tests/
    ├── setup.ts                        # Vitest setup (Testing Library)
    ├── components/                     # Component unit tests
    ├── api/                            # API route integration tests
    └── e2e/                            # Playwright E2E tests (future)
```

---

## 5. Database Schema (Prisma)

```prisma
// prisma/schema.prisma
// Run: npx prisma migrate dev --name init

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")  // file:./dev.db
}

model User {
  id           String          @id @default(cuid())
  name         String
  email        String          @unique
  passwordHash String          @map("password_hash")
  createdAt    DateTime        @default(now()) @map("created_at")
  updatedAt    DateTime        @updatedAt @map("updated_at")

  invoices      Invoice[]
  supportTickets SupportTicket[]
  ticketReplies TicketReply[]

  @@map("users")
}

model Invoice {
  id            String    @id @default(cuid())
  userId        String    @map("user_id")
  invoiceNumber String    @unique @map("invoice_number")
  amount        Float
  currency      String    @default("USD")
  status        String    @default("pending")  // pending | paid | overdue | cancelled
  issuedDate    DateTime  @map("issued_date")
  dueDate       DateTime  @map("due_date")
  description   String    @default("")
  pdfUrl        String?   @map("pdf_url")      // Path to stored PDF or external URL
  createdAt     DateTime  @default(now()) @map("created_at")

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@map("invoices")
}

model SupportTicket {
  id          String    @id @default(cuid())
  userId      String    @map("user_id")
  category    String                       // billing | technical | general | account
  subject     String
  description String
  status      String    @default("open")   // open | in_progress | resolved | closed
  priority    String    @default("normal") // low | normal | high | urgent
  createdAt   DateTime  @default(now()) @map("created_at")
  updatedAt   DateTime  @updatedAt @map("updated_at")

  user    User          @relation(fields: [userId], references: [id], onDelete: Cascade)
  replies TicketReply[]

  @@map("support_tickets")
}

model TicketReply {
  id        String   @id @default(cuid())
  ticketId  String   @map("ticket_id")
  userId    String   @map("user_id")
  message   String
  isStaff   Boolean  @default(false) @map("is_staff")  // Differentiate staff replies
  createdAt DateTime @default(now()) @map("created_at")

  ticket SupportTicket @relation(fields: [ticketId], references: [id], onDelete: Cascade)
  user   User          @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@map("ticket_replies")
}
```

---

## 6. API Endpoints

### Authentication

| Method | Path | Description | Auth Required |
|--------|------|-------------|:---:|
| `POST` | `/api/auth/register` | Create new user account | No |
| `POST` | `/api/auth/callback/credentials` | Login (handled by Auth.js) | No |
| `GET`  | `/api/auth/session` | Get current session | No |
| `POST` | `/api/auth/signout` | Logout | Yes |

### Dashboard

| Method | Path | Description | Auth Required |
|--------|------|-------------|:---:|
| `GET` | `/api/dashboard/summary` | Get counts: total invoices, unpaid invoices, open tickets, resolved tickets | Yes |

### Invoices

| Method | Path | Description | Auth Required |
|--------|------|-------------|:---:|
| `GET` | `/api/invoices` | List user's invoices (?status, ?page, ?limit) | Yes |
| `GET` | `/api/invoices/[id]` | Get single invoice detail | Yes |
| `GET` | `/api/invoices/[id]/download` | Download invoice PDF | Yes |

### Support Tickets

| Method | Path | Description | Auth Required |
|--------|------|-------------|:---:|
| `GET` | `/api/tickets` | List user's tickets (?status, ?category, ?page, ?limit) | Yes |
| `POST` | `/api/tickets` | Create new ticket | Yes |
| `GET` | `/api/tickets/[id]` | Get ticket with replies | Yes |
| `PATCH` | `/api/tickets/[id]` | Update ticket (close, update description) | Yes |
| `POST` | `/api/tickets/[id]/replies` | Add reply to ticket | Yes |

### Profile

| Method | Path | Description | Auth Required |
|--------|------|-------------|:---:|
| `GET` | `/api/profile` | Get current user profile | Yes |
| `PATCH` | `/api/profile` | Update name and/or email | Yes |
| `PATCH` | `/api/profile/password` | Change password | Yes |

---

## 7. Component Tree

```
<RootLayout>
├── (AuthLayout) — route group (auth)
│   ├── <LoginForm>
│   │   ├── <Input /> (email)
│   │   ├── <Input /> (password)
│   │   └── <Button />
│   └── <RegisterForm>
│       ├── <Input /> (name)
│       ├── <Input /> (email)
│       ├── <Input /> (password)
│       ├── <Input /> (confirm password)
│       └── <Button />
│
└── (DashboardLayout) — route group (dashboard)
    ├── <Sidebar /> — desktop nav
    │   ├── Nav links (Dashboard, Invoices, Tickets, Profile)
    │   └── User avatar + name at bottom
    ├── <MobileNav /> — mobile hamburger/bottom-nav
    ├── <Header />
    │   ├── <Breadcrumb />
    │   └── <UserMenu /> (dropdown: Profile, Logout)
    │
    ├── /dashboard
    │   └── <DashboardPage>
    │       ├── <AccountSummary /> — 4 stat cards
    │       ├── <RecentInvoices /> — <Table> with <InvoiceStatusBadge />
    │       └── <RecentTickets /> — <Table> with <TicketStatusBadge />
    │
    ├── /invoices
    │   ├── <InvoicesPage>
    │   │   ├── <SearchInput />
    │   │   ├── <Select /> (status filter)
    │   │   ├── <InvoiceList> (desktop: <Table>, mobile: <InvoiceCard>[])
    │   │   └── <Pagination />
    │   └── /invoices/[id]
    │       └── <InvoiceDetailPage>
    │           ├── <InvoiceDetail />
    │           ├── <InvoiceStatusBadge />
    │           └── <InvoiceDownloadBtn />
    │
    ├── /tickets
    │   ├── <TicketsPage>
    │   │   ├── <SearchInput />
    │   │   ├── <Select /> (status + category filters)
    │   │   ├── <Button /> ("New Ticket")
    │   │   ├── <TicketList> (desktop: <Table>, mobile: <TicketCard>[])
    │   │   └── <Pagination />
    │   ├── /tickets/new
    │   │   └── <TicketFormPage>
    │   │       └── <TicketForm>
    │   │           ├── <Select /> (category)
    │   │           ├── <Input /> (subject)
    │   │           ├── <Textarea /> (description)
    │   │           └── <Button />
    │   └── /tickets/[id]
    │       └── <TicketDetailPage>
    │           ├── <TicketDetail />
    │           ├── <TicketStatusBadge />
    │           ├── <TicketReplyList>
    │           │   └── <Card />[] (each reply)
    │           └── <TicketReplyForm>
    │               ├── <Textarea />
    │               └── <Button />
    │
    └── /profile
        └── <ProfilePage>
            ├── <ProfileForm>
            │   ├── <Input /> (name)
            │   ├── <Input /> (email)
            │   └── <Button />
            └── <PasswordForm>
                ├── <Input /> (current password)
                ├── <Input /> (new password)
                ├── <Input /> (confirm new password)
                └── <Button />
```

---

## 8. Sprint Plan

**Sprint cadence:** 7 sprints, ~2–3 days each
**Total tickets:** 62
**Team:** Alex (dev), Riley (design review), Sam (QA), Jordan (CI/CD + deploy)

---

### Sprint 0: Project Scaffolding & Foundation (Day 0.5)

**Goal:** Working Next.js 15 project with all configs, shadcn/ui, Prisma, Auth.js skeletons.

| # | Task | Owner | Est. | Priority | Dependencies |
|---|------|-------|------|----------|-------------|
| T0.1 | Run `npx create-next-app@latest ams-client-portal --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"` in `/home/shaik/projects/` | Alex | 5 min | P0 | None |
| T0.2 | `cd ams-client-portal && npx shadcn@latest init -d` (defaults, slate color, css variables) | Alex | 3 min | P0 | T0.1 |
| T0.3 | Add shadcn components: `npx shadcn@latest add button card input label badge dialog dropdown-menu select textarea skeleton table separator sheet avatar toast tooltip` | Alex | 5 min | P0 | T0.2 |
| T0.4 | Install deps: `npm install next-auth@beta @auth/prisma-adapter prisma @prisma/client zod react-hook-form @hookform/resolvers sonner lucide-react date-fns` | Alex | 3 min | P0 | T0.1 |
| T0.5 | Install dev deps: `npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom @vitejs/plugin-react prettier` | Alex | 2 min | P0 | T0.1 |
| T0.6 | Create `.env.local`: `DATABASE_URL="file:./dev.db"`, `AUTH_SECRET="<generate>"`, `AUTH_URL="http://localhost:3000"` | Alex | 3 min | P0 | T0.1 |
| T0.7 | Create `prisma/schema.prisma` with the schema from Section 5 of this plan | Alex | 10 min | P0 | T0.4 |
| T0.8 | Run `npx prisma migrate dev --name init` to generate migration + client | Alex | 2 min | P0 | T0.7 |
| T0.9 | Create `src/lib/prisma.ts` — singleton Prisma client (prevent hot-reload instances) | Alex | 5 min | P0 | T0.8 |
| T0.10 | Create `src/lib/auth.ts` — Auth.js v5 config with Credentials provider, JWT callbacks | Alex | 15 min | P0 | T0.4 |
| T0.11 | Create `src/app/api/auth/[...nextauth]/route.ts` — `export { GET, POST } from "@/lib/auth"` | Alex | 2 min | P0 | T0.10 |
| T0.12 | Create `src/lib/validations.ts` — Zod schemas for login, register, ticket, profile, password | Alex | 15 min | P1 | T0.4 |
| T0.13 | Create `src/lib/utils.ts` — `cn()`, `formatCurrency()`, `formatDate()` | Alex | 10 min | P1 | T0.1 |
| T0.14 | Create `src/lib/constants.ts` — ticket categories, status enums, priority levels | Alex | 5 min | P1 | T0.1 |
| T0.15 | Create `src/types/index.ts` — ApiResponse<T>, User, Invoice, Ticket, TicketReply types | Alex | 10 min | P1 | T0.1 |
| T0.16 | Create `src/app/globals.css` — Tailwind v4 directives + CSS custom properties (shadcn theme) | Alex | 5 min | P0 | T0.2 |
| T0.17 | Verify: `npm run build` passes cleanly | Alex | 3 min | P0 | T0.1–T0.16 |

**Sprint 0 Done:** Project compiles, Prisma migrates, Auth.js skeleton exists, shadcn/ui primitives available.

---

### Sprint 1: Authentication System (Day 1)

**Goal:** Users can register, log in, log out. Route protection works.

| # | Task | Owner | Est. | Priority | Dependencies |
|---|------|-------|------|----------|-------------|
| T1.1 | Create `src/lib/auth-utils.ts` — `getServerSession()`, `getCurrentUser()`, `requireAuth()` helpers | Alex | 10 min | P0 | T0.10 |
| T1.2 | Create `POST /api/auth/register/route.ts` — validate with Zod, hash password with bcrypt (or `crypto`), insert user, return 201 | Alex | 20 min | P0 | T0.9, T0.12 |
| T1.3 | Create `src/middleware.ts` — protect all `/(dashboard)/*` routes, redirect to `/login` if no session | Alex | 10 min | P0 | T1.1 |
| T1.4 | Create `src/app/(auth)/layout.tsx` — centered card layout with AMS logo, no sidebar | Alex | 10 min | P0 | T0.2 |
| T1.5 | Create `src/components/auth/login-form.tsx` — email + password inputs, validation errors, "Register" link, loading state, toast on error | Alex | 20 min | P0 | T0.3, T0.12 |
| T1.6 | Create `src/app/(auth)/login/page.tsx` — renders `<LoginForm />`, redirects to `/dashboard` if already authenticated | Alex | 10 min | P0 | T1.5 |
| T1.7 | Create `src/components/auth/register-form.tsx` — name + email + password + confirm, Zod validation, password strength indicator, toast | Alex | 25 min | P0 | T0.3, T0.12 |
| T1.8 | Create `src/app/(auth)/register/page.tsx` — renders `<RegisterForm />`, redirect if authenticated | Alex | 8 min | P0 | T1.7 |
| T1.9 | Create `src/app/page.tsx` — redirect to `/dashboard` if authenticated, else to `/login` | Alex | 5 min | P1 | T1.3 |
| T1.10 | Create `prisma/seed.ts` — seed 1 demo user (demo@ams.com / Password123!) with 5 invoices + 3 tickets | Alex | 20 min | P1 | T0.8 |
| T1.11 | Add `"seed": "tsx prisma/seed.ts"` to `package.json` scripts | Alex | 2 min | P1 | T1.10 |
| T1.12 | QA: Sam tests register → login → session persists → logout → redirect to login | Sam | 15 min | P0 | T1.1–T1.9 |
| T1.13 | QA: Sam tests validation edge cases (duplicate email, weak password, empty fields) | Sam | 10 min | P0 | T1.12 |

**Sprint 1 Done:** Full auth flow works end-to-end. Demo user seedable.

---

### Sprint 2: Dashboard + Layout Shell (Day 1.5)

**Goal:** Authenticated users see sidebar nav and account summary dashboard.

| # | Task | Owner | Est. | Priority | Dependencies |
|---|------|-------|------|----------|-------------|
| T2.1 | Create `src/components/layout/sidebar.tsx` — nav links (Dashboard, Invoices, Tickets, Profile) with lucide icons, active state, user avatar at bottom | Alex | 25 min | P0 | T0.3 |
| T2.2 | Create `src/components/layout/header.tsx` — breadcrumb, user dropdown (Profile, Sign Out) with avatar | Alex | 20 min | P0 | T0.3, T1.1 |
| T2.3 | Create `src/components/layout/mobile-nav.tsx` — Sheet (shadcn) on mobile, bottom nav bar alternative | Alex | 20 min | P0 | T0.3 |
| T2.4 | Create `src/components/layout/breadcrumb.tsx` — dynamic breadcrumb reading from pathname, render with `ChevronRight` separator | Alex | 15 min | P1 | T0.3 |
| T2.5 | Create `src/app/(dashboard)/layout.tsx` — sidebar + header + `<main>` content area, responsive (sidebar hidden on mobile), auth guard check | Alex | 20 min | P0 | T2.1, T2.2, T2.3 |
| T2.6 | Create `GET /api/dashboard/summary/route.ts` — return `{ totalInvoices, unpaidInvoices, openTickets, resolvedTickets }` for current user | Alex | 15 min | P0 | T0.9 |
| T2.7 | Create `src/components/dashboard/account-summary.tsx` — 4 stat cards (Total Invoices, Unpaid, Open Tickets, Resolved) with icons and count | Alex | 15 min | P0 | T0.3, T2.6 |
| T2.8 | Create `src/components/dashboard/recent-invoices.tsx` — last 5 invoices table (Invoice #, Amount, Status, Date) | Alex | 15 min | P0 | T0.3 |
| T2.9 | Create `src/components/dashboard/recent-tickets.tsx` — last 5 tickets table (Subject, Category, Status, Date) | Alex | 15 min | P0 | T0.3 |
| T2.10 | Create `src/app/(dashboard)/dashboard/page.tsx` — server component: fetch summary + recent data, render `<AccountSummary />`, `<RecentInvoices />`, `<RecentTickets />` | Alex | 20 min | P0 | T2.5–T2.9 |
| T2.11 | Create `src/app/(dashboard)/dashboard/loading.tsx` — skeleton cards mirroring dashboard layout | Alex | 8 min | P1 | T2.10 |
| T2.12 | QA: Sam verifies dashboard loads, counts match seed data, responsive layout works mobile+desktop | Sam | 15 min | P0 | T2.10 |
| T2.13 | Design review: Riley reviews layout, spacing, color contrast, mobile nav UX | Riley | 15 min | P1 | T2.5 |

**Sprint 2 Done:** Dashboard shell complete, summary stats visible, responsive layout working.

---

### Sprint 3: Invoice Management (Day 2)

**Goal:** Users can browse invoices, view details, and download PDFs.

| # | Task | Owner | Est. | Priority | Dependencies |
|---|------|-------|------|----------|-------------|
| T3.1 | Create `GET /api/invoices/route.ts` — paginated list (?page, ?limit, ?status filter), ordered by issuedDate desc. Only user's invoices. | Alex | 20 min | P0 | T0.9 |
| T3.2 | Create `GET /api/invoices/[id]/route.ts` — single invoice detail, 404 if not found or not owned | Alex | 10 min | P0 | T0.9 |
| T3.3 | Create `GET /api/invoices/[id]/download/route.ts` — return PDF file (or generate placeholder + redirect to URL). For demo: return a static PDF or generate simple PDF with invoice data. | Alex | 20 min | P0 | T0.9 |
| T3.4 | Create `src/components/invoices/invoice-status-badge.tsx` — badge with variant colors: pending=yellow, paid=green, overdue=red, cancelled=gray | Alex | 10 min | P0 | T0.3 |
| T3.5 | Create `src/components/invoices/invoice-card.tsx` — mobile card: Invoice #, Amount (bold), Status badge, Due date, chevron | Alex | 15 min | P0 | T3.4 |
| T3.6 | Create `src/components/invoices/invoice-list.tsx` — responsive: desktop `<Table>`, mobile stacked `<InvoiceCard>` list. Includes status filter dropdown | Alex | 25 min | P0 | T3.5, T0.3 |
| T3.7 | Create `src/components/shared/search-input.tsx` — debounced input (300ms), search icon, clear button | Alex | 15 min | P1 | T0.3 |
| T3.8 | Create `src/components/shared/pagination.tsx` — Previous/Next buttons, page number display, disabled states | Alex | 15 min | P1 | T0.3 |
| T3.9 | Create `src/app/(dashboard)/invoices/page.tsx` — server component: fetch invoices, render `<InvoiceList>`, `<SearchInput>`, `<Pagination>`, status filter | Alex | 20 min | P0 | T3.1, T3.6–T3.8 |
| T3.10 | Create `src/app/(dashboard)/invoices/loading.tsx` — skeleton table rows | Alex | 8 min | P0 | T3.9 |
| T3.11 | Create `src/components/invoices/invoice-detail.tsx` — card with all invoice fields: Invoice #, Amount, Status badge, Issue date, Due date, Description | Alex | 15 min | P0 | T3.4 |
| T3.12 | Create `src/components/invoices/invoice-download-btn.tsx` — button that triggers download API, loading state, toast on error | Alex | 12 min | P0 | T3.3 |
| T3.13 | Create `src/app/(dashboard)/invoices/[id]/page.tsx` — server component: fetch invoice, render `<InvoiceDetail>` + `<InvoiceDownloadBtn>`, back link | Alex | 15 min | P0 | T3.2, T3.11, T3.12 |
| T3.14 | Create `src/app/(dashboard)/invoices/[id]/loading.tsx` — skeleton detail card | Alex | 5 min | P1 | T3.13 |
| T3.15 | QA: Sam tests invoice list (pagination, status filter), detail page, PDF download, 404 for other user's invoice | Sam | 20 min | P0 | T3.9–T3.14 |

**Sprint 3 Done:** Invoices fully browsable, filterable, and downloadable.

---

### Sprint 4: Support Tickets (Day 3)

**Goal:** Users can create tickets, view list, see detail with replies.

| # | Task | Owner | Est. | Priority | Dependencies |
|---|------|-------|------|----------|-------------|
| T4.1 | Create `GET /api/tickets/route.ts` — paginated list (?status, ?category, ?page, ?limit), ordered by updatedAt desc | Alex | 20 min | P0 | T0.9 |
| T4.2 | Create `POST /api/tickets/route.ts` — validate with Zod, create ticket, return 201 with new ticket | Alex | 15 min | P0 | T0.9, T0.12 |
| T4.3 | Create `GET /api/tickets/[id]/route.ts` — single ticket with replies (include `replies` relation), 404 if not found/owned | Alex | 10 min | P0 | T0.9 |
| T4.4 | Create `PATCH /api/tickets/[id]/route.ts` — update ticket status or description, validate ownership | Alex | 15 min | P0 | T0.9 |
| T4.5 | Create `POST /api/tickets/[id]/replies/route.ts` — add reply, validate with Zod, update ticket updatedAt | Alex | 15 min | P0 | T0.9, T0.12 |
| T4.6 | Create `src/components/tickets/ticket-status-badge.tsx` — open=blue, in_progress=yellow, resolved=green, closed=gray | Alex | 8 min | P0 | T0.3 |
| T4.7 | Create `src/components/tickets/ticket-card.tsx` — mobile card: Subject, Category, Status badge, Date, chevron | Alex | 12 min | P0 | T4.6 |
| T4.8 | Create `src/components/tickets/ticket-list.tsx` — responsive: desktop `<Table>`, mobile stacked cards. Status + category filters | Alex | 20 min | P0 | T4.7, T0.3 |
| T4.9 | Create `src/app/(dashboard)/tickets/page.tsx` — server component: fetch tickets, render `<TicketList>`, filters, "New Ticket" button, pagination | Alex | 20 min | P0 | T4.1, T4.8, T3.7, T3.8 |
| T4.10 | Create `src/app/(dashboard)/tickets/loading.tsx` — skeleton table | Alex | 5 min | P0 | T4.9 |
| T4.11 | Create `src/components/tickets/ticket-form.tsx` — category select, subject input, description textarea, react-hook-form + Zod validation, loading state, toast | Alex | 25 min | P0 | T0.3, T0.12 |
| T4.12 | Create `src/app/(dashboard)/tickets/new/page.tsx` — render `<TicketForm>`, redirect to `/tickets/[id]` on success | Alex | 12 min | P0 | T4.11 |
| T4.13 | Create `src/components/tickets/ticket-detail.tsx` — full ticket info card: subject, category, status badge, priority, description, dates | Alex | 12 min | P0 | T4.6 |
| T4.14 | Create `src/components/tickets/ticket-reply-list.tsx` — thread of replies: each reply has author name, message, timestamp, staff indicator | Alex | 15 min | P0 | T0.3 |
| T4.15 | Create `src/components/tickets/ticket-reply-form.tsx` — textarea + submit, react-hook-form + Zod, toast on success, append reply to list optimistically | Alex | 15 min | P0 | T0.3, T0.12 |
| T4.16 | Create `src/app/(dashboard)/tickets/[id]/page.tsx` — server component: fetch ticket with replies, render `<TicketDetail>` + `<TicketReplyList>` + `<TicketReplyForm>` + status update button (close ticket) | Alex | 20 min | P0 | T4.3, T4.13–T4.15 |
| T4.17 | Create `src/app/(dashboard)/tickets/[id]/loading.tsx` — skeleton detail | Alex | 5 min | P1 | T4.16 |
| T4.18 | QA: Sam tests full ticket lifecycle — create, view list, view detail, reply, close, filter by status/category | Sam | 20 min | P0 | T4.9–T4.17 |

**Sprint 4 Done:** Full ticket CRUD working. Replies functional.

---

### Sprint 5: Profile Management (Day 3.5)

**Goal:** Users can update their name, email, and password.

| # | Task | Owner | Est. | Priority | Dependencies |
|---|------|-------|------|----------|-------------|
| T5.1 | Create `GET /api/profile/route.ts` — return current user (name, email, createdAt) | Alex | 8 min | P0 | T0.9 |
| T5.2 | Create `PATCH /api/profile/route.ts` — update name and/or email, validate with Zod (email uniqueness), return updated user | Alex | 15 min | P0 | T0.9, T0.12 |
| T5.3 | Create `PATCH /api/profile/password/route.ts` — verify current password, validate new password, hash and update. Return 400 on wrong current password. | Alex | 15 min | P0 | T0.9, T0.12 |
| T5.4 | Create `src/components/profile/profile-form.tsx` — name + email inputs pre-filled from user data, react-hook-form + Zod, save button, toast on success/error | Alex | 20 min | P0 | T0.3, T0.12 |
| T5.5 | Create `src/components/profile/password-form.tsx` — current password + new password + confirm inputs, password mismatch check, strength indicator, save button, toast | Alex | 20 min | P0 | T0.3, T0.12 |
| T5.6 | Create `src/app/(dashboard)/profile/page.tsx` — server component: fetch user, render `<ProfileForm>` + `<Separator>` + `<PasswordForm>` in two cards | Alex | 12 min | P0 | T5.1, T5.4, T5.5 |
| T5.7 | Create `src/app/(dashboard)/profile/loading.tsx` — skeleton form cards | Alex | 5 min | P1 | T5.6 |
| T5.8 | QA: Sam tests profile update flow, email uniqueness error, password change, wrong current password error, session refresh after update | Sam | 15 min | P0 | T5.6 |

**Sprint 5 Done:** Profile management complete.

---

### Sprint 6: Accessibility, Polish & Shared Components (Day 4)

**Goal:** WCAG AA compliance, loading/empty/error states, visual polish.

| # | Task | Owner | Est. | Priority | Dependencies |
|---|------|-------|------|----------|-------------|
| T6.1 | Create `src/components/shared/empty-state.tsx` — icon + title + description + optional action button | Alex | 10 min | P0 | T0.3 |
| T6.2 | Create `src/components/shared/error-state.tsx` — error icon + message + "Try Again" button | Alex | 10 min | P0 | T0.3 |
| T6.3 | Create `src/components/shared/loading-skeleton.tsx` — generic skeleton component with variant prop (card, table-row, text) | Alex | 12 min | P1 | T0.3 |
| T6.4 | Add empty states to: invoice list (no invoices found), ticket list (no tickets yet), ticket replies (no replies yet) | Alex | 15 min | P0 | T6.1 |
| T6.5 | Add error states with retry to: dashboard summary, invoice list, ticket list, profile page | Alex | 15 min | P0 | T6.2 |
| T6.6 | Accessibility audit pass — add `aria-label`, `aria-describedby`, `role` attributes to all interactive elements. Ensure skip-to-content link in root layout | Alex | 30 min | P0 | All pages |
| T6.7 | Keyboard navigation pass — ensure all forms, dropdowns, modals, and tables are keyboard accessible (Tab, Enter, Escape). Focus trap in Sheet and Dialog | Alex | 20 min | P0 | All pages |
| T6.8 | Color contrast check — verify all text/background combinations meet 4.5:1 minimum (or 3:1 large text). Adjust shadcn theme variables if needed | Alex | 15 min | P0 | All pages |
| T6.9 | Add `src/app/not-found.tsx` — styled 404 page with link back to dashboard | Alex | 10 min | P1 | T0.2 |
| T6.10 | Add `src/app/error.tsx` — global error boundary with "Try Again" and "Go Home" buttons | Alex | 10 min | P1 | T0.1 |
| T6.11 | Add `<Toaster />` from sonner to root layout | Alex | 3 min | P0 | T0.1 |
| T6.12 | QA: Sam runs axe DevTools on every page — zero violations required. Tests keyboard navigation on all flows | Sam | 25 min | P0 | T6.6–T6.11 |

**Sprint 6 Done:** AAA-grade accessibility, visual polish, robust error handling everywhere.

---

### Sprint 7: Testing, Deployment & Documentation (Day 5)

**Goal:** Production build passes. Tests pass. Deployed to Vercel. README written.

| # | Task | Owner | Est. | Priority | Dependencies |
|---|------|-------|------|----------|-------------|
| T7.1 | Create `vitest.config.ts` — configure jsdom environment, path aliases, setup file | Alex | 8 min | P0 | T0.5 |
| T7.2 | Create `tests/setup.ts` — extend-expect, cleanup after each test | Alex | 5 min | P0 | T7.1 |
| T7.3 | Write unit tests for `src/lib/utils.ts` — formatCurrency, formatDate, cn | Alex | 10 min | P1 | T7.2 |
| T7.4 | Write unit tests for `src/lib/validations.ts` — all Zod schemas (valid + invalid cases) | Alex | 15 min | P1 | T7.2 |
| T7.5 | Write component test for `<InvoiceStatusBadge />` — renders correct text + color per status | Alex | 10 min | P1 | T7.2 |
| T7.6 | Write component test for `<TicketStatusBadge />` — renders correct text + color per status | Alex | 5 min | P1 | T7.2 |
| T7.7 | Run `npm run build` — fix all TypeScript errors, resolve all warnings | Alex | 15 min | P0 | All tasks |
| T7.8 | Run `npm test` — ensure all tests pass | Alex | 5 min | P0 | T7.3–T7.6 |
| T7.9 | Create Vercel project (`vercel --prod`) — configure env vars (DATABASE_URL, AUTH_SECRET), set build command to `npx prisma generate && next build` | Jordan | 15 min | P0 | T7.7 |
| T7.10 | Push to GitHub: `git init && git add . && git commit -m "Initial commit: AMS Client Portal" && git remote add origin git@github.com:skmudassir-it/ams-client-portal.git && git push -u origin main` | Jordan | 5 min | P0 | T7.7 |
| T7.11 | Verify Vercel deployment — test all flows on production URL, ensure SQLite works in serverless | Jordan | 15 min | P0 | T7.9, T7.10 |
| T7.12 | Create `README.md` — project overview, tech stack, setup instructions, env vars, deployment guide, contributing guide | Alex | 20 min | P0 | T7.11 |
| T7.13 | Final QA: Sam does full smoke test on Vercel deployment (register, login, dashboard, invoices, tickets, profile) | Sam | 20 min | P0 | T7.11 |

**Sprint 7 Done:** Live on Vercel, tests passing, README complete.

---

## 9. Risks & Mitigations

| Risk | Impact | Probability | Mitigation |
|------|--------|:-----------:|------------|
| **SQLite on Vercel serverless** — data loss on cold starts | High | Medium | Use Turso (SQLite-compatible edge DB) for production. For MVP/demo, seed script provides consistent data. Add LiteFS or switch to PostgreSQL (Vercel Postgres / Neon) before launch. |
| **Auth.js v5 still in beta** — API changes | Medium | Medium | Pin exact beta version in `package.json`. Test auth flows first (Sprint 1). Have fallback plan: manual JWT implementation (~2 hours). |
| **Tailwind CSS v4 breaking changes** | Medium | Low | Pin exact version. v4 is stable by Q2 2026. Test build on Sprint 0. |
| **shadcn/ui component gaps** — missing pattern needed | Low | Low | shadcn/ui is copy-paste, so we can customize any component. Riley can design custom variants if needed. |
| **Scope creep** — "Can we also add..." | Medium | High | All feature requests go into backlog for v2. This plan is the contract — changes require sprint replanning. |
| **Prisma migration drift** — local dev.db vs Vercel | Medium | Low | Run `prisma migrate deploy` in Vercel build step. Document in README. |
| **Mobile navigation UX** — hamburger vs bottom nav | Low | Medium | Implement both (Sheet for mobile nav as primary, optional bottom bar). Riley to test with real users by Sprint 2. |
| **PDF download on serverless** — file storage | Medium | Medium | For MVP: generate simple PDF using `@react-pdf/renderer` in API route, return as stream. For production: store PDFs in Vercel Blob or S3, serve pre-signed URLs. |

---

## 10. Definition of Done

A task is **done** when ALL of the following are true:

- [ ] Code committed and pushed to GitHub (`skmudassir-it/ams-client-portal`)
- [ ] TypeScript compiles with **zero errors** (`npm run build`)
- [ ] ESLint passes with **zero errors** (`npm run lint`)
- [ ] All related tests pass (`npm test`)
- [ ] Feature works on **Chrome, Firefox, Safari** (latest 2 versions)
- [ ] Feature works on **mobile** (375px width) and **desktop** (1440px width)
- [ ] **WCAG AA** — axe DevTools shows zero violations on affected pages
- [ ] **Keyboard navigable** — full flow possible without mouse
- [ ] **Loading state** shown while data fetches (skeleton or spinner)
- [ ] **Empty state** shown when no data exists
- [ ] **Error state** shown with retry action when API fails
- [ ] **Toast notifications** for all mutations (success + error)
- [ ] Acceptance criteria from user story met
- [ ] Sam (QA) has signed off
- [ ] Riley (Design) has reviewed visuals

---

## 11. Quick Start Commands (For Alex)

```bash
# 1. Scaffold project
cd /home/shaik/projects
npx create-next-app@latest ams-client-portal --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"

# 2. Enter project
cd ams-client-portal

# 3. Initialize shadcn/ui
npx shadcn@latest init -d

# 4. Install shadcn components
npx shadcn@latest add button card input label badge dialog dropdown-menu select textarea skeleton table separator sheet avatar toast tooltip

# 5. Install production dependencies
npm install next-auth@beta @auth/prisma-adapter prisma @prisma/client zod react-hook-form @hookform/resolvers sonner lucide-react date-fns

# 6. Install dev dependencies
npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom @vitejs/plugin-react prettier tsx

# 7. Create .env.local
cat > .env.local << 'EOF'
DATABASE_URL="file:./dev.db"
AUTH_SECRET="$(openssl rand -base64 32)"
AUTH_URL="http://localhost:3000"
EOF

# 8. Run Prisma migration
npx prisma migrate dev --name init

# 9. Run dev server
npm run dev
```

---

*End of PLAN.md — This is our contract. Let's build it.* 📋
