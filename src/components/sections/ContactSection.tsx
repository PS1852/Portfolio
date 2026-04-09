import { useState } from 'react';
import { owner } from '@/data/portfolio';
import { MagneticButton } from '@/components/shared/MagneticButton';
import { Instagram, Github } from 'lucide-react';

export function ContactSection() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const body = `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`;
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${owner.email}&subject=Portfolio Inquiry&body=${encodeURIComponent(body)}`;
    
    setTimeout(() => {
      setIsSubmitting(false);
      window.open(gmailUrl, '_blank');
      setFormData({ name: '', email: '', message: '' });
    }, 500);
  };

  return (
    <section id="contact" className="relative w-full py-32 bg-[#0A0A0A] text-white overflow-hidden">
      {/* Background terminal interior parallax */}
      <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1582967160912-1f81d11ffbe8?w=2000&q=50&auto=format&fit=crop')] bg-cover bg-fixed bg-center pointer-events-none mix-blend-luminosity" />
      <div className="absolute inset-0 bg-[#0A0A0A]/80" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        
        <div className="mb-20">
          <h2 className="text-display leading-[0.9]">
            Let's Work <br/>
            <span className="text-luxury-gold italic">Together</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-12 gap-16 lg:gap-24">
          
          <div className="lg:col-span-5 flex flex-col gap-12">
            <div>
              <p className="text-micro text-white/50 mb-4 block">DIRECT INQUIRIES</p>
              <MagneticButton>
                <a href={`mailto:${owner.email}`} className="text-2xl md:text-3xl font-display font-light hover:text-luxury-gold transition-colors break-all">
                  {owner.email}
                </a>
              </MagneticButton>
            </div>
            
            <div>
              <p className="text-micro text-white/50 mb-4 block">BASE OPERATIONS</p>
              <p className="text-xl font-sans font-light">
                {owner.location}
              </p>
            </div>

            <div>
              <p className="text-micro text-white/50 mb-4 block">SOCIAL CHANNELS</p>
              <div className="flex gap-6">
                <a href={owner.socials.instagram} target="_blank" rel="noreferrer" className="w-12 h-12 border border-white/20 rounded-full flex items-center justify-center hover:border-luxury-gold hover:text-luxury-gold transition-all duration-300">
                  <Instagram size={20} />
                </a>
                <a href={owner.socials.github} target="_blank" rel="noreferrer" className="w-12 h-12 border border-white/20 rounded-full flex items-center justify-center hover:border-luxury-gold hover:text-luxury-gold transition-all duration-300">
                  <Github size={20} />
                </a>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="flex flex-col gap-12">
              
              <div className="relative group">
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="What's your name?"
                  className="w-full bg-transparent border-b border-white/20 pb-4 text-xl outline-none placeholder-white/30 font-light focus:border-transparent transition-colors"
                />
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-luxury-gold transition-all duration-500 ease-out group-focus-within:w-full" />
              </div>

              <div className="relative group">
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="What's your email?"
                  className="w-full bg-transparent border-b border-white/20 pb-4 text-xl outline-none placeholder-white/30 font-light focus:border-transparent transition-colors"
                />
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-luxury-gold transition-all duration-500 ease-out group-focus-within:w-full" />
              </div>

              <div className="relative group">
                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  placeholder="Tell me about your project..."
                  className="w-full bg-transparent border-b border-white/20 pb-4 text-lg outline-none placeholder-white/30 font-light resize-none focus:border-transparent transition-colors"
                />
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-luxury-gold transition-all duration-500 ease-out group-focus-within:w-full" />
              </div>

              <MagneticButton className="self-start">
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="flex items-center gap-4 text-sm tracking-widest font-semibold uppercase bg-white text-black px-10 py-5 hover:bg-luxury-gold transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? 'Processing...' : 'Send Inquiry'}
                </button>
              </MagneticButton>

            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
