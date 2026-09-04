import { useEffect, useRef } from 'react'

export function MouseAura({ reducedMotion }) {
  const auraRef = useRef(null)

  useEffect(() => {
    if (reducedMotion) return undefined

    const aura = auraRef.current
    let frame = 0
    let targetX = window.innerWidth / 2
    let targetY = window.innerHeight / 2
    let currentX = targetX
    let currentY = targetY

    const move = (event) => {
      targetX = event.clientX
      targetY = event.clientY
    }

    const tick = () => {
      currentX += (targetX - currentX) * 0.12
      currentY += (targetY - currentY) * 0.12
      if (aura) {
        aura.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`
      }
      frame = requestAnimationFrame(tick)
    }

    window.addEventListener('pointermove', move, { passive: true })
    frame = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('pointermove', move)
      cancelAnimationFrame(frame)
    }
  }, [reducedMotion])

  if (reducedMotion) return null

  return (
    <div className="mouse-aura" ref={auraRef} aria-hidden="true">
      <span />
    </div>
  )
}
