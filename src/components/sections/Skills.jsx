import AnimatedIcon from "../ui/AnimatedIcon";

export default function Skills({ content }) {
  return (
    <section id="services" data-parallax>
      <div className="parallax-layer" aria-hidden="true" />
      <div className="container">
        <div className="section-header" data-reveal>
          <h2>{content.title}</h2>
          <p>{content.description}</p>
        </div>
        <div className="services-grid">
          {content.items.map((service, index) => (
            <article
              key={service.title}
              className="service-card section-card"
              data-reveal
              style={{ "--reveal-index": index }}
            >
              <div className="service-card__top">
                <span className={`service-card__icon-shell service-card__icon-shell--${service.icon}`}>
                  <AnimatedIcon className="service-card__icon" name={service.icon} />
                </span>
                <span className="card-index">{String(index + 1).padStart(2, "0")}</span>
              </div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <ul className="about-list">
                {service.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
