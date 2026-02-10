import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls, Sparkles } from "@react-three/drei";
import * as THREE from "three";

const skills = [
  "Flutter",
  "Dart",
  "Arduino (C/C++)",
  "HC-05 Bluetooth",
  "Firebase Auth",
  "Firestore",
  "Google Sign-In",
  "Git"
];

const projects = [
  {
    title: "Smart Light Control",
    link: "https://github.com/adilkananarbekov/learn_kyrgyz",
    description:
      "Flutter mobile app controlling lighting through Arduino with HC-05 Bluetooth. Includes a simple user registration and permission flow.",
    bullets: [
      "Stable Bluetooth pairing and command transfer.",
      "Light toggling with safety checks.",
      "Team discipline with Git-based workflow."
    ],
    stack: ["flutter", "arduino", "bluetooth", "git"]
  },
  {
    title: "Kyrgyz-English Learning App",
    link: "https://github.com/adilkananarbekov/learn_kyrgyz",
    description:
      "Duolingo-inspired app for Kyrgyz-English study with authentication, word storage, and lesson scaffolding.",
    bullets: [
      "Firebase Auth and Google Sign-In flow.",
      "Firestore-backed word storage and sync.",
      "Lesson and exercise structure in progress."
    ],
    stack: ["flutter", "firebase", "google", "git"]
  }
];

const highlights = [
  {
    title: "Mobile Systems",
    description:
      "Flutter-first builds focused on clean architecture, consistent UI flow, and fast iteration.",
    tags: ["Flutter", "Dart", "UI Flow"]
  },
  {
    title: "Embedded Links",
    description:
      "Hardware control with reliable Bluetooth communication and safety-minded signal checks.",
    tags: ["Arduino", "Bluetooth", "C/C++"]
  },
  {
    title: "Team Delivery",
    description:
      "Structured collaboration with Git workflows, clear handoffs, and milestone focus.",
    tags: ["Git", "Reviews", "Docs"]
  }
];

const stats = [
  {
    label: "Study",
    value: "3rd-year college student"
  },
  {
    label: "Hackathons",
    value: "2 participations"
  },
  {
    label: "Flutter Intensive",
    value: "6-month program"
  }
];

const consoleLines = [
  {
    label: "boot",
    text: "Secure session established."
  },
  {
    label: "stack",
    text: "Flutter / Embedded / Firebase"
  },
  {
    label: "focus",
    text: "Reliable UX, clean architecture, device control."
  },
  {
    label: "signal",
    text: "Open to internships and collaboration."
  }
];

const contacts = [
  {
    label: "Phone",
    value: "+996 551 255 272",
    href: "tel:+996551255272",
    icon: "phone",
    extra: {
      label: "WhatsApp",
      value: "WhatsApp",
      href: "https://wa.me/996551255272"
    }
  },
  {
    label: "Email",
    value: "adilkananarbekov751@gmail.com",
    href: "mailto:adilkananarbekov751@gmail.com",
    icon: "email"
  },
  {
    label: "LinkedIn",
    value: "LinkedIn",
    href: "https://www.linkedin.com/in/%D0%B0%D0%B4%D0%B8%D0%BB%D0%BA%D0%B0%D0%BD-%D0%B0%D0%BD%D0%B0%D1%80%D0%B1%D0%B5%D0%BA%D0%BE%D0%B2-5b157b303/",
    icon: "linkedin"
  },
  {
    label: "GitHub",
    value: "GitHub",
    href: "https://github.com/adilkananarbekov",
    icon: "github"
  },
  {
    label: "Telegram",
    value: "Telegram @Adilkan_07",
    href: "https://t.me/Adilkan_07",
    icon: "telegram"
  }
];

function SignalTorus() {
  const ref = useRef(null);
  const geometry = useMemo(() => new THREE.SphereGeometry(0.8, 48, 48), []);
  const wireframe = useMemo(() => new THREE.WireframeGeometry(geometry), [geometry]);
  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.x += delta * 0.25;
    ref.current.rotation.y += delta * 0.35;
  });
  return (
    <Float speed={1.6} rotationIntensity={1.2} floatIntensity={1.8}>
      <group ref={ref} position={[0, 0.2, 0]}>
        <mesh geometry={geometry}>
          <meshStandardMaterial
            color="#0a0d12"
            emissive="#1f3c2f"
            emissiveIntensity={0.12}
            roughness={0.48}
            metalness={0.25}
          />
        </mesh>
        <lineSegments geometry={wireframe}>
          <lineBasicMaterial color="#f5f7ff" transparent opacity={0.3} />
        </lineSegments>
      </group>
    </Float>
  );
}

