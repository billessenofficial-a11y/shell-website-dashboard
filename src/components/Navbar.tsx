import React, { useState, useEffect } from 'react';
import { Menu, X, Video } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (location.pathname === '/dashboard') return null;

  const handleGetStarted = () => {
    if (user) {
      navigate('/dashboard');
    } else {
      // Show auth modal for login
      window.dispatchEvent(new CustomEvent('showAuthModal', { detail: { mode: 'signin' } }));
    }
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-black/80 backdrop-blur-xl py-4' : 'bg-transparent py-6'
    }`}>
      <div className="container mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <a href="#" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center">
              <Video className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-sans font-bold text-white">
              avilta
            </span>
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-300 hover:text-white transition-colors duration-200 font-sans">
              Features
            </a>
            <a href="#pricing" className="text-gray-300 hover:text-white transition-colors duration-200 font-sans">
              Pricing
            </a>
            <a href="#about" className="text-gray-300 hover:text-white transition-colors duration-200 font-sans">
              About
            </a>
            {user ? (
              <button 
                onClick={() => navigate('/dashboard')}
                className="btn-premium px-6 py-2.5 rounded-full font-sans font-semibold text-white"
              >
                Dashboard
              </button>
            ) : (
              <button 
                onClick={handleGetStarted}
                className="btn-premium px-6 py-2.5 rounded-full font-sans font-semibold text-white"
              >
                Get Started
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-xl border-t border-white/10">
            <div className="flex flex-col space-y-4 p-6">
              <a 
                href="#features" 
                className="text-gray-300 hover:text-white transition-colors duration-200 font-sans"
                onClick={() => setMobileMenuOpen(false)}
              >
                Features
              </a>
              <a 
                href="#pricing" 
                className="text-gray-300 hover:text-white transition-colors duration-200 font-sans"
                onClick={() => setMobileMenuOpen(false)}
              >
                Pricing
              </a>
              <a 
                href="#about" 
                className="text-gray-300 hover:text-white transition-colors duration-200 font-sans"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </a>
              {user ? (
                <button 
                  onClick={() => {
                    navigate('/dashboard');
                    setMobileMenuOpen(false);
                  }}
                  className="btn-premium w-full px-6 py-2.5 rounded-full font-sans font-semibold text-white"
                >
                  Dashboard
                </button>
              ) : (
                <button 
                  onClick={() => {
                    handleGetStarted();
                    setMobileMenuOpen(false);
                  }}
                  className="btn-premium w-full px-6 py-2.5 rounded-full font-sans font-semibold text-white"
                >
                  Get Started
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};