// Mock data for development and testing

import { Campaign, Lead } from './api';
import { 
  CAMPAIGN_STATUS, 
  VERIFICATION_STATUS, 
  CONSENT_STATUS, 
  LEAD_SOURCES,
  COUNTRIES,
  INDUSTRIES,
  COMPANY_SIZES 
} from './constants';

// Mock Campaigns
export const mockCampaigns: Campaign[] = [
  {
    id: '1',
    name: 'Mumbai Tech Startups Q1',
    country: 'India',
    city: 'Mumbai',
    industry: 'Technology',
    companySize: '51-200 employees',
    subject: 'Quick question about {{company}}\'s growth plans',
    template: `Hi {{first_name}},

I noticed {{company}} is growing rapidly in {{city}}. I wanted to reach out about how we can support your expansion plans for Q2.

Would you be open to a brief 15-minute call next week to discuss?

Best regards,
John Smith`,
    status: 'active',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
  },
  {
    id: '2',
    name: 'Delhi Enterprise Campaign',
    country: 'India',
    city: 'Delhi',
    industry: 'Finance',
    companySize: '201-1000 employees',
    subject: 'Partnership opportunity with {{company}}',
    template: `Dear {{first_name}},

We'd love to explore a strategic partnership with {{company}} to accelerate growth in the {{city}} market.

Our platform has helped similar companies in {{industry}} achieve 40% faster growth.

Would you be interested in a quick demo?

Best,
Sarah Johnson`,
    status: 'draft',
    createdAt: '2024-01-14T15:30:00Z',
    updatedAt: '2024-01-14T15:30:00Z',
  },
  {
    id: '3',
    name: 'Bangalore SaaS Outreach',
    country: 'India',
    city: 'Bangalore',
    industry: 'Technology',
    companySize: '11-50 employees',
    subject: 'Scale {{company}} with automated workflows',
    template: `Hello {{first_name}},

Scaling {{company}} in the competitive {{city}} market requires the right tools.

Our automation platform has helped 200+ SaaS companies in {{industry}} reduce operational costs by 35%.

Interested in seeing how we can help {{company}}?

Regards,
Mike Chen`,
    status: 'paused',
    createdAt: '2024-01-12T09:15:00Z',
    updatedAt: '2024-01-12T09:15:00Z',
  },
  {
    id: '4',
    name: 'Chennai Healthcare Initiative',
    country: 'India',
    city: 'Chennai',
    industry: 'Healthcare',
    companySize: '51-200 employees',
    subject: 'Modernize {{company}}\'s patient management',
    template: `Hi {{first_name}},

Healthcare digitization is accelerating in {{city}}, and {{company}} has an opportunity to lead the transformation.

Our healthcare platform has helped 50+ clinics improve patient satisfaction by 45%.

Would you like to learn more?

Best,
Dr. Priya Patel`,
    status: 'completed',
    createdAt: '2024-01-10T14:20:00Z',
    updatedAt: '2024-01-10T14:20:00Z',
  },
];

