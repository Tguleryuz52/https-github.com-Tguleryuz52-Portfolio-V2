import { motion } from 'motion/react';

const logos = [
  { name: "amara", url: "https://upload.wikimedia.org/wikipedia/commons/4/4b/Amara_Logo.svg" }, // Placeholders, using text for reliability as logos might fail 
  { name: "treva", url: "" },
  { name: "FOX HUB", url: "" },
  { name: "Tower", url: "" },
];

export function Marquee() {
  return (
    <div className="py-12 border-t border-b border-border-subtle overflow-hidden flex whitespace-nowrap bg-bg-dark">
      <motion.div 
        animate={{ x: [0, -1000] }}
        transition={{ repeat: Infinity, ease: "linear", duration: 20 }}
        className="flex gap-24 items-center shrink-0 pr-24"
      >
        {/* Duplicate the list for seamless loop */}
        {[...logos, ...logos, ...logos].map((logo, i) => (
          <div key={i} className="flex items-center gap-2 opacity-50 hover:opacity-100 transition-opacity grayscale hover:grayscale-0">
             {/* Using generic geometric icon to simulate logos */}
             <div className="w-6 h-6 bg-current rounded-full" style={{ borderRadius: i % 2 === 0 ? '50%' : '2px'}} />
             <span className="text-2xl font-display font-bold tracking-wider">{logo.name}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
