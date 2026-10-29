<script setup lang="ts">
import { gsap } from "gsap";
import HeroPhoto from "~/components/HeroPhoto.vue";
import { campus, links, portal, quickAccess } from "~/data/portal";

const root = ref<HTMLElement | null>(null);
const photo = ref<InstanceType<typeof HeroPhoto> | null>(null);
let ctx: gsap.Context | undefined;

function onCell(event: MouseEvent) {
  if (motionAllowed()) drawIcon(event.currentTarget as Element);
}

onMounted(async () => {
  const hero = photo.value!;
  if (!motionAllowed()) {
    await hero.ready();
    return;
  }

  hero.state.scan = 0;
  await Promise.all([hero.ready(), document.fonts.ready]);
  ctx = gsap.context(() => {
    gsap.set("[data-hero-photo]", { autoAlpha: 1 });
    gsap
      .timeline({ defaults: { ease: "power3.out", duration: 0.8 } })
      .to(hero.state, { scan: 1, duration: 1.7, ease: "power2.inOut", onUpdate: hero.draw }, 0)
      .fromTo("[data-hero-line] > span", { y: 0, yPercent: 110 }, { yPercent: 0, stagger: 0.08 }, 0.1)
      .fromTo("[data-hero-fade]", { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, stagger: 0.06, duration: 0.6 }, 0.4)
      .fromTo("[data-hero-cell]", { autoAlpha: 0, y: 32 }, { autoAlpha: 1, y: 0, stagger: 0.07, duration: 0.7 }, 0.7);

    gsap.to(hero.state, {
      shift: 1,
      ease: "none",
      onUpdate: hero.draw,
      scrollTrigger: { trigger: root.value, start: "top top", end: "bottom top", scrub: 0.4 },
    });
  }, root.value!);
});

onUnmounted(() => ctx?.revert());
</script>

<template>
  <section id="top" ref="root" aria-labelledby="hero-title" class="border-b border-line">
    <div class="grid lg:min-h-[calc(100dvh-72px)] lg:grid-cols-[64px_minmax(0,560px)_1fr] lg:grid-rows-[1fr_auto]">
      <aside class="hidden border-r border-line py-8 lg:row-span-2 lg:flex lg:flex-col lg:items-center lg:justify-between">
        <span class="label-mono rotate-180 text-slate [writing-mode:vertical-rl]">
          {{ campus.coordinates }} — Ampayon, Butuan City
        </span>
        <a href="#services" class="label-mono rotate-180 text-navy [writing-mode:vertical-rl] hover:text-rust">
          Scroll
        </a>
      </aside>

      <div class="gutter relative z-10 flex flex-col justify-center py-14 lg:py-12">
        <p data-hero-fade class="label-mono flex items-center gap-3 text-slate">
          <span class="size-1.5 bg-orange" />
          Bugsay, Golden Paddler
        </p>

        <h1 id="hero-title" class="mt-8 text-h1 font-medium">
          <span data-hero-line class="block overflow-hidden pb-[0.06em]"><span class="block">Chart your</span></span>
          <span data-hero-line class="block overflow-hidden pb-[0.06em]"><span class="block">course</span></span>
          <span data-hero-line class="block overflow-hidden pb-[0.06em]">
            <span class="block">through <span class="bg-gold px-[0.08em]">CSU.</span></span>
          </span>
        </h1>

        <p data-hero-fade class="mt-7 max-w-[40ch] text-lede text-slate">
          The student portal of Caraga State University. Grades, enrollment, schedules, balances, and registrar
          requests for every Golden Paddler.
        </p>

        <div data-hero-fade class="mt-10 flex flex-wrap items-center gap-3">
          <a
            :href="links.login"
            class="group inline-flex items-center gap-4 rounded-[4px] bg-navy py-1.5 pl-5 pr-1.5 font-medium text-paper transition-colors hover:bg-navy-2"
          >
            Sign in to MySchool
            <span
              class="grid size-9 place-items-center rounded-[3px] bg-gold text-navy transition-transform duration-500 ease-out-quint group-hover:translate-x-0.5"
              aria-hidden="true"
              >→</span
            >
          </a>
          <a
            :href="links.activate"
            class="inline-flex h-12 items-center rounded-[4px] border border-navy/25 px-5 transition-colors hover:border-navy"
          >
            Activate account
          </a>
        </div>
      </div>

      <div data-hero-photo class="relative min-h-[420px] max-lg:border-t max-lg:border-line">
        <HeroPhoto
          ref="photo"
          src="/photos/campus-building.jpg"
          alt="A louvered academic building on the Caraga State University main campus in Ampayon"
          :focus-x="0.62"
          :focus-y="0.35"
          class="absolute inset-0"
        />
        <p class="label-mono absolute right-0 top-0 bg-paper px-3 py-2 text-navy">Fig. 01 · Main Campus, Ampayon</p>
      </div>

      <div class="grid border-t border-line bg-paper sm:grid-cols-2 lg:col-span-2 lg:col-start-2 lg:grid-cols-4">
        <a
          v-for="(item, i) in quickAccess"
          :key="item.code"
          data-hero-cell
          :href="portal(item.path)"
          class="group flex flex-col justify-between border-b border-line p-6 transition-colors duration-300 hover:bg-navy hover:text-paper sm:border-r lg:border-b-0 lg:p-7"
          @mouseenter="onCell"
        >
          <span class="flex items-start justify-between">
            <span class="label-mono text-slate transition-colors group-hover:text-gold">
              0{{ i + 1 }} · {{ item.code }}
            </span>
            <LineIcon :name="item.icon" class="size-7 transition-colors group-hover:text-gold" />
          </span>
          <span class="mt-8 block">
            <span class="flex items-center justify-between text-lede font-medium">
              {{ item.title }}
              <span class="transition-transform duration-500 ease-out-quint group-hover:translate-x-1" aria-hidden="true">→</span>
            </span>
            <span class="mt-1 block text-sm text-slate transition-colors group-hover:text-paper/70">{{ item.summary }}</span>
          </span>
        </a>

        <div data-hero-cell class="flex items-center gap-5 bg-white p-6 lg:p-7">
          <img src="/brand/csu-seal.png" alt="Official seal of Caraga State University" width="435" height="720" class="h-24 w-auto" />
          <div>
            <p class="font-medium leading-tight">Caraga State University</p>
            <p class="label-mono mt-2 text-slate">Est. 1946 · Butuan City</p>
            <p class="mt-3 text-sm text-slate">Competence · Service · Uprightness</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