// Mock Leads
export const mockLeads: Lead[] = [
  {
    id: '1',
    company: 'TechCorp Solutions',
    city: 'Mumbai',
    country: 'India',
    contactName: 'Priya Sharma',
    role: 'HR Director',
    emails: ['priya.sharma@techcorp.in', 'hr@techcorp.in'],
    verificationStatus: 'verified',
    source: 'Upload',
    consentStatus: 'pending',
    lastVerified: '2024-01-15',
    notes: 'Interested in Q2 hiring solutions',
  },
  {
    id: '2',
    company: 'Digital Marketing Hub',
    city: 'Delhi',
    country: 'India',
    contactName: 'Rahul Gupta',
    role: 'CEO',
    emails: ['rahul@dmhub.com'],
    verificationStatus: 'unverified',
    source: 'API',
    consentStatus: 'granted',
    lastVerified: '2024-01-10',
    notes: 'Expanding team, looking for marketing automation',
  },
  {
    id: '3',
    company: 'InnovateLabs',
    city: 'Bangalore',
    country: 'India',
    contactName: 'Sarah Johnson',
    role: 'CTO',
    emails: ['sarah.j@innovatelabs.in', 'tech@innovatelabs.in'],
    verificationStatus: 'verified',
    source: 'Connector',
    consentStatus: 'granted',
    lastVerified: '2024-01-12',
    notes: 'Tech budget approved for Q1, interested in SaaS solutions',
  },
  {
    id: '4',
    company: 'GrowthScale Ventures',
    city: 'Pune',
    country: 'India',
    contactName: 'Amit Patel',
    role: 'Founder',
    emails: ['amit@growthscale.in'],
    verificationStatus: 'bounced',
    source: 'Upload',
    consentStatus: 'pending',
    lastVerified: '2024-01-08',
    notes: 'Invalid email - needs update, promising startup',
  },
  {
    id: '5',
    company: 'CloudFirst Technologies',
    city: 'Chennai',
    country: 'India',
    contactName: 'Kavya Iyer',
    role: 'VP Engineering',
    emails: ['kavya@cloudfirst.tech'],
    verificationStatus: 'verified',
    source: 'Connector',
    consentStatus: 'granted',
    lastVerified: '2024-01-13',
    notes: 'Looking for cloud migration solutions',
  },
  {
    id: '6',
    company: 'FinanceForward',
    city: 'Mumbai',
    country: 'India',
    contactName: 'Rohan Mehta',
    role: 'CFO',
    emails: ['rohan.mehta@financeforward.in', 'finance@financeforward.in'],
    verificationStatus: 'verified',
    source: 'Manual',
    consentStatus: 'granted',
    lastVerified: '2024-01-11',
    notes: 'Interested in financial automation tools',
  },
  {
    id: '7',
    company: 'EduTech Solutions',
    city: 'Delhi',
    country: 'India',
    contactName: 'Anjali Singh',
    role: 'Head of Operations',
    emails: ['anjali@edutech.co.in'],
    verificationStatus: 'unverified',
    source: 'Upload',
    consentStatus: 'pending',
    lastVerified: '2024-01-09',
    notes: 'Education sector, potential for large-scale implementation',
  },
  {
    id: '8',
    company: 'RetailMax Group',
    city: 'Bangalore',
    country: 'India',
    contactName: 'Vikram Reddy',
    role: 'COO',
    emails: ['vikram@retailmax.in'],
    verificationStatus: 'verified',
    source: 'API',
    consentStatus: 'granted',
    lastVerified: '2024-01-14',
    notes: 'Expanding retail operations, needs inventory management',
  },
];

// Mock Analytics Data
export const mockAnalytics = {
  campaigns: {
    total: mockCampaigns.length,
    active: mockCampaigns.filter(c => c.status === 'active').length,
    draft: mockCampaigns.filter(c => c.status === 'draft').length,
    paused: mockCampaigns.filter(c => c.status === 'paused').length,
    completed: mockCampaigns.filter(c => c.status === 'completed').length,
  },
  leads: {
    total: mockLeads.length,
    verified: mockLeads.filter(l => l.verificationStatus === 'verified').length,
    unverified: mockLeads.filter(l => l.verificationStatus === 'unverified').length,
    bounced: mockLeads.filter(l => l.verificationStatus === 'bounced').length,
    consentGranted: mockLeads.filter(l => l.consentStatus === 'granted').length,
    consentPending: mockLeads.filter(l => l.consentStatus === 'pending').length,
  },
  performance: {
    openRate: 24.5,
    clickRate: 3.2,
    bounceRate: 2.1,
    unsubscribeRate: 0.8,
    deliveryRate: 97.9,
  },
  trends: {
    emailsSent: [120, 145, 180, 165, 200, 175, 220],
    opens: [29, 35, 44, 40, 49, 43, 54],
    clicks: [4, 5, 6, 5, 6, 6, 7],
    bounces: [3, 2, 4, 3, 4, 3, 5],
  },
};

// Mock Integration Data
export const mockIntegrations = [
  {
    id: '1',
    name: 'Gmail',
    provider: 'gmail',
    type: 'oauth',
    status: 'connected',
    connectedAt: '2024-01-15T10:00:00Z',
    settings: {
      dailyLimit: 100,
      sendingEnabled: true,
    },
  },
  {
    id: '2',
    name: 'SendGrid',
    provider: 'sendgrid',
    type: 'api',
    status: 'connected',
    connectedAt: '2024-01-14T15:30:00Z',
    settings: {
      dailyLimit: 500,
      sendingEnabled: true,
    },
  },
  {
    id: '3',
    name: 'Clearbit',
    provider: 'clearbit',
    type: 'api',
    status: 'connected',
    connectedAt: '2024-01-12T09:15:00Z',
    settings: {
      monthlyQuota: 1000,
      enrichmentEnabled: true,
    },
  },
];

