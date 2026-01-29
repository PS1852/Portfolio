import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Send, Mail, MapPin, Instagram, Github, CheckCircle, Loader2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 80%',
          }
        }
      );

      gsap.fromTo(
        formRef.current,
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: formRef.current,
            start: 'top 80%',
          }
        }
      );

      gsap.fromTo(
        infoRef.current,
        { opacity: 0, x: 30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: infoRef.current,
            start: 'top 80%',
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const subjectMap: Record<string, string> = {
      'web-development': 'Web Development',
      'graphic-design': 'Graphic Design',
      'ui-ux-design': 'UI/UX Design',
      'other': 'Other'
    };

    const subjectText = formData.subject ? (subjectMap[formData.subject] ?? formData.subject) : 'New inquiry';

    const body = `Name: ${formData.name}\nEmail: ${formData.email}\nSubject: ${subjectText}\n\nMessage:\n${formData.message}`;

    const mailto = `mailto:pranjalshrivastav5@gmail.com?subject=${encodeURIComponent(subjectText)}&body=${encodeURIComponent(body)}`;

    setIsSubmitting(true);

    // small delay to show button state, then open mail client
    setTimeout(() => {
      setIsSubmitting(false);
      window.location.href = mailto;
      setIsSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setIsSubmitted(false), 5000);
    }, 300);
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="py-20 md:py-32 w-full relative"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div ref={titleRef} className="text-center mb-16">
          <span className="micro-text text-pink-400 mb-4 block">Get In Touch</span>
          <h2 className="headline-lg text-white mb-4">
            Let's Work <span className="gradient-text">Together</span>
          </h2>
          <p className="body-text text-white/60 max-w-2xl mx-auto">
            Have a project in mind? I'd love to hear about it. Send me a message 
            and let's create something amazing together.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact Form */}
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="glass-card p-6 md:p-8"
          >
            {isSubmitted ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mb-4">
                  <CheckCircle size={32} className="text-green-400" />
                </div>
                <h3 className="text-xl font-display font-semibold text-white mb-2">
                  Message Sent!
                </h3>
                <p className="text-white/60">
                  Thank you for reaching out. I'll get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <>
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-white/80 text-sm mb-2">Your Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      required
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-white/80 text-sm mb-2">Your Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      required
                      className="w-full"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-white/80 text-sm mb-2">Subject</label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full"
                  >
                    <option value="" className="bg-[#1a0a2e]">Select a subject</option>
                    <option value="web-development" className="bg-[#1a0a2e]">Web Development</option>
                    <option value="graphic-design" className="bg-[#1a0a2e]">Graphic Design</option>
                    <option value="ui-ux-design" className="bg-[#1a0a2e]">UI/UX Design</option>
                    <option value="other" className="bg-[#1a0a2e]">Other</option>
                  </select>
                </div>

                <div className="mb-6">
                  <label className="block text-white/80 text-sm mb-2">Your Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project..."
                    rows={5}
                    required
                    className="w-full resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      Send Message
                    </>
                  )}
                </button>
              </>
            )}
          </form>

          {/* Contact Info */}
          <div ref={infoRef} className="space-y-6">
            {/* Email Card */}
            <div className="glass-card p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                  <Mail size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="text-white font-display font-semibold mb-1">Email</h3>
                  <a 
                    href="mailto:pranjalshrivastav5@gmail.com"
                    className="text-white/70 hover:text-purple-400 transition-colors"
                  >
                    pranjalshrivastav5@gmail.com
                  </a>
                </div>
              </div>
            </div>

            {/* Location Card */}
            <div className="glass-card p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-yellow-500 flex items-center justify-center flex-shrink-0">
                  <MapPin size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="text-white font-display font-semibold mb-1">Location</h3>
                  <p className="text-white/70">
                    Available Worldwide (Remote)
                  </p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="glass-card p-6">
              <h3 className="text-white font-display font-semibold mb-4">Connect With Me</h3>
              <div className="flex gap-4">
                <a
                  href="https://www.instagram.com/pranjalwebstudio/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon"
                >
                  <Instagram size={20} />
                </a>
                <a
                  href="https://github.com/PS1852"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon"
                >
                  <Github size={20} />
                </a>
              </div>
            </div>

            {/* Response Time */}
            <div className="glass-card p-6 border border-purple-500/30">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />
                <span className="text-green-400 text-sm font-medium">Available for new projects</span>
              </div>
              <p className="text-white/60 text-sm">
                I typically respond to all inquiries within 24 hours. Let's discuss your project!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
