# AMS Client Portal — Design System & UX Specifications

**Author:** Riley — Senior UI/UX Designer, AMS IT Services  
**Date:** 2026-05-18  
**Status:** Ready for build  
**For:** Alex (dev) — use this as your visual north star

---

## 1. Design Tokens

All tokens are consumed via Tailwind CSS v4 `@theme` blocks and shadcn/ui CSS custom properties.  
Theme: **Slate** (shadcn default). No custom Tailwind config file — tokens live in `src/app/globals.css`.

### 1.1 Color Palette

| Token | Value | Usage |
|-------|-------|-------|
| `--primary` | `#3B82F6` (blue-500) | Primary buttons, active nav, focus rings, links |
| `--primary-foreground` | `#FFFFFF` | Text on primary backgrounds |
| `--background` | `#FFFFFF` | Page background |
| `--foreground` | `#0F172A` (slate-900) | Body text |
| `--card` | `#FFFFFF` | Card/surface background |
| `--card-foreground` | `#0F172A` | Card text |
| `--muted` | `#F1F5F9` (slate-100) | Muted backgrounds (table stripes, disabled) |
| `--muted-foreground` | `#64748B` (slate-500) | Secondary/muted text, placeholders |
| `--border` | `#E2E8F0` (slate-200) | Borders, dividers, input rings |
| `--ring` | `#3B82F6` (blue-500) | Focus rings |
| `--destructive` | `#EF4444` (red-500) | Error text, destructive actions, delete buttons |
| `--destructive-foreground` | `#FFFFFF` | Text on destructive backgrounds |

**Status Colors (for badges/tags):**

| Status | Background | Text | Badge class |
|--------|-----------|------|-------------|
| Paid / Resolved | `#DCFCE7` (green-100) | `#166534` (green-800) | `bg-green-100 text-green-800` |
| Pending / Open / In Progress | `#DBEAFE` (blue-100) | `#1E40AF` (blue-800) | `bg-blue-100 text-blue-800` |
| Overdue / Urgent | `#FEE2E2` (red-100) | `#991B1B` (red-800) | `bg-red-100 text-red-800` |
| Cancelled / Closed | `#F1F5F9` (slate-100) | `#475569` (slate-600) | `bg-slate-100 text-slate-600` |

### 1.2 Typography

| Token | Tailwind Class | Value |
|-------|---------------|-------|
| **Font family** | `font-sans` | `Inter`, system-ui fallback |
| **Heading 1** | `text-3xl font-bold tracking-tight` | 30px / 36px line |
| **Heading 2** | `text-2xl font-semibold tracking-tight` | 24px / 32px line |
| **Heading 3** | `text-lg font-semibold` | 18px / 28px line |
| **Body** | `text-sm` | 14px / 20px line |
| **Body small** | `text-xs` | 12px / 16px line |
| **Code / Data** | `font-mono text-sm` | Tabular numbers for invoice amounts |

### 1.3 Spacing (4px base grid)

| Token | Value | Tailwind | Use |
|-------|-------|----------|-----|
| `xs` | 4px | `p-1`, `gap-1` | Icon padding, tight gaps |
| `sm` | 8px | `p-2`, `gap-2` | Button padding, card gaps |
| `md` | 16px | `p-4`, `gap-4` | Section padding, form spacing |
| `lg` | 24px | `p-6`, `gap-6` | Card padding, page sections |
| `xl` | 32px | `p-8`, `gap-8` | Page-level spacing |
| `2xl` | 48px | `p-12`, `gap-12` | Hero/landing sections |

### 1.4 Border Radius

| Token | Value | Tailwind | Usage |
|-------|-------|----------|-------|
| `sm` | 4px | `rounded-sm` | Input borders, small elements |
| `md` | 6px | `rounded-md` | Buttons, cards, form elements (default) |
| `lg` | 8px | `rounded-lg` | Modals, large cards |
| `full` | 9999px | `rounded-full` | Avatars, pill badges |

### 1.5 Shadows

| Token | Value | Tailwind | Usage |
|-------|-------|----------|-------|
| `sm` | 0 1px 2px rgba(0,0,0,0.05) | `shadow-sm` | Cards (default) |
| `md` | 0 4px 6px rgba(0,0,0,0.07) | `shadow-md` | Dropdowns, modals, elevated cards |
| `lg` | 0 10px 15px rgba(0,0,0,0.1) | `shadow-lg` | Dialogs, sheet panels |
| `focus` | 0 0 0 2px `--ring` | `ring-2 ring-primary ring-offset-2` | Focus rings |

### 1.6 shadcn/ui CSS Variables Skeleton

```css
/* src/app/globals.css */
@import "tailwindcss";

@theme inline {
  --color-primary: #3B82F6;
  --color-primary-foreground: #FFFFFF;
  --color-background: #FFFFFF;
  --color-foreground: #0F172A;
  --color-card: #FFFFFF;
  --color-card-foreground: #0F172A;
  --color-muted: #F1F5F9;
  --color-muted-foreground: #64748B;
  --color-border: #E2E8F0;
  --color-ring: #3B82F6;
  --color-destructive: #EF4444;
  --color-destructive-foreground: #FFFFFF;
  --radius-sm: 0.25rem;
  --radius-md: 0.375rem;
  --radius-lg: 0.5rem;
  --font-sans: 'Inter', ui-sans-serif, system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', ui-monospace, monospace;
}
```

---

## 2. Global Layout Shell

### 2.1 Auth Layout `(auth)/layout.tsx`

```
┌─────────────────────────────────────────────┐
│                                             │
│              [AMS Logo SVG]                 │
│            (mx-auto, mb-6, h-10)            │
│                                             │
│        ┌─────────────────────────┐          │
│        │   Card (max-w-md, w-full,│          │
│        │    mx-auto, shadow-sm,   │          │
│        │    rounded-lg, p-6)      │          │
│        │                         │          │
│        │      {children}         │          │
│        │   (Login or Register    │          │
│        │    form content)        │          │
│        │                         │          │
│        └─────────────────────────┘          │
│                                             │
│       Footer: "© AMS IT Services"           │
│       (text-xs text-muted-foreground,       │
│        text-center, mt-8)                   │
│                                             │
└─────────────────────────────────────────────┘

Container: min-h-screen, flex, items-center, justify-center, bg-muted/30, p-4
```

