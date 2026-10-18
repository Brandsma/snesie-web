# Snesie& website

Website of Stichting Snesie& (snesie.nl), built from the design handoff in
`../design_handoff_snesie_website`. Static [Astro](https://astro.build) site:
no UI framework, a few small vanilla TypeScript islands, self-hosted fonts,
images and documents.

## Quick start

```sh
nvm use            # Node 22 (see .nvmrc; Astro 6 needs ≥ 22.12)
npm install
npm run dev        # http://localhost:4321
npm test           # unit tests (vitest)
npm run build      # type-check + static build into dist/
npm run preview    # serve dist/
```

Copy `.env.example` to `.env` and set `PUBLIC_FORM_ENDPOINT` to receive the
contact form (any service that accepts a form POST and answers JSON, e.g.
Formspree). Without it the form opens the visitor's mail app instead.

## Structure

```
src/
  pages/              one file per route (/, /wij/, /events/, /events/[id]/, /events/[id].ics,
                      /thuis/, /media/, /blog/, /blog/[slug]/, /join-us/, /algemene-voorwaarden/, 404)
  layouts/BaseLayout  <head>/SEO, skip link, progress bar, header, footer, cookie notice
  components/         shared chrome (Header, Footer, CookieNotice, Lightbox) + per-page folders
  content/            editable content: events.json, event-archive.json, blog/*.json
  content.config.ts   schemas for that content (validated at build time)
  data/               fixed page data: timeline cards, example family tree
  lib/                build-time + shared helpers (dates, events, .ics, images, site constants)
  scripts/            client helpers: shared scroll loop, reveal-on-scroll, motion, cookie consent
  styles/global.css   design tokens and the few shared utility classes
  assets/img, fonts   source images (optimised to webp at build) and the CJK font subset
public/files          PDFs (timeline, family trees, flyer…)
public/admin          Decap CMS
```

Conventions:

- **Styling**: design tokens live in `:root` in `global.css` (`--ink`, `--blue`,
  `--paper`…). Component styles are scoped `<style>` blocks; responsive
  behaviour uses CSS media queries at the design's breakpoints (980px, 640px).
- **JavaScript** is progressive enhancement: every page is readable without it.
  Scroll-linked effects subscribe to `onScroll` (`src/scripts/scroll.ts`), one
  rAF-throttled loop for the whole page. Everything respects
  `prefers-reduced-motion` (the home timeline becomes a plain scrollable row).
- **Dates**: events are stored as Amsterdam wall-clock strings. Pages render
  with the build date, then a small script re-evaluates with the visitor's
  date (next event, countdowns, past/upcoming), so a stale build never shows a
  past event as upcoming. "Zet in agenda" links to static `.ics` files.
- **Images** are referenced by file name (`img('kickoff.jpg')`); an unknown name
  fails the build.
- **Privacy**: no third-party requests before consent. Fonts and images are
  self-hosted; the YouTube embed (Media) only loads after "cookies van derden"
  consent. Consent is stored in `localStorage['snesie-cookies']` and
  broadcast as the `snesie-cookies` event (`src/scripts/consent.ts`). Load any
  future analytics through `onConsent()` and only when `ana` is true.

## Content beheren (editing content)

Events, the event archive and blog posts are JSON files in `src/content/`.
Edit them directly, or through the CMS at `/admin/` (Decap CMS):

- **GitHub (current)**: editors log in with a GitHub account that has write access to
  the repo. Every save is a commit that triggers a rebuild (1–2 minutes). Login needs a
  small OAuth helper (GitHub OAuth app + e.g. a Cloudflare Worker); set its URL as
  `base_url` in `public/admin/config.yml`.
- **Netlify**: switch `backend` to `git-gateway` and enable Identity + Git Gateway.
- **Locally**: run `npx decap-server` next to `npm run dev` and open
  `http://localhost:4321/admin/`.

Notes for editors:

- An event without "Tekst eventpagina" gets no detail page; it then links to
  "Andere link" (or the agenda).
- Events in a series (`series`, e.g. the erfgoed-tori-oso's) link to each other.
  This field is not exposed in the CMS yet: set it in the JSON.
- Blog order is the "Volgorde" number (1 = first).

When you add a field, update both `src/content.config.ts` and
`public/admin/config.yml`.

## Deploying

`dist/` is plain static files, so any static host works.

- **GitHub Pages (current preview)**: `.github/workflows/deploy.yml` tests, builds and
  publishes on every push to `main`, at https://snesie.abebrandsma.com (`public/CNAME`).
  `SITE_URL` sets the deployment's URL; any host other than www.snesie.nl gets `noindex`
  and a closed robots.txt, so the preview never competes with the real site. Set
  `PUBLIC_FORM_ENDPOINT` as a repository variable (Settings → Secrets and variables →
  Actions → Variables).
- **Netlify**: `netlify.toml` has the build command, long-lived caching for `/_astro/*`
  and security headers (GitHub Pages ignores these).

When moving to snesie.nl: change `public/CNAME`, drop `SITE_URL` from the workflow (the
default is https://www.snesie.nl) and update DNS.

## Deviations from the design (deliberate)

- Event and blog pages are real URLs (`/events/oso-adam/`, `/blog/essay/`)
  instead of `#hash` routes (old `/blog/#slug` links redirect).
- "Ik wil…" interest chips and accordions use native checkboxes and
  `<details>`, styled as designed (they work without JavaScript).
- Contrast fixes where the design missed its own 4.5:1 target: the active
  timeline card (lighter tint + brighter border), the timeline legend
  (underline instead of 50% opacity) and small terracotta text on sand
  (darker terracotta `#963F20`).
- "In beeld" event columns are slightly wider (160px) so long titles don't collide.
- The YouTube video asks for consent before loading (README production note).

## Open items (content still needed)

From the handoff, still open:

1. Timeline dates/texts are DRAFT (`src/data/timeline.ts`); check against the timeline PDF.
2. Family tree people are fictional examples (`src/data/family-tree.ts`).
3. Oral-history audio (Wij, `AUDIO_SRC` in `src/components/wij/Stemmen.astro`) and the
   Thuis sounds (`SOUNDS` in `src/components/thuis/Soundboard.astro`) are placeholders.
4. Blog posts essay, symposium and comfortfood are incomplete and undated.
5. Volunteer copy on Join us is DRAFT.
6. Sign-up URLs still point to the old Wix pages; Rotterdam/Den Haag times are missing;
   confirm Den Haag (1 Nov 2026, PEP, Riviervismarkt 2).
7. `[KVK-nummer]` and `[Adres]` in `src/components/legal/docs.ts`.
8. YouTube links for the Hakka songs (Thuis, Muziek).
9. Set `PUBLIC_FORM_ENDPOINT`; no analytics is installed yet (hook it to consent).
