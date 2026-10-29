<script setup lang="ts">
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const main = ref<HTMLElement | null>(null);
let ctx: gsap.Context | undefined;

onMounted(() => {
  if (!motionAllowed()) return;
  const reveal = (batch: Element[]) =>
    gsap.to(batch, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out", stagger: 0.08 });
  ctx = gsap.context(() => {
    ScrollTrigger.batch("[data-reveal]", { start: "top 88%", onEnter: reveal, onEnterBack: reveal });
  }, main.value!);
});

onUnmounted(() => ctx?.revert());
</script>

<template>
  <div>
    <a
      href="#main"
      class="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-[4px] focus:bg-gold focus:px-4 focus:py-2 focus:text-ink"
    >
      Skip to content
    </a>
    <SiteHeader />
    <main id="main" ref="main">
      <HeroSection />
      <ServicesSection />
      <CourseSection />
      <SealSection />
      <BulletinSection />
      <SupportSection />
    </main>
    <SiteFooter />
  </div>
</template>