**Behavior:**

- **Logged out**: Show auth card.
- **Logged in**: Redirect to `/dashboard` (server-side in page.tsx).
- **Responsive**: Card is `max-w-md w-full` (448px max). On mobile (`<640px`): `mx-4` for side breathing room, card takes full width minus margins.
- **Loading**: Button shows spinner icon + "Loading..." text while auth request is in-flight.
- **Error**: Toast notification (sonner) for wrong credentials, duplicate email, etc. Inline Zod errors below each field (red, `text-sm`).

---

## 3. Page Layouts

### 3.1 Login Page `(auth)/login/page.tsx`

```
┌──────────────────────────────────┐
│          AMS Client Portal       │  ← text-2xl font-bold text-center
│                                  │
│  ┌────────────────────────────┐  │
│  │  Email                     │  │  ← Input, type="email", autoComplete="email"
│  │  ┌──────────────────────┐  │  │
│  │  │ demo@ams.com         │  │  │
│  │  └──────────────────────┘  │  │
│  │  [validation error msg]    │  │  ← text-destructive text-sm (conditional)
│  │                            │  │
│  │  Password                  │  │  ← Input, type="password", autoComplete="current-password"
│  │  ┌──────────────────────┐  │  │
│  │  │ ●●●●●●●●●●           │  │  │
│  │  └──────────────────────┘  │  │
│  │  [validation error msg]    │  │
│  │                            │  │
│  │  ┌──────────────────────┐  │  │
│  │  │     Sign In          │  │  │  ← Button, w-full, variant="default" (primary blue)
│  │  └──────────────────────┘  │  │
│  │                            │  │
│  │  Don't have an account?    │  │
│  │  [ Register → ]            │  │  ← Link to /register, text-primary underline
│  └────────────────────────────┘  │
└──────────────────────────────────┘
```

**States:**

| State | Visual |
|-------|--------|
| **Default** | Empty form, Sign In button enabled. |
| **Loading** | Button: spinner + "Signing in...", disabled. Inputs disabled. |
| **Error** | Toast: red with error message. Fields remain editable. |
| **Validation** | Red error text below invalid field. Red ring on input (`ring-destructive`). |

**Tailwind skeleton:**

```
<form class="space-y-4">
  <div class="space-y-2">
    <Label htmlFor="email">Email</Label>
    <Input id="email" type="email" placeholder="demo@ams.com" />
    <p class="text-sm text-destructive">Invalid email</p>  <!-- conditional -->
  </div>
  <div class="space-y-2">
    <Label htmlFor="password">Password</Label>
    <Input id="password" type="password" />
    <p class="text-sm text-destructive">Required</p>       <!-- conditional -->
  </div>
  <Button type="submit" class="w-full">Sign In</Button>
  <p class="text-center text-sm text-muted-foreground">
    Don't have an account? <a href="/register" class="text-primary underline">Register</a>
  </p>
</form>
```

---

### 3.2 Register Page `(auth)/register/page.tsx`

```
┌──────────────────────────────────┐
│          Create Account          │  ← text-2xl font-bold text-center
│                                  │
│  ┌────────────────────────────┐  │
│  │  Full Name                 │  │
│  │  ┌──────────────────────┐  │  │
│  │  │ John Doe             │  │  │
│  │  └──────────────────────┘  │  │
│  │                            │  │
│  │  Email                     │  │
│  │  ┌──────────────────────┐  │  │
│  │  │ john@example.com     │  │  │
│  │  └──────────────────────┘  │  │
│  │                            │  │
│  │  Password                  │  │  │
│  │  ┌──────────────────────┐  │  │
│  │  │ ●●●●●●●●●●           │  │  │
│  │  └──────────────────────┘  │  │
│  │  ████████░░  Medium       │  │  ← Password strength bar (optional v1)
│  │                            │  │
│  │  Confirm Password          │  │  │
│  │  ┌──────────────────────┐  │  │
│  │  │ ●●●●●●●●●●           │  │  │
│  │  └──────────────────────┘  │  │
│  │                            │  │
│  │  ┌──────────────────────┐  │  │
│  │  │   Create Account     │  │  │  ← Button, w-full, primary
│  │  └──────────────────────┘  │  │
│  │                            │  │
│  │  Already have an account?  │  │
│  │  [ Sign In → ]             │  │  ← Link to /login
│  └────────────────────────────┘  │
└──────────────────────────────────┘
```

**Same states as Login** plus password strength indicator (4-segment bar: red → orange → yellow → green, `h-1 rounded-full transition-colors`).

---

### 3.3 Dashboard Layout Shell `(dashboard)/layout.tsx`

```
┌──────┬──────────────────────────────────────────┐
│      │  Header                                   │
│      │  ┌─────────────────────────────────────┐  │
│      │  │ Breadcrumb    │      [User Avatar ▼]│  │
│ S    │  └─────────────────────────────────────┘  │
│ i    ├──────────────────────────────────────────┤
│ d    │                                          │
│ e    │  Page Heading (text-3xl font-bold)       │
│ b    │  (p-6)                                   │
│ a    │                                          │
│ r    │  ┌────────────────────────────────────┐  │
│      │  │                                    │  │
│ 240px│  │        {children}                  │  │
│      │  │        (page content)              │  │
│      │  │                                    │  │
│      │  └────────────────────────────────────┘  │
│      │                                          │
│      │  (scrollable, flex-1, overflow-auto)     │
└──────┴──────────────────────────────────────────┘

Sidebar: w-60, h-screen, sticky, top-0, border-r, bg-card, flex flex-col
Header: h-14, border-b, bg-card/50, backdrop-blur, flex items-center, px-6, sticky top-0 z-10
```

