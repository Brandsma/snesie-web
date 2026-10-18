/**
 * Date helpers shared by build-time rendering and client scripts. Event times
 * are stored as local Amsterdam wall-clock strings ("2026-10-17T13:00" or
 * "2026-10-17"); everything here treats them as local dates so that the
 * visitor's "today" decides what is upcoming.
 */

export const MONTHS_SHORT = ['jan', 'feb', 'mrt', 'apr', 'mei', 'jun', 'jul', 'aug', 'sep', 'okt', 'nov', 'dec'];

/** Parse "YYYY-MM-DD" or "YYYY-MM-DDTHH:mm" as a local date (no UTC shift). */
export function parseLocal(value: string): Date {
  const [d, t] = value.split('T');
  const [y, m, day] = d.split('-').map(Number);
  const [h, min] = t ? t.split(':').map(Number) : [0, 0];
  return new Date(y, m - 1, day, h, min);
}

export function hasTime(value: string): boolean {
  return value.includes('T');
}

/** Midnight today in the visitor's timezone. */
export function today(now = new Date()): Date {
  const d = new Date(now);
  d.setHours(0, 0, 0, 0);
  return d;
}

function midnight(d: Date): Date {
  const c = new Date(d);
  c.setHours(0, 0, 0, 0);
  return c;
}

/** Whole calendar days from today until the given date (negative = past). */
export function daysUntil(date: Date, now = new Date()): number {
  return Math.round((midnight(date).getTime() - today(now).getTime()) / 864e5);
}

export function isPast(date: Date, now = new Date()): boolean {
  return daysUntil(date, now) < 0;
}

const capitalise = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

/** "Zaterdag 17 oktober 2026" */
export function formatLong(date: Date, { year = true, capital = true } = {}): string {
  const s = date.toLocaleDateString('nl-NL', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    ...(year ? { year: 'numeric' } : {}),
  });
  return capital ? capitalise(s) : s;
}

/** "Nog 6 dagen" / "Morgen" / "Vandaag!" / "Geweest" */
export function countdownLabel(date: Date, now = new Date()): string {
  const days = daysUntil(date, now);
  if (days < 0) return 'Geweest';
  if (days === 0) return 'Vandaag!';
  if (days === 1) return 'Morgen';
  return `Nog ${days} dagen`;
}

/** First Sunday of the month on or after today. */
export function nextFirstSunday(now = new Date()): Date {
  const t = today(now);
  for (let i = 0; i < 3; i++) {
    const d = new Date(t.getFullYear(), t.getMonth() + i, 1);
    d.setDate(1 + ((7 - d.getDay()) % 7));
    if (d >= t) return d;
  }
  return t;
}
