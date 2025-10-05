import React from 'react';
import { User, Camera, Mail, Edit3, CreditCard } from 'lucide-react';
import { getPlanIcon, getPlanColor } from '../../utils/dashboardUtils';

interface SupabaseUser {
  id: string;
  email: string;
  user_metadata: {
    full_name?: string;
    avatar_url?: string;
  };
}

interface UserPlan {
  plan_type: 'starter' | 'professional' | 'max';
  videos_used: number;
}

interface DashboardProfileProps {
  user: SupabaseUser | null;
  userPlan: UserPlan | null;
  getVideosRemaining: () => number;
  onUpgradePlan: () => void;
}

export const DashboardProfile: React.FC<DashboardProfileProps> = ({
  user,
  userPlan,
  getVideosRemaining,
  onUpgradePlan
}) => {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-900 mb-8">Profile Settings</h2>
        
        {/* Profile Picture Section */}
        <div className="flex items-center gap-6 mb-8 pb-8 border-b border-gray-200">
          <div className="relative">
            <div className="w-20 h-20 bg-brand-100 rounded-full flex items-center justify-center">
              {user?.user_metadata?.avatar_url ? (
                <img 
                  src={user.user_metadata.avatar_url} 
                  alt="Profile" 
                  className="w-20 h-20 rounded-full object-cover"
                />
              ) : (
                <User className="w-8 h-8 text-brand-600" />
              )}
            </div>
            <button className="absolute -bottom-1 -right-1 w-8 h-8 bg-brand-500 hover:bg-brand-600 rounded-full flex items-center justify-center text-white transition-colors">
              <Camera className="w-4 h-4" />
            </button>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              {user?.user_metadata?.full_name || 'User'}
            </h3>
            <p className="text-gray-600 mb-3">{user?.email}</p>
            <button className="text-brand-600 hover:text-brand-700 font-medium text-sm flex items-center gap-2">
              <Edit3 className="w-4 h-4" />
              Change profile picture
            </button>
          </div>
        </div>

        {/* Account Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
            <input
              type="text"
              value={user?.user_metadata?.full_name || ''}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
              placeholder="Enter your full name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <div className="relative">
              <input
                type="email"
                value={user?.email || ''}
                disabled
                className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-500"
              />
              <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Plan Information */}
        <div className="bg-gray-50 rounded-xl p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Plan</h3>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 bg-gradient-to-r ${getPlanColor(userPlan?.plan_type || 'professional')} rounded-xl flex items-center justify-center`}>
                {getPlanIcon(userPlan?.plan_type || 'professional')}
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 capitalize">
                  {userPlan?.plan_type || 'Professional'} Plan
                </h4>
                <p className="text-gray-600 text-sm">
                  {getVideosRemaining()} videos remaining this month
                </p>
              </div>
            </div>
            <button
              onClick={onUpgradePlan}
              className="px-4 py-2 bg-brand-500 hover:bg-brand-600 text-white rounded-lg font-medium transition-colors"
            >
              Manage Plan
            </button>
          </div>
        </div>

        {/* Billing Section */}
        <div className="bg-gray-50 rounded-xl p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Billing & Usage</h3>
            <CreditCard className="w-5 h-5 text-gray-400" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-white rounded-lg">
              <div className="text-2xl font-bold text-brand-600 mb-1">{userPlan?.videos_used || 0}</div>
              <div className="text-sm text-gray-600">Videos Used</div>
            </div>
            <div className="text-center p-4 bg-white rounded-lg">
              <div className="text-2xl font-bold text-green-600 mb-1">{getVideosRemaining()}</div>
              <div className="text-sm text-gray-600">Videos Left</div>
            </div>
            <div className="text-center p-4 bg-white rounded-lg">
              <div className="text-2xl font-bold text-gray-900 mb-1">10</div>
              <div className="text-sm text-gray-600">Monthly Limit</div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button className="flex-1 px-6 py-3 bg-brand-500 hover:bg-brand-600 text-white rounded-xl font-medium transition-colors">
            Save Changes
          </button>
          <button className="flex-1 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-medium transition-colors">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};