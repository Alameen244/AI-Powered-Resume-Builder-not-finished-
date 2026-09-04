import { MagneticButton } from '../common/MagneticButton.jsx'

export function ContactSection() {
  return (
    <section className="section contact-section" id="launch" aria-labelledby="contact-title">
      <p className="eyebrow">Launch</p>
      <h2 id="contact-title">Create the resume, tailor it, export it, send it.</h2>
      <p>
        Start with a template or a blank page. The AI assistant keeps refining until your resume is clear, searchable, and ready for the role.
      </p>
      <MagneticButton href="#top">Start building</MagneticButton>
    </section>
  )
}
