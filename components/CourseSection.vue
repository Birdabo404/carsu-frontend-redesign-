<script setup lang="ts">
import { gsap } from "gsap";
import DitherPrint from "~/components/DitherPrint.vue";
import { mission, values, vision } from "~/data/portal";

const figure = ref<HTMLElement | null>(null);
const print = ref<InstanceType<typeof DitherPrint> | null>(null);
let ctx: gsap.Context | undefined;

onMounted(() => {
  if (!motionAllowed()) return;
  const developer = print.value!;
  const film = { progress: 0 };
  developer.develop(0);
  ctx = gsap.context(() => {
    gsap.to(film, {
      progress: 1,
      ease: "none",
      onUpdate: () => developer.develop(film.progress),
      scrollTrigger: { trigger: figure.value, start: "top 85%", end: "center 50%", scrub: 0.5 },
    });
  }, figure.value!);
});

onUnmounted(() => ctx?.revert());
</script>

<template>
  <SectionFrame id="course" index="02" name="Heading" tone="gold">
    <div class="grid gap-12 lg:grid-cols-12 lg:gap-16">
      <figure ref="figure" class="lg:col-span-6">
        <DitherPrint
          ref="print"
          src="/photos/campus-walkway.jpg"
          ink="#13213c"
          :cell="3"
          :focus-x="0.42"
          :gamma="0.85"
          class="aspect-[4/5] w-full"
        />
        <figcaption class="label-mono mt-4 flex justify-between gap-4 text-navy/70">
          <span>Fig. 02 · The covered walkway</span>
          <span class="whitespace-nowrap max-sm:hidden">Bayer 8×8 · 1-bit</span>
        </figcaption>
      </figure>

      <div class="flex flex-col lg:col-span-6">
        <div data-reveal>
          <p class="label-mono text-navy/70">Vision · Mission · Values</p>
          <h2 id="course-title" class="mt-5 text-h2 font-medium">The course we keep.</h2>
          <p class="mt-8 text-h3">{{ vision }}</p>
          <p class="mt-6 max-w-[56ch] text-navy/80">
            <span class="label-mono mr-3 text-navy">Mission</span>{{ mission }}
          </p>
        </div>

        <ol data-reveal class="mt-12 divide-y divide-navy/15 border-y border-navy/15 lg:mt-auto">
          <li v-for="value in values" :key="value.key" class="grid grid-cols-[56px_1fr] items-center gap-5 py-5">
            <span class="grid size-14 place-items-center bg-navy font-mono text-h3 text-gold">{{ value.key }}</span>
            <span>
              <span class="block text-lede font-medium">{{ value.name }}</span>
              <span class="mt-1 block text-sm text-navy/75">{{ value.gloss }}</span>
            </span>
          </li>
        </ol>
      </div>
    </div>
  </SectionFrame>
</template>
