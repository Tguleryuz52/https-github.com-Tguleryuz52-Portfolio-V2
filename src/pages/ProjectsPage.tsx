import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Footer } from '../components/Footer';

const projects = [
  { imgSrc: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&q=80&w=1600', year: '2024', title: 'Formula Vintage', desc: 'For Formula Vintage, we crafted a design that honors the rich heritage of classic cars while adding a modern twist. Combining timeless elegance with sleek, contemporary elements, we created an experience that appeals to both enthusiasts and newcomers, celebrating the past with a fresh perspective.', tags: ['Landing Page', 'Mobile App', 'Redesign', 'UI/UX'] },
  { imgSrc: 'https://images.unsplash.com/photo-1629198688000-71f23e745b6e?auto=format&fit=crop&q=80&w=1600', year: '2024', title: 'Sprey Zest', desc: 'For Sprey Zest, we took a playful, bold approach to packaging and branding. Instead of following the typical fresh or clean aesthetic, we infused energy and personality into every detail, making the product stand out on shelves and bringing a burst of excitement to the consumer experience.', tags: ['Website Design', 'Branding', '3D Design'] },
  { imgSrc: 'https://images.unsplash.com/photo-1558981285-6f0c94958bb6?auto=format&fit=crop&q=80&w=1600', year: '2020', title: 'Super Pro', desc: 'For Super-Pro, we redefined what it means to be professional. A tool built for modern achievers focusing on rapid scaling without losing the design fundamentals.', tags: ['Desktop App', 'Mobile App', 'UI/UX'] },
  { imgSrc: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1600', year: '2024', title: 'Architech Buildings', desc: 'We redefined the concept of modern living by creating a design that challenges conventional boundaries, turning purely functional spaces into artistic statements.', tags: ['Mobile App', 'Branding', 'Website Design', '3D Design'] },
  { imgSrc: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=1600', year: '2022', title: 'Posnen Gallery', desc: 'For the Posnen gallery campaign, we flipped the typical sports ad by focusing on character rather than performance. Elevating the human form to high art status.', tags: ['Desktop App', 'Branding', 'UI/UX'] },
  { imgSrc: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=1600', year: '2023', title: 'Fringe Sports', desc: 'For Fringe Sports, we broke away from the typical sports advertising mold, looking at the quirky side of athletic culture and bringing a retro-futuristic styling to the forefront.', tags: ['Desktop App', 'Entertainment', 'Branding', '3D Design'] },
  { imgSrc: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=1600', year: '2022', title: 'Lot and Coin', desc: 'For Lot-and-Coin, we created a brand identity that blends trust with excitement. Focusing on the thrill of the auction, keeping the digital facade as sleek and mysterious as possible.', tags: ['Mobile App', 'Branding', 'UI/UX'] }
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
    <div className="bg-[#0a0a0a] text-white min-h-screen font-sans selection:bg-[#e53935] selection:text-white">
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full h-[92px] px-8 md:px-[60px] z-50 flex items-center justify-between text-[14px] md:text-[16px] bg-[#0a0a0a]/90 backdrop-blur-md border-b border-white/5 font-sans font-medium">
        <Link to="/" className="text-white hover:opacity-70 transition-opacity whitespace-nowrap">
          © Alex Design & Strategy
        </Link>
        <div className="flex flex-1 justify-center items-center gap-8 md:gap-16">
          <span className="cursor-pointer text-white hover:opacity-70 transition-opacity">Projects</span>
          <span className="cursor-pointer text-white hover:opacity-70 transition-opacity">About</span>
        </div>
        <div>
          <span className="cursor-pointer text-white hover:opacity-70 transition-opacity">Contact</span>
        </div>
      </nav>

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
          <div className="w-full px-8 md:px-[60px] mb-8 md:mb-12 flex items-center gap-4 overflow-x-auto no-scrollbar relative z-10">
            {allCategories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 border flex-shrink-0 ${
                  activeFilter === cat 
                    ? 'border-white bg-white text-[#0a0a0a]' 
                    : 'border-[#7a7a7a] text-[#888888] hover:border-white hover:text-white bg-transparent'
                }`}
              >
                {cat}
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
  );
}

// Project Card with the exact same padding container design as the Home page
function ProjectCard({ project, index }: { project: any, index: number }) {
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

  return (
    <div className="w-[90vw] md:w-[80vw] xl:w-[1300px] h-[65vh] md:h-[75vh] flex-shrink-0">
      {/* Padding Container (Main Card) - Birebir Framer CSS */}
      <div className="w-full h-full flex flex-col lg:flex-row p-3 gap-[10px] bg-[#161616] rounded-[20px] shadow-[0px_2px_5px_0px_rgba(0,0,0,0.25)]">
        
        {/* Image Container */}
        <div 
          className="w-full lg:flex-1 h-[40vh] lg:h-full relative rounded-[16px] border border-[#7a7a7a] overflow-hidden cursor-none"
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
          onMouseMove={handleMouseMove}
        >
          <motion.img 
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            src={project.imgSrc}
            alt={project.title}
            className="w-full h-full object-cover"
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
                <div className="w-24 h-24 bg-[#ff6b4a] text-white rounded-full flex items-center justify-center text-lg font-medium tracking-wide shadow-xl">
                  View
                </div>
              </motion.div>
            )}
          </AnimatePresence>
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
    </div>
  );
}
