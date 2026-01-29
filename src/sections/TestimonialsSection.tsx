import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Quote, Star } from 'lucide-react';
import { testimonials } from '../data/projects';

gsap.registerPlugin(ScrollTrigger);

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

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

      cardsRef.current.forEach((card, index) => {
        if (card) {
          gsap.fromTo(
            card,
            { opacity: 0, y: 40 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              delay: index * 0.1,
              scrollTrigger: {
                trigger: card,
                start: 'top 85%',
              }
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="py-20 md:py-32 w-full relative"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-orange-500/10 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div ref={titleRef} className="text-center mb-16">
          <span className="micro-text text-cyan-400 mb-4 block">Testimonials</span>
          <h2 className="headline-lg text-white mb-4">
            What Clients <span className="gradient-text">Say</span>
          </h2>
          <p className="body-text text-white/60 max-w-2xl mx-auto">
            Don't just take my word for it. Here's what my clients have to say 
            about working with me.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              ref={el => { cardsRef.current[index] = el; }}
              className="testimonial-card flex flex-col"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} className="text-orange-400 fill-orange-400" />
                ))}
              </div>

              {/* Quote */}
              <Quote size={24} className="text-purple-400 mb-3" />
              
              <p className="text-white/80 text-sm leading-relaxed flex-grow mb-6">
                "{testimonial.quote}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 mt-auto pt-4 border-t border-white/10">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-orange-500 flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">
                    {testimonial.avatar}
                  </span>
                </div>
                <div>
                  <div className="text-white font-medium text-sm">
                    {testimonial.author}
                  </div>
                  <div className="text-white/50 text-xs">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Row */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="glass-card p-6 text-center">
            <div className="text-3xl md:text-4xl font-display font-bold gradient-text mb-2">100+</div>
            <div className="text-white/60 text-sm">Projects Completed</div>
          </div>
          <div className="glass-card p-6 text-center">
            <div className="text-3xl md:text-4xl font-display font-bold gradient-text-orange mb-2">50+</div>
            <div className="text-white/60 text-sm">Happy Clients</div>
          </div>
          <div className="glass-card p-6 text-center">
            <div className="text-3xl md:text-4xl font-display font-bold gradient-text-purple mb-2">5+</div>
            <div className="text-white/60 text-sm">Years Experience</div>
          </div>
          <div className="glass-card p-6 text-center">
            <div className="text-3xl md:text-4xl font-display font-bold gradient-text mb-2">99%</div>
            <div className="text-white/60 text-sm">Client Satisfaction</div>
          </div>
        </div>
      </div>
    </section>
  );
}
