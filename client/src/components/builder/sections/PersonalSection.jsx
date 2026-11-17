import { FormInput } from '../FormInput.jsx'
import { FormTextarea } from '../FormTextarea.jsx'

export function PersonalSection({ data, summary, onChangePersonal, onChangeSummary, errors }) {
  return (
    <div className="form-card-outer">
      <div className="form-card-inner">
        <div className="form-section-header">
          <h2>1. Personal Information & Summary</h2>
          <p>Your core contact information and professional headline.</p>
        </div>
        <div className="input-grid">
          <FormInput
            label="Full Name"
            placeholder="e.g. Alex Vance"
            value={data.fullName}
            onChange={(val) => onChangePersonal('fullName', val)}
            required
            error={errors['personal.fullName']}
          />

          <FormInput
            label="Email Address"
            type="email"
            placeholder="alex.vance@example.com"
            value={data.email}
            onChange={(val) => onChangePersonal('email', val)}
            required
            error={errors['personal.email']}
          />

          <FormInput
            label="Phone Number"
            type="tel"
            placeholder="+1 (555) 234-5678"
            value={data.phone}
            onChange={(val) => onChangePersonal('phone', val)}
            required
            error={errors['personal.phone']}
          />

          <FormInput
            label="Location"
            placeholder="San Francisco, CA"
            value={data.location}
            onChange={(val) => onChangePersonal('location', val)}
            required
            error={errors['personal.location']}
          />

          <FormInput
            label="LinkedIn Profile (optional)"
            type="url"
            placeholder="https://linkedin.com/in/alexvance"
            value={data.linkedIn}
            onChange={(val) => onChangePersonal('linkedIn', val)}
          />

          <FormInput
            label="Portfolio URL (optional)"
            type="url"
            placeholder="https://alexvance.dev"
            value={data.portfolio}
            onChange={(val) => onChangePersonal('portfolio', val)}
          />

          <FormInput
            label="GitHub URL (optional)"
            type="url"
            placeholder="https://github.com/alexvance"
            value={data.github}
            onChange={(val) => onChangePersonal('github', val)}
            fullWidth
          />

          <FormTextarea
            label="Professional Summary / Objective (optional)"
            rows={4}
            placeholder="Briefly state your career trajectory, domain interest, or key competencies. The AI will polish this into an impactful summary in Step 5."
            value={summary}
            onChange={onChangeSummary}
            fullWidth
          />
        </div>
      </div>
    </div>
  )
}
