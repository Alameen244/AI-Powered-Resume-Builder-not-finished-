export function NetworkStory() {
  return (
    <section className="section story-section" id="builder" aria-labelledby="network-title">
      <div className="story-panel">
        <p className="eyebrow">Builder engine</p>
        <h2 id="network-title"><span className="heading-glass-text">Your resume becomes a living map.</span></h2>
        <p>
          Each node represents a section: summary, experience, skills, projects, education, and target role. Hover the 3D nodes to surface resume templates and scroll to move through the generation flow.
        </p>
      </div>
      <div className="story-columns">
        <article>
          <span>01</span>
          <h3><span className="heading-glass-text">AI draft pass</span></h3>
          <p>Paste raw experience and the builder turns it into role-specific bullets with measurable impact.</p>
        </article>
        <article>
          <span>02</span>
          <h3><span className="heading-glass-text">Coach mode</span></h3>
          <p>Inline AI support flags weak verbs, missing keywords, noisy sections, and ATS risks.</p>
        </article>
      </div>
    </section>
  )
}
