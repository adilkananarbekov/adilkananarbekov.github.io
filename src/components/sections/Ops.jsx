export default function Ops({ content }) {
  return (
    <section id="ops" data-parallax>
      <div className="parallax-layer" aria-hidden="true" />
      <div className="container">
        <div className="section-header" data-reveal>
          <h2>{content.title}</h2>
          <p>{content.description}</p>
        </div>
        <div className="ops-grid">
          {content.items.map((item, index) => (
            <article
              className="ops-card section-card"
              key={item.title}
              data-reveal
              style={{ "--reveal-index": index }}
            >
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
          {content.stats.map((stat, index) => (
            <div
              className="stat-card"
              key={stat.label}
              data-reveal
              style={{ "--reveal-index": index + content.items.length }}
            >
              <span className="stat-label">{stat.label}</span>
              <span className="stat-value">{stat.value}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
