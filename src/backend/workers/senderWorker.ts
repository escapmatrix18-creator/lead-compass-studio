/**
 * src/backend/workers/senderWorker.ts
 * BullMQ worker for sending emails with quota and consent enforcement
 */

import { Worker, Job } from 'bullmq';
import IORedis from 'ioredis';
import { prisma } from '../server';
import pino from 'pino';

// Redis connection
const connection = new IORedis(process.env.REDIS_URL || 'redis://localhost:6379');

const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
});

const senderWorker = new Worker(
  'campaignQueue',
  async (job: Job) => {
    const { campaignId } = job.data;

    logger.info(`Processing campaign job for campaignId=${campaignId}`);

    // Fetch campaign details
    const campaign = await prisma.campaign.findUnique({
      where: { id: campaignId },
      include: {
        leads: true,
        sender: true,
      },
    });

    if (!campaign) {
      logger.error(`Campaign not found: ${campaignId}`);
      return;
    }

    if (campaign.status !== 'active') {
      logger.info(`Campaign ${campaignId} is not active. Skipping.`);
      return;
    }

    if (!campaign.sender || !campaign.sender.isActive) {
      logger.warn(`No active sender for campaign ${campaignId}. Skipping.`);
      return;
    }

    // Enforce quota
    if (campaign.sender.usedQuota >= campaign.sender.quota) {
      logger.warn(`Sender quota exceeded for sender ${campaign.sender.email}. Pausing campaign.`);
      await prisma.campaign.update({
        where: { id: campaignId },
        data: { status: 'paused' },
      });
      return;
    }

    // Filter leads with consent
    const leadsWithConsent = campaign.leads.filter((lead) => lead.consent);

    // TODO: Implement email sending via providers (Gmail OAuth, SendGrid, Mailgun)
    // For now, simulate sending
    for (const lead of leadsWithConsent) {
      logger.info(`Sending email to ${lead.email} for campaign ${campaignId}`);
      // Simulate sending delay
      await new Promise((resolve) => setTimeout(resolve, 100));
      // Update quota usage
      await prisma.sender.update({
        where: { id: campaign.senderId },
        data: { usedQuota: { increment: 1 } },
      });
      // Log audit
      await prisma.auditLog.create({
        data: {
          action: 'send',
          details: { campaignId, leadId: lead.id, email: lead.email },
          userId: campaign.userId,
        },
      });
    }

    logger.info(`Completed sending emails for campaign ${campaignId}`);
  },
  { connection }
);

senderWorker.on('completed', (job) => {
  logger.info(`Job ${job.id} has completed`);
});

senderWorker.on('failed', (job, err) => {
  logger.error(`Job ${job?.id} failed with error: ${err.message}`);
});

export default senderWorker;

/**
 * Frontend integration notes:
 * - Worker runs independently; frontend triggers campaign creation to enqueue jobs.
 */
