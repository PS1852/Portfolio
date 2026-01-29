import { Instagram, Github, Heart } from 'lucide-react';

export default function Footer() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="w-full border-t border-white/10 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo & Copyright */}
          <div className="flex items-center gap-3">
            <img
              src="/images/logo.png"
              alt="PWS Logo"
              className="h-10 w-10 object-contain"
            />
            <div>
              <span className="font-display font-bold text-white">PWS</span>
              <span className="block text-[10px] text-white/50">
                Pranjal Web Studio
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap justify-center gap-6">
            <button
              onClick={() => scrollToSection('hero')}
              className="text-white/60 hover:text-white text-sm transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="text-white/60 hover:text-white text-sm transition-colors"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection('projects')}
              className="text-white/60 hover:text-white text-sm transition-colors"
            >
              Projects
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="text-white/60 hover:text-white text-sm transition-colors"
            >
              Contact
            </button>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            <a
              href="https://www.instagram.com/pranjalwebstudio/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all"
              aria-label="Instagram"
            >
              <Instagram size={16} />
            </a>
            <a
              href="https://github.com/PS1852"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all"
              aria-label="GitHub"
            >
              <Github size={16} />
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm text-center md:text-left">
            © {new Date().getFullYear()} Pranjal Web Studio. All rights reserved.
          </p>
          <p className="text-white/40 text-sm flex items-center gap-1">
            Made with <Heart size={14} className="text-red-400 fill-red-400" /> by Pranjal Shrivastav
          </p>
        </div>
      </div>
    </footer>
  );
}
