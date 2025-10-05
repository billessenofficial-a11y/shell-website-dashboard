import React from 'react';
import { motion } from 'framer-motion';

export const TrustedBy = () => {
  const companies = [
    "TechStream",
    "InnovateLabs",
    "FutureScale",
    "DigitalPrime",
    "NexusFlow",
    "VisionCraft"
  ];

  return (
    <section className="py-16 relative overflow-hidden border-t border-white/5">
      <div className="container mx-auto px-6 lg:px-8">
        <motion.p 
          className="text-center text-gray-400 font-sans mb-10 text-sm"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Trusted by innovative companies worldwide
        </motion.p>
        
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-items-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {companies.map((company, index) => (
            <div 
              key={index}
              className="text-gray-500 font-sans font-semibold text-xl bg-gradient-to-r from-gray-500 to-gray-600 bg-clip-text text-transparent hover:from-white hover:to-gray-300 transition-all duration-300"
            >
              {company}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};