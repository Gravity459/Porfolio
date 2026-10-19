/** Smooth-scrolls to an in-page section and records it in the URL. */
export function scrollToSection(href: string) {
  const id = href.replace(/^#/, "");
  const target = id ? document.getElementById(id) : null;
  if (!target && id !== "top") return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (target) target.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  else window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  history.replaceState(null, "", id === "top" ? window.location.pathname : `#${id}`);
}
