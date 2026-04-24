import { HTMLAttributes } from 'react';

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export function Container({ children, className = '', ...props }: ContainerProps) {
  return (
    <div className={`max-w-[1400px] mx-auto px-6 md:px-12 ${className}`} {...props}>
      {children}
    </div>
  );
}

export function SectionSubtitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="sticky top-6 md:top-8 lg:top-12 z-20 pointer-events-none w-full h-0">
      <div className="absolute left-6 md:left-12 flex items-center gap-1.5 opacity-90">
        <span className="text-[#e53935] font-sans font-semibold text-sm">//</span>
        <h3 className="text-[#e53935] font-sans font-medium text-xs md:text-sm tracking-widest uppercase">
          {children}
        </h3>
      </div>
    </div>
  );
}

export const animations = {
  fadeUp: {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
    }
  },
  staggerContainer: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }
};
