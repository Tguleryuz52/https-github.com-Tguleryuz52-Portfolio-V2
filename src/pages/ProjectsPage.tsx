import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Footer } from '../components/Footer';

const projects = [
  { imgSrc: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&q=80&w=1600', year: '2024', title: 'Formula Vintage', desc: 'For Formula Vintage, we crafted a design that honors the rich heritage of classic cars while adding a modern twist. Combining timeless elegance with sleek, contemporary elements, we created an experience that appeals to both enthusiasts and newcomers, celebrating the past with a fresh perspective.', tags: ['Landing Page', 'Mobile App', 'Redesign'] },
  { imgSrc: 'https://images.unsplash.com/photo-1629198688000-71f23e745b6e?auto=format&fit=crop&q=80&w=1600', year: '2024', title: 'Sprey Zest', desc: 'For Sprey Zest, we took a playful, bold approach to packaging and branding. Instead of following the typical fresh or clean aesthetic, we infused energy and personality into every detail, making the product stand out on shelves and bringing a burst of excitement to the consumer experience.', tags: ['Website Design', 'Branding'] },
  { imgSrc: 'https://images.unsplash.com/photo-1558981285-6f0c94958bb6?auto=format&fit=crop&q=80&w=1600', year: '2020', title: 'Super Pro', desc: 'For Super-Pro, we redefined what it means to be professional. A tool built for modern achievers focusing on rapid scaling without losing the design fundamentals.', tags: ['Desktop App', 'Mobile App'] },
  { imgSrc: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1600', year: '2024', title: 'Architech Buildings', desc: 'We redefined the concept of modern living by creating a design that challenges conventional boundaries, turning purely functional spaces into artistic statements.', tags: ['Mobile App', 'Branding', 'Website Design'] },
  { imgSrc: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=1600', year: '2022', title: 'Posnen Gallery', desc: 'For the Posnen gallery campaign, we flipped the typical sports ad by focusing on character rather than performance. Elevating the human form to high art status.', tags: ['Desktop App', 'Branding'] },
  { imgSrc: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=1600', year: '2023', title: 'Fringe Sports', desc: 'For Fringe Sports, we broke away from the typical sports advertising mold, looking at the quirky side of athletic culture and bringing a retro-futuristic styling to the forefront.', tags: ['Desktop App', 'Entertainment', 'Branding'] },
  { imgSrc: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=1600', year: '2022', title: 'Lot and Coin', desc: 'For Lot-and-Coin, we created a brand identity that blends trust with excitement. Focusing on the thrill of the auction, keeping the digital facade as sleek and mysterious as possible.', tags: ['Mobile App', 'Branding'] }
];

const oldProjects = [
  { name: 'Vodoo Child', year: '2021', category: 'Branding', id: '01' },
  { name: 'Smooth', year: '2020', category: 'Branding', id: '02' },
  { name: 'Cole Tech', year: '2019', category: 'Branding', id: '03' },
  { name: 'Vans', year: '2019', category: 'Landing Page', id: '04' },
  { name: 'Sony', year: '2019', category: 'Landing Page', id: '05' },
  { name: 'Son and Father', year: '2018', category: 'Mobile App', id: '06' },
  { name: 'Von', year: '2017', category: 'Web App', id: '07' },
];

export function ProjectsPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Horizontal Scroll Math
  const { scrollYProgress } = useScroll({ 
    target: containerRef, 
    offset: ["start start", "end end"] 
  });
  
  const mapScrollToX = useTransform(scrollYProgress, [0, 1], ["0%", "-85%"]);

  return (
    <div className="bg-[#0a0a0a] text-white min-h-screen font-sans selection:bg-[#e53935] selection:text-white">
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full h-[92px] px-8 md:px-12 z-50 flex items-center justify-between text-[16px] md:text-[18px] bg-[#0a0a0a]/90 backdrop-blur-md">
        <Link to="/" className="font-sans font-medium text-white hover:text-white/70 flex items-center gap-2 transition-colors">
          <ArrowLeft className="w-5 h-5" /> Back to Home
        </Link>
        <div className="flex items-center gap-8 md:gap-10 font-sans text-white">
          <span className="relative group cursor-pointer">
            <span>Projects</span>
            <span className="absolute -bottom-1 left-0 w-0 group-hover:w-full h-[2px] bg-white transition-all duration-300"></span>
          </span>
          <span className="relative group cursor-pointer hidden md:inline-block">
            <span>About</span>
            <span className="absolute -bottom-1 left-0 w-0 group-hover:w-full h-[2px] bg-white transition-all duration-300"></span>
          </span>
          <span className="relative group cursor-pointer hidden md:inline-block">
            <span>Contact</span>
            <span className="absolute -bottom-1 left-0 w-0 group-hover:w-full h-[2px] bg-white transition-all duration-300"></span>
          </span>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-[180px] md:pt-[240px] pb-16 px-8 md:px-[60px] bg-[#0a0a0a]">
        <div className="max-w-[1400px] mx-auto">
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
      <section ref={containerRef} className="relative h-[400vh] bg-[#0a0a0a]">
        <div className="sticky top-0 h-screen w-full flex items-center overflow-hidden">
          <motion.div 
            style={{ x: mapScrollToX }} 
            className="flex gap-16 px-8 md:px-[60px] items-center h-full"
          >
             {projects.map((proj, idx) => (
                <ProjectCard key={idx} project={proj} index={idx} />
             ))}
             {/* Spacing element at the end of scroll track */}
             <div className="w-[10vw] flex-shrink-0" />
          </motion.div>
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
              className="group relative flex flex-col md:flex-row justify-between items-start md:items-center py-6 border-b border-white/10 overflow-hidden cursor-pointer"
            >
              <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"></div>
              
              <div className="relative z-10 flex items-center gap-6 w-full md:w-1/3 pl-4">
                <span className="font-sans font-semibold text-[20px] text-white">
                  {op.name}
                </span>
                <span className="font-dm text-[16px] text-[#888888] group-hover:text-white transition-colors duration-300">
                  ({op.year})
                </span>
              </div>
              
              <div className="relative z-10 w-full md:w-1/3 text-left md:text-center mt-2 md:mt-0">
                <span className="font-sans text-[18px] text-[#888888] group-hover:text-white transition-colors duration-300">
                  {op.category}
                </span>
              </div>

              <div className="relative z-10 w-full md:w-1/3 text-left md:text-right mt-2 md:mt-0 pr-4">
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
  );
}

// Fixed-height, robust Project Card with exact matching layout
function ProjectCard({ project, index }: { project: any, index: number }) {
  const imagePanelRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 300 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imagePanelRef.current) return;
    const rect = imagePanelRef.current.getBoundingClientRect();
    cursorX.set(e.clientX - rect.left - 50);
    cursorY.set(e.clientY - rect.top - 50);
  };

  const isEven = index % 2 === 0;

  return (
    <div className={`w-[90vw] md:w-[1240px] md:h-[640px] flex flex-col items-stretch ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} flex-shrink-0 gap-6 group`}>
      
      {/* Image Panel */}
      <div 
        ref={imagePanelRef}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onMouseMove={handleMouseMove}
        className="w-full md:w-[60%] h-[350px] md:h-full rounded-2xl md:rounded-[24px] border border-white/10 overflow-hidden relative cursor-none bg-[#111111]"
      >
        <img 
          src={project.imgSrc} 
          alt={project.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-[1.05]" 
        />
        
        {/* The Exact Red View Cursor */}
        <AnimatePresence>
          {isHovering && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              style={{ x: cursorXSpring, y: cursorYSpring }}
              className="absolute top-0 left-0 w-[100px] h-[100px] bg-[#e53935] rounded-full flex items-center justify-center text-white font-sans font-medium pointer-events-none z-50 tracking-wide"
            >
              View
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Text Panel */}
      <div className="w-full md:w-[40%] h-auto md:h-full rounded-2xl md:rounded-[24px] border border-white/10 bg-[#0a0a0a] p-8 md:p-12 flex flex-col overflow-y-auto custom-scrollbar">
        
        {/* Top Text Content */}
        <div className="flex flex-col">
          <span className="font-dm text-[15px] text-white tracking-[0.15em] leading-none uppercase">
            ({project.year})
          </span>
          <h3 className="font-sans text-4xl md:text-[52px] font-bold text-white tracking-tight mt-6 leading-[1.05em]">
            {project.title}
          </h3>
          <p className="font-sans text-[#a3a3a3] text-[17px] md:text-[18px] leading-[1.6em] mt-6">
            {project.desc}
          </p>
        </div>

        {/* Bottom Tags Container that forces itself to the bottom */}
        <div className="flex flex-col mt-auto pt-10">
          <div className="border-t border-white/10" />
          {project.tags.map((tag: string, i: number) => (
            <div key={i} className="border-b border-white/10 py-5 font-sans font-medium text-[16px] md:text-[17px] text-white/90 tracking-wide">
              {tag}
            </div>
          ))}
        </div>
        
      </div>
    </div>
  );
}
