import { useEffect, useState } from 'react'
import { getResumeHistory, deleteResumeRecord } from '../../services/api.js'
import './history.css'

export function ResumeHistoryModal({ isOpen, onClose }) {
  const [records, setRecords] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const reloadHistory = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const data = await getResumeHistory(50)
      setRecords(data || [])
    } catch (err) {
      setError(err.message || 'Could not load resume history records')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    let ignore = false
    if (isOpen) {
      getResumeHistory(50)
        .then((data) => {
          if (!ignore) {
            setRecords(data || [])
          }
        })
        .catch((err) => {
          if (!ignore) {
            setError(err.message || 'Could not load resume history records')
          }
        })
    }
    return () => {
      ignore = true
    }
  }, [isOpen])

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this metadata record from MySQL history?')) return
    try {
      await deleteResumeRecord(id)
      setRecords((prev) => prev.filter((r) => r.id !== id))
    } catch (err) {
      alert('Failed to delete record: ' + err.message)
    }
  }

  if (!isOpen) return null

  const formatTimestamp = (ts) => {
    if (!ts) return '—'
    const date = new Date(ts)
    return isNaN(date.getTime())
      ? ts
      : date.toLocaleDateString(undefined, {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        })
  }

  const getTemplateLabel = (templateName) => {
    switch (templateName) {
      case 'developer':
        return { label: 'Technical Depth', class: 'template-badge--developer' }
      case 'systems':
        return { label: 'Executive Signal', class: 'template-badge--systems' }
      case 'creative':
      default:
        return { label: 'Modern Minimal', class: 'template-badge--creative' }
    }
  }

  return (
    <div className="history-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="history-modal" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="history-modal__header">
          <div>
            <h3 className="history-modal__title">PDF Generation History</h3>
            <p className="history-modal__subtitle">
              Audit log of generated resumes recorded in MySQL (`generated_resumes`)
            </p>
          </div>
          <button className="history-modal__close" type="button" onClick={onClose} aria-label="Close history modal">
            ✕
          </button>
        </div>

        {/* Privacy Notice Banner */}
        <div className="history-disclaimer">
          <strong>🔒 Privacy & Data Minimization Notice:</strong> This database table records only
          PDF file generation metadata (filename, byte size, chosen template, and timestamp). In
          accordance with strict privacy design, <em>no personal candidate information, phone
          numbers, emails, or resume texts are stored on the server</em>. Downloaded PDFs reside
          strictly on your local device.
        </div>

        {/* Content Area */}
        <div className="history-scroll">
          {isLoading ? (
            <div style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--text-muted)' }}>
              Loading database records from MySQL...
            </div>
          ) : error ? (
            <div style={{ textAlign: 'center', padding: '2rem 1rem', color: '#ff6b6b' }}>
              <p>⚠️ {error}</p>
              <button className="builder-btn" type="button" onClick={reloadHistory} style={{ marginTop: '0.5rem' }}>
                Retry
              </button>
            </div>
          ) : records.length === 0 ? (
            <div className="history-empty">
              <h4>No Generation Records Found</h4>
              <p>When you click "Download PDF" in the live preview, the generation metadata will appear here.</p>
            </div>
          ) : (
            <table className="history-table">
              <thead>
                <tr>
                  <th>PDF Filename</th>
                  <th>Template</th>
                  <th>File Size</th>
                  <th>Generated At</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {records.map((item) => {
                  const tmpl = getTemplateLabel(item.template_name)
                  const sizeKb = Math.round(item.file_size / 1024)
                  return (
                    <tr className="history-row" key={item.id}>
                      <td>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                          📄 {item.file_name}
                        </span>
                      </td>
                      <td>
                        <span className={`template-badge ${tmpl.class}`}>{tmpl.label}</span>
                      </td>
                      <td>{sizeKb} KB</td>
                      <td style={{ color: 'var(--text-muted)', fontSize: '0.84rem' }}>
                        {formatTimestamp(item.generation_timestamp)}
                      </td>
                      <td>
                        <button
                          className="delete-record-btn"
                          type="button"
                          onClick={() => handleDelete(item.id)}
                          title="Delete metadata record"
                        >
                          🗑️ Delete
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          )}
        </div>

        {/* Footer */}
        <div className="history-modal__footer">
          <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
            Total Recorded Exports: <strong>{records.length}</strong>
          </span>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button className="builder-btn" type="button" onClick={reloadHistory}>
              🔄 Refresh
            </button>
            <button className="builder-btn builder-btn--primary" type="button" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
