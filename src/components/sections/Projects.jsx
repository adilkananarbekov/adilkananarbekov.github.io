import AnimatedIcon from "../ui/AnimatedIcon";

function ProjectPreview({ project, index, label }) {
  return (
    <div className="project-preview" aria-hidden="true">
      <div className="project-preview-screen">
        <div className="project-preview-topline">
          <span className="project-preview-dot" />
          <span className="project-preview-dot" />
          <span className="project-preview-dot" />
        </div>
        <div className="project-preview-grid">
          {project.stack.map((icon, iconIndex) => (
            <span
              key={`${project.title}-${icon}`}
              className="project-preview-chip"
              style={{ "--preview-index": iconIndex }}
            >
              <span className={`icon icon--${icon}`} />
              <span>{icon}</span>
            </span>
          ))}
        </div>
        <div className="project-preview-lines">
          <span />
          <span />
          <span />
        </div>
        {project.previewIcon ? (
          <span className={`project-preview-signal project-preview-signal--${project.previewIcon}`}>
            <AnimatedIcon name={project.previewIcon} />
          </span>
        ) : null}
      </div>
      <div className="project-preview-tag">
        {label} {String(index + 1).padStart(2, "0")}
      </div>
    </div>
  );
}

export default function Projects({ content }) {
  return (
    <section id="projects" data-parallax>
      <div className="parallax-layer" aria-hidden="true" />
      <div className="container">
        <div className="section-header" data-reveal>
          <h2>{content.title}</h2>
          <p>{content.description}</p>
        </div>
        <div className="projects-grid">
          {content.items.map((project, index) => (
            <article
              className="project-card section-card"
              key={project.title}
              data-reveal
              style={{ "--reveal-index": index }}
            >
              <span className="card-index">{String(index + 1).padStart(2, "0")}</span>
              <ProjectPreview project={project} index={index} label={content.previewLabel} />
              <div className="project-head">
                <h3>{project.title}</h3>
                <a className="project-link" href={project.link} target="_blank" rel="noopener">
                  {content.linkLabel}
                </a>
              </div>
              <p className="project-desc">{project.description}</p>
              <ul className="project-list">
                {project.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
              <div className="tech-stack">
                {project.stack.map((icon) => (
                  <span key={icon} className={`icon icon--${icon}`} title={icon} />
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
