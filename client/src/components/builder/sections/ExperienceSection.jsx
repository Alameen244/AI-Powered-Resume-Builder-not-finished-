import { FormInput } from '../FormInput.jsx'
import { FormTextarea } from '../FormTextarea.jsx'

export function ExperienceSection({
  experience,
  projects,
  onUpdateExperience,
  onAddExperience,
  onRemoveExperience,
  onUpdateProject,
  onAddProject,
  onRemoveProject,
  errors,
}) {
  return (
    <div className="form-card-outer">
      <div className="form-card-inner">
        <div className="form-section-header">
          <h2>3. Work Experience & Projects</h2>
          <p>Provide your employment history, internships, and standout portfolio projects.</p>
        </div>

        <h3 style={{ fontFamily: 'Clash Display', fontSize: '1.2rem', marginBottom: '1rem' }}>
          Work Experience (optional)
        </h3>
        {experience.map((exp, idx) => (
          <div className="dynamic-item" key={exp.id}>
            <div className="dynamic-item__header">
              <span className="dynamic-item__title">
                <span className="dynamic-item__number">Role #{idx + 1}</span>
                {exp.jobTitle ? `${exp.jobTitle} at ${exp.company}` : 'New Role'}
              </span>
              <button
                className="dynamic-item__delete"
                type="button"
                onClick={() => onRemoveExperience(exp.id)}
              >
                Remove
              </button>
            </div>
            <div className="input-grid">
              <FormInput
                label="Job Title"
                placeholder="e.g. Software Engineering Intern"
                value={exp.jobTitle}
                onChange={(val) => onUpdateExperience(exp.id, 'jobTitle', val)}
                error={errors[`experience.${exp.id}.jobTitle`]}
              />

              <FormInput
                label="Company / Organization"
                placeholder="e.g. Apex Data Labs"
                value={exp.company}
                onChange={(val) => onUpdateExperience(exp.id, 'company', val)}
                error={errors[`experience.${exp.id}.company`]}
              />

              <FormInput
                label="Employment Duration"
                placeholder="e.g. May 2023 - August 2023 or 2022 - Present"
                value={exp.duration}
                onChange={(val) => onUpdateExperience(exp.id, 'duration', val)}
                fullWidth
              />

              <FormTextarea
                label="Key Responsibilities"
                rows={3}
                placeholder="List key tasks, technologies, or team workflows. AI will transform these into concise bullet points."
                value={exp.responsibilities}
                onChange={(val) => onUpdateExperience(exp.id, 'responsibilities', val)}
                fullWidth
              />

              <FormTextarea
                label="Notable Achievements"
                rows={2}
                placeholder="Specific outcomes, metrics, or performance improvements (e.g. Reduced query execution by 34%)."
                value={exp.achievements}
                onChange={(val) => onUpdateExperience(exp.id, 'achievements', val)}
                fullWidth
              />
            </div>
          </div>
        ))}

        <button className="add-entry-btn" type="button" onClick={onAddExperience}>
          + Add Work Experience Entry
        </button>

        {/* Projects Sub-Section */}
        <div style={{ marginTop: '2.5rem' }}>
          <h3 style={{ fontFamily: 'Clash Display', fontSize: '1.2rem', marginBottom: '1rem' }}>
            Key Projects
          </h3>
          {projects.map((proj, idx) => (
            <div className="dynamic-item" key={proj.id}>
              <div className="dynamic-item__header">
                <span className="dynamic-item__title">
                  <span className="dynamic-item__number">Project #{idx + 1}</span>
                  {proj.name || 'New Project'}
                </span>
                <button
                  className="dynamic-item__delete"
                  type="button"
                  onClick={() => onRemoveProject(proj.id)}
                >
                  Remove
                </button>
              </div>
              <div className="input-grid">
                <FormInput
                  label="Project Name"
                  placeholder="e.g. CloudTask - Distributed Scheduler"
                  value={proj.name}
                  onChange={(val) => onUpdateProject(proj.id, 'name', val)}
                  error={errors[`projects.${proj.id}.name`]}
                />

                <FormInput
                  label="Project URL / GitHub (optional)"
                  type="url"
                  placeholder="https://github.com/..."
                  value={proj.url}
                  onChange={(val) => onUpdateProject(proj.id, 'url', val)}
                />

                <FormInput
                  label="Technologies Used"
                  placeholder="e.g. Node.js, PostgreSQL, Docker, Redis, TypeScript"
                  value={proj.technologies}
                  onChange={(val) => onUpdateProject(proj.id, 'technologies', val)}
                  fullWidth
                />

                <FormTextarea
                  label="Description & Architecture"
                  rows={3}
                  placeholder="Describe the problem, what you engineered, and key functionality."
                  value={proj.description}
                  onChange={(val) => onUpdateProject(proj.id, 'description', val)}
                  error={errors[`projects.${proj.id}.description`]}
                  fullWidth
                />
              </div>
            </div>
          ))}

          <button className="add-entry-btn" type="button" onClick={onAddProject}>
            + Add Project Entry
          </button>
        </div>
      </div>
    </div>
  )
}
