import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Send, Github, Linkedin, Dribbble, Mail } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ContactFooterProps {
  className?: string;
}

export default function ContactFooter({ className = '' }: ContactFooterProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Headline reveal
      gsap.fromTo(
        headlineRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: headlineRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Form fields stagger
      const formFields = formRef.current?.querySelectorAll('.form-field');
      if (formFields) {
        gsap.fromTo(
          formFields,
          { y: 18, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.08,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: formRef.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Footer reveal
      gsap.fromTo(
        footerRef.current,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = formRef.current;
    if (!form) return;
    const fd = new FormData(form as HTMLFormElement);
    const name = fd.get('name')?.toString() ?? '';
    const email = fd.get('email')?.toString() ?? '';
    const budget = fd.get('budget')?.toString() ?? '';
    const message = fd.get('message')?.toString() ?? '';

    const subject = `Website inquiry - ${budget || 'No budget specified'}`;
    const body = `Name: ${name}\nEmail: ${email}\nBudget: ${budget}\n\nMessage:\n${message}`;
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=pranjalshrivastav5@gmail.com&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    setIsSubmitted(true);
    // Open Gmail in new tab
    window.open(gmailUrl, '_blank');
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className={`relative bg-black py-24 lg:py-32 ${className}`}
    >
      <div className="px-6 lg:px-[6vw]">
        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 mb-24">
          {/* Left Column - Headline */}
          <div ref={headlineRef}>
            <h2 className="headline-lg text-white mb-6">
              Ready when you <span className="accent-lime">are.</span>
            </h2>
            <p className="body-text text-[#888] mb-8 max-w-md">
              Share a brief. We'll reply within 2 business days.
            </p>

            {/* Contact Info */}
            <div className="space-y-4">
              <a
                href="mailto:pranjalshrivastav5@gmail.com"
                className="flex items-center gap-3 text-white hover:accent-lime transition-colors"
              >
                <Mail size={18} className="text-[#DFFF00]" />
                <span className="body-text">pranjalshrivastav5@gmail.com</span>
              </a>

              {/* Social Links */}
              <div className="flex items-center gap-4 pt-4">
                <a
                  href="#"
                  className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
                  aria-label="GitHub"
                >
                  <Github size={18} className="text-[#888]" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={18} className="text-[#888]" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
                  aria-label="Dribbble"
                >
                  <Dribbble size={18} className="text-[#888]" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
            <div className="form-field">
              <label className="micro-text text-[#666] mb-2 block">Name</label>
              <input
                type="text"
                name="name"
                placeholder="Your name"
                className="w-full"
                required
              />
            </div>

            <div className="form-field">
              <label className="micro-text text-[#666] mb-2 block">Email</label>
              <input
                type="email"
                name="email"
                placeholder="your@email.com"
                className="w-full"
                required
              />
            </div>

            <div className="form-field">
              <label className="micro-text text-[#666] mb-2 block">Budget Range</label>
              <select name="budget" className="w-full bg-black/50 text-white border border-white/10 rounded-lg px-4 py-3 focus:border-[#DFFF00] focus:outline-none">
                <option value="" className="bg-black">Select a range</option>
                <option value="10k-25k" className="bg-black">$10,000 - $25,000</option>
                <option value="25k-50k" className="bg-black">$25,000 - $50,000</option>
                <option value="50k-100k" className="bg-black">$50,000 - $100,000</option>
                <option value="100k+" className="bg-black">$100,000+</option>
              </select>
            </div>

            <div className="form-field">
              <label className="micro-text text-[#666] mb-2 block">Message</label>
              <textarea
                name="message"
                placeholder="Tell us about your project..."
                rows={4}
                className="w-full resize-none"
                required
              />
            </div>

            <div className="form-field pt-2">
              <button
                type="submit"
                className="btn-primary w-full flex items-center justify-center gap-2"
              >
                {isSubmitted ? (
                  <>Message Sent</>
                ) : (
                  <>
                    Send Inquiry
                    <Send size={16} />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div
          ref={footerRef}
          className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <div className="flex items-center gap-3">
            <img
              src="./images/logo.png"
              alt="Pranjal Web Studio"
              className="h-8 w-auto opacity-80"
            />
            <span className="micro-text text-[#666]">Pranjal Web Studio</span>
          </div>

          <p className="micro-text text-[#444]">
            © 2026 Pranjal Web Studio. All rights reserved.
          </p>
        </div>
      </div>
    </section>
  );
}
