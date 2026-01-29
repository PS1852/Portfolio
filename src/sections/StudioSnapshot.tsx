import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface StudioSnapshotProps {
  className?: string;
}

export default function StudioSnapshot({ className = '' }: StudioSnapshotProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const leftImageRef = useRef<HTMLDivElement>(null);
  const whiteCardRef = useRef<HTMLDivElement>(null);
  const metricsCardRef = useRef<HTMLDivElement>(null);
  const metricRefs = useRef<(HTMLDivElement | null)[]>([]);

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
      // Left image card
      scrollTl.fromTo(
        leftImageRef.current,
        { x: '-60vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0
      );

      // White text card
      scrollTl.fromTo(
        whiteCardRef.current,
        { x: '60vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0.05
      );

      // Metrics card
      scrollTl.fromTo(
        metricsCardRef.current,
        { y: '60vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.1
      );

      // Metric numbers
      metricRefs.current.forEach((ref, i) => {
        if (ref) {
          scrollTl.fromTo(
            ref,
            { scale: 0.85, y: 20, opacity: 0 },
            { scale: 1, y: 0, opacity: 1, ease: 'none' },
            0.12 + i * 0.03
          );
        }
      });

      // SETTLE (30%-70%): Hold positions

      // EXIT (70%-100%)
      scrollTl.fromTo(
        leftImageRef.current,
        { x: 0, opacity: 1 },
        { x: '-18vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        whiteCardRef.current,
        { x: 0, opacity: 1 },
        { x: '18vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        metricsCardRef.current,
        { y: 0, opacity: 1 },
        { y: '18vh', opacity: 0, ease: 'power2.in' },
        0.7
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const metrics = [
    { value: '100+', label: 'Projects Delivered' },
    { value: '5+', label: 'Years of Experience' },
    { value: '99%', label: 'Client Satisfaction' },
  ];

  return (
    <section
      ref={sectionRef}
      id="studio-snapshot"
      className={`section-pinned bg-black ${className}`}
    >
      {/* Left Image Card */}
      <div
        ref={leftImageRef}
        className="absolute bento-card overflow-hidden"
        style={{
          left: '6vw',
          top: '18vh',
          width: '40vw',
          height: '64vh',
        }}
      >
        <img
          src="./images/snapshot_stairs.jpg"
          alt="Architectural stairwell"
          className="w-full h-full object-cover img-cinematic"
        />
      </div>

      {/* Right Top White Text Card */}
      <div
        ref={whiteCardRef}
        className="absolute bento-card-white flex flex-col justify-center p-8 lg:p-12"
        style={{
          left: '52vw',
          top: '18vh',
          width: '42vw',
          height: '26vh',
        }}
      >
        <h2 className="headline-lg text-[#0B0B0B] mb-4">
          A Studio Built for <span className="accent-lime">Precision</span>
        </h2>
        <p className="body-text text-[#333] max-w-md">
          We ship fast, accessible, high-fidelity interfaces. From zero to launch—without losing the craft.
        </p>
      </div>

      {/* Right Bottom Metrics Card */}
      <div
        ref={metricsCardRef}
        className="absolute bento-card flex flex-col justify-center p-8 lg:p-12"
        style={{
          left: '52vw',
          top: '48vh',
          width: '42vw',
          height: '34vh',
        }}
      >
        <div className="grid grid-cols-3 gap-6">
          {metrics.map((metric, i) => (
            <div
              key={metric.label}
              ref={el => { metricRefs.current[i] = el; }}
              className="text-center"
            >
              <div className="metric-number accent-lime mb-2">{metric.value}</div>
              <div className="micro-text text-[#888]">{metric.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