function DataOrb({ position, size }) {
  const ref = useRef(null);
  const geometry = useMemo(() => new THREE.SphereGeometry(size, 18, 18), [size]);
  const wireframe = useMemo(() => new THREE.WireframeGeometry(geometry), [geometry]);
  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.4;
  });
  return (
    <Float speed={2.1} rotationIntensity={1.4} floatIntensity={2.2}>
      <group ref={ref} position={position}>
        <mesh geometry={geometry}>
          <meshStandardMaterial
            color="#07090d"
            emissive="#11151a"
            emissiveIntensity={0.1}
            roughness={0.65}
            metalness={0.2}
          />
        </mesh>
        <lineSegments geometry={wireframe}>
          <lineBasicMaterial color="#f5f7ff" transparent opacity={0.75} />
        </lineSegments>
      </group>
    </Float>
  );
}

function Prism({ position }) {
  const ref = useRef(null);
  const geometry = useMemo(() => new THREE.BoxGeometry(0.85, 0.85, 0.85), []);
  const edges = useMemo(() => new THREE.EdgesGeometry(geometry), [geometry]);
  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.x += delta * 0.2;
    ref.current.rotation.z += delta * 0.3;
  });
  return (
    <Float speed={1.4} rotationIntensity={1.1} floatIntensity={1.6}>
      <group ref={ref} position={position}>
        <mesh geometry={geometry}>
          <meshStandardMaterial
            color="#12161c"
            emissive="#141b22"
            emissiveIntensity={0.08}
            roughness={0.6}
            metalness={0.25}
          />
        </mesh>
        <lineSegments geometry={edges}>
          <lineBasicMaterial color="#f5f7ff" transparent opacity={0.8} />
        </lineSegments>
      </group>
    </Float>
  );
}

