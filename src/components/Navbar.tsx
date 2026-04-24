import { Link } from 'react-router-dom';
import { motion, useScroll, useMotionValueEvent } from 'motion/react';
import { useState } from 'react';

export function Navbar() {
  const { scrollY } = useScroll();
  const [navHidden, setNavHidden] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setNavHidden(true);
    } else {
      setNavHidden(false);
    }
  });

  return (
    <motion.nav 
      variants={{
        visible: { y: 0, opacity: 1 },
        hidden: { y: "-100%", opacity: 0 }
      }}
      animate={navHidden ? "hidden" : "visible"}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 w-full grid grid-cols-2 md:grid-cols-4 p-6 md:p-8 z-[100] text-white mix-blend-difference font-medium text-sm md:text-base pointer-events-none"
    >
      <div className="text-left flex items-center pointer-events-auto">
        <Link to="/" className="relative group cursor-pointer inline-block">
          <span className="opacity-100 transition-opacity">© Talha Design & Strategy</span>
          <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-white transition-all duration-300 group-hover:w-full"></span>
        </Link>
      </div>
      <div className="text-center hidden md:flex justify-center items-center pointer-events-auto">
        <Link to="/projects" className="relative group cursor-pointer inline-block">
          <span className="opacity-100 transition-opacity">Projects</span>
          <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-white transition-all duration-300 group-hover:w-full"></span>
        </Link>
      </div>
      <div className="text-center hidden md:flex justify-center items-center pointer-events-auto">
        <Link to="/about" className="relative group cursor-pointer inline-block">
          <span className="opacity-100 transition-opacity">About</span>
          <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-white transition-all duration-300 group-hover:w-full"></span>
        </Link>
      </div>
      <div className="text-right flex justify-end items-center pointer-events-auto">
        <div className="relative group cursor-pointer inline-block">
          <span className="opacity-100 transition-opacity">Contact</span>
          <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-white transition-all duration-300 group-hover:w-full"></span>
        </div>
      </div>
    </motion.nav>
  );
}
