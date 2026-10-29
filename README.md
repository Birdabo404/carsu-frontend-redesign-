# MySchool — Caraga State University

A redesigned landing page for [MySchool](https://myschool.carsu.edu.ph), the student portal of Caraga State University, Ampayon, Butuan City.

The concept is **Balangay of Knowledge**. The university seal is shaped like the balangay, so the page reads like a drafted chart: a hairline architectural grid, section waypoints, and campus photography rendered through ordered (Bayer) dithering. The palette is paper and navy with the official gold `#f9dc07` and orange `#ff9900`.

## Stack

- Nuxt 3, Vue 3, TypeScript
- Tailwind CSS v4 (tokens in `assets/css/main.css` under `@theme`)
- GSAP + ScrollTrigger for the hero sequence and scroll-linked dithering
- Anime.js for micro-interactions (icon line drawing, code scramble, copy feedback)
- Geist and Geist Mono via `@nuxt/fonts`

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

| Script              | Purpose                      |
| ------------------- | ---------------------------- |
| `npm run dev`       | Dev server on port 3000      |
| `npm run build`     | Production build             |
| `npm run preview`   | Preview the production build |
| `npm run typecheck` | Type-check with `vue-tsc`    |

## Structure

```
assets/css/main.css      Tailwind import, design tokens, base styles
components/
  SiteHeader.vue         Sticky header, compacts on scroll
  HeroSection.vue        Hero, intro timeline, quick access strip
  HeroPhoto.vue          Navy duotone photo with a dithered develop/dissolve layer
  DitherPrint.vue        1-bit ordered-dither print of a photo, with a develop control
  SectionFrame.vue       Section shell with the vertical index rail
  ServicesSection.vue    Portal services, linked to real MySchool routes
  CourseSection.vue      Vision, mission, and core values on the gold band
  SealSection.vue        The seal and its parts
  BulletinSection.vue    Notices and the registrar records request
  SupportSection.vue     Account support, registrar contact, survey
  SiteFooter.vue
  LineIcon.vue           Thin-stroke icon set
composables/
  dither.ts              Bayer matrix, image sampling, pixel helpers
  drawIcon.ts            Anime.js stroke drawing
  scramble.ts            Anime.js text scramble
  motion.ts              Reduced-motion gate
data/portal.ts           Links, services, bulletins, values, seal parts
pages/index.vue          Page assembly and section reveals
plugins/gsap.client.ts   Registers ScrollTrigger
public/brand/            Official CSU seal
public/photos/           Campus photography
```

## Editing content

All copy and links live in `data/portal.ts`. Update `bulletins` for new notices and `campus.term` each semester.

## Motion

Every motion moment is skipped under `prefers-reduced-motion`:

1. **Hero develop:** the campus photo resolves top to bottom behind a gold scan line while the headline rises.
2. **Hero dissolve:** scrolling past the hero dissolves the photo into paper through the dither.
3. **Gold band print:** the walkway print develops as it scrolls into view.
4. **Header and reveals:** the header compacts on scroll, and section content fades up once.
5. **Micro-interactions:** icons draw their strokes on hover, service codes scramble, and copying the registrar email confirms with a pop.

## Brand and assets

The seal comes from the official [university branding page](https://www.carsu.edu.ph/ovpeo/pico/university-branding/). Its guidelines forbid altering or overlaying the seal, so it always sits unaltered on a solid surface. Campus photos are from [carsu.edu.ph](https://www.carsu.edu.ph) and the current MySchool login page.
