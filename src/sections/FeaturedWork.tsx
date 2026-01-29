import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface FeaturedWorkProps {
  className?: string;
}

export default function FeaturedWork({ className = '' }: FeaturedWorkProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const leftHeadlineRef = useRef<HTMLDivElement>(null);
  const leftBottomImageRef = useRef<HTMLDivElement>(null);
  const rightImageRef = useRef<HTMLDivElement>(null);
  const projectLabelRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        },
      });

      // ENTRANCE (0%-30%)
      scrollTl.fromTo(
        leftHeadlineRef.current,
        { x: '-60vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0
      );

      scrollTl.fromTo(
        rightImageRef.current,
        { x: '60vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0.05
      );

      scrollTl.fromTo(
        leftBottomImageRef.current,
        { y: '60vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.1
      );

      scrollTl.fromTo(
        projectLabelRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.15
      );

      // EXIT (70%-100%)
      scrollTl.fromTo(
        leftHeadlineRef.current,
        { x: 0, opacity: 1 },
        { x: '-18vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        rightImageRef.current,
        { x: 0, opacity: 1 },
        { x: '18vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        leftBottomImageRef.current,
        { y: 0, opacity: 1 },
        { y: '18vh', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        projectLabelRef.current,
        { opacity: 1 },
        { opacity: 0, ease: 'power2.in' },
        0.8
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="featured-work"
      className={`section-pinned bg-black ${className}`}
    >
      {/* Left Headline Card */}
      <div
        ref={leftHeadlineRef}
        className="absolute bento-card flex flex-col justify-center p-8 lg:p-12"
        style={{
          left: '6vw',
          top: '18vh',
          width: '40vw',
          height: '34vh',
        }}
      >
        <span className="micro-text accent-lime mb-4">Featured Project</span>
        <h2 className="headline-lg text-white mb-4">
          Featured <span className="accent-lime">Work</span>
        </h2>
        <p className="body-text text-[#888]">
          A curated selection of projects where logic meets perfection.
        </p>
      </div>

      {/* Left Bottom Image */}
      <div
        ref={leftBottomImageRef}
        className="absolute bento-card overflow-hidden"
        style={{
          left: '6vw',
          top: '56vh',
          width: '40vw',
          height: '26vh',
        }}
      >
        <img
          src="/images/featured_corridor.jpg"
          alt="Futuristic corridor"
          className="w-full h-full object-cover img-cinematic"
        />
      </div>

      {/* Right Large Image (Project) */}
      <div
        ref={rightImageRef}
        className="absolute bento-card overflow-hidden group cursor-pointer"
        style={{
          left: '52vw',
          top: '18vh',
          width: '42vw',
          height: '64vh',
        }}
      >
        <img
          src="/images/project_ecotrack.jpg"
          alt="EcoTrack Platform"
          className="w-full h-full object-cover img-cinematic transition-transform duration-700 group-hover:scale-105"
        />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        
        {/* Project info */}
        <div
          ref={projectLabelRef}
          className="absolute inset-0 p-8 flex flex-col justify-between"
        >
          {/* Top label */}
          <div>
            <span className="micro-text accent-lime">Sustainability Platform</span>
          </div>
          
          {/* Bottom content */}
          <div>
            <h3 className="headline-md text-white mb-3">
              EcoTrack Platform
            </h3>
            <p className="body-text text-[#B8B8B8] mb-4 max-w-sm">
              A sustainability dashboard turning complex data into clear action.
            </p>
            <a 
              href="#" 
              className="inline-flex items-center gap-2 text-sm font-medium text-white hover:accent-lime transition-colors"
            >
              View case study
              <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
