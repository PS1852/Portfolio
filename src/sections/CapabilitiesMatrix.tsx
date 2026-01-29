import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Code, Palette, Clapperboard } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface CapabilitiesMatrixProps {
  className?: string;
}

export default function CapabilitiesMatrix({ className = '' }: CapabilitiesMatrixProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const topLeftImageRef = useRef<HTMLDivElement>(null);
  const topRightCardRef = useRef<HTMLDivElement>(null);
  const bottomLeftCardRef = useRef<HTMLDivElement>(null);
  const bottomRightImageRef = useRef<HTMLDivElement>(null);
  const skillRefs = useRef<(HTMLDivElement | null)[]>([]);

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
        topLeftImageRef.current,
        { x: '-60vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0
      );

      scrollTl.fromTo(
        topRightCardRef.current,
        { x: '60vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0.05
      );

      scrollTl.fromTo(
        bottomLeftCardRef.current,
        { y: '60vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.1
      );

      scrollTl.fromTo(
        bottomRightImageRef.current,
        { x: '60vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0.12
      );

      // Skill items stagger
      skillRefs.current.forEach((ref, i) => {
        if (ref) {
          scrollTl.fromTo(
            ref,
            { x: -40, opacity: 0 },
            { x: 0, opacity: 1, ease: 'none' },
            0.15 + i * 0.04
          );
        }
      });

      // EXIT (70%-100%)
      scrollTl.fromTo(
        topLeftImageRef.current,
        { x: 0, opacity: 1 },
        { x: '-18vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        topRightCardRef.current,
        { x: 0, opacity: 1 },
        { x: '18vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        bottomLeftCardRef.current,
        { y: 0, opacity: 1 },
        { y: '18vh', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        bottomRightImageRef.current,
        { x: 0, opacity: 1 },
        { x: '18vw', opacity: 0, ease: 'power2.in' },
        0.7
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const skills = [
    {
      icon: Code,
      title: 'Web Development',
      description: 'Performance-first builds with clean architecture.',
    },
    {
      icon: Palette,
      title: 'Graphic Design',
      description: 'Identity, systems, and art direction.',
    },
    {
      icon: Clapperboard,
      title: 'Motion & Video',
      description: 'Cinematic edits and UI motion that feels alive.',
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="capabilities"
      className={`section-pinned bg-black ${className}`}
    >
      {/* Top Left Image */}
      <div
        ref={topLeftImageRef}
        className="absolute bento-card overflow-hidden"
        style={{
          left: '6vw',
          top: '18vh',
          width: '40vw',
          height: '34vh',
        }}
      >
        <img
          src="/images/capabilities_stairwell.jpg"
          alt="Minimal stairwell"
          className="w-full h-full object-cover img-cinematic"
        />
      </div>

      {/* Top Right Headline Card */}
      <div
        ref={topRightCardRef}
        className="absolute bento-card flex flex-col justify-center p-8 lg:p-12"
        style={{
          left: '52vw',
          top: '18vh',
          width: '42vw',
          height: '34vh',
        }}
      >
        <h2 className="headline-lg text-white mb-4">
          Design. <span className="accent-lime">Build.</span> Scale.
        </h2>
        <p className="body-text text-[#888]">
          Three disciplines. One consistent standard.
        </p>
      </div>

      {/* Bottom Left Capability Card (White) */}
      <div
        ref={bottomLeftCardRef}
        className="absolute bento-card-white flex flex-col justify-center p-6 lg:p-10"
        style={{
          left: '6vw',
          top: '56vh',
          width: '40vw',
          height: '26vh',
        }}
      >
        <div className="space-y-4">
          {skills.map((skill, i) => (
            <div
              key={skill.title}
              ref={el => { skillRefs.current[i] = el; }}
              className="flex items-start gap-4"
            >
              <div className="w-10 h-10 rounded-lg bg-black/5 flex items-center justify-center flex-shrink-0">
                <skill.icon size={18} className="text-[#0B0B0B]" />
              </div>
              <div>
                <h3 className="font-display font-semibold text-[#0B0B0B] text-sm mb-1">
                  {skill.title}
                </h3>
                <p className="text-xs text-[#666] leading-relaxed">
                  {skill.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Right Image */}
      <div
        ref={bottomRightImageRef}
        className="absolute bento-card overflow-hidden"
        style={{
          left: '52vw',
          top: '56vh',
          width: '42vw',
          height: '26vh',
        }}
      >
        <img
          src="/images/capabilities_hallway.jpg"
          alt="Modern hallway"
          className="w-full h-full object-cover img-cinematic"
        />
      </div>
    </section>
  );
}
