import { useState } from 'react'
import { useLenis } from '@/hooks/useLenis'
import LoadingScreen from '@/components/LoadingScreen'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import HeroSection from '@/sections/HeroSection'
import AboutSection from '@/sections/AboutSection'
import ExperienceSection from '@/sections/ExperienceSection'
import ProjectsSection from '@/sections/ProjectsSection'
import SkillsSection from '@/sections/SkillsSection'
import TestimonialsSection from '@/sections/TestimonialsSection'
import ContactSection from '@/sections/ContactSection'

export default function App() {
  const [loaded, setLoaded] = useState(false)

  // Initialize smooth scrolling
  useLenis()

  return (
    <>
      {/* Noise texture overlay */}
      <div className="noise-overlay" aria-hidden="true" />

      {/* Loading Screen */}
      {!loaded && <LoadingScreen onComplete={() => setLoaded(true)} />}

      {/* Main site */}
      <div
        className="transition-opacity duration-500"
        style={{ opacity: loaded ? 1 : 0 }}
      >
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
    </>
  )
}
