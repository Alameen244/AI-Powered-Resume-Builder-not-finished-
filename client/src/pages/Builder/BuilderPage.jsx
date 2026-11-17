import { useState } from 'react'
import { initialResumeState } from '../../data/initialResumeState.js'
import { sampleResumeData } from '../../data/sampleResumeData.js'
import { generateResumeAI } from '../../services/api.js'
import { TemplateSelector } from '../../components/builder/TemplateSelector.jsx'
import { PersonalSection } from '../../components/builder/sections/PersonalSection.jsx'
import { EducationSection } from '../../components/builder/sections/EducationSection.jsx'
import { ExperienceSection } from '../../components/builder/sections/ExperienceSection.jsx'
import { SkillsSection } from '../../components/builder/sections/SkillsSection.jsx'
import { TargetJobSection } from '../../components/builder/sections/TargetJobSection.jsx'
import { LiveResumePreview } from '../../components/preview/LiveResumePreview.jsx'
import { ResumeHistoryModal } from '../../components/history/ResumeHistoryModal.jsx'
import './builder.css'

const TABS = [
  { id: 'personal', label: '1. Personal & Summary' },
  { id: 'education', label: '2. Education & Certs' },
  { id: 'experience', label: '3. Experience & Projects' },
  { id: 'skills', label: '4. Skills & Additional' },
  { id: 'target', label: '5. Target Job & Review' },
]

