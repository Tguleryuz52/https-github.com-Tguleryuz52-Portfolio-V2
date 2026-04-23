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
    <h3 className="text-brand-accent font-mono text-xs md:text-sm tracking-widest uppercase mb-8 md:mb-16">
      // {children}
    </h3>
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
