import { useEffect, useMemo, useRef, useState } from "react";
import HeroScene from "./components/3d/HeroScene";
import About from "./components/sections/About";
import Skills from "./components/sections/Skills";
import Projects from "./components/sections/Projects";
import Ops from "./components/sections/Ops";
import Contact from "./components/sections/Contact";
import { consoleLines } from "./data/portfolioData";

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

        <About />

        <Skills />

        <Projects />

        <Ops />

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

        <Contact />
      </main>

      <footer>2025 Anarbekov AdilKan. Built with focus and curiosity.</footer>
    </div>
  );
}
