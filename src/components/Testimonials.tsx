import React, { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'motion/react';
import { Container } from './ui/Layout';

const quotePart1 = `"His keen eye for detail and innovative approach`.split(" ");
const quotePart2 = `impressed our team, turning challenges into creative solutions that set him apart."`.split(" ");

const allWords = [
  ...quotePart1.map(w => ({ text: w, accent: false })),
  ...quotePart2.map(w => ({ text: w, accent: true }))
];

interface WordProps {
  children: React.ReactNode;
  progress: MotionValue<number>;
  range: [number, number];
  isAccent: boolean;
}

const Word = ({ children, progress, range, isAccent }: WordProps) => {
  const whiteRange = ["rgba(255, 255, 255, 0.2)", "rgba(255, 255, 255, 1)"];
  const orangeRange = ["rgba(255, 87, 51, 0.2)", "rgba(240, 68, 56, 1)"]; // Matches brand-accent roughly

  const color = useTransform(progress, range, isAccent ? orangeRange : whiteRange);
  
  return (
    <motion.span style={{ color }}>
      {children}
    </motion.span>
  );
};

export function Testimonials() {
  const containerRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 75%", "center 25%"] 
  });

  return (
    <section ref={containerRef} className="py-24 md:py-32 min-h-screen flex flex-col justify-center border-t border-white/5 relative overflow-hidden bg-[#0a0a0a]">
      {/* Absolute top-left Testimonials identifier matching the specific style */}
      <div className="absolute top-8 left-6 md:left-12">
        <h3 className="text-brand-accent font-sans font-medium text-xs md:text-sm tracking-widest uppercase">
          // Testimonials
        </h3>
      </div>

      <Container className="relative h-full flex flex-col justify-center">
        
        <div className="flex flex-col md:flex-row gap-6 md:gap-8 lg:gap-16 mt-20 md:mt-24 w-full relative items-start">
          
          {/* Numbers: 01 / 03 exactly matching the visual layout */}
          <div className="md:w-[80px] lg:w-[120px] flex-shrink-0 pt-2 lg:pt-4 text-left">
            <span className="text-brand-accent font-sans font-medium text-sm md:text-base lg:text-lg">01</span>
            <span className="text-white/40 font-sans font-medium text-xs md:text-sm lg:text-base"> / 03</span>
          </div>
          
          {/* Main Quote Area */}
          <div className="w-full max-w-[900px] xl:max-w-[1100px] pr-8 md:pr-32 relative">
             <h2 className="text-[2.25rem] sm:text-5xl md:text-6xl lg:text-7xl xl:text-[84px] font-sans font-bold leading-[1.05] tracking-tight">
                {allWords.map((wordObj, i) => {
                  const start = i / allWords.length;
                  const end = start + (1 / allWords.length);
                  
                  return (
                    <React.Fragment key={i}>
                      <Word progress={scrollYProgress} range={[start, end]} isAccent={wordObj.accent}>
                        {wordObj.text}
                      </Word>
                      {/* Standard space for seamless wrapping */}
                      {i < allWords.length - 1 && " "}
                    </React.Fragment>
                  );
                })}
             </h2>

             {/* Author Info */}
             <div className="mt-12 lg:mt-16">
                <div className="font-sans text-white text-base md:text-lg font-medium mb-1">// Maya Lopez</div>
                <div className="text-white/40 text-sm md:text-base">CEO, Fundwizz</div>
             </div>
          </div>

        </div>

        {/* Floating Avatars entirely clamped to the right vertical center */}
        <div className="hidden lg:flex flex-col gap-5 absolute right-4 lg:right-8 xl:right-12 top-1/2 -translate-y-1/2 z-10">
           <div className="w-[64px] h-[64px] lg:w-[72px] lg:h-[72px] rounded-full p-[3px] border-[2px] border-brand-accent relative cursor-pointer">
              <img 
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150" 
                alt="Maya Lopez" 
                className="w-full h-full object-cover rounded-full"
              />
           </div>
           <div className="w-[56px] h-[56px] lg:w-[60px] lg:h-[60px] rounded-full mx-auto opacity-50 hover:opacity-100 transition-opacity cursor-pointer">
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150" 
                alt="Client 2" 
                className="w-full h-full object-cover rounded-full grayscale hover:grayscale-0 transition-all"
              />
           </div>
           <div className="w-[56px] h-[56px] lg:w-[60px] lg:h-[60px] rounded-full mx-auto opacity-50 hover:opacity-100 transition-opacity cursor-pointer">
              <img 
                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150" 
                alt="Client 3" 
                className="w-full h-full object-cover rounded-full grayscale hover:grayscale-0 transition-all"
              />
           </div>
        </div>
      </Container>
    </section>
  );
}
