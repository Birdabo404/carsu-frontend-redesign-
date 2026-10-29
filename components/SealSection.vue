<script setup lang="ts">
import { sealManifest } from "~/data/portal";
</script>

<template>
  <SectionFrame id="seal" index="03" name="Seal" tone="white">
    <div class="grid gap-12 lg:grid-cols-12 lg:gap-16">
      <div data-reveal class="lg:col-span-5">
        <p class="label-mono text-rust">The balangay seal</p>
        <h2 id="seal-title" class="mt-5 text-h2 font-medium">A seal shaped like a boat.</h2>
        <p class="mt-6 max-w-[44ch] text-slate">
          The university seal takes the form of the balangay, the national boat of the Philippines, first unearthed in
          Butuan. Its vessel is named “Doon,” and every part of it carries a meaning.
        </p>

        <div class="relative mt-10 grid place-items-center border border-line bg-paper py-12">
          <span class="absolute left-3 top-3 size-3 border-l border-t border-navy/40" />
          <span class="absolute right-3 top-3 size-3 border-r border-t border-navy/40" />
          <span class="absolute bottom-3 left-3 size-3 border-b border-l border-navy/40" />
          <span class="absolute bottom-3 right-3 size-3 border-b border-r border-navy/40" />
          <img
            src="/brand/csu-seal.png"
            alt="Official seal of Caraga State University"
            width="435"
            height="720"
            loading="lazy"
            class="h-[clamp(220px,24vw,320px)] w-auto"
          />
          <p class="label-mono absolute bottom-3 left-1/2 -translate-x-1/2 text-slate">Est. 1946</p>
        </div>
      </div>

      <div data-reveal class="lg:col-span-7">
        <div class="border border-line">
          <div class="label-mono flex justify-between bg-navy px-5 py-3 text-paper">
            <span>seal.balangay / doon</span>
            <span class="text-gold">{{ sealManifest.length }} parts</span>
          </div>
          <dl class="divide-y divide-line">
            <div
              v-for="(item, i) in sealManifest"
              :key="item.part"
              class="grid grid-cols-[28px_1fr] gap-x-4 gap-y-1 px-5 py-4 transition-colors hover:bg-paper md:grid-cols-[32px_150px_1fr]"
            >
              <span class="font-mono text-sm text-slate">{{ String(i + 1).padStart(2, "0") }}</span>
              <dt class="font-mono text-sm font-medium">{{ item.part }}</dt>
              <dd class="col-start-2 text-sm text-slate md:col-start-3">{{ item.meaning }}</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  </SectionFrame>
</template>
