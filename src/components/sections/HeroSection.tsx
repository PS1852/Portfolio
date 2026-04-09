import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import { owner } from '@/data/portfolio';
import { MagneticButton } from '@/components/shared/MagneticButton';
import { NoiseBg } from '@/components/shared/NoiseBg';

export function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    // We delay the animation slightly to allow LoadingScreen to finish
    const tl = gsap.timeline({ delay: 3.5 });

    // Name stagger
    const chars = nameRef.current?.querySelectorAll('.char');
    if (chars) {
      tl.fromTo(chars, 
        { y: 120, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, stagger: 0.04, ease: 'power4.out' }
      );
    }

    // Subtitle
    tl.fromTo(subtitleRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
      '-=0.8'
    );

    // Gold line
    tl.fromTo(lineRef.current,
      { width: 0 },
      { width: 120, duration: 1, ease: 'power3.inOut' },
      '-=0.6'
    );

    // Buttons
    const btns = buttonsRef.current?.children;
    if (btns) {
      tl.fromTo(btns,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out' },
        '-=0.6'
      );
    }

    // Scroll indicator pulse
    if (scrollIndicatorRef.current) {
      gsap.to(scrollIndicatorRef.current.querySelector('.pulsing-line'), {
        y: 20,
        opacity: 0,
        duration: 1.5,
        repeat: -1,
        ease: 'power2.inOut',
        delay: 4
      });
    }

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section ref={containerRef} id="hero" className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <img 
          src="https://images.unsplash.com/photo-lU1pEjWZzXg?w=2400&q=90&auto=format&fit=crop" 
          alt="Luxury Interior" 
          className="w-full h-full object-cover"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/60 to-[#0A0A0A]/95" />
      </div>

      <NoiseBg />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full flex flex-col items-center text-center mt-20">
        <h1 ref={nameRef} className="text-display text-white mb-6 overflow-hidden flex flex-wrap justify-center">
          {owner.fullName.split('').map((char, i) => (
            <span key={i} className="char inline-block">{char === ' ' ? '\u00A0' : char}</span>
          ))}
        </h1>

        <p ref={subtitleRef} className="text-white/80 font-sans text-lg md:text-xl max-w-2xl font-light tracking-wide mb-8">
          {owner.bio}
        </p>

        <div className="w-[120px] h-[1px] bg-luxury-gold mb-10 overflow-hidden">
          <div ref={lineRef} className="w-full h-full bg-luxury-gold" />
        </div>

        <div ref={buttonsRef} className="flex gap-6">
          <MagneticButton>
            <a href="#projects" className="px-8 py-4 bg-luxury-gold text-black font-semibold rounded-none tracking-wider text-sm hover:bg-luxury-goldLight transition-colors">
              VIEW WORK
            </a>
          </MagneticButton>
          <MagneticButton>
            <a href="#contact" className="px-8 py-4 border border-white/20 text-white font-semibold rounded-none tracking-wider text-sm glass-panel hover:bg-white/10 transition-colors">
              GET IN TOUCH
            </a>
          </MagneticButton>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div ref={scrollIndicatorRef} className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4">
        <span className="text-micro text-white/50 tracking-widest rotate-90 origin-center translate-y-[-20px]">SCROLL</span>
        <div className="w-[1px] h-16 bg-white/20 relative overflow-hidden">
          <div className="pulsing-line absolute top-0 left-0 w-full h-[30%] bg-luxury-gold" />
        </div>
      </div>
    </section>
  );
}
