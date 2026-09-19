import { useEffect } from 'react'
import gsap from 'gsap'

const MAGNETIC_SELECTOR =
  '.magnetic-button, .nav-links a, .theme-toggle, .coach-feed button, .hero-aside span, .tech-orbit span'

export function useMagneticElements(disabled = false, ready = false) {
  useEffect(() => {
    if (disabled || !ready) return undefined

    const elements = gsap.utils.toArray(MAGNETIC_SELECTOR)
    const cleanups = elements.map((element) => {
      const strength = element.classList.contains('magnetic-button') ? 0.34 : 0.18

      const enter = () => {
        gsap.to(element, { scale: 1.035, duration: 0.55, ease: 'expo.out' })
      }

      const move = (event) => {
        const rect = element.getBoundingClientRect()
        const x = event.clientX - rect.left - rect.width / 2
        const y = event.clientY - rect.top - rect.height / 2

        gsap.to(element, {
          x: x * strength,
          y: y * strength,
          duration: 0.7,
          ease: 'expo.out',
        })
      }

      const leave = () => {
        gsap.to(element, { x: 0, y: 0, scale: 1, duration: 0.85, ease: 'elastic.out(1, 0.42)' })
      }

      element.addEventListener('pointerenter', enter)
      element.addEventListener('pointermove', move)
      element.addEventListener('pointerleave', leave)

      return () => {
        element.removeEventListener('pointerenter', enter)
        element.removeEventListener('pointermove', move)
        element.removeEventListener('pointerleave', leave)
      }
    })

    return () => {
      cleanups.forEach((cleanup) => cleanup())
      gsap.killTweensOf(elements)
      gsap.set(elements, { clearProps: 'transform' })
    }
  }, [disabled, ready])
}
