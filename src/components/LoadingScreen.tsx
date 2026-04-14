import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { Logo3D } from './shared/Logo3D'

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const panelLeftRef = useRef<HTMLDivElement>(null)
  const panelRightRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const brandRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const taglineRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        onComplete()
      },
    })

    tl.set(containerRef.current, { opacity: 1 })

    // Brand name and logo reveal
    tl.fromTo(
      brandRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power4.out' }
    )

    // Line grows
    tl.fromTo(
      lineRef.current,
      { scaleX: 0 },
      { scaleX: 1, duration: 0.6, ease: 'power3.inOut' },
      '-=0.4'
    )

    // Tagline appears
    tl.fromTo(
      taglineRef.current,
      { y: 15, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' },
      '-=0.2'
    )

    // Hold for user to appreciate the 3D logo
    tl.to({}, { duration: 1.2 })

    // Content and glow fade out simultaneously
    tl.to(
      [contentRef.current, glowRef.current],
      { opacity: 0, duration: 0.5, ease: 'power3.inOut' }
    )

    // The preferred horizontal "door" parting animation
    tl.to(
      panelLeftRef.current,
      { x: '-100%', duration: 0.8, ease: 'power4.inOut' },
      '+=0.1'
    )
    tl.to(
      panelRightRef.current,
      { x: '100%', duration: 0.8, ease: 'power4.inOut' },
      '<'
    )

    return () => {
      tl.kill()
    }
  }, [onComplete])

  return (
    <div
      id="loading-screen"
      ref={containerRef}
      style={{ opacity: 1 }}
      className="fixed inset-0 z-[9998] flex overflow-hidden"
    >
      {/* 
        Solid seamless colors fix WebGL alpha transmission boundaries.
        Width is 50.5% to ensure zero 1px gap forms during browser rendering sub-pixel calculations.
      */}
      <div
        ref={panelLeftRef}
        className="absolute inset-0 w-[50.5%] left-0 z-10"
        style={{ backgroundColor: '#06160F' }}
      />
      <div
        ref={panelRightRef}
        className="absolute inset-0 w-[50.5%] right-0 left-[49.5%] z-10"
        style={{ backgroundColor: '#06160F' }}
      />

      {/* Shared Glow centered over the seams to create depth without grid lines */}
      <div 
        ref={glowRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none z-10" 
      />

      {/* Center content */}
      <div 
        ref={contentRef}
        className="relative z-20 flex flex-col items-center justify-center w-full min-h-screen pb-10"
      >
        <div
          ref={brandRef}
          className="flex flex-col items-center justify-center gap-6"
        >
          <div className="w-24 h-24 md:w-32 md:h-32 flex items-center justify-center relative pointer-events-auto">
            {/* Soft highlight behind the gem */}
            <div className="absolute inset-0 bg-emerald-400/20 rounded-full blur-2xl" />
            <Logo3D size={160} />
          </div>
          
          <h1
            className="text-4xl md:text-6xl font-bold tracking-tight text-center"
            style={{
              fontFamily: 'Playfair Display, serif',
              background: 'linear-gradient(135deg, #ffffff, #a7f3d0)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            PRANJAL<br/>WEB STUDIO
          </h1>
        </div>

        <div
          ref={lineRef}
          className="w-16 h-px bg-emerald-500 my-8"
          style={{ transformOrigin: 'center center' }}
        />

        <div ref={taglineRef} style={{ opacity: 0 }}>
          <p
            className="text-emerald-400/80 text-[10px] md:text-xs tracking-[0.4em] md:tracking-[0.6em] uppercase font-mono text-center"
          >
            Visionary Interfaces
          </p>
        </div>
      </div>
    </div>
  )
}
