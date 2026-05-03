import { motion, useScroll, useTransform, useMotionValue, useSpring, useMotionTemplate } from 'motion/react';
import { Linkedin, Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';

const BehanceIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path 
      d="M8.22 14.61c-1.1 0-1.72-.5-1.72-1.51 0-.91.62-1.52 1.72-1.52h1.9v3.03h-1.9zm1.9-4.81H8.3c-.9 0-1.5-.4-1.5-1.3 0-.8.6-1.3 1.5-1.3h1.82v2.6zM0 2.2h7.81c3.02 0 4.9 1.5 4.9 3.8 0 1.5-1.02 2.72-2.32 3.2 1.72.5 2.82 2.02 2.82 3.82 0 2.62-2.22 4.2-5.42 4.2H0V2.2zm14.4 6.81h5.02V7.71h-5.02v1.3zm3.8 3.9c0-1.1-.9-2.1-2.4-2.1-1.5 0-2.5.91-2.5 2.1h4.9zm-4.92.9c.1 1.2 1.1 1.8 2.32 1.8 1.02 0 1.72-.4 2.02-1.1h2.2c-.4 1.8-2 2.92-4.32 2.92-2.72 0-4.63-2.01-4.63-4.82 0-2.8 1.9-4.8 4.63-4.8 2.7 0 4.4 1.8 4.4 4.6v1.4h-6.62z" 
      transform="translate(1, 3.5)" 
    />
  </svg>
);

export function Hero() {
  const { scrollY } = useScroll();

  // Mouse Tracking for Liquid Reveal
  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);
  
  // Smooth out the mouse movement for a natural fluid feel
  const smoothMouseX = useSpring(mouseX, { damping: 30, stiffness: 200, mass: 0.5 });
  const smoothMouseY = useSpring(mouseY, { damping: 30, stiffness: 200, mass: 0.5 });

  const handleMouseMove = (e: React.MouseEvent) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  };

  const handleMouseLeave = () => {
    // Hide the liquid pool when mouse leaves the screen
    mouseX.set(-1000);
    mouseY.set(-1000);
  };

  // Horizontal Marquee on Scroll
  const textX = useTransform(scrollY, [0, 1000], ["0%", "-15%"]); 
  
  // Parallax Image Scroll
  const imageY = useTransform(scrollY, [0, 1000], ["0%", "8%"]); 

  const marqueeItems = Array(20).fill("Talha Güleryüz");

  return (
    <section 
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative h-[100dvh] min-h-[600px] w-full bg-[#E8E8E8] overflow-hidden font-sans z-0"
    >
      {/* SVG Liquid Displacement Filter Definition */}
      <svg width="0" height="0" className="absolute hidden">
        <filter id="liquid" x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence type="fractalNoise" baseFrequency="0.004" numOctaves="1" result="noise">
            <animate attributeName="baseFrequency" values="0.004;0.006;0.004" dur="8s" repeatCount="indefinite" />
          </feTurbulence>
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="20" xChannelSelector="R" yChannelSelector="G" edgeMode="duplicate" />
        </filter>
      </svg>
      
      {/* Centered Base Portrait Image */}
      <motion.div 
        style={{ y: imageY }}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[90vw] md:w-[45vw] h-[85vh] md:h-[90vh] z-10 border-b-0 pointer-events-none"
      >
        <img 
          src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop" 
          alt="Portrait" 
          className="w-full h-full object-cover object-top grayscale contrast-125 brightness-95"
        />
      </motion.div>

      {/* Liquid Distorted Masked Layer */}
      {/* This layer perfectly overlaps the base image, but has a strong water ripple filter.
          It is masked by a radial gradient that follows the mouse, acting like a "water flashlight". */}
      <motion.div
        className="absolute inset-0 z-15 pointer-events-none"
        style={{
          WebkitMaskImage: useMotionTemplate`radial-gradient(circle 250px at ${smoothMouseX}px ${smoothMouseY}px, black 0%, transparent 100%)`,
          maskImage: useMotionTemplate`radial-gradient(circle 250px at ${smoothMouseX}px ${smoothMouseY}px, black 0%, transparent 100%)`,
        }}
      >
        <motion.div 
          style={{ y: imageY }}
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[90vw] md:w-[45vw] h-[85vh] md:h-[90vh] border-b-0"
        >
          <img 
            src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop" 
            alt="Portrait Liquid" 
            className="w-full h-full object-cover object-top scale-[1.03] transition-transform duration-700"
            style={{ filter: 'grayscale(100%) contrast(1.25) brightness(0.95) url(#liquid)' }}
          />
        </motion.div>
      </motion.div>

      {/* Marquee Text Layer (mix-blend-difference) */}
      <div className="absolute inset-0 flex flex-col justify-center pointer-events-none z-20 mix-blend-difference overflow-hidden">
        <motion.div 
          style={{ x: textX }}
          className="flex whitespace-nowrap items-center pl-4 pr-10"
        >
          {marqueeItems.map((item, index) => (
            <div key={index} className="flex items-center">
              <h1 className="text-[18vw] md:text-[14vw] font-display font-semibold text-white leading-none tracking-tight">
                {item}
              </h1>
              {index !== marqueeItems.length - 1 && (
                <span className="text-[12vw] md:text-[8vw] font-display font-light text-white leading-none mx-6 md:mx-10 -mt-[1vw]">
                  -
                </span>
              )}
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom Elements */}
      <div className="absolute bottom-0 left-0 w-full flex flex-row justify-between items-end p-6 md:p-8 z-30 text-white mix-blend-difference pointer-events-none">
        
        {/* Social Links (Sol Alt) */}
        <div className="flex flex-col gap-5 font-semibold pointer-events-auto">
          <a href="#" className="group flex items-center gap-3 cursor-pointer hover:opacity-100 transition-opacity">
            <div className="transform transition-transform duration-500 group-hover:rotate-[360deg]">
              <BehanceIcon className="w-5 h-5 md:w-6 md:h-6 fill-current" />
            </div>
            <span className="text-sm md:text-base font-medium tracking-wide">Behance</span>
          </a>
          <a href="#" className="group flex items-center gap-3 cursor-pointer hover:opacity-100 transition-opacity">
            <div className="transform transition-transform duration-500 group-hover:rotate-[360deg]">
              <Linkedin className="w-5 h-5 md:w-6 md:h-6 fill-current" strokeWidth={0} />
            </div>
            <span className="text-sm md:text-base font-medium tracking-wide">LinkedIn</span>
          </a>
          <a href="#" className="group flex items-center gap-3 cursor-pointer hover:opacity-100 transition-opacity">
            <div className="transform transition-transform duration-500 group-hover:rotate-[360deg]">
              <Instagram className="w-5 h-5 md:w-6 md:h-6" strokeWidth={2} />
            </div>
            <span className="text-sm md:text-base font-medium tracking-wide">Instagram</span>
          </a>
        </div>

        {/* Role Title (Sağ Alt) */}
        <div className="text-right text-[7vw] md:text-[3.5vw] font-display font-medium leading-[0.95] tracking-[-0.02em] pb-1">
           Tasarım Mühendisi<br/>3D Sanatçısı
        </div>

      </div>

    </section>
  );
}
