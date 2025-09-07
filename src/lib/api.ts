import { supabase } from "@/integrations/supabase/client";

// API Base URL from environment
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';

// Types
export interface Campaign {
  id: string;
  name: string;
  country: string;
  city: string;
  industry: string;
  companySize: string;
  subject: string;
  template: string;
  status: 'draft' | 'active' | 'paused' | 'completed';
  createdAt: string;
  updatedAt: string;
}

export interface Lead {
  id: string;
  company: string;
  city: string;
  country: string;
  contactName: string;
  role: string;
  emails: string[];
  verificationStatus: 'verified' | 'unverified' | 'bounced';
  source: string;
  consentStatus: 'granted' | 'pending' | 'denied';
  lastVerified: string;
  notes?: string;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  error?: string;
}

// API Service Class
class ApiService {
  private async request<T>(
    endpoint: string, 
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const url = `${API_BASE_URL}${endpoint}`;
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Campaign APIs
  async getCampaigns(): Promise<ApiResponse<Campaign[]>> {
    return this.request<Campaign[]>('/campaigns');
  }

  async getCampaign(id: string): Promise<ApiResponse<Campaign>> {
    return this.request<Campaign>(`/campaigns/${id}`);
  }

  async createCampaign(campaign: Omit<Campaign, 'id' | 'createdAt' | 'updatedAt'>): Promise<ApiResponse<Campaign>> {
    return this.request<Campaign>('/campaigns', {
      method: 'POST',
      body: JSON.stringify(campaign),
    });
  }

  async updateCampaign(id: string, campaign: Partial<Campaign>): Promise<ApiResponse<Campaign>> {
    return this.request<Campaign>(`/campaigns/${id}`, {
      method: 'PUT',
      body: JSON.stringify(campaign),
    });
  }

  async deleteCampaign(id: string): Promise<ApiResponse<void>> {
    return this.request<void>(`/campaigns/${id}`, {
      method: 'DELETE',
    });
  }

  // Lead APIs
  async getLeads(filters?: any): Promise<ApiResponse<Lead[]>> {
    const queryParams = filters ? `?${new URLSearchParams(filters).toString()}` : '';
    return this.request<Lead[]>(`/leads${queryParams}`);
  }

  async importLeads(file: File): Promise<ApiResponse<{ imported: number; failed: number }>> {
    const formData = new FormData();
    formData.append('file', file);
    
    return this.request<{ imported: number; failed: number }>('/leads/import', {
      method: 'POST',
      body: formData,
      headers: {}, // Let browser set Content-Type for multipart
    });
  }

  async verifyLeads(leadIds: string[]): Promise<ApiResponse<{ verified: number; failed: number }>> {
    return this.request<{ verified: number; failed: number }>('/leads/verify', {
      method: 'POST',
      body: JSON.stringify({ leadIds }),
    });
  }

  // Integration APIs
  async connectIntegration(provider: string, credentials: any): Promise<ApiResponse<{ connected: boolean }>> {
    return this.request<{ connected: boolean }>('/integrations/connect', {
      method: 'POST',
      body: JSON.stringify({ provider, credentials }),
    });
  }

  // Test sending
  async testSend(campaignId: string, testEmail: string): Promise<ApiResponse<{ sent: boolean }>> {
    return this.request<{ sent: boolean }>('/send/test', {
      method: 'POST',
      body: JSON.stringify({ campaignId, testEmail }),
    });
  }

  // Health check
  async healthCheck(): Promise<ApiResponse<{ status: string; timestamp: string }>> {
    return this.request<{ status: string; timestamp: string }>('/health');
  }
}

// Export singleton instance
export const apiService = new ApiService();

// Supabase helpers (for when backend is integrated)
export const supabaseApi = {
  // Auth helpers
  async signUp(email: string, password: string) {
    return await supabase.auth.signUp({ email, password });
  },

  async signIn(email: string, password: string) {
    return await supabase.auth.signInWithPassword({ email, password });
  },

  async signOut() {
    return await supabase.auth.signOut();
  },

  async getCurrentUser() {
    return await supabase.auth.getUser();
  },

  // Database helpers (examples for future use - uncomment when tables are created)
  // async insertCampaign(campaign: any) {
  //   return await supabase.from('campaigns').insert(campaign);
  // },

  // async getCampaigns() {
  //   return await supabase.from('campaigns').select('*');
  // },

  // async insertLead(lead: any) {
  //   return await supabase.from('leads').insert(lead);
  // },

  // async getLeads() {
  //   return await supabase.from('leads').select('*');
  // },
};