**Sidebar content (top to bottom):**

1. Logo + "AMS Portal" — `px-4 py-4`, `flex items-center gap-2`, logo `h-8 w-8`
2. Nav links — `flex flex-col gap-1 px-2`:
   - Dashboard (`LayoutDashboard` icon)
   - Invoices (`FileText` icon)
   - Tickets (`MessageSquare` icon)
   - Profile (`User` icon)
   - Each: `flex items-center gap-3 px-3 py-2 rounded-md text-sm`, active: `bg-primary/10 text-primary font-medium`, inactive: `text-muted-foreground hover:bg-muted`
3. Spacer — `flex-1`
4. User row at bottom — `border-t p-4`, avatar + name + email, `flex items-center gap-3`

**Header content:**

- Left: Breadcrumb (`Home > Invoices` using `ChevronRight` separator, `text-sm text-muted-foreground`)
- Right: User dropdown (`DropdownMenu` trigger: avatar `h-8 w-8 rounded-full` + name `text-sm font-medium`)
  - Items: Profile, Sign Out (destructive variant)

**Mobile behavior (≤768px):**

- Sidebar hidden; `Sheet` component slides in from left on hamburger tap.
- Header shows hamburger button (`Menu` icon) on left.
- No persistent sidebar — `Sheet` overlay covers full screen.
- Bottom nav alternative (future v2): 4-icon bar at bottom.

---

### 3.4 Dashboard Page `(dashboard)/dashboard/page.tsx`

```
┌─────────────────────────────────────────────────┐
│  Dashboard                                      │  ← Page heading
│                                                 │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌───────────┐
│  │ Invoice  │ │ Unpaid   │ │ Open     │ │ Resolved  │
│  │  $ icon  │ │ Alert △  │ │ Ticket ◎ │ │ Check ✓   │  ← Summary stat cards
│  │   12     │ │    3     │ │    5     │ │    7      │   (grid grid-cols-1 sm:2 lg:4)
│  │ invoices │ │ unpaid   │ │ tickets  │ │ tickets   │
│  └──────────┘ └──────────┘ └──────────┘ └───────────┘
│                                                 │
│  Recent Invoices                        [View All →]
│  ┌─────────────────────────────────────────────┐
│  │ Invoice #  │ Amount    │ Status  │ Due      │
│  │────────────│───────────│─────────│──────────│
│  │ INV-001    │ $1,250.00 │ Paid    │ May 1    │  ← Table, 5 rows max
│  │ INV-002    │ $450.00   │ Pending │ Jun 15   │   (desktop: Table, mobile: stacked cards)
│  │ INV-003    │ $890.00   │ Overdue │ Apr 20   │
│  └─────────────────────────────────────────────┘
│                                                 │
│  Recent Tickets                        [View All →]
│  ┌─────────────────────────────────────────────┐
│  │ Subject          │ Category   │ Status │ Date│
│  │──────────────────│────────────│────────│─────│
│  │ Billing question │ Billing    │ Open   │May  │
│  │ VPN not working  │ Technical  │In Prog.│May  │
│  └─────────────────────────────────────────────┘
└─────────────────────────────────────────────────┘
```

**Layout structure:**

- `space-y-8 p-6`
- Summary cards: `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4`
- Each card: `Card` with `CardHeader` (icon + label in `flex items-center gap-2`) + `CardContent` (big number `text-3xl font-bold` + label `text-sm text-muted-foreground`)
- Two sections below, each: heading row `flex items-center justify-between mb-4` → heading text `text-lg font-semibold` + View All link `text-sm text-primary`
- Tables: shadcn `Table` component, `w-full`

**States:**

| State | Visual |
|-------|--------|
| **Loading** | 4 `Skeleton` cards (h-24) + 5 skeleton table rows each section. |
| **Empty (no data)** | Cards show `0`. Tables show `EmptyState` with "No invoices yet" icon + message. |
| **Error** | `ErrorState` component with "Failed to load dashboard" + "Try Again" button. |
| **Partial** | Individual sections can fail independently. Failed section shows `ErrorState`, rest show data. |

---

### 3.5 Invoices List Page `(dashboard)/invoices/page.tsx`

```
┌─────────────────────────────────────────────────┐
│  Invoices                                       │
│                                                 │
│  ┌──────────────────┐  ┌─────────────┐         │
│  │ Search invoices..│  │ All Status ▼│         │  ← SearchInput + Select filter
│  └──────────────────┘  └─────────────┘         │
│                                                 │
│  Desktop (≥768px):                              │
│  ┌─────────────────────────────────────────────┐
│  │ Invoice #  │ Amount    │ Status │ Due    │  │
│  │────────────│───────────│────────│────────│  │
│  │ INV-001    │ $1,250.00 │ Paid   │ May 1  │  │  ← Table with sortable(?) columns
│  │ INV-002    │ $450.00   │ Pending│ Jun 15 │  │    (v1: no sort, just display)
│  │ ...10 items per page...                     │  │
│  └─────────────────────────────────────────────┘
│                                                 │
│  Mobile (<768px):                               │
│  ┌──────────────────────────────┐              │
│  │ INV-001            [Paid]   │              │
│  │ $1,250.00          May 1    │              │  ← Card layout, stacked
│  └──────────────────────────────┘              │
│  ┌──────────────────────────────┐              │
│  │ INV-002            [Pending]│              │
│  │ $450.00            Jun 15   │              │
│  └──────────────────────────────┘              │
│                                                 │
│  < 1  2  3 ... 5  >                            │  ← Pagination (center-aligned)
└─────────────────────────────────────────────────┘
```

**Layout details:**

- `space-y-6 p-6`
- Filter row: `flex flex-col sm:flex-row gap-3 mb-6`
  - SearchInput: `flex-1`, debounced 300ms
  - Status Select: `w-full sm:w-48`
