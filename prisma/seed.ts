import { PrismaClient } from "@prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";
import { hash } from "../src/lib/crypto.server";

const prisma = new PrismaClient({
  adapter: new PrismaLibSql({
    url: process.env.DATABASE_URL ?? "file:./dev.db",
  }),
});

async function main() {
  console.log("🌱 Seeding database...");

  // Demo user
  const passwordHash = hash("Password123!");
  const user = await prisma.user.upsert({
    where: { email: "demo@ams.com" },
    update: {},
    create: {
      name: "Demo Client",
      email: "demo@ams.com",
      passwordHash,
    },
  });
  console.log(`✅ User: ${user.email}`);

  // Sample invoices
  const invoices = [
    {
      invoiceNumber: "INV-2024-001",
      amount: 2500.0,
      status: "paid",
      issuedDate: new Date("2024-01-15"),
      dueDate: new Date("2024-02-15"),
      description: "Website Development - Phase 1",
    },
    {
      invoiceNumber: "INV-2024-002",
      amount: 1800.0,
      status: "paid",
      issuedDate: new Date("2024-02-01"),
      dueDate: new Date("2024-03-01"),
      description: "SEO Optimization Package",
    },
    {
      invoiceNumber: "INV-2024-003",
      amount: 4200.0,
      status: "pending",
      issuedDate: new Date("2024-03-10"),
      dueDate: new Date("2024-04-10"),
      description: "Mobile App Development",
    },
    {
      invoiceNumber: "INV-2024-004",
      amount: 950.0,
      status: "overdue",
      issuedDate: new Date("2024-03-20"),
      dueDate: new Date("2024-04-20"),
      description: "Monthly Maintenance - March",
    },
    {
      invoiceNumber: "INV-2024-005",
      amount: 3200.0,
      status: "pending",
      issuedDate: new Date("2024-04-01"),
      dueDate: new Date("2024-05-01"),
      description: "Custom Dashboard Development",
    },
  ];

  for (const inv of invoices) {
    await prisma.invoice.create({
      data: { ...inv, userId: user.id },
    });
  }
  console.log(`✅ ${invoices.length} invoices created`);

  // Sample tickets
  const tickets = [
    {
      category: "technical",
      subject: "Website loading slowly on mobile",
      description:
        "My website takes more than 5 seconds to load on my iPhone. Desktop seems fine.",
      status: "open",
      priority: "high",
    },
    {
      category: "billing",
      subject: "Question about invoice INV-2024-003",
      description:
        "I noticed an extra charge on this invoice. Can you provide a breakdown?",
      status: "in_progress",
      priority: "normal",
    },
    {
      category: "general",
      subject: "Need access to analytics dashboard",
      description:
        "I would like to view the website analytics. Please set up access for my account.",
      status: "resolved",
      priority: "low",
    },
  ];

  for (const ticket of tickets) {
    await prisma.supportTicket.create({
      data: { ...ticket, userId: user.id },
    });
  }
  console.log(`✅ ${tickets.length} tickets created`);

  console.log("🎉 Seeding complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
