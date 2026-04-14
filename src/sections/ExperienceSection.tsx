import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { EXPERIENCES } from '@/data'

gsap.registerPlugin(ScrollTrigger)

export default function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading
      gsap.fromTo(
        headingRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1,
          duration: 1, ease: 'power4.out',
          scrollTrigger: { trigger: headingRef.current, start: 'top 85%' },
        }
      )

      // Timeline line draw
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0, transformOrigin: 'top center' },
        {
          scaleY: 1,
          duration: 2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            end: 'bottom 80%',
            scrub: 0.5,
          },
        }
      )

      // Cards stagger
      gsap.fromTo(
        '.experience-card',
        { x: (i) => i % 2 === 0 ? -60 : 60, opacity: 0 },
        {
          x: 0, opacity: 1,
          duration: 0.9, ease: 'power3.out',
          stagger: 0.2,
          scrollTrigger: {
            trigger: '.experience-cards',
            start: 'top 80%',
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="experience" className="py-28 md:py-36 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-1/2 w-px h-full bg-border-green opacity-40 pointer-events-none" />

      <div className="section-padding max-w-5xl mx-auto">
        <div ref={headingRef} style={{ opacity: 0 }} className="text-center mb-20">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="emerald-line" />
            <span className="text-xs tracking-[0.25em] uppercase text-emerald-700 font-mono">Experience</span>
            <div className="emerald-line" />
          </div>
          <h2 className="heading-lg text-ink">
            The Journey
            <br />
            <span className="gradient-text">So Far</span>
          </h2>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div
            ref={lineRef}
            className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-0 w-px h-full"
            style={{
              background: 'linear-gradient(to bottom, #10b981, #059669, #047857)',
              transform: 'scaleY(0)',
              transformOrigin: 'top center',
            }}
          />

          <div className="experience-cards relative flex flex-col gap-10 md:gap-16">
            {EXPERIENCES.map((exp, idx) => (
              <div
                key={exp.id}
                className={`experience-card relative flex items-center gap-4 md:gap-8 flex-row md:${idx % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                style={{ opacity: 0 }}
              >
                {/* Timeline dot — left side on mobile */}
                <div className="relative z-10 flex-shrink-0 md:hidden">
                  <div className="w-3 h-3 rounded-full bg-emerald-500 border-2 border-white shadow-lg shadow-emerald-500/30" />
                </div>

                {/* Card */}
                <div className={`flex-1 md:${idx % 2 === 0 ? 'text-right' : 'text-left'}`}>
                  <div className="glass-card p-5 md:p-8 inline-block w-full max-w-md hover:shadow-lg transition-shadow duration-300 group">
                    {/* Company badge */}
                    <div className={`flex items-center gap-3 mb-3 md:mb-4 ${idx % 2 === 0 ? 'md:justify-end' : 'md:justify-start'}`}>
                      <span className="tag bg-emerald-50 text-emerald-700 border border-emerald-200 font-mono text-[10px] md:text-xs">
                        {exp.dates}
                      </span>
                    </div>

                    <h3
                      className="text-lg md:text-xl font-bold text-ink mb-1 group-hover:text-emerald-700 transition-colors"
                      style={{ fontFamily: 'Playfair Display, serif' }}
                    >
                      {exp.role}
                    </h3>

                    <p className="text-emerald-600 font-medium text-xs md:text-sm mb-3 md:mb-4 font-mono">
                      @ {exp.company}
                    </p>

                    <p className="text-muted leading-relaxed text-xs md:text-sm">
                      {exp.description}
                    </p>
                  </div>
                </div>

                {/* Timeline dot — centered on desktop */}
                <div className="relative z-10 flex-shrink-0 hidden md:block">
                  <div className="w-5 h-5 rounded-full bg-emerald-500 border-4 border-white shadow-lg shadow-emerald-500/30" />
                  <div className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-30" />
                </div>

                {/* Empty side — desktop only */}
                <div className="flex-1 hidden md:block" />
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-20">
          <p className="text-muted mb-6">Building the future of digital experiences.</p>
          <button
            onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-outline"
          >
            See the Work
          </button>
        </div>
      </div>
    </section>
  )
}
