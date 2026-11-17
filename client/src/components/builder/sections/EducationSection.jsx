import { FormInput } from '../FormInput.jsx'

export function EducationSection({
  education,
  certifications,
  onUpdateEducation,
  onAddEducation,
  onRemoveEducation,
  onUpdateCert,
  onAddCert,
  onRemoveCert,
  errors,
}) {
  return (
    <div className="form-card-outer">
      <div className="form-card-inner">
        <div className="form-section-header">
          <h2>2. Education & Certifications</h2>
          <p>Add your degrees, academic institutions, and accredited credentials.</p>
        </div>

        {/* Education Entries */}
        {education.map((edu, idx) => (
          <div className="dynamic-item" key={edu.id}>
            <div className="dynamic-item__header">
              <span className="dynamic-item__title">
                <span className="dynamic-item__number">#{idx + 1}</span>
                {edu.degree || 'New Education Entry'}
              </span>
              {education.length > 1 && (
                <button
                  className="dynamic-item__delete"
                  type="button"
                  onClick={() => onRemoveEducation(edu.id)}
                >
                  Remove
                </button>
              )}
            </div>
            <div className="input-grid">
              <FormInput
                label="Degree / Qualification"
                placeholder="e.g. B.S. in Computer Science"
                value={edu.degree}
                onChange={(val) => onUpdateEducation(edu.id, 'degree', val)}
                required
                error={errors[`education.${edu.id}.degree`]}
              />

              <FormInput
                label="Institution / University"
                placeholder="e.g. State University of Technology"
                value={edu.institution}
                onChange={(val) => onUpdateEducation(edu.id, 'institution', val)}
                required
                error={errors[`education.${edu.id}.institution`]}
              />

              <FormInput
                label="Location (optional)"
                placeholder="e.g. San Francisco, CA"
                value={edu.location}
                onChange={(val) => onUpdateEducation(edu.id, 'location', val)}
              />

              <FormInput
                label="Grade / CGPA (optional)"
                placeholder="e.g. 3.85 / 4.00 CGPA"
                value={edu.grade}
                onChange={(val) => onUpdateEducation(edu.id, 'grade', val)}
              />

              <FormInput
                label="Start Year"
                placeholder="2020"
                value={edu.startYear}
                onChange={(val) => onUpdateEducation(edu.id, 'startYear', val)}
                required
                error={errors[`education.${edu.id}.startYear`]}
              />

              <FormInput
                label="End Year (or Expected)"
                placeholder="2024"
                value={edu.endYear}
                onChange={(val) => onUpdateEducation(edu.id, 'endYear', val)}
                required
                error={errors[`education.${edu.id}.endYear`]}
              />
            </div>
          </div>
        ))}

        <button className="add-entry-btn" type="button" onClick={onAddEducation}>
          + Add Another Education
        </button>

        {/* Certifications Sub-Section */}
        <div style={{ marginTop: '2.5rem' }}>
          <h3 style={{ fontFamily: 'Clash Display', fontSize: '1.2rem', marginBottom: '1rem' }}>
            Certifications & Accreditations (optional)
          </h3>
          {certifications.map((cert, idx) => (
            <div className="dynamic-item" key={cert.id}>
              <div className="dynamic-item__header">
                <span className="dynamic-item__title">
                  <span className="dynamic-item__number">Cert #{idx + 1}</span>
                  {cert.name || 'New Certification'}
                </span>
                <button
                  className="dynamic-item__delete"
                  type="button"
                  onClick={() => onRemoveCert(cert.id)}
                >
                  Remove
                </button>
              </div>
              <div className="input-grid input-grid--3">
                <FormInput
                  label="Certificate Name"
                  placeholder="e.g. AWS Cloud Practitioner"
                  value={cert.name}
                  onChange={(val) => onUpdateCert(cert.id, 'name', val)}
                />
                <FormInput
                  label="Issuing Organization"
                  placeholder="e.g. Amazon Web Services"
                  value={cert.issuer}
                  onChange={(val) => onUpdateCert(cert.id, 'issuer', val)}
                />
                <FormInput
                  label="Year"
                  placeholder="2024"
                  value={cert.year}
                  onChange={(val) => onUpdateCert(cert.id, 'year', val)}
                />
              </div>
            </div>
          ))}

          <button className="add-entry-btn" type="button" onClick={onAddCert}>
            + Add Certification
          </button>
        </div>
      </div>
    </div>
  )
}
