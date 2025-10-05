import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Type, Wand2, Download, Sparkles, ArrowRight } from 'lucide-react';

interface WorkflowProps {
  onGetStarted?: () => void;
}
export const Workflow: React.FC<WorkflowProps> = ({ onGetStarted }) => {
  const prefersReducedMotion = useReducedMotion();
  
  const motionProps = prefersReducedMotion ? {} : {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true }
  };

  const steps = [
    {
      number: "1",
      title: "Describe your idea",
      icon: Type,
      description: "Describe your content idea or let our AI help you brainstorm the perfect concept."
    },
    {
      number: "2",
      title: "Choose your style",
      icon: Wand2,
      description: "Select from our collection of professional templates and styles to match your brand."
    },
    {
      number: "3",
      title: "Generate and export",
      icon: Download,
      description: "Transform your idea into professional content and export in your preferred format."
    }
  ];

  const handleGetStarted = () => {
    // Redirect to waitlist in same tab
    window.location.href = 'https://www.fastwaitlist.com/avilta';
  };
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-brand-950/40 via-black to-black"></div>
      
      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            className="text-4xl md:text-5xl font-sans font-semibold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent mb-6"
            {...motionProps}
            transition={{ duration: 0.8 }}
          >
            Create in three simple steps
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-400 font-sans"
            {...motionProps}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            From concept to completion in minutes, not hours
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              {...motionProps}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="relative h-full group"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-brand-500/0 to-brand-500/0 group-hover:from-brand-500/10 group-hover:to-brand-500/5 transition-all duration-500 rounded-2xl"></div>
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 group-hover:border-brand-500/50 p-8 rounded-2xl h-full flex flex-col relative transition-all duration-500 group-hover:transform group-hover:scale-[1.02] group-hover:shadow-2xl group-hover:shadow-brand-500/10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative">
                    <div className="w-14 h-14 bg-brand-500/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                      <span className="text-2xl font-bold text-brand-400 font-sans">{step.number}</span>
                    </div>
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-brand-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <h3 className="text-2xl font-sans font-semibold text-white group-hover:text-brand-400 transition-colors duration-300">{step.title}</h3>
                </div>

                <div className="bg-white/5 group-hover:bg-white/10 rounded-xl p-6 mb-6 flex-grow transition-all duration-300 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-brand-500/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <step.icon className="w-8 h-8 text-brand-400" />
                    </div>
                    <p className="text-gray-400 text-sm">Step {step.number}</p>
                  </div>
                </div>

                <p className="text-gray-400 font-sans group-hover:text-gray-300 transition-colors duration-300">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <motion.button
            {...motionProps}
            transition={{ duration: 0.5, delay: 0.6 }}
            onClick={handleGetStarted}
            className="btn-premium group px-8 py-4 rounded-full font-sans font-semibold text-white inline-flex items-center gap-2"
          >
            Get Started
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </motion.button>
          <p className="text-gray-400 mt-4">
            From idea to finished content in minutes, not hours
          </p>
        </div>
      </div>
    </section>
  );
};