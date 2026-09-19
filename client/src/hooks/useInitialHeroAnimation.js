import { useEffect } from 'react'
import gsap from 'gsap'

const HERO_CONTENT_SELECTOR =
  '.eyebrow, h1, .hero-lede, .magnetic-button, .hero-aside span'

export function useInitialHeroAnimation(disabled = false, ready = false) {
  useEffect(() => {
    if (disabled || !ready) return undefined

    const context = gsap.context(() => {
      const hero = document.querySelector('.hero-section')
      if (!hero) return

      const content = hero.querySelectorAll(HERO_CONTENT_SELECTOR)

      const timeline = gsap.timeline({ defaults: { ease: 'expo.out' } })

      timeline
        .fromTo(
          hero,
          {
            x: -72,
            y: 42,
            opacity: 0,
            scale: 0.94,
            rotate: -1.2,
            filter: 'blur(12px)',
          },
          {
            x: 0,
            y: 0,
            opacity: 1,
            scale: 1,
            rotate: 0,
            filter: 'blur(0px)',
            duration: 1.45,
          },
        )
        .fromTo(
          content,
          { x: -34, y: 46, opacity: 0, filter: 'blur(10px)' },
          {
            x: 0,
            y: 0,
            opacity: 1,
            filter: 'blur(0px)',
            duration: 1.3,
            stagger: 0.06,
          },
          '-=1.1',
        )
    })

    return () => context.revert()
  }, [disabled, ready])
}
