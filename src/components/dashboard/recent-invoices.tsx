import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatCurrency, formatDate } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import type { Invoice } from "@/types";

interface RecentInvoicesProps {
  invoices: Invoice[];
}

function getInvoiceStatusBadge(
  status: string
): { variant: "default" | "secondary" | "destructive" | "outline" | "ghost"; label: string } {
  switch (status) {
    case "paid":
      return { variant: "secondary", label: "Paid" };
    case "pending":
      return { variant: "outline", label: "Pending" };
    case "overdue":
      return { variant: "destructive", label: "Overdue" };
    case "cancelled":
      return { variant: "ghost", label: "Cancelled" };
    default:
      return { variant: "outline", label: status };
  }
}

export function RecentInvoices({ invoices }: RecentInvoicesProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Recent Invoices</CardTitle>
      </CardHeader>
      <CardContent className="px-0">
        {invoices.length === 0 ? (
          <p className="px-4 text-sm text-muted-foreground">
            No invoices yet.
          </p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice #</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden sm:table-cell">Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.slice(0, 5).map((invoice) => {
                const badge = getInvoiceStatusBadge(invoice.status);
                return (
                  <TableRow key={invoice.id}>
                    <TableCell className="font-medium">
                      {invoice.invoiceNumber}
                    </TableCell>
                    <TableCell>
                      {formatCurrency(invoice.amount, invoice.currency)}
                    </TableCell>
                    <TableCell>
                      <Badge variant={badge.variant}>{badge.label}</Badge>
                    </TableCell>
                    <TableCell className="hidden text-muted-foreground sm:table-cell">
                      {formatDate(invoice.issuedDate)}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
      </CardContent>
      <CardFooter>
        <Button variant="ghost" size="sm" render={<Link href="/invoices" />} className="ml-auto">
          View All
          <ArrowRight className="ml-1 size-3" />
        </Button>
      </CardFooter>
    </Card>
  );
}
