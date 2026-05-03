import { motion, useScroll, useTransform, MotionValue } from 'motion/react';
import { Container, SectionSubtitle } from './ui/Layout';
import { TextReveal } from './ui/TextReveal';
import { useRef } from 'react';

const words = [
  { text: "Ben," }, { text: "fikirleri" }, { text: "gerçek", accent: true }, { text: "ürünlere", accent: true }, { text: "dönüştüren", accent: true },
  { text: "vizyoner" }, { text: "bir" }, { text: "Tasarım", accent: true },
  { text: "Mühendisi", accent: true }, { text: "ve", accent: true }, { text: "3D", accent: true }, { text: "Sanatçısıyım.", accent: true },
  { text: "Kusursuz", accent: true }, { text: "arayüzlere,", accent: true }, { text: "cesur", accent: true },
  { text: "kararlara", accent: true }, { text: "ve", accent: true }, { text: "hızlı", accent: true }, { text: "uygulamaya" },
  { text: "odaklanıyorum." }
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
        className={`absolute left-0 top-0 ${isAccent ? "text-[#e53935]" : "text-white"}`}
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
    <section id="about" className="py-24 md:py-48 relative border-t border-white/10">
      <SectionSubtitle>Hakkımda</SectionSubtitle>
      <Container>
        
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
                  text="Vizyonunuzu hızla ve etkili bir şekilde hayata geçiriyorum. İster hiper-gerçekçi 3D evrenler, ister kompleks web uygulamaları olsun; fikir aşamasından kusursuz bir lansmana kadar her adımı eksiksiz yönetiyorum."
                  className="text-[#888888] text-sm md:text-base leading-relaxed mb-8"
                />
                
                <a 
                  href="#projects" 
                  className="inline-flex py-3 px-8 border border-white/20 rounded-full hover:bg-white hover:text-black transition-colors duration-300 font-medium text-sm md:text-base"
                >
                  Projeleri İncele
                </a>
              </motion.div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
