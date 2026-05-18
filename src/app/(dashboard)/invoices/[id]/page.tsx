import { prisma } from "@/lib/prisma";
import { getServerSession } from "@/lib/auth-utils";
import { redirect, notFound } from "next/navigation";
import { InvoiceDetail } from "@/components/invoices/invoice-detail";

export default async function InvoiceDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await getServerSession();
  if (!session) redirect("/login");

  const { id } = await params;
  const invoice = await prisma.invoice.findUnique({ where: { id } });

  if (!invoice || invoice.userId !== session.user?.id) notFound();

  return <InvoiceDetail invoice={invoice} />;
}