- Desktop: `<Table>` — columns: Invoice #, Amount (`font-mono`), Status (`Badge`), Due Date, Actions (View button/link)
- Mobile: Stacked `<Card>` list — each card: `flex justify-between`, left= invoice # + amount, right= status badge + date, `border-b last:border-b-0 p-4`
- Pagination: `flex items-center justify-center gap-2 pt-4`
  - Previous button (disabled on page 1), page numbers, Next button (disabled on last page)

**States:**

| State | Visual |
|-------|--------|
| **Default (with data)** | Table or card list with pagination. |
| **Loading** | Skeleton table rows (`Skeleton h-12 w-full`, 10 rows). |
| **Empty (no invoices)** | `EmptyState`: `FileText` icon, "No invoices found", "When invoices are generated, they'll appear here." |
| **Empty (filter, no match)** | `EmptyState`: `SearchX` icon, "No invoices match your filters", "Try adjusting your search or status filter." + Clear Filters button. |
| **Error** | `ErrorState`: "Failed to load invoices" + Retry button. |

---

### 3.6 Invoice Detail Page `(dashboard)/invoices/[id]/page.tsx`

```
┌─────────────────────────────────────────────────┐
│  ← Back to Invoices                             │  ← text-sm text-primary, mb-4
│                                                 │
│  Invoice INV-001                                │  ← text-2xl font-bold
│                                                 │
│  ┌─────────────────────────────────────────────┐
│  │  ┌──────────────────┐  ┌──────────────────┐ │
│  │  │ Invoice Number   │  │ Status           │ │
│  │  │ INV-001          │  │ [Paid] badge     │ │  ← Two-column grid
│  │  └──────────────────┘  └──────────────────┘ │
│  │  ┌──────────────────┐  ┌──────────────────┐ │
│  │  │ Amount           │  │ Currency         │ │
│  │  │ $1,250.00        │  │ USD              │ │
│  │  └──────────────────┘  └──────────────────┘ │
│  │  ┌──────────────────┐  ┌──────────────────┐ │
│  │  │ Issued Date      │  │ Due Date         │ │
│  │  │ May 1, 2026      │  │ Jun 1, 2026      │ │
│  │  └──────────────────┘  └──────────────────┘ │
│  │  ┌──────────────────────────────────────┐   │
│  │  │ Description                          │   │  ← Full-width
│  │  │ Monthly IT services - May 2026       │   │
│  │  └──────────────────────────────────────┘   │
│  │                                             │
│  │  ┌──────────────────────────────────────┐   │
│  │  │  ↓ Download Invoice (PDF)            │   │  ← Button, w-full sm:w-auto
│  │  └──────────────────────────────────────┘   │
│  └─────────────────────────────────────────────┘
└─────────────────────────────────────────────────┘
```

**Layout:**

- `space-y-6 p-6 max-w-2xl`
- Back link: `flex items-center gap-1 text-sm text-primary hover:underline mb-4` (← `ArrowLeft` icon)
- Detail card: `Card`, `CardHeader` (title), `CardContent` (info grid + download)
- Info grid: `grid grid-cols-1 sm:grid-cols-2 gap-4`
  - Each field: label `text-xs text-muted-foreground uppercase tracking-wider` + value `text-sm font-medium`
- Download button: `mt-6`, `Button variant="outline"`, with `Download` icon, triggers download API
  - **Loading state**: button text → "Downloading...", spinner icon, disabled
  - **Success**: file download starts (browser native download)
  - **Error**: toast with "Failed to download invoice"

**States:**

| State | Visual |
|-------|--------|
| **Loading** | Skeleton card: `Skeleton h-8 w-48` (title) + 6 `Skeleton h-6 w-full` (fields) + `Skeleton h-10 w-48` (button). |
| **Not found (404)** | `EmptyState`: `FileX` icon, "Invoice not found", back link. |
| **Error** | `ErrorState` in card body. |

---

### 3.7 Tickets List Page `(dashboard)/tickets/page.tsx`

```
┌─────────────────────────────────────────────────┐
│  Support Tickets                    [New Ticket]│  ← Button top-right, primary
│                                                 │
│  ┌──────────────────┐  ┌──────────┐ ┌────────┐ │
│  │ Search tickets...│  │ Status ▼ │ │Category▼│ │  ← 3 filters
│  └──────────────────┘  └──────────┘ └────────┘ │
│                                                 │
│  Desktop:                                       │
│  ┌─────────────────────────────────────────────┐
│  │ Subject         │ Category  │ Status │ Date │
│  │─────────────────│───────────│────────│──────│
│  │ Billing question│ Billing   │ Open   │ 5/18 │  ← Table
│  │ VPN down        │ Technical │ In Prog│ 5/17 │
│  │ ...                                        │
│  └─────────────────────────────────────────────┘
│                                                 │
│  Mobile:                                        │
│  ┌──────────────────────────────┐              │
│  │ Billing Question   [Open]   │              │
│  │ Billing · May 18, 2026      │              │  ← Card stack
│  └──────────────────────────────┘              │
│                                                 │
│  < 1  2  3 >                                    │  ← Pagination
└─────────────────────────────────────────────────┘
```

**Layout:**

- `space-y-6 p-6`
- Header row: `flex items-center justify-between mb-4` → "Support Tickets" heading + `Button variant="default"` → "New Ticket"
- Filter row: `flex flex-col sm:flex-row gap-3 mb-6`
  - SearchInput: `flex-1`
  - Status Select + Category Select: each `w-full sm:w-44`
- Desktop: `<Table>` — columns: Subject (link to detail), Category, Status (`Badge`), Created Date, Priority (hidden on small screens, visible `lg:`)
- Mobile: Stacked `<Card>` — each card: subject (bold) + status badge top row, category + date bottom row
- Pagination: same as invoices

**States:**

