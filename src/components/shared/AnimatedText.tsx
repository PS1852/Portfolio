import { useEffect, useRef } from 'react';
import SplitType from 'split-type';
import { gsap } from '@/lib/gsap';

interface AnimatedTextProps {
  text: string;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
  type?: 'chars' | 'words' | 'lines';
  delay?: number;
}

export function AnimatedText({ text, className = '', as = 'div', type = 'words', delay = 0 }: AnimatedTextProps) {
  const textRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!textRef.current) return;

    // Split the text
    const split = new SplitType(textRef.current, { types: type });
    
    // Select the newly created elements based on chosen split type
    const targets = split[type === 'chars' ? 'chars' : type === 'words' ? 'words' : 'lines'];

    gsap.fromTo(targets, 
      { opacity: 0, y: 40 },
      {
        opacity: 1, 
        y: 0,
        duration: 0.8,
        stagger: 0.04,
        ease: 'power4.out',
        delay,
        scrollTrigger: {
          trigger: textRef.current,
          start: 'top 85%',
        }
      }
    );

    return () => {
      split.revert();
    };
  }, [text, type, delay]);

  const Component = as as any;

  return (
    <Component ref={textRef} className={className}>
      {text}
    </Component>
  );
}
