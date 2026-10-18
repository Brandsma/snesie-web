import type { APIRoute, GetStaticPaths } from 'astro';
import { buildIcs, getEvents, type EventData } from '@/lib/events';

/** Static .ics file per event ("Zet in agenda" works without JavaScript). */
export const getStaticPaths = (async () => {
  const events = await getEvents();
  return events.map((event) => ({ params: { id: event.id }, props: { event } }));
}) satisfies GetStaticPaths;

export const GET: APIRoute = ({ props, site }) => {
  const { event } = props as { event: EventData };
  return new Response(buildIcs(event, site?.href ?? 'https://www.snesie.nl'), {
    headers: { 'Content-Type': 'text/calendar; charset=utf-8' },
  });
};
