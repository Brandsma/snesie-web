import { describe, expect, it } from 'vitest';
import { countdownLabel, daysUntil, formatLong, nextFirstSunday, parseLocal } from './dates';

const at = (s: string) => parseLocal(s);

describe('dates', () => {
  it('parses local dates without a UTC shift', () => {
    const d = parseLocal('2026-10-17T13:00');
    expect([d.getFullYear(), d.getMonth(), d.getDate(), d.getHours()]).toEqual([2026, 9, 17, 13]);
  });

  it('counts calendar days regardless of time of day', () => {
    expect(daysUntil(at('2026-10-24T20:00'), at('2026-10-18T23:59'))).toBe(6);
    expect(daysUntil(at('2026-10-18T09:00'), at('2026-10-18T22:00'))).toBe(0);
  });

  it('labels the countdown', () => {
    const now = at('2026-10-18T12:00');
    expect(countdownLabel(at('2026-10-17'), now)).toBe('Geweest');
    expect(countdownLabel(at('2026-10-18'), now)).toBe('Vandaag!');
    expect(countdownLabel(at('2026-10-19'), now)).toBe('Morgen');
    expect(countdownLabel(at('2026-10-24'), now)).toBe('Nog 6 dagen');
  });

  it('formats long Dutch dates', () => {
    expect(formatLong(at('2026-10-17'))).toBe('Zaterdag 17 oktober 2026');
  });

  it('finds the next first Sunday of a month', () => {
    expect(nextFirstSunday(at('2026-10-18')).toDateString()).toBe(at('2026-11-01').toDateString());
    expect(nextFirstSunday(at('2026-11-01')).toDateString()).toBe(at('2026-11-01').toDateString());
    expect(nextFirstSunday(at('2026-10-01')).toDateString()).toBe(at('2026-10-04').toDateString());
  });
});
