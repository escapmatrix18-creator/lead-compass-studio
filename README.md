# Blackbox AI — Campaign Orchestrator Backend

## Overview

This is the backend service for Blackbox AI — Campaign Orchestrator, designed to integrate tightly with the Loveable — Campaign Studio frontend and Supabase infrastructure.

It provides campaign orchestration, lead management, email sending, compliance enforcement, and integrations with external APIs.

## Tech Stack

- Node.js with TypeScript
- Fastify framework for high-performance HTTP server with schema validation
- Prisma ORM connected to Supabase Postgres
- BullMQ with Redis for queue and workers
- Supabase client for Auth, Realtime, Storage
- Pino for structured JSON logging
- Jest + Supertest for testing (not included in this example)
- Docker Compose for infrastructure orchestration (not included in this example)
- GitHub Actions for CI/CD (not included in this example)

## Folder Structure

```
/src/backend
  /routes
    campaigns.ts
    leads.ts
  /workers
    senderWorker.ts
  server.ts
/prisma
  schema.prisma
.env.example
README.md
```

## Setup

1. Copy `.env.example` to `.env` and fill in your environment variables.

2. Install dependencies:

```bash
npm install
```

3. Generate Prisma client:

```bash
npx prisma generate
```

4. Run database migrations (configure as needed):

```bash
npx prisma migrate dev
```

5. Start the server:

```bash
npm run dev
```

## API Endpoints

- `POST /api/campaigns` — Create a new campaign
- `GET /api/campaigns/:id/status` — Get campaign status
- `POST /api/leads/import` — Import leads from Supabase Storage file reference
- `GET /api/leads` — Paginated fetch of leads with filters
- `POST /api/send/test` — (To be implemented) Test email sending
- `POST /api/integrations/connect` — (To be implemented) Connect external integrations
- `GET /api/health` — Health check endpoint

## Frontend Integration Notes

- Use React Query hooks to interact with the API endpoints.
- For example, use `useMutation` to create campaigns or import leads.
- Use `useQuery` to fetch campaign status and leads with pagination.
- Authentication is handled via Supabase client on the frontend.
- Refer to inline comments in the source code for detailed integration points.

## Compliance & Security

- All sending APIs require consent flags.
- No raw password storage; app-passwords encrypted and flagged insecure.
- Compliance bypass attempts are blocked and logged.
- No scraping scripts; only connector stubs.
- Audit logs capture all campaign sends, compliance checks, and proxy toggles.

## Environment Variables

See `.env.example` for required variables.

## License

MIT License
