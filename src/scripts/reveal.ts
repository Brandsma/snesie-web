import { prefersReducedMotion } from './motion';

/**
 * Reveal-on-scroll for elements with [data-reveal] (optional data-delay in ms).
 * Elements already in view on load are left alone, so nothing above the fold
 * flashes. Without IntersectionObserver or with reduced motion, nothing is
 * hidden at all.
 */
export function initReveal(root: ParentNode = document) {
  if (prefersReducedMotion() || !('IntersectionObserver' in window)) return;

  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('is-revealed');
        io.unobserve(entry.target);
      }
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
  );

  const vh = window.innerHeight;
  root.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => {
    if (el.dataset.delay) el.style.setProperty('--reveal-delay', `${el.dataset.delay}ms`);
    if (el.getBoundingClientRect().top < vh) {
      el.classList.add('is-revealed');
      return;
    }
    io.observe(el);
  });

  document.documentElement.classList.add('js-reveal');
}
