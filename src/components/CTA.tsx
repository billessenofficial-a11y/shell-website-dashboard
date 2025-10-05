import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

interface CTAProps {
  onGetStarted?: () => void;
}

export const CTA: React.FC<CTAProps> = ({ onGetStarted }) => {
  const prefersReducedMotion = useReducedMotion();
  
  const motionProps = prefersReducedMotion ? {} : {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true }
  };

  const handleGetStarted = () => {
    // Redirect to waitlist in same tab
    window.location.href = 'https://www.fastwaitlist.com/avilta';
  };

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-brand-950/40 via-black to-black"></div>
      
      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <motion.div 
          className="max-w-5xl mx-auto bg-gradient-to-b from-brand-500/20 to-brand-950/20 backdrop-blur-xl rounded-2xl border border-brand-500/50 overflow-hidden shadow-2xl"
          {...motionProps}
        >
          <div className="relative p-8 md:p-12">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-brand-500/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-brand-400/20 rounded-full blur-3xl"></div>
            
            <div className="relative z-10">
              <motion.div 
                className="flex items-center justify-center gap-2 mb-6"
                {...motionProps}
              >
                <Sparkles className="w-5 h-5 text-brand-400" />
                <span className="text-brand-400 font-sans">Limited Time Offer</span>
              </motion.div>

              <motion.h2 
                className="text-4xl md:text-5xl font-sans font-semibold text-white text-center mb-6"
                {...motionProps}
              >
                Start creating amazing videos today
              </motion.h2>
              <motion.p 
                className="text-xl text-gray-400 font-sans text-center mb-12"
                {...motionProps}
                transition={{ delay: 0.1 }}
              >
                Join thousands of creators who have already transformed their content with AI
              </motion.p>
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 justify-center"
                {...motionProps}
                transition={{ delay: 0.2 }}
              >
                <button 
                  onClick={handleGetStarted}
                  className="group inline-flex items-center justify-center px-8 py-4 text-lg font-sans font-semibold text-black bg-white rounded-xl hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-xl shadow-white/10"
                >
                  Get Started Free
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
                <button className="inline-flex items-center justify-center px-8 py-4 text-lg font-sans font-semibold text-white bg-brand-500/20 hover:bg-brand-500/30 rounded-xl transition-all duration-300 shadow-lg shadow-brand-500/5 border border-brand-500/50">
                  Schedule Demo
                </button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};