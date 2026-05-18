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
import { formatDate } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import type { Ticket } from "@/types";

interface RecentTicketsProps {
  tickets: Ticket[];
}

function getTicketStatusBadge(
  status: string
): { variant: "default" | "secondary" | "destructive" | "outline" | "ghost"; label: string } {
  switch (status) {
    case "open":
      return { variant: "default", label: "Open" };
    case "in_progress":
      return { variant: "outline", label: "In Progress" };
    case "resolved":
      return { variant: "secondary", label: "Resolved" };
    case "closed":
      return { variant: "ghost", label: "Closed" };
    default:
      return { variant: "outline", label: status };
  }
}

function getCategoryLabel(category: string): string {
  const labels: Record<string, string> = {
    billing: "Billing",
    technical: "Technical",
    general: "General",
    account: "Account",
  };
  return labels[category] ?? category;
}

export function RecentTickets({ tickets }: RecentTicketsProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Recent Tickets</CardTitle>
      </CardHeader>
      <CardContent className="px-0">
        {tickets.length === 0 ? (
          <p className="px-4 text-sm text-muted-foreground">
            No tickets yet.
          </p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Subject</TableHead>
                <TableHead className="hidden sm:table-cell">Category</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden md:table-cell">Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tickets.slice(0, 5).map((ticket) => {
                const badge = getTicketStatusBadge(ticket.status);
                return (
                  <TableRow key={ticket.id}>
                    <TableCell className="max-w-[200px] truncate font-medium">
                      {ticket.subject}
                    </TableCell>
                    <TableCell className="hidden text-muted-foreground sm:table-cell">
                      {getCategoryLabel(ticket.category)}
                    </TableCell>
                    <TableCell>
                      <Badge variant={badge.variant}>{badge.label}</Badge>
                    </TableCell>
                    <TableCell className="hidden text-muted-foreground md:table-cell">
                      {formatDate(ticket.createdAt)}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
      </CardContent>
      <CardFooter>
        <Button variant="ghost" size="sm" render={<Link href="/tickets" />} className="ml-auto">
          View All
          <ArrowRight className="ml-1 size-3" />
        </Button>
      </CardFooter>
    </Card>
  );
}
