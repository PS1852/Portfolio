import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import { owner } from '@/data/portfolio';
import { AnimatedText } from '@/components/shared/AnimatedText';
import { CounterNumber } from '@/components/shared/CounterNumber';

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    // Marquee animation
    if (marqueeRef.current) {
      gsap.to(marqueeRef.current, {
        xPercent: -50,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        }
      });
    }

    // Image reveal
    if (imageRef.current) {
      gsap.fromTo(imageRef.current,
        { clipPath: 'inset(100% 0 0 0)' },
        {
          clipPath: 'inset(0% 0 0 0)',
          duration: 1.5,
          ease: 'power3.inOut',
          scrollTrigger: {
            trigger: imageRef.current,
            start: 'top 80%',
          }
        }
      );
    }

    // Gold line drawing
    if (lineRef.current) {
      gsap.fromTo(lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 1.5,
          ease: 'power2.out',
          transformOrigin: 'top center',
          scrollTrigger: {
            trigger: lineRef.current,
            start: 'top 75%',
          }
        }
      );
    }
  }, []);

  return (
    <section ref={sectionRef} id="about" className="relative w-full py-32 bg-[#F7F6F3] text-black overflow-hidden">
      {/* Marquee */}
      <div className="absolute top-0 left-0 w-[200vw] overflow-hidden whitespace-nowrap opacity-5 pointer-events-none mt-12">
        <div ref={marqueeRef} className="text-[15vw] font-display font-bold leading-none tracking-tighter">
          {owner.name.toUpperCase()} CREATIVE {owner.name.toUpperCase()} CREATIVE {owner.name.toUpperCase()} CREATIVE
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 mt-12 md:mt-24">
        <div className="grid md:grid-cols-12 gap-12 lg:gap-24 items-center">
          
          {/* Left: Image */}
          <div className="md:col-span-5 relative h-[60vh] md:h-[80vh]">
            <div ref={imageRef} className="absolute inset-0 w-full h-full overflow-hidden bg-black">
              <img 
                src="https://images.unsplash.com/photo-tlG_fFfWF98?w=1200&q=85&auto=format&fit=crop" 
                alt="Creative Direction" 
                className="w-full h-full object-cover opacity-90"
              />
            </div>
            {/* Minimalist corner accents */}
            <div className="absolute top-[-1px] left-[-1px] w-6 h-[1px] bg-luxury-gold" />
            <div className="absolute top-[-1px] left-[-1px] w-[1px] h-6 bg-luxury-gold" />
            <div className="absolute bottom-[-1px] right-[-1px] w-6 h-[1px] bg-luxury-gold" />
            <div className="absolute bottom-[-1px] right-[-1px] w-[1px] h-6 bg-luxury-gold" />
          </div>

          {/* Right: Text Content */}
          <div className="md:col-span-7 relative pl-8 md:pl-12">
            <div ref={lineRef} className="absolute top-0 left-0 w-[2px] h-full bg-luxury-gold" />
            
            <span className="text-micro text-luxury-gold mb-6 block">ABOUT THE STUDIO</span>
            
            <AnimatedText 
              text="Elevating brands through strategic design and premium digital experiences." 
              as="h2"
              type="words"
              className="text-h2 font-display text-luxury-navy mb-8 leading-tight"
            />
            
            <AnimatedText 
              text={owner.bio} 
              as="p"
              type="lines"
              delay={0.2}
              className="text-lg text-luxury-charcoal/80 mb-12 max-w-xl font-light leading-relaxed"
            />

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-12 border-t border-black/10">
              {owner.stats.map((stat, i) => (
                <div key={i}>
                  <div className="text-4xl md:text-5xl font-display text-luxury-burgundy mb-2">
                    <CounterNumber value={Number(stat.value)} suffix={stat.suffix} />
                  </div>
                  <div className="text-xs uppercase tracking-widest text-luxury-charcoal/60 font-semibold">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
