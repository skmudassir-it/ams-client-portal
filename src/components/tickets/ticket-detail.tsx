import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TicketStatusBadge } from "./ticket-status-badge";

interface TicketDetailProps {
  ticket: {
    id: string;
    subject: string;
    category: string;
    status: string;
    priority: string;
    description: string;
    createdAt: string;
    updatedAt: string;
  };
}

export function TicketDetail({ ticket }: TicketDetailProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between">
        <div className="space-y-1">
          <CardTitle className="text-xl">{ticket.subject}</CardTitle>
          <p className="text-sm text-muted-foreground capitalize">
            {ticket.category} · {ticket.priority} priority
          </p>
        </div>
        <TicketStatusBadge status={ticket.status} />
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-sm font-medium text-muted-foreground mb-1">Description</p>
          <p className="whitespace-pre-wrap">{ticket.description}</p>
        </div>
        <div className="flex gap-4 text-sm text-muted-foreground">
          <span>Created: {new Date(ticket.createdAt).toLocaleDateString()}</span>
          <span>Updated: {new Date(ticket.updatedAt).toLocaleDateString()}</span>
        </div>
      </CardContent>
    </Card>
  );
}
