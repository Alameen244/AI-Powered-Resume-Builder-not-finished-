const visuals = {
  draft: {
    score: '92',
    title: 'AI Resume Draft',
    role: 'Product Designer',
    accent: '#7f9b72',
    notes: ['Impact verbs', 'ATS keywords', 'Metric gaps'],
  },
  template: {
    score: 'A+',
    title: 'Template Morphing',
    role: 'Frontend Engineer',
    accent: '#c8a45d',
    notes: ['Spacing locked', 'Export ready', 'Tone match'],
  },
}

export function ProductVisual({ type = 'draft', label }) {
  const visual = visuals[type] ?? visuals.draft

  return (
    <div className="product-visual" aria-label={label}>
      <div className="product-visual__toolbar">
        <span>ResumeOS</span>
        <strong>{visual.score}</strong>
      </div>
      <div className="product-visual__body">
        <div className="product-visual__paper">
          <i style={{ background: visual.accent }} />
          <h4>{visual.title}</h4>
          <p>{visual.role}</p>
          <span />
          <span />
          <span />
          <span />
        </div>
        <div className="product-visual__panel">
          {visual.notes.map((note, index) => (
            <div key={note} style={{ '--i': index }}>
              <b />
              <span>{note}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
