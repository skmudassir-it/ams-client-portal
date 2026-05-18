import { Badge } from "@/components/ui/badge";

const statusVariants: Record<string, string> = {
  open: "bg-blue-100 text-blue-800 hover:bg-blue-100",
  in_progress: "bg-amber-100 text-amber-800 hover:bg-amber-100",
  resolved: "bg-emerald-100 text-emerald-800 hover:bg-emerald-100",
  closed: "bg-slate-100 text-slate-800 hover:bg-slate-100",
};

const labels: Record<string, string> = {
  open: "Open",
  in_progress: "In Progress",
  resolved: "Resolved",
  closed: "Closed",
};

export function TicketStatusBadge({ status }: { status: string }) {
  return (
    <Badge variant="outline" className={`font-medium ${statusVariants[status] || ""}`}>
      {labels[status] || status}
    </Badge>
  );
}
