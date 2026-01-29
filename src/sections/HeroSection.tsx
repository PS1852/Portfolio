import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        titleRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1 }
      )
        .fromTo(
          subtitleRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8 },
          '-=0.6'
        )
        .fromTo(
          buttonsRef.current?.children || [],
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.1 },
          '-=0.4'
        )
        .fromTo(
          imageRef.current,
          { opacity: 0, scale: 0.9 },
          { opacity: 1, scale: 1, duration: 1 },
          '-=0.8'
        );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={heroRef}
      id="hero"
      className="min-h-screen w-full flex items-center justify-center relative overflow-hidden pt-20"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-600/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-500/20 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-pink-500/10 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
              <Sparkles size={16} className="text-orange-400" />
              <span className="text-sm text-white/80">Web Development & Graphic Design</span>
            </div>

            <h1
              ref={titleRef}
              className="headline-xl text-white mb-4"
            >
              <span className="gradient-text">PWS</span>
            </h1>

            <p
              ref={subtitleRef}
              className="text-lg md:text-xl text-white/70 mb-2 font-display font-medium"
            >
              Pranjal Web Studio
            </p>

            <p className="body-text text-white/60 mb-8 max-w-lg mx-auto lg:mx-0">
              Crafting digital experiences that captivate and convert. 
              Specializing in modern web development and stunning graphic design 
              for businesses that want to stand out.
            </p>

            <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button
                onClick={() => scrollToSection('projects')}
                className="btn-primary flex items-center justify-center gap-2"
              >
                Explore Work
                <ArrowRight size={18} />
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="btn-secondary"
              >
                Start a Project
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-white/10">
              <div>
                <div className="text-2xl md:text-3xl font-display font-bold gradient-text-orange">100+</div>
                <div className="text-sm text-white/50 mt-1">Projects</div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-display font-bold gradient-text-purple">5+</div>
                <div className="text-sm text-white/50 mt-1">Years Exp.</div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-display font-bold gradient-text">99%</div>
                <div className="text-sm text-white/50 mt-1">Satisfaction</div>
              </div>
            </div>
          </div>

          {/* Right Content - Image */}
          <div ref={imageRef} className="relative">
            <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
              <img
                src="/images/hero_dev.jpg"
                alt="Web Development"
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a0a2e]/80 via-transparent to-transparent" />
            </div>

            {/* Floating Cards */}
            <div className="absolute -bottom-6 -left-6 glass-card p-4 hidden md:block">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">W</span>
                </div>
                <div>
                  <div className="text-white font-medium text-sm">Web Dev</div>
                  <div className="text-white/50 text-xs">React, Node, Next.js</div>
                </div>
              </div>
            </div>

            <div className="absolute -top-6 -right-6 glass-card p-4 hidden md:block">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-yellow-500 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">G</span>
                </div>
                <div>
                  <div className="text-white font-medium text-sm">Graphic Design</div>
                  <div className="text-white/50 text-xs">Figma, Adobe Suite</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
