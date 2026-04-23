import { motion, AnimatePresence, useInView } from 'motion/react';
import { Container, SectionSubtitle } from './ui/Layout';
import { useRef, useEffect, useState } from 'react';

const services = [
  {
    category: "Branding & Marketing",
    desc: "Branding that builds trust and drives loyalty through clear visuals and messaging, into an unforgettable online experience.",
    number: "01",
    items: [
      "Brand Strategy and Messaging",
      "Logo Design",
      "Visual Identity",
      "Brand Guidelines & Frameworks",
      "Marketing materials",
      "Motion Design"
    ]
  },
  {
    category: "Website Design",
    desc: "Not just about aesthetics, but about developing logical, scalable design systems that are precisely tailored to the web and app application.",
    number: "02",
    items: [
      "Landing Pages",
      "Corporate Websites",
      "Blogs",
      "E-commerce",
      "Complex Websites"
    ]
  },
  {
    category: "Web Development",
    desc: "User-focused app design that maximizes usability and encourages retention.",
    number: "03",
    items: [
      "Framer, Webflow, or WordPress Builds",
      "CMS Integration",
      "SEO Optimization",
      "Site Migrations"
    ]
  }
];

function ServiceBlock({ 
  service, 
  idx, 
  activeIndex, 
  setActiveIndex 
}: { 
  service: typeof services[0]; 
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
      className={`min-h-[70vh] md:min-h-[85vh] flex flex-col justify-center py-12 transition-opacity duration-700 ${isActive ? 'opacity-100' : 'opacity-30'}`}
    >
      <h2 className="text-5xl md:text-6xl font-display font-bold text-white mb-6">
        {service.category}
      </h2>
      <p className="text-[1.1rem] text-gray-400 mb-16 max-w-2xl leading-relaxed">
        {service.desc}
      </p>

      <div className="flex flex-col w-full">
        {service.items.map((item, i) => (
          <div 
            key={i} 
            className="flex items-center py-5 border-b border-white/10 w-full"
          >
            <span className="text-lg font-normal text-white tracking-wide">
              {item}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Services() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section id="services" className="bg-[#0a0a0a] min-h-screen py-24 md:py-32 border-t border-border-subtle relative">
      <SectionSubtitle>Services</SectionSubtitle>
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-24 relative mt-12 md:mt-24">
          
          {/* LEFT COLUMN: Sticky Number (01, 02...) */}
          <div className="md:col-span-4 lg:col-span-4 relative">
            <div className="sticky top-32 flex flex-col items-start h-auto w-full mb-12 md:mb-0" style={{ perspective: "1000px" }}>
              <div className="overflow-hidden h-[8rem] sm:h-[12rem] md:h-[16rem] flex items-center">
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
                    className="text-[12rem] sm:text-[16rem] md:text-[20rem] leading-none font-display font-light text-transparent [-webkit-text-stroke:1px_white] tracking-tighter"
                    style={{ transformOrigin: "center center" }}
                  >
                    {services[activeIndex].number}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Service Lists */}
          <div className="md:col-span-8 lg:col-span-8 flex flex-col">
            {services.map((service, idx) => (
              <ServiceBlock 
                key={idx} 
                service={service} 
                idx={idx} 
                activeIndex={activeIndex}
                setActiveIndex={setActiveIndex} 
              />
            ))}
          </div>
          
        </div>
      </Container>
    </section>
  );
}
