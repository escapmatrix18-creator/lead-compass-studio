/**
 * src/backend/server.ts
 * Fastify server setup for Blackbox AI — Campaign Orchestrator
 */

import Fastify from "fastify";
import fastifyCors from "@fastify/cors";
import fastifyRateLimit from "@fastify/rate-limit";
import pino from "pino";
import { PrismaClient } from "@prisma/client";
import { createClient } from "@supabase/supabase-js";
import campaignsRoutes from "./routes/campaigns";
import leadsRoutes from "./routes/leads";
import { Queue, Worker } from "bullmq";
import IORedis from "ioredis";

// Load environment variables
import dotenv from "dotenv";
dotenv.config();

const logger = pino({
  level: process.env.LOG_LEVEL || "info",
  formatters: {
    level(label) {
      return { level: label };
    },
  },
});

const app = Fastify({
  logger,
});

// Prisma client for DB access
export const prisma = new PrismaClient();

// Supabase client for Auth, Realtime, Storage
export const supabase = createClient(
  process.env.SUPABASE_URL || "",
  process.env.SUPABASE_SERVICE_ROLE_KEY || "",
);

// Redis connection for BullMQ
const connection = new IORedis(
  process.env.REDIS_URL || "redis://localhost:6379",
);

// BullMQ queue for campaign jobs
export const campaignQueue = new Queue("campaignQueue", { connection });

// Register plugins
app.register(fastifyCors, {
  origin: true,
});
app.register(fastifyRateLimit, {
  max: 100,
  timeWindow: "1 minute",
});

// Register routes
app.register(campaignsRoutes, { prefix: "/api/campaigns" });
app.register(leadsRoutes, { prefix: "/api/leads" });

// Health check endpoint
app.get("/api/health", async (request, reply) => {
  return { status: "ok", timestamp: new Date().toISOString() };
});

// Global error handler
app.setErrorHandler((error, request, reply) => {
  app.log.error(error);
  reply.status(error.statusCode ?? 500).send({
    error: error.message || "Internal Server Error",
  });
});

// Start server
const start = async () => {
  try {
    const port = Number(process.env.PORT) || 4000;
    await app.listen({ port, host: "0.0.0.0" });
    logger.info(`Server listening on port ${port}`);
  } catch (err) {
    logger.error(err);
    process.exit(1);
  }
};

start();

/**
 * Frontend integration notes:
 * - Use React Query hooks to call /api/campaigns and /api/leads endpoints.
 * - Use /api/health for health checks.
 * - Authentication handled via Supabase client on frontend.
 */
