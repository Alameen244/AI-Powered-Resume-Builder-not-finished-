import { AdaptiveDpr, OrbitControls } from '@react-three/drei'
import { Canvas, useThree } from '@react-three/fiber'
import { useEffect, useState } from 'react'
import { NetworkFallback } from './NetworkFallback.jsx'
import { NetworkCameraRig } from './NetworkCameraRig.jsx'
import { NetworkLighting } from './NetworkLighting.jsx'
import { NetworkModel } from './NetworkModel.jsx'

function WebGlRecovery() {
  const { gl } = useThree()

  useEffect(() => {
    const canvas = gl.domElement
    const handleContextLost = (event) => {
      event.preventDefault()
    }

    canvas.addEventListener('webglcontextlost', handleContextLost, false)
    return () => canvas.removeEventListener('webglcontextlost', handleContextLost, false)
  }, [gl])

  return null
}

export function NetworkCanvas({ mode = 'dark', reducedMotion }) {
  const [activeNode, setActiveNode] = useState(null)
  const [focusedNode, setFocusedNode] = useState(null)
  const isLight = mode === 'light'

  return (
    <Canvas
      className="network-canvas"
      fallback={<NetworkFallback />}
      camera={{ position: [0, 1.1, 8.6], fov: 42, near: 0.1, far: 80 }}
      dpr={[1, reducedMotion ? 1 : 1.25]}
      performance={{ min: 0.45 }}
      gl={{ antialias: true, failIfMajorPerformanceCaveat: false, powerPreference: 'default' }}
    >
      <WebGlRecovery />
      <color attach="background" args={[isLight ? '#c8cac2' : '#070806']} />
      <fog attach="fog" args={[isLight ? '#c8cac2' : '#070806', isLight ? 10 : 7, isLight ? 25 : 19]} />
      <NetworkLighting mode={mode} />
      <NetworkModel
        mode={mode}
        activeNode={activeNode}
        setActiveNode={setActiveNode}
        focusNode={setFocusedNode}
        reducedMotion={reducedMotion}
      />
      <NetworkCameraRig focusedNode={focusedNode} reducedMotion={reducedMotion} />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableDamping
        dampingFactor={0.08}
        rotateSpeed={0.32}
        maxPolarAngle={Math.PI * 0.64}
        minPolarAngle={Math.PI * 0.32}
      />
      <AdaptiveDpr pixelated />
    </Canvas>
  )
}
