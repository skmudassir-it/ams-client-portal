import { prisma } from "@/lib/prisma";
import { getServerSession } from "@/lib/auth-utils";
import { redirect } from "next/navigation";
import { TicketList } from "@/components/tickets/ticket-list";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default async function TicketsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; status?: string; category?: string; search?: string }>;
}) {
  const session = await getServerSession();
  if (!session) redirect("/login");

  const params = await searchParams;
  const page = Math.max(1, parseInt(params.page || "1"));
  const limit = 10;
  const status = params.status;
  const category = params.category;
  const search = params.search;

  const where: Record<string, unknown> = { userId: session.user?.id as string };
  if (status && status !== "all") where.status = status;
  if (category && category !== "all") where.category = category;
  if (search) {
    where.OR = [{ subject: { contains: search } }, { description: { contains: search } }];
  }

  const [tickets, total] = await Promise.all([
    prisma.supportTicket.findMany({
      where,
      orderBy: { updatedAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.supportTicket.count({ where }),
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Support Tickets</h1>
        <p className="text-muted-foreground">Track your support requests</p>
      </div>
      <Suspense fallback={<Skeleton className="h-64 w-full" />}>
        <TicketList
          tickets={tickets as any}
          pagination={{ page, totalPages: Math.ceil(total / limit), total }}
        />
      </Suspense>
    </div>
  );
}
