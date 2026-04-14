import { useMemo } from 'react'
import { Canvas } from '@react-three/fiber'
import { Float, MeshTransmissionMaterial, Environment, OrbitControls } from '@react-three/drei'
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
    <group rotation={[1.0, -0.5, 0.3]} scale={scale}>
      <mesh>
        <primitive object={geometry} attach="geometry" />
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
        <primitive object={geometry} attach="geometry" />
        <meshPhongMaterial color="#059669" transparent opacity={0.6} shininess={100} />
      </mesh>
    </group>
  )
}

export function Logo3D({ size = 50 }: { size?: number }) {
  return (
    <div style={{ width: size, height: size }} className="cursor-grab active:cursor-grabbing pointer-events-auto">
      <Canvas camera={{ position: [0, 0, 4.2], fov: 42 }} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} penumbra={1} intensity={1.5} color="#059669" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#047857" />
        
        <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
          <LogoGemPrimitive scale={1.2} />
        </Float>

        <Environment preset="studio" />
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          autoRotate={true}
          autoRotateSpeed={3}
        />
      </Canvas>
    </div>
  )
}
