import { useMemo } from 'react'
import { Canvas } from '@react-three/fiber'
import { Float, MeshTransmissionMaterial } from '@react-three/drei'
import * as THREE from 'three'

export function LogoGemPrimitive({ scale = 1 }: { scale?: number }) {
  const geometry = useMemo(() => {
    const points = [
      new THREE.Vector2(0, -1.2),
      new THREE.Vector2(1.1, 0),
      new THREE.Vector2(0.7, 0.5),
      new THREE.Vector2(0, 0.5)
    ]
    let geo = new THREE.LatheGeometry(points, 8)
    const facetedGeo = geo.toNonIndexed()
    facetedGeo.computeVertexNormals()
    return facetedGeo
  }, [])

  return (
    <mesh rotation={[Math.PI / 6, Math.PI / 4, 0]} scale={scale}>
      <primitive object={geometry} attach="geometry" />
      <MeshTransmissionMaterial 
        backside
        color="#10b981"
        transmission={0.95} 
        thickness={1} 
        roughness={0.1}
        ior={2.4} 
        chromaticAberration={0.05}
      />
    </mesh>
  )
}

export function Logo3D({ size = 50 }: { size?: number }) {
  return (
    <div style={{ width: size, height: size }}>
      <Canvas camera={{ position: [0, 0, 4], fov: 40 }} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={1} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#10b981" />
        <Float speed={3} rotationIntensity={1.5} floatIntensity={0.5}>
          <LogoGemPrimitive scale={1} />
        </Float>
      </Canvas>
    </div>
  )
}
