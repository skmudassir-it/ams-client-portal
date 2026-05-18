"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Loader2, Send } from "lucide-react";

interface TicketReplyFormProps {
  ticketId: string;
  onReplyAdded: () => void;
}

export function TicketReplyForm({ ticketId, onReplyAdded }: TicketReplyFormProps) {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!message.trim()) return;

    setLoading(true);
    try {
      const res = await fetch(`/api/tickets/${ticketId}/replies`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: message.trim() }),
      });
      if (!res.ok) throw new Error("Failed to add reply");
      setMessage("");
      onReplyAdded();
      toast.success("Reply added");
    } catch {
      toast.error("Failed to add reply");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <Textarea
        placeholder="Type your reply..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        rows={3}
        disabled={loading}
      />
      <Button type="submit" disabled={loading || !message.trim()}>
        {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
        Send Reply
      </Button>
    </form>
  );
}
