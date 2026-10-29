<script setup lang="ts">
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { links, sections } from "~/data/portal";

const scrolled = ref(false);
const open = ref(false);
let trigger: ScrollTrigger | undefined;

onMounted(() => {
  trigger = ScrollTrigger.create({
    start: 24,
    end: "max",
    onToggle: (self) => (scrolled.value = self.isActive),
  });
});

onUnmounted(() => trigger?.kill());
</script>

<template>
  <header
    class="sticky top-0 z-40 border-b border-line transition-[background-color,box-shadow] duration-500 ease-out-quint"
    :class="scrolled || open ? 'bg-paper/90 shadow-[0_12px_32px_-24px_rgba(19,33,60,0.35)] backdrop-blur-md' : 'bg-paper'"
  >
    <div
      class="grid grid-cols-[1fr_auto] transition-[height] duration-500 ease-out-quint lg:grid-cols-[64px_minmax(0,560px)_1fr]"
      :class="scrolled ? 'h-14' : 'h-[72px]'"
    >
      <div class="hidden place-items-center border-r border-line lg:grid">
        <span class="size-2.5 bg-orange" />
      </div>

      <a href="#top" class="gutter flex items-center gap-3" aria-label="Caraga State University MySchool, back to top">
        <img src="/brand/csu-seal-sm.png" alt="" width="97" height="160" class="h-9 w-auto" />
        <span class="leading-tight">
          <span class="block whitespace-nowrap text-sm font-medium">
            <span class="sm:hidden">CSU</span><span class="max-sm:hidden">Caraga State University</span>
          </span>
          <span class="label-mono block text-slate">MySchool</span>
        </span>
      </a>

      <div class="gutter flex items-center justify-end gap-8 lg:justify-between lg:border-l lg:border-line">
        <nav aria-label="Sections" class="hidden lg:block">
          <ul class="flex items-center gap-7 text-sm">
            <li v-for="item in sections" :key="item.id">
              <a :href="`#${item.id}`" class="group flex items-baseline gap-1.5 text-slate transition-colors hover:text-navy">
                <span class="font-mono text-[11px] text-navy/40 transition-colors group-hover:text-rust">{{ item.index }}</span>
                {{ item.label }}
              </a>
            </li>
          </ul>
        </nav>

        <div class="flex items-center gap-5">
          <a
            :href="links.university"
            class="hidden text-sm text-slate transition-colors hover:text-navy xl:inline"
            target="_blank"
            rel="noopener"
          >
            carsu.edu.ph ↗
          </a>
          <a
            :href="links.login"
            class="rounded-[4px] bg-navy px-4 py-2 text-sm font-medium text-paper transition-colors hover:bg-navy-2"
          >
            Sign in
          </a>
          <button
            type="button"
            class="label-mono lg:hidden"
            :aria-expanded="open"
            aria-controls="mobile-nav"
            @click="open = !open"
          >
            {{ open ? "Close" : "Menu" }}
          </button>
        </div>
      </div>
    </div>

    <nav v-show="open" id="mobile-nav" aria-label="Sections" class="border-t border-line lg:hidden">
      <ul class="gutter py-4">
        <li v-for="item in sections" :key="item.id">
          <a :href="`#${item.id}`" class="flex items-baseline gap-3 py-3 text-lede" @click="open = false">
            <span class="font-mono text-label text-rust">{{ item.index }}</span>
            {{ item.label }}
          </a>
        </li>
        <li>
          <a :href="links.university" class="block py-3 text-slate" target="_blank" rel="noopener">carsu.edu.ph ↗</a>
        </li>
      </ul>
    </nav>
  </header>
</template>
