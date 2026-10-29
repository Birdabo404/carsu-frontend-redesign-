<script setup lang="ts">
import { campus, links } from "~/data/portal";

const columns = [
  {
    title: "Portal",
    items: [
      { label: "Sign in", href: links.login },
      { label: "Activate account", href: links.activate },
      { label: "Request records", href: links.records },
    ],
  },
  {
    title: "University",
    items: [
      { label: "carsu.edu.ph", href: links.university },
      { label: "About CSU", href: links.about },
      { label: "Brand guidelines", href: links.branding },
    ],
  },
  {
    title: "Contact",
    items: [
      { label: "Registrar", href: `mailto:${campus.registrarEmail}` },
      { label: "ICT4RM support", href: links.accountSupport },
    ],
  },
];
</script>

<template>
  <footer class="bg-paper-2">
    <div class="relative bg-gold">
      <DitherPrint
        src="/photos/admin-building.jpg"
        ink="#13213c"
        :cell="3"
        :focus-y="0.62"
        :gamma="0.9"
        :white="0.72"
        class="h-[clamp(180px,22vw,300px)] w-full"
      />
      <p class="label-mono absolute bottom-0 left-0 bg-paper-2 px-3 py-2">Fig. 03 · Administration Building</p>
      <p
        class="absolute bottom-0 right-0 bg-navy px-[clamp(16px,3vw,40px)] py-3 text-h2 font-medium text-gold"
        aria-hidden="true"
      >
        Bugsay!
      </p>
    </div>

    <div class="gutter grid gap-12 py-16 lg:grid-cols-12">
      <div class="flex gap-5 lg:col-span-5">
        <img src="/brand/csu-seal-sm.png" alt="Caraga State University seal" width="97" height="160" class="h-20 w-auto" />
        <div>
          <p class="font-medium">Caraga State University</p>
          <p class="mt-1 text-sm text-slate">{{ campus.address }}</p>
          <p class="label-mono mt-4 text-slate">{{ campus.coordinates }}</p>
        </div>
      </div>

      <nav aria-label="Footer" class="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-7">
        <div v-for="column in columns" :key="column.title">
          <p class="label-mono text-rust">{{ column.title }}</p>
          <ul class="mt-4 space-y-3 text-sm">
            <li v-for="item in column.items" :key="item.label">
              <a :href="item.href" class="text-slate transition-colors hover:text-navy">{{ item.label }}</a>
            </li>
          </ul>
        </div>
      </nav>
    </div>

    <div class="border-t border-line">
      <div class="gutter label-mono flex flex-col gap-2 py-6 text-slate sm:flex-row sm:justify-between">
        <span>© 2026 Caraga State University</span>
        <span>Competence · Service · Uprightness</span>
        <span>{{ campus.term }}</span>
      </div>
    </div>
  </footer>
</template>
