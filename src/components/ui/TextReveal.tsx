import { motion, Variants } from 'motion/react';

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
}

export function TextReveal({ text, className = "", delay = 0 }: TextRevealProps) {
  const words = text.split(" ");

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03, // Hızlı ve pürüzsüz stagger
        delayChildren: delay,
      },
    },
  };

  const child: Variants = {
    hidden: {
      opacity: 0,
      y: 20,
      rotate: 5,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotate: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.p
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-15%" }}
      className={`flex flex-wrap ${className}`}
    >
      {words.map((word, index) => (
        <span key={index} className="overflow-hidden inline-block mr-1 mb-1">
          <motion.span variants={child} className="inline-block">
            {word}
          </motion.span>
        </span>
      ))}
    </motion.p>
  );
}
