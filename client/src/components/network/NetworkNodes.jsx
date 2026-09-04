import { Line, Text } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { networkEdges, networkPoints, resumeNodes } from '../../data/networkNodes.js'
import { BuilderCore } from './BuilderCore.jsx'
import { ResumePreview } from './ResumePreview.jsx'

export function NetworkNodes({ activeNode, setActiveNode, focusNode, reducedMotion, mode = 'dark' }) {
  const groupRef = useRef(null)
  const elapsedRef = useRef(0)
  const pointVectors = useMemo(() => networkPoints.map((point) => new THREE.Vector3(...point)), [])
  const isLight = mode === 'light'

  useFrame(({ pointer }, delta) => {
    if (!groupRef.current || reducedMotion) return
    elapsedRef.current += delta
    const elapsed = elapsedRef.current
    groupRef.current.rotation.y = Math.sin(elapsed * 0.18) * 0.055 + pointer.x * 0.045
    groupRef.current.rotation.x = pointer.y * -0.025
  })

  return (
    <group ref={groupRef}>
      <BuilderCore active={activeNode === 'builder-core'} mode={mode} setActive={setActiveNode} />
      {networkEdges.map(([from, to]) => (
        <Line
          key={`${from}-${to}`}
          points={[pointVectors[from], pointVectors[to]]}
          color={isLight ? '#343b2d' : '#6f775d'}
          lineWidth={isLight ? 1.25 : 0.9}
          transparent
          opacity={isLight ? 0.56 : 0.44}
        />
      ))}
      {networkPoints.map((point, index) => (
        <mesh key={point.join('-')} position={point}>
          <sphereGeometry args={[index % 3 === 0 ? 0.08 : 0.052, 20, 20]} />
          <meshStandardMaterial
            color={isLight ? '#5c643f' : '#d7c184'}
            emissive={isLight ? '#c8a45d' : '#6b5423'}
            emissiveIntensity={isLight ? 0.12 : 0.2}
          />
        </mesh>
      ))}
      {resumeNodes.map((node) => {
        const active = activeNode === node.id
        return (
          <group key={node.id} position={node.position}>
            <mesh
              onPointerEnter={(event) => {
                event.stopPropagation()
                setActiveNode(node.id)
              }}
              onPointerLeave={() => setActiveNode(null)}
              onClick={(event) => {
                event.stopPropagation()
                focusNode(node.id)
              }}
            >
              <sphereGeometry args={[active ? 0.2 : 0.14, 32, 32]} />
              <meshStandardMaterial
                color={node.template.accent}
                emissive={node.template.accent}
                emissiveIntensity={active ? 0.9 : 0.28}
                roughness={0.36}
                metalness={0.22}
              />
            </mesh>
            <Text position={[0.26, 0.22, 0]} fontSize={0.11} anchorX="left" color={isLight ? '#1b2119' : '#f4efe6'}>
              {node.category}
            </Text>
            <ResumePreview node={node} active={active} />
          </group>
        )
      })}
    </group>
  )
}
