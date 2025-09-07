import { useState, useEffect, createContext, useContext } from 'react';
import { User } from '@supabase/supabase-js';
import { supabaseApi } from '@/lib/api';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error?: string }>;
  signUp: (email: string, password: string) => Promise<{ error?: string }>;
  signOut: () => Promise<void>;
  isAuthenticated: boolean;
}

// Create Auth Context
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Auth hook implementation
export const useAuthState = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      try {
        const { data } = await supabaseApi.getCurrentUser();
        setUser(data.user);
      } catch (error) {
        console.error('Error getting initial session:', error);
      } finally {
        setLoading(false);
      }
    };

    getInitialSession();

    // Listen for auth changes
    // Note: In a real app, you'd set up Supabase auth listener here
    // const { data: { subscription } } = supabase.auth.onAuthStateChange(
    //   async (event, session) => {
    //     setUser(session?.user ?? null);
    //     setLoading(false);
    //   }
    // );

    // return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      const { data, error } = await supabaseApi.signIn(email, password);
      
      if (error) {
        return { error: error.message };
      }

      setUser(data.user);
      return {};
    } catch (error) {
      return { error: 'An unexpected error occurred' };
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      setLoading(true);
      const { data, error } = await supabaseApi.signUp(email, password);
      
      if (error) {
        return { error: error.message };
      }

      // Note: With email confirmation, user might be null initially
      setUser(data.user);
      return {};
    } catch (error) {
      return { error: 'An unexpected error occurred' };
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      await supabaseApi.signOut();
      setUser(null);
    } catch (error) {
      console.error('Error signing out:', error);
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    loading,
    signIn,
    signUp,
    signOut,
    isAuthenticated: !!user,
  };
};

// Mock auth for development (when Supabase auth is not set up)
export const useMockAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock successful login
    const mockUser: Partial<User> = {
      id: '1',
      email,
      created_at: new Date().toISOString(),
      app_metadata: {},
      user_metadata: {},
      aud: 'authenticated',
    };
    
    setUser(mockUser as User);
    setLoading(false);
    
    return {};
  };

  const signUp = async (email: string, password: string) => {
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock successful signup
    const mockUser: Partial<User> = {
      id: '1',
      email,
      created_at: new Date().toISOString(),
      app_metadata: {},
      user_metadata: {},
      aud: 'authenticated',
    };
    
    setUser(mockUser as User);
    setLoading(false);
    
    return {};
  };

  const signOut = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    setUser(null);
    setLoading(false);
  };

  return {
    user,
    loading,
    signIn,
    signUp,
    signOut,
    isAuthenticated: !!user,
  };
};