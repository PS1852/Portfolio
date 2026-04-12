import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { STATS, SKILLS_MARQUEE } from '@/data'

gsap.registerPlugin(ScrollTrigger)

function AnimatedCounter({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const hasRun = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      onEnter: () => {
        if (hasRun.current) return
        hasRun.current = true
        const start = performance.now()
        const duration = 2000
        const easeOut = (t: number) => 1 - Math.pow(1 - t, 3)

        const tick = (now: number) => {
          const elapsed = now - start
          const progress = Math.min(elapsed / duration, 1)
          setCount(Math.round(easeOut(progress) * value))
          if (progress < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
      },
    })

    return () => trigger.kill()
  }, [value])

  return (
    <div ref={ref} className="text-center group">
      <div className="flex items-end justify-center gap-1 mb-3">
        <span
          className="text-5xl md:text-6xl font-bold text-ink leading-none"
          style={{ fontFamily: 'Playfair Display, serif' }}
        >
          {count}
        </span>
        <span className="text-3xl md:text-4xl font-bold text-emerald-500 leading-none mb-1">
          {suffix}
        </span>
      </div>
      <p className="text-sm text-muted font-mono tracking-wider uppercase">{label}</p>
    </div>
  )
}

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading
      gsap.fromTo(
        headingRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 85%',
          },
        }
      )

      // Text
      gsap.fromTo(
        textRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: textRef.current,
            start: 'top 85%',
          },
        }
      )

      // Image reveal
      gsap.fromTo(
        imageRef.current,
        { clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)', opacity: 0 },
        {
          clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
          opacity: 1,
          duration: 1.2,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: imageRef.current,
            start: 'top 80%',
          },
        }
      )

      // Stats
      gsap.fromTo(
        statsRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: statsRef.current,
            start: 'top 85%',
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="about" className="py-28 md:py-36 bg-off-white relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-5 bg-emerald-400 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full opacity-5 bg-emerald-500 blur-3xl pointer-events-none" />

      <div className="section-padding max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center mb-24">
          {/* Left: Text Content */}
          <div>
            <div ref={headingRef} style={{ opacity: 0 }}>
              <div className="flex items-center gap-3 mb-6">
                <div className="emerald-line" />
                <span className="text-xs tracking-[0.25em] uppercase text-emerald-700 font-mono">About</span>
              </div>
              <h2 className="heading-lg text-ink mb-6">
                The Studio
                <br />
                <span className="gradient-text">Behind the Work</span>
              </h2>
            </div>

            <div ref={textRef} style={{ opacity: 0 }}>
              <p className="body-lg text-muted mb-6 leading-relaxed">
                Crafting digital experiences that captivate and convert. Specializing in modern web development
                and stunning graphic design for businesses that want to stand out.
              </p>
              <p className="body-md text-muted leading-relaxed mb-8">
                Founded in 2019, Pranjal Web Studio has grown from a freelance design practice into a
                studio trusted by 100+ clients globally. Every project is approached with the same
                obsessive attention to detail — because the difference between good and exceptional
                is always in the details.
              </p>

              <div className="flex flex-wrap gap-3 mb-10">
                {['React', 'Next.js', 'TypeScript', 'GSAP', 'Three.js', 'Figma'].map((skill) => (
                  <span
                    key={skill}
                    className="tag bg-emerald-50 text-emerald-700 border border-emerald-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-4">
                <button
                  onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="btn-primary"
                >
                  <span>Start a Project</span>
                </button>
                <div className="flex items-center gap-2 text-sm text-muted">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Available for work
                </div>
              </div>
            </div>
          </div>

          {/* Right: Image */}
          <div
            ref={imageRef}
            style={{ opacity: 0, clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)' }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden aspect-[4/5] shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80"
                alt="Creative workspace"
                className="w-full h-full object-cover ken-burns"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/40 to-transparent" />
              {/* Card overlay */}
              <div className="absolute bottom-6 left-6 right-6 glass-card p-5">
                <div className="flex items-center gap-3 mb-1">
                  <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-mono text-emerald-700 tracking-wider uppercase">Available Worldwide</span>
                </div>
                <p className="text-ink font-medium text-sm">Currently accepting new projects</p>
              </div>
            </div>

            {/* Floating badge */}
            <div
              className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-emerald-600 flex items-center justify-center shadow-xl float-anim"
            >
              <div className="text-center">
                <div className="text-white font-bold text-lg leading-none">5+</div>
                <div className="text-emerald-200 text-xs font-mono">Years</div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div
          ref={statsRef}
          style={{ opacity: 0 }}
          className="grid grid-cols-3 gap-8 py-12 border-t border-b border-border-green"
        >
          {STATS.map((stat) => (
            <AnimatedCounter
              key={stat.label}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
            />
          ))}
        </div>
      </div>

      {/* Marquee Strip */}
      <div className="mt-20 py-8 border-t border-b border-border-green bg-white overflow-hidden">
        <div className="flex">
          <div className="marquee-track">
            {[...SKILLS_MARQUEE, ...SKILLS_MARQUEE].map((skill, i) => (
              <span key={i} className="flex items-center gap-6 mx-4">
                <span
                  className="text-2xl font-bold text-ink whitespace-nowrap"
                  style={{ fontFamily: 'Playfair Display, serif' }}
                >
                  {skill}
                </span>
                <span className="text-emerald-400 text-2xl">·</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
