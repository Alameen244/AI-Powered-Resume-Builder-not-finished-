export function ModernMinimalTemplate({ resume }) {
  const { personal, summary, experience, education, projects, skills, certifications, additional } = resume

  // Normalize technical skills list
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
    <article className="resume-paper resume-paper--creative" id="resume-export-sheet">
      {/* Header */}
      <header className="resume-header">
        <h1 className="resume-candidate-name">{personal?.fullName || 'Candidate Name'}</h1>
        <div className="resume-contact-bar">
          {personal?.email && <span>{personal.email}</span>}
          {personal?.phone && (
            <>
              <span className="sep">•</span>
              <span>{personal.phone}</span>
            </>
          )}
          {personal?.location && (
            <>
              <span className="sep">•</span>
              <span>{personal.location}</span>
            </>
          )}
          {personal?.linkedIn && (
            <>
              <span className="sep">•</span>
              <span>{personal.linkedIn.replace(/^https?:\/\/(www\.)?/, '')}</span>
            </>
          )}
          {personal?.github && (
            <>
              <span className="sep">•</span>
              <span>{personal.github.replace(/^https?:\/\/(www\.)?/, '')}</span>
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

      {/* Summary */}
      {summary && (
        <section className="resume-section">
          <h2 className="resume-section-title">Professional Summary</h2>
          <p className="resume-summary-text">{summary}</p>
        </section>
      )}

      {/* Experience */}
      {experience && experience.length > 0 && (
        <section className="resume-section">
          <h2 className="resume-section-title">Work Experience</h2>
          {experience.map((exp, idx) => (
            <div className="resume-item" key={exp.id || idx}>
              <div className="resume-item__header">
                <span className="resume-item__title">{exp.jobTitle}</span>
                <span className="resume-item__date">{exp.duration}</span>
              </div>
              <div className="resume-item__subtitle">{exp.company}</div>
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

      {/* Projects */}
      {projects && projects.length > 0 && (
        <section className="resume-section">
          <h2 className="resume-section-title">Technical Projects</h2>
          {projects.map((proj, idx) => (
            <div className="resume-item" key={proj.id || idx}>
              <div className="resume-item__header">
                <span className="resume-item__title">
                  {proj.name}
                  {proj.technologies && (
                    <span style={{ fontWeight: 400, color: '#4b5563', fontSize: '8.8pt', marginLeft: '6pt' }}>
                      | {proj.technologies}
                    </span>
                  )}
                </span>
                {proj.url && (
                  <span className="resume-item__date">{proj.url.replace(/^https?:\/\/(www\.)?/, '')}</span>
                )}
              </div>
              {proj.description && <p style={{ margin: '2pt 0 4pt', fontSize: '9.2pt' }}>{proj.description}</p>}
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
                {edu.grade && <span> • {edu.grade}</span>}
                {edu.location && <span> • {edu.location}</span>}
              </div>
            </div>
          ))}
        </section>
      )}

      {/* Skills */}
      {(techSkills || softSkills) && (
        <section className="resume-section">
          <h2 className="resume-section-title">Skills & Proficiencies</h2>
          {techSkills && (
            <div className="resume-skills-block">
              <strong>Technical: </strong>
              <span>{techSkills}</span>
            </div>
          )}
          {softSkills && (
            <div className="resume-skills-block">
              <strong>Methodologies & Soft Skills: </strong>
              <span>{softSkills}</span>
            </div>
          )}
        </section>
      )}

      {/* Certifications */}
      {certifications && certifications.length > 0 && (
        <section className="resume-section">
          <h2 className="resume-section-title">Certifications</h2>
          {certifications.map((cert, idx) => (
            <div className="resume-item" key={cert.id || idx} style={{ marginBottom: '4pt' }}>
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

      {/* Additional Info */}
      {additional && (additional.achievements || additional.languages || additional.extracurricular) && (
        <section className="resume-section">
          <h2 className="resume-section-title">Additional Information</h2>
          {additional.achievements && (
            <div className="resume-skills-block">
              <strong>Honors & Awards: </strong>
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
              <strong>Leadership & Activities: </strong>
              <span>{additional.extracurricular}</span>
            </div>
          )}
        </section>
      )}
    </article>
  )
}
