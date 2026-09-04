import { projects } from '../../data/projects.js'
import { ProductVisual } from './ProductVisual.jsx'

export function ProjectShowcase() {
  return (
    <section className="section project-section" id="ai" aria-labelledby="work-title">
      <div className="section-heading">
        <p className="eyebrow">AI generation</p>
        <h2 id="work-title">From messy history to polished resume in one cinematic flow.</h2>
      </div>
      <div className="project-stack">
        {projects.map((project) => (
          <article className="project-piece" key={project.title}>
            <div>
              <p className="eyebrow">{project.eyebrow}</p>
              <h3>{project.title}</h3>
              <p>{project.text}</p>
            </div>
            <ProductVisual type={project.visualType} label={`${project.title} product preview`} />
          </article>
        ))}
      </div>
    </section>
  )
}
