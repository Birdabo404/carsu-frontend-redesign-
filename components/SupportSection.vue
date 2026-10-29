<script setup lang="ts">
import { animate } from "animejs";
import { campus, links } from "~/data/portal";

const copied = ref(false);
const copyLabel = ref<HTMLElement | null>(null);
let resetTimer: ReturnType<typeof setTimeout> | undefined;

async function copyEmail() {
  await navigator.clipboard.writeText(campus.registrarEmail);
  copied.value = true;
  if (motionAllowed() && copyLabel.value) {
    animate(copyLabel.value, { scale: { from: 0.8, to: 1 }, opacity: { from: 0.3, to: 1 }, duration: 400, ease: "outBack" });
  }
  clearTimeout(resetTimer);
  resetTimer = setTimeout(() => (copied.value = false), 2000);
}

function onEnter(event: MouseEvent) {
  if (motionAllowed()) drawIcon(event.currentTarget as Element);
}

onUnmounted(() => clearTimeout(resetTimer));
</script>

<template>
  <SectionFrame id="support" index="05" name="Support" tone="white">
    <div class="grid gap-12 lg:grid-cols-12">
      <div data-reveal class="lg:col-span-4">
        <p class="label-mono text-rust">Help desk</p>
        <h2 id="support-title" class="mt-5 text-h2 font-medium">Need a hand?</h2>
        <p class="mt-6 max-w-[34ch] text-slate">
          Most sign-in problems are solved in minutes. Pick the channel that fits your concern.
        </p>
      </div>

      <ul data-reveal class="grid gap-px border border-line bg-line md:grid-cols-2 lg:col-span-8">
        <li class="flex flex-col bg-paper p-6 md:p-8" @mouseenter="onEnter">
          <LineIcon name="support" class="size-8" />
          <h3 class="mt-8 text-lede font-medium">Account support</h3>
          <p class="mt-2 flex-1 text-sm text-slate">Locked out, activation problems, or password resets.</p>
          <a
            :href="links.accountSupport"
            target="_blank"
            rel="noopener"
            class="mt-8 self-start text-sm font-medium text-rust underline-offset-4 hover:underline"
          >
            Message ICT4RM ↗
          </a>
        </li>

        <li class="flex flex-col bg-paper p-6 md:p-8" @mouseenter="onEnter">
          <LineIcon name="mail" class="size-8" />
          <h3 class="mt-8 text-lede font-medium">University Registrar</h3>
          <p class="mt-2 flex-1 text-sm text-slate">TOR, certifications, and corrections to your academic records.</p>
          <div class="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-sm">
            <a :href="`mailto:${campus.registrarEmail}`" class="underline-offset-4 hover:underline">
              {{ campus.registrarEmail }}
            </a>
            <button
              type="button"
              class="label-mono rounded-[3px] border border-navy/25 px-2 py-1 transition-colors hover:border-navy hover:bg-gold"
              @click="copyEmail"
            >
              <span ref="copyLabel" class="inline-block" aria-live="polite">{{ copied ? "Copied" : "Copy" }}</span>
            </button>
          </div>
          <a
            :href="`tel:${campus.registrarPhone.replaceAll(' ', '')}`"
            class="mt-2 font-mono text-sm text-slate hover:text-navy"
          >
            {{ campus.registrarPhone }}
          </a>
        </li>

        <li
          class="flex flex-col gap-6 bg-paper p-6 md:col-span-2 md:flex-row md:items-end md:justify-between md:p-8"
          @mouseenter="onEnter"
        >
          <div>
            <LineIcon name="survey" class="size-8" />
            <h3 class="mt-8 text-lede font-medium">MySchool account survey</h3>
            <p class="mt-2 max-w-[48ch] text-sm text-slate">
              Share your experience and ideas. Your feedback helps the university meet student needs better.
            </p>
          </div>
          <a
            :href="links.survey"
            class="inline-flex h-12 shrink-0 items-center self-start rounded-[4px] bg-navy px-5 text-sm font-medium text-paper transition-colors hover:bg-navy-2 md:self-auto"
          >
            Take the survey on MySchool
          </a>
        </li>
      </ul>
    </div>
  </SectionFrame>
</template>
