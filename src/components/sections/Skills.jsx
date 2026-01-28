import { skills } from "../../data/portfolioData";

export default function Skills() {
    return (
        <section id="skills" data-reveal data-parallax>
            <div className="parallax-layer" aria-hidden="true" />
            <div className="container">
                <div className="section-header">
                    <h2>Skills</h2>
                    <p>
                        Modern mobile and embedded toolkit tuned for rapid iteration, reliable
                        connectivity, and cloud-backed apps.
                    </p>
                </div>
                <div className="skills-grid">
                    {skills.map((skill) => (
                        <span key={skill} className="skill-pill">
                            {skill}
                        </span>
                    ))}
                </div>
            </div>
        </section>
    );
}
