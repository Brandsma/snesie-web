import type { ImageMetadata } from 'astro';

/**
 * All self-hosted images live in src/assets/img and are referenced by file
 * name (e.g. "kickoff.jpg") from pages and content files. Astro optimises them
 * at build time. An unknown name fails the build instead of shipping a broken
 * image.
 */
const files = import.meta.glob<{ default: ImageMetadata }>('/src/assets/img/*.{jpg,jpeg,png,webp,avif}', {
  eager: true,
});

const byName = new Map<string, ImageMetadata>(
  Object.entries(files).map(([path, mod]) => [path.split('/').pop()!, mod.default]),
);

/** Look up an image by file name; a path ("src/assets/img/x.jpg") also works. */
export function img(name: string): ImageMetadata {
  const found = byName.get(name.split('/').pop()!);
  if (!found) {
    throw new Error(`Image "${name}" not found in src/assets/img. Available: ${[...byName.keys()].join(', ')}`);
  }
  return found;
}

export const imageNames = () => [...byName.keys()];
