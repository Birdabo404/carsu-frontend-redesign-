export type Rgb = readonly [number, number, number];

function bayerMatrix(size: number): number[][] {
  if (size === 1) return [[0]];
  const half = size / 2;
  const inner = bayerMatrix(half);
  const quadrant = [0, 2, 3, 1];
  return Array.from({ length: size }, (_, y) =>
    Array.from({ length: size }, (_, x) => {
      const q = (y < half ? 0 : 2) + (x < half ? 0 : 1);
      return 4 * inner[y % half]![x % half]! + quadrant[q]!;
    }),
  );
}

/** 8×8 ordered-dither thresholds in (0, 1), row-major; index with `(y & 7) * 8 + (x & 7)`. */
export const BAYER_8 = Float32Array.from(bayerMatrix(8).flat(), (v) => (v + 0.5) / 64);

export function hexToRgb(hex: string): Rgb {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

const imageCache = new Map<string, Promise<HTMLImageElement>>();

export function loadImage(src: string): Promise<HTMLImageElement> {
  let pending = imageCache.get(src);
  if (!pending) {
    pending = new Promise((resolve, reject) => {
      const img = new Image();
      img.decoding = "async";
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
    });
    imageCache.set(src, pending);
  }
  return pending;
}

/**
 * Samples an image into a cols×rows luminance grid using the same crop as
 * `object-fit: cover; object-position: {focusX*100}% {focusY*100}%`, then stretches levels.
 */
export function sampleLuminance(
  img: HTMLImageElement,
  cols: number,
  rows: number,
  focusX = 0.5,
  focusY = 0.5,
): Float32Array {
  const scale = Math.max(cols / img.naturalWidth, rows / img.naturalHeight);
  const sw = cols / scale;
  const sh = rows / scale;
  const sx = (img.naturalWidth - sw) * focusX;
  const sy = (img.naturalHeight - sh) * focusY;

  const canvas = document.createElement("canvas");
  canvas.width = cols;
  canvas.height = rows;
  const ctx = canvas.getContext("2d", { willReadFrequently: true })!;
  ctx.drawImage(img, sx, sy, sw, sh, 0, 0, cols, rows);
  const { data } = ctx.getImageData(0, 0, cols, rows);

  const lum = new Float32Array(cols * rows);
  let lo = 1;
  let hi = 0;
  for (let i = 0; i < lum.length; i++) {
    const l = (0.2126 * data[i * 4]! + 0.7152 * data[i * 4 + 1]! + 0.0722 * data[i * 4 + 2]!) / 255;
    lum[i] = l;
    if (l < lo) lo = l;
    if (l > hi) hi = l;
  }
  const range = Math.max(hi - lo, 0.001);
  for (let i = 0; i < lum.length; i++) lum[i] = (lum[i]! - lo) / range;
  return lum;
}

export function setPixel(data: Uint8ClampedArray, i: number, rgb: Rgb | null) {
  const o = i * 4;
  if (!rgb) {
    data[o + 3] = 0;
    return;
  }
  data[o] = rgb[0];
  data[o + 1] = rgb[1];
  data[o + 2] = rgb[2];
  data[o + 3] = 255;
}
