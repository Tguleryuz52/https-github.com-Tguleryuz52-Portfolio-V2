import { motion, useScroll, useTransform, MotionValue, AnimatePresence, useInView } from 'motion/react';
import { useRef, useState, useEffect } from 'react';
import { Footer } from '../components/Footer';
import { SectionSubtitle } from '../components/ui/Layout';

const awards = [
  { name: 'Vibrent', award: 'SOTD', org: 'Awwwards', id: '01' },
  { name: 'CoSpace', award: 'HM', org: 'Awwwards', id: '02' },
  { name: 'Farouk & Brown', award: 'Dribbble Weekly Picks', org: 'Dribbble', id: '03' },
  { name: 'Bio Sun', award: 'Dribbble Weekly Picks', org: 'Dribbble', id: '04' },
  { name: 'Info Gear', award: 'SOTD', org: 'Awwwards', id: '05' },
  { name: 'No Code Mate', award: 'Innovation Award', org: 'CSSDA', id: '06' },
  { name: 'Gandy', award: 'Black Pencil', org: 'Awwwards', id: '07' },
  { name: 'Tower', award: 'Webby Award', org: 'Webby Awards', id: '08' },
];

export function AboutPage() {
  return (
    <div className="bg-[#0a0a0a] text-white min-h-screen font-sans selection:bg-[#e53935] selection:text-white">
      {/* Intro Section */}
      <section className="pt-[180px] md:pt-[220px] pb-16 px-8 md:px-[80px] max-w-[1600px] mx-auto">
        <div className="flex flex-col gap-16 md:gap-24">
          
          {/* Headline with inline floating avatar */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full"
          >
            <h1 className="text-4xl md:text-[72px] leading-[1.05] font-display font-bold tracking-tight md:tracking-tighter text-white">
              <motion.img 
                 initial={{ opacity: 0, scale: 0.8 }}
                 animate={{ opacity: 1, scale: 1 }}
                 transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                 src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop" 
                 alt="Avatar" 
                 className="float-left w-16 h-20 md:w-[72px] md:h-[96px] object-cover rounded-[6px] grayscale mr-8 md:mr-12 mb-2 mt-2" 
              />
              I'm a designer and art director with over 25 years of experience turning ideas into brands and products. I work closely with founders, marketing teams, and developers to create visual systems that scale — from brand strategy to launch-ready interfaces.
            </h1>
          </motion.div>

          {/* Paragraphs and Button */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 w-full items-stretch"
          >
             <div className="md:col-span-4">
                <p className="text-[#A7A0A0] text-[16px] md:text-[18px] leading-relaxed">
                  I got my start in 2018, freelancing for early-stage startups while finishing design school. My first big break came working with Dapper Labs during the early Web3 wave — helping shape the look and feel of their product launches. Since then, I've collaborated with teams at Polygon, Showtime, and smaller venture-backed startups across LA, London, and Tel Aviv.
                </p>
             </div>
             <div className="md:col-span-4">
                <p className="text-[#A7A0A0] text-[16px] md:text-[18px] leading-relaxed">
                  Most of my work sits at the intersection of branding and product. Whether it's designing pitch decks that raise funding or interfaces that ship, I partner closely with founders and developers to bring bold ideas to life — fast and with intention.
                </p>
             </div>
             <div className="md:col-span-4 flex justify-start md:justify-end h-full items-end pt-8 md:pt-0">
                <button className="relative overflow-hidden px-8 py-3 rounded-full border border-white/20 text-white text-[15px] font-medium group">
                  <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full opacity-0 group-hover:opacity-100 group-hover:scale-[25] transition-all duration-500 ease-out z-0"></span>
                  <span className="relative z-10 group-hover:text-[#0a0a0a] transition-colors duration-300">Let's Talk</span>
                </button>
             </div>
          </motion.div>
        </div>
      </section>



      {/* Recognition and Awards */}
      <section className="w-full pt-12 md:pt-16 pb-0 relative border-t border-white/10 mt-12">
        <SectionSubtitle>Recognition and Awards</SectionSubtitle>

        <div className="flex flex-col w-full mt-8 md:mt-12">
          {awards.map((aw, i) => (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              key={i} 
              className="group relative w-full border-b border-white/10 overflow-hidden cursor-pointer hover:bg-[#ff6b4a] transition-colors duration-300"
            >
              <div className="w-full px-6 md:px-12 py-4 flex flex-col md:flex-row justify-between items-start md:items-center">
                <div className="relative z-10 w-full md:w-1/3">
                  <span className="font-sans font-bold text-[18px] md:text-[20px] text-white transition-colors duration-300">
                    {aw.name}
                  </span>
                </div>
                
                <div className="relative z-10 w-full md:w-1/3 text-left md:text-left mt-2 md:mt-0">
                  <span className="font-sans text-[16px] md:text-[18px] text-[#888888] group-hover:text-white transition-colors duration-300">
                    {aw.award}
                  </span>
                </div>

                <div className="relative z-10 w-full md:w-1/3 flex justify-between md:justify-end md:gap-32 items-center mt-2 md:mt-0">
                  <span className="font-sans text-[16px] md:text-[18px] text-[#888888] group-hover:text-white transition-colors duration-300">
                    {aw.org}
                  </span>
                  <div className="relative flex items-center justify-center w-6 h-6">
                    <span className="font-mono text-[14px] md:text-[16px] text-[#888888] absolute transition-all duration-300 group-hover:opacity-0 group-hover:scale-75">
                      {aw.id}
                    </span>
                    <svg 
                      className="w-5 h-5 text-white absolute opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300" 
                      fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                    </svg>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <HeroScrollSection />

      {/* Facts */}
      <FactsSection />

      <Footer />
    </div>
  );
}

const factsData = [
  {
    number: "90",
    title: "Completed Projects",
    desc: "Across industries and sectors. A portfolio of diverse and impactful completed projects. A proven history of delivering impactful design solutions across a wide spectrum of industries and sectors. From startups to established brands, each project has added depth and adaptability to my skillset.",
    hollow: true
  },
  {
    number: "25",
    title: "Years of Experience",
    desc: "With 25 years of experience I have been building digital products that have real impact, I focus on what makes a product stand out.",
    hollow: false
  },
  {
    number: "12",
    title: "Awards & Honor's",
    desc: "Recognized by industry leaders and awarded for excellence in digital design, interactive experiences, and creative innovation.",
    hollow: false
  }
];

function FactBlock({ 
  fact, 
  idx, 
  activeIndex, 
  setActiveIndex 
}: { 
  fact: typeof factsData[0]; 
  idx: number; 
  activeIndex: number; 
  setActiveIndex: (val: number) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  
  // Detect when this block reaches the center of the viewport
  const isInView = useInView(ref, { margin: "-45% 0px -45% 0px" });

  useEffect(() => {
    if (isInView) {
      setActiveIndex(idx);
    }
  }, [isInView, idx, setActiveIndex]);

  const isActive = activeIndex === idx;

  return (
    <div 
      ref={ref} 
      className={`min-h-[60vh] md:min-h-[85vh] flex flex-col justify-center py-12 transition-opacity duration-700 ${isActive ? 'opacity-100' : 'opacity-30'}`}
    >
      <h3 className="text-3xl md:text-[42px] font-display font-bold text-white tracking-tight mb-6">{fact.title}</h3>
      <p className="text-[#888888] text-sm md:text-base leading-relaxed max-w-sm">
        {fact.desc}
      </p>
    </div>
  );
}

function FactsSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="w-full max-w-[1440px] mx-auto py-16 md:py-32 px-8 md:px-[60px] relative">
      <div className="border-t border-white/10 pt-6 mb-12 md:mb-24">
        <h2 className="font-sans font-semibold text-sm md:text-[18px] text-[#888888] flex items-center gap-2">
          <span className="text-white/30">//</span> Facts
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-24 relative">
        {/* LEFT COLUMN: Sticky Number */}
        <div className="md:col-span-5 lg:col-span-5 relative">
          <div className="sticky top-40 flex flex-col items-start h-auto w-full mb-12 md:mb-0" style={{ perspective: "1000px" }}>
            <div className="overflow-hidden h-[12rem] sm:h-[16rem] md:h-[20rem] flex items-center">
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={activeIndex}
                  initial={{ rotateX: -90, y: 50, opacity: 0 }}
                  animate={{ rotateX: 0, y: 0, opacity: 1 }}
                  exit={{ rotateX: 90, y: -50, opacity: 0 }}
                  transition={{ 
                    duration: 0.6, 
                    ease: [0.22, 1, 0.36, 1] 
                  }}
                  className={`text-[10rem] sm:text-[14rem] md:text-[18rem] leading-none font-display font-medium tracking-tighter slashed-zero ${factsData[activeIndex].hollow ? 'text-transparent' : 'text-white'}`}
                  style={{ transformOrigin: "center center", ...(factsData[activeIndex].hollow ? { WebkitTextStroke: '2px white' } : {}) }}
                >
                  {factsData[activeIndex].number}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Fact Texts */}
        <div className="md:col-span-7 lg:col-span-7 flex flex-col pt-8 md:pt-0">
          {factsData.map((fact, idx) => (
            <FactBlock 
              key={idx} 
              fact={fact} 
              idx={idx} 
              activeIndex={activeIndex}
              setActiveIndex={setActiveIndex} 
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function HeroScrollSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Animation starts when section enters viewport and finishes right as it fills the screen
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 85%", "start 10%"] 
  });

  const heroWords = [
    { text: "Distinctive" }, { text: "design" }, { text: "for", br: true },
    { text: "brands" }, { text: "with", accent: true }, { text: "taste", accent: true }, { text: "—", accent: true }, { text: "built", accent: true, br: true },
    { text: "to", accent: true }, { text: "stand", accent: true }, { text: "apart", accent: true }, { text: "in", accent: true }, { text: "a", accent: true }, { text: "world", accent: true, br: true },
    { text: "of", accent: true }, { text: "sameness.", accent: true }
  ];

  return (
    <section ref={containerRef} className="w-full h-[80vh] md:h-[100vh] relative mt-0 overflow-hidden flex items-center justify-center">
       <div className="absolute inset-0 w-full h-full">
         <img 
           src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=2000&auto=format&fit=crop" 
           alt="Showcase Portrait" 
           className="w-full h-full object-cover grayscale opacity-40" 
         />
       </div>
       
       <div className="relative z-10 w-full max-w-[1440px] px-8 md:px-[60px] mx-auto flex items-center justify-center">
         {/* The block is centered on screen, but text inside is left-aligned */}
         <div className="inline-block text-left">
           <h2 className="text-4xl sm:text-5xl md:text-[68px] lg:text-[76px] font-display font-bold tracking-tighter leading-[1.1] md:leading-[1.05]">
             {heroWords.map((word, i) => {
                const start = i / heroWords.length;
                const end = start + (1 / heroWords.length);
                return (
                  <span key={i}>
                    <Word progress={scrollYProgress} range={[start, end]} isAccent={word.accent}>
                      {word.text}
                    </Word>
                    {word.br ? <br className="hidden md:block" /> : (i < heroWords.length - 1 && " ")}
                  </span>
                );
             })}
           </h2>
         </div>
       </div>
    </section>
  );
}

function Word({ children, progress, range, isAccent }: { children: React.ReactNode, progress: MotionValue<number>, range: [number, number], isAccent?: boolean }) {
  const opacity = useTransform(progress, range, [0, 1]);
  
  return (
    <span className="relative inline-block mt-[0.1em] mr-[0.2em] md:mr-[0.25em]">
      {/* Background outlined word */}
      <span 
        className="text-transparent"
        style={{ WebkitTextStroke: '1px rgba(255, 255, 255, 0.2)' }}
      >
        {children}
      </span>
      {/* Foreground filled word */}
      <motion.span 
        style={{ opacity }} 
        className={`absolute left-0 top-0 ${isAccent ? "text-[#ff6b4a]" : "text-white"}`}
      >
        {children}
      </motion.span>
    </span>
  );
}
