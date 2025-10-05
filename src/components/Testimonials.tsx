import React, { useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

export const Testimonials = () => {
  const prefersReducedMotion = useReducedMotion();
  const leftColumnRef = useRef<HTMLDivElement>(null);
  const middleColumnRef = useRef<HTMLDivElement>(null);
  const rightColumnRef = useRef<HTMLDivElement>(null);
  
  const testimonials = [
    {
      quote: "Our conversion rates increased by 45% after implementing AI-generated product demos. The quality is incredible!",
      author: "Sarah C.",
      role: "E-commerce Store Owner",
    },
    {
      quote: "We've scaled our video content production by 300% while maintaining consistent quality across all campaigns.",
      author: "Michael P.",
      role: "Marketing Agency Founder",
    },
    {
      quote: "The AI presenters are incredibly natural. We create professional training videos in minutes instead of days.",
      author: "Emily R.",
      role: "Startup Founder",
    },
    {
      quote: "Game-changing for our product launches. We can now create high-quality demos for each feature release.",
      author: "David T.",
      role: "Product Manager",
    },
    {
      quote: "The multilingual capabilities have helped us expand globally. Our videos now reach audiences worldwide.",
      author: "Ana M.",
      role: "Brand Director",
    },
    {
      quote: "Perfect for our social media strategy. We create trending content in minutes, not hours.",
      author: "James W.",
      role: "Content Creator",
    },
    {
      quote: "The customization options are endless. Every video perfectly matches our brand.",
      author: "Lisa Z.",
      role: "Creative Director",
    },
    {
      quote: "We've scaled our content production by 400% since using Avilta.",
      author: "Marcus J.",
      role: "Operations Manager",
    },
    {
      quote: "The AI script generation is brilliant. It captures our tone perfectly.",
      author: "Rachel K.",
      role: "Marketing Lead",
    },
    {
      quote: "Outstanding support team. They're always there when we need them.",
      author: "Tom A.",
      role: "Tech Founder",
    },
    {
      quote: "The analytics help us understand what content works best.",
      author: "Sophie T.",
      role: "Digital Marketer",
    },
    {
      quote: "Best investment we've made in our content strategy this year.",
      author: "Alex R.",
      role: "Business Owner",
    }
  ];

  useEffect(() => {
    if (prefersReducedMotion) return;

    const handleScroll = () => {
      // Desktop vertical scrolling
      if (window.innerWidth >= 768) {
        if (leftColumnRef.current) {
          leftColumnRef.current.scrollTop += 0.5;
          if (leftColumnRef.current.scrollTop >= leftColumnRef.current.scrollHeight / 2) {
            leftColumnRef.current.scrollTop = 0;
          }
        }

        if (middleColumnRef.current) {
          middleColumnRef.current.scrollTop -= 0.5;
          if (middleColumnRef.current.scrollTop <= 0) {
            middleColumnRef.current.scrollTop = middleColumnRef.current.scrollHeight / 2;
          }
        }

        if (rightColumnRef.current) {
          rightColumnRef.current.scrollTop += 0.5;
          if (rightColumnRef.current.scrollTop >= rightColumnRef.current.scrollHeight / 2) {
            rightColumnRef.current.scrollTop = 0;
          }
        }
      } 
      // Mobile horizontal scrolling
      else {
        if (leftColumnRef.current) {
          leftColumnRef.current.scrollLeft += 0.5;
          if (leftColumnRef.current.scrollLeft >= leftColumnRef.current.scrollWidth / 2) {
            leftColumnRef.current.scrollLeft = 0;
          }
        }

        if (middleColumnRef.current) {
          middleColumnRef.current.scrollLeft -= 0.5;
          if (middleColumnRef.current.scrollLeft <= 0) {
            middleColumnRef.current.scrollLeft = middleColumnRef.current.scrollWidth / 2;
          }
        }

        if (rightColumnRef.current) {
          rightColumnRef.current.scrollLeft += 0.5;
          if (rightColumnRef.current.scrollLeft >= rightColumnRef.current.scrollWidth / 2) {
            rightColumnRef.current.scrollLeft = 0;
          }
        }
      }
    };

    const intervalId = setInterval(handleScroll, 50);
    return () => clearInterval(intervalId);
  }, [prefersReducedMotion]);

  const renderTestimonialCard = (testimonial: typeof testimonials[0], index: number) => (
    <div className="relative p-4 md:p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl mb-4 md:mb-6 hover:bg-white/10 transition-all duration-300 group min-w-[260px] md:min-w-full">
      <div className="mb-3 md:mb-4 text-brand-400">
        <Quote className="w-6 h-6 md:w-8 md:h-8" />
      </div>
      <div className="flex mb-3 md:mb-4">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="w-3 h-3 md:w-4 md:h-4 text-brand-400" fill="currentColor" />
        ))}
      </div>
      <p className="text-gray-300 text-sm md:text-base mb-4 md:mb-6 font-sans leading-relaxed">"{testimonial.quote}"</p>
      <div>
          <h4 className="font-sans font-medium text-xs md:text-sm text-white group-hover:text-brand-400 transition-colors duration-300">
            {testimonial.author}
          </h4>
          <p className="text-gray-400 text-xs font-sans">{testimonial.role}</p>
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"></div>
    </div>
  );


  // Function to shuffle and split testimonials
  const getShuffledTestimonials = () => {
    const shuffled = [...testimonials].sort(() => Math.random() - 0.5);
    const third = Math.ceil(shuffled.length / 3);
    return [
      shuffled.slice(0, third),
      shuffled.slice(third, third * 2),
      shuffled.slice(third * 2)
    ];
  };

  const [left, middle, right] = getShuffledTestimonials();

  return (
    <section className="py-12 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-brand-950/40 via-black to-black"></div>
      
      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-20">
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-16">
          <motion.h2 
            className="text-3xl md:text-4xl lg:text-5xl font-sans font-semibold text-white mb-4 md:mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Loved by brands like yours
          </motion.h2>
          <motion.p 
            className="text-lg md:text-xl text-gray-400 font-sans"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Join thousands of companies transforming their content with Avilta
          </motion.p>
        </div>

        <div className="grid grid-rows-3 md:grid-rows-none md:grid-cols-3 gap-3 md:gap-6 max-w-7xl mx-auto relative">
          <div className="relative">
            <div 
              ref={leftColumnRef} 
              className="overflow-hidden whitespace-nowrap md:whitespace-normal md:h-[800px]"
            >
              <div className="inline-flex md:block space-x-3 md:space-x-0 md:space-y-4">
                {left.map((testimonial, index) => (
                  <React.Fragment key={index}>
                    {renderTestimonialCard(testimonial, index)}
                    {renderTestimonialCard(testimonial, index)}
                  </React.Fragment>
                ))}
              </div>
            </div>
            <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black to-transparent pointer-events-none z-10"></div>
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black to-transparent pointer-events-none z-10"></div>
          </div>

          <div className="relative">
            <div 
              ref={middleColumnRef} 
              className="overflow-hidden whitespace-nowrap md:whitespace-normal md:h-[800px]"
            >
              <div className="inline-flex md:block space-x-3 md:space-x-0 md:space-y-4">
                {middle.map((testimonial, index) => (
                  <React.Fragment key={index}>
                    {renderTestimonialCard(testimonial, index)}
                    {renderTestimonialCard(testimonial, index)}
                  </React.Fragment>
                ))}
              </div>
            </div>
            <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black to-transparent pointer-events-none z-10"></div>
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black to-transparent pointer-events-none z-10"></div>
          </div>

          <div className="relative">
            <div 
              ref={rightColumnRef} 
              className="overflow-hidden whitespace-nowrap md:whitespace-normal md:h-[800px]"
            >
              <div className="inline-flex md:block space-x-3 md:space-x-0 md:space-y-4">
                {right.map((testimonial, index) => (
                  <React.Fragment key={index}>
                    {renderTestimonialCard(testimonial, index)}
                    {renderTestimonialCard(testimonial, index)}
                  </React.Fragment>
                ))}
              </div>
            </div>
            <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black to-transparent pointer-events-none z-10"></div>
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black to-transparent pointer-events-none z-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
};