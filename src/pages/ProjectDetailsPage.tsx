import React, { useRef, useEffect, useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring, useMotionValueEvent, useMotionValue, AnimatePresence } from 'motion/react';
import { Footer } from '../components/Footer';
import { PageTransition } from '../components/PageTransition';
import { getProjectById, getMoreProjects } from '../data/projects';

const GalleryImage = ({ src, index }: { src: string; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Premium, buttery-smooth spring configuration
  const smoothProgress = useSpring(scrollYProgress, { 
    damping: 45, 
    stiffness: 70, 
    mass: 0.5 
  });

  // Parallax Y movement: The image moves up slightly as you scroll down
  const y = useTransform(smoothProgress, [0, 1], ["-12%", "12%"]);
  const scale = useTransform(smoothProgress, [0, 0.5, 1], [1.1, 1, 1.1]);

  return (
    <div 
      ref={ref}
      className="w-full h-[70vh] md:h-screen relative overflow-hidden bg-[#0a0a0a]"
    >
      <motion.div
        className="absolute inset-0 w-full h-[130%] -top-[15%]"
        style={{ y }}
      >
        <motion.img 
          src={src} 
          alt={`Gallery Image ${index + 1}`}
          className="w-full h-full object-cover object-center"
          style={{ scale, imageRendering: 'auto' }}
          loading="lazy"
        />
      </motion.div>
    </div>
  );
};

export function ProjectDetailsPage() {
  const { id } = useParams();
  const projectData = getProjectById(id || "");
  const moreProjects = getMoreProjects(id || "");

  const heroRef = useRef<HTMLDivElement>(null);

  if (!projectData) {
    return <Navigate to="/projects" replace />;
  }
  
  const { scrollYProgress: heroScrollProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end end"]
  });

  // Premium, fluid spring configuration
  const smoothHeroProgress = useSpring(heroScrollProgress, { damping: 40, stiffness: 70, mass: 0.5 });

  // Masked Reveal Transformations
  // Animations complete at 0.7 to give a "reading buffer" before the section unpins
  const imageScale = useTransform(smoothHeroProgress, [0, 0.7], [1.05, 1]);
  const imageDarken = useTransform(smoothHeroProgress, [0.2, 0.7], [0, 1]);
  
  const panelY = useTransform(smoothHeroProgress, [0.2, 0.7], ["100%", "0%"]);
  const textY = useTransform(smoothHeroProgress, [0.2, 0.7], [100, 0]);
  const cursorOpacity = useTransform(smoothHeroProgress, [0.1, 0.3], [1, 0]);

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
    <PageTransition>
      <div className="bg-[#0a0a0a] min-h-screen text-white font-sans selection:bg-brand-accent selection:text-white">
        
        <main>
          {/* Hero Section - Scroll Parallax Reveal */}
          <div ref={heroRef} className="relative w-full h-[250vh] bg-[#0a0a0a]">
            <div 
              className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center cursor-none"
              data-cursor-text="Scroll"
            >
              {/* Layer 1: Main Image Layer */}
              <motion.div 
                className="absolute inset-0 z-0 origin-center"
                style={{ scale: imageScale }}
              >
                <motion.div
                  className="w-full h-full"
                  initial={{ scale: 1.05, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <img 
                    src={projectData.heroImage} 
                    alt={projectData.title}
                    className="w-full h-full object-cover object-[center_20%]"
                    style={{ imageRendering: 'auto' }}
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
                className="absolute inset-0 z-10 bg-transparent px-6 md:px-12 lg:px-24 flex flex-col lg:flex-row gap-16 lg:gap-24 items-center justify-center pointer-events-none"
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

              {/* Permanent Animated Scroll Indicator */}
              <motion.div 
                style={{ opacity: cursorOpacity }} // fades out on scroll, using same logic as cursor
                className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center justify-center gap-3 pointer-events-none z-20"
              >
                <span className="text-[10px] md:text-[11px] tracking-[0.3em] uppercase font-medium text-white/80 mix-blend-overlay">
                  Scroll to Discover
                </span>
                <div className="w-[1px] h-16 bg-white/20 relative overflow-hidden">
                  <motion.div 
                    className="w-full h-[50%] bg-white absolute top-0"
                    animate={{ y: ["-100%", "200%"] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                  />
                </div>
              </motion.div>
            </div>
          </div>

          {/* Gallery Section */}
          <section className="w-full bg-[#0a0a0a] flex flex-col gap-1 md:gap-2 pb-0">
            {projectData.gallery.map((imgSrc, idx) => (
              <GalleryImage key={idx} src={imgSrc} index={idx} />
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
              {moreProjects.map((proj) => (
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
                      className="w-full h-full object-cover object-center"
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
    </PageTransition>
  );
}
