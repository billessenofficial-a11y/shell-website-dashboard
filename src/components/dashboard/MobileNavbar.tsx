import React from 'react';
import { Home, User, Video } from 'lucide-react';

type Tab = 'home' | 'profile' | 'avatar-iv';

interface MobileNavbarProps {
  currentTab: Tab;
  onTabChange: (tab: Tab) => void;
}

export const MobileNavbar: React.FC<MobileNavbarProps> = ({ currentTab, onTabChange }) => {
  const navItems = [
    { icon: Home, label: 'Home', tab: 'home' as Tab },
    { icon: Video, label: 'Avatar IV', tab: 'avatar-iv' as Tab },
    { icon: User, label: 'Profile', tab: 'profile' as Tab },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <nav className="flex justify-around p-2">
        {navItems.map(({ icon: Icon, label, tab }) => (
          <button
            key={tab}
            onClick={() => onTabChange(tab)}
            className={`flex flex-col items-center gap-1.5 p-3 rounded-xl transition-all duration-300 ${
              currentTab === tab
                ? 'text-brand-600 bg-brand-50'
                : 'text-gray-500 hover:bg-gray-50'
            }`}
          >
            <Icon className="w-5 h-5" />
            <span className="text-xs font-medium">{label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};