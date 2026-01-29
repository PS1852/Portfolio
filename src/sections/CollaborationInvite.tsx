import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Phone, Download } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface CollaborationInviteProps {
  className?: string;
}

export default function CollaborationInvite({ className = '' }: CollaborationInviteProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const leftHeadlineRef = useRef<HTMLDivElement>(null);
  const leftBottomImageRef = useRef<HTMLDivElement>(null);
  const rightImageRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

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
        ctaRef.current,
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
        ctaRef.current,
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
      id="collaborate"
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
        <h2 className="headline-lg text-white mb-4">
          Let's Build What's <span className="accent-lime">Next.</span>
        </h2>
        <p className="body-text text-[#888]">
          Available for select projects. Tell us what you're shipping.
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
          src="/images/invite_corridor.jpg"
          alt="Minimal corridor"
          className="w-full h-full object-cover img-cinematic"
        />
      </div>

      {/* Right Large Image */}
      <div
        ref={rightImageRef}
        className="absolute bento-card overflow-hidden"
        style={{
          left: '52vw',
          top: '18vh',
          width: '42vw',
          height: '64vh',
        }}
      >
        <img
          src="/images/invite_stairwell.jpg"
          alt="Dramatic stairwell"
          className="w-full h-full object-cover img-cinematic"
        />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        
        {/* CTA Overlay */}
        <div
          ref={ctaRef}
          className="absolute bottom-0 left-0 right-0 p-8"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <a href="#contact" className="btn-primary flex items-center gap-2">
              <Phone size={16} />
              Request a Call
            </a>
            <a 
              href="#" 
              className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors"
            >
              <Download size={14} />
              Download Capabilities (PDF)
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
