// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  // Public URL of the deployment (canonical links, sitemap, .ics URLs). Set SITE_URL
  // for preview deployments; anything other than www.snesie.nl is kept out of search engines.
  site: process.env.SITE_URL || 'https://www.snesie.nl',
  trailingSlash: 'ignore',
  integrations: [sitemap({ filter: (page) => !page.includes('/admin/') })],
  prefetch: { prefetchAll: false, defaultStrategy: 'hover' },
  image: {
    // Self-hosted images are optimised at build time (sharp → webp/avif).
    responsiveStyles: false,
  },
  // Per-page CSS is small (~10 KB gzipped); inlining removes render-blocking requests.
  build: { inlineStylesheets: 'always' },
});
