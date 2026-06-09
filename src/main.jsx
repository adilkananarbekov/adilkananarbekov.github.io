import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./interaction-polish.css";
import "./portfolio-lab-refresh.css";
import App from "./App.jsx";
import { initAnalytics } from "./analytics.js";

initAnalytics();

const splashLoadStarted = performance.now();

function dismissAppSplash() {
  document.body.classList.add("app-ready");
  const splash = document.getElementById("app-splash");
  if (splash) {
    splash.setAttribute("aria-busy", "false");
    window.setTimeout(() => splash.remove(), 600);
  }
}

function scheduleSplashDismiss() {
  const minVisibleMs = 480;
  const fontWaitMs = 2600;

  const afterPaint = () => {
    requestAnimationFrame(() => {
      requestAnimationFrame(dismissAppSplash);
    });
  };

  const run = () => {
    const elapsed = performance.now() - splashLoadStarted;
    const waitMore = Math.max(0, minVisibleMs - elapsed);
    window.setTimeout(afterPaint, waitMore);
  };

  if (document.fonts?.ready) {
    const timeout = new Promise((resolve) => {
      window.setTimeout(resolve, fontWaitMs);
    });
    Promise.race([document.fonts.ready, timeout]).finally(run);
  } else {
    run();
  }
}

const rootEl = document.getElementById("root");
if (rootEl) {
  createRoot(rootEl).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}

requestAnimationFrame(() => {
  requestAnimationFrame(scheduleSplashDismiss);
});
