<script setup lang="ts">
import { bulletins, links } from "~/data/portal";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function formatDate(iso: string): string {
  const [year, month, day] = iso.split("-");
  return `${day} ${MONTHS[Number(month) - 1]} ${year}`;
}
</script>

<template>
  <SectionFrame id="bulletin" index="04" name="Bulletin">
    <div data-reveal>
      <p class="label-mono text-rust">Notices</p>
      <h2 id="bulletin-title" class="mt-5 text-h2 font-medium">Notices for the term.</h2>
    </div>

    <div class="mt-14 grid gap-12 lg:grid-cols-12">
      <ol data-reveal class="border-t border-navy lg:col-span-7">
        <li
          v-for="item in bulletins"
          :key="item.title"
          class="grid grid-cols-[96px_1fr] gap-6 border-b border-line py-7 md:grid-cols-[132px_1fr]"
        >
          <div>
            <time :datetime="item.date" class="label-mono block">{{ formatDate(item.date) }}</time>
            <span class="label-mono mt-2 inline-block bg-gold px-1.5 py-0.5 text-navy">{{ item.tag }}</span>
          </div>
          <div>
            <h3 class="text-lede font-medium">{{ item.title }}</h3>
            <p class="mt-2 max-w-[56ch] text-sm text-slate">{{ item.body }}</p>
          </div>
        </li>
      </ol>

      <aside data-reveal class="lg:col-span-5" aria-labelledby="records-title">
        <div class="border border-line bg-white">
          <div class="relative bg-orange">
            <DitherPrint
              src="/photos/campus-building.jpg"
              ink="#13213c"
              :cell="3"
              :focus-x="0.7"
              :focus-y="0.25"
              :gamma="0.9"
              class="h-44 w-full"
            />
            <p class="label-mono absolute left-0 top-0 bg-white px-3 py-2">Office of the University Registrar</p>
          </div>
          <div class="p-6 md:p-8">
            <h3 id="records-title" class="text-h3 font-medium">Online request for academic records</h3>
            <p class="mt-4 text-slate">
              Requests are open
              <strong class="font-medium text-navy">every working day, with a limited number of slots</strong>. Once
              slots fill, requests reopen the next working day. Submit early to secure yours.
            </p>

            <dl class="mt-8 grid grid-cols-2 border-y border-line font-mono text-sm">
              <div class="border-r border-line py-4 pr-4">
                <dt class="label-mono text-slate">Window</dt>
                <dd class="mt-1">Working days</dd>
              </div>
              <div class="py-4 pl-4">
                <dt class="label-mono text-slate">Slots</dt>
                <dd class="mt-1">Limited, daily</dd>
              </div>
            </dl>

            <a
              :href="links.records"
              class="group mt-8 inline-flex items-center gap-4 rounded-[4px] bg-orange py-1.5 pl-5 pr-1.5 font-medium text-navy transition-colors hover:bg-gold"
            >
              Request records
              <span
                class="grid size-9 place-items-center rounded-[3px] bg-navy text-paper transition-transform duration-500 ease-out-quint group-hover:translate-x-0.5"
                aria-hidden="true"
                >→</span
              >
            </a>
          </div>
        </div>
      </aside>
    </div>
  </SectionFrame>
</template>
