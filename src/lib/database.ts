// Database schema and migration helpers for Supabase
export const DATABASE_TABLES = {
  CAMPAIGNS: 'campaigns',
  LEADS: 'leads', 
  INTEGRATIONS: 'integrations',
  USERS: 'users',
  PROFILES: 'profiles',
} as const;

// SQL migrations for Supabase (to be run manually or via migrations)
export const MIGRATIONS = {
  // Create campaigns table
  CREATE_CAMPAIGNS_TABLE: `
    CREATE TABLE IF NOT EXISTS campaigns (
      id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
      user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
      name TEXT NOT NULL,
      country TEXT NOT NULL,
      city TEXT NOT NULL,
      industry TEXT NOT NULL,
      company_size TEXT NOT NULL,
      subject TEXT NOT NULL,
      template TEXT NOT NULL,
      status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'active', 'paused', 'completed')),
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );
    
    -- Create RLS policies
    ALTER TABLE campaigns ENABLE ROW LEVEL SECURITY;
    
    CREATE POLICY "Users can view their own campaigns" ON campaigns
      FOR SELECT USING (auth.uid() = user_id);
      
    CREATE POLICY "Users can insert their own campaigns" ON campaigns
      FOR INSERT WITH CHECK (auth.uid() = user_id);
      
    CREATE POLICY "Users can update their own campaigns" ON campaigns
      FOR UPDATE USING (auth.uid() = user_id);
      
    CREATE POLICY "Users can delete their own campaigns" ON campaigns
      FOR DELETE USING (auth.uid() = user_id);
  `,

  // Create leads table
  CREATE_LEADS_TABLE: `
    CREATE TABLE IF NOT EXISTS leads (
      id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
      user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
      company TEXT NOT NULL,
      city TEXT NOT NULL,
      country TEXT NOT NULL,
      contact_name TEXT NOT NULL,
      role TEXT NOT NULL,
      emails TEXT[] NOT NULL,
      verification_status TEXT DEFAULT 'unverified' CHECK (verification_status IN ('verified', 'unverified', 'bounced')),
      source TEXT NOT NULL,
      consent_status TEXT DEFAULT 'pending' CHECK (consent_status IN ('granted', 'pending', 'denied')),
      last_verified TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      notes TEXT,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );
    
    -- Create RLS policies
    ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
    
    CREATE POLICY "Users can view their own leads" ON leads
      FOR SELECT USING (auth.uid() = user_id);
      
    CREATE POLICY "Users can insert their own leads" ON leads
      FOR INSERT WITH CHECK (auth.uid() = user_id);
      
    CREATE POLICY "Users can update their own leads" ON leads
      FOR UPDATE USING (auth.uid() = user_id);
      
    CREATE POLICY "Users can delete their own leads" ON leads
      FOR DELETE USING (auth.uid() = user_id);
  `,

  // Create profiles table
  CREATE_PROFILES_TABLE: `
    CREATE TABLE IF NOT EXISTS profiles (
      id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
      user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
      display_name TEXT,
      avatar_url TEXT,
      company TEXT,
      role TEXT,
      settings JSONB DEFAULT '{}',
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );
    
    -- Create RLS policies
    ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
    
    CREATE POLICY "Users can view their own profile" ON profiles
      FOR SELECT USING (auth.uid() = user_id);
      
    CREATE POLICY "Users can update their own profile" ON profiles
      FOR UPDATE USING (auth.uid() = user_id);
      
    CREATE POLICY "Users can insert their own profile" ON profiles
      FOR INSERT WITH CHECK (auth.uid() = user_id);
  `,

  // Create integrations table
  CREATE_INTEGRATIONS_TABLE: `
    CREATE TABLE IF NOT EXISTS integrations (
      id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
      user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
      provider TEXT NOT NULL,
      credentials JSONB NOT NULL DEFAULT '{}',
      settings JSONB DEFAULT '{}',
      is_active BOOLEAN DEFAULT false,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );
    
    -- Create RLS policies
    ALTER TABLE integrations ENABLE ROW LEVEL SECURITY;
    
    CREATE POLICY "Users can view their own integrations" ON integrations
      FOR SELECT USING (auth.uid() = user_id);
      
    CREATE POLICY "Users can insert their own integrations" ON integrations
      FOR INSERT WITH CHECK (auth.uid() = user_id);
      
    CREATE POLICY "Users can update their own integrations" ON integrations
      FOR UPDATE USING (auth.uid() = user_id);
      
    CREATE POLICY "Users can delete their own integrations" ON integrations
      FOR DELETE USING (auth.uid() = user_id);
  `,
};

// Helper functions for database operations
export const dbHelpers = {
  // Generate UUID
  generateId: () => crypto.randomUUID(),
  
  // Format timestamp
  formatTimestamp: (date: Date = new Date()) => date.toISOString(),
  
  // Sanitize user input
  sanitizeInput: (input: string) => input.trim().replace(/[<>]/g, ''),
  
  // Validate email
  isValidEmail: (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
};