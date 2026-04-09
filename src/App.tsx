import { useState, useEffect } from 'react';
import Lenis from 'lenis';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { LoadingScreen } from '@/components/shared/LoadingScreen';
import { CursorFollower } from '@/components/shared/CursorFollower';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

import { HeroSection } from '@/components/sections/HeroSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { ExperienceSection } from '@/components/sections/ExperienceSection';
import { ProjectsSection } from '@/components/sections/ProjectsSection';
import { SkillsSection } from '@/components/sections/SkillsSection';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { ContactSection } from '@/components/sections/ContactSection';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initialize Lenis Smooth Scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    // Synchronize Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  return (
    <>
      <CursorFollower />
      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      
      {!loading && (
        <div className="flex flex-col min-h-screen selection:bg-luxury-gold selection:text-black">
          <Navbar />
          <main>
            <HeroSection />
            <AboutSection />
            <ExperienceSection />
            <ProjectsSection />
            <SkillsSection />
            <TestimonialsSection />
            <ContactSection />
          </main>
          <Footer />
        </div>
      )}
    </>
  );
}

export default App;
