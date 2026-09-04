import { resumeTemplates } from './resumeTemplates.js'

export const resumeNodes = [
  {
    id: 'creative',
    title: 'Creative Resume',
    category: 'Motion',
    position: [-4.8, 1.2, -2.8],
    previewOffset: [-0.9, 0.7, -0.6],
    template: resumeTemplates[0],
  },
  {
    id: 'developer',
    title: 'Developer Resume',
    category: 'Product',
    position: [0.8, -0.4, -4.2],
    previewOffset: [0.8, 0.65, -0.8],
    template: resumeTemplates[1],
  },
  {
    id: 'systems',
    title: 'Systems Resume',
    category: 'Architecture',
    position: [4.4, 1, -1.6],
    previewOffset: [0.7, 0.8, -0.9],
    template: resumeTemplates[2],
  },
]

export const networkPoints = [
  [-6, -1.3, -2.5],
  [-4.8, 1.2, -2.8],
  [-3.2, -0.2, -4.9],
  [-1.7, 2.1, -2.4],
  [0.8, -0.4, -4.2],
  [2.6, 1.7, -3.1],
  [4.4, 1, -1.6],
  [5.7, -1.2, -2.7],
  [2.8, -2.1, -4.9],
  [-0.6, -2, -2.2],
]

export const networkEdges = [
  [0, 1],
  [1, 2],
  [1, 3],
  [2, 4],
  [3, 4],
  [4, 5],
  [5, 6],
  [6, 7],
  [4, 8],
  [8, 9],
  [9, 0],
  [3, 6],
]
