import React, { createContext, useContext, useState } from 'react';
import { toast } from 'sonner';

interface User {
  id: string;
  email: string;
  user_metadata: {
    full_name?: string;
    avatar_url?: string;
  };
}

interface Session {
  user: User;
  access_token: string;
}

interface AuthError {
  message: string;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string, fullName?: string) => Promise<{ error: AuthError | null }>;
  signIn: (email: string, password: string) => Promise<{ error: AuthError | null }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error: AuthError | null }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(false);

  const signUp = async (email: string, password: string, fullName?: string) => {
    setLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    try {
      // Create mock user
      const mockUser: User = {
        id: `user_${Date.now()}`,
        email,
        user_metadata: {
          full_name: fullName,
        },
      };

      const mockSession: Session = {
        user: mockUser,
        access_token: 'mock_token',
      };

      setUser(mockUser);
      setSession(mockSession);
      
      toast.success('Account created successfully!');
      return { error: null };
    } catch (error) {
      const authError = { message: 'Failed to create account' };
      toast.error(authError.message);
      return { error: authError };
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    try {
      // Create mock user
      const mockUser: User = {
        id: `user_${Date.now()}`,
        email,
        user_metadata: {
          full_name: email.split('@')[0],
        },
      };

      const mockSession: Session = {
        user: mockUser,
        access_token: 'mock_token',
      };

      setUser(mockUser);
      setSession(mockSession);
      
      return { error: null };
    } catch (error) {
      const authError = { message: 'Invalid email or password' };
      toast.error(authError.message);
      return { error: authError };
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setUser(null);
      setSession(null);
    } catch (error) {
      toast.error('Error signing out');
    }
  };

  const resetPassword = async (email: string) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    try {
      toast.success('Password reset email sent!');
      return { error: null };
    } catch (error) {
      const authError = { message: 'Failed to send reset email' };
      toast.error(authError.message);
      return { error: authError };
    }
  };

  const value = {
    user,
    session,
    loading,
    signUp,
    signIn,
    signOut,
    resetPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};