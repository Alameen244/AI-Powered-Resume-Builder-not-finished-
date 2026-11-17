import { FormTextarea } from '../FormTextarea.jsx'
import { AIGenerationStatus } from '../AIGenerationStatus.jsx'

export function TargetJobSection({
  jobDescription,
  onChangeJobDescription,
  formData,
  isValidated,
  onGenerateAI,
  isGenerating,
  generationProgress,
  generationError,
  generatedData,
}) {
  return (
    <div className="form-card-outer">
      <div className="form-card-inner">
        <div className="form-section-header">
          <h2>5. Target Job Description & Review</h2>
          <p>
            Optionally provide a job description for keyword alignment, then generate
            your ATS-optimized professional resume.
          </p>
        </div>

        <div className="input-grid">
          <FormTextarea
            label="Target Job Description (Optional for Keyword Tailoring)"
            rows={5}
            placeholder="Paste the target job description or role requirements here. The AI will emphasize matching industry keywords and skills without fabricating information."
            value={jobDescription}
            onChange={onChangeJobDescription}
            fullWidth
          />
        </div>

        {/* AI Action Box */}
        <div
          style={{
            marginTop: '2rem',
            padding: '1.75rem',
            borderRadius: '1.25rem',
            background: 'rgba(200, 164, 93, 0.06)',
            border: '1px solid rgba(200, 164, 93, 0.3)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h3 style={{ fontFamily: 'Clash Display', margin: '0 0 0.35rem', fontSize: '1.3rem', color: 'var(--text-strong)' }}>
                AI Resume Enhancement
              </h3>
              <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                Rewrites bullet points with strong action verbs, polishes your professional summary, and optimizes phrasing for ATS systems.
              </p>
            </div>
            <button
              className="builder-btn builder-btn--primary"
              type="button"
              disabled={isGenerating}
              onClick={onGenerateAI}
              style={{
                fontSize: '0.95rem',
                padding: '0.75rem 1.75rem',
                opacity: isGenerating ? 0.65 : 1,
                cursor: isGenerating ? 'not-allowed' : 'pointer',
              }}
            >
              {isGenerating ? '⏳ Generating Your Resume...' : '✨ Generate Your Resume'}
            </button>
          </div>

          {/* AI Generation Progress, Error, or Success Card */}
          <AIGenerationStatus
            isLoading={isGenerating}
            progressMessage={generationProgress}
            error={generationError}
            onRetry={onGenerateAI}
            generatedData={generatedData}
          />
        </div>

        {/* Readiness Overview */}
        <div
          style={{
            marginTop: '1.75rem',
            padding: '1.25rem 1.5rem',
            borderRadius: '1rem',
            background: 'rgba(255, 255, 255, 0.02)',
            border: '1px solid var(--panel-line)',
          }}
        >
          <h4 style={{ fontFamily: 'Clash Display', margin: '0 0 0.4rem', fontSize: '1rem' }}>
            Input Verification Checklist
          </h4>
          <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', margin: '0 0 0.75rem' }}>
            {isValidated ? (
              <span style={{ color: '#7f9b72', fontWeight: 600 }}>
                ✓ All mandatory fields are satisfied. Ready for AI generation and Live Preview.
              </span>
            ) : (
              'Click "Validate Form & Review" below or generate directly to verify required fields.'
            )}
          </p>
          <div style={{ display: 'flex', gap: '1.75rem', fontSize: '0.84rem', flexWrap: 'wrap' }}>
            <div>
              <strong>Candidate:</strong> {formData.personal.fullName || '—'}
            </div>
            <div>
              <strong>Template:</strong> {formData.template}
            </div>
            <div>
              <strong>Education:</strong> {formData.education.length} {formData.education.length === 1 ? 'entry' : 'entries'}
            </div>
            <div>
              <strong>Experience:</strong> {formData.experience.length} {formData.experience.length === 1 ? 'role' : 'roles'}
            </div>
            <div>
              <strong>Projects:</strong> {formData.projects.length} {formData.projects.length === 1 ? 'project' : 'projects'}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
