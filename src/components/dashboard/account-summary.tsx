"use client";

import {
  FileText,
  AlertCircle,
  MessageSquare,
  CheckCircle,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { DashboardSummary } from "@/types";

interface AccountSummaryProps {
  summary: DashboardSummary;
}

const STAT_CARDS = [
  {
    key: "totalInvoices",
    label: "Total Invoices",
    icon: FileText,
    color: "text-blue-600",
    bg: "bg-blue-100",
  },
  {
    key: "unpaidInvoices",
    label: "Unpaid",
    icon: AlertCircle,
    color: "text-amber-600",
    bg: "bg-amber-100",
  },
  {
    key: "openTickets",
    label: "Open Tickets",
    icon: MessageSquare,
    color: "text-blue-600",
    bg: "bg-blue-100",
  },
  {
    key: "resolvedTickets",
    label: "Resolved",
    icon: CheckCircle,
    color: "text-green-600",
    bg: "bg-green-100",
  },
] as const;

export function AccountSummary({ summary }: AccountSummaryProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {STAT_CARDS.map((stat) => {
        const Icon = stat.icon;
        const value = summary[stat.key];
        return (
          <Card key={stat.key} size="sm">
            <CardContent className="flex items-center gap-4 p-4">
              <div
                className={`flex size-10 shrink-0 items-center justify-center rounded-lg ${stat.bg}`}
              >
                <Icon className={`size-5 ${stat.color}`} />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground">{stat.label}</p>
                <p className="text-2xl font-bold tracking-tight tabular-nums">
                  {value}
                </p>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
