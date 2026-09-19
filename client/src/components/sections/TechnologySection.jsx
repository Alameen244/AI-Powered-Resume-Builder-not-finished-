const technologies = ['ATS Scan', 'AI Rewrite', 'Cover Letter', 'LinkedIn Import', 'Tone Match', 'Role Targeting', 'PDF Export', 'Coach Chat', 'Template Swap']

export function TechnologySection() {
  return (
    <section className="section tech-section" aria-labelledby="tech-title">
      <div className="section-heading">
        <p className="eyebrow">Resume intelligence</p>
        <h2 id="tech-title"><span className="heading-glass-text">Every control exists to make the resume sharper.</span></h2>
      </div>
      <div className="tech-orbit" role="list">
        {technologies.map((tech, index) => (
          <span key={tech} role="listitem" style={{ '--i': index }}>
            {tech}
          </span>
        ))}
      </div>
    </section>
  )
}
