import React, { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ChevronRight, Play, ExternalLink, TrendingUp } from 'lucide-react';
import { ParticlesComponent } from './ParticlesComponent';

export const Hero = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [isScrolling, setIsScrolling] = useState(true);
  
  useEffect(() => {
    if (prefersReducedMotion) {
      setIsScrolling(false);
      return;
    }

    const scroll = () => {
      if (!scrollRef.current || !isScrolling) return;
      
      if (scrollRef.current.scrollLeft >= scrollRef.current.scrollWidth / 2) {
        scrollRef.current.scrollLeft = 0;
      } else {
        scrollRef.current.scrollLeft += 0.5;
      }
    };

    const intervalId = setInterval(scroll, 50);
    return () => clearInterval(intervalId);
  }, [prefersReducedMotion, isScrolling]);

  const portraits = [
    "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400",
    "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400",
    "https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=400",
    "https://images.pexels.com/photos/2613260/pexels-photo-2613260.jpeg?auto=compress&cs=tinysrgb&w=400",
    "https://images.pexels.com/photos/2726111/pexels-photo-2726111.jpeg?auto=compress&cs=tinysrgb&w=400",
    "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400",
    "https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=400",
    "https://images.pexels.com/photos/2269872/pexels-photo-2269872.jpeg?auto=compress&cs=tinysrgb&w=400",
    "https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg?auto=compress&cs=tinysrgb&w=400",
    "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400",
    "https://images.pexels.com/photos/1587009/pexels-photo-1587009.jpeg?auto=compress&cs=tinysrgb&w=400",
    "https://images.pexels.com/photos/1855582/pexels-photo-1855582.jpeg?auto=compress&cs=tinysrgb&w=400"
  ];

  const heroAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const handleStartCreating = () => {
    // Redirect to waitlist in same tab
    window.location.href = 'https://www.fastwaitlist.com/avilta';
  };

  const handleWatchDemo = () => {
    // Redirect to waitlist in same tab
    window.location.href = 'https://www.fastwaitlist.com/avilta';
  };

  return (
    <>
      <section className="relative min-h-screen pt-32 overflow-hidden bg-black">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-brand-600/40 via-brand-950/20 to-black"></div>
        <ParticlesComponent />
        
        <div className="relative z-10">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="text-center max-w-4xl mx-auto mb-16">
              <motion.div 
                className="inline-flex items-center px-4 py-2 bg-white/5 rounded-full backdrop-blur-sm border border-white/10 mb-8"
                variants={heroAnimation}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.6 }}
              >
                <TrendingUp className="w-4 h-4 text-brand-400 mr-2" />
                <span className="text-gray-300 text-sm font-sans">Built for Ecommerce, Apps, and Brands</span>
              </motion.div>
              
              <motion.h1 
                className="text-4xl sm:text-5xl md:text-7xl font-sans font-semibold bg-gradient-to-r from-white via-brand-200 to-brand-400 bg-clip-text text-transparent mb-6 leading-tight"
                variants={heroAnimation}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <span className="block mb-2">Instantly Create</span>
                <span className="block">Video Ads with AI</span>
              </motion.h1>
              
              <motion.p 
                className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-8 font-sans font-light"
                variants={heroAnimation}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Transform your ideas into professional videos in minutes with our
                AI-powered platform. No editing experience required.
              </motion.p>
              
              <motion.div
                className="flex flex-wrap justify-center gap-4 mb-16"
                variants={heroAnimation}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <button 
                  onClick={handleStartCreating}
                  className="group btn-premium px-8 py-4 rounded-full text-white font-sans font-semibold flex items-center"
                >
                  Start Creating Now
                  <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
                <button 
                  onClick={handleWatchDemo}
                  className="group px-8 py-4 bg-white/5 hover:bg-white/10 rounded-full text-white font-sans font-semibold border border-white/10 transition-all duration-300 flex items-center"
                >
                  <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-300" />
                  Join Waitlist
                </button>
              </motion.div>
            </div>
          </div>

          <motion.div 
            variants={heroAnimation}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.8, delay: 0.8 }}
            className="relative w-screen"
          >
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-10"></div>
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-10"></div>
            
            <div 
              ref={scrollRef}
              className="flex gap-4 overflow-x-hidden relative scroll-smooth px-16"
              onMouseEnter={() => setIsScrolling(false)}
              onMouseLeave={() => setIsScrolling(true)}
            >
              <div className="flex gap-4 min-w-max">
                {portraits.map((portrait, index) => (
                  <div key={index} className="relative group w-[200px]">
                    <div className="aspect-[9/16] bg-white/5 rounded-xl overflow-hidden border border-white/10 hover:border-brand-500/50 transition-all duration-300">
                      <img 
                        src={portrait}
                        alt="AI Creator"
                        loading="lazy"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300"></div>
                      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
                        <div className="h-4 w-24 bg-white/10 rounded-full"></div>
                        <div className="h-3 w-16 bg-white/10 rounded-full mt-2"></div>
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <Play className="w-8 h-8 text-white/80" />
                      </div>
                    </div>
                  </div>
                ))}
                {portraits.map((portrait, index) => (
                  <div key={`duplicate-${index}`} className="relative group w-[200px]">
                    <div className="aspect-[9/16] bg-white/5 rounded-xl overflow-hidden border border-white/10 hover:border-brand-500/50 transition-all duration-300">
                      <img 
                        src={portrait}
                        alt="AI Creator"
                        loading="lazy"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300"></div>
                      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
                        <div className="h-4 w-24 bg-white/10 rounded-full"></div>
                        <div className="h-3 w-16 bg-white/10 rounded-full mt-2"></div>
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <Play className="w-8 h-8 text-white/80" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};