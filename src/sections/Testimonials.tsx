import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Quote } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface TestimonialsProps {
  className?: string;
}

export default function Testimonials({ className = '' }: TestimonialsProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Title reveal
      gsap.fromTo(
        titleRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Cards reveal with scrub
      cardRefs.current.forEach((card) => {
        if (card) {
          gsap.fromTo(
            card,
            { y: 70, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 1,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                end: 'top 50%',
                scrub: 0.5,
              },
            }
          );
        }
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const testimonials = [
    {
      quote: "Pranjal shipped faster than anyone we've worked with—and it still felt premium.",
      author: 'A. R.',
      role: 'Product Lead',
      size: 'large',
    },
    {
      quote: "Our site became our best salesperson.",
      author: 'M. K.',
      role: 'Founder',
      size: 'medium',
    },
    {
      quote: "Clean code, clear communication, world-class craft.",
      author: 'S. T.',
      role: 'Design Director',
      size: 'wide',
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className={`relative bg-[#0B0B0B] py-24 lg:py-32 ${className}`}
    >
      <div className="px-6 lg:px-[6vw]">
        {/* Title */}
        <div ref={titleRef} className="mb-16">
          <h2 className="headline-lg text-white mb-4">
            What Clients <span className="accent-lime">Say</span>
          </h2>
          <p className="body-text text-[#888] max-w-md">
            Words from those who've experienced the craft firsthand.
          </p>
        </div>

        {/* Testimonials - Staggered Layout */}
        <div className="space-y-8 lg:space-y-10">
          {/* Testimonial 1 - Large */}
          <div
            ref={el => { cardRefs.current[0] = el; }}
            className="testimonial-card card-hover"
            style={{ width: 'min(44vw, 680px)' }}
          >
            <Quote size={24} className="text-[#DFFF00] mb-6" />
            <p className="text-lg lg:text-xl text-white leading-relaxed mb-8">
              "{testimonials[0].quote}"
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#DFFF00]/10 flex items-center justify-center">
                <span className="text-[#DFFF00] font-display font-semibold text-sm">
                  {testimonials[0].author}
                </span>
              </div>
              <div>
                <p className="text-white font-medium text-sm">{testimonials[0].author}</p>
                <p className="text-[#666] text-xs">{testimonials[0].role}</p>
              </div>
            </div>
          </div>

          {/* Testimonial 2 - Medium Right */}
          <div className="flex justify-end">
            <div
              ref={el => { cardRefs.current[1] = el; }}
              className="testimonial-card card-hover"
              style={{ width: 'min(38vw, 580px)' }}
            >
              <Quote size={20} className="text-[#DFFF00] mb-5" />
              <p className="text-lg text-white leading-relaxed mb-6">
                "{testimonials[1].quote}"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#DFFF00]/10 flex items-center justify-center">
                  <span className="text-[#DFFF00] font-display font-semibold text-xs">
                    {testimonials[1].author}
                  </span>
                </div>
                <div>
                  <p className="text-white font-medium text-sm">{testimonials[1].author}</p>
                  <p className="text-[#666] text-xs">{testimonials[1].role}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Testimonial 3 - Wide Center */}
          <div
            ref={el => { cardRefs.current[2] = el; }}
            className="testimonial-card card-hover mx-auto"
            style={{ width: 'min(50vw, 760px)' }}
          >
            <Quote size={24} className="text-[#DFFF00] mb-6" />
            <p className="text-lg lg:text-xl text-white leading-relaxed mb-8">
              "{testimonials[2].quote}"
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#DFFF00]/10 flex items-center justify-center">
                <span className="text-[#DFFF00] font-display font-semibold text-sm">
                  {testimonials[2].author}
                </span>
              </div>
              <div>
                <p className="text-white font-medium text-sm">{testimonials[2].author}</p>
                <p className="text-[#666] text-xs">{testimonials[2].role}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
