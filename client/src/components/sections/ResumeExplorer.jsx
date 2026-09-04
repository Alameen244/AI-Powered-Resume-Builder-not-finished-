import { resumeTemplates } from '../../data/resumeTemplates.js'

export function ResumeExplorer() {
  return (
    <section className="section resume-section" id="templates" aria-labelledby="resume-title">
      <div className="section-heading">
        <p className="eyebrow">Template galaxy</p>
        <h2 id="resume-title">Pick a template, then let AI tune it for the job.</h2>
      </div>
      <div className="resume-grid">
        {resumeTemplates.map((template) => (
          <article className="resume-card" key={template.id}>
            <div className="resume-card__inner">
              <span style={{ background: template.accent }} />
              <h3>{template.title}</h3>
              <p>{template.role}</p>
              <small>{template.tone}</small>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
