import { contacts } from "../../data/portfolioData";

export default function Contact() {
    return (
        <section id="contact" data-reveal data-parallax className="contact-section">
            <div className="parallax-layer" aria-hidden="true" />
            <div className="container">
                <div className="section-header">
                    <h2>Contact</h2>
                    <p>Open a channel for collaboration, internships, or mobile and embedded work.</p>
                </div>
                <div className="contact-grid">
                    <div className="contact-panel">
                        <h3>Let's build something dependable</h3>
                        <p>
                            Available for internships and collaborative projects across mobile UX, embedded
                            control systems, and cloud-backed features.
                        </p>
                        <div className="contact-cta">
                            <a className="btn btn-primary" href="mailto:adilkananarbekov751@gmail.com">
                                Email me
                            </a>
                            <a
                                className="btn btn-ghost"
                                href="https://t.me/Adilkan_07"
                                target="_blank"
                                rel="noopener"
                            >
                                Telegram
                            </a>
                        </div>
                        <div className="contact-badges">
                            <span>Fast reply</span>
                            <span>Remote-friendly</span>
                            <span>Bishkek, KG</span>
                        </div>
                    </div>
                    <div className="contact-list-panel">
                        <div className="contact-list-header">
                            <span>Direct channels</span>
                            <span className="contact-list-status">verified</span>
                        </div>
                        <ul className="contact-list">
                            {contacts.map((contact) => (
                                <li key={contact.label} className="contact-item">
                                    <span className={`icon icon--${contact.icon}`} aria-hidden="true" />
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
