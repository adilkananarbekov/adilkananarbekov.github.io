const MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

function pagePathWithHash() {
  return `${window.location.pathname}${window.location.hash || ""}` || "/";
}

/**
 * Google Analytics 4 — set VITE_GA_MEASUREMENT_ID in .env (e.g. G-XXXXXXXXXX).
 * In GA4: Admin → Data display → Events → mark `generate_lead` as a conversion.
 */
export function initAnalytics() {
  if (!MEASUREMENT_ID || typeof window === "undefined") return;

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };

  window.gtag("js", new Date());
  window.gtag("config", MEASUREMENT_ID, {
    send_page_view: true,
    page_path: pagePathWithHash()
  });

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`;
  document.head.appendChild(script);

  window.addEventListener("hashchange", () => {
    window.gtag("event", "page_view", {
      page_path: pagePathWithHash(),
      page_title: document.title
    });
  });
}

export function trackGenerateLead(method) {
  if (!MEASUREMENT_ID || typeof window === "undefined" || !window.gtag) return;
  window.gtag("event", "generate_lead", {
    method: String(method)
  });
}
