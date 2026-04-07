import { useMemo, useState } from "react";
import AnimatedText from "../ui/AnimatedText";

const railItems = [
  { icon: "flutter", label: "Flutter" },
  { icon: "firebase", label: "Firebase" },
  { icon: "github", label: "GitHub" },
  { icon: "telegram", label: "Telegram" },
  { icon: "arduino", label: "Arduino" },
  { icon: "bluetooth", label: "Bluetooth" },
  { icon: "dart", label: "Dart" },
  { icon: "google", label: "Google" }
];

function RailRow({ reverse = false }) {
  const items = useMemo(
    () =>
      [0, 1].flatMap((loopIndex) =>
        railItems.map((item) => ({
          ...item,
          key: `${loopIndex}-${item.label}`
        }))
      ),
    []
  );

  return (
    <div className={`experience-rail ${reverse ? "is-reverse" : ""}`} aria-hidden="true">
      <div className="experience-track">
        {items.map((item) => (
          <span className="experience-rail-item" key={item.key}>
            <span className={`icon icon--${item.icon}`} aria-hidden="true" />
            <span>{item.label}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function DashboardRing({ progress, label }) {
  const radius = 44;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="experience-ring">
      <svg viewBox="0 0 120 120" className="experience-ring-svg" aria-hidden="true">
        <circle cx="60" cy="60" r={radius} className="experience-ring-base" />
        <circle
          cx="60"
          cy="60"
          r={radius}
          className="experience-ring-progress"
          style={{
            strokeDasharray: circumference,
            strokeDashoffset: offset
          }}
        />
      </svg>
      <div className="experience-ring-copy">
        <span className="experience-ring-value">{progress}%</span>
        <span className="experience-ring-label">{label}</span>
      </div>
    </div>
  );
}

export default function ExperienceLab({ content }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPressed, setIsPressed] = useState(false);

  const activeMode = content.modes[activeIndex];

  return (
    <section id="experience" className="experience-section" data-parallax>
      <div className="parallax-layer" aria-hidden="true" />
      <div className="container">
        <div className="section-header experience-intro" data-reveal>
          <span className="pill experience-pill">{content.eyebrow}</span>
          <h2>{content.title}</h2>
          <p>{content.description}</p>
        </div>

        <div className="experience-rails" data-reveal style={{ "--reveal-index": 1 }}>
          <RailRow />
          <RailRow reverse />
        </div>

        <div className="experience-grid">
          <article
            className="experience-dashboard section-card"
            data-reveal
            style={{ "--reveal-index": 2 }}
          >
            <div className="experience-dashboard-visual">
              <DashboardRing progress={activeMode.progress} label={content.ringLabel} />
            </div>
            <div className="experience-dashboard-copy">
              <AnimatedText
                key={`${activeMode.label}-${activeMode.title}`}
                as="h3"
                className="experience-title"
                text={activeMode.title}
              />
              <p>{activeMode.description}</p>
              <div className="experience-bars">
                {activeMode.bars.map((bar) => (
                  <div className="experience-bar" key={bar.label}>
                    <div className="experience-bar-head">
                      <span>{bar.label}</span>
                      <span>{bar.value}%</span>
                    </div>
                    <div className="experience-bar-track">
                      <span className="experience-bar-fill" style={{ width: `${bar.value}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </article>

          <article
            className="experience-orbit-card section-card"
            data-reveal
            style={{ "--reveal-index": 3 }}
          >
            <div className="experience-orbit-shell">
              <div className="experience-orbit-core">{content.orbitTitle}</div>
              {content.orbitTags.map((tag, index) => (
                <span
                  key={tag}
                  className="experience-orbit-tag"
                  style={{
                    "--orbit-angle": `${index * (360 / content.orbitTags.length)}deg`,
                    "--orbit-angle-negative": `${index * (-360 / content.orbitTags.length)}deg`
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </article>

          <article
            className="experience-interaction-card section-card"
            data-reveal
            style={{ "--reveal-index": 4 }}
          >
            <div className="experience-mode-switch" role="tablist" aria-label={content.title}>
              {content.modes.map((mode, index) => (
                <button
                  key={mode.label}
                  className={`experience-mode-button ${activeIndex === index ? "is-active" : ""}`}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  aria-pressed={activeIndex === index}
                >
                  {mode.label}
                </button>
              ))}
            </div>

            <div className="experience-interaction-copy">
              <span className={`experience-live ${isPressed ? "is-active" : ""}`}>
                {isPressed ? content.pressResult : activeMode.label}
              </span>
              <div className="experience-badges">
                {activeMode.badges.map((badge) => (
                  <span key={badge}>{badge}</span>
                ))}
              </div>
            </div>

            <button
              className={`experience-press-pad ${isPressed ? "is-pressed" : ""}`}
              type="button"
              onClick={() => setIsPressed((current) => !current)}
            >
              <span className="experience-press-grid" aria-hidden="true" />
              <span className="experience-press-copy">{content.pressCta}</span>
            </button>
          </article>
        </div>
      </div>
    </section>
  );
}
