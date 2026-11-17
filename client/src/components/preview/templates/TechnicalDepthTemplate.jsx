export function TechnicalDepthTemplate({ resume }) {
  const { personal, summary, experience, education, projects, skills, certifications, additional } = resume

  const techSkillsList = Array.isArray(skills?.technical)
    ? skills.technical
    : typeof skills?.technical === 'string'
    ? skills.technical.split(',').map((s) => s.trim()).filter(Boolean)
    : []

  const softSkillsList = Array.isArray(skills?.soft)
    ? skills.soft
    : typeof skills?.soft === 'string'
    ? skills.soft.split(',').map((s) => s.trim()).filter(Boolean)
    : []

  return (
    <article className="resume-paper resume-paper--developer" id="resume-export-sheet">
      {/* Header */}
      <header className="resume-header">
        <h1 className="resume-candidate-name">{personal?.fullName || 'Candidate Name'}</h1>
        <div className="resume-contact-bar">
          {personal?.email && <span>{personal.email}</span>}
          {personal?.phone && (
            <>
              <span className="sep">|</span>
              <span>{personal.phone}</span>
            </>
          )}
          {personal?.location && (
            <>
              <span className="sep">|</span>
              <span>{personal.location}</span>
            </>
          )}
          {personal?.github && (
            <>
              <span className="sep">|</span>
              <strong style={{ color: '#2e3e28' }}>GitHub:</strong>
              <span>{personal.github.replace(/^https?:\/\/(www\.)?/, '')}</span>
            </>
          )}
          {personal?.linkedIn && (
            <>
              <span className="sep">|</span>
              <strong style={{ color: '#2e3e28' }}>LinkedIn:</strong>
              <span>{personal.linkedIn.replace(/^https?:\/\/(www\.)?/, '')}</span>
            </>
          )}
          {personal?.portfolio && (
            <>
              <span className="sep">|</span>
              <span>{personal.portfolio.replace(/^https?:\/\/(www\.)?/, '')}</span>
            </>
          )}
        </div>
      </header>

      {/* Summary */}
      {summary && (
        <section className="resume-section">
          <h2 className="resume-section-title">Profile</h2>
          <p className="resume-summary-text" style={{ fontSize: '9.3pt', lineHeight: 1.45, margin: 0 }}>
            {summary}
          </p>
        </section>
      )}

      {/* Technical Skills Badges */}
      {(techSkillsList.length > 0 || softSkillsList.length > 0) && (
        <section className="resume-section">
          <h2 className="resume-section-title">Technical Expertise</h2>
          {techSkillsList.length > 0 && (
            <div style={{ marginBottom: '4pt' }}>
              {techSkillsList.map((skill, sIdx) => (
                <span className="resume-skill-tag" key={sIdx}>
                  {skill}
                </span>
              ))}
            </div>
          )}
          {softSkillsList.length > 0 && (
            <div style={{ fontSize: '9pt', color: '#4b5563', marginTop: '3pt' }}>
              <strong>Core Strengths:</strong> {softSkillsList.join(' • ')}
            </div>
          )}
        </section>
      )}

      {/* Projects (High Priority for Developers) */}
      {projects && projects.length > 0 && (
        <section className="resume-section">
          <h2 className="resume-section-title">Engineering Projects</h2>
          {projects.map((proj, idx) => (
            <div className="resume-item" key={proj.id || idx}>
              <div className="resume-item__header">
                <span className="resume-item__title">
                  {proj.name}
                  {proj.url && (
                    <span style={{ fontWeight: 400, fontSize: '8.5pt', color: '#526e47', marginLeft: '6pt' }}>
                      ({proj.url.replace(/^https?:\/\/(www\.)?/, '')})
                    </span>
                  )}
                </span>
              </div>
              {proj.technologies && (
                <div style={{ fontSize: '8.8pt', color: '#4b5563', fontWeight: 600, marginBottom: '2pt' }}>
                  Stack: {proj.technologies}
                </div>
              )}
              {proj.description && (
                <p style={{ margin: '2pt 0 3pt', fontSize: '9.2pt', color: '#374151' }}>{proj.description}</p>
              )}
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

      {/* Work Experience */}
      {experience && experience.length > 0 && (
        <section className="resume-section">
          <h2 className="resume-section-title">Experience</h2>
          {experience.map((exp, idx) => (
            <div className="resume-item" key={exp.id || idx}>
              <div className="resume-item__header">
                <span className="resume-item__title">{exp.jobTitle}</span>
                <span className="resume-item__date">{exp.duration}</span>
              </div>
              <div className="resume-item__subtitle" style={{ color: '#526e47', fontWeight: 600 }}>
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

      {/* Education */}
      {education && education.length > 0 && (
        <section className="resume-section">
          <h2 className="resume-section-title">Education</h2>
          {education.map((edu, idx) => (
            <div className="resume-item" key={edu.id || idx}>
              <div className="resume-item__header">
                <span className="resume-item__title">{edu.institution}</span>
                <span className="resume-item__date">
                  {edu.startYear} – {edu.endYear}
                </span>
              </div>
              <div className="resume-item__subtitle">
                {edu.degree}
                {edu.grade && <span style={{ fontWeight: 600 }}> • {edu.grade}</span>}
                {edu.location && <span> • {edu.location}</span>}
              </div>
            </div>
          ))}
        </section>
      )}

      {/* Certifications */}
      {certifications && certifications.length > 0 && (
        <section className="resume-section">
          <h2 className="resume-section-title">Certifications</h2>
          {certifications.map((cert, idx) => (
            <div className="resume-item" key={cert.id || idx} style={{ marginBottom: '3pt' }}>
              <div className="resume-item__header">
                <span className="resume-item__title">
                  {cert.name} {cert.issuer && <span style={{ fontWeight: 400 }}>({cert.issuer})</span>}
                </span>
                {cert.year && <span className="resume-item__date">{cert.year}</span>}
              </div>
            </div>
          ))}
        </section>
      )}

      {/* Additional Info */}
      {additional && (additional.achievements || additional.languages || additional.extracurricular) && (
        <section className="resume-section">
          <h2 className="resume-section-title">Accomplishments & Extras</h2>
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
