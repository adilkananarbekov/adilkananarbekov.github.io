import { highlights, stats } from "../../data/portfolioData";

export default function Ops() {
    return (
        <section id="ops" data-reveal data-parallax>
            <div className="parallax-layer" aria-hidden="true" />
            <div className="container">
                <div className="section-header">
                    <h2>Ops</h2>
                    <p>
                        A focused workflow for shipping mobile interfaces, hardware controls, and
                        dependable user experiences.
                    </p>
                </div>
                <div className="ops-grid">
                    {highlights.map((item) => (
                        <article className="ops-card" key={item.title}>
                            <h3>{item.title}</h3>
                            <p>{item.description}</p>
                            <div className="ops-tags">
                                {item.tags.map((tag) => (
                                    <span key={tag}>{tag}</span>
                                ))}
                            </div>
                        </article>
                    ))}
                </div>
                <div className="stats-grid">
                    {stats.map((stat) => (
                        <div className="stat-card" key={stat.label}>
                            <span className="stat-label">{stat.label}</span>
                            <span className="stat-value">{stat.value}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
