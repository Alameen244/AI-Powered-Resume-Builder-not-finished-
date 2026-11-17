import './ai-generation.css'

export function AIGenerationStatus({ isLoading, progressMessage, error, onRetry, generatedData }) {
  if (isLoading) {
    return (
      <div className="ai-status-card ai-status-card--loading">
        <div className="ai-spinner" />
        <div className="ai-status-info">
          <h4>AI is crafting your resume...</h4>
          <p>{progressMessage || 'Transforming responsibilities into strong, ATS-tailored achievement bullets.'}</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="ai-status-card ai-status-card--error" role="alert">
        <div className="ai-error-badge">Generation Error</div>
        <h4>Unable to Generate Resume</h4>
        <p>{error}</p>
        {onRetry && (
          <button className="builder-btn builder-btn--primary" type="button" onClick={onRetry}>
            🔄 Try Again
          </button>
        )}
      </div>
    )
  }

  if (generatedData) {
    return (
      <div className="ai-status-card ai-status-card--success">
        <div className="ai-success-badge">✓ AI Enhanced Successfully</div>
        <h4>AI Enhanced Resume Ready</h4>
        <p>Your resume has been rewritten with achievement-focused action verbs and ATS keywords.</p>
        {generatedData.summary && (
          <div className="ai-generated-summary">
            <strong>Generated Professional Summary:</strong>
            <p>"{generatedData.summary}"</p>
          </div>
        )}
      </div>
    )
  }

  return null
}
