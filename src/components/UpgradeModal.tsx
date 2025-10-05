import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Check, Crown, Zap } from 'lucide-react';

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPlan: (plan: string) => void;
}

export const UpgradeModal: React.FC<UpgradeModalProps> = ({ 
  isOpen, 
  onClose, 
  onSelectPlan 
}) => {
  const [isAnnual, setIsAnnual] = useState(true);

  const plans = [
    {
      name: "Starter",
      description: "Best option if you are starting with ads",
      monthlyPrice: 47,
      annualPrice: 37,
      videos: 5,
      icon: Sparkles,
      color: "from-blue-500 to-blue-600",
      features: [
        "5 videos per month",
        "Realistic AI creators",
        "AI script generation",
        "30+ languages",
        "Background music library",
        "Automated captions + editing",
        "Export without watermark"
      ]
    },
    {
      name: "Professional",
      description: "Testing many creatives a month",
      monthlyPrice: 67,
      annualPrice: 57,
      videos: 10,
      icon: Crown,
      color: "from-purple-500 to-purple-600",
      popular: true,
      features: [
        "10 videos per month",
        "Realistic AI creators",
        "AI script generation",
        "30+ languages",
        "Background music library",
        "Automated captions + editing",
        "Export without watermark",
        "Priority support"
      ]
    },
    {
      name: "Max",
      description: "Advertisers ready to scale their campaigns",
      monthlyPrice: 117,
      annualPrice: 97,
      videos: 20,
      icon: Zap,
      color: "from-orange-500 to-orange-600",
      features: [
        "20 videos per month",
        "Realistic AI creators",
        "AI script generation",
        "30+ languages",
        "Background music library",
        "Automated captions + editing",
        "Export without watermark",
        "Dedicated support"
      ]
    }
  ];

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-semibold text-gray-900 mb-2">
                  Upgrade Your Plan
                </h2>
                <p className="text-gray-600">
                  Choose a plan to continue creating amazing content with AI.
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>

            {/* Billing Toggle */}
            <div className="flex items-center justify-center mb-8">
              <div className="flex items-center gap-4 bg-gray-100 rounded-xl p-1">
                <button
                  onClick={() => setIsAnnual(false)}
                  className={`px-6 py-2 rounded-lg font-medium transition-all duration-300 ${
                    !isAnnual 
                      ? 'bg-white text-gray-900 shadow-sm' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setIsAnnual(true)}
                  className={`px-6 py-2 rounded-lg font-medium transition-all duration-300 ${
                    isAnnual 
                      ? 'bg-white text-gray-900 shadow-sm' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Annual
                </button>
              </div>
              {isAnnual && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="ml-4 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium"
                >
                  Save up to 25%
                </motion.div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {plans.map((plan, index) => {
                const IconComponent = plan.icon;
                const currentPrice = isAnnual ? plan.annualPrice : plan.monthlyPrice;
                const savings = isAnnual ? (plan.monthlyPrice - plan.annualPrice) * 12 : 0;
                
                return (
                  <motion.div
                    key={plan.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`relative rounded-2xl border-2 transition-all duration-300 hover:scale-105 ${
                      plan.popular 
                        ? 'border-purple-500 bg-gradient-to-b from-purple-50 to-white shadow-lg shadow-purple-500/20' 
                        : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-lg'
                    }`}
                  >
                    {plan.popular && (
                      <div className="absolute -top-4 left-0 right-0 flex justify-center">
                        <div className="bg-purple-500 text-white text-sm font-medium px-4 py-1 rounded-full flex items-center gap-1">
                          <Sparkles className="w-4 h-4" />
                          Most Popular
                        </div>
                      </div>
                    )}

                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${plan.color} flex items-center justify-center`}>
                          <IconComponent className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900">{plan.name}</h3>
                          <p className="text-gray-600 text-sm">{plan.description}</p>
                        </div>
                      </div>

                      <div className="mb-6">
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={isAnnual ? 'annual' : 'monthly'}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ duration: 0.2 }}
                          >
                            <div className="flex items-end gap-2 mb-2">
                              <span className="text-4xl font-bold text-gray-900">
                                ${currentPrice}
                              </span>
                              <span className="text-gray-600 mb-1">/ month</span>
                            </div>
                            {isAnnual ? (
                              <div>
                                <p className="text-sm text-gray-500 line-through">
                                  ${plan.monthlyPrice}/month if billed monthly
                                </p>
                                <div className="mt-1 text-green-600 text-sm font-medium">
                                  Save ${savings} per year
                                </div>
                              </div>
                            ) : (
                              <p className="text-sm text-gray-500">
                                Billed monthly
                              </p>
                            )}
                          </motion.div>
                        </AnimatePresence>
                      </div>

                      <button
                        onClick={() => onSelectPlan(plan.name.toLowerCase())}
                        className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                          plan.popular
                            ? 'bg-purple-500 hover:bg-purple-600 text-white shadow-lg shadow-purple-500/25'
                            : 'bg-gray-900 hover:bg-gray-800 text-white'
                        }`}
                      >
                        Choose {plan.name}
                      </button>

                      <ul className="mt-6 space-y-3">
                        {plan.features.map((feature, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <Check className="w-3 h-3 text-green-600" />
                            </div>
                            <span className="text-gray-700 text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <div className="mt-8 text-center">
              <p className="text-gray-500 text-sm">
                All plans include a 14-day money-back guarantee. Cancel anytime.
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};