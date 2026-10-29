<script setup lang="ts">
type Tone = "paper" | "white" | "gold";

withDefaults(defineProps<{ id: string; index: string; name: string; tone?: Tone }>(), { tone: "paper" });

const TONES: Record<Tone, { section: string; rule: string }> = {
  paper: { section: "bg-paper", rule: "border-line" },
  white: { section: "bg-white", rule: "border-line" },
  gold: { section: "bg-gold", rule: "border-navy/15" },
};
</script>

<template>
  <section :id="id" :aria-labelledby="`${id}-title`" class="border-b" :class="[TONES[tone].section, TONES[tone].rule]">
    <div class="lg:grid lg:grid-cols-[64px_minmax(0,1fr)]">
      <div class="hidden border-r lg:flex lg:flex-col lg:items-center lg:gap-4 lg:py-12" :class="TONES[tone].rule">
        <span class="label-mono text-navy">{{ index }}</span>
        <span class="h-12 w-px bg-navy/25" />
        <span class="label-mono rotate-180 text-navy/60 [writing-mode:vertical-rl]">{{ name }}</span>
      </div>
      <div class="gutter py-20 lg:py-28">
        <slot />
      </div>
    </div>
  </section>
</template>
