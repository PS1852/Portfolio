import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import { owner } from '@/data/portfolio';

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        // Delay before unmounting
        setTimeout(onComplete, 100);
      }
    });

    // 1. Line draws across
    tl.to(lineRef.current, {
      width: '100%',
      duration: 1.5,
      ease: 'power2.inOut',
    });

    // 2. Fast counter to 100
    let counterObj = { val: 0 };
    tl.to(counterObj, {
      val: 100,
      duration: 1.5,
      roundProps: 'val',
      ease: 'power1.inOut',
      onUpdate: () => {
        if (counterRef.current) {
          counterRef.current.innerText = `${counterObj.val}%`;
        }
      }
    }, '<');

    // 3. Owner name letters fade in stagger (using manual split for simplicity)
    const letters = textRef.current?.querySelectorAll('.char');
    if (letters) {
      tl.fromTo(letters, 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.05, ease: 'power2.out' },
        '-=0.5'
      );
    }

    // 4. Panel split out
    tl.to([leftPanelRef.current, rightPanelRef.current], {
      x: (index: number) => index === 0 ? '-100%' : '100%',
      duration: 1.2,
      ease: 'power3.inOut',
      delay: 0.3
    });
    
    tl.to(containerRef.current, {
      opacity: 0,
      duration: 0.2,
    });

  }, [onComplete]);

  return (
    <div ref={containerRef} className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none text-white overflow-hidden">
      <div ref={leftPanelRef} className="absolute left-0 top-0 w-1/2 h-full bg-[#0A0A0A]" />
      <div ref={rightPanelRef} className="absolute right-0 top-0 w-1/2 h-full bg-[#0A0A0A]" />
      
      <div className="relative z-10 flex flex-col items-center">
        <div ref={textRef} className="text-4xl md:text-6xl font-display font-medium tracking-wide mb-8 flex overflow-hidden">
          {owner.name.split('').map((char: string, i: number) => (
            <span key={i} className="char inline-block">{char}</span>
          ))}
        </div>
        
        <div className="w-64 md:w-96 h-[1px] bg-white/20 mb-4">
          <div ref={lineRef} className="h-full w-0 bg-luxury-gold" />
        </div>
        
        <div ref={counterRef} className="font-mono text-sm tracking-widest text-white/50">
          0%
        </div>
      </div>
    </div>
  );
}
