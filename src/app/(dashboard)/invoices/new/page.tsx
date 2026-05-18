import { getServerSession } from "@/lib/auth-utils";
import { redirect } from "next/navigation";
import { InvoiceForm } from "@/components/invoices/invoice-form";

export default async function NewInvoicePage() {
  const session = await getServerSession();
  if (!session) redirect("/login");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Create Invoice</h1>
        <p className="text-muted-foreground">Add a new invoice to your account</p>
      </div>
      <InvoiceForm />
    </div>
  );
}
