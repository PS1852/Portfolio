import { useEffect, useRef, useMemo } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion } from 'framer-motion'
import { ArrowDown, Github, Instagram } from 'lucide-react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, Float, MeshTransmissionMaterial } from '@react-three/drei'
import * as THREE from 'three'
import ThreeBackground from '@/components/ThreeBackground'

gsap.registerPlugin(ScrollTrigger)

function GemGeometry() {
  const geometry = useMemo(() => {
    // Defines the classic diamond/gem profile: bottom point, girdle (wide part), table edge, center table
    const points = [
      new THREE.Vector2(0, -1.2),
      new THREE.Vector2(1.1, 0),
      new THREE.Vector2(0.7, 0.5),
      new THREE.Vector2(0, 0.5)
    ]
    let geo = new THREE.LatheGeometry(points, 8)
    geo = geo.toNonIndexed() // ensures sharp facets
    geo.computeVertexNormals()
    return geo
  }, [])
  return <primitive object={geometry} attach="geometry" />
}

function InteractiveEmerald() {
  return (
    <div className="absolute top-16 -right-2 lg:-right-8 w-80 h-80 lg:w-[650px] lg:h-[650px] z-20 hidden md:block cursor-grab active:cursor-grabbing pointer-events-auto">
      {/* Moderated camera to find the perfect middle-ground scale */}
      <Canvas camera={{ position: [0, 0, 4.2], fov: 42 }} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} penumbra={1} intensity={1.5} color="#059669" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#047857" />
        
        <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
          {/* Tilted exactly like the provided reference image */}
          <group rotation={[1.0, -0.5, 0.3]}>
            <mesh>
              <GemGeometry />
              {/* Ultra-realistic glass/gem shader */}
              <MeshTransmissionMaterial 
                backside
                color="#10b981"
                transmission={0.96} 
                thickness={1.5} 
                roughness={0.05}
                ior={2.4} 
                chromaticAberration={0.08}
                anisotropy={0.5}
                distortion={0}
                distortionScale={0}
                temporalDistortion={0}
                attenuationDistance={1.2}
                attenuationColor="#047857"
              />
            </mesh>
            {/* Inner glow piece for added depth */}
            <mesh scale={0.8}>
              <GemGeometry />
              <meshPhongMaterial color="#059669" transparent opacity={0.6} shininess={100} />
            </mesh>
          </group>
        </Float>

        <Environment preset="studio" />
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          autoRotate={false}
        />
      </Canvas>
    </div>
  )
}

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const nameRef = useRef<HTMLDivElement>(null)
  const taglineRef = useRef<HTMLDivElement>(null)
  const descRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const tl = gsap.timeline({ delay: 2.2 })

    // Name reveal
    tl.fromTo(
      nameRef.current,
      { y: 80, opacity: 0, clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)' },
      { y: 0, opacity: 1, clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)', duration: 1, ease: 'power4.out' }
    )

    // Tagline
    tl.fromTo(
      taglineRef.current,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
      '-=0.5'
    )

    // Description
    tl.fromTo(
      descRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' },
      '-=0.4'
    )

    // CTA
    tl.fromTo(
      ctaRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' },
      '-=0.3'
    )

    // Scroll indicator
    tl.fromTo(
      scrollRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.6 },
      '-=0.2'
    )


    return () => {
      tl.kill()
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex flex-col overflow-hidden bg-white"
    >
      {/* Removed distracting wireframe ThreeBackground */}
      
      {/* Interactive Emerald */}
      <InteractiveEmerald />

      {/* Mesh gradient background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 80% 60% at 20% 50%, rgba(16, 185, 129, 0.06) 0%, transparent 60%),
            radial-gradient(ellipse 60% 80% at 80% 20%, rgba(5, 150, 105, 0.05) 0%, transparent 60%),
            radial-gradient(ellipse 40% 40% at 50% 90%, rgba(52, 211, 153, 0.04) 0%, transparent 50%)
          `,
          zIndex: 2,
        }}
      />

      {/* Decorative floating dots */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 2 }}>
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-emerald-400"
            style={{
              width: `${3 + (i % 4)}px`,
              height: `${3 + (i % 4)}px`,
              left: `${(i * 17 + 5) % 95}%`,
              top: `${(i * 23 + 10) % 90}%`,
              opacity: 0.15 + (i % 3) * 0.08,
              animation: `drift ${8 + i * 2}s ease-in-out infinite`,
              animationDelay: `${i * 0.8}s`,
            }}
          />
        ))}
      </div>

      {/* Decorative Shape to fill whitespace */}
      <div className="absolute top-20 left-10 opacity-20 hidden lg:block" style={{ zIndex: 1 }}>
        <div className="w-64 h-64 bg-emerald-100 rounded-full blur-[100px]" />
      </div>

      {/* Main content */}
      <div className="section-padding relative w-full pt-40 pb-20" style={{ zIndex: 10 }}>
        <div className="max-w-7xl mx-auto">
          {/* Label */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 2.0, duration: 0.6 }}
            className="flex items-center gap-3 mb-10"
          >
            <div className="w-8 h-px bg-emerald-500" />
            <span className="text-xs tracking-[0.25em] uppercase text-emerald-700 font-mono font-medium">
              Frontend Developer & Graphic Designer
            </span>
          </motion.div>

          {/* Main heading */}
          <div ref={nameRef} style={{ opacity: 0 }} className="overflow-hidden mb-6">
            <h1 className="heading-xl text-ink">
              Crafting{' '}
              <em
                className="block gradient-text not-italic"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                Visionary
              </em>
              Interfaces
            </h1>
          </div>

          <div ref={taglineRef} style={{ opacity: 0 }} className="mb-8">
            <p
              className="text-xl md:text-2xl lg:text-3xl font-light"
              style={{ fontFamily: 'Outfit, sans-serif', color: '#4B5E54', maxWidth: '700px' }}
            >
              That{' '}
              <span className="text-emerald-600 font-medium italic">captivate</span>
              {' '}and{' '}
              <span className="text-emerald-600 font-medium italic">convert</span>
            </p>
          </div>

          <div ref={descRef} style={{ opacity: 0 }} className="mb-12">
            <p
              className="body-lg max-w-xl"
              style={{ color: '#6B7F75', lineHeight: 1.7 }}
            >
              Specializing in high-end frontend architecture and aesthetic graphic design
              for brands that want to leave a lasting digital footprint.
            </p>
          </div>

          <div ref={ctaRef} style={{ opacity: 0 }} className="flex flex-wrap items-center gap-4 mb-20">
            <button
              onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-primary magnetic-btn group"
            >
              <span>View My Work</span>
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="transition-transform group-hover:translate-x-1 duration-300">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
            <button
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-outline magnetic-btn"
            >
              Start a Conversation
            </button>
          </div>

          {/* Social links */}
          <div className="flex items-center gap-6">
            <a
              href="https://github.com/PS1852"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-emerald-600 transition-colors duration-300 flex items-center gap-2 text-sm group"
              aria-label="GitHub"
            >
              <Github size={18} className="transition-transform group-hover:-translate-y-0.5 duration-300" />
              <span className="font-mono text-xs hidden md:inline">PS1852</span>
            </a>
            <a
              href="https://www.instagram.com/pranjalwebstudio/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-emerald-600 transition-colors duration-300 flex items-center gap-3 text-sm group"
              aria-label="Instagram"
            >
              <Instagram size={18} className="transition-transform group-hover:-translate-y-0.5 duration-300" />
              <span className="font-mono text-xs hidden md:inline">pranjalwebstudio</span>
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollRef}
        style={{ opacity: 0, zIndex: 10 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <span className="text-[10px] tracking-[0.3em] uppercase text-emerald-600/60 font-mono font-bold">Scroll Down</span>
        <div className="w-px h-14 bg-gradient-to-b from-emerald-500 via-emerald-200 to-transparent relative overflow-hidden">
           <div className="absolute top-0 left-0 w-full h-1/2 bg-white animate-scroll-indicator" />
        </div>
      </div>

      {/* Stats strip */}
      <div
        className="absolute bottom-0 right-0 hidden lg:flex items-center gap-10 section-padding py-8"
        style={{ zIndex: 15, background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.8))' }}
      >
        <div className="text-right">
          <div className="text-3xl font-bold text-ink font-display leading-none">100+</div>
          <div className="text-[10px] text-muted font-mono tracking-widest uppercase mt-2">Projects</div>
        </div>
        <div className="w-px h-10 bg-emerald-100" />
        <div className="text-right">
          <div className="text-3xl font-bold text-ink font-display leading-none">5+</div>
          <div className="text-[10px] text-muted font-mono tracking-widest uppercase mt-2">Years Exp.</div>
        </div>
      </div>
    </section>
  )
}
