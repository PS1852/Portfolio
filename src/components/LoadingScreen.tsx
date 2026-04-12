import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const brandRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const taglineRef = useRef<HTMLDivElement>(null)
  const panelLeftRef = useRef<HTMLDivElement>(null)
  const panelRightRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        onComplete()
      },
    })

    tl.set(containerRef.current, { opacity: 1 })

    // Brand name letter reveal
    tl.fromTo(
      brandRef.current,
      { clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)', opacity: 0 },
      { clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)', opacity: 1, duration: 0.8, ease: 'power4.out' }
    )

    // Line grows
    tl.fromTo(
      lineRef.current,
      { scaleX: 0 },
      { scaleX: 1, duration: 0.6, ease: 'power3.inOut' },
      '-=0.2'
    )

    // Tagline appears
    tl.fromTo(
      taglineRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' },
      '-=0.2'
    )

    // Hold
    tl.to({}, { duration: 0.8 })

    // Panels slide out
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
      {/* Left Panel */}
      <div
        ref={panelLeftRef}
        className="absolute inset-0 w-1/2 left-0 z-10 flex items-center justify-end pr-8"
        style={{ background: 'linear-gradient(135deg, #0A1F14 0%, #0d2b1a 100%)' }}
      />

      {/* Right Panel */}
      <div
        ref={panelRightRef}
        className="absolute inset-0 w-1/2 right-0 left-1/2 z-10"
        style={{ background: 'linear-gradient(135deg, #0d2b1a 0%, #061210 100%)' }}
      />

      {/* Center content - above panels */}
      <div className="relative z-20 flex flex-col items-center justify-center w-full">
        {/* Floating decorative dots */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-emerald-500 opacity-20"
              style={{
                width: `${Math.random() * 6 + 3}px`,
                height: `${Math.random() * 6 + 3}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float ${4 + i}s ease-in-out infinite`,
                animationDelay: `${i * 0.3}s`,
              }}
            />
          ))}
        </div>

        <div
          ref={brandRef}
          style={{ clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)' }}
          className="text-center"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500 flex items-center justify-center text-white text-2xl font-bold font-serif">
              P
            </div>
            <h1
              className="text-5xl md:text-7xl font-bold tracking-tight"
              style={{
                fontFamily: 'Playfair Display, serif',
                background: 'linear-gradient(135deg, #ffffff, #a7f3d0)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              PWS
            </h1>
          </div>
        </div>

        <div
          ref={lineRef}
          className="w-48 h-px bg-emerald-500 my-6"
          style={{ transformOrigin: 'left center' }}
        />

        <div ref={taglineRef} style={{ opacity: 0 }}>
          <p
            className="text-emerald-300 text-sm tracking-[0.3em] uppercase font-mono"
          >
            Pranjal Web Studio
          </p>
        </div>
      </div>
    </div>
  )
}
