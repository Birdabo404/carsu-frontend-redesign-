import tailwindcss from "@tailwindcss/vite";

const enableMotion =
  "if(!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('motion')";

export default defineNuxtConfig({
  compatibilityDate: "2026-10-01",
  devtools: { enabled: false },
  modules: ["@nuxt/fonts"],
  css: ["~/assets/css/main.css"],
  vite: { plugins: [tailwindcss()] },
  fonts: {
    families: [
      { name: "Geist", provider: "google", weights: [400, 500, 600] },
      { name: "Geist Mono", provider: "google", weights: [400, 500] },
    ],
  },
  app: {
    head: {
      htmlAttrs: { lang: "en" },
      title: "MySchool — Caraga State University Student Portal",
      meta: [
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          name: "description",
          content:
            "MySchool is the student portal of Caraga State University, Butuan City: grades, enrollment, class schedules, balances, and academic records requests.",
        },
        { name: "theme-color", content: "#f5f2ea" },
      ],
      link: [{ rel: "icon", type: "image/png", href: "/favicon.png" }],
      script: [{ innerHTML: enableMotion, tagPosition: "head" }],
    },
  },
});
