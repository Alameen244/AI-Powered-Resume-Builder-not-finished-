/**
 * AI Resume Generator - Client API Service
 * Connects React frontend to the PHP MVC REST backend.
 */

// Try local environment or fallback to XAMPP Apache path and PHP CLI server
const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    ? 'http://localhost/myResumeIsCooked/server/public'
    : '')

/**
 * Generate AI-enhanced structured resume using Google Gemini via PHP backend.
 *
 * @param {Object} resumeData Raw form submission data
 * @returns {Promise<Object>} Formatted AI resume content
 */
export async function generateResumeAI(resumeData) {
  // Candidate fallback URLs for local dev flexibility
  const endpoints = [
    `${API_BASE_URL}/api/ai/generate-resume`,
    `http://127.0.0.1:8000/api/ai/generate-resume`,
    `http://localhost:8000/api/ai/generate-resume`,
  ]

  let lastError = null

  for (const url of endpoints) {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(resumeData),
      })

      const json = await response.json()

      if (!response.ok || !json.success) {
        throw new Error(json.message || `Request failed with status ${response.status}`)
      }

      return json.data
    } catch (err) {
      lastError = err
      // If network refused (server not on this port), continue trying alternate endpoint
      if (err.name === 'TypeError' && err.message.includes('fetch')) {
        continue
      }
      // If server responded with application error (e.g. Gemini 4xx/5xx), rethrow immediately
      throw err
    }
  }

  throw lastError || new Error('Could not connect to the backend server. Please verify PHP is running.')
}

/**
 * Save generated PDF metadata into MySQL database.
 */
export async function saveResumeMetadata(metadata) {
  const url = `${API_BASE_URL}/api/resumes`
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(metadata),
  })

  const json = await response.json()
  if (!response.ok || !json.success) {
    throw new Error(json.message || 'Failed to save resume metadata')
  }

  return json.data
}

/**
 * Fetch generation history records from MySQL database.
 */
export async function getResumeHistory(limit = 50) {
  const url = `${API_BASE_URL}/api/resumes?limit=${limit}`
  const response = await fetch(url, {
    method: 'GET',
    headers: { Accept: 'application/json' },
  })

  const json = await response.json()
  if (!response.ok || !json.success) {
    throw new Error(json.message || 'Failed to retrieve resume history')
  }

  return json.data
}

/**
 * Delete a specific metadata record from MySQL database.
 */
export async function deleteResumeRecord(id) {
  const url = `${API_BASE_URL}/api/resumes/${id}`
  const response = await fetch(url, {
    method: 'DELETE',
    headers: { Accept: 'application/json' },
  })

  const json = await response.json()
  if (!response.ok || !json.success) {
    throw new Error(json.message || 'Failed to delete resume record')
  }

  return json.data
}
