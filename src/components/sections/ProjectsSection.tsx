import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import { projects } from '@/data/portfolio';

// A selection of luxury aviation IDs for varied card backgrounds
const aviationIDs = [
  'ogUyaf8JWA4', 
  'GY5DRTNWwOk', 
  'Fz2Dx3k3eTY', 
  'lU1pEjWZzXg', 
  'tlG_fFfWF98'
];

export function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!sectionRef.current || !trackRef.current) return;

    const sections = trackRef.current.children;
    
    // Horizontal scroll pinning
    gsap.to(sections, {
      xPercent: -100 * (sections.length - 1),
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        pin: true,
        scrub: 1,
        snap: 1 / (sections.length - 1),
        end: () => `+=${trackRef.current?.offsetWidth || 0}`
      }
    });

  }, []);

  return (
    <section ref={sectionRef} id="projects" className="w-full h-screen bg-[#050505] overflow-hidden relative">
      <div className="absolute top-12 left-6 md:left-12 z-20 mix-blend-difference text-white">
        <span className="text-micro text-luxury-gold tracking-widest block mb-2">SELECTED WORKS</span>
        <h2 className="text-h2 font-display">Portfolio</h2>
      </div>

      <div ref={trackRef} className="flex w-[500vw] h-full items-center">
        {projects.map((project, index) => {
          const bgID = aviationIDs[index % aviationIDs.length];
          const bgUrl = `https://images.unsplash.com/photo-${bgID}?w=1200&q=80&auto=format&fit=crop`;
          
          return (
            <div key={project.id} className="w-screen h-full flex items-center justify-center relative p-6 md:p-12">
              <div className="w-full max-w-[80vw] md:max-w-[50vw] h-[60vh] md:h-[70vh] relative rounded-lg overflow-hidden group project-card cursor-pointer">
                
                {/* Background Image with Ken Burns effect */}
                <div className="absolute inset-0 w-full h-full overflow-hidden">
                  <img 
                    src={bgUrl} 
                    alt={project.title} 
                    loading="lazy"
                    className="w-full h-full object-cover scale-105 transition-transform duration-[20s] group-hover:scale-125 ease-out" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                
                {/* Content Overlay */}
                <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 flex flex-col justify-end translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="flex gap-2 mb-4 flex-wrap">
                    {project.technologies.slice(0, 3).map(tech => (
                      <span key={tech} className="px-3 py-1 bg-white/10 backdrop-blur-md rounded border border-white/20 text-[10px] uppercase tracking-widest text-white/80 group-hover:border-luxury-gold transition-colors">
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <h3 className="text-3xl md:text-5xl font-display text-white mb-4">{project.title}</h3>
                  <p className="text-white/70 max-w-md font-light text-sm md:text-base line-clamp-2 md:line-clamp-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    {project.shortDescription}
                  </p>

                  <div className="mt-6 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-200 translate-y-4 group-hover:translate-y-0">
                    <button className="flex items-center gap-2 text-luxury-gold text-sm tracking-widest uppercase font-semibold">
                      VIEW PROJECT <span>→</span>
                    </button>
                  </div>
                </div>
                
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
