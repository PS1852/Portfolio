import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface SelectedWorkProps {
  className?: string;
}

export default function SelectedWork({ className = '' }: SelectedWorkProps) {
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
            { y: 80, scale: 0.98, opacity: 0 },
            {
              y: 0,
              scale: 1,
              opacity: 1,
              duration: 1,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                end: 'top 45%',
                scrub: 0.5,
              },
            }
          );
        }
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const projects = [
    {
      title: 'ArtGallery VR',
      tag: 'Web Experience',
      image: './images/project_artgallery.jpg',
      size: 'large',
    },
    {
      title: 'HealthHub',
      tag: 'Product Design',
      image: './images/project_healthhub.jpg',
      size: 'medium',
    },
    {
      title: 'FinanceFlow',
      tag: 'Dashboard',
      image: './images/project_financeflow.jpg',
      size: 'wide',
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="selected-work"
      className={`relative bg-[#0B0B0B] py-24 lg:py-32 ${className}`}
    >
      <div className="px-6 lg:px-[6vw]">
        {/* Title */}
        <div ref={titleRef} className="mb-16">
          <h2 className="headline-lg text-white mb-4">
            Selected <span className="accent-lime">Work</span>
          </h2>
          <p className="body-text text-[#888] max-w-md">
            A few recent builds that define industry standards.
          </p>
        </div>

        {/* Projects Grid - Staggered Layout */}
        <div className="space-y-8 lg:space-y-12">
          {/* Project 1 - Large Left */}
          <div
            ref={el => { cardRefs.current[0] = el; }}
            className="project-card card-hover"
            style={{ width: 'min(58vw, 900px)', height: 'min(34vw, 520px)' }}
          >
            <img
              src={projects[0].image}
              alt={projects[0].title}
              className="w-full h-full object-cover card-image img-cinematic"
            />
            <div className="project-card-overlay" />
            <div className="project-card-content">
              <span className="micro-text accent-lime mb-2 block">{projects[0].tag}</span>
              <h3 className="headline-md text-white mb-3">{projects[0].title}</h3>
              <a href="#" className="inline-flex items-center gap-2 text-sm text-white/80 hover:text-white transition-colors">
                View project <ArrowUpRight size={14} />
              </a>
            </div>
          </div>

          {/* Project 2 - Medium Right */}
          <div className="flex justify-end">
            <div
              ref={el => { cardRefs.current[1] = el; }}
              className="project-card card-hover"
              style={{ width: 'min(38vw, 580px)', height: 'min(22vw, 340px)' }}
            >
              <img
                src={projects[1].image}
                alt={projects[1].title}
                className="w-full h-full object-cover card-image img-cinematic"
              />
              <div className="project-card-overlay" />
              <div className="project-card-content">
                <span className="micro-text accent-lime mb-2 block">{projects[1].tag}</span>
                <h3 className="headline-md text-white mb-3">{projects[1].title}</h3>
                <a href="#" className="inline-flex items-center gap-2 text-sm text-white/80 hover:text-white transition-colors">
                  View project <ArrowUpRight size={14} />
                </a>
              </div>
            </div>
          </div>

          {/* Project 3 - Wide Center */}
          <div
            ref={el => { cardRefs.current[2] = el; }}
            className="project-card card-hover mx-auto"
            style={{ width: 'min(72vw, 1100px)', height: 'min(30vw, 460px)' }}
          >
            <img
              src={projects[2].image}
              alt={projects[2].title}
              className="w-full h-full object-cover card-image img-cinematic"
            />
            <div className="project-card-overlay" />
            <div className="project-card-content">
              <span className="micro-text accent-lime mb-2 block">{projects[2].tag}</span>
              <h3 className="headline-md text-white mb-3">{projects[2].title}</h3>
              <a href="#" className="inline-flex items-center gap-2 text-sm text-white/80 hover:text-white transition-colors">
                View project <ArrowUpRight size={14} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
