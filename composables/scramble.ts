import { animate, type JSAnimation } from "animejs";

const GLYPHS = "ABCDEFGHJKLMNPQRSTUVWXYZ0123456789/";
const running = new WeakMap<HTMLElement, JSAnimation>();

export function scramble(el: HTMLElement, text: string, duration = 420) {
  running.get(el)?.cancel();
  const state = { progress: 0 };
  const animation = animate(state, {
    progress: 1,
    duration,
    ease: "outQuad",
    onUpdate: () => {
      const settled = Math.floor(state.progress * text.length);
      el.textContent = Array.from(text, (char, i) =>
        i < settled ? char : GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
      ).join("");
    },
    onComplete: () => {
      el.textContent = text;
    },
  });
  running.set(el, animation);
  return animation;
}
