import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import { TESTIMONIALS } from '@/data'

gsap.registerPlugin(ScrollTrigger)

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const carouselRef = useRef<HTMLDivElement>(null)
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1, ease: 'power4.out',
          scrollTrigger: { trigger: headingRef.current, start: 'top 85%' },
        }
      )

      gsap.fromTo(
        carouselRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: carouselRef.current, start: 'top 85%' },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const goTo = (idx: number) => {
    const newIdx = (idx + TESTIMONIALS.length) % TESTIMONIALS.length

    gsap.to(carouselRef.current, {
      opacity: 0,
      x: idx > current ? -30 : 30,
      duration: 0.25,
      ease: 'power2.in',
      onComplete: () => {
        setCurrent(newIdx)
        gsap.fromTo(
          carouselRef.current,
          { opacity: 0, x: idx > current ? 30 : -30 },
          { opacity: 1, x: 0, duration: 0.4, ease: 'power3.out' }
        )
      },
    })
  }

  const t = TESTIMONIALS[current]

  return (
    <section ref={sectionRef} id="testimonials" className="py-28 md:py-36 relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #0A1F14 0%, #061210 100%)' }}
    >
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-emerald-900/50 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-emerald-800/30 blur-3xl" />
      </div>

      {/* Noise overlay */}
      <div className="noise-overlay" />

      {/* Floating dots */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-emerald-400"
            style={{
              width: '4px', height: '4px',
              left: `${(i * 19 + 5) % 95}%`,
              top: `${(i * 31 + 10) % 90}%`,
              opacity: 0.2,
              animation: `float ${6 + i}s ease-in-out infinite`,
              animationDelay: `${i * 0.5}s`,
            }}
          />
        ))}
      </div>

      <div className="section-padding max-w-4xl mx-auto relative">
        {/* Header */}
        <div ref={headingRef} style={{ opacity: 0 }} className="text-center mb-20">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-px bg-emerald-500 opacity-60" />
            <span className="text-xs tracking-[0.25em] uppercase text-emerald-400 font-mono">Testimonials</span>
            <div className="w-12 h-px bg-emerald-500 opacity-60" />
          </div>
          <h2 className="heading-lg" style={{ color: '#ffffff' }}>
            Words from
            <br />
            <span className="gradient-text">Happy Clients</span>
          </h2>
        </div>

        {/* Testimonial Card */}
        <div
          ref={carouselRef}
          style={{ opacity: 0 }}
          className="relative"
        >
          <div className="glass-card p-10 md:p-14 text-center"
            style={{
              background: 'rgba(255,255,255,0.04)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(16, 185, 129, 0.2)',
            }}
          >
            {/* Quote icon */}
            <div className="flex justify-center mb-8">
              <div className="w-14 h-14 rounded-full bg-emerald-500/20 flex items-center justify-center">
                <Quote size={24} className="text-emerald-400" />
              </div>
            </div>

            {/* Stars */}
            <div className="flex justify-center gap-1 mb-8">
              {[...Array(5)].map((_, i) => (
                <svg key={i} width="18" height="18" fill="#10b981" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              ))}
            </div>

            {/* Quote */}
            <blockquote
              className="text-xl md:text-2xl lg:text-3xl font-light leading-relaxed text-white/90 mb-10"
              style={{ fontFamily: 'Playfair Display, serif', fontStyle: 'italic' }}
            >
              "{t.quote}"
            </blockquote>

            {/* Author */}
            <div className="flex items-center justify-center gap-4">
              <div className="w-12 h-12 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold text-sm">
                {t.initials}
              </div>
              <div className="text-left">
                <p className="font-semibold text-white" style={{ fontFamily: 'Inter, sans-serif' }}>{t.author}</p>
                <p className="text-emerald-400 text-sm font-mono">{t.role}</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-6 mt-8">
            <button
              onClick={() => goTo(current - 1)}
              className="w-12 h-12 rounded-full border border-emerald-700 text-emerald-400 flex items-center justify-center hover:bg-emerald-800 transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={20} />
            </button>

            <div className="flex gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={`transition-all duration-300 rounded-full ${
                    i === current ? 'w-6 h-2 bg-emerald-400' : 'w-2 h-2 bg-emerald-700'
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={() => goTo(current + 1)}
              className="w-12 h-12 rounded-full border border-emerald-700 text-emerald-400 flex items-center justify-center hover:bg-emerald-800 transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
