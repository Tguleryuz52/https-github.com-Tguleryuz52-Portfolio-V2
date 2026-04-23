import { motion, useScroll, useTransform, MotionValue } from 'motion/react';
import { Container, SectionSubtitle } from './ui/Layout';
import { TextReveal } from './ui/TextReveal';
import { useRef } from 'react';

const words = [
  { text: "I'm" }, { text: "a" }, { text: "versatile" }, { text: "designer", accent: true }, { text: "who", accent: true },
  { text: "partners", accent: true }, { text: "with", accent: true }, { text: "founders", accent: true },
  { text: "to", accent: true }, { text: "turn", accent: true }, { text: "ideas", accent: true }, { text: "into", accent: true },
  { text: "real", accent: true }, { text: "products.", accent: true }, { text: "I" },
  { text: "focus" }, { text: "on" }, { text: "clear" }, { text: "interfaces," },
  { text: "sharp" }, { text: "decisions," }, { text: "and" }, { text: "fast" }, { text: "execution." }
];

interface WordProps {
  children: React.ReactNode;
  progress: MotionValue<number>;
  range: [number, number];
  isAccent?: boolean;
}

const Word = ({ children, progress, range, isAccent }: WordProps) => {
  // Create a smooth opacity transition for each word based on its range
  const opacity = useTransform(progress, range, [0, 1]);
  
  return (
    <span className="relative inline-block">
      {/* Background outlined word (faint to look less technical) */}
      <span 
        className="text-transparent"
        style={{ WebkitTextStroke: '1px rgba(255, 255, 255, 0.15)' }}
      >
        {children}
      </span>
      {/* Foreground filled word */}
      <motion.span 
        style={{ opacity }} 
        className={`absolute left-0 top-0 ${isAccent ? "text-brand-accent" : "text-white"}`}
      >
        {children}
      </motion.span>
    </span>
  );
};

export function Intro() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Expand the scroll tracking window to smooth out changes fully
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 75%", "end 20%"] 
  });

  // Paragraph animation: Triggered immediately and swiftly towards the end of text reveal
  // Kept smooth but made faster by narrowing the scroll range it takes to fulfill the animation
  const pOpacity = useTransform(scrollYProgress, [0.75, 0.82], [0, 1]);
  const pY = useTransform(scrollYProgress, [0.75, 0.85], [30, 0]);

  return (
    <section id="about" className="py-24 md:py-48 relative">
      <Container>
        <div className="mb-12 md:mb-20">
          <SectionSubtitle>Intro</SectionSubtitle>
        </div>
        
        <div className="flex flex-col relative" ref={containerRef}>
          <div className="w-full max-w-[1000px] mx-auto text-center">
            <h1 className="text-[2rem] sm:text-4xl md:text-[3.5rem] lg:text-[4rem] xl:text-[4.25rem] font-display font-medium tracking-tight md:tracking-[-0.03em] leading-[1.1] md:leading-[1.05]">
              {words.map((word, i) => {
                // Spread the word reveal over the first 70% of the scroll progress
                const start = (i / words.length) * 0.7;
                const end = start + (1 / words.length);
                
                return (
                  <span key={i}>
                    <Word progress={scrollYProgress} range={[start, end]} isAccent={word.accent}>
                      {word.text}
                    </Word>
                    {/* Add a space after each word except the last one */}
                    {i < words.length - 1 && " "}
                  </span>
                );
              })}
            </h1>
          </div>
          
          <div className="w-full max-w-[1000px] mx-auto flex justify-end mt-12 md:mt-16">
            <div className="w-full max-w-[450px] text-left px-4 md:px-0">
              <motion.div style={{ opacity: pOpacity, y: pY }}>
                <TextReveal 
                  text="Bringing your vision to life quickly and efficiently—whether it's branding, apps, or websites—I've got it covered, delivering smooth and effective solutions from start to finish."
                  className="text-text-muted text-sm md:text-base leading-relaxed mb-8"
                />
                
                <a 
                  href="#projects" 
                  className="inline-flex py-3 px-8 border border-white/20 rounded-full hover:bg-white hover:text-black transition-colors duration-300 font-medium text-sm md:text-base"
                >
                  See my Work
                </a>
              </motion.div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
