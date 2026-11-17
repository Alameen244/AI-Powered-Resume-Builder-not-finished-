export const initialResumeState = {
  template: 'developer',
  personal: {
    fullName: '',
    email: '',
    phone: '',
    location: '',
    linkedIn: '',
    portfolio: '',
    github: '',
  },
  summary: '',
  education: [
    {
      id: 'edu-1',
      degree: '',
      institution: '',
      location: '',
      startYear: '',
      endYear: '',
      grade: '',
    },
  ],
  experience: [
    {
      id: 'exp-1',
      jobTitle: '',
      company: '',
      duration: '',
      responsibilities: '',
      achievements: '',
    },
  ],
  projects: [
    {
      id: 'proj-1',
      name: '',
      description: '',
      technologies: '',
      url: '',
    },
  ],
  skills: {
    technical: '',
    soft: '',
  },
  certifications: [
    {
      id: 'cert-1',
      name: '',
      issuer: '',
      year: '',
    },
  ],
  additional: {
    achievements: '',
    languages: '',
    extracurricular: '',
  },
  jobDescription: '',
}
