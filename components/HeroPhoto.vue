<script setup lang="ts">
import { BAYER_8, hexToRgb, loadImage, sampleLuminance, setPixel } from "~/composables/dither";

const props = withDefaults(defineProps<{ src: string; alt: string; focusX?: number; focusY?: number }>(), {
  focusX: 0.5,
  focusY: 0.5,
});

const CELL = 4;
const EDGE_WIDTH = 0.34;
const SCAN_GLOW = 0.06;
const PAPER = hexToRgb("#f5f2ea");
const NAVY = hexToRgb("#13213c");
const GOLD = hexToRgb("#f9dc07");

/** `scan`: 0 → paper, 1 → photo developed. `shift`: 0 → resting edge, 1 → dissolved into paper. */
const state = { scan: 1, shift: 0 };

const box = ref<HTMLDivElement | null>(null);
const canvas = ref<HTMLCanvasElement | null>(null);
let img: HTMLImageElement | null = null;
let lum: Float32Array | null = null;
let frame: ImageData | null = null;
let observer: ResizeObserver | undefined;

function resize() {
  const el = canvas.value;
  const rect = box.value?.getBoundingClientRect();
  if (!el || !rect?.width || !rect.height || !img) return;
  const cols = Math.ceil(rect.width / CELL);
  const rows = Math.ceil(rect.height / CELL);
  el.width = cols;
  el.height = rows;
  lum = sampleLuminance(img, cols, rows, props.focusX, props.focusY);
  frame = new ImageData(cols, rows);
  draw();
}

function cellColor(i: number, x: number, y: number, cols: number, rows: number) {
  const u = x / cols;
  const v = y / rows;
  const t = BAYER_8[(y & 7) * 8 + (x & 7)]!;

  const scanDistance = state.scan * 1.08 - v;
  if (scanDistance < 0) return PAPER;
  if (scanDistance < SCAN_GLOW && t < (1 - scanDistance / SCAN_GLOW) * 0.7) return GOLD;

  const edge = -0.04 + state.shift * 1.2;
  const d = Math.min(1, Math.max(0, 1 - (u - edge) / EDGE_WIDTH));
  if (d <= 0 || t >= d * 2) return null;
  if (d > 0.5 && t < (d - 0.5) * 2) return PAPER;

  const q = lum![i]! + (BAYER_8[((y + 3) & 7) * 8 + ((x + 5) & 7)]! - 0.5) * 0.6;
  return q < 0.4 ? NAVY : q < 0.56 ? GOLD : PAPER;
}

function draw() {
  const el = canvas.value;
  if (!el || !frame || !lum) return;
  const { width: cols, height: rows, data } = frame;
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const i = y * cols + x;
      setPixel(data, i, cellColor(i, x, y, cols, rows));
    }
  }
  el.getContext("2d")!.putImageData(frame, 0, 0);
}

async function ready() {
  img = await loadImage(props.src);
  resize();
}

onMounted(() => {
  observer = new ResizeObserver(resize);
  if (box.value) observer.observe(box.value);
});

onBeforeUnmount(() => observer?.disconnect());

defineExpose({ state, draw, ready });
</script>

<template>
  <div ref="box" class="overflow-hidden bg-paper">
    <svg class="absolute size-0" aria-hidden="true">
      <filter id="duotone-navy" color-interpolation-filters="sRGB">
        <feColorMatrix type="matrix" values=".2126 .7152 .0722 0 0 .2126 .7152 .0722 0 0 .2126 .7152 .0722 0 0 0 0 0 1 0" />
        <feComponentTransfer>
          <feFuncR type="table" tableValues="0.075 0.42 0.961" />
          <feFuncG type="table" tableValues="0.129 0.46 0.949" />
          <feFuncB type="table" tableValues="0.235 0.56 0.918" />
        </feComponentTransfer>
      </filter>
    </svg>
    <img
      :src="src"
      :alt="alt"
      class="absolute inset-0 size-full object-cover [filter:url(#duotone-navy)]"
      :style="{ objectPosition: `${focusX * 100}% ${focusY * 100}%` }"
      fetchpriority="high"
    />
    <canvas ref="canvas" aria-hidden="true" class="pixelated absolute inset-0 size-full" />
  </div>
</template>
