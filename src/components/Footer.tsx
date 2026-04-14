import { Instagram, Github, Mail, ArrowUpRight } from 'lucide-react'

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
]

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer
      className="relative py-20 overflow-hidden"
      style={{ background: '#0A1F14', borderTop: '1px solid rgba(16, 185, 129, 0.1)' }}
    >
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-30" />
      </div>

      <div className="section-padding max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12 mb-16">
          {/* Brand */}
          <div className="col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 relative">
                <img 
                  src="./images/logo.png" 
                  alt="Logo" 
                  className="w-full h-full object-contain filter brightness-110 saturate-110"
                />
              </div>
              <span
                className="text-xl font-bold text-white tracking-tight"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                PRANJAL <span className="text-emerald-500 font-medium">STUDIO</span>
              </span>
            </div>
            <p className="text-emerald-300/60 text-sm leading-relaxed max-w-xs mb-6">
              Crafting digital experiences that captivate and convert.
              Specializing in modern web development and stunning design.
            </p>
            {/* Social */}
            <div className="flex gap-3">
              <a
                href="https://www.instagram.com/pranjalwebstudio/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg border border-emerald-800 flex items-center justify-center text-emerald-400 hover:bg-emerald-600 hover:border-emerald-600 transition-all duration-300"
                aria-label="Instagram"
              >
                <Instagram size={16} />
              </a>
              <a
                href="https://github.com/PS1852"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg border border-emerald-800 flex items-center justify-center text-emerald-400 hover:bg-emerald-600 hover:border-emerald-600 transition-all duration-300"
                aria-label="GitHub"
              >
                <Github size={16} />
              </a>
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=pranjalshrivastav5@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg border border-emerald-800 flex items-center justify-center text-emerald-400 hover:bg-emerald-600 hover:border-emerald-600 transition-all duration-300"
                aria-label="Email"
              >
                <Mail size={16} />
              </a>
            </div>
          </div>

          {/* Quick Nav */}
          <div>
            <p className="text-xs font-mono tracking-[0.2em] uppercase text-emerald-500 mb-6">Navigation</p>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="text-emerald-300/60 hover:text-emerald-400 text-sm transition-colors duration-300 group flex items-center gap-2"
                  >
                    <span className="w-0 h-px bg-emerald-500 group-hover:w-4 transition-all duration-300" />
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <div>
            <p className="text-xs font-mono tracking-[0.2em] uppercase text-emerald-500 mb-6">Ready to Start?</p>
            <p className="text-emerald-300/60 text-sm mb-6 leading-relaxed">
              Let's build something exceptional together.
            </p>
            <button
              onClick={() => scrollTo('#contact')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-500 transition-colors duration-300 group"
            >
              Start a Project
              <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 duration-300" />
            </button>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-emerald-900">
          <p className="text-emerald-300/40 text-xs font-mono">
            © {currentYear} Pranjal Web Studio. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <span className="text-emerald-300/40 text-xs font-mono">
              pranjalshrivastav5@gmail.com
            </span>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-emerald-400/60 text-xs font-mono">Available for work</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