| State | Visual |
|-------|--------|
| **Default** | Table/cards with data. New Ticket button prominent. |
| **Loading** | 10 skeleton table rows. |
| **Empty (no tickets)** | `EmptyState`: `MessageSquare` icon, "No support tickets yet", "Create your first ticket to get help." + "Create Ticket" button. |
| **Empty (filtered)** | `EmptyState`: "No tickets match your filters" + clear filters. |
| **Error** | `ErrorState` with retry. |

---

### 3.8 New Ticket Page `(dashboard)/tickets/new/page.tsx`

```
┌─────────────────────────────────────────────────┐
│  ← Back to Tickets                              │
│                                                 │
│  Create New Support Ticket                      │  ← text-2xl font-bold
│                                                 │
│  ┌─────────────────────────────────────────────┐
│  │                                             │
│  │  Category                                   │
│  │  ┌──────────────────────────────────────┐   │
│  │  │ Select a category...              ▼  │   │  ← Select: Billing / Technical / General / Account
│  │  └──────────────────────────────────────┘   │
│  │                                             │
│  │  Subject                                    │
│  │  ┌──────────────────────────────────────┐   │
│  │  │ Brief summary of your issue          │   │  ← Input
│  │  └──────────────────────────────────────┘   │
│  │                                             │
│  │  Description                                │
│  │  ┌──────────────────────────────────────┐   │
│  │  │ Please describe your issue in        │   │
│  │  │ detail. Include any relevant         │   │  ← Textarea, min-h-[150px]
│  │  │ information...                       │   │
│  │  │                                      │   │
│  │  └──────────────────────────────────────┘   │
│  │                                             │
│  │  ┌────────────────┐  ┌────────────────┐     │
│  │  │ Cancel         │  │ Submit Ticket  │     │  ← Cancel=outline, Submit=primary
│  │  └────────────────┘  └────────────────┘     │
│  └─────────────────────────────────────────────┘
└─────────────────────────────────────────────────┘
```

**Layout:**

- `max-w-2xl mx-auto space-y-6 p-6` (centered, constrained width form)
- Form: react-hook-form + Zod validation
- Fields stacked: `space-y-4`
- Button row: `flex gap-3 justify-end`
  - Cancel: `Button variant="outline"` → `router.back()` or navigate to `/tickets`
  - Submit: `Button variant="default"`

**States:**

| State | Visual |
|-------|--------|
| **Default** | Empty form. Submit enabled (Zod validates on submit, not live). |
| **Validation error** | Red text below each invalid field. Red ring on input. Submit button stays enabled — user fixes errors and resubmits. |
| **Submitting** | Submit button: spinner + "Submitting...", disabled. Cancel button: disabled. |
| **Success** | Toast: "Ticket created successfully" → redirect to `/tickets/[newId]`. |
| **Error** | Toast: "Failed to create ticket. Please try again." Form stays filled. |

---

### 3.9 Ticket Detail Page `(dashboard)/tickets/[id]/page.tsx`

```
┌─────────────────────────────────────────────────┐
│  ← Back to Tickets                              │
│                                                 │
│  ┌─────────────────────────────────────────────┐
│  │ VPN Not Working                   [In Prog] │  ← Subject + status badge
│  │ Technical · Normal Priority                 │  ← Category + priority
│  │ Created: May 17, 2026 · Updated: May 18     │  ← Dates
│  │─────────────────────────────────────────────│  ← Separator
│  │ Description:                                │
│  │ The VPN connection drops every 10 minutes   │  ← Full description
│  │ when working from home. I've tried...       │
│  │─────────────────────────────────────────────│
│  │ [Close Ticket]                              │  ← Destructive-ish outline button
│  └─────────────────────────────────────────────┘
│                                                 │
│  Replies (3)                                    │  ← Section heading
│  ┌─────────────────────────────────────────────┐
│  │ ┌──┐                                        │
│  │ │JS│ John Smith · Client · May 17, 2:30 PM  │  ← Avatar + name + role + time
│  │ └──┘                                        │
│  │ I've tried restarting but the issue         │
│  │ persists.                                   │
│  ├─────────────────────────────────────────────┤
│  │ ┌──┐                                        │
│  │ │AS│ AMS Staff · Staff · May 18, 9:15 AM    │  ← Staff replies visually distinct
│  │ └──┘                                        │  (blue left border or bg-muted/50)
│  │ We're investigating. Can you confirm your   │
│  │ router model?                               │
│  ├─────────────────────────────────────────────┤
│  │ ┌──┐                                        │
│  │ │JS│ John Smith · Client · May 18, 10:00 AM │
│  │ └──┘                                        │
│  │ It's a TP-Link Archer AX50.                 │
│  └─────────────────────────────────────────────┘
│                                                 │
│  Add Reply                                      │
│  ┌─────────────────────────────────────────────┐
│  │ ┌─────────────────────────────────────────┐ │
│  │ │ Type your reply...                      │ │  ← Textarea
│  │ │                                         │ │
│  │ └─────────────────────────────────────────┘ │
│  │                       ┌──────────────────┐  │
│  │                       │  Send Reply      │  │  ← Button, right-aligned
│  │                       └──────────────────┘  │
│  └─────────────────────────────────────────────┘
└─────────────────────────────────────────────────┘
```

**Layout:**

- `space-y-6 p-6 max-w-3xl mx-auto`
- Back link: same pattern (`ArrowLeft` icon + text)
- Ticket info card: `Card` with `CardHeader` (subject + badge row) + `CardContent`
  - Header row: `flex items-start justify-between` — subject `text-xl font-semibold` + `Badge`
  - Meta row: category + priority, `text-sm text-muted-foreground`
  - Date row: created + updated, `text-xs text-muted-foreground`
  - `Separator`
  - Description: `text-sm whitespace-pre-wrap` (preserves line breaks)
  - Close Ticket button: conditional — only if status is `open` or `in_progress`, `variant="outline"`, `text-destructive border-destructive`
