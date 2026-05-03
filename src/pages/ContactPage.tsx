import { motion } from 'motion/react';
import { Footer } from '../components/Footer';
import { PageTransition } from '../components/PageTransition';

export function ContactPage() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <PageTransition>
      <div className="w-full min-h-screen pt-32 md:pt-48 pb-0">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-[60px] w-full flex flex-col lg:flex-row justify-between gap-16 lg:gap-32 mb-32">
          {/* Left Side: Title */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full lg:w-1/3 lg:sticky lg:top-32 h-fit"
          >
            <h1 className="text-6xl sm:text-[80px] lg:text-[100px] font-display font-bold tracking-tighter leading-none text-white">
              Reach Out
            </h1>
          </motion.div>

          {/* Right Side: Form and Info */}
          <motion.div 
            variants={container}
            initial="hidden"
            animate="show"
            className="w-full lg:w-1/2 flex flex-col pt-4"
          >
            <motion.h2 variants={item} className="text-3xl md:text-[40px] font-display font-bold leading-[1.2] tracking-tight text-white mb-16">
              Tell me about your idea.<br />
              I'll take it from there.
            </motion.h2>

            <motion.form variants={item} className="flex flex-col gap-10 w-full max-w-xl">
              <div className="relative group">
                <input 
                  type="text" 
                  placeholder="Your name" 
                  className="w-full bg-transparent border-b border-white/20 pb-4 text-white placeholder-white/50 focus:outline-none focus:border-white transition-colors text-base"
                />
              </div>
              
              <div className="relative group">
                <input 
                  type="text" 
                  placeholder="Job title" 
                  className="w-full bg-transparent border-b border-white/20 pb-4 text-white placeholder-white/50 focus:outline-none focus:border-white transition-colors text-base"
                />
              </div>
              
              <div className="relative group">
                <input 
                  type="email" 
                  placeholder="Email" 
                  className="w-full bg-transparent border-b border-white/20 pb-4 text-white placeholder-white/50 focus:outline-none focus:border-white transition-colors text-base"
                />
              </div>
              
              <div className="relative group mb-4">
                <textarea 
                  placeholder="Message" 
                  rows={1}
                  className="w-full bg-transparent border-b border-white/20 pb-4 text-white placeholder-white/50 focus:outline-none focus:border-white transition-colors resize-y min-h-[40px] text-base"
                />
              </div>

              <motion.div variants={item}>
                <button 
                  type="button" 
                  className="bg-white text-black font-semibold py-3 px-8 rounded-full hover:bg-white/90 transition-colors w-fit text-sm"
                >
                  Send Message
                </button>
              </motion.div>
            </motion.form>

            {/* Contact Details */}
            <motion.div variants={item} className="mt-24 flex flex-col gap-1.5 text-sm md:text-[15px] text-[#888888]">
              <p><span className="text-white font-semibold">Office:</span> Ozeanblickstraße, Berlin 10115, Germany</p>
              <p><span className="text-white font-semibold">Mail:</span> hello@alexgraham.com</p>
              <p><span className="text-white font-semibold">Phone:</span> +49 30 12345678</p>
            </motion.div>

            {/* Social Links */}
            <motion.div variants={item} className="mt-12 flex items-center gap-8 text-sm md:text-[15px] text-[#888888]">
              <a href="#" className="flex items-center gap-2 hover:text-white transition-colors group">
                <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:border-white transition-colors">
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                </div>
                LinkedIn
              </a>
              <a href="#" className="flex items-center gap-2 hover:text-white transition-colors group">
                <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:border-white transition-colors">
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
                </div>
                Twitter
              </a>
              <a href="#" className="flex items-center gap-2 hover:text-white transition-colors group">
                <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:border-white transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                </div>
                Instagram
              </a>
            </motion.div>
          </motion.div>
        </div>
        <Footer />
      </div>
    </PageTransition>
  );
}
