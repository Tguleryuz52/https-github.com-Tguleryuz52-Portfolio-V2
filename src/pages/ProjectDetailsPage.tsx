import React, { useRef, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring, useMotionValueEvent, useMotionValue, AnimatePresence } from 'motion/react';
import { Footer } from '../components/Footer';

const projectData = {
  id: 'formula-vintage',
  title: 'Formula Vintage',
  year: '2024',
  overview: "For Formula Vintage, we crafted a design that honors the rich heritage of classic cars while adding a modern twist. Combining timeless elegance with sleek, contemporary elements, we created an experience that appeals to both enthusiasts and newcomers, celebrating the past with a fresh perspective.",
  heroImage: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=2264&auto=format&fit=crop",
  gallery: [
    "https://images.unsplash.com/photo-1502877338535-766e1452684a?q=80&w=2344&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=2340&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1542362567-b07e54358753?q=80&w=2340&auto=format&fit=crop"
  ],
  moreProjects: [
    {
      id: 'sprey-zest',
      title: 'Sprey Zest',
      year: '2024',
      image: "https://images.unsplash.com/photo-1611078489935-0cb964de46d6?q=80&w=2274&auto=format&fit=crop"
    },
    {
      id: 'super-pro',
      title: 'Super Pro',
      year: '2020',
      image: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?q=80&w=2340&auto=format&fit=crop"
    },
    {
      id: 'architech-buildings',
      title: 'Architech Buildings',
      year: '2024',
      image: "https://images.unsplash.com/photo-1512498559096-736b0de318f7?q=80&w=2609&auto=format&fit=crop"
    }
  ]
};

const GalleryImage = ({ src }: { src: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  // Parallax effect: image moves slightly slower than container
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <div ref={ref} className="w-full h-[60vh] md:h-[80vh] relative overflow-hidden my-4 md:my-8 bg-[#161616]">
      <motion.img 
        style={{ y, scale: 1.15 }}
        src={src} 
        alt="Gallery Image" 
        className="absolute inset-0 w-full h-full object-cover origin-center"
      />
    </div>
  );
};

