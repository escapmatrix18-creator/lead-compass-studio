# TODO: Complete Blackbox Backend Orchestrator

## 1. Repo Analysis (Completed)
- [x] Clone repo and run npm ci in root and src/backend
- [x] Run npx tsc --noEmit (no errors)
- [x] Run npm run lint (31 problems: 21 errors, 10 warnings)

## 2. Prisma & DB Tasks
- [ ] Update prisma/schema.prisma with missing models:
  - [ ] SuppressionList model for blacklisted emails
  - [ ] SendJob model for tracking individual send jobs
  - [ ] WebhookEvent model for webhook events
  - [ ] Add sendStatus field to Lead model
- [ ] Create prisma/seed.ts with realistic sample data
- [ ] Run npx prisma generate

## 3. Backend Telemetry Service
- [ ] Create src/backend/services/telemetry.ts with trackEvent, trackError, trackPageView stubs

## 4. Implement Missing Endpoints
- [ ] POST /api/send/test: Accept sandbox payload, validate schema, require consent_flag or test_mode=true, enqueue test-send job
- [ ] POST /api/integrations/connect: Save integration configs (provider, apiKey, limits) to DB, encrypt secrets, return connection test result

## 5. Harden Workers/SenderWorker
- [ ] Update src/backend/workers/senderWorker.ts:
  - [ ] Respect per-sender daily/hourly quotas stored in DB
  - [ ] Check consent_flag for each lead before sending
  - [ ] Use suppression list table to skip blacklisted emails
  - [ ] Update lead send status and write audit log row for each action
  - [ ] Emit telemetry via backend telemetry service

## 6. Tests (Critical-Path)
- [ ] Add Jest + Supertest tests:
  - [ ] __tests__/health.test.ts → GET /api/health returns 200
  - [ ] __tests__/campaign.test.ts → POST /api/campaigns creates campaign; GET status works
  - [ ] __tests__/leads.import.test.ts → POST /api/leads/import accepts CSV fixture and verifies DB rows
- [ ] Ensure npm test runs in CI and passes

## 7. CI/CD & Infra
- [ ] Add .github/workflows/ci.yml with checkout, setup node, install, prisma generate, tsc --noEmit, lint, test
- [ ] Add docker-compose.dev.yml for Redis and local Postgres

## 8. Security & Dependency Fixes
- [ ] Run npm audit and attempt npm audit fix
- [ ] Upgrade moderate/high vulns or create ISSUE with mitigation comments
- [ ] Add .github/dependabot.yml for auto dependency updates

## 9. API Docs & OpenAPI
- [ ] Add docs/openapi.yaml describing main endpoints with response schemas

## 10. Feature Flags & Compliance Gates
- [ ] Add src/config.ts with feature flags (ENABLE_CRAWLER_UI=false)
- [ ] Enforce CONSENT_REQUIRED in sending route and worker

## 11. Acceptance Verification & PR
- [ ] Run local verification commands and paste outputs in PR
- [ ] Create branch blackboxai/complete-backend-fixes
- [ ] Open PR with summary, test outputs, instructions, acceptance criteria
