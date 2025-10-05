import React from 'react';
import { motion } from 'framer-motion';

export const Integrations = () => {
  const logos = [
    { name: 'YouTube', color: 'text-red-500' },
    { name: 'Vimeo', color: 'text-blue-500' },
    { name: 'TikTok', color: 'text-pink-500' },
    { name: 'Instagram', color: 'text-purple-500' },
    { name: 'LinkedIn', color: 'text-blue-600' },
    { name: 'Twitter', color: 'text-blue-400' }
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-black"></div>
      
      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.p 
            className="text-lg text-gray-400 mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Seamlessly integrate with your favorite platforms
          </motion.p>
          <motion.h2 
            className="text-4xl md:text-5xl font-display font-semibold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Share your videos everywhere
          </motion.h2>
        </div>

        <motion.div 
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {logos.map((logo, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 flex items-center justify-center hover:bg-white/10 transition-colors duration-300"
            >
              <span className={`font-display font-semibold ${logo.color}`}>
                {logo.name}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};