import { Badge } from "@/components/ui/badge";
import type { InvoiceStatus } from "@/types";

const statusVariants: Record<InvoiceStatus, string> = {
  paid: "bg-emerald-100 text-emerald-800 hover:bg-emerald-100",
  pending: "bg-amber-100 text-amber-800 hover:bg-amber-100",
  overdue: "bg-red-100 text-red-800 hover:bg-red-100",
  cancelled: "bg-slate-100 text-slate-800 hover:bg-slate-100",
};

interface InvoiceStatusBadgeProps {
  status: InvoiceStatus;
}

export function InvoiceStatusBadge({ status }: InvoiceStatusBadgeProps) {
  return (
    <Badge variant="outline" className={`font-medium ${statusVariants[status] || ""}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  );
}
