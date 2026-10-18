/** Whether the visitor asked for reduced motion. Re-evaluated on every call. */
export function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/** Desktop/mobile breakpoint used across the site (matches the design: 980px). */
export const DESKTOP_QUERY = '(min-width: 980px)';

export const isDesktop = () => window.matchMedia(DESKTOP_QUERY).matches;

export const clamp = (v: number, min = 0, max = 1) => Math.max(min, Math.min(max, v));
