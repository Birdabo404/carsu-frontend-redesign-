/** Mirrors the `motion` class set in <head> before first paint (see nuxt.config). */
export function motionAllowed(): boolean {
  return import.meta.client === true && document.documentElement.classList.contains("motion");
}
