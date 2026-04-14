import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Instagram, Github, Mail } from 'lucide-react'
import { Logo3D } from './shared/Logo3D'

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const handleNavClick = (href: string) => {
    setMenuOpen(false)
    const el = document.querySelector(href)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      <motion.nav
        ref={navRef}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 2.5, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
          scrolled
            ? 'py-3 md:py-4 bg-white/95 backdrop-blur-xl border-b border-emerald-100 shadow-sm'
            : 'py-4 md:py-6 bg-white/40 backdrop-blur-sm'
        }`}
      >
        <div className="section-padding flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2 group"
          >
            {/* Mobile: smaller logo */}
            <div className="w-10 h-10 md:w-16 md:h-16 -ml-2 md:-ml-4 transition-transform group-hover:scale-110 duration-500 overflow-visible">
              <Logo3D size={typeof window !== 'undefined' && window.innerWidth < 768 ? 40 : 64} />
            </div>
            <div className="flex flex-col items-start justify-center -ml-1 md:-ml-2">
              <span
                className="font-display font-extrabold text-lg md:text-2xl tracking-tighter text-ink leading-none"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                PRANJAL
              </span>
              <span className="text-[8px] md:text-[10px] font-mono tracking-[0.3em] md:tracking-[0.4em] text-emerald-600 uppercase mt-0.5 md:mt-1 leading-none">
                WEB STUDIO
              </span>
            </div>
          </button>

          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <button
                  onClick={() => handleNavClick(link.href)}
                  className="relative text-sm font-medium text-muted hover:text-emerald-700 transition-colors group"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-500 group-hover:w-full transition-all duration-300" />
                </button>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <div className="hidden md:block">
            <button
              onClick={() => handleNavClick('#contact')}
              className="btn-primary text-sm px-6 py-3"
            >
              <span>Let's Talk</span>
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden w-10 h-10 flex items-center justify-center text-ink relative z-[102]"
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait">
              {menuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={24} className="text-white" />
                </motion.div>
              ) : (
                <motion.div
                  key="open"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu size={24} />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </motion.nav>

      {/* ═══ Mobile Full-Screen Immersive Menu ═══ */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[99] mobile-nav-overlay md:hidden flex flex-col items-center justify-center"
            style={{
              background: 'linear-gradient(165deg, #0A1F14 0%, #061210 60%, #0A1F14 100%)',
            }}
          >
            {/* Decorative background glow */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-emerald-900/40 blur-[120px]" />
            </div>

            {/* Mini 3D Emerald at top */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5, ease: 'backOut' }}
              className="mb-8"
            >
              <Logo3D size={80} />
            </motion.div>

            {/* Navigation Links */}
            <nav className="flex flex-col items-center gap-6">
              {NAV_LINKS.map((link, i) => (
                <motion.button
                  key={link.href}
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.15 + i * 0.07, duration: 0.4, ease: 'easeOut' }}
                  onClick={() => handleNavClick(link.href)}
                  className="text-3xl font-display font-bold text-white/90 hover:text-emerald-400 transition-colors duration-300 tracking-tight"
                  style={{ fontFamily: 'Playfair Display, serif' }}
                >
                  {link.label}
                </motion.button>
              ))}
            </nav>

            {/* CTA Button */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.65, duration: 0.4 }}
              className="mt-10"
            >
              <button
                onClick={() => handleNavClick('#contact')}
                className="btn-primary px-10 py-4 text-base"
              >
                <span>Let's Talk</span>
              </button>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.4 }}
              className="absolute bottom-10 flex gap-6"
            >
              <a
                href="https://www.instagram.com/pranjalwebstudio/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-full border border-emerald-700 flex items-center justify-center text-emerald-400 hover:bg-emerald-800 transition-all"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://github.com/PS1852"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-full border border-emerald-700 flex items-center justify-center text-emerald-400 hover:bg-emerald-800 transition-all"
                aria-label="GitHub"
              >
                <Github size={18} />
              </a>
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=pranjalshrivastav5@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-full border border-emerald-700 flex items-center justify-center text-emerald-400 hover:bg-emerald-800 transition-all"
                aria-label="Email"
              >
                <Mail size={18} />
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
