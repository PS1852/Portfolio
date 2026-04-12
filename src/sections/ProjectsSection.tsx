import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ExternalLink, Github } from 'lucide-react'
import { PROJECTS } from '@/data'
import type { Project } from '@/types'

gsap.registerPlugin(ScrollTrigger)

const CATEGORIES = ['All', 'Web Development', 'E-Commerce', 'SaaS App', 'Hospitality', 'Education', 'Architecture & Design', 'Consulting', 'Interior Design', 'Wellness', 'Real Estate', 'Beauty & Lifestyle', 'Fitness & Health', 'Productivity App', 'Coaching & Consulting']

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -20

    gsap.to(el, {
      rotateX: y,
      rotateY: x,
      duration: 0.4,
      ease: 'power2.out',
      transformPerspective: 1000,
    })
  }

  const handleMouseLeave = () => {
    const el = cardRef.current
    if (!el) return
    gsap.to(el, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.6,
      ease: 'elastic.out(1, 0.4)',
    })
  }

  const handleMouseEnter = () => {
    if (imageRef.current) {
      gsap.to(imageRef.current, { scale: 1.08, duration: 0.6, ease: 'power2.out' })
    }
    if (overlayRef.current) {
      gsap.to(overlayRef.current, { opacity: 1, duration: 0.3 })
    }
  }

  const handleMouseLeaveCard = () => {
    if (imageRef.current) {
      gsap.to(imageRef.current, { scale: 1, duration: 0.6, ease: 'power2.out' })
    }
    if (overlayRef.current) {
      gsap.to(overlayRef.current, { opacity: 0, duration: 0.3 })
    }
    handleMouseLeave()
  }

  return (
    <div
      ref={cardRef}
      className="project-card group relative rounded-2xl overflow-hidden bg-white border border-border-green shadow-sm hover:shadow-2xl transition-shadow duration-500"
      style={{ transformStyle: 'preserve-3d', opacity: 0 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeaveCard}
      onMouseEnter={handleMouseEnter}
    >
      {/* Image */}
      <div className="relative overflow-hidden aspect-video">
        <div ref={imageRef} className="w-full h-full">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>

        {/* Hover overlay */}
        <div
          ref={overlayRef}
          className="absolute inset-0 bg-emerald-900/80 flex items-center justify-center gap-4"
          style={{ opacity: 0 }}
        >
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-ink hover:bg-emerald-50 transition-colors shadow-lg"
            onClick={(e) => e.stopPropagation()}
            aria-label={`View ${project.title} live`}
          >
            <ExternalLink size={18} />
          </a>
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-ink hover:bg-emerald-50 transition-colors shadow-lg"
              onClick={(e) => e.stopPropagation()}
              aria-label={`View ${project.title} on GitHub`}
            >
              <Github size={18} />
            </a>
          )}
        </div>

        {/* Category badge */}
        <div className="absolute top-4 left-4">
          <span className="tag bg-white/90 backdrop-blur-sm text-emerald-700 border border-emerald-200 shadow-sm">
            {project.category}
          </span>
        </div>

        {/* Number badge */}
        <div className="absolute top-4 right-4">
          <span
            className="text-xs font-mono text-white/60 font-medium"
            style={{ fontFamily: 'JetBrains Mono, monospace' }}
          >
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3
          className="text-xl font-bold text-ink mb-2 group-hover:text-emerald-700 transition-colors duration-300"
          style={{ fontFamily: 'Playfair Display, serif' }}
        >
          {project.title}
        </h3>
        <p className="text-muted text-sm leading-relaxed mb-4">{project.shortDescription}</p>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-2">
          {project.technologies.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="tag bg-emerald-50 text-emerald-700 text-[10px] py-0.5"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span className="tag bg-gray-50 text-gray-500 text-[10px] py-0.5">
              +{project.technologies.length - 4}
            </span>
          )}
        </div>
      </div>

      {/* Bottom border glow */}
      <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-emerald-500 group-hover:w-full transition-all duration-500" />
    </div>
  )
}

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const [activeCategory, setActiveCategory] = useState('All')

  const filteredProjects =
    activeCategory === 'All'
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeCategory)

  const uniqueCategories = ['All', ...Array.from(new Set(PROJECTS.map((p) => p.category)))]

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

  useEffect(() => {
    gsap.fromTo(
      '.project-card',
      { y: 60, opacity: 0 },
      {
        y: 0, opacity: 1,
        duration: 0.7,
        ease: 'power3.out',
        stagger: { amount: 0.6, from: 'start' },
        delay: 0.1,
      }
    )
  }, [activeCategory])

  return (
    <section ref={sectionRef} id="projects" className="py-28 md:py-36 bg-off-white relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 60% 40% at 80% 20%, rgba(16, 185, 129, 0.04) 0%, transparent 60%)',
      }} />

      <div className="section-padding max-w-7xl mx-auto">
        {/* Header */}
        <div ref={headingRef} style={{ opacity: 0 }} className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="emerald-line" />
            <span className="text-xs tracking-[0.25em] uppercase text-emerald-700 font-mono">Selected Work</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h2 className="heading-lg text-ink">
              Real Projects,
              <br />
              <span className="gradient-text">Real Impact</span>
            </h2>
            <p className="text-muted max-w-sm leading-relaxed">
              16 live projects from real GitHub repositories — spanning e-commerce, SaaS, wellness, education, and beyond.
            </p>
          </div>
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap gap-3 mb-12">
          {uniqueCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`tag transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-emerald-600 text-white border-transparent'
                  : 'bg-white text-muted border border-border-green hover:border-emerald-400 hover:text-emerald-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {filteredProjects.map((project, idx) => (
            <ProjectCard key={project.id} project={project} index={idx} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <a
            href="https://github.com/PS1852"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline inline-flex"
          >
            <Github size={18} />
            View All on GitHub
          </a>
        </div>
      </div>
    </section>
  )
}
