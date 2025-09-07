// Mock Service Worker setup for API mocking
import { http, HttpResponse } from 'msw';
import { setupWorker } from 'msw/browser';

// Generate mock datasets
const mockCampaigns = Array.from({ length: 25 }, (_, i) => ({
  id: `${i + 1}`,
  name: `Campaign ${i + 1}`,
  status: ['draft', 'active', 'paused', 'completed'][Math.floor(Math.random() * 4)],
  leads: Math.floor(Math.random() * 1000) + 100,
  sent: Math.floor(Math.random() * 500),
  openRate: Math.floor(Math.random() * 40) + 10,
  clickRate: Math.floor(Math.random() * 15) + 2,
  subject: `Subject for campaign ${i + 1}`,
  template: `Email template content for campaign ${i + 1}...`,
  createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
  updatedAt: new Date().toISOString(),
}));

// API handlers
export const handlers = [
  http.get('/api/campaigns', ({ request }) => {
    const url = new URL(request.url);
    const page = Number(url.searchParams.get('page')) || 1;
    const limit = Number(url.searchParams.get('limit')) || 10;

    const start = (page - 1) * limit;
    const paginatedCampaigns = mockCampaigns.slice(start, start + limit);

    return HttpResponse.json({
      success: true,
      data: paginatedCampaigns,
      meta: {
        total: mockCampaigns.length,
        page,
        limit,
        totalPages: Math.ceil(mockCampaigns.length / limit),
      },
    });
  }),

  http.get('/api/health', () => {
    return HttpResponse.json({
      success: true,
      data: {
        status: 'healthy',
        timestamp: new Date().toISOString(),
      },
    });
  }),
];

export const worker = setupWorker(...handlers);

if (import.meta.env.DEV && import.meta.env.VITE_ENABLE_MOCKING !== 'false') {
  worker.start({ onUnhandledRequest: 'bypass' }).catch(console.error);
}