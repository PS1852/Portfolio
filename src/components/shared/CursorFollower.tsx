import { useEffect, useRef, useState } from 'react';
import { gsap } from '@/lib/gsap';

export function CursorFollower() {
  const circleRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [hoverText, setHoverText] = useState<string | null>(null);
  
  useEffect(() => {
    const circle = circleRef.current;
    const dot = dotRef.current;
    if (!circle || !dot) return;

    // Mouse vectors
    const mouse = { x: 0, y: 0 };
    const circlePos = { x: 0, y: 0 };
    
    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      
      // Dot follows exactly
      gsap.set(dot, { x: mouse.x - 3, y: mouse.y - 3 });
    };

    // Lerp animation for the circle
    const ticker = gsap.ticker.add(() => {
      // Lerp factor
      const dt = 1.0 - Math.pow(1.0 - 0.08, gsap.ticker.deltaRatio());
      circlePos.x += (mouse.x - circlePos.x) * dt;
      circlePos.y += (mouse.y - circlePos.y) * dt;
      
      gsap.set(circle, { x: circlePos.x - 20, y: circlePos.y - 20 });
    });

    // Hover effects
    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Find closest interactive element
      const interactive = target.closest('a, button, [role="button"], input, textarea, .project-card, .magnetic-el');
      
      if (interactive) {
        let text = null;
        if (interactive.classList.contains('project-card')) {
          text = 'VIEW';
        } else if (interactive.tagName === 'A' || interactive.tagName === 'BUTTON') {
          text = '→';
        }
        
        setHoverText(text);
        
        gsap.to(circle, {
          scale: 2,
          backgroundColor: 'rgba(201,168,76,0.15)', // gold tint
          borderColor: 'transparent',
          duration: 0.3
        });
        gsap.to(dot, { opacity: 0, duration: 0.2 });
      } else {
        setHoverText(null);
        gsap.to(circle, {
          scale: 1,
          backgroundColor: 'transparent',
          borderColor: 'rgba(255,255,255,0.4)',
          duration: 0.3
        });
        gsap.to(dot, { opacity: 1, duration: 0.2 });
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', onMouseOver);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
      gsap.ticker.remove(ticker);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[100] hidden md:block mix-blend-difference">
      {/* Circle */}
      <div 
        ref={circleRef} 
        className="absolute top-0 left-0 w-[40px] h-[40px] rounded-full border border-white/40 flex items-center justify-center font-mono text-[8px] font-bold tracking-widest text-[#C9A84C] backdrop-invert-[0.1]"
        style={{ willChange: 'transform' }}
      >
        {hoverText && <span className="opacity-100 mix-blend-normal">{hoverText}</span>}
      </div>
      
      {/* Dot */}
      <div 
        ref={dotRef} 
        className="absolute top-0 left-0 w-[6px] h-[6px] rounded-full bg-[#C9A84C]"
        style={{ willChange: 'transform' }}
      />
    </div>
  );
}
