import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function CinematicVideo({ src, poster, label }) {
  const shellRef = useRef(null)
  const [hasVideoError, setHasVideoError] = useState(false)
  const canPlayVideo = Boolean(src) && !hasVideoError

  useEffect(() => {
    const element = shellRef.current
    if (!element) return undefined

    const context = gsap.context(() => {
      gsap.fromTo(
        element,
        { clipPath: 'inset(18% 12% 18% 12%)', scale: 0.94 },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          scale: 1,
          scrollTrigger: {
            trigger: element,
            start: 'top bottom',
            end: 'bottom center',
            scrub: 0.8,
          },
        },
      )
    }, element)

    return () => context.revert()
  }, [])

  return (
    <div className="video-shell" ref={shellRef}>
      {canPlayVideo ? (
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={poster}
          aria-label={label}
          onError={() => setHasVideoError(true)}
        >
          <source src={src} type="video/mp4" />
        </video>
      ) : (
        <img src={poster} alt={label} loading="lazy" />
      )}
    </div>
  )
}
