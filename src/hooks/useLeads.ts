import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiService, Lead } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';
import { SUCCESS_MESSAGES, ERROR_MESSAGES } from '@/lib/constants';

// Query keys
const QUERY_KEYS = {
  LEADS: ['leads'],
  LEAD_STATS: ['lead-stats'],
} as const;

// Mock data for development
const mockLeads: Lead[] = [
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
    notes: 'Interested in Q2 hiring',
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
    notes: 'Tech budget approved for Q1',
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
    notes: 'Invalid email - needs update',
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
  },
];

interface LeadFilters {
  search?: string;
  status?: string;
  city?: string;
  country?: string;
  source?: string;
  consentStatus?: string;
}

// Hook to get all leads with filters
export const useLeads = (filters?: LeadFilters) => {
  return useQuery({
    queryKey: [...QUERY_KEYS.LEADS, filters],
    queryFn: async () => {
      try {
        const response = await apiService.getLeads(filters);
        return response.data;
      } catch (error) {
        // Return filtered mock data in development
        console.warn('Using mock lead data');
        let filteredLeads = mockLeads;

        if (filters?.search) {
          const search = filters.search.toLowerCase();
          filteredLeads = filteredLeads.filter(
            lead =>
              lead.company.toLowerCase().includes(search) ||
              lead.contactName.toLowerCase().includes(search) ||
              lead.city.toLowerCase().includes(search)
          );
        }

        if (filters?.status && filters.status !== 'all') {
          filteredLeads = filteredLeads.filter(lead => lead.verificationStatus === filters.status);
        }

        if (filters?.city && filters.city !== 'all') {
          filteredLeads = filteredLeads.filter(lead => lead.city === filters.city);
        }

        if (filters?.country && filters.country !== 'all') {
          filteredLeads = filteredLeads.filter(lead => lead.country === filters.country);
        }

        if (filters?.source && filters.source !== 'all') {
          filteredLeads = filteredLeads.filter(lead => lead.source === filters.source);
        }

        if (filters?.consentStatus && filters.consentStatus !== 'all') {
          filteredLeads = filteredLeads.filter(lead => lead.consentStatus === filters.consentStatus);
        }

        return filteredLeads;
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Hook to import leads from file
export const useImportLeads = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (file: File) => {
      try {
        const response = await apiService.importLeads(file);
        return response.data;
      } catch (error) {
        // Mock import for development
        const mockResult = {
          imported: Math.floor(Math.random() * 100) + 50,
          failed: Math.floor(Math.random() * 10),
        };
        
        // Simulate processing time
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        return mockResult;
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.LEADS });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.LEAD_STATS });
      toast({
        title: "Success",
        description: `${SUCCESS_MESSAGES.LEADS_IMPORTED} ${data.imported} leads imported, ${data.failed} failed.`,
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: ERROR_MESSAGES.SERVER_ERROR,
        variant: "destructive",
      });
    },
  });
};

// Hook to verify leads
export const useVerifyLeads = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (leadIds: string[]) => {
      try {
        const response = await apiService.verifyLeads(leadIds);
        return response.data;
      } catch (error) {
        // Mock verification for development
        const mockResult = {
          verified: leadIds.length - Math.floor(Math.random() * 3),
          failed: Math.floor(Math.random() * 3),
        };
        
        // Simulate processing time
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        return mockResult;
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.LEADS });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.LEAD_STATS });
      toast({
        title: "Success",
        description: `${SUCCESS_MESSAGES.LEADS_VERIFIED} ${data.verified} leads verified, ${data.failed} failed.`,
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: ERROR_MESSAGES.SERVER_ERROR,
        variant: "destructive",
      });
    },
  });
};

// Hook to get lead statistics
export const useLeadStats = () => {
  return useQuery({
    queryKey: QUERY_KEYS.LEAD_STATS,
    queryFn: async () => {
      // Mock stats for development
      return {
        totalLeads: mockLeads.length,
        verifiedLeads: mockLeads.filter(l => l.verificationStatus === 'verified').length,
        unverifiedLeads: mockLeads.filter(l => l.verificationStatus === 'unverified').length,
        bouncedLeads: mockLeads.filter(l => l.verificationStatus === 'bounced').length,
        consentGranted: mockLeads.filter(l => l.consentStatus === 'granted').length,
        consentPending: mockLeads.filter(l => l.consentStatus === 'pending').length,
        consentDenied: mockLeads.filter(l => l.consentStatus === 'denied').length,
        bySource: {
          Upload: mockLeads.filter(l => l.source === 'Upload').length,
          API: mockLeads.filter(l => l.source === 'API').length,
          Connector: mockLeads.filter(l => l.source === 'Connector').length,
          Manual: mockLeads.filter(l => l.source === 'Manual').length,
        },
        byCity: mockLeads.reduce((acc, lead) => {
          acc[lead.city] = (acc[lead.city] || 0) + 1;
          return acc;
        }, {} as Record<string, number>),
      };
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Hook to export leads
export const useExportLeads = () => {
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (leadIds?: string[]) => {
      // Mock export for development
      const leadsToExport = leadIds ? 
        mockLeads.filter(lead => leadIds.includes(lead.id)) : 
        mockLeads;
      
      // Create CSV content
      const headers = ['Company', 'Contact Name', 'Role', 'City', 'Country', 'Emails', 'Status', 'Source'];
      const csvContent = [
        headers.join(','),
        ...leadsToExport.map(lead => [
          lead.company,
          lead.contactName,
          lead.role,
          lead.city,
          lead.country,
          lead.emails.join(';'),
          lead.verificationStatus,
          lead.source,
        ].join(','))
      ].join('\n');

      // Create and trigger download
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `leads-export-${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);

      return { exported: leadsToExport.length };
    },
    onSuccess: (data) => {
      toast({
        title: "Success",
        description: `Exported ${data.exported} leads successfully!`,
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to export leads. Please try again.",
        variant: "destructive",
      });
    },
  });
};