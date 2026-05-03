import { motion, useScroll, useTransform, MotionValue, AnimatePresence, useInView } from 'motion/react';
import { useRef, useState, useEffect } from 'react';
import { Footer } from '../components/Footer';
import { SectionSubtitle } from '../components/ui/Layout';
import { PageTransition } from '../components/PageTransition';

const experiences = [
  { name: 'Feron', role: 'Founder & Product Lead', date: '2024 - Günümüz', id: '01' },
  { name: 'Nevera Development', role: 'Industrial Designer & 3D Artist', date: '2023 - 2024', id: '02' },
  { name: 'Nevera Development', role: 'Robot Design Lead', date: '2023 - 2024', id: '03' },
  { name: 'İKÜ Asimov Technology', role: 'UI/UX Designer', date: '2023 - 2024', id: '04' },
];

export function AboutPage() {
  return (
    <PageTransition>
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
              <h1 className="text-4xl md:text-[56px] lg:text-[64px] leading-[1.1] font-display font-bold tracking-tight md:tracking-tighter text-white">
                <motion.img 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop" 
                  alt="Talha Güleryüz" 
                  className="float-left w-16 h-20 md:w-[72px] md:h-[96px] object-cover rounded-[6px] grayscale mr-8 md:mr-12 mb-2 mt-2" 
                />
                Ben Talha Güleryüz. Fikirleri kusursuz estetik ve katıksız mühendislikle birleştiren bir Tasarım Mühendisi ve 3D Sanatçısıyım. Sadece ekranda güzel duran değil, derinliği olan ve yaşayan dijital deneyimler inşa ediyorum.
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
                    Kariyerim boyunca her zaman iki farklı dünyanın kesişiminde yer aldım: Sınır tanımayan görsel estetik ve tavizsiz bir mühendislik vizyonu. Geçmişte Nevera Development Solutions'da Robot Tasarım Liderliği yaparak fiziksel dünya ile dijital evren arasındaki köprüleri kurdum. İKÜ Asimov'da arayüzleri kullanıcı odaklı deneyimlere dönüştürdüm.
                  </p>
              </div>
              <div className="md:col-span-4">
                  <p className="text-[#A7A0A0] text-[16px] md:text-[18px] leading-relaxed">
                    Şu anda Feron'da Kurucu ve Ürün Lideri olarak vizyonumu global ölçekte hayata geçiriyorum. İster Unreal Engine 5 ile tasarlanmış hiper-gerçekçi bir 3D evren, ister Framer ve Next.js ile yaratılmış organik bir arayüz olsun; tek bir kuralım var: Sıradanlığa yer yok.
                  </p>
              </div>
              <div className="md:col-span-4 flex justify-start md:justify-end h-full items-end pt-8 md:pt-0">
                  <button 
                    data-cursor-text="Reach"
                    className="relative overflow-hidden px-8 py-3 rounded-full border border-white/20 text-white text-[15px] font-medium group cursor-pointer"
                  >
                    <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full opacity-0 group-hover:opacity-100 group-hover:scale-[25] transition-all duration-500 ease-out z-0"></span>
                    <span className="relative z-10 group-hover:text-[#0a0a0a] transition-colors duration-300">Benimle Çalışın</span>
                  </button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Career and Experience */}
        <section className="w-full pt-12 md:pt-16 pb-0 relative border-t border-white/10 mt-12">
          <SectionSubtitle>Kariyer & Deneyim</SectionSubtitle>

          <div className="flex flex-col w-full mt-8 md:mt-12">
            {experiences.map((exp, i) => (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                key={i} 
                className="group relative w-full border-b border-white/10 overflow-hidden cursor-pointer hover:bg-[#e53935] transition-colors duration-300"
              >
                <div className="w-full px-6 md:px-12 py-6 flex flex-col md:flex-row justify-between items-start md:items-center">
                  <div className="relative z-10 w-full md:w-1/3">
                    <span className="font-display font-bold text-[20px] md:text-[24px] text-white transition-colors duration-300">
                      {exp.name}
                    </span>
                  </div>
                  
                  <div className="relative z-10 w-full md:w-1/3 text-left md:text-left mt-2 md:mt-0">
                    <span className="font-sans font-medium text-[16px] md:text-[18px] text-[#888888] group-hover:text-white transition-colors duration-300">
                      {exp.role}
                    </span>
                  </div>

                  <div className="relative z-10 w-full md:w-1/3 flex justify-between md:justify-end md:gap-32 items-center mt-4 md:mt-0">
                    <span className="font-mono text-[14px] md:text-[16px] text-[#888888] group-hover:text-white transition-colors duration-300">
                      {exp.date}
                    </span>
                    <div className="relative flex items-center justify-center w-6 h-6 hidden md:flex">
                      <span className="font-mono text-[14px] md:text-[16px] text-[#888888] absolute transition-all duration-300 group-hover:opacity-0 group-hover:scale-75">
                        {exp.id}
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

        {/* Facts / Expertise */}
        <FactsSection />

        <Footer />
      </div>
    </PageTransition>
  );
}

const factsData = [
  {
    number: "3D",
    title: "Görselleştirme",
    desc: "Unreal Engine 5, Blender, Cinema 4D, Houdini ve Fusion 360 ile sadece modeller değil, yaşayan ekosistemler tasarlıyorum. Hiper-gerçekçilikten stilize evrenlere kadar görsel hikayeciliğin sınırlarını zorluyorum.",
    hollow: true
  },
  {
    number: "UX",
    title: "UI/UX & Etkileşim",
    desc: "Figma, Framer, Spline ve Lottie kullanarak statik arayüzleri, kullanıcıyla konuşan organik ve nefes alan sistemlere dönüştürüyorum. Dijital ürünlerin sadece kullanılmasını değil, hissedilmesini sağlıyorum.",
    hollow: false
  },
  {
    number: "DEV",
    title: "Kod & Mimari",
    desc: "React Native, Next.js, Node.js ve Supabase yeteneklerimle tasarımlarımı mükemmel bir şekilde hayata geçiriyorum. Tasarım ile kod arasındaki o kalın duvarları yıkıp, performanslı ve ölçeklenebilir ürünler üretiyorum.",
    hollow: true
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
      <h3 className="text-4xl md:text-[56px] font-display font-bold text-white tracking-tight mb-6">{fact.title}</h3>
      <p className="text-[#888888] text-lg md:text-xl leading-relaxed max-w-lg">
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
          <span className="text-white/30">//</span> Uzmanlık Alanlarım
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-24 relative">
        {/* LEFT COLUMN: Sticky Number */}
        <div className="md:col-span-5 lg:col-span-5 relative hidden md:block">
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
                  className={`text-[8rem] lg:text-[14rem] xl:text-[16rem] leading-none font-display font-bold tracking-tighter slashed-zero ${factsData[activeIndex].hollow ? 'text-transparent' : 'text-white'}`}
                  style={{ transformOrigin: "center center", ...(factsData[activeIndex].hollow ? { WebkitTextStroke: '2px white' } : {}) }}
                >
                  {factsData[activeIndex].number}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Fact Texts */}
        <div className="md:col-span-12 md:col-span-7 lg:col-span-7 flex flex-col pt-8 md:pt-0">
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
    { text: "Geleceğin" }, { text: "dijital" }, { text: "dünyasını", br: true },
    { text: "şekillendiren," }, { text: "cesur,", accent: true }, { text: "estetik", accent: true, br: true },
    { text: "ve" }, { text: "mühendislik" }, { text: "harikası" }, { text: "deneyimler", accent: true, br: true },
    { text: "inşa", accent: true }, { text: "ediyorum.", accent: true }
  ];

  return (
    <section ref={containerRef} className="w-full h-[80vh] md:h-[100vh] relative mt-0 overflow-hidden flex items-center justify-center">
       <div className="absolute inset-0 w-full h-full">
         <img 
           src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=2000&auto=format&fit=crop" 
           alt="Showcase Portrait" 
           className="w-full h-full object-cover grayscale opacity-30" 
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
        className={`absolute left-0 top-0 ${isAccent ? "text-[#e53935]" : "text-white"}`}
      >
        {children}
      </motion.span>
    </span>
  );
}
