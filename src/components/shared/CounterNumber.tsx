import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';

export function CounterNumber({ value, prefix = '', suffix = '' }: { value: number, prefix?: string, suffix?: string }) {
  const counterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = counterRef.current;
    if (!el) return;

    let obj = { val: 0 };
    
    gsap.to(obj, {
      val: value,
      duration: 2,
      ease: 'power3.out',
      roundProps: 'val',
      onUpdate: () => {
        el.innerText = `${prefix}${obj.val}${suffix}`;
      },
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        once: true
      }
    });
  }, [value, prefix, suffix]);

  return (
    <span ref={counterRef} className="tabular-nums">
      {prefix}0{suffix}
    </span>
  );
}
