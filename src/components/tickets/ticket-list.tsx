"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { TicketStatusBadge } from "./ticket-status-badge";
import { TicketCard } from "./ticket-card";
import { SearchInput } from "@/components/shared/search-input";
import { Pagination } from "@/components/shared/pagination";
import { EmptyState } from "@/components/shared/empty-state";
import { MessageSquareText, Plus } from "lucide-react";
import Link from "next/link";

interface TicketListProps {
  tickets: Array<{
    id: string;
    subject: string;
    category: string;
    status: string;
    priority: string;
    updatedAt: string;
  }>;
  pagination: { page: number; totalPages: number; total: number };
}

export function TicketList({ tickets, pagination }: TicketListProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentStatus = searchParams.get("status") || "all";
  const currentCategory = searchParams.get("category") || "all";

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

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <SearchInput
            placeholder="Search tickets..."
            onSearch={(value) => updateParams("search", value)}
            defaultValue={searchParams.get("search") || ""}
          />
          <Select value={currentStatus} onValueChange={(v) => updateParams("status", v)}>
            <SelectTrigger className="w-full sm:w-36">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="open">Open</SelectItem>
              <SelectItem value="in_progress">In Progress</SelectItem>
              <SelectItem value="resolved">Resolved</SelectItem>
              <SelectItem value="closed">Closed</SelectItem>
            </SelectContent>
          </Select>
          <Select value={currentCategory} onValueChange={(v) => updateParams("category", v)}>
            <SelectTrigger className="w-full sm:w-36">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="billing">Billing</SelectItem>
              <SelectItem value="technical">Technical</SelectItem>
              <SelectItem value="general">General</SelectItem>
              <SelectItem value="account">Account</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Link href="/tickets/new">
          <Button className="w-full sm:w-auto">
            <Plus className="mr-2 h-4 w-4" />
            New Ticket
          </Button>
        </Link>
      </div>

      {tickets.length === 0 ? (
        <EmptyState icon={MessageSquareText} title="No tickets found" description="No support tickets match your filters." />
      ) : (
        <>
          <div className="hidden md:block rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Subject</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Updated</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tickets.map((t) => (
                  <TableRow key={t.id} className="cursor-pointer hover:bg-muted/50">
                    <TableCell>
                      <Link href={`/tickets/${t.id}`} className="font-medium text-primary hover:underline">
                        {t.subject}
                      </Link>
                    </TableCell>
                    <TableCell className="capitalize">{t.category}</TableCell>
                    <TableCell><TicketStatusBadge status={t.status} /></TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      {new Date(t.updatedAt).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="md:hidden space-y-2">
            {tickets.map((t) => (
              <TicketCard key={t.id} ticket={t} />
            ))}
          </div>
          <Pagination page={pagination.page} totalPages={pagination.totalPages} onPageChange={(p) => updateParams("page", p.toString())} />
        </>
      )}
    </div>
  );
}
