import { Text } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'

export function BuilderCore({ active, mode = 'dark', setActive }) {
  const groupRef = useRef(null)
  const beamRef = useRef(null)
  const elapsedRef = useRef(0)
  const isLight = mode === 'light'

  useFrame(({ pointer }, delta) => {
    elapsedRef.current += delta
    const elapsed = elapsedRef.current
    if (groupRef.current) {
      groupRef.current.rotation.y = pointer.x * 0.08 + Math.sin(elapsed * 0.32) * 0.035
      groupRef.current.position.y = Math.sin(elapsed * 0.75) * 0.08 - 0.15
    }
    if (beamRef.current) {
      beamRef.current.material.opacity = active ? 0.36 + Math.sin(elapsed * 4) * 0.08 : 0.16
      beamRef.current.scale.y = active ? 1.2 + Math.sin(elapsed * 2.2) * 0.05 : 1
    }
  })

  return (
    <group
      ref={groupRef}
      position={[0, -0.55, -1.45]}
      onPointerEnter={() => setActive('builder-core')}
      onPointerLeave={() => setActive(null)}
    >
      <mesh rotation={[0, 0.18, 0]}>
        <boxGeometry args={[2.05, 2.72, 0.08]} />
        <meshStandardMaterial color={isLight ? '#fff6e6' : '#efe7d8'} roughness={0.48} metalness={0.04} />
      </mesh>
      <mesh position={[0, 1.08, 0.07]} rotation={[0, 0.18, 0]}>
        <boxGeometry args={[1.68, 0.12, 0.035]} />
        <meshStandardMaterial color="#7f9b72" emissive="#7f9b72" emissiveIntensity={active ? 0.45 : 0.12} />
      </mesh>
      {[0.58, 0.3, 0.02, -0.26, -0.54].map((y, index) => (
        <mesh key={y} position={[0, y, 0.08]} rotation={[0, 0.18, 0]}>
          <boxGeometry args={[index === 1 ? 1.46 : 1.22, 0.035, 0.02]} />
        <meshBasicMaterial color={isLight ? '#11140f' : '#1d2118'} transparent opacity={isLight ? 0.7 : 0.58} />
        </mesh>
      ))}
      <mesh ref={beamRef} position={[0, 0.18, 0.18]} rotation={[0, 0.18, 0]}>
        <boxGeometry args={[1.82, 0.18, 0.025]} />
        <meshBasicMaterial color="#c8a45d" transparent opacity={0.18} />
      </mesh>
      <Text position={[-0.78, -0.98, 0.12]} fontSize={0.105} anchorX="left" color="#14150f">
        AI Resume Builder
      </Text>
    </group>
  )
}
