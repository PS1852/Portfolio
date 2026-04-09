import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';

interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
  speed?: number;
  overlay?: boolean;
}

export function ParallaxImage({ src, alt, className = '', speed = 0.2, overlay = true }: ParallaxImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!containerRef.current || !imageRef.current) return;

    // Set initial scale to ensure no margins when moving
    gsap.set(imageRef.current, { scale: 1.2 });

    const tl = gsap.to(imageRef.current, {
      yPercent: 20 * speed * 10,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      }
    });

    return () => {
      tl.kill();
    };
  }, [speed]);

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      <img 
        ref={imageRef} 
        src={src} 
        alt={alt} 
        className="absolute top-[-10%] left-[-10%] w-[120%] h-[120%] object-cover" 
        loading="lazy"
      />
      {overlay && (
        <div className="absolute inset-0 bg-black/30 mix-blend-multiply" />
      )}
    </div>
  );
}
