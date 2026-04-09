import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';

export function MagneticButton({ children, className = '' }: { children: React.ReactNode, className?: string }) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  
  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    const xTo = gsap.quickTo(button, 'x', { duration: 1, ease: 'elastic.out(1, 0.3)' });
    const yTo = gsap.quickTo(button, 'y', { duration: 1, ease: 'elastic.out(1, 0.3)' });

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { height, width, left, top } = button.getBoundingClientRect();
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);
      
      // Limit displacement to 20px
      const distance = Math.sqrt(x*x + y*y);
      if (distance < 100) { // proximity radius
        xTo(x * 0.2);
        yTo(y * 0.2);
      } else {
        xTo(0);
        yTo(0);
      }
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
    };

    window.addEventListener('mousemove', handleMouseMove);
    button.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (button) button.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <button ref={buttonRef} className={`magnetic-el ${className}`}>
      {children}
    </button>
  );
}
