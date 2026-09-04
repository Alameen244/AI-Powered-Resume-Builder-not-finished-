const coachNotes = [
  'Rewrite weak bullet into outcome-driven language',
  'Add target-role keywords without stuffing',
  'Compress summary to 3 direct lines',
  'Check ATS parsing before export',
]

export function AiSupportSection() {
  return (
    <section className="section ai-support-section" aria-labelledby="support-title">
      <div className="section-heading">
        <p className="eyebrow">AI support</p>
        <h2 id="support-title">A resume coach watches the document while you build.</h2>
      </div>
      <div className="coach-console">
        <div className="coach-document" aria-label="Resume document preview">
          <span />
          <strong>Senior Frontend Engineer</strong>
          <p>Built interactive hiring products with React, design systems, and measurable conversion gains.</p>
          <i />
          <i />
          <i />
        </div>
        <div className="coach-feed" aria-label="AI coach suggestions">
          {coachNotes.map((note, index) => (
            <button key={note} type="button" style={{ '--delay': `${index * 90}ms` }}>
              {note}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
