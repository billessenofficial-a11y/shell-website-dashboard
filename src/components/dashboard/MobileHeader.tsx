import React from 'react';
import { Menu, X, LogOut } from 'lucide-react';

interface MobileHeaderProps {
  onMenuClick: () => void;
  onSignOut: () => void;
  isMenuOpen: boolean;
}

export const MobileHeader: React.FC<MobileHeaderProps> = ({ onMenuClick, onSignOut, isMenuOpen }) => {
  return (
    <>
      <div className="md:hidden flex items-center justify-between p-4 bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-brand-100 flex items-center justify-center">
            <img src="/logo.png" alt="Avilta Logo" className="w-6 h-6" />
          </div>
          <span className="text-xl font-semibold text-gray-900">avilta</span>
        </div>
        <button
          onClick={onMenuClick}
          className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
        >
          {isMenuOpen ? (
            <X className="w-6 h-6 text-gray-600" />
          ) : (
            <Menu className="w-6 h-6 text-gray-600" />
          )}
        </button>
      </div>
      
      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-200 shadow-lg z-40">
          <div className="p-4">
            <button
              onClick={() => {
                onSignOut();
                onMenuClick(); // Close menu after sign out
              }}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-all duration-300 font-medium"
            >
              <LogOut className="w-5 h-5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
};