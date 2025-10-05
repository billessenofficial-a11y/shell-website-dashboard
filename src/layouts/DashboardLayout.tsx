import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { useAuth } from '../contexts/AuthContext';
import { useUserPlan } from '../hooks/useUserPlan';
import { UpgradeModal } from '../components/UpgradeModal';
import { MobileHeader } from '../components/dashboard/MobileHeader';
import { Sidebar } from '../components/dashboard/Sidebar';
import { MobileNavbar } from '../components/dashboard/MobileNavbar';
import { DashboardHome } from '../components/dashboard/DashboardHome';
import { DashboardProfile } from '../components/dashboard/DashboardProfile';
import { DashboardAvatarIV } from '../components/dashboard/DashboardAvatarIV';
import { VideoDetailPage } from '../components/VideoDetailPage';

interface VideoItem {
  video_id: string;
  video_name: string;
  status: 'queued' | 'generating' | 'ready' | 'deleted' | 'error';
  created_at: string;
  updated_at?: string;
}

type Tab = 'home' | 'profile' | 'avatar-iv' | 'video-detail';

export const DashboardLayout: React.FC = () => {
  const { user, signOut } = useAuth();
  const {
    userPlan,
    canCreateVideo,
    getVideosRemaining
  } = useUserPlan();

  const [currentTab, setCurrentTab] = useState<Tab>('home');
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);
  const [upgradeModalOpen, setUpgradeModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);


  const handleStartCreating = () => {
    toast.info('Video creation is currently unavailable');
  };

  const handleVideoClick = (video: any) => {
    if (video.status === 'ready') {
      const videoItem: VideoItem = {
        video_id: video.video_id,
        video_name: video.video_name,
        status: video.status,
        created_at: video.created_at,
        updated_at: video.updated_at
      };

      setSelectedVideo(videoItem);
      setCurrentTab('video-detail');
    } else if (video.status === 'generating' || video.status === 'queued') {
      toast.info('Video is still generating. Please wait for it to complete.');
    } else if (video.status === 'error') {
      toast.error('This video failed to generate. Please try creating a new one.');
    } else {
      toast.info('Video is not ready for viewing yet.');
    }
  };

  const handleSelectPlan = (planName: string) => {
    // In a real app, this would integrate with a payment processor
    toast.success(`Redirecting to checkout for ${planName} plan...`);
    setUpgradeModalOpen(false);
  };

  const handleMenuClick = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const renderContent = () => {
    switch (currentTab) {
      case 'home':
        return (
          <DashboardHome
            user={user}
            videos={[]}
            videosLoading={false}
            userPlan={userPlan}
            canCreateVideo={canCreateVideo}
            getVideosRemaining={getVideosRemaining}
            onStartCreating={handleStartCreating}
            onVideoClick={handleVideoClick}
            onViewAllProjects={() => toast.info('Projects view coming soon')}
          />
        );
      case 'profile':
        return (
          <DashboardProfile
            user={user}
            userPlan={userPlan}
            getVideosRemaining={getVideosRemaining}
            onUpgradePlan={() => setUpgradeModalOpen(true)}
          />
        );
      case 'avatar-iv':
        return <DashboardAvatarIV />;
      case 'video-detail':
        return selectedVideo ? (
          <VideoDetailPage
            video={selectedVideo}
            onBack={() => setCurrentTab('home')}
          />
        ) : null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <MobileHeader 
        onMenuClick={handleMenuClick} 
        onSignOut={signOut}
        isMenuOpen={isMobileMenuOpen}
      />

      {/* Sidebar */}
      <Sidebar
        currentTab={currentTab}
        onTabChange={setCurrentTab}
        onSignOut={signOut}
      />

      {/* Mobile Navigation */}
      <MobileNavbar
        currentTab={currentTab}
        onTabChange={setCurrentTab}
      />

      {/* Main Content */}
      <main className="md:pl-72 min-h-screen">
        <div className="max-w-7xl mx-auto p-6 md:p-8 pb-24 md:pb-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Upgrade Modal */}
      <UpgradeModal
        isOpen={upgradeModalOpen}
        onClose={() => setUpgradeModalOpen(false)}
        onSelectPlan={handleSelectPlan}
      />
    </div>
  );
};