- Replies section: `space-y-4`
  - Each reply: `flex gap-3 p-4` in a card-like container
    - Client replies: `bg-card border rounded-lg`
    - Staff replies: `bg-muted/30 border border-primary/20 rounded-lg` (subtle blue tint)
  - Avatar: `h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium` (initials)
  - Content: header `flex items-center gap-2 text-sm` (name `font-medium` + role badge + time `text-muted-foreground`) → body `text-sm mt-1`
- Reply form: `Card` with `CardContent p-4`
  - Textarea `min-h-[100px]`
  - Button right-aligned: `flex justify-end mt-3`

**States (replies):**

| State | Visual |
|-------|--------|
| **Adding reply** | Button: spinner + "Sending...", disabled. Textarea: disabled. |
| **Reply success** | Toast: "Reply sent". Optimistically append reply to list. |
| **Reply error** | Toast: "Failed to send reply". Textarea retains text. |
| **No replies yet** | `EmptyState` in replies area: "No replies yet", "Replies from our support team will appear here." |

**States (page):**

| State | Visual |
|-------|--------|
| **Loading** | Skeleton: `Skeleton h-8 w-64` (subject) + `Skeleton h-48 w-full` (card) + `Skeleton h-40 w-full` (reply form). |
| **Not found** | `EmptyState` with "Ticket not found". |
| **Error** | `ErrorState`. |

---

### 3.10 Profile Page `(dashboard)/profile/page.tsx`

```
┌─────────────────────────────────────────────────┐
│  Profile Settings                               │
│                                                 │
│  ┌─────────────────────────────────────────────┐
│  │  Profile Information                        │  ← Card 1
│  │─────────────────────────────────────────────│
│  │                                             │
│  │  Full Name                                  │
│  │  ┌──────────────────────────────────────┐   │
│  │  │ John Doe                             │   │  ← Pre-filled Input
│  │  └──────────────────────────────────────┘   │
│  │                                             │
│  │  Email                                      │
│  │  ┌──────────────────────────────────────┐   │
│  │  │ john@example.com                     │   │  ← Pre-filled Input
│  │  └──────────────────────────────────────┘   │
│  │                                             │
│  │  Member since: May 15, 2026                 │  ← text-sm text-muted-foreground
│  │                                             │
│  │  ┌──────────────────────┐                   │
│  │  │  Save Changes        │                   │  ← Button, primary
│  │  └──────────────────────┘                   │
│  └─────────────────────────────────────────────┘
│                                                 │
│  ┌─────────────────────────────────────────────┐
│  │  Change Password                            │  ← Card 2
│  │─────────────────────────────────────────────│
│  │                                             │
│  │  Current Password                           │
│  │  ┌──────────────────────────────────────┐   │
│  │  │ ●●●●●●●●●●                          │   │
│  │  └──────────────────────────────────────┘   │
│  │                                             │
│  │  New Password                               │
│  │  ┌──────────────────────────────────────┐   │
│  │  │ ●●●●●●●●●●                          │   │
│  │  └──────────────────────────────────────┘   │
│  │  ████████░░  Medium                        │  ← Strength bar
│  │                                             │
│  │  Confirm New Password                       │
│  │  ┌──────────────────────────────────────┐   │
│  │  │ ●●●●●●●●●●                          │   │
│  │  └──────────────────────────────────────┘   │
│  │                                             │
│  │  ┌──────────────────────┐                   │
│  │  │  Update Password     │                   │  ← Button, primary
│  │  └──────────────────────┘                   │
│  └─────────────────────────────────────────────┘
└─────────────────────────────────────────────────┘
```

**Layout:**

- `space-y-8 p-6 max-w-2xl mx-auto`
- Two cards: each `Card` → `CardHeader` (title `text-lg font-semibold`) + `CardContent` (form)
- Profile form: `space-y-4`
  - Two Input fields, pre-filled via `defaultValues` in react-hook-form
  - Member-since date: `text-sm text-muted-foreground mt-2`
  - Save button: right-aligned
- Password form: `space-y-4`
  - Three Input fields (all type="password")
  - Password strength bar (same as Register)
  - Update button: right-aligned

**States (Profile form):**

| State | Visual |
|-------|--------|
| **Loading** | `Skeleton h-12 w-full` × 2, `Skeleton h-10 w-32` (button). |
| **Saving** | Button: spinner + "Saving...", disabled. |
| **Success** | Toast: "Profile updated successfully." |
| **Error (email taken)** | Toast: "This email is already in use." + inline error on email field. |
| **Error (generic)** | Toast: "Failed to update profile." |

**States (Password form):**

| State | Visual |
|-------|--------|
| **Saving** | Button: spinner + "Updating...", disabled. |
| **Success** | Toast: "Password changed successfully." Form clears. |
| **Wrong current password** | Toast: "Current password is incorrect." Field focused + error ring. |
| **Mismatch** | Inline error: "Passwords do not match" below confirm field. |
| **Too weak** | Inline error: "Password must be at least 8 characters." |

---

## 4. UX Flows

### 4.1 Login → Dashboard

```
Unathenticated user
    │
    ▼
/login  ──── Enter email + password ────► [Submit]
    │                                          │
    │  ┌───────────────────────────────────────┘
    │  ▼
    │  Server validates credentials
    │     │                    │
    │     ▼                    ▼
    │  Success              Failure
    │     │                    │
    │     ▼                    ▼
    │  JWT session set     Toast: "Invalid email
    │  in HTTP-only cookie  or password"
    │     │                 Form stays, user retries
    │     ▼
    │  redirect to /dashboard
    │     │
    │     ▼
    │  /dashboard loads
    │     │
    │     ├── Summary cards animate in (staggered fade-up)
    │     ├── Recent invoices table loads
    │     ├── Recent tickets table loads
    │     └── Toast: "Welcome back, John!"
    │
    ▼
User is now authenticated. Sidebar visible. All /(dashboard)/ routes accessible.
```