export default function BuilderPage({ onNavigate }) {
  const [formData, setFormData] = useState(initialResumeState)
  const [activeTab, setActiveTab] = useState('personal')
  const [viewMode, setViewMode] = useState('form') // 'form' | 'preview'
  const [showHistory, setShowHistory] = useState(false)
  const [errors, setErrors] = useState({})
  const [isValidated, setIsValidated] = useState(false)

  // AI Generation States
  const [isGenerating, setIsGenerating] = useState(false)
  const [generationProgress, setGenerationProgress] = useState('')
  const [generationError, setGenerationError] = useState(null)
  const [aiResumeData, setAiResumeData] = useState(null)

  // Field change helpers
  const updatePersonal = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      personal: { ...prev.personal, [field]: value },
    }))
    clearFieldError(`personal.${field}`)
  }

  const updateSkills = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      skills: { ...prev.skills, [field]: value },
    }))
    clearFieldError(`skills.${field}`)
  }

  const updateAdditional = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      additional: { ...prev.additional, [field]: value },
    }))
  }

  const handleArrayChange = (section, id, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: prev[section].map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      ),
    }))
    clearFieldError(`${section}.${id}.${field}`)
  }

  const addItem = (section, defaultObj) => {
    const newId = `${section.substring(0, 4)}-${Date.now()}`
    setFormData((prev) => ({
      ...prev,
      [section]: [...prev[section], { ...defaultObj, id: newId }],
    }))
  }

  const removeItem = (section, id) => {
    setFormData((prev) => ({
      ...prev,
      [section]: prev[section].filter((item) => item.id !== id),
    }))
  }

  const clearFieldError = (fieldKey) => {
    setErrors((prev) => {
      if (!prev[fieldKey]) return prev
      const updated = { ...prev }
      delete updated[fieldKey]
      return updated
    })
  }

  // Smooth scroll to the form section heading/tabs
  const scrollToForm = () => {
    setTimeout(() => {
      const anchor = document.getElementById('builder-form-start')
      if (anchor) {
        anchor.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }, 60)
  }

  // Validation
  const validateForm = () => {
    const newErrors = {}

    if (!formData.personal.fullName.trim()) {
      newErrors['personal.fullName'] = 'Full Name is required'
    }
    if (!formData.personal.email.trim()) {
      newErrors['personal.email'] = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.personal.email.trim())) {
      newErrors['personal.email'] = 'Enter a valid email address'
    }
    if (!formData.personal.phone.trim()) {
      newErrors['personal.phone'] = 'Phone number is required'
    }
    if (!formData.personal.location.trim()) {
      newErrors['personal.location'] = 'Location (City, Country) is required'
    }

    if (formData.education.length === 0) {
      newErrors['education.general'] = 'At least one education entry is required'
    } else {
      formData.education.forEach((edu) => {
        if (!edu.degree.trim()) newErrors[`education.${edu.id}.degree`] = 'Degree is required'
        if (!edu.institution.trim()) newErrors[`education.${edu.id}.institution`] = 'Institution is required'
        if (!edu.startYear.trim()) newErrors[`education.${edu.id}.startYear`] = 'Start year is required'
        if (!edu.endYear.trim()) newErrors[`education.${edu.id}.endYear`] = 'End year is required'
      })
    }

    if (!formData.skills.technical.trim()) {
      newErrors['skills.technical'] = 'Technical skills are required'
    }

    setErrors(newErrors)
    const valid = Object.keys(newErrors).length === 0
    setIsValidated(valid)
    return valid
  }

  const handleValidateAndReview = () => {
    const valid = validateForm()
    if (valid) {
      setActiveTab('target')
    } else {
      if (Object.keys(errors).some((k) => k.startsWith('personal')) || !formData.personal.fullName.trim()) {
        setActiveTab('personal')
      } else if (Object.keys(errors).some((k) => k.startsWith('education')) || formData.education.length === 0) {
        setActiveTab('education')
      } else if (Object.keys(errors).some((k) => k.startsWith('skills'))) {
        setActiveTab('skills')
      }
    }
    scrollToForm()
  }

  // AI Generation Trigger
  const handleGenerateAI = async () => {
    const valid = validateForm()
    if (!valid) {
      handleValidateAndReview()
      return
    }

    setIsGenerating(true)
    setGenerationError(null)
    setGenerationProgress('Connecting to AI generation service...')

    const progressTimer = setTimeout(() => {
      setGenerationProgress('Refining bullet points with action verbs and ATS keywords...')
    }, 1400)

    try {
      const generated = await generateResumeAI(formData)
      clearTimeout(progressTimer)
      setAiResumeData(generated)

      // Update form summary with AI generated summary
      if (generated.summary) {
        setFormData((prev) => ({
          ...prev,
          summary: generated.summary,
        }))
      }

      // Automatically transition to preview
      setViewMode('preview')
    } catch (err) {
      clearTimeout(progressTimer)
      setGenerationError(err.message || 'Failed to generate resume with AI.')
    } finally {
      setIsGenerating(false)
      setGenerationProgress('')
    }
  }

  return (
    <div className="builder-shell">
      {/* Sticky Header */}
      <header className="builder-header">
        <div className="builder-header__brand">
          <button
            className="builder-btn builder-btn--ghost"
            type="button"
            onClick={() => onNavigate('home')}
            aria-label="Back to home page"
          >
            ←
          </button>
          <div className='left-header'>
          <span className="builder-header__title">Resume Studio</span>
          <span className="builder-header__badge">
            {viewMode === 'preview' ? 'Live A4 Preview' : 'Interactive Form'}
          </span>
          </div>
        </div>

        {/* View Mode Switcher Pills */}
        <div className="builder-header__actions">
          <div style={{ display: 'flex', gap: '0.35rem', background: 'rgba(0,0,0,0.25)', padding: '0.25rem', borderRadius: '999px' }}>
            <button
              className={`builder-btn ${viewMode === 'form' ? 'builder-btn--primary' : 'builder-btn--ghost'}`}
              type="button"
              onClick={() => setViewMode('form')}
              style={{ padding: '0.45rem 1rem', fontSize: '0.8rem' }}
            >
              📝 Form Editor
            </button>
            <button
              className={`builder-btn ${viewMode === 'preview' ? 'builder-btn--primary' : 'builder-btn--ghost'}`}
              type="button"
              onClick={() => setViewMode('preview')}
              style={{ padding: '0.45rem 1rem', fontSize: '0.8rem' }}
            >
              📄 Live Preview
            </button>
          </div>

          <button
            className="builder-btn"
            type="button"
            onClick={() => setShowHistory(true)}
          >
            📜 History
          </button>
          <button
            className="builder-btn"
            type="button"
            onClick={() => {
              setFormData(sampleResumeData)
              setErrors({})
              setIsValidated(false)
              setAiResumeData(null)
            }}
          >
            ✨ Fill Sample Data
          </button>
          <button
            className="builder-btn builder-btn--ghost"
            type="button"
            onClick={() => {
              if (window.confirm('Clear all form fields?')) {
                setFormData(initialResumeState)
                setErrors({})
                setIsValidated(false)
                setAiResumeData(null)
              }
            }}
          >
            Reset
          </button>
        </div>
      </header>

      {/* Conditionally Render Preview or Form */}
      {viewMode === 'preview' ? (
        <LiveResumePreview
          resumeData={formData}
          aiData={aiResumeData}
          activeTemplate={formData.template}
          onSelectTemplate={(id) => setFormData((prev) => ({ ...prev, template: id }))}
          onBackToEdit={() => setViewMode('form')}
        />
      ) : (
        <>
          {/* Intro */}
          <div className="builder-intro">
            <p className="eyebrow">Structured Information Input</p>
            <h1>Craft Your Professional Story</h1>
            <p>
              Fill in your details below. Our AI engine will polish your bullet points,
              strengthen phrasing, and format your output into an ATS-ready resume.
            </p>
          </div>

          {/* Visual Template Selector */}
          <TemplateSelector
            selectedTemplate={formData.template}
            onSelect={(id) => setFormData((prev) => ({ ...prev, template: id }))}
          />

          {/* Form Anchor for Smooth Navigation */}
          <div id="builder-form-start" className="builder-form-anchor" />

          {/* Navigation Tabs */}
          <nav className="builder-tabs" aria-label="Resume Form Sections">
            {TABS.map((tab) => {
              const hasTabError = Object.keys(errors).some((key) => key.startsWith(tab.id))
              return (
                <button
                  key={tab.id}
                  className={`builder-tab ${activeTab === tab.id ? 'is-active' : ''}`}
                  onClick={() => {
                    setActiveTab(tab.id)
                    scrollToForm()
                  }}
                  type="button"
                >
                  {tab.label}
                  {hasTabError && <span className="builder-tab__error-dot" title="Has errors" />}
                </button>
              )
            })}
          </nav>

          {/* Error Summary Banner */}
          {Object.keys(errors).length > 0 && (
            <div className="form-errors-summary" role="alert">
              <strong>Please address the following requirements before proceeding:</strong>
              <ul>
                {Object.entries(errors).map(([key, msg]) => (
                  <li key={key}>{msg}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Section Views */}
          {activeTab === 'personal' && (
            <PersonalSection
              data={formData.personal}
              summary={formData.summary}
              onChangePersonal={updatePersonal}
              onChangeSummary={(val) => setFormData((prev) => ({ ...prev, summary: val }))}
              errors={errors}
            />
          )}

          {activeTab === 'education' && (
            <EducationSection
              education={formData.education}
              certifications={formData.certifications}
              onUpdateEducation={(id, field, val) => handleArrayChange('education', id, field, val)}
              onAddEducation={() =>
                addItem('education', {
                  degree: '',
                  institution: '',
                  location: '',
                  startYear: '',
                  endYear: '',
                  grade: '',
                })
              }
              onRemoveEducation={(id) => removeItem('education', id)}
              onUpdateCert={(id, field, val) => handleArrayChange('certifications', id, field, val)}
              onAddCert={() => addItem('certifications', { name: '', issuer: '', year: '' })}
              onRemoveCert={(id) => removeItem('certifications', id)}
              errors={errors}
            />
          )}

          {activeTab === 'experience' && (
            <ExperienceSection
              experience={formData.experience}
              projects={formData.projects}
              onUpdateExperience={(id, field, val) => handleArrayChange('experience', id, field, val)}
              onAddExperience={() =>
                addItem('experience', {
                  jobTitle: '',
                  company: '',
                  duration: '',
                  responsibilities: '',
                  achievements: '',
                })
              }
              onRemoveExperience={(id) => removeItem('experience', id)}
              onUpdateProject={(id, field, val) => handleArrayChange('projects', id, field, val)}
              onAddProject={() =>
                addItem('projects', {
                  name: '',
                  description: '',
                  technologies: '',
                  url: '',
                })
              }
              onRemoveProject={(id) => removeItem('projects', id)}
              errors={errors}
            />
          )}

          {activeTab === 'skills' && (
            <SkillsSection
              skills={formData.skills}
              additional={formData.additional}
              onUpdateSkills={updateSkills}
              onUpdateAdditional={updateAdditional}
              errors={errors}
            />
          )}

          {activeTab === 'target' && (
            <TargetJobSection
              jobDescription={formData.jobDescription}
              onChangeJobDescription={(val) => setFormData((prev) => ({ ...prev, jobDescription: val }))}
              formData={formData}
              isValidated={isValidated}
              onGenerateAI={handleGenerateAI}
              isGenerating={isGenerating}
              generationProgress={generationProgress}
              generationError={generationError}
              generatedData={aiResumeData}
            />
          )}

          {/* Footer Navigation Bar */}
          <footer className="form-footer">
            <div className="form-footer__left" style={{ display: 'flex', gap: '0.75rem' }}>
              {activeTab !== 'personal' ? (
                <button
                  className="builder-btn"
                  type="button"
                  onClick={() => {
                    const curIdx = TABS.findIndex((t) => t.id === activeTab)
                    if (curIdx > 0) {
                      setActiveTab(TABS[curIdx - 1].id)
                      scrollToForm()
                    }
                  }}
                >
                  ← Previous Section
                </button>
              ) : (
                <button
                  className="builder-btn builder-btn--ghost"
                  type="button"
                  onClick={() => onNavigate('home')}
                >
                  ← Back to Home
                </button>
              )}
            </div>

            <div className="form-footer__right" style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
              <button
                className="builder-btn"
                type="button"
                onClick={() => setViewMode('preview')}
              >
                📄 Preview Resume
              </button>

              {activeTab !== 'target' ? (
                <button
                  className="builder-btn builder-btn--primary"
                  type="button"
                  onClick={() => {
                    const curIdx = TABS.findIndex((t) => t.id === activeTab)
                    if (curIdx < TABS.length - 1) {
                      setActiveTab(TABS[curIdx + 1].id)
                      scrollToForm()
                    }
                  }}
                >
                  Next Section →
                </button>
              ) : (
                <button
                  className="builder-btn builder-btn--primary"
                  type="button"
                  disabled={isGenerating}
                  onClick={handleGenerateAI}
                  style={{
                    opacity: isGenerating ? 0.65 : 1,
                    cursor: isGenerating ? 'not-allowed' : 'pointer',
                  }}
                >
                  {isGenerating ? '⏳ Generating Your Resume...' : '✨ Generate Your Resume'}
                </button>
              )}
            </div>
          </footer>
        </>
      )}
      {/* PDF Generation History Modal */}
      <ResumeHistoryModal
        isOpen={showHistory}
        onClose={() => setShowHistory(false)}
      />
    </div>
  )
}
