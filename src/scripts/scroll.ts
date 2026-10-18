/**
 * One shared, rAF-throttled scroll/resize loop. Components subscribe instead
 * of each adding their own listeners, so a scroll triggers at most one batch
 * of DOM work per frame.
 */
type Listener = (y: number) => void;

const listeners = new Set<Listener>();
let frame = 0;

function run() {
  frame = 0;
  const y = window.scrollY;
  listeners.forEach((fn) => fn(y));
}

function schedule() {
  if (!frame) frame = requestAnimationFrame(run);
}

let bound = false;

/** Subscribe to scroll/resize. Calls the listener once immediately. Returns an unsubscribe function. */
export function onScroll(fn: Listener): () => void {
  if (!bound) {
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule, { passive: true });
    bound = true;
  }
  listeners.add(fn);
  fn(window.scrollY);
  return () => listeners.delete(fn);
}
