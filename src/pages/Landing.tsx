import React, { useState, useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { Workflow } from '../components/Workflow';
import { Features } from '../components/Features';
import { Testimonials } from '../components/Testimonials';
import { Pricing } from '../components/Pricing';
import { FAQ } from '../components/FAQ';
import { CTA } from '../components/CTA';
import { Footer } from '../components/Footer';
import { AuthModal } from '../components/AuthModal';

export const Landing = () => {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');

  useEffect(() => {
    const handleShowAuthModal = (event: CustomEvent) => {
      const mode = event.detail?.mode || 'signin';
      setAuthMode(mode);
      setAuthModalOpen(true);
    };


    window.addEventListener('showAuthModal', handleShowAuthModal as EventListener);
    
    return () => {
      window.removeEventListener('showAuthModal', handleShowAuthModal as EventListener);
    };
  }, []);

  // All "Get Started" buttons now redirect to waitlist except navbar
  const handleGetStarted = () => {
    window.location.href = 'https://www.fastwaitlist.com/avilta';
  };

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <Hero />
      <Workflow onGetStarted={handleGetStarted} />
      <Features />
      <Testimonials />
      <Pricing onGetStarted={handleGetStarted} />
      <FAQ />
      <CTA onGetStarted={handleGetStarted} />
      <Footer />
      
      <AuthModal 
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode={authMode}
      />
    </div>
  );
};