**Key interactions:**

- Enter key on password field submits form.
- Tab order: Email → Password → Sign In → Register link.
- Loading state shows instantly on submit — no delay before spinner.
- On success, session is server-side. Client redirects via `router.push('/dashboard')` or server redirect.

### 4.2 Browse Invoices → View Detail → Download

```
/dashboard
    │
    ├── "View All" on Recent Invoices ────► /invoices
    │  OR
    └── Sidebar: Invoices ────────────────► /invoices
                                              │
    ┌─────────────────────────────────────────┘
    ▼
/invoices (list)
    │
    ├── Scroll through paginated list
    ├── Type in search → results filter after 300ms debounce
    ├── Change status dropdown → immediate reload
    │
    └── Click an invoice row / card ────► /invoices/[id]
                                              │
    ┌─────────────────────────────────────────┘
    ▼
/invoices/[id] (detail)
    │
    ├── Review invoice details (all fields visible)
    │
    └── Click "Download Invoice" ────► Button → "Downloading..."
                                           │
                              ┌────────────┴────────────┐
                              ▼                         ▼
                          Success                   Error
                              │                         │
                              ▼                         ▼
                     Browser downloads PDF       Toast: "Failed to download"
                     (Content-Disposition:        Button re-enabled
                      attachment)
```

**Key interactions:**

- Invoice row is entirely clickable (link wrapping). Cursor: `pointer`.
- Mobile: tap card → navigate. Full card is tappable.
- Download opens in new tab or triggers browser download (Content-Disposition header).
- Back navigation from detail → returns to list at same page/filter state (preserve search params in URL: `?page=2&status=pending`).

### 4.3 Create Ticket → View Ticket → Reply → Track Status

```
/tickets
    │
    ├── Click "New Ticket" ────► /tickets/new
    │                                │
    │  ┌─────────────────────────────┘
    │  ▼
    │  Fill in: Category (select), Subject (input),
    │           Description (textarea)
    │     │
    │     └── Click "Submit Ticket"
    │            │
    │   ┌────────┴────────┐
    │   ▼                 ▼
    │ Success          Error
    │   │                 │
    │   ▼                 ▼
    │ Toast: "Ticket    Toast: "Failed to
    │  created"          create ticket"
    │   │               Form stays filled
    │   ▼
    │ redirect to /tickets/[newId]
    │
    ▼
/tickets/[id] (detail)
    │
    ├── See ticket info + description
    ├── Scroll through reply thread
    ├── Type reply in textarea
    │     │
    │     └── Click "Send Reply"
    │            │
    │   ┌────────┴────────┐
    │   ▼                 ▼
    │ Reply added      Error
    │   │                 │
    │   ▼                 ▼
    │ Reply appears    Toast: "Failed
    │ in thread         to send"
    │ Textarea clears  Text preserved
    │
    ├── Click "Close Ticket" (if open/in_progress)
    │     │
    │     └── Confirm dialog: "Are you sure you want to close this ticket?"
    │            │
    │   ┌────────┴────────┐
    │   ▼                 ▼
    │ Confirm          Cancel
    │   │                 │
    │   ▼                 ▼
    │ Status → Closed  Dialog closes
    │ Badge updates
    │ Close button hides
    │ Toast: "Ticket closed"
    │
    └── Return to /tickets → ticket shows "Closed" badge
```

**Key interactions:**

- Reply appears optimistically in the thread (instant UI update, no loading spinner for the list).
- Staff replies are visually distinct (blue left border, muted background). Client replies: white card.
- Scroll to bottom on page load if there are replies (auto-scroll to latest).
- Close Ticket requires confirmation dialog to prevent accidental closure.
- After closing, "Close Ticket" button disappears. If ticket is reopened by staff, it reappears based on API status.

### 4.4 Update Profile

```
/dashboard
    │
    └── Sidebar: Profile (or Header dropdown → Profile)
              │
              ▼
/profile
    │
    ├── Update Name / Email
    │     │
    │     ├── Edit name field
    │     ├── Edit email field
    │     └── Click "Save Changes"
    │            │
    │   ┌────────┴────────┐
    │   ▼                 ▼
    │ Success          Error
    │   │                 │
    │   ▼                 ▼
    │ Toast: "Profile  Toast: error msg
    │  updated"        (e.g., "Email
    │ Header avatar     already in use")
    │  reflects new     Field highlighted
    │  name (if changed)
    │
    └── Change Password
          │
          ├── Enter current password
          ├── Enter new password (strength bar updates live)
          ├── Confirm new password
          └── Click "Update Password"
                 │
        ┌────────┴────────┐
        ▼                 ▼
    Success            Error
        │                 │
        ▼                 ▼
    Toast: "Password  Toast: "Current
     changed"          password incorrect"
    All 3 fields       OR "Passwords don't
     clear              match"
                       Fields stay, error
                       field gets focus
```

**Key interactions:**

- Profile form and password form are independent — saving one doesn't affect the other.
- After name change, the header/sidebar should reflect the new name (via session update or re-fetch).
- Password strength bar updates on every keystroke in the "New Password" field.
- On password change success, clear all password fields for security.

---

## 5. Accessibility Requirements

### 5.1 Color Contrast

- **All text**: minimum 4.5:1 contrast ratio against background (WCAG AA).
- **Large text** (≥18px bold or ≥24px): minimum 3:1.
- **Focus rings**: 3:1 minimum against adjacent colors.
- **Status badges**: text on colored backgrounds must meet 4.5:1.
  - Green badge: `#166534` on `#DCFCE7` → ~8:1 ✅
  - Blue badge: `#1E40AF` on `#DBEAFE` → ~9:1 ✅
  - Red badge: `#991B1B` on `#FEE2E2` → ~9:1 ✅
  - Slate badge: `#475569` on `#F1F5F9` → ~5:1 ✅

### 5.2 Keyboard Navigation

