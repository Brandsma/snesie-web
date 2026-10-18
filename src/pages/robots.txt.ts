import type { APIRoute } from 'astro';
import { isIndexable } from '@/lib/site';

/** robots.txt: open on the real domain, closed on preview deployments. */
export const GET: APIRoute = ({ site }) => {
  const body = isIndexable(site)
    ? `User-agent: *\nAllow: /\nDisallow: /admin/\n\nSitemap: ${new URL('/sitemap-index.xml', site)}\n`
    : 'User-agent: *\nDisallow: /\n';
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
