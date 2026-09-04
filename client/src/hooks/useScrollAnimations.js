import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useScrollAnimations(disabled = false) {
  useEffect(() => {
    if (disabled) return undefined

    const cleanups = []

    const context = gsap.context(() => {
      gsap.fromTo(
        '.nav-pill',
        { y: -28, opacity: 0, scale: 0.96 },
        { y: 0, opacity: 1, scale: 1, duration: 1.05, ease: 'expo.out', delay: 0.12 },
      )

      gsap.utils.toArray('.section').forEach((section) => {
        gsap.fromTo(
          section.querySelectorAll(
            '.eyebrow, h1, h2, h3, h4, p, small, .magnetic-button, .hero-aside span, .story-columns article, .resume-card, .project-piece, .coach-document, .coach-feed button, .tech-orbit span, .product-visual',
          ),
          { y: 46, opacity: 0, filter: 'blur(10px)' },
          {
            y: 0,
            opacity: 1,
            filter: 'blur(0px)',
            duration: 1.12,
            stagger: 0.045,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 78%',
              once: true,
            },
          },
        )
      })

      gsap.utils.toArray('.resume-card, .project-piece, .product-visual, .tech-orbit span').forEach((element, index) => {
        gsap.to(element, {
          y: index % 2 === 0 ? -34 : 28,
          rotate: index % 2 === 0 ? -1.4 : 1.2,
          ease: 'none',
          scrollTrigger: {
            trigger: element,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.8,
          },
        })
      })

      gsap.utils.toArray('.magnetic-button, .nav-links a, .theme-toggle, .coach-feed button').forEach((element) => {
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
        cleanups.push(() => {
          element.removeEventListener('pointerenter', enter)
          element.removeEventListener('pointermove', move)
          element.removeEventListener('pointerleave', leave)
        })
      })
    })

    return () => {
      cleanups.forEach((cleanup) => cleanup())
      context.revert()
    }
  }, [disabled])
}
