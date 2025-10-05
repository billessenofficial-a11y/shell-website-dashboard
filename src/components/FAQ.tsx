import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

export const FAQ = () => {
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);

  const faqs = [
    {
      question: "How does the AI video generation work?",
      answer: "Our AI technology combines your script with chosen AI creators to generate professional videos. The process is automated yet customizable, allowing you to maintain creative control while saving time."
    },
    {
      question: "Can I customize the AI creators?",
      answer: "Yes! You can select from our diverse range of AI creators and customize their appearance, voice, and presentation style to match your brand's identity."
    },
    {
      question: "What video quality do you support?",
      answer: "We support multiple video qualities, from 720p to 4K, depending on your subscription plan. All videos are optimized for various platforms and devices."
    },
    {
      question: "How long does it take to generate a video?",
      answer: "Most videos are generated within minutes. The exact time depends on the video length and complexity, but our AI technology ensures quick turnaround times."
    },
    {
      question: "Can I use my own branding?",
      answer: "Absolutely! Professional and Enterprise plans include custom branding options. You can add your logo, colors, and other brand elements to your videos."
    },
    {
      question: "Do you offer a free trial?",
      answer: "Yes, we offer a 14-day free trial on all plans. No credit card required to start. Try out our platform and see the magic for yourself!"
    }
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-brand-950/40 via-black to-black"></div>
      
      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            className="text-4xl md:text-5xl font-sans font-semibold text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Frequently asked questions
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-400 font-sans"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Everything you need to know about our platform
          </motion.p>
        </div>

        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="mb-4"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className={`w-full text-left p-6 rounded-xl backdrop-blur-sm border transition-all duration-300 ${
                  openIndex === index
                    ? 'bg-white/10 border-brand-500'
                    : 'bg-white/5 border-white/10 hover:bg-white/10'
                }`}
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-sans font-medium text-white">{faq.question}</h3>
                  {openIndex === index ? (
                    <Minus className="w-5 h-5 text-brand-400 flex-shrink-0" />
                  ) : (
                    <Plus className="w-5 h-5 text-brand-400 flex-shrink-0" />
                  )}
                </div>
                {openIndex === index && (
                  <p className="mt-4 text-gray-400 font-sans">{faq.answer}</p>
                )}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};