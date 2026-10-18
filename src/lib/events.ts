import { getCollection } from 'astro:content';
import { parseLocal } from './dates';
import type { EventData } from './event-utils';

export * from './event-utils';

/** All events, sorted by start date. */
export async function getEvents(): Promise<EventData[]> {
  const entries = await getCollection('events');
  return entries
    .map((e) => ({ ...e.data, id: e.id }))
    .sort((a, b) => parseLocal(a.start).getTime() - parseLocal(b.start).getTime());
}

/** Manual archive of older events (combine with past events for "Eerdere events"). */
export async function getArchive() {
  const entries = await getCollection('eventArchive');
  return entries.map((e) => ({ ...e.data, id: e.id }));
}
