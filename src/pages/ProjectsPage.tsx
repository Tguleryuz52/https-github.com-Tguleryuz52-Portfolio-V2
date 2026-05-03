import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Footer } from '../components/Footer';
import { PageTransition } from '../components/PageTransition';

import { projects } from '../data/projects';

const oldProjects = [
  { name: 'Nevera Robot Interface', year: '2023', category: 'UI/UX Tasarımı', id: '01' },
  { name: 'Asimov Tech', year: '2023', category: 'Marka Kimliği', id: '02' },
  { name: 'Feron Dashboard', year: '2024', category: 'Web App', id: '03' },
  { name: 'Nexus 3D Concept', year: '2023', category: '3D Görselleştirme', id: '04' },
];

export function ProjectsPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [scrollRange, setScrollRange] = useState(0);
  const [activeFilter, setActiveFilter] = useState('All');

  const allCategories = ['All', 'UI/UX', '3D Design', 'Branding', 'Mobile App', 'Desktop App', 'Landing Page'];

  const filteredProjects = projects.filter(p => 
    activeFilter === 'All' ? true : p.tags.includes(activeFilter)
  );

  useEffect(() => {
    const updateScrollRange = () => {
      if (trackRef.current) {
        const scrollWidth = trackRef.current.scrollWidth;
        const clientWidth = window.innerWidth;
        const maxScroll = Math.min(0, -(scrollWidth - clientWidth));
        setScrollRange(maxScroll);
      }
    };
    
    updateScrollRange();
    setTimeout(updateScrollRange, 100);
    
    window.addEventListener('resize', updateScrollRange);
    return () => window.removeEventListener('resize', updateScrollRange);
  }, [filteredProjects]);
  
  // Horizontal Scroll Math
  const { scrollYProgress } = useScroll({ 
    target: containerRef, 
    offset: ["start start", "end end"] 
  });
  
  const mapScrollToX = useTransform(scrollYProgress, [0, 1], [0, scrollRange]);

  return (
    <PageTransition>
      <div className="bg-[#0a0a0a] text-white min-h-screen font-sans selection:bg-[#e53935] selection:text-white">
        
        {/* Hero Section */}
        <section className="pt-[180px] md:pt-[240px] pb-16 px-8 md:px-[60px] bg-[#0a0a0a]">
          <div className="w-full">
            <motion.h1 
              initial={{ opacity: 0, y: -70 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
              className="text-7xl md:text-[8vw] font-bold text-white tracking-tighter leading-none"
            >
              Work Index
            </motion.h1>
          </div>
        </section>

        {/* Horizontal Scroll Section */}
        <section ref={containerRef} className="relative bg-[#0a0a0a]" style={{ height: `calc(100vh + ${Math.abs(scrollRange)}px)` }}>
          <div className="sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden pt-[92px]">
            
            {/* Categories Filter */}
            <div className="w-full px-8 md:px-[60px] py-6 mb-2 md:mb-6 flex items-center gap-4 overflow-x-auto no-scrollbar relative z-10">
              {allCategories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className={`relative px-8 py-3 rounded-full text-sm font-medium transition-all duration-500 flex-shrink-0 backdrop-blur-xl border group overflow-hidden ${
                    activeFilter === cat 
                      ? 'bg-white/15 border-white/40 text-white shadow-[0_8px_20px_rgba(255,255,255,0.1)] shadow-[inset_0_1px_3px_rgba(255,255,255,0.5)]' 
                      : 'bg-white/5 border-white/10 text-[#a0a0a0] hover:bg-white/10 hover:border-white/30 hover:text-white shadow-[0_4px_12px_rgba(0,0,0,0.3)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]'
                  }`}
                >
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                  <span className="relative z-10 tracking-wide drop-shadow-md">{cat}</span>
                </button>
              ))}
            </div>

            <div className="w-full h-[65vh] md:h-[75vh]">
              <motion.div 
                ref={trackRef}
                style={{ x: mapScrollToX }} 
                className="flex gap-16 px-8 md:px-[60px] items-center h-full w-max"
              >
                {filteredProjects.map((proj, idx) => (
                    <ProjectCard key={proj.title} project={proj} index={idx} />
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Old Projects */}
        <section className="w-full max-w-[1440px] mx-auto mt-20 md:mt-40 pb-32 px-8 md:px-[60px] bg-[#0a0a0a]">
          <div className="border-t border-white/10 pt-6 mb-8">
            <h2 className="font-sans font-semibold text-[18px] text-[#888888]">
              // Old projects
            </h2>
          </div>

          <div className="flex flex-col">
            {oldProjects.map((op, i) => (
              <div 
                key={i} 
                className="group relative flex flex-col md:flex-row justify-between items-start md:items-center py-6 px-4 border-b border-white/10 overflow-hidden cursor-pointer hover:bg-[#161616] transition-colors duration-300 rounded-lg"
              >
                <div className="relative z-10 flex items-center gap-6 w-full md:w-1/3">
                  <span className="font-sans font-semibold text-[20px] text-white group-hover:text-[#ff6b4a] transition-colors duration-300">
                    {op.name}
                  </span>
                  <span className="font-dm text-[16px] text-[#888888] group-hover:text-white/80 transition-colors duration-300">
                    ({op.year})
                  </span>
                </div>
                
                <div className="relative z-10 w-full md:w-1/3 text-left md:text-center mt-2 md:mt-0">
                  <span className="font-sans text-[18px] text-[#888888] group-hover:text-white transition-colors duration-300">
                    {op.category}
                  </span>
                </div>

                <div className="relative z-10 w-full md:w-1/3 text-left md:text-right mt-2 md:mt-0">
                  <span className="font-dm text-[16px] text-[#888888] group-hover:text-white transition-colors duration-300">
                    {op.id}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <Footer />
      </div>
    </PageTransition>
  );
}

// Project Card with the exact same padding container design as the Home page
function ProjectCard({ project, index }: { project: any, index: number }) {
  const projectId = project.id;

  return (
    <Link to={`/projects/${projectId}`} className="w-[90vw] md:w-[80vw] xl:w-[1300px] h-[65vh] md:h-[75vh] flex-shrink-0 block">
      {/* Padding Container (Main Card) - Birebir Framer CSS */}
      <div className="w-full h-full flex flex-col lg:flex-row p-3 gap-[10px] bg-[#161616] rounded-[20px] shadow-[0px_2px_5px_0px_rgba(0,0,0,0.25)] hover:border-white/10 border border-transparent transition-colors">
        
        {/* Image Container */}
        <div 
          className="w-full lg:flex-1 h-[40vh] lg:h-full relative rounded-[16px] border border-[#7a7a7a] overflow-hidden cursor-none"
          data-cursor-text="View"
        >
          <motion.img 
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover object-center"
          />
        </div>

        {/* Text Container */}
        <div className="w-full lg:w-[400px] xl:w-[450px] shrink-0 flex flex-col h-full rounded-[12px] border border-[#7a7a7a] p-8 lg:p-10 bg-transparent">
          <div className="font-mono text-sm text-[#544F4F] mb-4">
            ({project.year})
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-display font-semibold tracking-tight text-white mb-6">
            {project.title}
          </h2>
          
          <p className="text-[#544F4F] text-sm lg:text-base leading-relaxed">
            {project.desc}
          </p>

          <div className="mt-auto pt-8 flex flex-col w-full">
            {project.tags.map((tag: string, i: number) => (
              <React.Fragment key={i}>
                {i > 0 && <div className="h-[1px] w-full bg-[#7a7a7a]/50 my-4" />}
                <div className="text-sm text-[#544F4F]">{tag}</div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}
