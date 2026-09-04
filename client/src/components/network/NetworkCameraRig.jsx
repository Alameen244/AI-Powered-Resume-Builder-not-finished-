import { useFrame, useThree } from '@react-three/fiber'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { sampleCameraPath } from '../../utils/animation.js'

gsap.registerPlugin(ScrollTrigger)

export function NetworkCameraRig({ focusedNode, reducedMotion }) {
  const { camera, pointer } = useThree()
  const progress = useRef(0)
  const target = useRef(new THREE.Vector3())

  useEffect(() => {
    const trigger = ScrollTrigger.create({
      start: 0,
      end: () => document.body.scrollHeight - window.innerHeight,
      scrub: 0.7,
      onUpdate: (self) => {
        progress.current = self.progress
      },
    })
    return () => trigger.kill()
  }, [])

  useFrame(() => {
    const sampled = sampleCameraPath(reducedMotion ? Math.min(progress.current, 0.35) : progress.current)
    const cursor = reducedMotion ? [0, 0] : [pointer.x * 0.28, pointer.y * 0.16]
    const position = new THREE.Vector3(
      sampled.position[0] + cursor[0],
      sampled.position[1] + cursor[1],
      sampled.position[2],
    )

    if (focusedNode) {
      position.z -= 0.9
    }

    camera.position.lerp(position, 0.055)
    target.current.lerp(new THREE.Vector3(...sampled.lookAt), 0.06)
    camera.lookAt(target.current)
  })

  return null
}
