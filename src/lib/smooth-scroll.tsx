import { ReactLenis } from 'lenis/react';
import { ReactNode } from 'react';

interface SmoothScrollProps {
  children: ReactNode;
}

export function SmoothScroll({ children }: SmoothScrollProps) {
  // Configured to feel like a "Framer Motion" template: 
  // smooth, slightly interpolated scroll.
  return (
    <ReactLenis root options={{ lerp: 0.08, duration: 1.5, syncTouch: true }}>
      {children}
    </ReactLenis>
  );
}
