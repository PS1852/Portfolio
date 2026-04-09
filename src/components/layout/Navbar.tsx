import { useState, useEffect } from 'react';
import { owner } from '@/data/portfolio';
import { MagneticButton } from '@/components/shared/MagneticButton';
import { gsap } from '@/lib/gsap';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Work', href: '#projects' },
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Skills', href: '#skills' },
    { name: 'Contact', href: '#contact' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animation on load
  useEffect(() => {
    gsap.fromTo('.nav-item', 
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out', delay: 1.5 }
    );
  }, []);

  // Mobile menu animation
  useEffect(() => {
    if (mobileMenuOpen) {
      gsap.to('.mobile-menu', { clipPath: 'circle(150% at calc(100% - 40px) 40px)', duration: 0.8, ease: 'power3.inOut' });
      gsap.fromTo('.mobile-link', 
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, delay: 0.3 }
      );
    } else {
      gsap.to('.mobile-menu', { clipPath: 'circle(0% at calc(100% - 40px) 40px)', duration: 0.8, ease: 'power3.inOut' });
    }
  }, [mobileMenuOpen]);

  return (
    <>
      <header className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${scrolled ? 'bg-[#0A0A0A]/70 backdrop-blur-[20px] saturate-[1.8] border-b border-white/[0.08] py-4' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          <a href="#" className="nav-item font-display font-semibold text-2xl tracking-tighter text-white flex items-center gap-2">
             <span className="text-luxury-gold">{owner.brandName}</span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                className="nav-item text-sm font-sans font-medium text-white/80 hover:text-white relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-luxury-gold transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          <MagneticButton className="nav-item hidden md:block">
            <a href="#contact" className="px-6 py-2 border border-white/20 rounded-full text-sm font-medium hover:bg-white hover:text-black transition-colors duration-300">
              Let's Talk
            </a>
          </MagneticButton>

          {/* Mobile menu button */}
          <button 
            className="nav-item md:hidden relative z-50 w-10 h-10 flex flex-col justify-center items-center gap-1.5"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className={`w-6 h-[2px] bg-white transition-transform duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-[8px]' : ''}`} />
            <span className={`w-6 h-[2px] bg-white transition-opacity duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`} />
            <span className={`w-6 h-[2px] bg-white transition-transform duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-[8px]' : ''}`} />
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div 
        className="mobile-menu fixed inset-0 z-30 bg-[#0A0A0A] flex flex-col justify-center px-8"
        style={{ clipPath: 'circle(0% at calc(100% - 40px) 40px)' }}
      >
        <nav className="flex flex-col gap-6">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="mobile-link text-4xl font-display text-white"
            >
              {link.name}
            </a>
          ))}
        </nav>
      </div>
    </>
  );
}
