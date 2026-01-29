import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Search, PenTool, Code2, Rocket } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ProcessSectionProps {
  className?: string;
}

export default function ProcessSection({ className = '' }: ProcessSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const topLeftImageRef = useRef<HTMLDivElement>(null);
  const topRightCardRef = useRef<HTMLDivElement>(null);
  const bottomLeftCardRef = useRef<HTMLDivElement>(null);
  const bottomRightImageRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

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

      // Steps stagger
      stepRefs.current.forEach((ref, i) => {
        if (ref) {
          scrollTl.fromTo(
            ref,
            { y: 18, opacity: 0 },
            { y: 0, opacity: 1, ease: 'none' },
            0.15 + i * 0.035
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

  const steps = [
    {
      icon: Search,
      title: 'Discover',
      description: 'Goals, constraints, and the real user story.',
    },
    {
      icon: PenTool,
      title: 'Design',
      description: 'Systems-first, content-forward.',
    },
    {
      icon: Code2,
      title: 'Develop',
      description: 'Component-driven, performance-obsessed.',
    },
    {
      icon: Rocket,
      title: 'Deliver',
      description: 'Launch, measure, iterate.',
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="process"
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
          src="/images/process_stairwell.jpg"
          alt="Abstract stairwell"
          className="w-full h-full object-cover img-cinematic"
        />
      </div>

      {/* Top Right Headline Card (White) */}
      <div
        ref={topRightCardRef}
        className="absolute bento-card-white flex flex-col justify-center p-8 lg:p-12"
        style={{
          left: '52vw',
          top: '18vh',
          width: '42vw',
          height: '34vh',
        }}
      >
        <h2 className="headline-lg text-[#0B0B0B] mb-4">
          A Process That <span className="accent-lime">Protects</span> Your Time
        </h2>
        <p className="body-text text-[#555]">
          Four phases. Zero waste. Maximum impact.
        </p>
      </div>

      {/* Bottom Left Steps Card */}
      <div
        ref={bottomLeftCardRef}
        className="absolute bento-card flex flex-col justify-center p-6 lg:p-10"
        style={{
          left: '6vw',
          top: '56vh',
          width: '40vw',
          height: '26vh',
        }}
      >
        <div className="grid grid-cols-2 gap-4">
          {steps.map((step, i) => (
            <div
              key={step.title}
              ref={el => { stepRefs.current[i] = el; }}
              className="flex items-start gap-3"
            >
              <div className="w-8 h-8 rounded-lg bg-[#DFFF00]/10 flex items-center justify-center flex-shrink-0">
                <step.icon size={14} className="text-[#DFFF00]" />
              </div>
              <div>
                <h3 className="font-display font-semibold text-white text-sm mb-0.5">
                  {step.title}
                </h3>
                <p className="text-xs text-[#777] leading-relaxed">
                  {step.description}
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
          src="/images/process_corridor.jpg"
          alt="Clean modern corridor"
          className="w-full h-full object-cover img-cinematic"
        />
      </div>
    </section>
  );
}
