import { describe, expect, it } from 'vitest';
import { buildIcs, eventHref, type EventData } from './event-utils';

const base: EventData = {
  id: 'test',
  type: 'Kick-off',
  city: 'Rotterdam',
  title: 'Test, met komma',
  listTitle: 'Test',
  start: '2026-10-17T13:00',
  end: '17:30',
  deadline: false,
  venue: 'Bieb',
  where: 'Librijesteeg 4, Rotterdam',
  image: 'kickoff.jpg',
  price: 'Gratis',
  summary: '…',
  cta: 'Meer info →',
  body: [{ t: 'p', text: 'x' }],
};

describe('event utils', () => {
  it('links to the detail page unless overridden', () => {
    expect(eventHref(base)).toBe('/events/test/');
    expect(eventHref({ ...base, link: 'mailto:a@b.nl' })).toBe('mailto:a@b.nl');
    expect(eventHref({ ...base, body: undefined })).toBe('/events/');
  });

  it('writes timed events in UTC, honouring summer time', () => {
    const ics = buildIcs(base, 'https://www.snesie.nl', new Date('2026-10-01T00:00:00Z'));
    expect(ics).toContain('DTSTART:20261017T110000Z');
    expect(ics).toContain('DTEND:20261017T153000Z');
    expect(ics).toContain('SUMMARY:Test\\, met komma (Snesie&)');
    expect(ics).toContain('URL:https://www.snesie.nl/events/test/');
    expect(ics.endsWith('\r\n')).toBe(true);
  });

  it('handles winter time', () => {
    const ics = buildIcs({ ...base, start: '2026-12-11T10:00', end: '12:00' }, 'https://www.snesie.nl');
    expect(ics).toContain('DTSTART:20261211T090000Z');
  });

  it('writes all-day events as DATE values', () => {
    const ics = buildIcs({ ...base, start: '2026-10-31', end: undefined }, 'https://www.snesie.nl');
    expect(ics).toContain('DTSTART;VALUE=DATE:20261031');
    expect(ics).toContain('DTEND;VALUE=DATE:20261101');
  });
});
