import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function FloatingShape({
  geometry,
  position,
  speed,
  rotationAxis,
  color = '#10b981',
  wireframe = true,
}: {
  geometry: THREE.BufferGeometry
  position: [number, number, number]
  speed: number
  rotationAxis: [number, number, number]
  color?: string
  wireframe?: boolean
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  const time = useRef(Math.random() * 100)

  useFrame((_, delta) => {
    if (!meshRef.current) return
    time.current += delta * speed
    meshRef.current.rotation.x += delta * rotationAxis[0] * speed
    meshRef.current.rotation.y += delta * rotationAxis[1] * speed
    meshRef.current.rotation.z += delta * rotationAxis[2] * speed
    meshRef.current.position.y = position[1] + Math.sin(time.current) * 0.3
  })

  return (
    <mesh ref={meshRef} geometry={geometry} position={position}>
      {wireframe ? (
        <meshBasicMaterial color={color} wireframe={true} transparent opacity={0.15} />
      ) : (
        <meshPhongMaterial color={color} transparent opacity={0.08} />
      )}
    </mesh>
  )
}

function Scene() {
  const icosa = new THREE.IcosahedronGeometry(1.2, 0)
  const torus = new THREE.TorusGeometry(0.8, 0.3, 8, 24)
  const torusKnot = new THREE.TorusKnotGeometry(0.7, 0.2, 64, 8)
  const octa = new THREE.OctahedronGeometry(1, 0)
  const dodeca = new THREE.DodecahedronGeometry(0.9, 0)

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#10b981" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#059669" />

      <FloatingShape
        geometry={icosa}
        position={[-3, 4, -2]}
        speed={0.3}
        rotationAxis={[0.5, 0.3, 0.1]}
        color="#10b981"
      />
      <FloatingShape
        geometry={torus}
        position={[3, 2, -1]}
        speed={0.2}
        rotationAxis={[0.1, 0.5, 0.3]}
        color="#059669"
      />
      <FloatingShape
        geometry={torusKnot}
        position={[0, 5, -3]}
        speed={0.15}
        rotationAxis={[0.2, 0.4, 0.1]}
        color="#34d399"
      />
      <FloatingShape
        geometry={octa}
        position={[-6, -2, -3]}
        speed={0.25}
        rotationAxis={[0.4, 0.2, 0.5]}
        color="#047857"
      />
      <FloatingShape
        geometry={dodeca}
        position={[5, 3, -5]}
        speed={0.2}
        rotationAxis={[0.1, 0.6, 0.2]}
        color="#6ee7b7"
      />
    </>
  )
}

export default function ThreeBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 65 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Scene />
      </Canvas>
    </div>
  )
}

// Separate inline 3D shape for sections
export function FloatingShapeDecor({
  size = 200,
  className = '',
}: {
  size?: number
  className?: string
}) {
  return (
    <div
      className={`pointer-events-none ${className}`}
      style={{ width: size, height: size, opacity: 0.15 }}
    >
      <Canvas
        camera={{ position: [0, 0, 4], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.8} />
        <pointLight position={[5, 5, 5]} intensity={1} color="#10b981" />
        <mesh>
          <icosahedronGeometry args={[1, 0]} />
          <meshBasicMaterial color="#10b981" wireframe transparent opacity={0.3} />
        </mesh>
      </Canvas>
    </div>
  )
}
