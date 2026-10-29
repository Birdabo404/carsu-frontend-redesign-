<script setup lang="ts">
import type { IconName } from "~/data/portal";

defineProps<{ name: IconName }>();

const CIRCLE = "M12 4a8 8 0 1 0 0 16a8 8 0 1 0 0-16";

const PATHS: Record<IconName, string[]> = {
  grades: ["M6 3.5h8.5L18 7v13.5H6z", "M14.5 3.5V7H18", "M9 13.5l2 2 4-4.5"],
  enrollment: ["M4 6.5h16v13H4z", "M4 10.5h16", "M8.5 4v4.5", "M15.5 4v4.5", "M12 13v4", "M10 15h4"],
  schedule: [CIRCLE, "M12 8v4.5l3 2"],
  balances: ["M6 3.5h12v17l-3-2-3 2-3-2-3 2z", "M9 8.5h6", "M9 12h6", "M9 15.5h3"],
  records: ["M8 6.5h11v14H8z", "M5 3.5h11v3", "M5 3.5v14h3", "M11 11h5", "M11 14.5h5"],
  evaluation: ["M12 4l2.4 5 5.4.6-4 3.7 1.1 5.4L12 16l-4.9 2.7 1.1-5.4-4-3.7 5.4-.6z"],
  support: [
    CIRCLE,
    "M12 8.5a3.5 3.5 0 1 0 0 7a3.5 3.5 0 1 0 0-7",
    "M6.4 6.4l3.1 3.1",
    "M14.5 14.5l3.1 3.1",
    "M17.6 6.4l-3.1 3.1",
    "M9.5 14.5l-3.1 3.1",
  ],
  mail: ["M4 6.5h16v11H4z", "M4 7l8 6 8-6"],
  survey: ["M4.5 5.5h15v10h-8l-4 3.5v-3.5h-3z", "M8 9.5h8", "M8 12.5h5"],
};
</script>

<template>
  <svg
    data-icon
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.25"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <path v-for="d in PATHS[name]" :key="d" :d="d" />
  </svg>
</template>
