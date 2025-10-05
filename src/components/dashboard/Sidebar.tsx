import React from 'react';
import { Home, User, LogOut, Video as VideoIcon } from 'lucide-react';

type Tab = 'home' | 'profile' | 'avatar-iv';

interface SidebarProps {
  currentTab: Tab;
  onTabChange: (tab: Tab) => void;
  onSignOut: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentTab, onTabChange, onSignOut }) => {
  const mainNavItems = [
    { icon: Home, label: 'Home', tab: 'home' as Tab },
    { icon: VideoIcon, label: 'Avatar IV', tab: 'avatar-iv' as Tab },
  ];

  return (
    <aside className="hidden md:block w-72 fixed top-0 bottom-0 left-0 bg-white border-r border-gray-200">
      <div className="p-6 h-full flex flex-col">
        <div className="flex items-center gap-3 mb-12">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center">
            <VideoIcon className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-semibold text-gray-900">avilta</span>
        </div>

        <nav className="space-y-2 flex-1">
          {mainNavItems.map(({ icon: Icon, label, tab }) => (
            <button
              key={tab}
              onClick={() => onTabChange(tab)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 font-medium ${
                currentTab === tab 
                  ? 'bg-brand-50 text-brand-600 border border-brand-200' 
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{label}</span>
            </button>
          ))}
        </nav>

        <div className="space-y-2 pt-4 border-t border-gray-200">
          <button
            onClick={() => onTabChange('profile')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 font-medium ${
              currentTab === 'profile'
                ? 'bg-brand-50 text-brand-600 border border-brand-200'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
            }`}
          >
            <User className="w-5 h-5" />
            <span>Profile</span>
          </button>
          <button
            onClick={onSignOut}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-all duration-300 font-medium"
          >
            <LogOut className="w-5 h-5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </aside>
  );
};