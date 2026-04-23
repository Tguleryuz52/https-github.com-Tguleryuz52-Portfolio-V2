import { Hero } from '../components/Hero';
import { Intro } from '../components/Intro';
import { Services } from '../components/Services';
import { Projects } from '../components/Projects';
import { Testimonials } from '../components/Testimonials';
import { Marquee } from '../components/Marquee';
import { Footer } from '../components/Footer';

export function Home() {
  return (
    <div className="bg-bg-dark text-white min-h-screen font-sans selection:bg-brand-accent selection:text-white">
      <main>
        <Hero />
        <Intro />
        <Services />
        <Projects />
        <Testimonials />
        <Marquee />
      </main>
      <Footer />
    </div>
  );
}
