import { useState } from 'react';
import { toast } from 'sonner';

interface UserPlan {
  id: string;
  user_id: string;
  plan_type: 'starter' | 'professional' | 'max';
  videos_remaining: number;
  videos_used: number;
  is_active: boolean;
  expires_at: string | null;
  created_at: string;
  updated_at: string;
}

const mockUserPlan: UserPlan = {
  id: 'plan_1',
  user_id: 'user_1',
  plan_type: 'professional',
  videos_remaining: 7,
  videos_used: 3,
  is_active: true,
  expires_at: null,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

export const useUserPlan = () => {
  const [userPlan, setUserPlan] = useState<UserPlan | null>(mockUserPlan);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUserPlan = async () => {
    setLoading(true);
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    setLoading(false);
  };

  const updatePlan = async (updates: Partial<UserPlan>) => {
    try {
      if (!userPlan) return null;
      
      const updatedPlan = { ...userPlan, ...updates };
      setUserPlan(updatedPlan);
      return updatedPlan;
    } catch (err) {
      toast.error('Failed to update plan');
      return null;
    }
  };

  const useVideo = async () => {
    if (!userPlan) return false;

    if (userPlan.videos_remaining <= 0) {
      toast.error('No videos remaining. Please upgrade your plan.');
      return false;
    }

    try {
      const updates = {
        videos_remaining: userPlan.videos_remaining - 1,
        videos_used: userPlan.videos_used + 1,
      };

      await updatePlan(updates);
      return true;
    } catch (err) {
      toast.error('Failed to update video count');
      return false;
    }
  };

  const canCreateVideo = () => {
    if (!userPlan) return false;
    return userPlan.videos_remaining > 0;
  };

  const getVideosRemaining = () => {
    if (!userPlan) return 0;
    return userPlan.videos_remaining;
  };

  const isProfessional = () => {
    return userPlan?.plan_type === 'professional';
  };

  return {
    userPlan,
    loading,
    error,
    fetchUserPlan,
    updatePlan,
    useVideo,
    canCreateVideo,
    getVideosRemaining,
    isProfessional,
  };
};