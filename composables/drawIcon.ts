import { animate, stagger, svg } from "animejs";

const drawables = new WeakMap<Element, ReturnType<typeof svg.createDrawable>>();

/** Redraws the `[data-icon]` strokes inside `root`, one path after another. */
export function drawIcon(root: Element) {
  const icon = root.querySelector("[data-icon]");
  if (!icon) return;
  let paths = drawables.get(icon);
  if (!paths) {
    paths = svg.createDrawable(icon.querySelectorAll("path"));
    drawables.set(icon, paths);
  }
  animate(paths, { draw: ["0 0", "0 1"], duration: 650, ease: "inOutQuad", delay: stagger(70) });
}
