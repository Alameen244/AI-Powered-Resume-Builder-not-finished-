import { FormInput } from '../FormInput.jsx'
import { FormTextarea } from '../FormTextarea.jsx'

export function SkillsSection({
  skills,
  additional,
  onUpdateSkills,
  onUpdateAdditional,
  errors,
}) {
  return (
    <div className="form-card-outer">
      <div className="form-card-inner">
        <div className="form-section-header">
          <h2>4. Skills & Additional Information</h2>
          <p>Technical proficiencies, interpersonal strengths, honors, and languages.</p>
        </div>
        <div className="input-grid">
          <FormTextarea
            label="Technical Skills"
            rows={3}
            placeholder="e.g. JavaScript, TypeScript, React, Node.js, PHP, Python, PostgreSQL, MySQL, Docker, Git"
            value={skills.technical}
            onChange={(val) => onUpdateSkills('technical', val)}
            required
            error={errors['skills.technical']}
            fullWidth
          />

          <FormInput
            label="Soft Skills & Methodologies"
            placeholder="e.g. Agile Scrum, Cross-Functional Collaboration, Technical Writing, Problem Solving"
            value={skills.soft}
            onChange={(val) => onUpdateSkills('soft', val)}
            fullWidth
          />

          <FormTextarea
            label="Key Honors & Achievements (optional)"
            rows={2}
            placeholder="e.g. Dean's Honor List, Hackathon Winner, Outstanding Graduate Award"
            value={additional.achievements}
            onChange={(val) => onUpdateAdditional('achievements', val)}
            fullWidth
          />

          <FormInput
            label="Languages Spoken (optional)"
            placeholder="e.g. English (Native), French (B2)"
            value={additional.languages}
            onChange={(val) => onUpdateAdditional('languages', val)}
          />

          <FormInput
            label="Extracurricular Activities (optional)"
            placeholder="e.g. ACM Student Chapter Vice President, Robotics Club"
            value={additional.extracurricular}
            onChange={(val) => onUpdateAdditional('extracurricular', val)}
          />
        </div>
      </div>
    </div>
  )
}