// Mock Compliance Data
export const mockComplianceAudit = [
  {
    id: '1',
    timestamp: '2024-01-15T10:30:00Z',
    action: 'Campaign paused due to bounce rate (6.2%)',
    campaign: 'Mumbai Tech Startups',
    type: 'auto',
    severity: 'warning',
  },
  {
    id: '2',
    timestamp: '2024-01-15T09:15:00Z',
    action: 'Suppression list updated (+23 emails)',
    campaign: 'Global',
    type: 'manual',
    severity: 'info',
  },
  {
    id: '3',
    timestamp: '2024-01-14T16:45:00Z',
    action: 'Double opt-in enabled for new leads',
    campaign: 'Delhi Enterprise',
    type: 'manual',
    severity: 'info',
  },
  {
    id: '4',
    timestamp: '2024-01-14T14:20:00Z',
    action: 'Unsubscribe processed for user@company.com',
    campaign: 'Bangalore SaaS',
    type: 'auto',
    severity: 'info',
  },
  {
    id: '5',
    timestamp: '2024-01-13T11:30:00Z',
    action: 'Spam complaint threshold reached (0.4%)',
    campaign: 'Chennai Healthcare',
    type: 'auto',
    severity: 'critical',
  },
];

// Utility functions for mock data
export const generateMockCampaign = (overrides: Partial<Campaign> = {}): Campaign => {
  const baseId = Date.now().toString();
  return {
    id: baseId,
    name: `Campaign ${baseId}`,
    country: COUNTRIES[Math.floor(Math.random() * COUNTRIES.length)],
    city: ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Pune'][Math.floor(Math.random() * 5)],
    industry: INDUSTRIES[Math.floor(Math.random() * INDUSTRIES.length)],
    companySize: COMPANY_SIZES[Math.floor(Math.random() * COMPANY_SIZES.length)],
    subject: 'Generated campaign subject',
    template: 'Generated campaign template',
    status: Object.values(CAMPAIGN_STATUS)[Math.floor(Math.random() * 4)] as any,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    ...overrides,
  };
};

export const generateMockLead = (overrides: Partial<Lead> = {}): Lead => {
  const baseId = Date.now().toString();
  const companies = ['TechCorp', 'DataFlow', 'CloudBase', 'InnovateHub', 'GrowthMax'];
  const roles = ['CEO', 'CTO', 'VP Engineering', 'Head of Sales', 'Product Manager'];
  const firstNames = ['Priya', 'Rahul', 'Sarah', 'Amit', 'Kavya', 'Rohan', 'Anjali', 'Vikram'];
  const lastNames = ['Sharma', 'Gupta', 'Johnson', 'Patel', 'Iyer', 'Mehta', 'Singh', 'Reddy'];

  const company = companies[Math.floor(Math.random() * companies.length)];
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  const domain = `${company.toLowerCase()}.com`;

  return {
    id: baseId,
    company: `${company} Solutions`,
    city: ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Pune'][Math.floor(Math.random() * 5)],
    country: 'India',
    contactName: `${firstName} ${lastName}`,
    role: roles[Math.floor(Math.random() * roles.length)],
    emails: [`${firstName.toLowerCase()}.${lastName.toLowerCase()}@${domain}`],
    verificationStatus: Object.values(VERIFICATION_STATUS)[Math.floor(Math.random() * 3)] as any,
    source: Object.values(LEAD_SOURCES)[Math.floor(Math.random() * 4)] as any,
    consentStatus: Object.values(CONSENT_STATUS)[Math.floor(Math.random() * 3)] as any,
    lastVerified: new Date().toISOString().split('T')[0],
    ...overrides,
  };
};

// Export all mock data as a single object for easy importing
export const mockData = {
  campaigns: mockCampaigns,
  leads: mockLeads,
  analytics: mockAnalytics,
  integrations: mockIntegrations,
  complianceAudit: mockComplianceAudit,
  generators: {
    campaign: generateMockCampaign,
    lead: generateMockLead,
  },
};