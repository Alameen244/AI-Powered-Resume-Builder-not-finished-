import { resumeTemplates } from '../../data/resumeTemplates.js'

export function TemplateSelector({ selectedTemplate, onSelect }) {
  return (
    <div className="template-bar">
      <span className="template-bar__label">Select Visual Template</span>
      <div className="template-grid">
        {resumeTemplates.map((t) => (
          <div
            key={t.id}
            className={`template-choice ${selectedTemplate === t.id ? 'is-selected' : ''}`}
            onClick={() => onSelect(t.id)}
            role="button"
            tabIndex={0}
          >
            <span className="template-choice__accent" style={{ background: t.accent }} />
            <h4>{t.title}</h4>
            <p>{t.role}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
