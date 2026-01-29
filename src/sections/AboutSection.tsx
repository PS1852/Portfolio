import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Code, Palette, Layout, Zap, Monitor, Smartphone } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: Code,
    title: 'Web Development',
    description: 'Building fast, responsive, and scalable websites using modern technologies like React, Next.js, and Node.js.',
    color: 'from-purple-500 to-pink-500'
  },
  {
    icon: Palette,
    title: 'Graphic Design',
    description: 'Creating stunning visuals, brand identities, and marketing materials that capture attention and communicate effectively.',
    color: 'from-orange-500 to-yellow-500'
  },
  {
    icon: Layout,
    title: 'UI/UX Design',
    description: 'Designing intuitive user interfaces and seamless experiences that delight users and drive conversions.',
    color: 'from-cyan-500 to-blue-500'
  },
  {
    icon: Zap,
    title: 'Performance Optimization',
    description: 'Optimizing websites for speed, SEO, and accessibility to ensure the best possible user experience.',
    color: 'from-green-500 to-emerald-500'
  },
  {
    icon: Monitor,
    title: 'Responsive Design',
    description: 'Ensuring your website looks and works perfectly on all devices, from desktops to mobile phones.',
    color: 'from-red-500 to-rose-500'
  },
  {
    icon: Smartphone,
    title: 'Mobile-First Approach',
    description: 'Designing with mobile users in mind to capture the growing mobile audience effectively.',
    color: 'from-violet-500 to-purple-500'
  }
];

export default function AboutSection() {
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
      id="about"
      className="py-20 md:py-32 w-full relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div ref={titleRef} className="text-center mb-16">
          <span className="micro-text text-purple-400 mb-4 block">What I Do</span>
          <h2 className="headline-lg text-white mb-4">
            Services That <span className="gradient-text">Deliver Results</span>
          </h2>
          <p className="body-text text-white/60 max-w-2xl mx-auto">
            From concept to launch, I provide end-to-end digital solutions that help 
            businesses grow and succeed in the digital landscape.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={service.title}
              ref={el => { cardsRef.current[index] = el; }}
              className="glass-card glass-card-hover p-6"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-4`}>
                <service.icon size={24} className="text-white" />
              </div>
              <h3 className="text-lg font-display font-semibold text-white mb-2">
                {service.title}
              </h3>
              <p className="text-white/60 text-sm leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>

        {/* Image Section */}
        <div className="mt-20 relative">
          <div className="rounded-3xl overflow-hidden border border-white/10">
            <img
              src="/images/about_design.jpg"
              alt="Design Process"
              className="w-full h-auto"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#1a0a2e]/90 via-transparent to-[#1a0a2e]/90" />
          </div>
          
          {/* Overlay Content */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center px-4">
              <h3 className="headline-md text-white mb-4">
                Let's Create Something <span className="gradient-text">Amazing</span>
              </h3>
              <p className="text-white/70 max-w-lg mx-auto mb-6">
                Every project is an opportunity to push boundaries and create 
                something truly unique. Ready to start your journey?
              </p>
              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-primary"
              >
                Get In Touch
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
