# AMS Client Portal

A secure, mobile-first client portal for AMS IT Services customers. Built with Next.js 15, Tailwind CSS v4, and TypeScript.

## Features

- **Authentication** — Register and log in with email + password (NextAuth.js v5)
- **Dashboard** — Account summary with stats, recent invoices, and active tickets
- **Invoices** — Browse, filter, and download invoices as PDF
- **Support Tickets** — Submit and track support tickets with replies
- **Profile** — Update personal info and change password

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 + shadcn/ui |
| Database | SQLite + Prisma ORM |
| Auth | NextAuth.js v5 (Credentials) |
| Validation | Zod + react-hook-form |
| Testing | Vitest + Testing Library |
| Deployment | Vercel |

## Quick Start

```bash
# 1. Clone the repository
git clone https://github.com/skmudassir-it/ams-client-portal.git
cd ams-client-portal

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp infra/.env.example .env.local
# Edit .env.local and set values (see Environment Variables below)

# 4. Generate Prisma client and run migration
npx prisma generate
npx prisma migrate dev --name init

# 5. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | SQLite database file path | `file:./dev.db` |
| `AUTH_SECRET` | NextAuth.js session encryption key | Generate: `openssl rand -base64 32` |
| `AUTH_URL` | Base URL for auth callbacks | `http://localhost:3000` |

Copy `infra/.env.example` to `.env.local` and fill in real values. Never commit `.env.local`.

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm test` | Run Vitest test suite |
| `npx prisma studio` | Open Prisma Studio GUI |

## Project Structure

```
ams-client-portal/
├── src/
│   ├── app/          # Next.js App Router pages + API routes
│   ├── components/   # React components (ui, layout, features)
│   ├── lib/          # Utilities (auth, prisma, validations)
│   ├── hooks/        # Custom React hooks
│   ├── types/        # TypeScript type definitions
│   └── middleware.ts # Route protection middleware
├── prisma/
│   └── schema.prisma # Database schema
├── infra/            # Infrastructure configs (CI/CD, Docker, env templates)
├── tests/            # Test files
└── public/           # Static assets
```

## Deployment

This project is deployed on [Vercel](https://vercel.com). Pushes to `main` trigger automatic deployment.

Manual deployment:
```bash
vercel --prod
```

## Contributing

1. Create a feature branch from `main`
2. Make changes and test locally
3. Push and open a pull request
4. CI must pass (lint, type-check, test, build)
5. Request review from team

## License

Proprietary — AMS IT Services.
