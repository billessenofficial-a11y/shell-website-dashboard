import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trophy, Users, ArrowRight } from 'lucide-react';

interface UserTypeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectHackathonReviewer: () => void;
  onSelectEarlyAccess: () => void;
}

export const UserTypeModal: React.FC<UserTypeModalProps> = ({ 
  isOpen, 
  onClose, 
  onSelectHackathonReviewer,
  onSelectEarlyAccess
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.1 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.1, ease: "easeOut" }}
          className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-semibold text-gray-900 mb-2">
                  Welcome to Avilta
                </h2>
                <p className="text-gray-600">
                  Help us provide you with the best experience
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Hackathon Reviewer Option */}
              <motion.button
                onClick={onSelectHackathonReviewer}
                whileHover={{ scale: 1.005 }}
                whileTap={{ scale: 0.995 }}
                transition={{ duration: 0.05 }}
                className="group p-6 rounded-2xl border-2 border-gray-200 hover:border-brand-500 bg-white hover:bg-brand-50 transition-all duration-300 text-left"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-brand-100 group-hover:bg-brand-200 flex items-center justify-center transition-colors">
                    <Trophy className="w-6 h-6 text-brand-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 group-hover:text-brand-900">
                      Hackathon Reviewer
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Professional access included
                    </p>
                  </div>
                </div>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  Get full professional access with 10 videos per month to explore all features and capabilities of our AI video creation platform.
                </p>
                <div className="flex items-center text-brand-600 group-hover:text-brand-700 font-medium">
                  <span>Get Professional Access</span>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.button>

              {/* Early Access Option */}
              <motion.button
                onClick={onSelectEarlyAccess}
                whileHover={{ scale: 1.005 }}
                whileTap={{ scale: 0.995 }}
                transition={{ duration: 0.05 }}
                className="group p-6 rounded-2xl border-2 border-gray-200 hover:border-purple-500 bg-white hover:bg-purple-50 transition-all duration-300 text-left"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-purple-100 group-hover:bg-purple-200 flex items-center justify-center transition-colors">
                    <Users className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 group-hover:text-purple-900">
                      Early Access User
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Join our waitlist
                    </p>
                  </div>
                </div>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  Be among the first to know when we launch. Get exclusive early access and special pricing.
                </p>
                <div className="flex items-center text-purple-600 group-hover:text-purple-700 font-medium">
                  <span>Join waitlist</span>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.button>
            </div>

            <div className="mt-8 text-center">
              <p className="text-gray-500 text-sm">
                Your selection helps us provide the most relevant experience for you
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};