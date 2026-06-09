import { startTransition, useEffect, useMemo, useRef, useState } from "react";
import portrait from "./assets/portrait-optimized.jpg";
import { portfolioContent } from "./data/portfolioData";
import { trackGenerateLead } from "./analytics.js";
import { ScrollStoryRail } from "./components/ui/ScrollStoryRail.jsx";
import StoryScrollStage from "./components/3d/StoryScrollStage.jsx";

const languageOptions = [
  { key: "ru", label: "RU" },
  { key: "en", label: "EN" }
];

const supportedLanguages = new Set(languageOptions.map((option) => option.key));

const stackIconMap = {
  flutter: "/assets/icons/flutter.svg",
  firebase: "/assets/icons/firebase.svg",
  google: "/assets/icons/google.svg",
  git: "/assets/icons/git.svg",
  github: "/assets/icons/github.svg",
  arduino: "/assets/icons/arduino.svg",
  bluetooth: "/assets/icons/bluetooth.svg",
  dart: "/assets/icons/dart.svg",
  linkedin: "/assets/icons/linkedin.svg",
  phone: "/assets/icons/phone.svg",
  email: "/assets/icons/email.svg",
  whatsapp: "/assets/icons/whatsapp.svg",
  telegram: "/assets/icons/telegram.svg"
};

const signalBadgeMap = {
  cellphone: "APP",
  compass: "FLOW",
  chat: "CHAT",
  document: "PITCH",
  phone: "CALL",
  email: "MAIL",
  github: "CODE",
  telegram: "TG"
};

function normalizeLanguage(value) {
  if (value === "kg" || value === "ky") return "ru";
  return value;
}

function getInitialLanguage() {
  if (typeof window === "undefined") return "ru";

  const savedLanguage = normalizeLanguage(window.localStorage.getItem("portfolio-language"));
  if (savedLanguage && supportedLanguages.has(savedLanguage)) {
    return savedLanguage;
  }

  const browserLanguage = window.navigator.language.toLowerCase();
  if (browserLanguage.startsWith("en")) return "en";
  return "ru";
}

function getInitialReduceMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getInitialTouchState() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(hover: none), (pointer: coarse)").matches;
}

const portraitHintMap = {
  ru: {
    desktop: "Наведите на портрет, чтобы открыть alternate look",
    touch: "Нажмите на портрет, чтобы открыть alternate look"
  },
  en: {
    desktop: "Hover portrait to reveal alternate look",
    touch: "Tap portrait to reveal alternate look"
  }
};

const supplementalCopy = {
  ru: {
    introGate: {
      eyebrow: "Creative developer · Portfolio story",
      enter: "Войти",
      hint: "Клик или пробел · Esc — пропуск"
    },
    storyRail: { top: "Старт", navLabel: "Навигация по секциям" },
    quick: {
      eyebrow: "Quick Scan",
      title: "Быстрый скан вместо длинного текста.",
      description: "Что делаю, как работаю и где написать.",
      metrics: {
        services: "Формата работы",
        servicesText: "Разработка, редизайн и презентационная digital-подача.",
        projects: "Выделенных кейса",
        projectsText: "Язык, туризм, travel и personal brand.",
        contacts: "Прямых канала",
        contactsText: "Telegram, GitHub и LinkedIn без лишнего шума.",
        languages: "Языки сайта",
        languagesText: "RU/EN без лишнего переключателя."
      }
    },
    signal: {
      eyebrow: "Client Signal",
      title: "Клиент должен понять формат до первого сообщения.",
      description: "Короткие сигналы: формат, подача, процесс, результат.",
      boardTitle: "Что считывается сразу",
      boardRows: [
        { label: "Формат", value: "Мобильный продукт, редизайн или presentation site." },
        { label: "Подача", value: "Motion и depth усиливают доверие, а не отвлекают." },
        { label: "Процесс", value: "Поэтапно, с понятными апдейтами." },
        { label: "Результат", value: "Не просто экран, а готовое предложение." }
      ],
      deliverTitle: "Что получает клиент",
      deliverText:
        "Каждое направление превращается в конкретный deliverable.",
      memoryTitle: "Почему это запоминается",
      memoryPoints: [
        "Motion-блоки работают как презентация.",
        "Информация подается короткими signal-cards.",
        "Desktop и touch-сценарии ощущаются цельно."
      ]
    }
  },
  en: {
    introGate: {
      eyebrow: "Creative developer · Portfolio story",
      enter: "Enter",
      hint: "Click or Space · Esc to skip"
    },
    storyRail: { top: "Start", navLabel: "Section navigation" },
    quick: {
      eyebrow: "Quick Scan",
      title: "Fast scan instead of long copy.",
      description: "What I build, how I work and where to message.",
      metrics: {
        services: "Work formats",
        servicesText: "Development, redesign, and presentation-first delivery.",
        projects: "Featured cases",
        projectsText: "Language, tourism, travel and personal brand.",
        contacts: "Direct channels",
        contactsText: "Telegram, GitHub and LinkedIn without noise.",
        languages: "Site languages",
        languagesText: "RU/EN without extra switching noise."
      }
    },
    signal: {
      eyebrow: "Client Signal",
      title: "The format should be clear before the first message.",
      description: "Short signals: format, presentation, process and outcome.",
      boardTitle: "What gets understood fast",
      boardRows: [
        { label: "Format", value: "Mobile product, redesign, or presentation website." },
        { label: "Presentation", value: "Motion and depth build trust instead of noise." },
        { label: "Process", value: "Clear steps with readable updates." },
        { label: "Outcome", value: "Clients see a proposal with shape, not just a screen." }
      ],
      deliverTitle: "What the client gets",
      deliverText:
        "Each direction becomes a concrete deliverable.",
      memoryTitle: "Why it feels different",
      memoryPoints: [
        "Motion blocks feel like a presentation.",
        "Useful information is grouped into fast signal blocks instead of a text wall.",
        "Desktop hover and touch interactions feel like part of the product itself."
      ]
    }
  }
};

