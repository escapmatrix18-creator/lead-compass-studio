import { z } from 'zod';
import { REGEX } from './constants';

// Campaign validation schema
export const campaignSchema = z.object({
  name: z.string().min(1, 'Campaign name is required').max(100, 'Campaign name too long'),
  country: z.string().min(1, 'Country is required'),
  city: z.string().min(1, 'City is required'),
  industry: z.string().min(1, 'Industry is required'),
  companySize: z.string().min(1, 'Company size is required'),
  subject: z.string().min(1, 'Subject line is required').max(200, 'Subject line too long'),
  template: z.string().min(1, 'Email template is required'),
  status: z.enum(['draft', 'active', 'paused', 'completed']).default('draft'),
});

// Lead validation schema
export const leadSchema = z.object({
  company: z.string().min(1, 'Company name is required'),
  city: z.string().min(1, 'City is required'),
  country: z.string().min(1, 'Country is required'),
  contactName: z.string().min(1, 'Contact name is required'),
  role: z.string().min(1, 'Role is required'),
  emails: z.array(
    z.string().regex(REGEX.EMAIL, 'Invalid email format')
  ).min(1, 'At least one email is required'),
  verificationStatus: z.enum(['verified', 'unverified', 'bounced']).default('unverified'),
  source: z.string().min(1, 'Source is required'),
  consentStatus: z.enum(['granted', 'pending', 'denied']).default('pending'),
  notes: z.string().optional(),
});

// Authentication validation schemas
export const signInSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const signUpSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password must contain uppercase, lowercase, and number'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

// Settings validation schema
export const settingsSchema = z.object({
  notifications: z.object({
    email: z.boolean().default(true),
    push: z.boolean().default(true),
    campaigns: z.boolean().default(true),
    leads: z.boolean().default(true),
  }),
  sending: z.object({
    dailyLimit: z.number().min(1).max(1000).default(50),
    throttle: z.number().min(1).max(60).default(5), // seconds between emails
    autoStop: z.boolean().default(true),
  }),
  compliance: z.object({
    gdprCompliance: z.boolean().default(true),
    canSpamCompliance: z.boolean().default(true),
    suppressionList: z.boolean().default(true),
  }),
});

// Integration validation schema  
export const integrationSchema = z.object({
  provider: z.string().min(1, 'Provider is required'),
  credentials: z.record(z.string(), z.any()),
  settings: z.record(z.string(), z.any()).optional(),
});

// File upload validation
export const fileUploadSchema = z.object({
  file: z.instanceof(File)
    .refine((file) => file.size <= 10 * 1024 * 1024, 'File size must be less than 10MB')
    .refine(
      (file) => ['text/csv', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'].includes(file.type),
      'File must be CSV or Excel format'
    ),
});

// Export types
export type CampaignFormData = z.infer<typeof campaignSchema>;
export type LeadFormData = z.infer<typeof leadSchema>;
export type SignInFormData = z.infer<typeof signInSchema>;
export type SignUpFormData = z.infer<typeof signUpSchema>;
export type SettingsFormData = z.infer<typeof settingsSchema>;
export type IntegrationFormData = z.infer<typeof integrationSchema>;
export type FileUploadFormData = z.infer<typeof fileUploadSchema>;