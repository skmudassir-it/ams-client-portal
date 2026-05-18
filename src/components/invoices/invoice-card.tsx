import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { InvoiceStatusBadge } from "./invoice-status-badge";
import { ChevronRight } from "lucide-react";
import type { Invoice } from "@/types";

interface InvoiceCardProps {
  invoice: Invoice;
}

export function InvoiceCard({ invoice }: InvoiceCardProps) {
  return (
    <Link href={`/invoices/${invoice.id}`}>
      <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
        <CardContent className="flex items-center justify-between p-4">
          <div className="space-y-1">
            <p className="font-medium">{invoice.invoiceNumber}</p>
            <p className="text-sm text-muted-foreground">
              {new Date(invoice.dueDate).toLocaleDateString()}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <p className="text-lg font-bold">${invoice.amount.toFixed(2)}</p>
            <InvoiceStatusBadge status={invoice.status as "paid" | "pending" | "overdue" | "cancelled"} />
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
