import AnimatedIcon from "../ui/AnimatedIcon";

function ContactLeadingIcon({ contact }) {
  if (contact.motionIcon) {
    return (
      <span className={`contact-icon-shell contact-icon-shell--${contact.icon}`} aria-hidden="true">
        <AnimatedIcon className="contact-motion-icon" name={contact.motionIcon} />
      </span>
    );
  }

  return (
    <span className={`contact-icon-shell contact-icon-shell--${contact.icon}`} aria-hidden="true">
      <span className={`icon icon--${contact.icon}`} />
    </span>
  );
}

export default function Contact({ content }) {
  return (
    <section id="contact" data-parallax className="contact-section">
      <div className="parallax-layer" aria-hidden="true" />
      <div className="container">
        <div className="section-header" data-reveal>
          <h2>{content.title}</h2>
          <p>{content.description}</p>
        </div>
        <div className="contact-grid">
          <div className="contact-panel section-card" data-reveal style={{ "--reveal-index": 0 }}>
            <h3>{content.panelTitle}</h3>
            <p>{content.panelText}</p>
            <div className="contact-cta">
              <a className="btn btn-primary" href="mailto:adilkananarbekov751@gmail.com">
                {content.emailCta}
              </a>
              <a
                className="btn btn-ghost"
                href="https://wa.me/9965599987999"
                target="_blank"
                rel="noopener"
              >
                {content.whatsappCta}
              </a>
            </div>
            <div className="contact-badges">
              {content.badges.map((badge) => (
                <span key={badge}>{badge}</span>
              ))}
            </div>
          </div>
          <div className="contact-list-panel section-card" data-reveal style={{ "--reveal-index": 1 }}>
            <div className="contact-list-header">
              <span>{content.listTitle}</span>
              <span className="contact-list-status">{content.listStatus}</span>
            </div>
            <ul className="contact-list">
              {content.items.map((contact) => (
                <li key={contact.label} className="contact-item">
                  <ContactLeadingIcon contact={contact} />
                  <div className="contact-meta">
                    <span className="contact-label">{contact.label}</span>
                    <a
                      className="contact-value"
                      href={contact.href}
                      target={contact.href.startsWith("http") ? "_blank" : undefined}
                      rel="noopener"
                    >
                      {contact.value}
                    </a>
                    {contact.extra ? (
                      <a
                        className="contact-sub"
                        href={contact.extra.href}
                        target="_blank"
                        rel="noopener"
                      >
                        {contact.extra.value}
                      </a>
                    ) : null}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
