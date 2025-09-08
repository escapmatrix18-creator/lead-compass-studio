/**
 * src/backend/routes/leads.ts
 * Lead management routes for Blackbox AI — Campaign Orchestrator
 */

import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../server";
import { z } from "zod";

// Zod schema for lead import
const importLeadsSchema = z.object({
  fileRef: z.string(), // Supabase Storage file reference
  source: z.string().default("upload"),
});

// Zod schema for lead filters
const leadsFiltersSchema = z.object({
  country: z.string().optional(),
  city: z.string().optional(),
  industry: z.string().optional(),
  consent: z.boolean().optional(),
  page: z.number().int().positive().default(1),
  limit: z.number().int().positive().max(100).default(10),
});

export default async function leadsRoutes(fastify: FastifyInstance) {
  // Import leads from Supabase Storage file
  fastify.post(
    "/import",
    {
      schema: {
        body: importLeadsSchema,
        response: {
          200: {
            type: "object",
            properties: {
              imported: { type: "number" },
              message: { type: "string" },
            },
          },
        },
      },
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      const body = importLeadsSchema.parse(request.body);

      // TODO: Fetch file from Supabase Storage and parse CSV/Excel
      // Stub: Assume leads are parsed and validated
      const leads = [
        {
          email: "example@domain.com",
          firstName: "John",
          lastName: "Doe",
          company: "Example Corp",
          country: "US",
          city: "New York",
          industry: "Tech",
          consent: true,
          consentDate: new Date(),
        },
      ];

      // TODO: Add userId from auth context
      const userId = "user-id-placeholder";

      // Validate and store leads
      const validLeads = leads.filter((lead) => {
        // Basic email regex validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(lead.email) && lead.consent;
      });

      await prisma.lead.createMany({
        data: validLeads.map((lead) => ({
          ...lead,
          userId,
          source: body.source,
        })),
      });

      reply.send({ imported: validLeads.length, message: "Leads imported" });
    },
  );

  // Get paginated leads with filters
  fastify.get(
    "/",
    {
      schema: {
        querystring: leadsFiltersSchema,
        response: {
          200: {
            type: "object",
            properties: {
              leads: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    id: { type: "string" },
                    email: { type: "string" },
                    firstName: { type: "string" },
                    lastName: { type: "string" },
                    company: { type: "string" },
                    country: { type: "string" },
                    city: { type: "string" },
                    industry: { type: "string" },
                    consent: { type: "boolean" },
                  },
                },
              },
              total: { type: "number" },
              page: { type: "number" },
              limit: { type: "number" },
            },
          },
        },
      },
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      const filters = leadsFiltersSchema.parse(request.query);

      // TODO: Add userId from auth context
      const userId = "user-id-placeholder";

      const where = {
        userId,
        ...(filters.country && { country: filters.country }),
        ...(filters.city && { city: filters.city }),
        ...(filters.industry && { industry: filters.industry }),
        ...(filters.consent !== undefined && { consent: filters.consent }),
      };

      const [leads, total] = await Promise.all([
        prisma.lead.findMany({
          where,
          skip: (filters.page - 1) * filters.limit,
          take: filters.limit,
        }),
        prisma.lead.count({ where }),
      ]);

      reply.send({
        leads,
        total,
        page: filters.page,
        limit: filters.limit,
      });
    },
  );
}

/**
 * Frontend integration notes:
 * - Use React Query's useMutation to call POST /api/leads/import for importing leads.
 * - Use useQuery with pagination to fetch leads from GET /api/leads.
 */