| Component | Key | Action |
|-----------|-----|--------|
| **All interactive** | `Tab` / `Shift+Tab` | Move focus forward/backward in logical DOM order |
| **Buttons** | `Enter` or `Space` | Activate |
| **Links** | `Enter` | Navigate |
| **Select dropdown** | `Enter` to open, `Arrow keys` to navigate, `Enter` to select, `Escape` to close |
| **Dialog/Sheet** | `Escape` | Close. Focus trapped inside while open. Focus returns to trigger on close. |
| **Tables** | `Tab` through rows (if rows are links/buttons) | Each row is focusable |
| **Forms** | `Enter` in last field | Submit form |
| **Dropdown menu** | `Arrow keys` to navigate, `Enter` to select, `Escape` to close |

**Focus order must be logical and visible.** All focusable elements must have a visible focus ring (`ring-2 ring-primary ring-offset-2`).

### 5.3 Focus Management

- **Page transitions**: Focus moves to the `<h1>` or main content container on navigation (use `autoFocus` or `useEffect` + `ref.focus()`).
- **Dialog open**: Focus moves to first focusable element inside dialog.
- **Dialog close**: Focus returns to the element that opened the dialog.
- **Form validation error**: Focus moves to the first invalid field.
- **Toast notifications**: Do NOT steal focus. Use `aria-live` region instead.
- **Loading → Content**: When skeleton is replaced by content, no focus shift needed (same region).

### 5.4 ARIA Landmarks & Attributes

```
<header>           → role="banner" (implicit)
<nav>              → role="navigation" + aria-label="Main navigation" (sidebar)
                    + aria-label="Breadcrumb" (breadcrumb nav)
<main>             → role="main"
<footer>           → role="contentinfo" (implicit)
<form>             → aria-label="Login form" / "Registration form" etc.
<table>            → role="table" + aria-label="Invoice list" / "Ticket list"
                     + <thead>/<tbody> (implicit rowgroup roles)
<section>          → aria-labelledby pointing to section heading id
```

**Additional required attributes:**

- **Skip link**: First focusable element on every page, linking to `<main id="main-content">`. Hidden until focused.
  ```html
  <a href="#main-content" class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 ...">
    Skip to main content
  </a>
  ```
- **Loading spinners**: `role="status" aria-label="Loading"`
- **Error messages**: `role="alert"` for inline form errors
- **Toast container**: `<Toaster>` from sonner uses `aria-live="polite"` by default
- **Empty states**: Use `role="status"` (not alert — not urgent)
- **Password strength**: `aria-label="Password strength: medium"` + `aria-valuenow` on progress bar

### 5.5 Screen Reader Checklist

- ✅ All images have `alt` text (logo: "AMS IT Services", icons: decorative so `alt=""` or `aria-hidden="true"`)
- ✅ Form inputs are associated with labels (`htmlFor` matching `id`)
- ✅ Tables have proper `<thead>`, `<th scope="col">`, `<tbody>` structure
- ✅ Status badges are accompanied by visible text (not just color)
- ✅ Dynamic content updates use `aria-live` regions (toasts, loading states)
- ✅ Navigation indicates current page (`aria-current="page"` on active sidebar link)
- ✅ Dialog/sheet: `aria-modal="true"`, `aria-labelledby` pointing to dialog title

### 5.6 Responsive & Touch

- **Minimum touch target**: 44×44px for all interactive elements (buttons, links, select triggers).
- **Mobile breakpoints**: `sm:640px`, `md:768px`, `lg:1024px`, `xl:1280px`.
- **Side padding on mobile**: All page content has `px-4` minimum.
- **Tables → Cards**: At `<768px`, tables collapse to stacked card layout.
- **Horizontal scroll**: Never. Content wraps or stacks.
- **Zoom**: No `user-scalable=no`. Users can pinch-zoom freely.

---

## 6. Shared Component Quick Reference

| Component | Location | Behavior |
|-----------|----------|----------|
| `EmptyState` | `src/components/shared/empty-state.tsx` | Icon + title + description + optional action button. Props: `icon`, `title`, `description`, `action?` |
| `ErrorState` | `src/components/shared/error-state.tsx` | Error icon + message + "Try Again" button. Props: `message?`, `onRetry` |
| `SearchInput` | `src/components/shared/search-input.tsx` | Debounced (300ms) input with search icon + clear button. Props: `value`, `onChange`, `placeholder?` |
| `Pagination` | `src/components/shared/pagination.tsx` | Prev/Next + page numbers. Props: `currentPage`, `totalPages`, `onPageChange` |
| `LoadingSkeleton` | `src/components/shared/loading-skeleton.tsx` | Variants: `card`, `table-row`, `text`. Props: `variant`, `count?` |
| `ConfirmDialog` | `src/components/shared/confirm-dialog.tsx` | AlertDialog wrapper. Props: `title`, `description`, `onConfirm`, `trigger` |

**Toast notifications (sonner):** Use `toast.success()`, `toast.error()` for all mutations. Duration: 4 seconds. Position: bottom-right on desktop, top-center on mobile.

---

## 7. Visual Polish Notes

- **Micro-animations**: Use Tailwind `transition-colors duration-200` on hoverable elements (sidebar links, buttons, table rows).
- **Staggered card fade-in**: Dashboard summary cards can use a simple CSS animation with `animation-delay` offsets (nice-to-have, not blocking).
- **Skeleton → Content**: No jarring layout shift — skeleton dimensions must match final content dimensions exactly.
- **Table row hover**: `hover:bg-muted/50` on all data tables.
- **Active nav indicator**: Subtle left border accent (`border-l-2 border-primary`) + background tint on active sidebar item.
- **Input focus**: `focus:ring-2 focus:ring-primary focus:border-primary` — consistent across all form elements.

---

*End of DESIGN.md — This is Alex's visual blueprint. Build to this spec, and Riley will review at each sprint checkpoint.* 🎨
