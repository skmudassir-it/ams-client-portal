import { Card, CardContent } from "@/components/ui/card";

interface Reply {
  id: string;
  message: string;
  isStaff: boolean;
  createdAt: string;
  user?: { name: string };
}

interface TicketReplyListProps {
  replies: Reply[];
}

export function TicketReplyList({ replies }: TicketReplyListProps) {
  if (replies.length === 0) {
    return (
      <p className="text-center text-sm text-muted-foreground py-4">
        No replies yet. Add a reply below.
      </p>
    );
  }

  return (
    <div className="space-y-3">
      {replies.map((reply) => (
        <Card key={reply.id} className={reply.isStaff ? "border-primary/30 bg-primary/5" : ""}>
          <CardContent className="p-4 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-medium text-sm">
                  {reply.user?.name || "Unknown"}
                </span>
                {reply.isStaff && (
                  <span className="text-xs bg-primary text-primary-foreground px-1.5 py-0.5 rounded font-medium">
                    STAFF
                  </span>
                )}
              </div>
              <span className="text-xs text-muted-foreground">
                {new Date(reply.createdAt).toLocaleString()}
              </span>
            </div>
            <p className="text-sm whitespace-pre-wrap">{reply.message}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
