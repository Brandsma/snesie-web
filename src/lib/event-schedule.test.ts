import { describe, expect, it } from 'vitest';
import { parseLocal } from './dates';
import { countLabel, daysToGo, defaultOpenYear, groupPastByYear, isUpcoming, pickNext } from './event-schedule';

const now = parseLocal('2026-10-18T15:00');
const events = [
  { id: 'kickoff', start: '2026-10-17T13:00' },
  { id: 'essay', start: '2026-10-20', deadline: true },
  { id: 'oso', start: '2026-10-24' },
  { id: 'sym', start: '2026-12-11' },
];

describe('event schedule', () => {
  it('treats events later today as upcoming', () => {
    expect(isUpcoming('2026-10-18T09:00', now)).toBe(true);
    expect(isUpcoming('2026-10-17T23:00', now)).toBe(false);
  });

  it('picks the next real event, skipping deadlines', () => {
    expect(pickNext(events, now)?.id).toBe('oso');
    expect(pickNext(events, parseLocal('2026-12-12'))).toBeUndefined();
    expect(pickNext([events[1]], now)?.id).toBe('essay');
  });

  it('never counts negative days', () => {
    expect(daysToGo('2026-10-24', now)).toEqual({ days: 6, label: 'dagen te gaan' });
    expect(daysToGo('2026-10-19', now)).toEqual({ days: 1, label: 'dag te gaan' });
    expect(daysToGo('2026-10-01', now).days).toBe(0);
  });

  it('groups past items by year, newest first', () => {
    const groups = groupPastByYear(
      [
        { date: '2025-03-02', title: 'A' },
        { date: '2026-10-17T13:00', title: 'B' },
        { date: '2026-07-16', title: 'C' },
        { date: '2026-10-24', title: 'future' },
      ],
      now,
    );
    expect(groups.map((g) => g.year)).toEqual([2026, 2025]);
    expect(groups[0].items.map((i) => [i.title, i.label])).toEqual([
      ['B', '17-10'],
      ['C', '16-07'],
    ]);
  });

  it('opens the current year, else the most recent', () => {
    expect(defaultOpenYear([2026, 2025], now)).toBe(2026);
    expect(defaultOpenYear([2025, 2024], now)).toBe(2025);
    expect(defaultOpenYear([], now)).toBeUndefined();
    expect(countLabel(1)).toBe('1 event');
    expect(countLabel(3)).toBe('3 events');
  });
});
