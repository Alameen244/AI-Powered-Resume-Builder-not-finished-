import { useState } from 'react'
import { resumeTemplates } from '../../data/resumeTemplates.js'
import { exportResumeToPdf } from '../../utils/pdfExport.js'
import { saveResumeMetadata } from '../../services/api.js'
import { ResumeDocument } from './ResumeDocument.jsx'

export function LiveResumePreview({
  resumeData,
  aiData,
  activeTemplate,
  onSelectTemplate,
  onBackToEdit,
  onPdfGenerated,
}) {
  const [isDownloading, setIsDownloading] = useState(false)
  const [downloadNotice, setDownloadNotice] = useState(null)
  const [downloadError, setDownloadError] = useState(null)

  // Use AI-generated resume data if available, fallback to form data
  const displayResume = aiData || resumeData
  const isAiEnhanced = Boolean(aiData)
  const candidateName = displayResume?.personal?.fullName || 'Candidate'

  const handleDownload = async () => {
    setIsDownloading(true)
    setDownloadError(null)
    setDownloadNotice('Rendering high-resolution A4 document...')

    try {
      const sheetElement = document.getElementById('resume-export-sheet')
      if (!sheetElement) {
        throw new Error('Resume sheet element not found in DOM.')
      }

      // 1. Generate & download A4 PDF
      const result = await exportResumeToPdf(sheetElement, candidateName, activeTemplate)
      const sizeKb = Math.round(result.fileSize / 1024)

      // 2. Save metadata only to MySQL via PHP REST API
      try {
        const savedRecord = await saveResumeMetadata({
          file_name: result.fileName,
          file_size: result.fileSize,
          template_name: result.templateId,
        })
        setDownloadNotice(
          `✓ Downloaded ${result.fileName} (${sizeKb} KB) • Recorded in MySQL as Record #${savedRecord.id}`
        )
      } catch (saveErr) {
        console.warn('Metadata recording warning:', saveErr)
        setDownloadNotice(`✓ Downloaded ${result.fileName} (${sizeKb} KB)`)
      }

      // Callback to parent
      if (onPdfGenerated) {
        onPdfGenerated(result)
      }
    } catch (err) {
      console.error(err)
      setDownloadError(err.message || 'Failed to generate PDF')
      setDownloadNotice(null)
    } finally {
      setIsDownloading(false)
    }
  }

  return (
    <div className="preview-container">
      {/* Top Floating Toolbar */}
      <div className="preview-toolbar">
        <div className="preview-toolbar__title">
          <span>Resume Preview</span>
          {isAiEnhanced ? (
            <span className="preview-toolbar__tag">✨ AI Enhanced</span>
          ) : (
            <span
              className="preview-toolbar__tag"
              style={{ background: 'rgba(200, 164, 93, 0.15)', color: 'var(--accent)' }}
            >
              Draft Preview
            </span>
          )}
        </div>

        {/* Template Switcher & Actions */}
        <div className="preview-toolbar__actions">
          <div className="preview-template-pills">
            {resumeTemplates.map((t) => (
              <button
                key={t.id}
                type="button"
                className={`preview-template-pill ${activeTemplate === t.id ? 'is-active' : ''}`}
                onClick={() => onSelectTemplate(t.id)}
              >
                {t.title}
              </button>
            ))}
          </div>

          <button className="builder-btn" type="button" onClick={onBackToEdit}>
            ✏️ Edit Information
          </button>

          <button
            className="builder-btn builder-btn--primary"
            type="button"
            disabled={isDownloading}
            onClick={handleDownload}
            style={{
              opacity: isDownloading ? 0.7 : 1,
              cursor: isDownloading ? 'wait' : 'pointer',
            }}
          >
            {isDownloading ? '⏳ Rendering PDF...' : '⬇️ Download PDF'}
          </button>
        </div>
      </div>

      {/* Download Status Notification */}
      {downloadNotice && (
        <div
          style={{
            maxWidth: '820px',
            width: '100%',
            padding: '0.75rem 1.25rem',
            borderRadius: '999px',
            background: 'rgba(127, 155, 114, 0.15)',
            border: '1px solid rgba(127, 155, 114, 0.35)',
            color: '#7f9b72',
            fontSize: '0.85rem',
            textAlign: 'center',
            fontWeight: 500,
          }}
        >
          {downloadNotice}
        </div>
      )}

      {downloadError && (
        <div
          style={{
            maxWidth: '820px',
            width: '100%',
            padding: '0.75rem 1.25rem',
            borderRadius: '999px',
            background: 'rgba(255, 82, 82, 0.15)',
            border: '1px solid rgba(255, 82, 82, 0.35)',
            color: '#ff6b6b',
            fontSize: '0.85rem',
            textAlign: 'center',
          }}
        >
          ⚠️ {downloadError}
        </div>
      )}

      {/* A4 Document Viewport */}
      <div className="preview-paper-wrapper">
        <ResumeDocument resume={displayResume} templateId={activeTemplate} />
      </div>
    </div>
  )
}
