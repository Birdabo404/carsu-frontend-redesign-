<script setup lang="ts">
import { BAYER_8, hexToRgb, loadImage, sampleLuminance, setPixel } from "~/composables/dither";

const props = withDefaults(
  defineProps<{
    src: string;
    ink: string;
    cell?: number;
    focusX?: number;
    focusY?: number;
    gamma?: number;
    /** Luminance at or above this prints as blank paper. */
    white?: number;
  }>(),
  { cell: 3, focusX: 0.5, focusY: 0.5, gamma: 1, white: 1 },
);

const box = ref<HTMLDivElement | null>(null);
const canvas = ref<HTMLCanvasElement | null>(null);
let lum: Float32Array | null = null;
let frame: ImageData | null = null;
let observer: ResizeObserver | undefined;
let progress = 1;

async function resize() {
  const el = canvas.value;
  const rect = box.value?.getBoundingClientRect();
  if (!el || !rect?.width || !rect.height) return;
  const img = await loadImage(props.src);
  const cols = Math.ceil(rect.width / props.cell);
  const rows = Math.ceil(rect.height / props.cell);
  el.width = cols;
  el.height = rows;
  lum = sampleLuminance(img, cols, rows, props.focusX, props.focusY).map((l) => Math.min(1, l / props.white) ** props.gamma);
  frame = new ImageData(cols, rows);
  draw();
}

function draw() {
  const el = canvas.value;
  if (!el || !frame || !lum) return;
  const ink = hexToRgb(props.ink);
  const lift = (1 - progress) * 1.05;
  const { width: cols, height: rows, data } = frame;
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const i = y * cols + x;
      setPixel(data, i, lum[i]! + lift < BAYER_8[(y & 7) * 8 + (x & 7)]! ? ink : null);
    }
  }
  el.getContext("2d")!.putImageData(frame, 0, 0);
}

/** 0 renders nothing; 1 renders the full print. */
function develop(value: number) {
  progress = value;
  draw();
}

onMounted(() => {
  observer = new ResizeObserver(() => void resize());
  if (box.value) observer.observe(box.value);
});

onBeforeUnmount(() => observer?.disconnect());

defineExpose({ develop });
</script>

<template>
  <div ref="box" class="relative overflow-hidden">
    <canvas ref="canvas" aria-hidden="true" class="pixelated absolute inset-0 size-full" />
  </div>
</template>