function SectionHeading({ eyebrow, title, description, align = "left" }) {
  return (
    <div className={`section-heading section-heading-${align}`} data-reveal>
      {eyebrow ? <span className="section-eyebrow">{eyebrow}</span> : null}
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
}

function SignalMark({ icon, fallback }) {
  return (
    <span className="signal-mark" aria-hidden="true">
      {signalBadgeMap[icon] ?? fallback}
    </span>
  );
}

function InlineIcon({ icon, alt }) {
  const source = stackIconMap[icon];

  if (!source) {
    return (
      <span className="inline-icon inline-icon-fallback" aria-hidden="true">
        {(alt ?? icon ?? "").slice(0, 1)}
      </span>
    );
  }

  return <img className="inline-icon" src={source} alt={alt ?? ""} />;
}

function getProjectDomain(link) {
  try {
    return new URL(link).hostname.replace(/^www\./, "");
  } catch {
    return link.replace(/^https?:\/\//, "").split("/")[0] || "project";
  }
}

function IntroSplitName({ text }) {
  const words = text.trim().split(/\s+/).filter(Boolean);

  return (
    <div className="intro-name-stack" aria-label={text}>
      {words.map((word, wordIndex) => (
        <div className="intro-name-line" key={`${word}-${wordIndex}`}>
          {Array.from(word).map((char, charIndex) => (
            <span
              key={`${wordIndex}-${charIndex}-${char}`}
              className="intro-char"
              style={{ animationDelay: `${400 + wordIndex * 520 + charIndex * 85}ms` }}
            >
              {char}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}

export default function App() {
  const [language, setLanguage] = useState(getInitialLanguage);
  const [menuOpen, setMenuOpen] = useState(false);
  const [time, setTime] = useState("");
  const [lineIndex, setLineIndex] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(getInitialReduceMotion);
  const [isTouchDevice, setIsTouchDevice] = useState(getInitialTouchState);
  const [activeSection, setActiveSection] = useState("");
  const [experienceArmed, setExperienceArmed] = useState(false);
  const [portraitRevealActive, setPortraitRevealActive] = useState(false);
  const [heroLandingMode, setHeroLandingMode] = useState(true);
  const heroLandingScrollRef = useRef(true);
  const heroSectionRef = useRef(null);
  const portraitButtonRef = useRef(null);
  const portraitSpotRef = useRef({ x: 50, y: 50 });
  const [introPhase, setIntroPhase] = useState(() =>
    getInitialReduceMotion() ? "done" : "waiting"
  );
  const [introExitAt, setIntroExitAt] = useState({ x: 50, y: 50 });

  const content = portfolioContent[language] ?? portfolioContent.ru;
  const rotatingLine = content.hero.rotatingLines[lineIndex % content.hero.rotatingLines.length];
  const telegramHref =
    content.contact.items.find((item) => item.icon === "telegram")?.href ??
    "https://t.me/Adilkan_07";
  const whatsappHref = content.contact.items.find((item) => item.extra?.href)?.extra?.href;
  const emailHref = content.contact.items.find((item) => item.icon === "email")?.href;
  const extras = supplementalCopy[language] ?? supplementalCopy.en;
  const storyRailSections = useMemo(() => {
    const topLabel = extras.storyRail?.top ?? "Start";
    return [
      { id: "top", label: topLabel },
      ...content.nav.map((item) => ({
        id: item.href.replace("#", ""),
        label: item.label
      }))
    ];
  }, [content.nav, extras.storyRail?.top]);
  const portraitHint = isTouchDevice
    ? portraitHintMap[language]?.touch ?? portraitHintMap.en.touch
    : portraitHintMap[language]?.desktop ?? portraitHintMap.en.desktop;
  const quickMetrics = [
    {
      value: String(content.services.items.length).padStart(2, "0"),
      label: extras.quick.metrics.services,
      text: extras.quick.metrics.servicesText
    },
    {
      value: String(content.projects.items.length).padStart(2, "0"),
      label: extras.quick.metrics.projects,
      text: extras.quick.metrics.projectsText
    },
    {
      value: String(content.contact.items.length).padStart(2, "0"),
      label: extras.quick.metrics.contacts,
      text: extras.quick.metrics.contactsText
    },
    {
      value: "RU/EN",
      label: extras.quick.metrics.languages,
      text: extras.quick.metrics.languagesText
    }
  ];
  const serviceSnapshots = content.services.items.map((item) => ({
    title: item.title,
    text: item.points[0] ?? item.description
  }));
  const projectStory = content.projects.story ?? {};

  useEffect(() => {
    window.localStorage.setItem("portfolio-language", language);
    document.documentElement.lang = language;
    document.title = content.meta.title;

    const description = document.querySelector('meta[name="description"]');
    if (description) {
      description.setAttribute("content", content.meta.description);
    }

    const themeColor = document.querySelector('meta[name="theme-color"]');
    if (themeColor) {
      themeColor.setAttribute("content", "#f4ede4");
    }
  }, [content.meta.description, content.meta.title, language]);

  useEffect(() => {
    const formatter = new Intl.DateTimeFormat(content.locale, {
      dateStyle: "medium",
      timeStyle: "short"
    });

    const syncTime = () => {
      setTime(formatter.format(new Date()));
    };

    syncTime();
    const intervalId = window.setInterval(syncTime, 60000);
    return () => window.clearInterval(intervalId);
  }, [content.locale]);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncMotion = (event) => setReduceMotion(event.matches);

    if (motionQuery.addEventListener) {
      motionQuery.addEventListener("change", syncMotion);
    } else {
      motionQuery.addListener(syncMotion);
    }

    return () => {
      if (motionQuery.addEventListener) {
        motionQuery.removeEventListener("change", syncMotion);
      } else {
        motionQuery.removeListener(syncMotion);
      }
    };
  }, []);

  useEffect(() => {
    const touchQuery = window.matchMedia("(hover: none), (pointer: coarse)");
    const syncTouch = (event) => {
      setIsTouchDevice(event.matches);
      setPortraitRevealActive(false);
      portraitSpotRef.current = { x: 50, y: 50 };
      const btn = portraitButtonRef.current;
      if (btn) {
        btn.style.setProperty("--mask-x", "50%");
        btn.style.setProperty("--mask-y", "50%");
      }
    };

    if (touchQuery.addEventListener) {
      touchQuery.addEventListener("change", syncTouch);
    } else {
      touchQuery.addListener(syncTouch);
    }

    return () => {
      if (touchQuery.addEventListener) {
        touchQuery.removeEventListener("change", syncTouch);
      } else {
        touchQuery.removeListener(syncTouch);
      }
    };
  }, []);

  useEffect(() => {
    if (reduceMotion || content.hero.rotatingLines.length <= 1) return undefined;

    const intervalId = window.setInterval(() => {
      setLineIndex((current) => (current + 1) % content.hero.rotatingLines.length);
    }, 3200);

    return () => window.clearInterval(intervalId);
  }, [content.hero.rotatingLines.length, reduceMotion]);

  useEffect(() => {
    document.body.classList.toggle("menu-open", menuOpen);
    return () => document.body.classList.remove("menu-open");
  }, [menuOpen]);

  useEffect(() => {
    document.body.classList.toggle("intro-active", introPhase !== "done");
    return () => document.body.classList.remove("intro-active");
  }, [introPhase]);

  useEffect(() => {
    if (!menuOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen]);

  useEffect(() => {
    const items = document.querySelectorAll("[data-reveal]");

    if (reduceMotion || !("IntersectionObserver" in window)) {
      items.forEach((item) => item.classList.add("is-visible"));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0,
        rootMargin: "22% 0px 38% 0px"
      }
    );

    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, [language, reduceMotion]);

  useEffect(() => {
    const sections = document.querySelectorAll("main section[id]");

    if (!("IntersectionObserver" in window)) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visibleEntry?.target?.id) {
          setActiveSection(visibleEntry.target.id);
        }
      },
      { threshold: [0.25, 0.5, 0.75], rootMargin: "-20% 0px -45% 0px" }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [language]);

  useEffect(() => {
    const root = document.documentElement;
    let smoothRaf = 0;
    let targetProgress = 0;
    let shownProgress = 0;

    const readTargetProgress = () => {
      const scrollHeight = root.scrollHeight - window.innerHeight;
      return scrollHeight > 0 ? window.scrollY / scrollHeight : 0;
    };

    const applyProgress = (value) => {
      root.style.setProperty("--scroll-progress", value.toFixed(4));
    };

    const snapToScroll = () => {
      targetProgress = readTargetProgress();
      shownProgress = targetProgress;
      applyProgress(shownProgress);
    };

    const smoothFrame = () => {
      const delta = targetProgress - shownProgress;
      if (Math.abs(delta) < 0.0006) {
        shownProgress = targetProgress;
        applyProgress(shownProgress);
        smoothRaf = 0;
        return;
      }
      const step = Math.sign(delta) * Math.min(Math.abs(delta), Math.max(Math.abs(delta) * 0.34, 0.004));
      shownProgress += step;
      applyProgress(shownProgress);
      smoothRaf = window.requestAnimationFrame(smoothFrame);
    };

    const onScrollOrResize = () => {
      targetProgress = readTargetProgress();
      if (reduceMotion) {
        if (smoothRaf) {
          window.cancelAnimationFrame(smoothRaf);
          smoothRaf = 0;
        }
        shownProgress = targetProgress;
        applyProgress(shownProgress);
        return;
      }
      if (!smoothRaf) {
        smoothRaf = window.requestAnimationFrame(smoothFrame);
      }
    };

    const onResize = () => {
      if (smoothRaf) {
        window.cancelAnimationFrame(smoothRaf);
        smoothRaf = 0;
      }
      snapToScroll();
    };

    snapToScroll();
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onResize);
      if (smoothRaf) {
        window.cancelAnimationFrame(smoothRaf);
      }
      root.style.removeProperty("--scroll-progress");
    };
  }, [reduceMotion]);

  useEffect(() => {
    const syncHeroMode = () => {
      const hero = heroSectionRef.current;
      const viewport = window.innerHeight || 800;
      const threshold = viewport * 0.42;
      const scrollY = window.scrollY;
      const next = scrollY < threshold;

      if (hero) {
        if (reduceMotion) {
          hero.style.removeProperty("--hero-exit-t");
        } else if (next) {
          const t = threshold > 0 ? Math.min(1, scrollY / threshold) : 0;
          hero.style.setProperty("--hero-exit-t", t.toFixed(4));
        } else {
          hero.style.removeProperty("--hero-exit-t");
        }
      }

      if (next !== heroLandingScrollRef.current) {
        heroLandingScrollRef.current = next;
        setHeroLandingMode(next);
      }
    };

    syncHeroMode();
    window.addEventListener("scroll", syncHeroMode, { passive: true });
    window.addEventListener("resize", syncHeroMode);

    return () => {
      window.removeEventListener("scroll", syncHeroMode);
      window.removeEventListener("resize", syncHeroMode);
    };
  }, [reduceMotion]);

  useEffect(() => {
    const cards = document.querySelectorAll(".tilt-card");

    if (reduceMotion || isTouchDevice || !cards.length) {
      cards.forEach((card) => {
        card.style.removeProperty("--tilt-rotate-x");
        card.style.removeProperty("--tilt-rotate-y");
        card.style.removeProperty("--tilt-glow-x");
        card.style.removeProperty("--tilt-glow-y");
      });
      return undefined;
    }

    const handleMove = (event) => {
      const card = event.currentTarget;
      const rect = card.getBoundingClientRect();
      const localX = (event.clientX - rect.left) / rect.width;
      const localY = (event.clientY - rect.top) / rect.height;
      const rotateY = (localX - 0.5) * 10;
      const rotateX = (0.5 - localY) * 9;

      card.style.setProperty("--tilt-rotate-x", `${rotateX.toFixed(2)}deg`);
      card.style.setProperty("--tilt-rotate-y", `${rotateY.toFixed(2)}deg`);
      card.style.setProperty("--tilt-glow-x", `${(localX * 100).toFixed(2)}%`);
      card.style.setProperty("--tilt-glow-y", `${(localY * 100).toFixed(2)}%`);
    };

    const handleLeave = (event) => {
      const card = event.currentTarget;
      card.style.setProperty("--tilt-rotate-x", "0deg");
      card.style.setProperty("--tilt-rotate-y", "0deg");
      card.style.setProperty("--tilt-glow-x", "50%");
      card.style.setProperty("--tilt-glow-y", "50%");
    };

    cards.forEach((card) => {
      card.addEventListener("pointermove", handleMove);
      card.addEventListener("pointerleave", handleLeave);
    });

    return () => {
      cards.forEach((card) => {
        card.removeEventListener("pointermove", handleMove);
        card.removeEventListener("pointerleave", handleLeave);
      });
    };
  }, [isTouchDevice, reduceMotion, language]);

  const handleLanguageChange = (nextLanguage) => {
    if (nextLanguage === language) return;

    startTransition(() => {
      setLanguage(nextLanguage);
      setLineIndex(0);
      setMenuOpen(false);
      setExperienceArmed(false);
    });
  };

  const readPortraitPoint = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    return {
      x: Math.max(0, Math.min(100, ((event.clientX - rect.left) / rect.width) * 100)),
      y: Math.max(0, Math.min(100, ((event.clientY - rect.top) / rect.height) * 100))
    };
  };

  const handlePortraitPointerMove = (event) => {
    if (isTouchDevice || reduceMotion) return;
    const btn = portraitButtonRef.current;
    if (!btn) return;
    const next = readPortraitPoint(event);
    portraitSpotRef.current = next;
    btn.style.setProperty("--mask-x", `${next.x}%`);
    btn.style.setProperty("--mask-y", `${next.y}%`);
    setPortraitRevealActive(true);
  };

  const handlePortraitPointerLeave = () => {
    if (isTouchDevice) return;
    const btn = portraitButtonRef.current;
    portraitSpotRef.current = { x: 50, y: 50 };
    if (btn) {
      btn.style.setProperty("--mask-x", "50%");
      btn.style.setProperty("--mask-y", "50%");
    }
    setPortraitRevealActive(false);
  };

  const handlePortraitPointerDown = (event) => {
    if (!isTouchDevice) return;

    const nextPoint = readPortraitPoint(event);
    const prev = portraitSpotRef.current;
    portraitSpotRef.current = nextPoint;
    const btn = portraitButtonRef.current;
    if (btn) {
      btn.style.setProperty("--mask-x", `${nextPoint.x}%`);
      btn.style.setProperty("--mask-y", `${nextPoint.y}%`);
    }
    setPortraitRevealActive((current) => {
      if (!current) return true;

      const sameZone =
        Math.abs(nextPoint.x - prev.x) < 8 && Math.abs(nextPoint.y - prev.y) < 8;

      return sameZone ? false : true;
    });
  };

  const handleHeroPointerMove = (event) => {
    if (reduceMotion || isTouchDevice) return;
    const root = heroSectionRef.current;
    if (!root) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const normalizedX = (event.clientX - rect.left) / rect.width - 0.5;
    const normalizedY = (event.clientY - rect.top) / rect.height - 0.5;

    const x = Math.max(-18, Math.min(18, normalizedX * 26));
    const y = Math.max(-14, Math.min(14, normalizedY * 20));
    root.style.setProperty("--hero-drift-x", `${x}px`);
    root.style.setProperty("--hero-drift-y", `${y}px`);
  };

  const handleHeroPointerLeave = () => {
    const root = heroSectionRef.current;
    if (!root) return;
    root.style.setProperty("--hero-drift-x", "0px");
    root.style.setProperty("--hero-drift-y", "0px");
  };

  const handleIntroEnterFromPoint = (clientX, clientY) => {
    if (introPhase !== "waiting") return;

    const width = window.innerWidth || 1;
    const height = window.innerHeight || 1;
    setIntroExitAt({
      x: (clientX / width) * 100,
      y: (clientY / height) * 100
    });
    setIntroPhase("exiting");
    window.setTimeout(() => setIntroPhase("done"), 2400);
  };

  const handleIntroEnterClick = (event) => {
    handleIntroEnterFromPoint(event.clientX, event.clientY);
  };

  const handleIntroPointerMove = (event) => {
    if (introPhase !== "waiting") return;
    const width = window.innerWidth || 1;
    const height = window.innerHeight || 1;
    event.currentTarget.style.setProperty("--intro-spot-x", `${(event.clientX / width) * 100}%`);
    event.currentTarget.style.setProperty("--intro-spot-y", `${(event.clientY / height) * 100}%`);
  };

  useEffect(() => {
    if (introPhase !== "waiting") return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape" || event.key === " " || event.key === "Enter") {
        event.preventDefault();
        handleIntroEnterFromPoint(window.innerWidth / 2, window.innerHeight / 2);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [introPhase]);

  const introGate = supplementalCopy[language]?.introGate ?? supplementalCopy.en.introGate;
  const footerBlock = content.footerBlock ?? {
    exploreTitle: "Explore",
    connectTitle: "Connect",
    rights: `© ${new Date().getFullYear()} Adilkan Anarbekov`,
    colophon: ""
  };
  const footerConnectOrder = ["telegram", "linkedin", "github"];
  const footerConnectItems = footerConnectOrder
    .map((icon) => content.contact.items.find((item) => item.icon === icon))
    .filter(Boolean);
  const footerNavItems = content.nav;

  return (
    <div
      className={`page-shell ${introPhase === "done" ? "is-site-unlocked" : "is-intro-gate"}`}
      data-active-section={activeSection || "top"}
    >
      <div
        className={`cinematic-intro ${
          introPhase === "waiting" ? "is-active" : introPhase === "exiting" ? "is-exiting" : "is-finished"
        }`}
        aria-hidden={introPhase === "done"}
        style={{
          "--intro-exit-x": `${introExitAt.x}%`,
          "--intro-exit-y": `${introExitAt.y}%`
        }}
        onPointerMove={handleIntroPointerMove}
        role="presentation"
      >
        <div className="cinematic-intro-mesh" aria-hidden="true" />
        <div className="cinematic-intro-grid" aria-hidden="true" />
        <div className="cinematic-intro-scan" aria-hidden="true" />
        <div className="cinematic-intro-grain" aria-hidden="true" />
        <div className="cinematic-intro-vignette" aria-hidden="true" />
        <div className="cinematic-intro-spotlight" aria-hidden="true" />
        <div className="cinematic-intro-watermark" aria-hidden="true">
          {content.hero.title}
        </div>

        {introPhase === "waiting" ? (
          <button
            type="button"
            className="cinematic-intro-hit"
            tabIndex={-1}
            aria-hidden="true"
            onClick={handleIntroEnterClick}
          />
        ) : null}

        <div className="cinematic-intro-inner">
          <div className="intro-monogram" aria-hidden="true">
            <span className="intro-monogram-ring" />
            <span className="intro-monogram-core">AA</span>
          </div>

          <p className="cinematic-kicker">{introGate.eyebrow}</p>

          <IntroSplitName text={content.hero.title} />

          <p className="cinematic-subline intro-line-reveal">{rotatingLine}</p>

          <div className="intro-cta-cluster">
            <button
              className="intro-enter-orb"
              type="button"
              onClick={handleIntroEnterClick}
              aria-label={`${introGate.enter}. ${introGate.hint}`}
            >
              <span className="intro-enter-orb-glow" aria-hidden="true" />
              <span className="intro-enter-orb-label">{introGate.enter}</span>
              <span className="intro-enter-orb-arrow" aria-hidden="true">
                →
              </span>
            </button>
            <p className="intro-hint">{introGate.hint}</p>
          </div>
        </div>
      </div>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <div className="ambient ambient-one" aria-hidden="true" />
      <div className="ambient ambient-two" aria-hidden="true" />
      <div className="ambient ambient-three" aria-hidden="true" />
      <div className="noise-layer" aria-hidden="true" />
      <div className="scroll-progress-bar" aria-hidden="true" />

      <StoryScrollStage
        activeSection={activeSection || "top"}
        reduceMotion={reduceMotion}
        isTouchDevice={isTouchDevice}
        visible={introPhase === "done"}
      />

      <header
        className={`site-header ${((heroLandingMode && !menuOpen) || introPhase !== "done") ? "is-hidden" : ""}`}
      >
        <div className="container header-row">
          <a className="brand" href="#top" onClick={() => setMenuOpen(false)}>
            <span className="brand-mark">AA</span>
            <span className="brand-copy">
              <strong>AdilKan</strong>
              <small>{content.status.location}</small>
            </span>
          </a>

          <button
            className={`nav-toggle ${menuOpen ? "is-open" : ""}`}
            type="button"
            aria-expanded={menuOpen}
            aria-label="Toggle navigation"
            onClick={() => setMenuOpen((current) => !current)}
          >
            <span />
            <span />
            <span />
          </button>

          <div className={`header-panel ${menuOpen ? "is-open" : ""}`}>
            <nav className="site-nav" aria-label={content.ui.primaryNavigation}>
              {content.nav.map((item) => {
                const sectionId = item.href.replace("#", "");

                return (
                  <a
                    key={item.href}
                    className={activeSection === sectionId ? "is-active" : ""}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                );
              })}
            </nav>

            <div className="header-actions">
              <div className="language-switcher" role="group" aria-label={content.ui.languageSwitcher}>
                {languageOptions.map((option) => (
                  <button
                    key={option.key}
                    className={option.key === language ? "is-active" : ""}
                    type="button"
                    onClick={() => handleLanguageChange(option.key)}
                    aria-pressed={option.key === language}
                  >
                    {option.label}
                  </button>
                ))}
              </div>

              <span className="header-time">{time || "--"}</span>

              <a
                className="header-cta header-cta-telegram"
                href={telegramHref}
                target="_blank"
                rel="noreferrer"
                onClick={() => {
                  setMenuOpen(false);
                  trackGenerateLead("header_telegram");
                }}
              >
                {content.ui.headerTelegramCta ?? "Telegram"}
              </a>
            </div>
          </div>
        </div>
      </header>

      <main id="main-content">
        <section
          ref={heroSectionRef}
          className={`hero-section hero-cinematic ${heroLandingMode ? "is-landing" : ""} ${
            introPhase === "done" ? "has-intro-ended" : ""
          }`}
          id="top"
          onPointerMove={handleHeroPointerMove}
          onPointerLeave={handleHeroPointerLeave}
        >
          <div className="hero-depth-layers" aria-hidden="true">
            <span className="hero-depth-layer hero-depth-layer-one" />
            <span className="hero-depth-layer hero-depth-layer-two" />
            <span className="hero-depth-layer hero-depth-layer-three" />
          </div>
          <div className="hero-cinematic-grid" aria-hidden="true" />
          <div className="hero-cinematic-noise" aria-hidden="true" />
          <div className="container hero-stack-layout">
            <div className="hero-copy hero-copy-centered">
              <span className="hero-chip">{content.hero.chip}</span>
              <div className="hero-status-row hero-status-row-centered">
                <span className="status-pill">{content.status.availability}</span>
                <span className="status-pill status-pill-muted">{content.status.location}</span>
              </div>
              <h1>
                <span className="hero-title-line">{content.hero.title.split(" ")[0]}</span>
                <span className="hero-title-line">{content.hero.title.split(" ").slice(1).join(" ")}</span>
              </h1>
              <p className="hero-lead">{content.hero.subtitle}</p>

              <div className="rotating-line-wrap rotating-line-wrap-centered">
                <span key={`${language}-${lineIndex}`} className="rotating-line">
                  {rotatingLine}
                </span>
              </div>

              <div className="hero-actions hero-actions-centered">
                <a className="button button-primary" href="#services">
                  {content.hero.primaryCta}
                </a>
                <a
                  className="button button-telegram"
                  href={telegramHref}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => trackGenerateLead("telegram")}
                >
                  <InlineIcon icon="telegram" alt="" />
                  {content.hero.secondaryCta}
                </a>
              </div>
            </div>

            <div className="hero-portrait-wrap">
              <button
                ref={portraitButtonRef}
                className={`hero-portrait ${portraitRevealActive ? "is-revealed" : ""} ${
                  isTouchDevice ? "is-touch-device" : ""
                }`}
                type="button"
                aria-pressed={portraitRevealActive}
                style={{ "--mask-x": "50%", "--mask-y": "50%" }}
                onPointerMove={handlePortraitPointerMove}
                onPointerLeave={handlePortraitPointerLeave}
                onPointerDown={handlePortraitPointerDown}
                aria-label={portraitHint}
              >
                <span className="hero-portrait-halo hero-portrait-halo-one" aria-hidden="true" />
                <span className="hero-portrait-halo hero-portrait-halo-two" aria-hidden="true" />
                <span className="hero-portrait-badge">{content.status.availability}</span>

                <div className="hero-portrait-shell">
                  <div className="hero-portrait-base">
                    <img src={portrait} alt="Portrait of Adilkan Anarbekov" />
                  </div>

                  <div className="hero-portrait-reveal" aria-hidden="true">
                    <img src={portrait} alt="" />
                    <span className="hero-portrait-tech-layer" />
                    <span className="hero-portrait-glow-layer" />
                  </div>

                  <div className="portrait-overlay">
                    {content.process.stats.map((stat) => (
                      <div className="portrait-stat" key={stat.label}>
                        <span>{stat.label}</span>
                        <strong>{stat.value}</strong>
                      </div>
                    ))}
                  </div>
                </div>
              </button>

              <p className="portrait-hint">
                {portraitHint}
              </p>
            </div>

            <div className="hero-detail-grid">
              <aside className="hero-console">
                <div className="console-topline">
                  <span>{content.hero.consoleTitle}</span>
                  <span className="console-status">{content.hero.consoleStatus}</span>
                </div>

                <div className="console-list">
                  {content.hero.consoleLines.map((line) => (
                    <div className="console-item" key={line.label}>
                      <span className="console-label">{line.label}</span>
                      <p>{line.text}</p>
                    </div>
                  ))}
                </div>

                <div className="console-footer">
                  <span>{content.hero.consoleFooter}</span>
                  <strong>{time || "--"}</strong>
                </div>
              </aside>

              <div className="hero-signal-grid hero-signal-grid-zip">
                {content.hero.signalCards.map((card, index) => (
                  <article className="signal-card tilt-card" key={card.title}>
                    <SignalMark icon={card.icon} fallback={`${index + 1}`} />
                    <div>
                      <h3>{card.title}</h3>
                      <p>{card.text}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>

          <div className="hero-marquee">
            <div className="hero-marquee-track" aria-hidden="true">
              {[0, 1].flatMap((loop) =>
                content.hero.marquee.map((item) => (
                  <span className="marquee-item" key={`${loop}-${item}`}>
                    {item}
                  </span>
                ))
              )}
            </div>
          </div>
        </section>

        <section className="quick-facts-section">
          <div className="container">
            <SectionHeading
              eyebrow={extras.quick.eyebrow}
              title={extras.quick.title}
              description={extras.quick.description}
              align="center"
            />

            <div className="quick-facts-grid">
              {quickMetrics.map((metric, index) => (
                <article
                  className="quick-fact-card"
                  key={metric.label}
                  data-reveal
                  style={{ "--reveal-delay": `${index * 80}ms` }}
                >
                  <strong>{metric.value}</strong>
                  <span>{metric.label}</span>
                  <p>{metric.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="motion-section" id="motion">
          <div className="motion-parallax-ribbons" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <div className="container">
            <SectionHeading
              eyebrow={content.motion.eyebrow}
              title={content.motion.title}
              description={content.motion.description}
            />

            <div className="motion-ticker" data-reveal>
              {content.motion.ticker.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>

            <div className="feature-grid">
              {content.motion.items.map((item, index) => (
                <article
                  className={`feature-card feature-card-${item.variant} tilt-card`}
                  key={item.title}
                  data-reveal
                  style={{ "--reveal-delay": `${index * 90}ms` }}
                >
                  <span className="feature-label">{item.label}</span>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <div className="feature-accent-list">
                    {item.accents.map((accent) => (
                      <span key={accent}>{accent}</span>
                    ))}
                  </div>
                  <ul>
                    {item.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="experience-section" id="experience">
          <div className="container experience-grid">
            <div className={`experience-summary ${experienceArmed ? "is-armed" : ""}`} data-reveal>
              <SectionHeading
                eyebrow={content.experience.eyebrow}
                title={content.experience.title}
                description={content.experience.description}
              />

              <div className="experience-orbit-panel">
                <span className="experience-ring-label">{content.experience.ringLabel}</span>
                <h3>{content.experience.orbitTitle}</h3>
                <div className="experience-tag-cloud">
                  {content.experience.orbitTags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>

                <button
                  className={`button button-secondary experience-trigger ${
                    experienceArmed ? "is-armed" : ""
                  }`}
                  type="button"
                  onClick={() => setExperienceArmed((current) => !current)}
                >
                  {experienceArmed ? content.experience.pressResult : content.experience.pressCta}
                </button>
              </div>
            </div>

            <div className="mode-list">
              {content.experience.modes.map((mode, index) => (
                <article
                  className="mode-card tilt-card"
                  key={mode.title}
                  data-reveal
                  style={{ "--reveal-delay": `${index * 110}ms` }}
                >
                  <div className="mode-topline">
                    <span>{mode.label}</span>
                    <strong>{mode.progress}%</strong>
                  </div>
                  <h3>{mode.title}</h3>
                  <p>{mode.description}</p>

                  <div className="mode-badges">
                    {mode.badges.map((badge) => (
                      <span key={badge}>{badge}</span>
                    ))}
                  </div>

                  <div className="meter-list">
                    {mode.bars.map((bar) => (
                      <div className="meter-row" key={bar.label}>
                        <div className="meter-copy">
                          <span>{bar.label}</span>
                          <strong>{bar.value}%</strong>
                        </div>
                        <div className="meter-track">
                          <span style={{ width: `${bar.value}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="projects-story-section" id="projects">
          <div className="container projects-story-layout">
            <aside className="projects-story-sticky" data-reveal>
              <span className="section-eyebrow">{projectStory.eyebrow ?? "Selected Work"}</span>
              <h2>{projectStory.title ?? content.projects.title}</h2>
              <p>{projectStory.description ?? content.projects.description}</p>

              <div className="projects-story-rail" aria-label={projectStory.railTitle ?? content.projects.title}>
                {(projectStory.rail ?? []).map((step, index) => (
                  <div className="projects-story-step" key={step.label}>
                    <span>{step.label ?? `0${index + 1}`}</span>
                    <p>{step.text}</p>
                  </div>
                ))}
              </div>
            </aside>

            <div className="projects-story-cards">
              {content.projects.items.map((project, index) => (
                <article
                  className={`project-story-card project-story-card-${index + 1} tilt-card`}
                  key={project.title}
                  data-reveal
                  style={{ "--reveal-delay": `${index * 120}ms` }}
                >
                  <div className="project-story-topline">
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <strong>{project.kind ?? content.projects.previewLabel}</strong>
                  </div>

                  <div className="project-story-visual" aria-hidden="true">
                    <div className="project-story-browser">
                      <span />
                      <span />
                      <span />
                    </div>
                    <div className="project-story-screen">
                      <SignalMark icon={project.previewIcon} fallback={`${index + 1}`} />
                      <span className="project-story-domain">
                        {project.domain ?? getProjectDomain(project.link)}
                      </span>
                      <strong>{project.signal ?? project.title}</strong>
                    </div>
                  </div>

                  <div className="project-story-copy">
                    <p className="project-story-year">{project.year}</p>
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>

                    <ul>
                      {project.bullets.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>

                    <div className="project-story-footer">
                      <div className="project-story-stack">
                        {project.stack.map((icon) => (
                          <span className="project-preview-stack-chip" key={icon}>
                            <InlineIcon icon={icon} alt={icon} />
                          </span>
                        ))}
                      </div>

                      <a
                        className="project-story-link"
                        href={project.link}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {project.linkLabel ?? content.projects.linkLabel}
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="about-section" id="about">
          <div className="container about-zip-layout">
            <div className="about-visual" data-reveal>
              <div className="about-portrait-card">
                <img src={portrait} alt="Adilkan Anarbekov portrait" />
              </div>
              <div className="about-floating-tile about-floating-tile-left">
                <span>{content.status.location}</span>
                <strong>{content.process.stats[0]?.value}</strong>
              </div>
              <div className="about-floating-tile about-floating-tile-right">
                <span>{content.contact.listTitle}</span>
                <strong>{content.contact.listStatus}</strong>
              </div>
            </div>

            <div className="about-copy">
              <SectionHeading
                title={content.about.title}
                description={content.about.description}
              />

              <div className="about-card-grid">
                {content.about.cards.map((card, index) => (
                  <article
                    className="about-card"
                    key={card.title}
                    data-reveal
                    style={{ "--reveal-delay": `${index * 120}ms` }}
                  >
                    <h3>{card.title}</h3>
                    <ul>
                      {card.points.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>

              <div className="badge-stack about-badge-stack" data-reveal style={{ "--reveal-delay": "220ms" }}>
                {content.contact.badges.map((badge) => (
                  <span key={badge}>{badge}</span>
                ))}
              </div>

              <div className="about-cta-row" data-reveal style={{ "--reveal-delay": "260ms" }}>
                <a className="button button-primary" href="#contact">
                  {content.contact.title}
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="services-section" id="services">
          <div className="container">
            <SectionHeading
              title={content.services.title}
              description={content.services.description}
            />

            <div className="service-grid">
              {content.services.items.map((item, index) => (
                <article
                  className="service-card tilt-card"
                  key={item.title}
                  data-reveal
                  style={{ "--reveal-delay": `${index * 110}ms` }}
                  >
                    <div className="service-icon-row">
                      <SignalMark icon={item.icon} fallback={`${index + 1}`} />
                      <span className="service-index">0{index + 1}</span>
                    </div>
                    <h3>{item.title}</h3>
                    <ul>
                      {item.points.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="client-signal-section">
          <div className="container client-signal-layout">
            <div className="client-signal-board" data-reveal>
              <SectionHeading
                eyebrow={extras.signal.eyebrow}
                title={extras.signal.title}
                description={extras.signal.description}
              />

              <div className="client-signal-rows">
                {extras.signal.boardRows.map((row, index) => (
                  <article
                    className="client-signal-row"
                    key={row.label}
                    data-reveal
                    style={{ "--reveal-delay": `${index * 90}ms` }}
                  >
                    <span className="client-signal-index">0{index + 1}</span>
                    <div className="client-signal-copy">
                      <strong>{row.label}</strong>
                      <p>{row.value}</p>
                    </div>
                    <span className="client-signal-pulse" aria-hidden="true" />
                  </article>
                ))}
              </div>
            </div>

            <div className="client-offer-column">
              <article className="client-offer-panel" data-reveal style={{ "--reveal-delay": "120ms" }}>
                <span className="section-eyebrow">{extras.signal.deliverTitle}</span>
                <p className="client-offer-lead">{extras.signal.deliverText}</p>

                <div className="client-offer-list">
                  {serviceSnapshots.map((item, index) => (
                    <div className="client-offer-card" key={item.title}>
                      <span className="client-offer-index">0{index + 1}</span>
                      <div>
                        <strong>{item.title}</strong>
                        <p>{item.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </article>

              <article className="client-offer-panel client-offer-panel-accent" data-reveal style={{ "--reveal-delay": "220ms" }}>
                <span className="section-eyebrow">{extras.signal.memoryTitle}</span>
                <ul className="client-memory-list">
                  {extras.signal.memoryPoints.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>

                <div className="client-process-rail" aria-hidden="true">
                  {content.process.items.map((item) => (
                    <span key={item.title}>{item.title}</span>
                  ))}
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="process-section" id="ops">
          <div className="container process-grid">
            <div>
              <SectionHeading
                title={content.process.title}
                description={content.process.description}
              />

              <div className="timeline-list">
                {content.process.items.map((item, index) => (
                  <article
                    className="timeline-card tilt-card"
                    key={item.title}
                    data-reveal
                    style={{ "--reveal-delay": `${index * 100}ms` }}
                  >
                    <span className="timeline-index">0{index + 1}</span>
                    <div>
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>
                      <div className="timeline-tags">
                        {item.tags.map((tag) => (
                          <span key={tag}>{tag}</span>
                        ))}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <aside className="stats-panel" data-reveal style={{ "--reveal-delay": "100ms" }}>
              <div className="stats-card">
                <span className="section-eyebrow">{content.status.location}</span>
                <h3>{content.contact.listTitle}</h3>
                <p>{content.footer}</p>
              </div>

              {content.process.stats.map((stat) => (
                <div className="stats-card" key={stat.label}>
                  <span>{stat.label}</span>
                  <strong>{stat.value}</strong>
                </div>
              ))}
            </aside>
          </div>
        </section>

        <section className="contact-section" id="contact">
          <div className="contact-section-backdrop" aria-hidden="true" />
          <div className="container contact-section-inner">
            <div className="contact-header" data-reveal>
              <SectionHeading
                title={content.contact.title}
                description={content.contact.description}
              />
              <div className="contact-header-meta">
                <span className="contact-status-pill">{content.status.availability}</span>
                <span className="contact-location-pill">{content.status.location}</span>
                {content.contact.responseHint ? (
                  <p className="contact-response-hint">{content.contact.responseHint}</p>
                ) : null}
              </div>
              <div className="contact-badge-row">
                {content.contact.badges.map((badge) => (
                  <span className="contact-badge-chip" key={badge}>
                    {badge}
                  </span>
                ))}
              </div>
            </div>

            <div className="contact-layout">
              <div className="contact-copy" data-reveal style={{ "--reveal-delay": "80ms" }}>
                <div className="contact-panel">
                  <span className="contact-panel-eyebrow">{content.contact.panelTitle}</span>
                  <p className="contact-panel-lead">{content.contact.panelText}</p>
                  <div className="contact-actions contact-actions-primary">
                    <a
                      className="button button-telegram is-telegram-main"
                      href={telegramHref}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => trackGenerateLead("telegram")}
                    >
                      <InlineIcon icon="telegram" alt="" />
                      {content.contact.telegramCta ?? "Telegram"}
                    </a>
                    {whatsappHref ? (
                      <a
                        className="button button-secondary"
                        href={whatsappHref}
                        target="_blank"
                        rel="noreferrer"
                        onClick={() => trackGenerateLead("whatsapp")}
                      >
                        {content.contact.whatsappCta}
                      </a>
                    ) : null}
                    {emailHref ? (
                      <a
                        className="button button-contact-email"
                        href={emailHref}
                        onClick={() => trackGenerateLead("email")}
                      >
                        {content.contact.emailCta}
                      </a>
                    ) : null}
                  </div>
                </div>
              </div>

              <div className="contact-list-panel" data-reveal style={{ "--reveal-delay": "160ms" }}>
                <div className="contact-list-topline">
                  <span>{content.contact.listTitle}</span>
                  <strong>{content.contact.listStatus}</strong>
                </div>

                <div className="contact-list">
                  {content.contact.items.map((item) => (
                    <a
                      className="contact-row"
                      key={item.label}
                      href={item.href}
                      target={item.href.startsWith("http") ? "_blank" : undefined}
                      rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                      onClick={() => trackGenerateLead(item.icon)}
                    >
                      <span className="contact-icon-wrap">
                        <InlineIcon icon={item.icon} alt={item.label} />
                      </span>

                      <span className="contact-row-copy">
                        <strong>{item.label}</strong>
                        <span>{item.value}</span>
                      </span>

                      <span className="contact-row-trail">
                        {item.extra ? (
                          <span className="contact-extra">{item.extra.label}</span>
                        ) : (
                          <span className="contact-row-chevron" aria-hidden="true">
                            →
                          </span>
                        )}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-main">
          <div className="footer-brand-block">
            <span className="footer-brand-mark" aria-hidden="true">
              AA
            </span>
            <div className="footer-brand-copy">
              <strong className="footer-brand-name">AdilKan</strong>
              <p>{content.footer}</p>
            </div>
          </div>

          <nav className="footer-col" aria-label={footerBlock.exploreTitle}>
            <span className="footer-col-title">{footerBlock.exploreTitle}</span>
            <ul className="footer-link-list">
              {footerNavItems.map((item) => (
                <li key={item.href}>
                  <a href={item.href}>{item.label}</a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="footer-col">
            <span className="footer-col-title">{footerBlock.connectTitle}</span>
            <ul className="footer-link-list">
              {footerConnectItems.map((item) => (
                <li key={item.icon}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => trackGenerateLead(`footer_${item.icon}`)}
                  >
                    <InlineIcon icon={item.icon} alt="" />
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="container footer-bottom-inner">
            <span>{footerBlock.rights}</span>
            {footerBlock.colophon ? <span className="footer-colophon">{footerBlock.colophon}</span> : null}
          </div>
        </div>
      </footer>

      {activeSection && activeSection !== "top" && activeSection !== "contact" ? (
        <a
          className="floating-contact"
          href={telegramHref}
          target="_blank"
          rel="noreferrer"
          aria-label={content.ui.telegramFloatTitle}
          onClick={() => trackGenerateLead("telegram_float")}
        >
          <InlineIcon icon="telegram" alt="Telegram" />
          <span>
            <strong>{content.ui.telegramFloatTitle}</strong>
            <small>{content.ui.telegramFloatText}</small>
          </span>
        </a>
      ) : null}

      <ScrollStoryRail
        sections={storyRailSections}
        activeId={activeSection || "top"}
        reduceMotion={reduceMotion}
        visible={introPhase === "done"}
        ariaLabel={extras.storyRail?.navLabel ?? "Section navigation"}
      />
    </div>
  );
}
