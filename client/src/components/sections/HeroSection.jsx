import { MagneticButton } from '../common/MagneticButton.jsx'

export function HeroSection() {
  return (
    <section className="section hero-section" id="top" aria-labelledby="hero-title">
      <div className="hero-copy">
        <p className="eyebrow">AI resume builder</p>
        <h1 id="hero-title">Build a resume that thinks before it writes.</h1>
        <p className="hero-lede">
          Choose a template, let AI shape your experience into sharp bullets, and explore every section through an interactive 3D resume network.
        </p>
        <MagneticButton href="#builder">Generate my resume</MagneticButton>
      </div>
      <div className="hero-aside" aria-label="Experience status">
        <span>AI bullet rewrites</span>
        <span>ATS template scanner</span>
        <span>Live resume coach</span>
      </div>
    </section>
  )
}
