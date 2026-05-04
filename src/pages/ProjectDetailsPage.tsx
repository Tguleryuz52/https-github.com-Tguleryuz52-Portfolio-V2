import React, { useRef } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { Footer } from '../components/Footer';
import { PageTransition } from '../components/PageTransition';
import { getProjectById, getMoreProjects } from '../data/projects';

/* ─────────────────────────────────────────────
   Gallery Image – full-bleed, edge-to-edge, parallax
   No gaps, no rounded corners – matching Framer exactly
   ───────────────────────────────────────────── */
const GalleryImage = ({ src, index }: { src: string; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    damping: 50,
    stiffness: 80,
    mass: 0.4
  });

  const y = useTransform(smoothProgress, [0, 1], ["-8%", "8%"]);
  const scale = useTransform(smoothProgress, [0, 0.5, 1], [1.08, 1, 1.08]);

  const isGif = src.toLowerCase().endsWith('.gif');

  return (
    <div
      ref={ref}
      className="w-full relative overflow-hidden bg-[#0a0a0a] block"
      style={{ 
        lineHeight: 0, 
        fontSize: 0
      }}
    >
      {isGif ? (
        <img
          src={src}
          alt={`Gallery ${index + 1}`}
          className="w-full h-auto block"
          style={{ display: 'block' }}
        />
      ) : (
        <div className="w-full h-[50vh] md:h-[65vh] lg:h-[75vh] overflow-hidden relative">
          <motion.div
            className="absolute inset-0 w-full h-[120%] -top-[10%]"
            style={{ y }}
          >
            <motion.img
              src={src}
              alt={`Gallery ${index + 1}`}
              className="w-full h-full object-cover object-center block"
              style={{ scale, display: 'block' }}
            />
          </motion.div>
        </div>
      )}
    </div>
  );
};

/* ─────────────────────────────────────────────
   More Project Card – Framer-exact design
   Dark 3D card bg, rounded container, image + title + year
   No tag pills. Year below title.
   ───────────────────────────────────────────── */
const MoreProjectCard = ({ project }: { project: any }) => {
  return (
    <Link
      to={`/projects/${project.id}`}
      className="group block"
    >
      <motion.div
        className="flex flex-col bg-[#161616] rounded-[24px] overflow-hidden border border-white/5 transition-shadow duration-300 shadow-[0_20px_40px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.05)] hover:shadow-[0_30px_60px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.1)]"
        whileHover={{ y: -5 }}
        transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
      >
        {/* Image with internal padding */}
        <div className="p-3 pb-0">
          <div className="w-full aspect-[4/3] overflow-hidden relative rounded-[18px] bg-[#2a2a2a]">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500" />
            
            {/* Inner subtle border for 3D effect on image */}
            <div className="absolute inset-0 rounded-[18px] border border-white/5 pointer-events-none" />
          </div>
        </div>

        {/* Text content */}
        <div className="px-5 pt-4 pb-5 flex items-center justify-between">
          <h4 className="text-[18px] md:text-[20px] font-display font-semibold tracking-tight text-white leading-tight">
            {project.title}
          </h4>
          <span className="font-mono text-[13px] text-white/40 font-medium flex-shrink-0 ml-3">
            ({project.year})
          </span>
        </div>
      </motion.div>
    </Link>
  );
};

/* ─────────────────────────────────────────────
   Main Page Component
   ───────────────────────────────────────────── */
