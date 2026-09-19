import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger)

export function useLenisGsap(disabled = false) {
  useEffect(() => {
    if (disabled) {
      ScrollTrigger.refresh()
      return undefined
    }

    const lenis = new Lenis({
      duration: 1.08,
      easing: (t) => Math.min(1, 1.001 - 2 ** (-10 * t)),
      smoothWheel: true,
      smoothTouch: false,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.4,
    })

    const update = (time) => {
      lenis.raf(time * 1000)
    }

    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add(update)
    gsap.ticker.lagSmoothing(0)

    const handleAnchorClick = (event) => {
      if (!(event.target instanceof Element)) return

      const anchor = event.target.closest('a[href^="#"]')
      const target = anchor?.getAttribute('href')
      if (!target || target === '#') return

      const element = document.querySelector(target)
      if (!element) return

      event.preventDefault()
      lenis.scrollTo(element, { offset: -24, duration: 1.2 })
      window.history.replaceState(null, '', target)
    }

    document.addEventListener('click', handleAnchorClick)
    ScrollTrigger.refresh()

    return () => {
      document.removeEventListener('click', handleAnchorClick)
      gsap.ticker.remove(update)
      lenis.destroy()
    }
  }, [disabled])
}
