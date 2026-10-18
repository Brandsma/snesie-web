import { getCollection, type CollectionEntry } from 'astro:content';
import { MONTHS_SHORT } from '@/lib/dates';

export type Post = CollectionEntry<'blog'>;

/** All posts in editorial order (the `order` field). */
export async function getPosts(): Promise<Post[]> {
  return (await getCollection('blog')).sort((a, b) => a.data.order - b.data.order);
}

/** "2026-10-10" → "10 okt 2026"; empty string when the post has no date. */
export function formatPostDate(iso?: string): string {
  if (!iso) return '';
  const [y, m, d] = iso.split('-').map(Number);
  return `${d} ${MONTHS_SHORT[m - 1]} ${y}`;
}

export const postHref = (p: Post) => `/blog/${p.id}/`;
