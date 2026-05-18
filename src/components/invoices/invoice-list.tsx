"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { InvoiceStatusBadge } from "./invoice-status-badge";
import { InvoiceCard } from "./invoice-card";
import { SearchInput } from "@/components/shared/search-input";
import { Pagination } from "@/components/shared/pagination";
import { EmptyState } from "@/components/shared/empty-state";
import { FileText } from "lucide-react";
import Link from "next/link";

type InvoiceItem = {
  id: string;
  invoiceNumber: string;
  amount: number;
  status: string;
  dueDate: Date | string;
};

interface InvoiceListProps {
  invoices: InvoiceItem[];
  pagination: { page: number; totalPages: number; total: number };
}

export function InvoiceList({ invoices, pagination }: InvoiceListProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentStatus = searchParams.get("status") || "all";

  function updateParams(key: string, value: string | null) {
    const params = new URLSearchParams(searchParams.toString());
    if (value && value !== "all") {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    if (key !== "page") params.delete("page");
    router.push(`${pathname}?${params.toString()}`);
  }

  if (invoices.length === 0) {
    return (
      <EmptyState
        icon={FileText}
        title="No invoices found"
        description="No invoices match your current filters."
      />
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <SearchInput
          placeholder="Search invoices..."
          onSearch={(value) => updateParams("search", value)}
          defaultValue={searchParams.get("search") || ""}
        />
        <Select value={currentStatus} onValueChange={(v) => updateParams("status", v)}>
          <SelectTrigger className="w-full sm:w-40">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="paid">Paid</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="overdue">Overdue</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Desktop table */}
      <div className="hidden md:block rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Invoice #</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Due Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((inv) => (
              <TableRow key={inv.id} className="cursor-pointer hover:bg-muted/50">
                <TableCell>
                  <Link href={`/invoices/${inv.id}`} className="font-medium text-primary hover:underline">
                    {inv.invoiceNumber}
                  </Link>
                </TableCell>
                <TableCell className="font-medium">${inv.amount.toFixed(2)}</TableCell>
                <TableCell>
                  <InvoiceStatusBadge status={inv.status as "paid" | "pending" | "overdue" | "cancelled"} />
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {new Date(inv.dueDate).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden space-y-2">
        {invoices.map((inv) => (
          <InvoiceCard key={inv.id} invoice={inv as any} />
        ))}
      </div>

      <Pagination
        page={pagination.page}
        totalPages={pagination.totalPages}
        onPageChange={(p) => updateParams("page", p.toString())}
      />
    </div>
  );
}
