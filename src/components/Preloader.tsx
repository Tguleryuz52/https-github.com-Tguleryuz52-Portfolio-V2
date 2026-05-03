import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export function Preloader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Disable scrolling while preloader is active
    document.body.style.overflow = 'hidden';

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            document.body.style.overflow = '';
            onComplete();
          }, 400); // Slight pause at 100% before triggering exit
          return 100;
        }
        // Random increments for a more organic loading feel
        return prev + Math.floor(Math.random() * 15) + 5;
      });
    }, 100);

    return () => {
      clearInterval(interval);
      document.body.style.overflow = '';
    };
  }, [onComplete]);

  return (
    <motion.div
      initial={{ y: 0 }}
      exit={{ 
        y: '-100%', 
        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
      }}
      className="fixed inset-0 z-[9999] bg-[#111111] flex items-end justify-between p-8 md:p-16 text-[#E8E8E8] font-display pointer-events-none"
    >
      <div className="flex flex-col gap-2">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-sm md:text-base font-medium tracking-widest uppercase"
        >
          Talha Design & Strategy
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-xs md:text-sm font-light text-white/50"
        >
          Loading Premium Experience
        </motion.div>
      </div>

      <div className="text-[15vw] md:text-[10vw] font-medium leading-none tracking-tighter">
        {Math.min(progress, 100)}%
      </div>
    </motion.div>
  );
}
