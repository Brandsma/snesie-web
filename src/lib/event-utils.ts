import { parseLocal, hasTime } from './dates';
import type { CollectionEntry } from 'astro:content';

/**
 * Pure event helpers (no astro:content runtime import), usable in pages,
 * client scripts and unit tests.
 */
export type EventData = CollectionEntry<'events'>['data'] & { id: string };

export const hasDetailPage = (e: EventData) => !!e.body?.length;

/** Where an event in a list should link to. */
export function eventHref(e: EventData): string {
  if (e.link) return e.link;
  return hasDetailPage(e) ? `/events/${e.id}/` : '/events/';
}

export const icsHref = (e: EventData) => `/events/${e.id}.ics`;

export const mapsHref = (e: EventData) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(e.address ?? e.where)}`;

/** Title used for "next event" teasers. */
export const teaserTitle = (e: EventData) => e.homeTitle ?? e.listTitle;

/* ---------- iCalendar ---------- */

const pad = (n: number) => String(n).padStart(2, '0');

/** Convert an Amsterdam wall-clock time to a UTC iCal timestamp (…Z). */
function amsterdamToUtc(y: number, m: number, d: number, h: number, min: number): string {
  // Find the Amsterdam offset for that moment via Intl, then shift.
  const guess = Date.UTC(y, m - 1, d, h, min);
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/Amsterdam',
    hourCycle: 'h23',
    year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit',
  }).formatToParts(new Date(guess));
  const get = (t: string) => Number(parts.find((p) => p.type === t)!.value);
  const asLocal = Date.UTC(get('year'), get('month') - 1, get('day'), get('hour'), get('minute'));
  const utc = new Date(guess - (asLocal - guess));
  return `${utc.getUTCFullYear()}${pad(utc.getUTCMonth() + 1)}${pad(utc.getUTCDate())}T${pad(utc.getUTCHours())}${pad(utc.getUTCMinutes())}00Z`;
}

const escapeIcs = (s: string) => s.replace(/\\/g, '\\\\').replace(/;/g, '\;').replace(/,/g, '\\,').replace(/\n/g, '\\n');

/** Fold lines longer than 75 octets, as required by RFC 5545. */
function fold(line: string): string {
  const bytes = new TextEncoder().encode(line);
  if (bytes.length <= 75) return line;
  const out: string[] = [];
  let cur = '';
  for (const ch of line) {
    if (new TextEncoder().encode(cur + ch).length > (out.length ? 74 : 75)) {
      out.push(cur);
      cur = ch;
    } else cur += ch;
  }
  out.push(cur);
  return out.join('\r\n ');
}

export function buildIcs(e: EventData, site: string, now = new Date()): string {
  const [date] = e.start.split('T');
  const [y, m, d] = date.split('-').map(Number);
  const ymd = `${y}${pad(m)}${pad(d)}`;
  const lines = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Snesie&//NL', 'CALSCALE:GREGORIAN', 'BEGIN:VEVENT', `UID:${e.id}@snesie.nl`];
  lines.push(`DTSTAMP:${now.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')}`);
  if (hasTime(e.start)) {
    const start = parseLocal(e.start);
    const [eh, em] = (e.end ?? `${pad(start.getHours() + 2)}:${pad(start.getMinutes())}`).split(':').map(Number);
    lines.push(`DTSTART:${amsterdamToUtc(y, m, d, start.getHours(), start.getMinutes())}`);
    lines.push(`DTEND:${amsterdamToUtc(y, m, d, eh, em)}`);
  } else {
    const next = new Date(Date.UTC(y, m - 1, d + 1));
    lines.push(`DTSTART;VALUE=DATE:${ymd}`);
    lines.push(`DTEND;VALUE=DATE:${next.getUTCFullYear()}${pad(next.getUTCMonth() + 1)}${pad(next.getUTCDate())}`);
  }
  lines.push(`SUMMARY:${escapeIcs(`${e.title} (Snesie&)`)}`);
  lines.push(`LOCATION:${escapeIcs(e.where)}`);
  const href = eventHref(e);
  lines.push(`URL:${href.startsWith('/') ? new URL(href, site).href : href}`);
  lines.push('END:VEVENT', 'END:VCALENDAR');
  return lines.map(fold).join('\r\n') + '\r\n';
}
