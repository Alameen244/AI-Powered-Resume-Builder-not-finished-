export const sampleResumeData = {
  template: 'developer',
  personal: {
    fullName: 'Alex Vance',
    email: 'alex.vance@example.com',
    phone: '+1 (555) 234-5678',
    location: 'San Francisco, CA',
    linkedIn: 'https://linkedin.com/in/alexvance',
    portfolio: 'https://alexvance.dev',
    github: 'https://github.com/alexvance',
  },
  summary:
    'Dedicated Full-Stack Software Engineering graduate passionate about modern web applications, distributed systems, and clean architecture. Experienced in React, Node.js, and relational databases through internships and university capstone projects.',
  education: [
    {
      id: 'edu-1',
      degree: 'B.S. in Computer Science',
      institution: 'State University of Technology',
      location: 'San Francisco, CA',
      startYear: '2020',
      endYear: '2024',
      grade: '3.85 / 4.00 CGPA',
    },
  ],
  experience: [
    {
      id: 'exp-1',
      jobTitle: 'Software Engineering Intern',
      company: 'Apex Data Labs',
      duration: 'May 2023 - August 2023',
      responsibilities:
        'Collaborated with a cross-functional team of 6 engineers to build REST APIs and interactive dashboards. Optimized database queries and participated in daily standups and agile sprint reviews.',
      achievements:
        'Reduced report query execution latency by 34% by refactoring SQL joins and introducing indexing.',
    },
  ],
  projects: [
    {
      id: 'proj-1',
      name: 'CloudTask - Distributed Task Scheduler',
      description:
        'Engineered an event-driven task queue system utilizing microservices architecture. Implemented worker pools with graceful shutdown and automated status reporting.',
      technologies: 'Node.js, PostgreSQL, Docker, Redis, TypeScript',
      url: 'https://github.com/alexvance/cloudtask',
    },
    {
      id: 'proj-2',
      name: 'Resona - Realtime Audio Visualizer',
      description:
        'Developed a browser-based WebGL audio visualization engine supporting custom shader rendering and responsive UI overlays.',
      technologies: 'React, Three.js, Web Audio API, Vite',
      url: 'https://github.com/alexvance/resona',
    },
  ],
  skills: {
    technical:
      'JavaScript, TypeScript, React, Node.js, PHP, Python, PostgreSQL, MySQL, Docker, Git, REST APIs, GraphQL',
    soft: 'Problem Solving, Team Collaboration, Technical Writing, Agile Methodologies, Adaptability',
  },
  certifications: [
    {
      id: 'cert-1',
      name: 'AWS Certified Cloud Practitioner',
      issuer: 'Amazon Web Services',
      year: '2024',
    },
  ],
  additional: {
    achievements: 'Dean’s Honor List (6 consecutive semesters), 1st place in University Hackathon 2023.',
    languages: 'English (Native), Spanish (Conversational)',
    extracurricular: 'Vice President of ACM Student Chapter, Mentor for CS freshmen coding bootcamps.',
  },
  jobDescription:
    'Seeking an ambitious Associate Full-Stack Software Engineer proficient in React, JavaScript/TypeScript, and backend database integrations. The ideal candidate writes clean, testable code, collaborates well with product teams, and thrives in high-growth engineering environments.',
}
