import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Mail, MapPin, Instagram, Github, Send, ArrowRight } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

interface FormData {
  name: string
  email: string
  subject: string
  message: string
}

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLDivElement>(null)
  const infoRef = useRef<HTMLDivElement>(null)

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

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
        infoRef.current,
        { x: -50, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: infoRef.current, start: 'top 85%' },
        }
      )

      gsap.fromTo(
        formRef.current,
        { x: 50, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: formRef.current, start: 'top 85%' },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const body = `Hi Pranjal,

My name is ${formData.name}.

${formData.message}

---
From: ${formData.name}
Email: ${formData.email}`

    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=pranjalshrivastav5@gmail.com&su=${encodeURIComponent(formData.subject || 'Project Inquiry')}&body=${encodeURIComponent(body)}`

    window.open(gmailUrl, '_blank')
    setSubmitted(true)

    setTimeout(() => {
      setSubmitted(false)
      setFormData({ name: '', email: '', subject: '', message: '' })
    }, 4000)
  }

  return (
    <section ref={sectionRef} id="contact" className="py-28 md:py-36 bg-off-white relative overflow-hidden">
      {/* Decorations */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-emerald-50 blur-3xl opacity-80 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-emerald-100 blur-2xl opacity-60 pointer-events-none" />

      <div className="section-padding max-w-7xl mx-auto">
        {/* Header */}
        <div ref={headingRef} style={{ opacity: 0 }} className="mb-20">
          <div className="flex items-center gap-3 mb-6">
            <div className="emerald-line" />
            <span className="text-xs tracking-[0.25em] uppercase text-emerald-700 font-mono">Get in Touch</span>
          </div>
          <h2 className="heading-lg text-ink">
            Let's Build
            <br />
            <span className="gradient-text">Something Great</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left: Info */}
          <div ref={infoRef} style={{ opacity: 0 }}>
            <p className="body-lg text-muted mb-10 leading-relaxed">
              Have a project in mind? Ready to elevate your digital presence?
              Let's talk about how we can create something exceptional together.
            </p>

            <div className="space-y-6 mb-12">
              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-xs text-muted font-mono tracking-wider uppercase mb-1">Email</p>
                  <a
                    href="https://mail.google.com/mail/?view=cm&fs=1&to=pranjalshrivastav5@gmail.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-ink hover:text-emerald-600 transition-colors font-medium"
                  >
                    pranjalshrivastav5@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="text-xs text-muted font-mono tracking-wider uppercase mb-1">Location</p>
                  <p className="text-ink font-medium">Available Worldwide (Remote)</p>
                </div>
              </div>
            </div>

            {/* Social */}
            <div>
              <p className="text-xs text-muted font-mono tracking-wider uppercase mb-4">Follow the Work</p>
              <div className="flex gap-4">
                <a
                  href="https://www.instagram.com/pranjalwebstudio/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-5 py-3 rounded-xl border border-border-green bg-white hover:border-emerald-400 hover:text-emerald-700 transition-all duration-300 group text-ink text-sm font-medium"
                  aria-label="Instagram"
                >
                  <Instagram size={18} className="text-emerald-600 group-hover:scale-110 transition-transform duration-300" />
                  Instagram
                </a>
                <a
                  href="https://github.com/PS1852"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-5 py-3 rounded-xl border border-border-green bg-white hover:border-emerald-400 hover:text-emerald-700 transition-all duration-300 group text-ink text-sm font-medium"
                  aria-label="GitHub"
                >
                  <Github size={18} className="text-emerald-600 group-hover:scale-110 transition-transform duration-300" />
                  GitHub
                </a>
              </div>
            </div>

            {/* Availability card */}
            <div className="mt-12 p-6 rounded-2xl border border-emerald-200 bg-emerald-50">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-emerald-700 font-semibold text-sm">Currently Available</span>
              </div>
              <p className="text-muted text-sm leading-relaxed">
                Open for new projects, collaborations, and full-time opportunities.
                Response time: within 24 hours.
              </p>
            </div>
          </div>

          {/* Right: Form */}
          <div ref={formRef} style={{ opacity: 0 }}>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name & Email row */}
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="form-field relative">
                  <label className="block text-xs font-mono tracking-wider uppercase text-muted mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="contact-name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Your name"
                    className="w-full bg-white border border-border-green rounded-xl px-4 py-3 text-ink placeholder-muted/50 focus:border-emerald-400 transition-colors duration-300 text-sm"
                  />
                  <div className="form-field-line" />
                </div>
                <div className="form-field relative">
                  <label className="block text-xs font-mono tracking-wider uppercase text-muted mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="contact-email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="your@email.com"
                    className="w-full bg-white border border-border-green rounded-xl px-4 py-3 text-ink placeholder-muted/50 focus:border-emerald-400 transition-colors duration-300 text-sm"
                  />
                  <div className="form-field-line" />
                </div>
              </div>

              {/* Subject */}
              <div className="form-field relative">
                <label className="block text-xs font-mono tracking-wider uppercase text-muted mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  id="contact-subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Project inquiry, collaboration, etc."
                  className="w-full bg-white border border-border-green rounded-xl px-4 py-3 text-ink placeholder-muted/50 focus:border-emerald-400 transition-colors duration-300 text-sm"
                />
                <div className="form-field-line" />
              </div>

              {/* Message */}
              <div className="form-field relative">
                <label className="block text-xs font-mono tracking-wider uppercase text-muted mb-2">
                  Message *
                </label>
                <textarea
                  name="message"
                  id="contact-message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder="Tell me about your project..."
                  className="w-full bg-white border border-border-green rounded-xl px-4 py-3 text-ink placeholder-muted/50 focus:border-emerald-400 transition-colors duration-300 text-sm resize-none"
                />
                <div className="form-field-line" />
              </div>

              {/* Submit */}
              <button
                type="submit"
                id="contact-submit"
                className="btn-primary w-full justify-center group"
              >
                <span>{submitted ? 'Opening Gmail...' : 'Send Message via Gmail'}</span>
                {submitted ? (
                  <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                ) : (
                  <Send size={18} className="transition-transform group-hover:translate-x-1 duration-300" />
                )}
              </button>

              <p className="text-xs text-muted text-center font-mono">
                Clicking "Send Message" will open Gmail with your message pre-filled.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
