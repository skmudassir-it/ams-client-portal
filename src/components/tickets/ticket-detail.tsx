"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TicketStatusBadge } from "./ticket-status-badge";
import { Loader2, CheckCircle, RotateCcw, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

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
  const router = useRouter();
  const [updating, setUpdating] = useState(false);
  const [status, setStatus] = useState(ticket.status);

  async function handleStatusUpdate(newStatus: string) {
    setUpdating(true);
    try {
      const res = await fetch(`/api/tickets/${ticket.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Update failed");
      setStatus(newStatus);
      const labels: Record<string, string> = {
        resolved: "Ticket resolved",
        closed: "Ticket closed",
        open: "Ticket reopened",
      };
      toast.success(labels[newStatus] || "Status updated");
      router.refresh();
    } catch (e: any) {
      toast.error(e.message || "Failed to update ticket");
    } finally {
      setUpdating(false);
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between">
        <div className="space-y-1">
          <CardTitle className="text-xl">{ticket.subject}</CardTitle>
          <p className="text-sm text-muted-foreground capitalize">
            {ticket.category} · {ticket.priority} priority
          </p>
        </div>
        <TicketStatusBadge status={status} />
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

        {/* Status Actions */}
        <div className="flex flex-wrap gap-2 pt-2 border-t">
          {(status === "open" || status === "in_progress") && (
            <>
              <Button
                onClick={() => handleStatusUpdate("resolved")}
                disabled={updating}
                size="sm"
              >
                {updating ? (
                  <Loader2 className="mr-2 h-3 w-3 animate-spin" />
                ) : (
                  <CheckCircle className="mr-2 h-3 w-3" />
                )}
                Mark Resolved
              </Button>
              <Button
                onClick={() => handleStatusUpdate("closed")}
                disabled={updating}
                variant="destructive"
                size="sm"
              >
                <XCircle className="mr-2 h-3 w-3" />
                Close Ticket
              </Button>
            </>
          )}
          {(status === "resolved" || status === "closed") && (
            <Button
              onClick={() => handleStatusUpdate("open")}
              disabled={updating}
              variant="outline"
              size="sm"
            >
              <RotateCcw className="mr-2 h-3 w-3" />
              Reopen Ticket
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