function PulseRing() {
  const ref = useRef(null);
  useFrame((state) => {
    if (!ref.current) return;
    const scale = 1 + Math.sin(state.clock.elapsedTime * 1.5) * 0.05;
    ref.current.scale.set(scale, scale, scale);
  });
  return (
    <mesh ref={ref} position={[0, -1.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <ringGeometry args={[1.3, 1.7, 64]} />
      <meshBasicMaterial color="#6bf7ff" transparent opacity={0.18} />
    </mesh>
  );
}

function HeroScene() {
  return (
    <Canvas camera={{ position: [0, 0.4, 5.5], fov: 50 }} dpr={[1, 1.6]}>
      <color attach="background" args={["#050608"]} />
      <ambientLight intensity={0.35} />
      <pointLight position={[3, 2, 3]} intensity={0.85} color="#36f5ff" />
      <pointLight position={[-3, -2, 2]} intensity={0.6} color="#7bff9e" />
      <spotLight position={[0, 4, 2]} intensity={0.55} angle={0.4} penumbra={0.4} />
      <Sparkles count={42} speed={0.3} scale={[6, 4, 6]} size={2} color="#36f5ff" />
      <SignalTorus />
      <DataOrb position={[-1.8, 0.6, -0.4]} size={0.35} />
      <DataOrb position={[1.6, -0.3, 0.2]} size={0.3} />
      <Prism position={[0.8, 1.2, -0.6]} />
      <PulseRing />
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.6} />
    </Canvas>
  );
}

export default function App() {
  const [theme, setTheme] = useState("dark");
  const [time, setTime] = useState("");
  const [typed, setTyped] = useState("");
  const audioRef = useRef(null);
  const reduceMotion = useMemo(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    []
  );

  useEffect(() => {
    document.body.dataset.theme = theme;
  }, [theme]);

  useEffect(() => {
    document.body.classList.add("js");
  }, []);

  useEffect(() => {
    const update = () => setTime(new Date().toLocaleString());
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (reduceMotion) {
      setTyped("Secure session established.");
      return;
    }
    const lines = [
      "Access granted. Booting workspace...",
      "Flutter and embedded systems online.",
      "Debugging signal stable."
    ];
    let lineIndex = 0;
    let charIndex = 0;
    let deleting = false;
    let timeoutId;

    const tick = () => {
      const line = lines[lineIndex];
      setTyped(line.slice(0, charIndex));
      if (!deleting && charIndex < line.length) {
        charIndex += 1;
      } else if (deleting && charIndex > 0) {
        charIndex -= 1;
      } else {
        deleting = !deleting;
        if (!deleting) {
          lineIndex = (lineIndex + 1) % lines.length;
        }
      }
      const delay = deleting ? 40 : 90;
      timeoutId = window.setTimeout(tick, deleting ? delay : delay + 40);
    };

    tick();
    return () => window.clearTimeout(timeoutId);
  }, [reduceMotion]);

  useEffect(() => {
    const items = document.querySelectorAll("[data-reveal]");
    if (!("IntersectionObserver" in window)) {
      items.forEach((item) => item.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.2 }
    );
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const initAudio = () => {
      if (!audioRef.current) {
        audioRef.current = new (window.AudioContext || window.webkitAudioContext)();
      }
      if (audioRef.current.state === "suspended") {
        audioRef.current.resume();
      }
    };
    const playBeep = () => {
      if (!audioRef.current || reduceMotion) return;
      const osc = audioRef.current.createOscillator();
      const gain = audioRef.current.createGain();
      osc.type = "sine";
      osc.frequency.value = 740;
      gain.gain.value = 0.04;
      osc.connect(gain);
      gain.connect(audioRef.current.destination);
      osc.start();
      osc.stop(audioRef.current.currentTime + 0.06);
    };

    document.addEventListener("pointerdown", initAudio, { once: true });
    const navLinks = document.querySelectorAll(".nav-links a");
    navLinks.forEach((link) => link.addEventListener("mouseenter", playBeep));
    return () => {
      navLinks.forEach((link) => link.removeEventListener("mouseenter", playBeep));
    };
  }, [reduceMotion]);

  useEffect(() => {
    const header = document.querySelector(".site-header");
    const hero = document.querySelector(".hero");
    if (!header || !hero) return;
    let rafId;

    const update = () => {
      const headerHeight = header.offsetHeight || 1;
      const heroBottom = hero.getBoundingClientRect().bottom;
      const shift = Math.min(0, heroBottom - headerHeight);
      const opacity = Math.max(0, Math.min(1, heroBottom / headerHeight));
      const blur = (1 - opacity) * 6;

      document.body.style.setProperty("--nav-shift", `${shift.toFixed(2)}px`);
      document.body.style.setProperty("--nav-opacity", `${opacity.toFixed(2)}`);
      document.body.style.setProperty("--nav-blur", `${blur.toFixed(2)}px`);
      document.body.classList.toggle("nav-hidden", heroBottom <= 0);
      rafId = undefined;
    };

    const schedule = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(update);
    };

    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      document.body.classList.remove("nav-hidden");
      document.body.style.removeProperty("--nav-shift");
      document.body.style.removeProperty("--nav-opacity");
      document.body.style.removeProperty("--nav-blur");
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, []);

  useEffect(() => {
    if (reduceMotion) return;
    const sections = Array.from(document.querySelectorAll("[data-parallax]"));
    if (!sections.length) return;

    const active = new Set();
    let rafId;

    const update = () => {
      if (!active.size) {
        rafId = undefined;
        return;
      }
      const vh = window.innerHeight || 1;
      active.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const progress = (rect.top + rect.height * 0.5 - vh * 0.5) / vh;
        const offset = Math.max(-1, Math.min(1, progress)) * 24;
        section.style.setProperty("--parallax-offset", `${offset.toFixed(2)}px`);
      });
      rafId = requestAnimationFrame(update);
    };

    const start = () => {
      if (!rafId) {
        rafId = requestAnimationFrame(update);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            active.add(entry.target);
            start();
          } else {
            active.delete(entry.target);
            entry.target.style.setProperty("--parallax-offset", "0px");
          }
        });
      },
      { threshold: 0.2 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => {
      observer.disconnect();
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [reduceMotion]);

  return (
    <div className="app">
      <header className="site-header">
        <div className="status-bar container">
          <div className="status-left">
            <span className="status-pill">SYS READY</span>
            <span className="status-pill">BISHKEK/KG</span>
          </div>
          <div className="status-right">
            <span className="status-time">{time || "--"}</span>
            <button
              className="theme-toggle"
              type="button"
              onClick={() => setTheme(theme === "dark" ? "neon" : "dark")}
            >
              {theme === "dark" ? "NEON SHIFT" : "DARK SHIFT"}
            </button>
          </div>
        </div>
        <div className="nav-bar container">
          <div className="logo">AdilKan</div>
          <nav className="nav-links" aria-label="Primary">
            <a href="#about">About</a>
            <a href="#skills">Skills</a>
            <a href="#projects">Projects</a>
            <a href="#ops">Ops</a>
            <a href="#contact">Contact</a>
          </nav>
        </div>
      </header>

      <main>
        <section className="hero" id="top">
          <div className="hero-canvas" aria-hidden="true">
            <HeroScene />
          </div>
          <div className="matrix-layer" aria-hidden="true" />
          <img className="glitch-lines" src="/assets/glitch-lines.svg" alt="" />
          <div className="container hero-grid">
            <div className="hero-copy">
              <span className="hero-chip">Secure channel online</span>
              <h1 className="hero-title glitch" data-text="ANARBEKOV ADILKAN">
                ANARBEKOV ADILKAN
              </h1>
              <p className="hero-subtitle">
                Programmer focused on Flutter mobile and embedded systems.
              </p>
              <p className="typing">
                <span>{typed}</span>
                <span className="typing-caret">_</span>
              </p>
              <div className="hero-actions">
                <a className="btn btn-primary" href="#about">
                  Enter Profile
                </a>
                <a className="btn btn-ghost" href="#contact">
                  Open Secure Channel
                </a>
              </div>
              <div className="hero-tags">
                <span className="tag">Flutter</span>
                <span className="tag">Embedded</span>
                <span className="tag">Firebase</span>
              </div>
            </div>
            <div className="hero-console" aria-label="System console">
              <div className="console-header">
                <span>ops://terminal</span>
                <span className="console-status">live</span>
              </div>
              <div className="console-body">
                {consoleLines.map((line) => (
                  <div className="console-line" key={line.label}>
                    <span className="console-label">[{line.label}]</span>
                    <span>{line.text}</span>
                  </div>
                ))}
              </div>
              <div className="console-footer">
                <span className="signal-dot" aria-hidden="true" />
                <span className="console-footer-label">Signal stable</span>
                <span className="console-time">{time || "--"}</span>
              </div>
            </div>
          </div>
        </section>

        <section id="about" data-reveal data-parallax>
          <div className="parallax-layer" aria-hidden="true" />
          <div className="container">
            <div className="section-header">
              <h2>About</h2>
              <p>
                Third-year college student in Kyrgyzstan specializing in Flutter mobile
                development with a strong programming foundation, hackathon experience, and
                collaborative team delivery.
              </p>
            </div>
            <div className="grid-2">
              <div className="card">
                <h3>Profile</h3>
                <p>
                  I build mobile and embedded systems that move from prototype to working
                  product. My focus is clean architecture, reliable communication, and tight
                  user experiences.
                </p>
                <ul className="about-list">
                  <li>Strong base in programming and problem solving.</li>
                  <li>Mobile-first mindset with embedded integration.</li>
                  <li>Team collaboration and clear handoffs.</li>
                </ul>
              </div>
              <div className="card">
                <h3>Education</h3>
                <p>
                  College, year three (in progress). Completed a 6-month Flutter intensive at
                  App IT Company.
                </p>
                <ul className="about-list">
                  <li>Participated in two hackathons.</li>
                  <li>Two years of C++ with competitive programming focus.</li>
                  <li>Hands-on experience in team-based development.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

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
                    <a className="project-link" href={project.link} target="_blank" rel="noopener noreferrer">
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

        <div className="holiday-divider" aria-hidden="true">
          <svg
            className="holiday-signal"
            viewBox="0 0 720 120"
            xmlns="http://www.w3.org/2000/svg"
            focusable="false"
          >
            <path
              className="holiday-path"
              d="M20 60 L120 60 L150 40 L190 80 L230 60 L320 60 L350 45 L390 75 L430 60 L520 60 L560 38 L600 82 L660 60 L700 60"
            />
            <path
              className="holiday-path holiday-path--pulse"
              d="M20 60 L120 60 L150 40 L190 80 L230 60 L320 60 L350 45 L390 75 L430 60 L520 60 L560 38 L600 82 L660 60 L700 60"
            />
            <g className="holiday-flake holiday-flake--left" transform="translate(180 32)">
              <line x1="-8" y1="0" x2="8" y2="0" />
              <line x1="0" y1="-8" x2="0" y2="8" />
              <line x1="-6" y1="-6" x2="6" y2="6" />
              <line x1="-6" y1="6" x2="6" y2="-6" />
            </g>
            <g className="holiday-flake holiday-flake--right" transform="translate(560 88)">
              <line x1="-8" y1="0" x2="8" y2="0" />
              <line x1="0" y1="-8" x2="0" y2="8" />
              <line x1="-6" y1="-6" x2="6" y2="6" />
              <line x1="-6" y1="6" x2="6" y2="-6" />
            </g>
          </svg>
        </div>

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
                    rel="noopener noreferrer"
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
                          rel="noopener noreferrer"
                        >
                          {contact.value}
                        </a>
                        {contact.extra ? (
                          <a
                            className="contact-sub"
                            href={contact.extra.href}
                            target="_blank"
                            rel="noopener noreferrer"
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
      </main>

      <footer>2025 Anarbekov AdilKan. Built with focus and curiosity.</footer>
    </div>
  );
}
