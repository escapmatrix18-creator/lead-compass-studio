import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiService, Campaign } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';
import { SUCCESS_MESSAGES, ERROR_MESSAGES } from '@/lib/constants';

// Query keys
const QUERY_KEYS = {
  CAMPAIGNS: ['campaigns'],
  CAMPAIGN: (id: string) => ['campaigns', id],
} as const;

// Mock data for development
const mockCampaigns: Campaign[] = [
  {
    id: '1',
    name: 'Mumbai Tech Startups Q1',
    country: 'India',
    city: 'Mumbai',
    industry: 'Technology',
    companySize: '51-200 employees',
    subject: 'Quick question about {{company}}\'s growth plans',
    template: 'Hi {{first_name}}, I noticed {{company}} is growing rapidly...',
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
    template: 'Dear {{first_name}}, We\'d love to explore...',
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
    subject: 'Scale your business with {{company}}',
    template: 'Hello {{first_name}}, Scaling {{company}} requires...',
    status: 'paused',
    createdAt: '2024-01-12T09:15:00Z',
    updatedAt: '2024-01-12T09:15:00Z',
  },
];

// Hook to get all campaigns
export const useCampaigns = () => {
  return useQuery({
    queryKey: QUERY_KEYS.CAMPAIGNS,
    queryFn: async () => {
      try {
        const response = await apiService.getCampaigns();
        return response.data;
      } catch (error) {
        // Return mock data in development
        console.warn('Using mock campaign data');
        return mockCampaigns;
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Hook to get a single campaign
export const useCampaign = (id: string) => {
  return useQuery({
    queryKey: QUERY_KEYS.CAMPAIGN(id),
    queryFn: async () => {
      try {
        const response = await apiService.getCampaign(id);
        return response.data;
      } catch (error) {
        // Return mock data in development
        const mockCampaign = mockCampaigns.find(c => c.id === id);
        if (!mockCampaign) {
          throw new Error('Campaign not found');
        }
        return mockCampaign;
      }
    },
    enabled: !!id,
  });
};

// Hook to create a campaign
export const useCreateCampaign = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (campaign: Omit<Campaign, 'id' | 'createdAt' | 'updatedAt'>) => {
      try {
        const response = await apiService.createCampaign(campaign);
        return response.data;
      } catch (error) {
        // Mock creation for development
        const newCampaign: Campaign = {
          ...campaign,
          id: Date.now().toString(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        return newCampaign;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.CAMPAIGNS });
      toast({
        title: "Success",
        description: SUCCESS_MESSAGES.CAMPAIGN_CREATED,
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

// Hook to update a campaign
export const useUpdateCampaign = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, ...updates }: Partial<Campaign> & { id: string }) => {
      try {
        const response = await apiService.updateCampaign(id, updates);
        return response.data;
      } catch (error) {
        // Mock update for development
        const updatedCampaign = {
          ...updates,
          id,
          updatedAt: new Date().toISOString(),
        };
        return updatedCampaign;
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.CAMPAIGNS });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.CAMPAIGN(data.id) });
      toast({
        title: "Success",
        description: SUCCESS_MESSAGES.CAMPAIGN_UPDATED,
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

// Hook to delete a campaign
export const useDeleteCampaign = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (id: string) => {
      try {
        await apiService.deleteCampaign(id);
        return id;
      } catch (error) {
        // Mock deletion for development
        return id;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.CAMPAIGNS });
      toast({
        title: "Success",
        description: SUCCESS_MESSAGES.CAMPAIGN_DELETED,
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

// Hook to test send a campaign
export const useTestSend = () => {
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ campaignId, testEmail }: { campaignId: string; testEmail: string }) => {
      try {
        const response = await apiService.testSend(campaignId, testEmail);
        return response.data;
      } catch (error) {
        // Mock test send for development
        return { sent: true };
      }
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: SUCCESS_MESSAGES.TEST_EMAIL_SENT,
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

// Hook to get campaign analytics/stats
export const useCampaignStats = () => {
  return useQuery({
    queryKey: ['campaign-stats'],
    queryFn: async () => {
      // Mock stats for development
      return {
        totalCampaigns: mockCampaigns.length,
        activeCampaigns: mockCampaigns.filter(c => c.status === 'active').length,
        draftCampaigns: mockCampaigns.filter(c => c.status === 'draft').length,
        pausedCampaigns: mockCampaigns.filter(c => c.status === 'paused').length,
        completedCampaigns: mockCampaigns.filter(c => c.status === 'completed').length,
      };
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};