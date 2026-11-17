import { ModernMinimalTemplate } from './templates/ModernMinimalTemplate.jsx'
import { TechnicalDepthTemplate } from './templates/TechnicalDepthTemplate.jsx'
import { ExecutiveSignalTemplate } from './templates/ExecutiveSignalTemplate.jsx'
import './resume-preview.css'

export function ResumeDocument({ resume, templateId = 'creative' }) {
  if (!resume) return null

  switch (templateId) {
    case 'developer':
      return <TechnicalDepthTemplate resume={resume} />
    case 'systems':
      return <ExecutiveSignalTemplate resume={resume} />
    case 'creative':
    default:
      return <ModernMinimalTemplate resume={resume} />
  }
}
