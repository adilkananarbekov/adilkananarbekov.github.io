export default function About({ content }) {
  return (
    <section id="about" data-parallax>
      <div className="parallax-layer" aria-hidden="true" />
      <div className="container">
        <div className="section-header" data-reveal>
          <h2>{content.title}</h2>
          <p>{content.description}</p>
        </div>
        <div className="grid-2">
          {content.cards.map((card, index) => (
            <div
              key={card.title}
              className="card section-card"
              data-reveal
              style={{ "--reveal-index": index }}
            >
              <h3>{card.title}</h3>
              <p>{card.text}</p>
              <ul className="about-list">
                {card.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
