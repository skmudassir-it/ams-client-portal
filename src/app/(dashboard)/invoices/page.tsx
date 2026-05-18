import { prisma } from "@/lib/prisma";
import { getServerSession } from "@/lib/auth-utils";
import { redirect } from "next/navigation";
import { InvoiceList } from "@/components/invoices/invoice-list";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default async function InvoicesPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; status?: string; search?: string }>;
}) {
  const session = await getServerSession();
  if (!session) redirect("/login");

  const params = await searchParams;
  const page = Math.max(1, parseInt(params.page || "1"));
  const limit = 10;
  const status = params.status;
  const search = params.search;

  const where: Record<string, unknown> = { userId: session.user?.id as string };
  if (status && status !== "all") where.status = status;
  if (search) {
    where.OR = [
      { invoiceNumber: { contains: search } },
      { description: { contains: search } },
    ];
  }

  const [invoices, total] = await Promise.all([
    prisma.invoice.findMany({
      where,
      orderBy: { issuedDate: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.invoice.count({ where }),
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Invoices</h1>
        <p className="text-muted-foreground">View and download your invoices</p>
      </div>
      <Suspense fallback={<Skeleton className="h-64 w-full" />}>
        <InvoiceList
          invoices={invoices as any}
          pagination={{ page, totalPages: Math.ceil(total / limit), total }}
        />
      </Suspense>
    </div>
  );
}
