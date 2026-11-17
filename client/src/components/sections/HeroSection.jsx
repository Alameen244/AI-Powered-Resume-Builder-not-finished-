import { MagneticButton } from '../common/MagneticButton.jsx'
import { useView } from '../../context/ViewContext.jsx'

export function HeroSection() {
  const { navigateTo } = useView()

  return (
    <section className="section hero-section" id="top" aria-labelledby="hero-title">
      <div className="hero-copy">
        <p className="eyebrow">AI resume builder</p>
        <h1 id="hero-title"><span className="heading-glass-text">Build a resume that thinks before it writes.</span></h1>
        <p className="hero-lede">
          Choose a template, let AI shape your experience into sharp bullets, and explore every section through an interactive 3D resume network.
        </p>
        <MagneticButton
          href="#builder"
          onClick={(e) => {
            e.preventDefault()
            navigateTo('builder')
          }}
        >
          Generate my resume
        </MagneticButton>
      </div>
      <div className="hero-aside" aria-label="Experience status">
        <span>AI bullet rewrites</span>
        <span>ATS template scanner</span>
        <span>Live resume coach</span>
      </div>
    </section>
  )
}
