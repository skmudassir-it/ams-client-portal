import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { AccountSummary } from "@/components/dashboard/account-summary";
import { RecentInvoices } from "@/components/dashboard/recent-invoices";
import { RecentTickets } from "@/components/dashboard/recent-tickets";
import type { DashboardSummary, Invoice, Ticket } from "@/types";

export default async function DashboardPage() {
  const session = await auth();
  const userId = session?.user?.id;

  const [summary, invoices, tickets] = await Promise.all([
    // Compute summary from Prisma directly
    (async (): Promise<DashboardSummary> => {
      if (!userId) return { totalInvoices: 0, unpaidInvoices: 0, openTickets: 0, resolvedTickets: 0 };
      const [totalInvoices, unpaidInvoices, openTickets, resolvedTickets] =
        await Promise.all([
          prisma.invoice.count({ where: { userId } }),
          prisma.invoice.count({
            where: { userId, status: { not: "paid" } },
          }),
          prisma.supportTicket.count({
            where: { userId, status: { in: ["open", "in_progress"] } },
          }),
          prisma.supportTicket.count({
            where: { userId, status: { in: ["resolved", "closed"] } },
          }),
        ]);
      return { totalInvoices, unpaidInvoices, openTickets, resolvedTickets };
    })(),
    // Recent invoices
    userId
      ? prisma.invoice.findMany({
          where: { userId },
          orderBy: { issuedDate: "desc" },
          take: 5,
        })
      : ([] as Invoice[]),
    // Recent tickets
    userId
      ? prisma.supportTicket.findMany({
          where: { userId },
          orderBy: { createdAt: "desc" },
          take: 5,
        })
      : ([] as Ticket[]),
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">
          Welcome back{", "}
          {session?.user?.name?.split(" ")[0] ?? "User"}
        </h2>
        <p className="text-sm text-muted-foreground">
          Here&apos;s an overview of your account.
        </p>
      </div>

      <AccountSummary summary={summary} />

      <div className="grid gap-6 lg:grid-cols-2">
        <RecentInvoices invoices={invoices} />
        <RecentTickets tickets={tickets} />
      </div>
    </div>
  );
}
