"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  MessageSquareText,
  User,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

type MobileNavUser = {
  id: string;
  name?: string | null;
  email?: string | null;
};

const NAV_ITEMS = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/invoices", label: "Invoices", icon: FileText },
  { href: "/tickets", label: "Tickets", icon: MessageSquareText },
  { href: "/profile", label: "Profile", icon: User },
];

interface MobileNavProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: MobileNavUser;
}

export function MobileNav({ open, onOpenChange, user }: MobileNavProps) {
  const pathname = usePathname();

  const initials = user.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : (user.email ?? "U")[0].toUpperCase();

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="w-64 p-0">
        <SheetHeader className="flex h-14 items-center justify-start border-b">
          <div className="flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded-lg bg-primary">
              <LayoutDashboard className="size-4 text-primary-foreground" />
            </div>
            <SheetTitle className="text-sm font-semibold">
              <span className="text-primary">AMS</span> Portal
            </SheetTitle>
          </div>
        </SheetHeader>

        {/* Navigation Links */}
        <nav className="flex-1 space-y-0.5 p-2">
          {NAV_ITEMS.map((item) => {
            const isActive =
              pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => onOpenChange(false)}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <item.icon className="size-4 shrink-0" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <Separator />

        {/* User Info */}
        <div className="flex items-center gap-3 px-4 py-3">
          <Avatar size="sm">
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium">
              {user.name ?? "User"}
            </p>
            <p className="truncate text-xs text-muted-foreground">
              {user.email ?? ""}
            </p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
