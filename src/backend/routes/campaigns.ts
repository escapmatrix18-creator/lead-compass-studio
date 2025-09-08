/**
 * src/backend/routes/campaigns.ts
 * Campaign management routes for Blackbox AI — Campaign Orchestrator
 */

import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { prisma, campaignQueue } from "../server";
import { z } from "zod";

// Zod schema for campaign creation
const createCampaignSchema = z.object({
  name: z.string().min(3),
  description: z.string().optional(),
  country: z.string().optional(),
  city: z.string().optional(),
  industry: z.string().optional(),
  senderPoolId: z.string().optional(),
  throttling: z
    .object({
      rate: z.number().int().positive(),
      interval: z.enum(["second", "minute", "hour", "day"]),
    })
    .optional(),
});

export default async function campaignsRoutes(fastify: FastifyInstance) {
  // Create a new campaign
  fastify.post(
    "/",
    {
      schema: {
        body: createCampaignSchema,
        response: {
          201: {
            type: "object",
            properties: {
              id: { type: "string" },
              message: { type: "string" },
            },
          },
        },
      },
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      const body = createCampaignSchema.parse(request.body);

      // TODO: Add userId from auth context (stubbed here)
      const userId = "user-id-placeholder";

      const campaign = await prisma.campaign.create({
        data: {
          ...body,
          userId,
          status: "active",
        },
      });

      // Enqueue campaign job for processing
      await campaignQueue.add("campaignJob", { campaignId: campaign.id });

      reply.code(201).send({ id: campaign.id, message: "Campaign created" });
    },
  );

  // Get campaign status by id
  fastify.get(
    "/:id/status",
    {
      schema: {
        params: {
          type: "object",
          properties: {
            id: { type: "string" },
          },
          required: ["id"],
        },
        response: {
          200: {
            type: "object",
            properties: {
              id: { type: "string" },
              status: { type: "string" },
            },
          },
          404: {
            type: "object",
            properties: {
              message: { type: "string" },
            },
          },
        },
      },
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      const { id } = request.params as { id: string };
      const campaign = await prisma.campaign.findUnique({
        where: { id },
      });

      if (!campaign) {
        return reply.code(404).send({ message: "Campaign not found" });
      }

      reply.send({ id: campaign.id, status: campaign.status });
    },
  );
}

/**
 * Frontend integration notes:
 * - Use React Query's useMutation to call POST /api/campaigns for creating campaigns.
 * - Use useQuery to fetch campaign status from GET /api/campaigns/:id/status.
 */
