import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SKILLS } from '@/data'

gsap.registerPlugin(ScrollTrigger)

import { Star } from 'lucide-react'

const SKILL_DETAILS = [
  { name: 'React / Next.js', stars: 5, color: '#10b981' },
  { name: 'TypeScript', stars: 5, color: '#10b981' },
  { name: 'UI / UX Design', stars: 5, color: '#10b981' },
  { name: 'Graphic Design', stars: 5, color: '#10b981' },
  { name: 'GSAP Animation', stars: 5, color: '#10b981' },
  { name: 'Tailwind CSS', stars: 5, color: '#10b981' },
  { name: 'Figma', stars: 5, color: '#10b981' },
  { name: 'Adobe Illustrator', stars: 4, color: '#10b981' },
  { name: 'Brand Identity', stars: 5, color: '#10b981' },
  { name: 'Three.js / WebGL', stars: 4, color: '#10b981' },
]

function SkillCard({ name, stars, index }: { name: string; stars: number; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const starsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = cardRef.current
    if (!el) return

    gsap.fromTo(
      el,
      { y: 30, opacity: 0 },
      {
        y: 0, opacity: 1,
        duration: 0.6,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 90%',
        },
        delay: index * 0.05,
      }
    )

    if (starsRef.current) {
      gsap.fromTo(
        starsRef.current.children,
        { scale: 0, opacity: 0 },
        {
          scale: 1, opacity: 1,
          duration: 0.4,
          stagger: 0.1,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: el,
            start: 'top 90%',
          },
          delay: index * 0.05 + 0.3,
        }
      )
    }
  }, [index])

  return (
    <div
      ref={cardRef}
      className="flex flex-col items-center p-6 rounded-2xl bg-off-white border border-border-green hover:border-emerald-300 hover:shadow-lg transition-all duration-300 group"
      style={{ opacity: 0 }}
    >
      <div ref={starsRef} className="flex gap-1 mb-4 text-emerald-500">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={18}
            fill={i < stars ? '#10b981' : 'transparent'}
            className={i < stars ? 'text-emerald-500' : 'text-emerald-200'}
          />
        ))}
      </div>
      <p className="text-sm font-bold text-ink group-hover:text-emerald-700 transition-colors uppercase tracking-wider text-center">
        {name}
      </p>
    </div>
  )
}

export default function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)

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
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="skills" className="py-28 md:py-36 bg-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 right-10 w-72 h-72 rounded-full bg-emerald-50 opacity-60 blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-10 w-48 h-48 rounded-full bg-emerald-100 opacity-40 blur-2xl pointer-events-none" />

      <div className="section-padding max-w-7xl mx-auto">
        {/* Header */}
        <div ref={headingRef} style={{ opacity: 0 }} className="text-center mb-20">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="emerald-line" />
            <span className="text-xs tracking-[0.25em] uppercase text-emerald-700 font-mono">Skills & Expertise</span>
            <div className="emerald-line" />
          </div>
          <h2 className="heading-lg text-ink mb-6">
            Tools of the
            <br />
            <span className="gradient-text">Craft</span>
          </h2>
          <p className="text-muted max-w-xl mx-auto leading-relaxed">
            A carefully curated stack of modern technologies, design tools, and creative platforms
            used to build exceptional digital experiences.
          </p>
        </div>

        {/* Skills cards grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mb-20">
          {SKILL_DETAILS.map((skill, i) => (
            <SkillCard key={skill.name} name={skill.name} stars={skill.stars} index={i} />
          ))}
        </div>

        {/* Floating tags cloud */}
        <div className="relative py-16 border-t border-border-green">
          <p className="text-center text-xs tracking-[0.25em] uppercase text-muted font-mono mb-10">Also Proficient In</p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {[
              'GraphQL', 'REST APIs', 'PostgreSQL', 'MongoDB', 'Redis', 'Docker', 'AWS', 'Vercel',
              'Supabase', 'Firebase', 'Prisma', 'Stripe', 'Framer Motion', 'After Effects',
              'Blender', 'WebGL', 'Canvas API', 'React Native', 'Git', 'CI/CD',
            ].map((skill, i) => (
              <span
                key={skill}
                className="tag bg-off-white text-muted border border-border-green hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200 transition-all duration-300"
                style={{
                  animationDelay: `${i * 0.1}s`,
                  transform: `rotate(${(i % 5 - 2) * 2}deg)`,
                }}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-10">
          <button
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-primary"
          >
            <span>Work With Me</span>
          </button>
        </div>
      </div>
    </section>
  )
}
