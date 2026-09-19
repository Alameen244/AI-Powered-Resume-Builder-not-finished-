import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useScrollAnimations(disabled = false, ready = true) {
  useEffect(() => {
    if (disabled || !ready) return undefined

    const context = gsap.context(() => {
      gsap.fromTo(
        '.nav-pill',
        { y: -28, opacity: 0, scale: 0.96 },
        { y: 0, opacity: 1, scale: 1, duration: 1.05, ease: 'expo.out', delay: 0.12 },
      )

      const sections = gsap.utils.toArray('.section:not(.hero-section)')

      sections.forEach((section, sectionIndex) => {
        // Only animate a section's direct layout children. Animating every nested
        // div overwrote transforms used by cards, product previews, and chip rows.
        const revealTargets = Array.from(section.children)
        if (!revealTargets.length) return

        gsap.fromTo(
          revealTargets,
          { y: 52, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 1.05,
            stagger: 0.12,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: section,
              start: sectionIndex === 0 ? 'top 76%' : 'top 72%',
              once: true,
            },
          },
        )
      })

      ScrollTrigger.refresh()

      gsap.utils.toArray('.resume-card__inner, .project-piece .product-visual__body').forEach((element, index) => {
        gsap.to(element, {
          yPercent: index % 2 === 0 ? -3 : 2,
          ease: 'none',
          scrollTrigger: {
            trigger: element,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.8,
          },
        })
      })

    })

    return () => {
      context.revert()
    }
  }, [disabled, ready])
}
