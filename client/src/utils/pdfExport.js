import html2pdf from 'html2pdf.js'

/**
 * Generate and download an A4 PDF from a DOM element using html2pdf.js.
 *
 * @param {HTMLElement} element The resume preview DOM element
 * @param {string} candidateName Name to generate the filename
 * @param {string} templateId Template identifier
 * @returns {Promise<{ fileName: string, fileSize: number }>}
 */
export async function exportResumeToPdf(element, candidateName = 'Candidate', templateId = 'creative') {
  if (!element) {
    throw new Error('Resume element not found for PDF generation.')
  }

  // Create clean, sanitized filename e.g. Alex_Vance_Resume.pdf
  const sanitizedName = candidateName
    .trim()
    .replace(/[^a-zA-Z0-9_\s-]/g, '')
    .replace(/\s+/g, '_') || 'Resume'
  const fileName = `${sanitizedName}_Resume.pdf`

  const options = {
    margin: [6, 6, 6, 6], // in mm
    filename: fileName,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: {
      scale: 2, // High resolution rendering
      useCORS: true,
      logging: false,
      scrollY: 0,
      scrollX: 0,
      windowWidth: element.scrollWidth,
    },
    jsPDF: {
      unit: 'mm',
      format: 'a4',
      orientation: 'portrait',
      compress: true,
    },
    pagebreak: {
      mode: ['avoid-all', 'css', 'legacy'],
      avoid: ['.resume-item', '.resume-section-title', '.resume-header'],
    },
  }

  try {
    // Generate PDF worker instance
    const worker = html2pdf().from(element).set(options)

    // Calculate actual blob output to get precise file size
    const pdfBlob = await worker.outputPdf('blob')
    const fileSize = pdfBlob ? pdfBlob.size : 0

    // Trigger user browser download
    await worker.save()

    return {
      fileName,
      fileSize,
      templateId,
    }
  } catch (err) {
    console.error('PDF Generation failed:', err)
    throw new Error('Failed to generate PDF: ' + err.message)
  }
}
