import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Video, Plus, ArrowRight, Play, BarChart3, Sparkles, Star, Rocket, Zap, Wand2 } from 'lucide-react';
import { getPlanIcon, getPlanColor, getStatusIcon, getStatusText } from '../../utils/dashboardUtils';

interface User {
  id: string;
  email: string;
  user_metadata: {
    full_name?: string;
    avatar_url?: string;
  };
}

interface UserPlan {
  plan_type: 'starter' | 'professional' | 'max';
  videos_remaining: number;
  videos_used: number;
}

interface VideoItem {
  id: string;
  video_name: string;
  status: string;
  created_at: string;
}

interface DashboardHomeProps {
  user: User | null;
  videos: VideoItem[];
  videosLoading: boolean;
  userPlan: UserPlan | null;
  canCreateVideo: () => boolean;
  getVideosRemaining: () => number;
  onStartCreating: () => void;
  onVideoClick: (video: VideoItem) => void;
  onViewAllProjects: () => void;
}

export const DashboardHome: React.FC<DashboardHomeProps> = ({
  user,
  videos,
  videosLoading,
  userPlan,
  canCreateVideo,
  getVideosRemaining,
  onStartCreating,
  onVideoClick,
  onViewAllProjects
}) => {
  const [welcomeSubtitle, setWelcomeSubtitle] = useState('');

  const welcomeSubtitles = [
    "Ready to create something amazing?",
    "Let's make your next viral video!",
    "Time to bring your ideas to life",
    "Your creative journey starts here",
    "What story will you tell today?",
    "Transform your ideas into reality"
  ];

  useEffect(() => {
    const randomSubtitle = welcomeSubtitles[Math.floor(Math.random() * welcomeSubtitles.length)];
    setWelcomeSubtitle(randomSubtitle);
  }, []);

  return (
    <div className="space-y-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <h1 className="text-3xl font-semibold text-gray-900 mb-2">
          Welcome back, {user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Creator'} 👋
        </h1>
        <p className="text-lg text-gray-600">{welcomeSubtitle}</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Create New Video Card */}
        <motion.div
          whileHover={{ scale: 1.01 }}
          className="relative rounded-2xl p-8 text-white shadow-2xl transition-all duration-500 hover:shadow-brand-500/25 overflow-hidden group order-1 lg:order-2"
        >
          {/* Main gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-brand-500 via-brand-600 to-brand-700 rounded-2xl"></div>
          
          {/* Glass morphism overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-white/5 to-transparent rounded-2xl backdrop-blur-sm border border-white/20 group-hover:border-white/30 transition-all duration-500"></div>
          
          {/* Animated Background Elements */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-6 right-6 animate-pulse" style={{ animationDuration: '3s' }}>
              <Sparkles className="w-6 h-6 text-white/70" />
            </div>
            <div className="absolute top-12 left-8 animate-bounce" style={{ animationDelay: '0.5s', animationDuration: '4s' }}>
              <Star className="w-4 h-4 text-white/60" />
            </div>
            <div className="absolute bottom-8 right-10 animate-pulse" style={{ animationDelay: '1s', animationDuration: '2.5s' }}>
              <Zap className="w-5 h-5 text-white/60" />
            </div>
            
            {/* Gradient orbs */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full blur-2xl animate-pulse" style={{ animationDuration: '6s' }}></div>
            <div className="absolute bottom-0 left-0 w-20 h-20 bg-white/3 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1.5s', animationDuration: '5s' }}></div>
          </div>

          <div className="relative z-10 flex flex-col h-full justify-between min-h-[200px]">
            {/* Header */}
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="relative">
                  <div className="w-16 h-16 bg-white/15 rounded-2xl flex items-center justify-center backdrop-blur-md border border-white/25 group-hover:bg-white/20 group-hover:border-white/35 transition-all duration-300 shadow-lg">
                    <Video className="w-8 h-8 text-white" />
                  </div>
                  <div className="absolute inset-0 bg-white/10 rounded-2xl blur-lg opacity-0 group-hover:opacity-40 transition-opacity duration-300"></div>
                </div>
                <div>
                  <h2 className="text-2xl font-semibold mb-1">Create New Video</h2>
                  <p className="text-white/90 text-base">Transform your ideas into professional videos. Fully edited with our AI.</p>
                </div>
              </div>
            </div>
            
            {/* CTA Button */}
            <motion.button
              onClick={onStartCreating}
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
              disabled={!canCreateVideo()}
              className={`relative bg-white/15 backdrop-blur-md text-white px-8 py-4 rounded-xl font-semibold inline-flex items-center gap-3 w-fit transition-all duration-300 border border-white/25 hover:border-white/40 hover:bg-white/20 group/btn ${
                !canCreateVideo() ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-2xl hover:shadow-white/10'
              }`}
            >
              <div className="absolute inset-0 bg-white/5 rounded-xl blur-lg opacity-0 group-hover/btn:opacity-60 transition-opacity duration-300"></div>
              
              <div className="relative z-10 flex items-center gap-3">
                <div className="w-6 h-6 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                  <Wand2 className="w-4 h-4" />
                </div>
                <span className="text-lg font-medium">{canCreateVideo() ? 'Start Creating' : 'Upgrade to Create'}</span>
                <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform duration-300" />
              </div>
            </motion.button>
          </div>
        </motion.div>

        {/* Plan & Stats Card */}
        <motion.div 
          whileHover={{ scale: 1.01 }}
          className="bg-white rounded-2xl p-6 border border-gray-200 shadow-lg transition-all duration-300 hover:shadow-xl hover:border-brand-300 order-2 lg:order-1"
        >
          {/* Plan Header */}
          <div className="flex items-center gap-4 mb-6">
            <div className={`w-12 h-12 bg-gradient-to-r ${getPlanColor(userPlan?.plan_type || 'professional')} rounded-xl flex items-center justify-center shadow-lg`}>
              {getPlanIcon(userPlan?.plan_type || 'professional')}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 capitalize">
                {userPlan?.plan_type || 'Professional'} Plan
              </h3>
              <p className="text-sm text-gray-500">Your current subscription</p>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="text-center p-4 bg-gradient-to-br from-brand-50 to-brand-100 rounded-xl border border-brand-200">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Video className="w-5 h-5 text-brand-600" />
                <span className="text-2xl font-bold text-brand-600">{getVideosRemaining()}</span>
              </div>
              <p className="text-sm text-brand-700 font-medium">Videos Left</p>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200">
              <div className="flex items-center justify-center gap-2 mb-2">
                <BarChart3 className="w-5 h-5 text-gray-600" />
                <span className="text-2xl font-bold text-gray-900">{videos.length}</span>
              </div>
              <p className="text-sm text-gray-600 font-medium">Total Created</p>
            </div>
          </div>

          {/* Progress Section */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Videos Used This Month</span>
              <span className="text-sm font-bold text-brand-600">
                {userPlan?.videos_used || 0}/10
              </span>
            </div>
            
            <div className="relative h-3 bg-gray-200 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(((userPlan?.videos_used || 0) / 10) * 100, 100)}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-brand-400 to-brand-600 rounded-full relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
              </motion.div>
            </div>
          </div>
          
          {getVideosRemaining() === 0 && (
            <button className="w-full mt-4 py-3 px-4 bg-brand-500 hover:bg-brand-600 text-white rounded-xl font-medium transition-colors">
              Upgrade Plan
            </button>
          )}
        </motion.div>
      </div>

      {/* Recent Projects Section */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-900">Recent Projects</h3>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onViewAllProjects}
            className="text-brand-600 hover:text-brand-700 transition-colors duration-300 flex items-center gap-2 font-medium"
          >
            See all projects
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </div>
        
        {videosLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-4 border border-gray-200 animate-pulse">
                <div className="aspect-video bg-gray-200 rounded-lg mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        ) : videos.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {videos.slice(0, 3).map((video) => (
              <motion.div 
                key={video.id}
                whileHover={{ scale: 1.02 }}
                onClick={() => onVideoClick(video)}
                className="group bg-gray-50 rounded-xl p-4 border border-gray-200 hover:border-brand-300 hover:shadow-lg transition-all duration-300 cursor-pointer"
              >
                <div className="aspect-video bg-gray-200 rounded-lg mb-4 flex items-center justify-center overflow-hidden relative">
                  {/* Video Thumbnail */}
                  {video.thumbnail_url && video.status === 'ready' ? (
                    <div className="relative w-full h-full">
                      {/* Blurred background */}
                      <img
                        src={video.thumbnail_url}
                        alt=""
                        className="absolute inset-0 w-full h-full object-cover blur-lg scale-110 opacity-60"
                      />
                      {/* Main image */}
                      <img
                        src={video.thumbnail_url}
                        alt={`${video.video_name} thumbnail`}
                        className="relative z-10 w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="absolute inset-0 z-20 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center"
                      >
                        <div className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-75 group-hover:scale-100 shadow-lg">
                          <Play className="w-4 h-4 text-gray-800 ml-0.5" />
                        </div>
                      </motion.div>
                      {video.caption_processing_status === 'processing' && (
                        <div className="absolute bottom-2 left-2 z-30 px-2 py-1 bg-brand-500 text-white text-xs font-medium rounded-full shadow-lg flex items-center gap-1">
                          <div className="w-2 h-2 border border-white/50 border-t-white rounded-full animate-spin"></div>
                          Adding captions
                        </div>
                      )}
                      {video.caption_processing_status === 'completed' && video.zapcap_hosted_url && (
                        <div className="absolute bottom-2 left-2 z-30 px-2 py-1 bg-purple-500 text-white text-xs font-medium rounded-full shadow-lg">
                          Captions ready
                        </div>
                      )}
                    </div>
                  ) : video.status === 'ready' && (video.stream_url || video.hosted_url) ? (
                    <div className="relative w-full h-full bg-gradient-to-br from-brand-100 to-brand-200 flex items-center justify-center">
                      <motion.div
                        whileHover={{ scale: 1.2 }}
                        className="absolute inset-0 bg-gradient-to-t from-black/20 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      />
                      <Play className="w-8 h-8 text-brand-600 group-hover:text-brand-700 transition-all duration-300 transform group-hover:scale-110" />
                    </div>
                  ) : video.status === 'generating' || video.status === 'queued' ? (
                    <div className="relative w-full h-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-6 h-6 border-2 border-blue-600/20 border-t-blue-600 rounded-full animate-spin mb-2" />
                        <p className="text-xs text-blue-700 font-medium">
                          {video.status === 'generating' ? 'Generating...' : 'Queued'}
                        </p>
                      </div>
                    </div>
                  ) : video.status === 'error' ? (
                    <div className="relative w-full h-full bg-gradient-to-br from-red-100 to-red-200 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center mb-2">
                          <span className="text-white text-xs font-bold">!</span>
                        </div>
                        <p className="text-xs text-red-700 font-medium">Error</p>
                      </div>
                    </div>
                  ) : (
                    <div className="relative w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-6 h-6 border-2 border-gray-400/20 border-t-gray-400 rounded-full animate-spin mb-2" />
                        <p className="text-xs text-gray-600 font-medium">Processing...</p>
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-gray-900 font-medium group-hover:text-brand-600 transition-colors duration-300 truncate">
                    {video.video_name}
                  </h4>
                  {getStatusIcon(video.status)}
                </div>
                <p className="text-sm text-gray-500">
                  {getStatusText(video.status)} • {new Date(video.created_at).toLocaleDateString()}
                </p>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Video className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 font-medium">No videos yet</p>
            <p className="text-gray-500 text-sm mb-6">Create your first video to get started</p>
            <button
              onClick={onStartCreating}
              disabled={!canCreateVideo()}
              className={`btn-premium px-6 py-3 rounded-xl font-medium text-white inline-flex items-center gap-2 ${
                !canCreateVideo() ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <Plus className="w-5 h-5" />
              {canCreateVideo() ? 'Create Video' : 'Upgrade to Create'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};