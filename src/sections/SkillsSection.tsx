import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SKILLS } from '@/data'

gsap.registerPlugin(ScrollTrigger)

const SKILL_DETAILS = [
  { name: 'React', level: 98, color: '#61DAFB', bg: '#ecfdf5', text: '#065f46' },
  { name: 'Next.js', level: 95, color: '#000000', bg: '#f0f4f2', text: '#0F1F17' },
  { name: 'TypeScript', level: 92, color: '#3178C6', bg: '#ecfdf5', text: '#065f46' },
  { name: 'Node.js', level: 90, color: '#68A063', bg: '#f0f4f2', text: '#0F1F17' },
  { name: 'Three.js', level: 85, color: '#000000', bg: '#ecfdf5', text: '#065f46' },
  { name: 'GSAP', level: 93, color: '#88CE02', bg: '#f0f4f2', text: '#0F1F17' },
  { name: 'Tailwind CSS', level: 97, color: '#06B6D4', bg: '#ecfdf5', text: '#065f46' },
  { name: 'Figma', level: 90, color: '#F24E1E', bg: '#f0f4f2', text: '#0F1F17' },
  { name: 'Adobe Illustrator', level: 85, color: '#FF9A00', bg: '#ecfdf5', text: '#065f46' },
  { name: 'WebGL', level: 80, color: '#990000', bg: '#f0f4f2', text: '#0F1F17' },
]

function SkillOrb({ name, level, index }: { name: string; level: number; index: number }) {
  const orbRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<SVGCircleElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const el = orbRef.current
    if (!el) return

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: 'top 88%',
      onEnter: () => {
        if (hasAnimated.current) return
        hasAnimated.current = true

        gsap.fromTo(
          el,
          { scale: 0, opacity: 0, rotate: -90 },
          {
            scale: 1, opacity: 1, rotate: 0,
            duration: 0.7,
            ease: 'back.out(1.7)',
            delay: index * 0.07,
          }
        )

        if (ringRef.current) {
          const circumference = 2 * Math.PI * 38
          const offset = circumference - (level / 100) * circumference
          gsap.fromTo(
            ringRef.current,
            { strokeDashoffset: circumference },
            {
              strokeDashoffset: offset,
              duration: 1.2,
              ease: 'power3.out',
              delay: index * 0.07 + 0.3,
            }
          )
        }
      },
    })

    return () => trigger.kill()
  }, [index, level])

  const circumference = 2 * Math.PI * 38

  return (
    <div
      ref={orbRef}
      className="flex flex-col items-center gap-3 group"
      style={{ opacity: 0 }}
    >
      <div className="relative w-24 h-24">
        {/* SVG Ring */}
        <svg width="96" height="96" viewBox="0 0 96 96" className="-rotate-90">
          {/* Background ring */}
          <circle
            cx="48" cy="48" r="38"
            fill="none"
            stroke="#D1E7DD"
            strokeWidth="6"
          />
          {/* Progress ring */}
          <circle
            ref={ringRef}
            cx="48" cy="48" r="38"
            fill="none"
            stroke="#10b981"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference}
          />
        </svg>

        {/* Center content */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <span className="text-sm font-bold text-emerald-700">{level}%</span>
          </div>
        </div>
      </div>

      <div className="text-center">
        <p
          className="text-sm font-semibold text-ink group-hover:text-emerald-700 transition-colors duration-300"
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          {name}
        </p>
      </div>
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

        {/* Skills orbs grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-10 mb-20">
          {SKILL_DETAILS.map((skill, i) => (
            <SkillOrb key={skill.name} name={skill.name} level={skill.level} index={i} />
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
