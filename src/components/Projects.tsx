import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useMotionValue, useSpring, MotionValue } from 'motion/react';
import { Link } from 'react-router-dom';
import { Container, SectionSubtitle } from './ui/Layout';

import { projects } from '../data/projects';

interface ProjectCardProps {
  project: typeof projects[0];
  index: number;
  total: number;
  progress: MotionValue<number>;
}

function ProjectCard({ project, index, total, progress }: ProjectCardProps) {
  const isLast = index === total - 1;
  
  const start = isLast ? 0 : index * (1 / (total - 1));
  const end = isLast ? 1 : (index + 1) * (1 / (total - 1));

  // Geliştirilmiş 3D efektleri (Küçülme, geriye doğru yatma ve yukarı kayma)
  const scale = useTransform(progress, [start, end], [1, isLast ? 1 : 0.88]);
  const rotateX = useTransform(progress, [start, end], [0, isLast ? 0 : 10]);
  const y = useTransform(progress, [start, end], ["0%", isLast ? "0%" : "-8%"]);

  const [hovering, setHovering] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    cursorX.set(e.clientX - rect.left - 48);
    cursorY.set(e.clientY - rect.top - 48);
  };

  const projectId = project.id;

  return (
    <Link to={`/projects/${projectId}`} className="sticky top-0 h-[100dvh] w-full flex items-center justify-center p-4 pt-16 md:p-8 md:pt-24 lg:p-12 lg:pt-28 xl:p-16 xl:pt-32 cursor-pointer block" style={{ perspective: "1500px" }}>
      <motion.div 
        style={{ scale, rotateX, y, transformOrigin: "top" }}
        className="relative w-full h-full max-w-[1800px] mx-auto"
      >
        {/* Padding Container (Main Card) - 3D and brighter */}
        <div 
          className="w-full h-full flex flex-col lg:flex-row p-3 gap-[10px] bg-gradient-to-b from-[#222222] to-[#161616] rounded-[24px] border border-white/10"
          style={{
            boxShadow: "0 40px 80px rgba(0,0,0,0.8), inset 0 2px 2px rgba(255,255,255,0.15), inset 0 -1px 2px rgba(0,0,0,0.5)"
          }}
        >
          
          {/* Image Container */}
          <div 
            className="w-full lg:flex-1 h-[45vh] lg:h-full relative rounded-[16px] overflow-hidden cursor-none shrink-0 lg:shrink"
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
            onMouseMove={handleMouseMove}
          >
            <motion.img 
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover object-center brightness-[1.05] contrast-[1.05]"
            />
            
            {/* Custom Mouse Cursor */}
            <AnimatePresence>
              {hovering && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.2 }}
                  style={{ x: cursorXSpring, y: cursorYSpring }}
                  className="absolute left-0 top-0 pointer-events-none z-50"
                >
                  <div className="w-24 h-24 bg-[#e53935] text-white rounded-full flex items-center justify-center text-lg font-medium tracking-wide shadow-xl">
                    View
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Text Container */}
          <div className="w-full lg:w-[400px] xl:w-[450px] shrink-0 flex flex-col flex-1 lg:flex-none lg:h-full rounded-[16px] p-6 lg:p-10 bg-transparent overflow-y-auto no-scrollbar min-h-0">
            <div className="font-mono text-[15px] text-white font-medium mb-4">
              ({project.year})
            </div>
            
            <h2 className="text-4xl lg:text-5xl font-display font-semibold tracking-tight text-white mb-6">
              {project.title}
            </h2>
            
            <p className="text-white/80 text-[15px] leading-[1.6]">
              {project.desc}
            </p>

            <div className="mt-auto pt-8 flex flex-col w-full">
              {project.tags.map((tag: string, i: number) => (
                <React.Fragment key={i}>
                  {i > 0 && <div className="h-[1px] w-full bg-white/10 my-4" />}
                  <div className="text-[15px] text-white/80">{tag}</div>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

export function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Tüm Projects alanının scroll'unu takip ediyoruz (stacking matematiği için)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <section ref={containerRef} className="relative bg-[#0a0a0a] pb-24 pt-24 border-t border-white/10">
      <SectionSubtitle>Projeler</SectionSubtitle>

      {/* Kartlar yapışkan ve üst üste biner */}
      <div className="relative w-full">
        {projects.map((project, idx) => (
          <ProjectCard 
            key={idx} 
            project={project} 
            index={idx} 
            total={projects.length} 
            progress={scrollYProgress} 
          />
        ))}
      </div>
    </section>
  );
}
