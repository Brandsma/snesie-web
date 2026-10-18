// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://www.snesie.nl',
  trailingSlash: 'ignore',
  integrations: [sitemap()],
  prefetch: { prefetchAll: false, defaultStrategy: 'hover' },
  image: {
    // Self-hosted images are optimised at build time (sharp → webp/avif).
    responsiveStyles: false,
  },
  // Per-page CSS is small (~10 KB gzipped); inlining removes render-blocking requests.
  build: { inlineStylesheets: 'always' },
});
