import { motion, useMotionValue, useSpring } from 'motion/react';
import { Container, SectionSubtitle } from './ui/Layout';

const projects = [
  {
    year: "2024",
    title: "Formula Vintage",
    desc: "For Formula Vintage, we crafted a design that honors the rich heritage of classic cars while adding a modern twist. Combining timeless elegance with sleek, contemporary elements, we created an experience that appeals to both enthusiasts and newcomers, celebrating the past with a fresh perspective.",
    tags: ["Landing Page", "Mobile App", "Redesign"],
    image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=2264&auto=format&fit=crop"
  },
  {
    year: "2024",
    title: "Sprey Zest",
    desc: "For Sprey Zest, we took a playful, bold approach to packaging and branding. Instead of following the typical fresh or clean aesthetic, we infused energy and personality into every detail, making the product stand out on shelves and bringing a burst of excitement to the consumer experience.",
    tags: ["Website Design", "Branding"],
    image: "https://images.unsplash.com/photo-1611078489935-0cb964de46d6?q=80&w=2274&auto=format&fit=crop"
  },
  {
    year: "2020",
    title: "Super Pro",
    desc: "For Super-Pro, we redefined what it means to be a professional by focusing on the mindset and determination behind success, not just the achievements. The design highlighted the drive and passion of athletes, creating a bold, empowering experience that resonated with anyone striving for excellence.",
    tags: ["Desktop App", "Mobile App"],
    image: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?q=80&w=2340&auto=format&fit=crop"
  },
  {
    year: "2024",
    title: "Architech Buildings",
    desc: "We redefined the concept of modern living by creating a design that challenges conventional boundaries. Focusing on comfort, functionality, and unexpected elements, we transformed the ordinary into something extraordinary, making everyday experiences feel fresh and unique.",
    tags: ["Mobile App", "Branding", "Website Design"],
    image: "https://images.unsplash.com/photo-1512498559096-736b0de318f7?q=80&w=2609&auto=format&fit=crop"
  }
];

// Proje Kartı Bileşeni
function ProjectCard({ project }: { project: typeof projects[0] }) {
  // Fare Takip Fizikleri
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const opacity = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 300 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    cursorX.set(e.clientX - rect.left - 48); // 48, w-24'ün yarısı (merkezleme)
    cursorY.set(e.clientY - rect.top - 48);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-12 py-20 border-b border-white/10">
      
      {/* SOL TARAF: Görsel ve Manyetik Buton (7 Sütun) */}
      <div 
        className="md:col-span-7 relative h-[60vh] overflow-hidden rounded-xl cursor-none group"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => opacity.set(1)}
        onMouseLeave={() => opacity.set(0)}
      >
        {/* Resmin hover'da kendi içinde büyümesi. 
            React/Vite projesi olduğundan Next/Image yerine img kullanıyoruz ama fill ile tamamen aynı davranış. */}
        <img 
          src={project.image} 
          alt={project.title} 
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-[800ms] ease-out group-hover:scale-105" 
        />
        
        {/* Fıreyi Takip Eden Kırmızı Buton */}
        <motion.div
          style={{ x: cursorXSpring, y: cursorYSpring, opacity }}
          className="absolute top-0 left-0 w-24 h-24 bg-[#e53935] rounded-full flex items-center justify-center text-white z-20 pointer-events-none font-medium"
        >
          View
        </motion.div>
      </div>

      {/* SAĞ TARAF: Proje Detayları (5 Sütun) */}
      <div className="md:col-span-5 flex flex-col justify-center">
        <p className="text-gray-500 font-mono text-sm mb-4">({project.year})</p>
        <h2 className="text-5xl lg:text-6xl font-display font-medium text-white mb-6 tracking-tight leading-none">{project.title}</h2>
        <p className="text-gray-400 text-lg leading-relaxed mb-10">
          {project.desc}
        </p>
        
        {/* Kategoriler */}
        <div className="flex flex-col">
          {project.tags.map((tag, i) => (
            <div key={i} className="border-t border-white/10 py-4 text-white text-lg">
              {tag}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

export function Projects() {
  return (
    <section id="projects" className="pt-24 pb-12 md:pt-32 md:pb-24 bg-[#111111]">
      <Container>
        <div className="mb-12">
          <SectionSubtitle>Projects</SectionSubtitle>
        </div>

        <div className="w-full border-t border-white/10">
          {projects.map((project, idx) => (
            <ProjectCard key={idx} project={project} />
          ))}
        </div>
      </Container>
    </section>
  );
}