export function ProjectDetailsPage() {
  const { id } = useParams();

  const heroRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress: heroScrollProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end end"]
  });

  // Slightly more fluid than default, but not overly heavy
  const smoothHeroProgress = useSpring(heroScrollProgress, { damping: 25, stiffness: 90 });

  // Masked Reveal Transformations
  // Animations complete at 0.7 to give a "reading buffer" before the section unpins
  const imageScale = useTransform(smoothHeroProgress, [0, 0.7], [1.1, 1]);
  const imageDarken = useTransform(smoothHeroProgress, [0.2, 0.7], [0, 1]);
  
  const panelY = useTransform(smoothHeroProgress, [0.2, 0.7], ["100%", "0%"]);
  const textY = useTransform(smoothHeroProgress, [0.2, 0.7], [100, 0]);
  const cursorOpacity = useTransform(smoothHeroProgress, [0.1, 0.3], [1, 0]);

  // Magnetic Cursor Physics
  const [hoveringHero, setHoveringHero] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const cursorXSpring = useSpring(cursorX, { damping: 25, stiffness: 300, mass: 0.5 });
  const cursorYSpring = useSpring(cursorY, { damping: 25, stiffness: 300, mass: 0.5 });

  const handleHeroMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    cursorX.set(e.clientX - 48); // Center the 96px cursor
    cursorY.set(e.clientY - 48);
  };

  const { scrollY } = useScroll();
  const [navHidden, setNavHidden] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setNavHidden(true);
    } else {
      setNavHidden(false);
    }
  });

  return (
    <div className="bg-[#0a0a0a] min-h-screen text-white font-sans selection:bg-brand-accent selection:text-white">
      

      <main>
        {/* Hero Section - Scroll Parallax Reveal */}
        <div ref={heroRef} className="relative w-full h-[250vh] bg-[#0a0a0a]">
          <div 
            className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center cursor-none"
            onMouseEnter={() => setHoveringHero(true)}
            onMouseLeave={() => setHoveringHero(false)}
            onMouseMove={handleHeroMouseMove}
          >
            {/* Layer 1: Main Image Layer */}
            <motion.div 
              className="absolute inset-0 z-0 origin-center"
              style={{ scale: imageScale }}
            >
              <motion.div
                className="w-full h-full"
                initial={{ scale: 1.4, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
              >
                <img 
                  src={projectData.heroImage} 
                  alt={projectData.title}
                  className="w-full h-full object-cover"
                />
              </motion.div>
              
              {/* Subtle top gradient to ensure header is always readable */}
              <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-black/60 to-transparent z-10 pointer-events-none" />

              <motion.div 
                className="absolute inset-0 bg-[#0a0a0a] z-10 pointer-events-none"
                style={{ opacity: imageDarken }}
              />
            </motion.div>

            {/* Layer 2: Overview Content Panel (Transparent) */}
            <motion.div 
              className="absolute inset-0 z-10 bg-transparent px-6 md:px-12 lg:px-24 flex flex-col lg:flex-row gap-16 lg:gap-24 items-center justify-center"
              style={{ y: panelY }}
            >
              <motion.div style={{ y: textY }} className="w-full lg:w-1/2">
                <h1 className="text-5xl md:text-7xl lg:text-[100px] font-display font-semibold leading-[0.9] tracking-tight">
                  {projectData.title.split(' ').map((word, i) => (
                    <span key={i} className="block">{word}</span>
                  ))}
                </h1>
              </motion.div>
              
              <motion.div style={{ y: textY }} className="w-full lg:w-1/2 flex flex-col max-w-2xl lg:pt-4">
                <div className="flex items-center gap-1.5 mb-8">
                  <span className="text-[#e53935] font-sans font-semibold text-sm">//</span>
                  <h3 className="text-[#e53935] font-sans font-medium text-xs md:text-sm tracking-widest uppercase">
                    Overview
                  </h3>
                </div>
                <p className="text-xl md:text-2xl lg:text-[28px] font-sans font-medium leading-[1.4] tracking-tight text-white/90">
                  {projectData.overview}
                </p>
              </motion.div>
            </motion.div>

            {/* Magnetic Custom Cursor */}
            <AnimatePresence>
              {hoveringHero && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.2 }}
                  style={{ x: cursorXSpring, y: cursorYSpring, opacity: cursorOpacity }}
                  className="fixed left-0 top-0 pointer-events-none z-50 mix-blend-difference"
                >
                  <div className="w-24 h-24 bg-[#e53935] text-white rounded-full flex items-center justify-center text-[15px] font-medium tracking-wide shadow-xl">
                    Scroll
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Gallery Section */}
        <section className="w-full bg-[#0a0a0a] flex flex-col pb-24">
          {projectData.gallery.map((imgSrc, idx) => (
            <GalleryImage key={idx} src={imgSrc} />
          ))}
        </section>

        {/* More Projects Section */}
        <section className="bg-[#0a0a0a] px-6 md:px-12 lg:px-24 py-24 border-t border-white/5">
          <div className="flex items-center gap-1.5 mb-12">
            <span className="text-[#e53935] font-sans font-semibold text-sm">//</span>
            <h3 className="text-[#e53935] font-sans font-medium text-xs md:text-sm tracking-widest uppercase">
              More Projects
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {projectData.moreProjects.map((proj) => (
              <Link 
                to={`/projects/${proj.id}`} 
                key={proj.id} 
                className="group flex flex-col gap-4 cursor-pointer p-4 bg-[#161616] rounded-[24px] border border-white/5 hover:border-white/10 transition-colors"
              >
                <div className="w-full aspect-[4/3] rounded-[16px] overflow-hidden relative bg-[#0a0a0a]">
                  <motion.img 
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
                    src={proj.image} 
                    alt={proj.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
                </div>
                <div className="px-2 pb-2">
                  <h4 className="text-2xl font-display font-semibold tracking-tight text-white mb-1">
                    {proj.title}
                  </h4>
                  <div className="font-mono text-[13px] text-white/50 font-medium">
                    ({proj.year})
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
