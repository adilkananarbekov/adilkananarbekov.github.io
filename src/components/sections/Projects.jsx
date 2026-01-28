import { projects } from "../../data/portfolioData";

export default function Projects() {
    return (
        <section id="projects" data-reveal data-parallax>
            <div className="parallax-layer" aria-hidden="true" />
            <div className="container">
                <div className="section-header">
                    <h2>Projects</h2>
                    <p>
                        Two core builds that blend hardware control, mobile UX, and cloud services for
                        real-world learning and automation.
                    </p>
                </div>
                <div className="projects-grid">
                    {projects.map((project) => (
                        <article className="project-card" key={project.title}>
                            <div className="project-head">
                                <h3>{project.title}</h3>
                                <a className="project-link" href={project.link} target="_blank" rel="noopener">
                                    GitHub
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
