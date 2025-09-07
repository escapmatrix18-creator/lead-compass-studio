// App Constants
export const APP_NAME = "Campaign Studio";
export const APP_DESCRIPTION = "Lead Campaign & Marketing Platform";

// API Endpoints
export const API_ENDPOINTS = {
  CAMPAIGNS: '/campaigns',
  LEADS: '/leads',
  INTEGRATIONS: '/integrations',
  SEND: '/send',
  HEALTH: '/health',
  VERIFY: '/verify',
} as const;

// Campaign Status
export const CAMPAIGN_STATUS = {
  DRAFT: 'draft',
  ACTIVE: 'active',
  PAUSED: 'paused',
  COMPLETED: 'completed',
} as const;

// Lead Verification Status
export const VERIFICATION_STATUS = {
  VERIFIED: 'verified',
  UNVERIFIED: 'unverified',
  BOUNCED: 'bounced',
} as const;

// Consent Status
export const CONSENT_STATUS = {
  GRANTED: 'granted',
  PENDING: 'pending',
  DENIED: 'denied',
} as const;

// Lead Sources
export const LEAD_SOURCES = {
  UPLOAD: 'Upload',
  API: 'API',
  CONNECTOR: 'Connector',
  MANUAL: 'Manual',
} as const;

// Countries
export const COUNTRIES = [
  'India',
  'United States', 
  'United Kingdom',
  'Canada',
  'Australia',
  'Germany',
  'France',
  'Singapore',
  'UAE',
  'Netherlands',
] as const;

// Industries
export const INDUSTRIES = [
  'Technology',
  'Healthcare', 
  'Finance',
  'Manufacturing',
  'Retail',
  'Education',
  'Real Estate',
  'Consulting',
  'Marketing',
  'Legal',
  'Non-profit',
  'Government',
] as const;

// Company Sizes
export const COMPANY_SIZES = [
  '1-10 employees',
  '11-50 employees', 
  '51-200 employees',
  '201-1000 employees',
  '1000+ employees',
] as const;

// Email Providers
export const EMAIL_PROVIDERS = {
  GMAIL: 'gmail',
  SENDGRID: 'sendgrid',
  MAILGUN: 'mailgun',
  OUTLOOK: 'outlook',
  SMTP: 'smtp',
} as const;

// Integration Providers
export const INTEGRATION_PROVIDERS = {
  CLEARBIT: 'clearbit',
  HUNTER: 'hunter',
  LINKEDIN: 'linkedin', 
  GOOGLE_PLACES: 'google-places',
  CUSTOM: 'custom',
} as const;

// Compliance Thresholds
export const COMPLIANCE_THRESHOLDS = {
  BOUNCE_RATE_WARNING: 3, // %
  BOUNCE_RATE_CRITICAL: 5, // %
  COMPLAINT_RATE_WARNING: 0.1, // %
  COMPLAINT_RATE_CRITICAL: 0.3, // %
  DAILY_SEND_LIMIT_DEFAULT: 50,
  DAILY_SEND_LIMIT_MAX: 500,
} as const;

// UI Constants
export const UI_CONSTANTS = {
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
  ACCEPTED_FILE_TYPES: ['.csv', '.xlsx', '.xls'],
  PAGINATION_SIZE: 50,
  DEBOUNCE_DELAY: 300, // ms
} as const;

// Animation Durations
export const ANIMATION = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 500,
} as const;

// Local Storage Keys
export const STORAGE_KEYS = {
  THEME: 'campaign-studio-theme',
  USER_PREFERENCES: 'campaign-studio-preferences',
  DRAFT_CAMPAIGNS: 'campaign-studio-drafts',
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  SERVER_ERROR: 'Server error. Please try again later.',
  VALIDATION_ERROR: 'Please check your input and try again.',
  UNAUTHORIZED: 'You are not authorized to perform this action.',
  FILE_TOO_LARGE: 'File size exceeds the maximum limit of 10MB.',
  INVALID_FILE_TYPE: 'Please upload a valid CSV or Excel file.',
} as const;

// Success Messages
export const SUCCESS_MESSAGES = {
  CAMPAIGN_CREATED: 'Campaign created successfully!',
  CAMPAIGN_UPDATED: 'Campaign updated successfully!',
  CAMPAIGN_DELETED: 'Campaign deleted successfully!',
  LEADS_IMPORTED: 'Leads imported successfully!',
  LEADS_VERIFIED: 'Leads verified successfully!',
  INTEGRATION_CONNECTED: 'Integration connected successfully!',
  TEST_EMAIL_SENT: 'Test email sent successfully!',
} as const;

// Regular Expressions
export const REGEX = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE: /^\+?[\d\s\-\(\)]+$/,
  URL: /^https?:\/\/.+/,
} as const;

export type CampaignStatus = typeof CAMPAIGN_STATUS[keyof typeof CAMPAIGN_STATUS];
export type VerificationStatus = typeof VERIFICATION_STATUS[keyof typeof VERIFICATION_STATUS];
export type ConsentStatus = typeof CONSENT_STATUS[keyof typeof CONSENT_STATUS];
export type LeadSource = typeof LEAD_SOURCES[keyof typeof LEAD_SOURCES];
export type EmailProvider = typeof EMAIL_PROVIDERS[keyof typeof EMAIL_PROVIDERS];
export type IntegrationProvider = typeof INTEGRATION_PROVIDERS[keyof typeof INTEGRATION_PROVIDERS];