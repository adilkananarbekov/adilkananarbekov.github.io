function MotionVisual({ item }) {
  if (item.variant === "orbit") {
    return (
      <div className="motion-visual motion-visual--orbit" aria-hidden="true">
        <div className="motion-orbit">
          <span className="motion-orbit-core">{item.title}</span>
          {item.accents.map((accent, index) => (
            <span
              key={accent}
              className="motion-orbit-chip"
              style={{
                "--orbit-angle": `${index * (360 / item.accents.length)}deg`,
                "--orbit-angle-negative": `${index * (-360 / item.accents.length)}deg`,
                "--orbit-order": index
              }}
            >
              {accent}
            </span>
          ))}
        </div>
      </div>
    );
  }

  if (item.variant === "stack") {
    return (
      <div className="motion-visual motion-visual--stack" aria-hidden="true">
        <div className="motion-stack">
          {item.accents.map((accent, index) => (
            <span
              key={accent}
              className="motion-stack-layer"
              style={{ "--stack-index": index }}
            >
              {accent}
            </span>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="motion-visual motion-visual--flow" aria-hidden="true">
      <div className="motion-beam" />
      {item.accents.map((accent, index) => (
        <span key={accent} className="motion-flow-chip" style={{ "--chip-index": index }}>
          {accent}
        </span>
      ))}
    </div>
  );
}

export default function MotionShowcase({ content }) {
  return (
    <section id="motion" className="motion-section" data-parallax>
      <div className="parallax-layer" aria-hidden="true" />
      <div className="container">
        <div className="section-header motion-intro" data-reveal>
          <span className="pill motion-pill">{content.eyebrow}</span>
          <h2>{content.title}</h2>
          <p>{content.description}</p>
        </div>

        <div className="motion-ticker" data-reveal style={{ "--reveal-index": 1 }}>
          <div className="motion-track" aria-hidden="true">
            {[0, 1].flatMap((loopIndex) =>
              content.ticker.map((item) => (
                <span className="motion-token" key={`${loopIndex}-${item}`}>
                  {item}
                </span>
              ))
            )}
          </div>
        </div>

        <div className="motion-showcase-grid">
          {content.items.map((item, index) => (
            <article
              key={item.title}
              className={`motion-card motion-card--${item.variant} section-card`}
              data-reveal
              style={{ "--reveal-index": index + 2 }}
            >
              <div className="motion-card-top">
                <span className="motion-label">{item.label}</span>
              </div>
              <MotionVisual item={item} />
              <div className="motion-card-copy">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <ul className="about-list">
                  {item.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
