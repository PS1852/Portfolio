import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import { experience } from '@/data/portfolio';

export function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current || !lineRef.current) return;

    // Line drawing down the center
    gsap.fromTo(lineRef.current,
      { height: 0 },
      {
        height: '100%',
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 50%',
          end: 'bottom 80%',
          scrub: true,
        }
      }
    );

    // Cards sliding in
    cardsRef.current.forEach((card, index) => {
      if (!card) return;
      const isEven = index % 2 === 0;
      const xOffset = isEven ? -50 : 50;

      gsap.fromTo(card,
        { opacity: 0, x: xOffset },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 80%',
            // Adds active glow class when scrolled into view
            toggleClass: 'active-glow'
          }
        }
      );
    });
  }, []);

  return (
    <section ref={sectionRef} id="experience" className="relative w-full py-32 bg-[#0A0A0A] text-white">
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        
        <div className="text-center mb-24">
          <span className="text-micro text-luxury-gold mb-4 block">CAREER TRAJECTORY</span>
          <h2 className="text-h2 font-display">Experience</h2>
        </div>

        <div className="relative">
          {/* Timeline Center Line Background */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[1px] bg-white/10 md:-translate-x-1/2" />
          
          {/* Animated Timeline Line */}
          <div 
            ref={lineRef} 
            className="absolute left-4 md:left-1/2 top-0 w-[2px] bg-luxury-gold md:-translate-x-1/2 origin-top" 
          />

          <div className="space-y-16">
            {experience.map((exp, index) => {
              const isEven = index % 2 === 0;
              return (
                <div 
                  key={index} 
                  className={`relative flex flex-col md:flex-row items-start ${isEven ? 'md:flex-row-reverse' : ''}`}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-luxury-gold rounded-full -translate-x-[7px] md:-translate-x-1/2 top-6 z-10 shadow-[0_0_15px_rgba(201,168,76,0.6)]" />

                  {/* Empty space for alternating layout */}
                  <div className="hidden md:block md:w-1/2" />

                  <div 
                    ref={el => { cardsRef.current[index] = el; }}
                    className={`ml-12 md:ml-0 md:w-1/2 ${isEven ? 'md:pr-16 text-left md:text-right' : 'md:pl-16 text-left'} `}
                  >
                    <div className="glass-panel p-8 md:p-10 transition-all duration-500 hover:border-luxury-gold/50 relative overflow-hidden group">
                      
                      {/* Active glow indicator line */}
                      <div className={`absolute top-0 bottom-0 w-1 bg-luxury-gold transition-transform duration-500 origin-bottom scale-y-0 group-[.active-glow]:scale-y-100 ${isEven ? 'right-0' : 'left-0'}`} />

                      <div className="text-luxury-gold font-mono text-sm tracking-widest mb-3">{exp.dates}</div>
                      <h3 className="text-xl md:text-2xl font-display font-semibold mb-1">{exp.role}</h3>
                      <div className="text-white/60 font-sans mb-6 uppercase tracking-wider text-xs">{exp.company}</div>
                      <p className="text-white/70 leading-relaxed font-light text-sm md:text-base">
                        {exp.description}
                      </p>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
