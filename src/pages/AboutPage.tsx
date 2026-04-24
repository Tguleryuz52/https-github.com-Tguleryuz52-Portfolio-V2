import { motion } from 'motion/react';
import { Footer } from '../components/Footer';

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
                 className="float-left w-16 h-20 md:w-[72px] md:h-[96px] object-cover rounded-[6px] grayscale mr-6 md:mr-8 mb-2 mt-2" 
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

      {/* Hero Image */}
      <section className="w-full h-[60vh] md:h-[90vh] overflow-hidden mb-16 md:mb-32 relative">
         <motion.div
           initial={{ scale: 1.1 }}
           whileInView={{ scale: 1 }}
           viewport={{ once: true }}
           transition={{ duration: 1.5, ease: "easeOut" }}
           className="w-full h-full"
         >
           <img 
             src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=2000&auto=format&fit=crop" 
             alt="Showcase" 
             className="w-full h-full object-cover grayscale opacity-80" 
           />
           {/* Center Text Overlay mimicking the image */}
           <div className="absolute inset-0 flex items-center justify-center pointer-events-none p-8">
             <motion.h2 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.8, delay: 0.3 }}
               className="text-3xl md:text-6xl font-display text-white tracking-tight text-center max-w-3xl mix-blend-difference"
             >
               Distinctive design for brands with taste — built <span className="text-[#ff6b4a]">to stand apart in a world</span> of sameness.
             </motion.h2>
           </div>
         </motion.div>
      </section>

      {/* Recognition and Awards */}
      <section className="w-full max-w-[1440px] mx-auto py-16 md:py-24 px-8 md:px-[60px]">
        <div className="border-t border-white/10 pt-6 mb-8">
          <h2 className="font-sans font-semibold text-sm md:text-[18px] text-[#888888] flex items-center gap-2">
            <span className="text-white/30">//</span> Recognition and Awards
          </h2>
        </div>

        <div className="flex flex-col">
          {awards.map((aw, i) => (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              key={i} 
              className="group relative flex flex-col md:flex-row justify-between items-start md:items-center py-6 px-4 border-b border-white/10 overflow-hidden cursor-pointer hover:bg-[#161616] transition-colors duration-300 rounded-lg"
            >
              <div className="relative z-10 w-full md:w-1/3">
                <span className="font-sans font-bold text-[18px] md:text-[20px] text-white transition-colors duration-300 group-hover:text-[#ff6b4a]">
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
                <span className="font-mono text-[14px] md:text-[16px] text-[#888888] group-hover:text-white transition-colors duration-300">
                  {aw.id}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Facts */}
      <section className="w-full max-w-[1440px] mx-auto py-16 md:py-32 px-8 md:px-[60px]">
        <div className="border-t border-white/10 pt-6 mb-16 md:mb-32">
          <h2 className="font-sans font-semibold text-sm md:text-[18px] text-[#888888] flex items-center gap-2">
            <span className="text-white/30">//</span> Facts
          </h2>
        </div>
        
        <div className="flex flex-col gap-24 md:gap-32">
           <FactItem 
             number="90" 
             title="Completed Projects" 
             desc="Across industries and sectors. A portfolio of diverse and impactful completed projects. A proven history of delivering impactful design solutions across a wide spectrum of industries and sectors. From startups to established brands, each project has added depth and adaptability to my skillset." 
             hollow 
           />
           
           <div className="w-full h-[1px] bg-white/10 max-w-4xl mx-auto"></div>

           <FactItem 
             number="25" 
             title="Years of Experience" 
             desc="With 25 years of experience I have been building digital products that have real impact, I focus on what makes a product stand out." 
           />

           <div className="w-full h-[1px] bg-white/10 max-w-4xl mx-auto"></div>

           <FactItem 
             number="12" 
             title="Awards & Honor's" 
             desc="Recognized by industry leaders and awarded for excellence in digital design, interactive experiences, and creative innovation." 
           />
        </div>
      </section>

      <Footer />
    </div>
  );
}

function FactItem({ number, title, desc, hollow = false }: { number: string, title: string, desc: string, hollow?: boolean }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="flex flex-col md:flex-row gap-8 md:gap-24 items-start md:items-center justify-center max-w-5xl mx-auto w-full"
    >
       <div className="w-full md:w-[40%] flex justify-start md:justify-end items-center">
         <span 
           className={`text-[120px] md:text-[220px] leading-none font-display font-medium tracking-tighter slashed-zero ${hollow ? 'text-transparent' : 'text-white'}`} 
           style={hollow ? { WebkitTextStroke: '2px white' } : {}}
         >
           {number}
         </span>
       </div>
       <div className="w-full md:w-[60%] flex flex-col gap-4 md:gap-6 pt-2 md:pt-0">
         <h3 className="text-3xl md:text-[42px] font-display font-bold text-white tracking-tight">{title}</h3>
         <p className="text-[#888888] text-sm md:text-base leading-relaxed max-w-sm">
           {desc}
         </p>
       </div>
    </motion.div>
  )
}
