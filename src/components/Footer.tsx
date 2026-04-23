import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { useRef } from 'react';
import { Linkedin, Instagram, ArrowUp } from 'lucide-react';

const BehanceIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M8.22 14.61c-1.1 0-1.72-.5-1.72-1.51 0-.91.62-1.52 1.72-1.52h1.9v3.03h-1.9zm1.9-4.81H8.3c-.9 0-1.5-.4-1.5-1.3 0-.8.6-1.3 1.5-1.3h1.82v2.6zM0 2.2h7.81c3.02 0 4.9 1.5 4.9 3.8 0 1.5-1.02 2.72-2.32 3.2 1.72.5 2.82 2.02 2.82 3.82 0 2.62-2.22 4.2-5.42 4.2H0V2.2zm14.4 6.81h5.02V7.71h-5.02v1.3zm3.8 3.9c0-1.1-.9-2.1-2.4-2.1-1.5 0-2.5.91-2.5 2.1h4.9zm-4.92.9c.1 1.2 1.1 1.8 2.32 1.8 1.02 0 1.72-.4 2.02-1.1h2.2c-.4 1.8-2 2.92-4.32 2.92-2.72 0-4.63-2.01-4.63-4.82 0-2.8 1.9-4.8 4.63-4.8 2.7 0 4.4 1.8 4.4 4.6v1.4h-6.62z" />
  </svg>
);

export function Footer() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  const smoothedProgress = useSpring(scrollYProgress, { damping: 25, stiffness: 120 });

  const imageScale = useTransform(smoothedProgress, [0, 1], [1.15, 1]);
  const overlayOpacity = useTransform(smoothedProgress, [0, 1], [0.8, 0]);
  const textX = useTransform(smoothedProgress, [0, 1], ["0%", "-10%"]);

  const marqueeItems = [1, 2, 3, 4, 5];

  return (
    <footer 
      ref={containerRef}
      className="relative h-screen w-full bg-[#111111]"
      style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
    >
      <div className="fixed bottom-0 h-screen w-full bg-[#E8E8E8] text-[#1a1a1a] flex flex-col justify-center items-center pointer-events-none">
          
        {/* KATMAN 1: Arkaplan Fotoğrafı - Tam merkeze oturtulmuş, kenarları keskin kare formatı */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] md:w-[45vw] h-[85vh] md:h-[90vh] z-10 overflow-hidden pointer-events-none flex justify-center items-center">
          <motion.img 
            style={{ scale: imageScale }}
            src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=2454&auto=format&fit=crop" 
            alt="Portrait" 
            className="w-full h-full object-cover grayscale contrast-125 brightness-95 transform-gpu"
          />
        </div>

        {/* KATMAN 2: Devasa Yazı (Mix-blend-difference) - Z-20 ile resmin tam önü */}
        <div className="absolute inset-0 flex flex-col justify-center items-center pointer-events-none z-20 mix-blend-difference overflow-hidden">
          <motion.div 
            style={{ x: textX }}
            className="flex justify-center items-center w-full"
          >
            <span className="text-[16vw] md:text-[18vw] font-display font-medium leading-[0.85] text-white tracking-tighter whitespace-nowrap">
              Out - Reach Out -
            </span>
          </motion.div>
        </div>

        {/* KATMAN 3: Alt ve Üst Sabit İletişim Detayları */}
        {/* Resmin üzerinden ve yazının üzerinden tamamen bağımsız, ekranın köşelerine dayanan kısım */}
        <div className="absolute inset-x-0 bottom-0 z-30 p-6 md:p-10 flex flex-col pointer-events-none">
          <div className="flex flex-col gap-6 md:gap-8 pointer-events-auto">
            {/* Adres Bilgileri */}
            <div className="flex flex-col gap-1 text-[11px] md:text-[13px] tracking-wide text-[#1a1a1a]">
              <p><span className="font-bold mr-1">Office:</span> <span className="opacity-70 font-medium">Ozeanblickstraße, Berlin 10115, Germany</span></p>
              <p><span className="font-bold mr-1">Mail:</span> <a href="mailto:hello@talhaguleryuz.com" className="opacity-70 font-medium hover:opacity-100 transition-opacity">hello@talhaguleryuz.com</a></p>
              <p><span className="font-bold mr-1">Phone:</span> <span className="opacity-70 font-medium">+49 30 12345678</span></p>
            </div>

            {/* Sosyal Medya İkonları */}
            <div className="flex flex-wrap items-center gap-3">
              <a href="#" className="flex items-center justify-center gap-2 group hover:bg-black/10 transition-colors px-4 py-2 border border-black/10 rounded-full bg-transparent">
                <Linkedin className="w-3.5 h-3.5 opacity-80" strokeWidth={2} />
                <span className="font-semibold text-[11px] md:text-xs opacity-90 tracking-wide">LinkedIn</span>
              </a>
              <a href="#" className="flex items-center justify-center gap-2 group hover:bg-black/10 transition-colors px-4 py-2 border border-black/10 rounded-full bg-transparent">
                <BehanceIcon className="w-3.5 h-3.5 opacity-80 fill-current" />
                <span className="font-semibold text-[11px] md:text-xs opacity-90 tracking-wide">Behance</span>
              </a>
              <a href="#" className="flex items-center justify-center gap-2 group hover:bg-black/10 transition-colors px-4 py-2 border border-black/10 rounded-full bg-transparent">
                <Instagram className="w-3.5 h-3.5 opacity-80" strokeWidth={2} />
                <span className="font-semibold text-[11px] md:text-xs opacity-90 tracking-wide">Instagram</span>
              </a>
            </div>
          </div>
        </div>

        {/* Üst Sağ: Yukarı Ok (Ayrı bir fixed container olarak, diğer elementlerle çakışmaması için) */}
        <div className="absolute top-8 right-8 md:top-12 md:right-12 z-30 pointer-events-auto">
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
            className="w-[50px] h-[50px] bg-[#1a1a1a] text-white rounded-full hover:scale-105 transition-transform duration-300 outline-none flex justify-center items-center"
            aria-label="Back to top"
          >
            <ArrowUp className="w-5 h-5 stroke-[1.5]" />
          </button>
        </div>

        {/* KATMAN 4: Global Scroll Karartma (Overlay) - Tam Ekran - Sadece opacity değişir */}
        <motion.div 
          style={{ opacity: overlayOpacity }}
          className="absolute inset-0 bg-[#0a0a0a] z-40 pointer-events-none"
        />
        
      </div>
    </footer>
  );
}
