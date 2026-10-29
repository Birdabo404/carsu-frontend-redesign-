<script setup lang="ts">
import { portal, services } from "~/data/portal";

function onEnter(event: MouseEvent, code: string) {
  if (!motionAllowed()) return;
  const cell = event.currentTarget as HTMLElement;
  const label = cell.querySelector<HTMLElement>("[data-code]");
  if (label) scramble(label, code);
  drawIcon(cell);
}
</script>

<template>
  <SectionFrame id="services" index="01" name="Services">
    <div data-reveal class="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
      <div>
        <p class="label-mono text-rust">Portal services</p>
        <h2 id="services-title" class="mt-5 max-w-[15ch] text-h2 font-medium">Everything the term asks of you.</h2>
      </div>
      <p class="max-w-[38ch] text-slate">
        Sign in once and every service is a step away. Each cell opens its page in MySchool.
      </p>
    </div>

    <ul data-reveal class="mt-14 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
      <li v-for="service in services" :key="service.code">
        <a
          :href="portal(service.path)"
          class="group flex h-full min-h-[260px] flex-col bg-paper p-6 transition-colors duration-300 hover:bg-navy hover:text-paper lg:p-8"
          @mouseenter="onEnter($event, service.code)"
        >
          <span class="flex items-start justify-between">
            <span data-code class="label-mono text-rust transition-colors group-hover:text-gold">{{ service.code }}</span>
            <LineIcon :name="service.icon" class="size-8 transition-colors group-hover:text-gold" />
          </span>
          <span class="mt-auto block pt-10 text-h3 font-medium">{{ service.title }}</span>
          <span class="mt-2 block text-sm text-slate transition-colors group-hover:text-paper/70">{{ service.summary }}</span>
          <span
            class="mt-6 flex items-center justify-between gap-4 border-t border-line pt-4 transition-colors group-hover:border-paper/15"
          >
            <span class="truncate font-mono text-label text-slate transition-colors group-hover:text-paper/60">
              {{ service.path }}
            </span>
            <span class="transition-transform duration-500 ease-out-quint group-hover:translate-x-1" aria-hidden="true">→</span>
          </span>
        </a>
      </li>
    </ul>
  </SectionFrame>
</template>
