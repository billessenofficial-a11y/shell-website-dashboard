import React, { useRef, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Sparkles, Video, Music, Type, Play, Mic, Settings } from 'lucide-react';

export const Features = () => {
  const dashboardRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!dashboardRef.current) return;
      
      const { left, top, width, height } = dashboardRef.current.getBoundingClientRect();
      const x = (e.clientX - left) / width - 0.5;
      const y = (e.clientY - top) / height - 0.5;
      
      dashboardRef.current.style.transform = `
        perspective(1000px)
        rotateY(${x * 5}deg)
        rotateX(${-y * 5}deg)
      `;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [prefersReducedMotion]);

  const features = [
    {
      icon: <Sparkles className="w-6 h-6 text-white" />,
      bgColor: "bg-gradient-to-br from-cyan-500 to-blue-600",
      shadowColor: "cyan-500",
      title: "AI Script Generation",
      description: "Transform your ideas into professional scripts with our advanced AI writing assistant."
    },
    {
      icon: <Video className="w-6 h-6 text-white" />,
      bgColor: "bg-gradient-to-br from-emerald-500 to-teal-600",
      shadowColor: "emerald-500",
      title: "Diverse AI Creators",
      description: "Choose from a wide range of AI presenters across different ages, genders, and ethnicities."
    },
    {
      icon: <Type className="w-6 h-6 text-white" />,
      bgColor: "bg-gradient-to-br from-violet-500 to-purple-600",
      shadowColor: "violet-500",
      title: "Auto Animated Captions",
      description: "Generate dynamic, customizable captions with various templates and animations."
    },
    {
      icon: <Music className="w-6 h-6 text-white" />,
      bgColor: "bg-gradient-to-br from-amber-500 to-orange-600",
      shadowColor: "amber-500",
      title: "Curated Soundscapes",
      description: "Elevate your content with our handpicked collection of premium soundtracks."
    }
  ];

  const motionProps = prefersReducedMotion ? {} : {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true }
  };

  return (
    <section id="features" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-brand-950/40 via-black to-black"></div>
      
      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            className="text-4xl md:text-5xl font-sans font-semibold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent mb-6"
            {...motionProps}
            transition={{ duration: 0.8 }}
          >
            Everything you need to create amazing videos
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-400 font-sans"
            {...motionProps}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Our AI-powered platform handles every aspect of video creation, from scripting to final export.
          </motion.p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 items-center max-w-7xl mx-auto">
          {/* Dashboard Preview */}
          <motion.div
            ref={dashboardRef}
            className="lg:w-5/12 bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 overflow-hidden transition-transform duration-200 ease-out"
            {...motionProps}
            transition={{ duration: 0.8 }}
          >
            <div className="p-4">
              <div className="grid grid-cols-12 gap-3">
                {/* Script Generation Panel */}
                <div className="col-span-4 bg-white/5 rounded-xl p-2 border border-white/10">
                  <div className="flex items-center mb-2">
                    <Type className="w-4 h-4 text-brand-400 mr-1" />
                    <h3 className="text-white font-sans font-medium text-xs">Script</h3>
                  </div>
                  <div className="space-y-2">
                    <div className="h-16 bg-black/20 rounded-lg p-2 border border-white/5">
                      <p className="text-xs text-gray-400 font-sans">Generate a script...</p>
                    </div>
                    <div className="flex gap-1">
                      <button className="px-2 py-0.5 bg-brand-500/20 rounded-full text-xs text-brand-300 border border-brand-500/20 font-sans">Tech</button>
                      <button className="px-2 py-0.5 bg-brand-500/20 rounded-full text-xs text-brand-300 border border-brand-500/20 font-sans">Biz</button>
                    </div>
                  </div>
                </div>

                {/* Avatar Selection */}
                <div className="col-span-4 bg-white/5 rounded-xl p-2 border border-white/10">
                  <div className="flex items-center mb-2">
                    <Video className="w-4 h-4 text-brand-400 mr-1" />
                    <h3 className="text-white font-sans font-medium text-xs">Creator</h3>
                  </div>
                  <div className="grid grid-cols-3 gap-1">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                      <div key={i} className="aspect-square bg-black/20 rounded-lg border border-white/5 hover:border-brand-500/50 transition-colors cursor-pointer" />
                    ))}
                  </div>
                </div>

                {/* Controls Panel */}
                <div className="col-span-4 bg-white/5 rounded-xl p-2 border border-white/10">
                  <div className="flex items-center mb-2">
                    <Settings className="w-4 h-4 text-brand-400 mr-1" />
                    <h3 className="text-white font-sans font-medium text-xs">Controls</h3>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between p-1.5 bg-black/20 rounded-lg border border-white/5">
                      <span className="text-xs text-gray-400 font-sans">Voice</span>
                      <Mic className="w-3 h-3 text-brand-400" />
                    </div>
                    <div className="flex items-center justify-between p-1.5 bg-black/20 rounded-lg border border-white/5">
                      <span className="text-xs text-gray-400 font-sans">Music</span>
                      <Music className="w-3 h-3 text-brand-400" />
                    </div>
                  </div>
                </div>

                {/* Preview Panel */}
                <div className="col-span-12 bg-white/5 rounded-xl p-2 mt-2 border border-white/10">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <Play className="w-4 h-4 text-brand-400 mr-1" />
                      <h3 className="text-white font-sans font-medium text-xs">Preview</h3>
                    </div>
                    <button className="px-2 py-1 bg-brand-500 hover:bg-brand-600 rounded-full text-xs text-white font-sans font-medium shadow-lg shadow-brand-500/25 transition-all duration-300 transform hover:scale-105">
                      Generate
                    </button>
                  </div>
                  <div className="aspect-video bg-black/20 rounded-lg border border-white/5 flex items-center justify-center">
                    <Play className="w-6 h-6 text-brand-400 opacity-50" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Feature Cards */}
          <div className="lg:w-7/12 grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="relative bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-2xl hover:bg-white/10 transition-all duration-300 transform hover:scale-105 hover:shadow-xl group"
                {...motionProps}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="relative p-4 rounded-2xl inline-block mb-6 transition-all duration-500 group-hover:scale-110">
                  {/* Main gradient background */}
                  <div className={`absolute inset-0 ${feature.bgColor} rounded-2xl transition-all duration-500 group-hover:shadow-2xl`}></div>
                  
                  {/* Outer glow effect - enhanced */}
                  <div className={`absolute -inset-2 ${feature.bgColor} rounded-2xl blur-xl opacity-30 group-hover:opacity-70 transition-all duration-500`}></div>
                  
                  {/* Glass morphism overlay - enhanced */}
                  <div className="absolute inset-0 bg-white/15 backdrop-blur-xl rounded-2xl border border-white/25 group-hover:border-white/50 transition-all duration-500"></div>
                  
                  {/* Inner highlight - enhanced */}
                  <div className="absolute inset-1 bg-gradient-to-br from-white/40 via-white/15 to-transparent rounded-xl"></div>
                  
                  {/* Shimmer effect - enhanced */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 transform -skew-x-12"></div>
                  
                  {/* Additional premium glow */}
                  <div className={`absolute inset-0 ${feature.bgColor} rounded-2xl opacity-0 group-hover:opacity-20 blur-2xl transition-all duration-500`}></div>
                  
                  {/* Icon container - enhanced */}
                  <div className="relative z-30 flex items-center justify-center">
                    <div className="transform group-hover:scale-110 transition-transform duration-300">
                      {feature.icon}
                    </div>
                  </div>
                </div>
                <h3 className="text-xl font-sans font-semibold text-white mb-3 group-hover:text-white transition-colors duration-300">{feature.title}</h3>
                <p className="text-gray-400 font-sans text-sm leading-relaxed group-hover:text-gray-300 transition-colors duration-300">{feature.description}</p>
                
                {/* Additional premium border effect */}
                <div className="absolute inset-0 rounded-2xl border border-white/5 group-hover:border-white/20 transition-all duration-500"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}