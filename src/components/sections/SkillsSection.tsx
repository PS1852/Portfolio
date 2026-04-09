import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import { skills } from '@/data/portfolio';

const keySkills = [
  { name: 'React/Next.js', value: 95 },
  { name: 'UI/UX Design', value: 90 },
  { name: 'GSAP Animation', value: 85 },
  { name: 'Backend (Node)', value: 80 }
];

export function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cloudRef = useRef<HTMLDivElement>(null);
  const arcsRef = useRef<(SVGCircleElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    // Floating tag cloud
    const tags = cloudRef.current?.children;
    if (tags) {
      Array.from(tags).forEach((tag) => {
        gsap.to(tag, {
          y: 'random(-20, 20)',
          x: 'random(-20, 20)',
          rotation: 'random(-5, 5)',
          duration: 'random(3, 6)',
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      });
    }

    // Arc animations
    arcsRef.current.forEach((arc) => {
      if (!arc) return;
      const length = arc.getTotalLength();
      gsap.set(arc, { strokeDasharray: length, strokeDashoffset: length });

      gsap.to(arc, {
        strokeDashoffset: 0, // We handle the percentage visually by stopping it via the CSS mapping, but let's animate to the data-value
        duration: 2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: arc,
          start: 'top 85%',
        },
        onUpdate: function() {
          // Adjust stroke offset based on progress and target value
          const targetOffset = length - (length * parseInt(arc.getAttribute('data-value') || '0', 10) / 100);
          const currentOffset = length - (length - targetOffset) * this.progress();
          gsap.set(arc, { strokeDashoffset: currentOffset });
        }
      });
    });

  }, []);

  return (
    <section ref={sectionRef} id="skills" className="relative w-full py-32 bg-[#111] overflow-hidden">
      {/* Brushed metal texture bg */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay shadow-inner"
        style={{
          backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 2px, #fff 2px, #fff 4px), repeating-linear-gradient(-45deg, transparent, transparent 2px, #fff 2px, #fff 4px)',
          backgroundSize: '8px 8px'
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#111] via-transparent to-[#111]" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        <div className="text-center mb-24">
          <span className="text-micro text-luxury-gold mb-4 block">EXPERTISE</span>
          <h2 className="text-h2 font-display text-white">Technical Arsenal</h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Progress Arcs - Cockpit Instrument Panel style */}
          <div className="grid grid-cols-2 gap-8">
            {keySkills.map((skill, index) => (
              <div key={skill.name} className="flex flex-col items-center justify-center p-6 bg-black/40 border border-white/5 rounded-2xl backdrop-blur-sm relative group cursor-pointer hover:border-luxury-gold/30 transition-colors">
                <div className="relative w-32 h-32 mb-4">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle 
                      cx="64" cy="64" r="56" 
                      stroke="rgba(255,255,255,0.05)" 
                      strokeWidth="6" 
                      fill="none" 
                    />
                    <circle 
                      ref={el => { arcsRef.current[index] = el; }}
                      data-value={skill.value}
                      cx="64" cy="64" r="56" 
                      stroke="#C9A84C" 
                      strokeWidth="6" 
                      fill="none"
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center flex-col">
                    <span className="font-mono text-2xl text-white group-hover:text-luxury-gold transition-colors">{skill.value}%</span>
                  </div>
                </div>
                <div className="text-sm tracking-wide text-white/70 text-center font-medium uppercase font-sans">
                  {skill.name}
                </div>
              </div>
            ))}
          </div>

          {/* Floating Tag Cloud */}
          <div ref={cloudRef} className="relative h-[400px] flex items-center justify-center flex-wrap gap-4 p-8">
            {skills.map((skill, index) => {
              // Calculate random font sizes, opacities
              const fontSize = Math.random() > 0.8 ? 'text-4xl' : Math.random() > 0.4 ? 'text-2xl' : 'text-lg';
              const opacity = Math.random() > 0.8 ? 'opacity-100' : Math.random() > 0.4 ? 'opacity-60' : 'opacity-30';
              
              return (
                <div 
                  key={index} 
                  className={`absolute font-display font-medium text-white transition-colors duration-300 hover:!text-luxury-gold hover:!opacity-100 cursor-pointer ${fontSize} ${opacity}`}
                  style={{
                    left: `${10 + Math.random() * 60}%`,
                    top: `${10 + Math.random() * 60}%`,
                  }}
                >
                  {skill}
                </div>
              )
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