export function ProjectDetailsPage() {
  const { id } = useParams();
  const projectData = getProjectById(id || "");
  const moreProjects = getMoreProjects(id || "");

  const heroRef = useRef<HTMLDivElement>(null);

  if (!projectData) {
    return <Navigate to="/projects" replace />;
  }

  /* ── Hero scroll-linked animations ── */
  const { scrollYProgress: heroScrollProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end end"]
  });

  const smoothHeroProgress = useSpring(heroScrollProgress, {
    damping: 40,
    stiffness: 70,
    mass: 0.5
  });

  const imageScale = useTransform(smoothHeroProgress, [0, 0.7], [1.08, 1]);
  const imageDarken = useTransform(smoothHeroProgress, [0.15, 0.65], [0, 1]);
  const panelY = useTransform(smoothHeroProgress, [0.15, 0.65], ["100%", "0%"]);
  const textY = useTransform(smoothHeroProgress, [0.15, 0.65], [80, 0]);
  const textOpacity = useTransform(smoothHeroProgress, [0.15, 0.5], [0, 1]);
  const cursorOpacity = useTransform(smoothHeroProgress, [0.05, 0.25], [1, 0]);

  return (
    <PageTransition>
      <div className="bg-[#0a0a0a] min-h-screen text-white font-sans selection:bg-brand-accent selection:text-white">

        <main>
          {/* ═══════════════════════════════════════
              HERO – Scroll-Pinned Parallax Reveal
              ═══════════════════════════════════════ */}
          <div ref={heroRef} className="relative w-full h-[250vh] bg-[#0a0a0a]">
            <div className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center">

              {/* Layer 1: Hero Image */}
              <motion.div
                className="absolute inset-0 z-0 origin-center"
                style={{ scale: imageScale }}
              >
                <motion.div
                  className="w-full h-full"
                  initial={{ scale: 1.08, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <img
                    src={projectData.heroImage}
                    alt={projectData.title}
                    className="w-full h-full object-cover object-[center_20%]"
                  />
                </motion.div>

                <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-black/60 to-transparent z-10 pointer-events-none" />

                <motion.div
                  className="absolute inset-0 bg-[#0a0a0a] z-10 pointer-events-none"
                  style={{ opacity: imageDarken }}
                />
              </motion.div>

              {/* Layer 2: Overview Content */}
              <motion.div
                className="absolute inset-0 z-10 px-6 md:px-12 lg:px-24 flex flex-col lg:flex-row gap-12 lg:gap-20 items-center justify-center pointer-events-none"
                style={{ y: panelY }}
              >
                <motion.div style={{ y: textY, opacity: textOpacity }} className="w-full lg:w-1/2">
                  <h1 className="text-5xl md:text-7xl lg:text-[100px] font-display font-semibold leading-[0.9] tracking-tight">
                    {projectData.title.split(' ').map((word, i) => (
                      <span key={i} className="block">{word}</span>
                    ))}
                  </h1>
                </motion.div>

                <motion.div style={{ y: textY, opacity: textOpacity }} className="w-full lg:w-1/2 flex flex-col max-w-2xl lg:pt-4">
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

              {/* Scroll indicator */}
              <motion.div
                style={{ opacity: cursorOpacity }}
                className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center justify-center gap-3 pointer-events-none z-20"
              >
                <span className="text-[10px] md:text-[11px] tracking-[0.3em] uppercase font-medium text-white/80">
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

          {/* ═══════════════════════════════════════
              GALLERY – Full-bleed, edge-to-edge, with small gaps
              ═══════════════════════════════════════ */}
          <section className="w-full bg-[#0a0a0a] flex flex-col gap-4" style={{ lineHeight: 0 }}>
            {projectData.gallery.map((imgSrc, idx) => (
              <GalleryImage key={idx} src={imgSrc} index={idx} />
            ))}
          </section>

          {/* ═══════════════════════════════════════
              MORE PROJECTS – 3-col grid, Framer style
              ═══════════════════════════════════════ */}
          <section className="bg-[#0a0a0a] px-6 md:px-12 lg:px-24 pt-32 pb-24">
            <div className="flex items-center gap-1.5 mb-16">
              <span className="text-[#e53935] font-sans font-semibold text-sm">//</span>
              <h3 className="text-[#e53935] font-sans font-medium text-xs md:text-sm tracking-widest uppercase">
                More Projects
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {moreProjects.map((proj) => (
                <motion.div
                  key={proj.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  <MoreProjectCard project={proj} />
                </motion.div>
              ))}
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </PageTransition>
  );
}
