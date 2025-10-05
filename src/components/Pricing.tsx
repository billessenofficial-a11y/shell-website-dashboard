import React, { useState } from 'react';
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion';
import { Check, Sparkles } from 'lucide-react';

interface PricingProps {
  onGetStarted?: () => void;
}

export const Pricing: React.FC<PricingProps> = ({ onGetStarted }) => {
  const [annual, setAnnual] = useState(true);
  const prefersReducedMotion = useReducedMotion();
  
  const plans = [
    {
      name: "Starter",
      description: "Best option if you are starting with ads",
      monthlyPrice: 47,
      annualPrice: 37,
      features: [
        "5 videos per month",
        "Realistic AI creators",
        "AI script generation",
        "30+ languages",
        "Background music library",
        "Automated captions + editing",
        "Export without watermark",
        "Email support"
      ],
      highlighted: false
    },
    {
      name: "Professional",
      description: "Testing many creatives a month",
      monthlyPrice: 67,
      annualPrice: 57,
      features: [
        "10 videos per month",
        "Realistic AI creators",
        "AI script generation",
        "30+ languages",
        "Background music library",
        "Automated captions + editing",
        "Export without watermark",
        "Priority support"
      ],
      highlighted: true,
      badge: "Most Popular"
    },
    {
      name: "Max",
      description: "Advertisers ready to scale their campaigns",
      monthlyPrice: 117,
      annualPrice: 97,
      features: [
        "20 videos per month",
        "Realistic AI creators",
        "AI script generation",
        "30+ languages",
        "Background music library",
        "Automated captions + editing",
        "Export without watermark",
        "Dedicated support"
      ],
      highlighted: false,
      isMax: true
    }
  ];

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
    <section id="pricing" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-brand-950/40 via-black to-black"></div>
      
      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            className="text-4xl md:text-5xl font-sans font-semibold text-white mb-6"
            {...motionProps}
          >
            Simple, transparent pricing
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-400 font-sans"
            {...motionProps}
            transition={{ delay: 0.1 }}
          >
            Choose the perfect plan for your video creation needs
          </motion.p>
          
          <motion.div 
            className="flex items-center justify-center space-x-4 mt-8"
            {...motionProps}
            transition={{ delay: 0.2 }}
          >
            <span className={`text-sm font-sans ${!annual ? 'text-white' : 'text-gray-400'}`}>Monthly</span>
            <button 
              onClick={() => setAnnual(!annual)}
              className="relative w-16 h-8 rounded-full transition-colors duration-300 focus:outline-none"
            >
              <div className={`absolute inset-0 rounded-full ${annual ? 'bg-brand-500' : 'bg-gray-600'} transition-colors duration-300`} />
              <div 
                className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-lg transform transition-transform duration-300 ${
                  annual ? 'translate-x-8' : 'translate-x-0'
                }`} 
              />
            </button>
            <span className={`text-sm font-sans ${annual ? 'text-white' : 'text-gray-400'}`}>Annual</span>
            {annual && (
              <motion.span 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-brand-400 text-sm font-sans bg-brand-500/20 px-2 py-1 rounded-full border border-brand-500/30"
              >
                Save up to $240/year
              </motion.span>
            )}
          </motion.div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div 
              key={index}
              {...motionProps}
              transition={{ delay: index * 0.1 }}
              className="relative"
            >
              <div 
                className={`group h-full rounded-2xl backdrop-blur-sm border transition-all duration-500 ${
                  plan.highlighted 
                    ? 'bg-gradient-to-b from-brand-500/20 to-brand-950/20 border-brand-500/50 hover:border-brand-400 transform scale-105' 
                    : plan.isMax
                      ? 'bg-gradient-to-b from-yellow-600/20 to-yellow-900/20 border-yellow-600/50 hover:border-yellow-500'
                    : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                }`}
              >
                {plan.badge && (
                  <div className="absolute -top-4 left-0 right-0 flex justify-center">
                    <div className="bg-brand-500 text-white text-sm font-sans px-4 py-1 rounded-full flex items-center gap-1 shadow-lg">
                      <Sparkles className="w-4 h-4" />
                      {plan.badge}
                    </div>
                  </div>
                )}
                
                <div className="p-8">
                  <h3 className={`text-2xl font-sans font-semibold mb-2 ${
                    plan.isMax ? 'text-white' : 'text-white'
                  }`}>{plan.name}</h3>
                  <p className="text-gray-400 font-sans mb-6 text-sm leading-relaxed">{plan.description}</p>
                  
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={annual ? 'annual' : 'monthly'}
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ duration: 0.3 }}
                      className="mb-8"
                    >
                      <div className="flex items-end gap-2">
                        <span className={`text-5xl font-sans font-bold ${
                          plan.isMax ? 'text-white' : 'text-white'
                        }`}>
                          ${annual ? plan.annualPrice : plan.monthlyPrice}
                        </span>
                        <span className="text-gray-400 font-sans mb-1">/ month</span>
                      </div>
                      {annual && (
                        <motion.div 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className={`mt-2 text-sm font-sans flex items-center gap-1 ${
                            plan.isMax ? 'text-yellow-400' : 'text-brand-400'
                          }`}
                        >
                          <Sparkles className="w-4 h-4" />
                          Save ${(plan.monthlyPrice - plan.annualPrice) * 12} annually
                        </motion.div>
                      )}
                    </motion.div>
                  </AnimatePresence>

                  <button 
                    onClick={handleGetStarted}
                    className={`w-full py-4 rounded-xl font-sans font-semibold text-white transition-all duration-300 transform hover:scale-105 ${
                      plan.highlighted 
                        ? 'btn-premium shadow-lg shadow-brand-500/25' 
                        : plan.isMax
                          ? 'bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-700 hover:to-yellow-800 shadow-lg shadow-yellow-600/25'
                        : 'bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/30'
                    }`}
                  >
                    Get started
                  </button>
                  
                  <p className="text-gray-400 font-sans mt-8 mb-4 text-sm">What's included:</p>
                  <ul className="space-y-4">
                    {plan.features.map((feature, i) => (
                      <motion.li 
                        key={i}
                        {...motionProps}
                        transition={{ delay: 0.1 + (i * 0.05) }}
                        className="flex items-start gap-3 text-gray-300 font-sans group"
                      >
                        <div className={`mt-1 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                          plan.highlighted ? 'bg-brand-500/20' 
                          : plan.isMax ? 'bg-yellow-600/20'
                          : 'bg-white/10'
                        }`}>
                          <Check className={`w-3 h-3 ${
                            plan.highlighted ? 'text-brand-400' 
                            : plan.isMax ? 'text-yellow-400'
                            : 'text-white'
                          }`} />
                        </div>
                        <span className="group-hover:text-white transition-colors duration-300 text-sm leading-relaxed">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="text-center mt-12"
          {...motionProps}
          transition={{ delay: 0.5 }}
        >
          <p className="text-gray-400 font-sans text-sm mb-4">
            All plans include a 14-day free trial. No credit card required.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-gray-500 text-sm">
            <span className="flex items-center gap-2">
              <Check className="w-4 h-4 text-brand-400" />
              Cancel anytime
            </span>
            <span className="flex items-center gap-2">
              <Check className="w-4 h-4 text-brand-400" />
              No setup fees
            </span>
            <span className="flex items-center gap-2">
              <Check className="w-4 h-4 text-brand-400" />
              24/7 support
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};