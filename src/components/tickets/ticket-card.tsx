import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { TicketStatusBadge } from "./ticket-status-badge";
import { ChevronRight } from "lucide-react";

interface TicketCardProps {
  ticket: {
    id: string;
    subject: string;
    category: string;
    status: string;
    updatedAt: string;
  };
}

export function TicketCard({ ticket }: TicketCardProps) {
  return (
    <Link href={`/tickets/${ticket.id}`}>
      <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
        <CardContent className="flex items-center justify-between p-4">
          <div className="space-y-1 min-w-0 flex-1">
            <p className="font-medium truncate">{ticket.subject}</p>
            <p className="text-xs text-muted-foreground capitalize">{ticket.category}</p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <TicketStatusBadge status={ticket.status} />
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
