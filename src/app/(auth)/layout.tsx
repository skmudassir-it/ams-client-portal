import type { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "AMS Client Portal",
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 px-4 py-12">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <Link href="/" className="inline-block">
            <h1 className="text-2xl font-bold tracking-tight">
              <span className="text-primary">AMS</span> Client Portal
            </h1>
          </Link>
          <p className="mt-1 text-sm text-muted-foreground">
            IT Services & Solutions
          </p>
        </div>
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-xl">Welcome</CardTitle>
            <CardDescription>
              Sign in to access your client dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>{children}</CardContent>
        </Card>
      </div>
    </div>
  );
}
