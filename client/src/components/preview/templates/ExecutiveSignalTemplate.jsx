export function ExecutiveSignalTemplate({ resume }) {
  const { personal, summary, experience, education, projects, skills, certifications, additional } = resume

  const techSkills = Array.isArray(skills?.technical)
    ? skills.technical.join(', ')
    : typeof skills?.technical === 'string'
    ? skills.technical
    : ''

  const softSkills = Array.isArray(skills?.soft)
    ? skills.soft.join(', ')
    : typeof skills?.soft === 'string'
    ? skills.soft
    : ''

  return (
    <article className="resume-paper resume-paper--systems" id="resume-export-sheet">
      {/* Header */}
      <header className="resume-header">
        <h1 className="resume-candidate-name">{personal?.fullName || 'Candidate Name'}</h1>
        <div className="resume-contact-bar">
          {personal?.location && <span>{personal.location}</span>}
          {personal?.email && (
            <>
              <span className="sep">•</span>
              <span>{personal.email}</span>
            </>
          )}
          {personal?.phone && (
            <>
              <span className="sep">•</span>
              <span>{personal.phone}</span>
            </>
          )}
          {personal?.linkedIn && (
            <>
              <span className="sep">•</span>
              <span>{personal.linkedIn.replace(/^https?:\/\/(www\.)?/, '')}</span>
            </>
          )}
          {personal?.portfolio && (
            <>
              <span className="sep">•</span>
              <span>{personal.portfolio.replace(/^https?:\/\/(www\.)?/, '')}</span>
            </>
          )}
        </div>
      </header>

      {/* Executive Summary */}
      {summary && (
        <section className="resume-section">
          <h2 className="resume-section-title">Executive Summary</h2>
          <p className="resume-summary-text" style={{ fontStyle: 'italic', fontSize: '9.4pt', margin: 0 }}>
            {summary}
          </p>
        </section>
      )}

      {/* Core Competencies / Skills */}
      {(techSkills || softSkills) && (
        <section className="resume-section">
          <h2 className="resume-section-title">Core Competencies</h2>
          {techSkills && (
            <div className="resume-skills-block">
              <strong>Domain & Technical Expertise: </strong>
              <span>{techSkills}</span>
            </div>
          )}
          {softSkills && (
            <div className="resume-skills-block">
              <strong>Leadership & Operational Skills: </strong>
              <span>{softSkills}</span>
            </div>
          )}
        </section>
      )}

      {/* Professional Experience */}
      {experience && experience.length > 0 && (
        <section className="resume-section">
          <h2 className="resume-section-title">Professional Experience</h2>
          {experience.map((exp, idx) => (
            <div className="resume-item" key={exp.id || idx}>
              <div className="resume-item__header">
                <span className="resume-item__title" style={{ fontSize: '10.5pt', color: '#111827' }}>
                  {exp.jobTitle}
                </span>
                <span className="resume-item__date">{exp.duration}</span>
              </div>
              <div className="resume-item__subtitle" style={{ fontWeight: 600, color: '#9d6042' }}>
                {exp.company}
              </div>
              {Array.isArray(exp.bullets) && exp.bullets.length > 0 ? (
                <ul className="resume-item__bullets">
                  {exp.bullets.map((b, bIdx) => (
                    <li key={bIdx}>{b}</li>
                  ))}
                </ul>
              ) : exp.responsibilities ? (
                <ul className="resume-item__bullets">
                  <li>{exp.responsibilities}</li>
                  {exp.achievements && <li>{exp.achievements}</li>}
                </ul>
              ) : null}
            </div>
          ))}
        </section>
      )}

      {/* Notable Initiatives & Projects */}
      {projects && projects.length > 0 && (
        <section className="resume-section">
          <h2 className="resume-section-title">Key Initiatives & Deliverables</h2>
          {projects.map((proj, idx) => (
            <div className="resume-item" key={proj.id || idx}>
              <div className="resume-item__header">
                <span className="resume-item__title">{proj.name}</span>
                {proj.technologies && (
                  <span style={{ fontSize: '8.5pt', color: '#6b7280' }}>{proj.technologies}</span>
                )}
              </div>
              {proj.description && <p style={{ margin: '2pt 0 3pt', fontSize: '9pt' }}>{proj.description}</p>}
              {Array.isArray(proj.bullets) && proj.bullets.length > 0 && (
                <ul className="resume-item__bullets">
                  {proj.bullets.map((b, bIdx) => (
                    <li key={bIdx}>{b}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Education */}
      {education && education.length > 0 && (
        <section className="resume-section">
          <h2 className="resume-section-title">Education & Credentials</h2>
          {education.map((edu, idx) => (
            <div className="resume-item" key={edu.id || idx}>
              <div className="resume-item__header">
                <span className="resume-item__title">{edu.degree}</span>
                <span className="resume-item__date">
                  {edu.startYear} – {edu.endYear}
                </span>
              </div>
              <div className="resume-item__subtitle">
                {edu.institution}
                {edu.grade && <span> • {edu.grade}</span>}
                {edu.location && <span> • {edu.location}</span>}
              </div>
            </div>
          ))}
        </section>
      )}

      {/* Certifications */}
      {certifications && certifications.length > 0 && (
        <section className="resume-section">
          <h2 className="resume-section-title">Professional Certifications</h2>
          {certifications.map((cert, idx) => (
            <div className="resume-item" key={cert.id || idx} style={{ marginBottom: '3pt' }}>
              <div className="resume-item__header">
                <span className="resume-item__title">
                  {cert.name} {cert.issuer && <span style={{ fontWeight: 400 }}>— {cert.issuer}</span>}
                </span>
                {cert.year && <span className="resume-item__date">{cert.year}</span>}
              </div>
            </div>
          ))}
        </section>
      )}

      {/* Additional Honors */}
      {additional && (additional.achievements || additional.languages || additional.extracurricular) && (
        <section className="resume-section">
          <h2 className="resume-section-title">Honors & Activities</h2>
          {additional.achievements && (
            <div className="resume-skills-block">
              <strong>Honors: </strong>
              <span>{additional.achievements}</span>
            </div>
          )}
          {additional.languages && (
            <div className="resume-skills-block">
              <strong>Languages: </strong>
              <span>{additional.languages}</span>
            </div>
          )}
          {additional.extracurricular && (
            <div className="resume-skills-block">
              <strong>Activities: </strong>
              <span>{additional.extracurricular}</span>
            </div>
          )}
        </section>
      )}
    </article>
  )
}
