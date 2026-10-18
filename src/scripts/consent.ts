/**
 * Cookie consent state. Stored as { ana, third, date } in
 * localStorage['snesie-cookies']; changes are broadcast with the
 * 'snesie-cookies' window event. Anything that sets non-functional cookies
 * (analytics, YouTube, social embeds) must check this first.
 */
export interface Consent {
  ana: boolean;
  third: boolean;
  date: string;
}

export const CONSENT_KEY = 'snesie-cookies';
export const CONSENT_EVENT = 'snesie-cookies';
export const OPEN_EVENT = 'snesie-cookies-open';

export function readConsent(): Consent | null {
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    return raw ? (JSON.parse(raw) as Consent) : null;
  } catch {
    return null;
  }
}

export function saveConsent(ana: boolean, third: boolean): Consent {
  const value: Consent = { ana, third, date: new Date().toISOString() };
  try {
    localStorage.setItem(CONSENT_KEY, JSON.stringify(value));
  } catch {
    /* storage unavailable (private mode): consent lasts for this page view */
  }
  window.dispatchEvent(new CustomEvent<Consent>(CONSENT_EVENT, { detail: value }));
  return value;
}

/** Calls fn with the current consent and on every change. */
export function onConsent(fn: (c: Consent | null) => void): () => void {
  const handler = (e: Event) => fn((e as CustomEvent<Consent>).detail);
  window.addEventListener(CONSENT_EVENT, handler);
  fn(readConsent());
  return () => window.removeEventListener(CONSENT_EVENT, handler);
}

export const hasThirdPartyConsent = () => !!readConsent()?.third;

export function openCookieSettings() {
  window.dispatchEvent(new Event(OPEN_EVENT));
}
