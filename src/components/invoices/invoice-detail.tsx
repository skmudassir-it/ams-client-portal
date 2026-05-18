"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { InvoiceStatusBadge } from "./invoice-status-badge";
import { Download, Loader2, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import type { Invoice } from "@/types";

interface InvoiceDetailProps {
  invoice: {
    id: string;
    invoiceNumber: string;
    amount: number;
    status: string;
    issuedDate: Date | string;
    dueDate: Date | string;
    description: string | null;
  };
}

export function InvoiceDetail({ invoice }: InvoiceDetailProps) {
  const router = useRouter();
  const [downloading, setDownloading] = useState(false);

  async function handleDownload() {
    setDownloading(true);
    try {
      const res = await fetch(`/api/invoices/${invoice.id}/download`);
      if (!res.ok) throw new Error("Download failed");
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `invoice-${invoice.invoiceNumber}.txt`;
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      toast.error("Failed to download invoice");
    } finally {
      setDownloading(false);
    }
  }

  return (
    <div className="space-y-6">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </button>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>{invoice.invoiceNumber}</CardTitle>
          <InvoiceStatusBadge status={invoice.status as "paid" | "pending" | "overdue" | "cancelled"} />
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Amount</p>
              <p className="text-2xl font-bold">${invoice.amount.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Status</p>
              <p className="font-medium capitalize">{invoice.status}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Issued Date</p>
              <p className="font-medium">{new Date(invoice.issuedDate).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Due Date</p>
              <p className="font-medium">{new Date(invoice.dueDate).toLocaleDateString()}</p>
            </div>
          </div>
          {invoice.description && (
            <div>
              <p className="text-sm text-muted-foreground">Description</p>
              <p className="mt-1">{invoice.description}</p>
            </div>
          )}
          <Button onClick={handleDownload} disabled={downloading}>
            {downloading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Download className="mr-2 h-4 w-4" />}
            Download Invoice
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
