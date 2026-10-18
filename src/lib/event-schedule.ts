import { daysUntil, parseLocal } from './dates';

/**
 * Pure "what is upcoming / what is past" logic for the events pages. Used at
 * build time (with the build date) and again in the browser (with the
 * visitor's date), so both always agree.
 */

export interface Schedulable {
  id: string;
  start: string;
  deadline?: boolean;
}

/** Today or later (an event later today still counts as upcoming). */
export const isUpcoming = (start: string, now = new Date()) => daysUntil(parseLocal(start), now) >= 0;

const byStart = (a: Schedulable, b: Schedulable) => parseLocal(a.start).getTime() - parseLocal(b.start).getTime();

/**
 * The event for the "Volgende event" card: the first upcoming real event
 * (deadlines are skipped), else the first upcoming item. Undefined when
 * nothing is upcoming (the page then shows a "new events soon" card).
 */
export function pickNext<T extends Schedulable>(events: T[], now = new Date()): T | undefined {
  const sorted = [...events].sort(byStart);
  const upcoming = sorted.filter((e) => isUpcoming(e.start, now));
  return upcoming.find((e) => !e.deadline) ?? upcoming[0];
}

/** "6 dagen te gaan" — never negative. */
export function daysToGo(start: string, now = new Date()) {
  const days = Math.max(0, daysUntil(parseLocal(start), now));
  return { days, label: days === 1 ? 'dag te gaan' : 'dagen te gaan' };
}

export interface PastItem {
  date: string;
  title: string;
}

export interface YearGroup {
  year: number;
  items: (PastItem & { label: string })[];
}

const pad = (n: number) => String(n).padStart(2, '0');

/** Items before today, newest first, grouped by year; dates shown as dd-mm. */
export function groupPastByYear(items: PastItem[], now = new Date()): YearGroup[] {
  const past = items
    .filter((p) => !isUpcoming(p.date, now))
    .sort((a, b) => parseLocal(b.date).getTime() - parseLocal(a.date).getTime());
  const groups: YearGroup[] = [];
  for (const p of past) {
    const d = parseLocal(p.date);
    let g = groups.find((x) => x.year === d.getFullYear());
    if (!g) groups.push((g = { year: d.getFullYear(), items: [] }));
    g.items.push({ ...p, label: `${pad(d.getDate())}-${pad(d.getMonth() + 1)}` });
  }
  return groups;
}

/** The year that is open by default: the current year if present, else the most recent one. */
export function defaultOpenYear(years: number[], now = new Date()): number | undefined {
  if (years.includes(now.getFullYear())) return now.getFullYear();
  return years.length ? Math.max(...years) : undefined;
}

export const countLabel = (n: number) => `${n} ${n === 1 ? 'event' : 'events'}`;
