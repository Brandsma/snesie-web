import { countdownLabel, formatLong, nextFirstSunday, parseLocal } from '@/lib/dates';
import { countLabel, daysToGo, defaultOpenYear, isUpcoming, pickNext } from '@/lib/event-schedule';

/*
 * The events pages are rendered with the build date. These functions redo the
 * date-dependent parts with the visitor's date, using the same pure logic, so
 * a page built days ago still shows the right "next event", countdowns and
 * archive.
 */

const all = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) => [
  ...root.querySelectorAll<T & HTMLElement>(sel),
];

/** "zondag 1 november" */
const shortLong = (d: Date) => formatLong(d, { year: false, capital: false });

function setupNextCard(now: Date) {
  const cards = all('[data-next-card]');
  if (!cards.length) return;
  const next = pickNext(
    cards.map((c) => ({ id: c.dataset.id!, start: c.dataset.start!, deadline: c.hasAttribute('data-deadline') })),
    now,
  );
  const empty = document.querySelector<HTMLElement>('[data-next-empty]');
  if (empty) empty.hidden = !!next;
  for (const card of cards) {
    const on = card.dataset.id === next?.id;
    card.hidden = !on;
    if (!on) continue;
    const { days, label } = daysToGo(card.dataset.start!, now);
    card.querySelector('[data-days]')!.textContent = String(days);
    card.querySelector('[data-days-label]')!.textContent = label;
  }
}

function setupAgenda(now: Date) {
  const agenda = document.querySelector<HTMLElement>('[data-agenda]');
  if (!agenda) return;
  const rows = all('[data-row]', agenda);
  const chips = all<HTMLButtonElement>('[data-city-chip]');
  const empty = document.querySelector<HTMLElement>('[data-agenda-empty]')!;
  let city = 'Alle';

  // The filter needs JavaScript, so it is only shown once it works.
  document.querySelector('[data-city-filter]')?.removeAttribute('hidden');

  rows.forEach((r) => r.toggleAttribute('data-past', !isUpcoming(r.dataset.start!, now)));

  const closeAll = () => rows.forEach((r) => ((r as HTMLDetailsElement).open = false));

  const render = () => {
    let shown = 0;
    for (const r of rows) {
      const visible = !r.hasAttribute('data-past') && (city === 'Alle' || r.dataset.city === city);
      r.hidden = !visible;
      if (visible) shown++;
    }
    empty.hidden = shown > 0;
    chips.forEach((c) => c.setAttribute('aria-pressed', String(c.dataset.city === city)));
  };

  chips.forEach((chip) =>
    chip.addEventListener('click', () => {
      city = chip.dataset.city!;
      closeAll();
      render();
    }),
  );

  // One row open at a time.
  rows.forEach((r) =>
    r.addEventListener('toggle', () => {
      if ((r as HTMLDetailsElement).open) rows.forEach((o) => o !== r && ((o as HTMLDetailsElement).open = false));
    }),
  );

  render();
}

function setupArchive(now: Date) {
  const groups = all('[data-year]');
  if (!groups.length) return;

  const visibleYears: number[] = [];
  groups.forEach((g) => {
    const items = all('[data-past-item]', g);
    let count = 0;
    items.forEach((i) => {
      i.hidden = isUpcoming(i.dataset.date!, now);
      if (!i.hidden) count++;
    });
    g.hidden = count === 0;
    g.querySelector('[data-year-count]')!.textContent = countLabel(count);
    if (count) visibleYears.push(Number(g.dataset.year));
  });

  const open = defaultOpenYear(visibleYears, now);
  groups.forEach((g) => ((g as HTMLDetailsElement).open = Number(g.dataset.year) === open));
}

/** Init the /events/ page. */
export function initEventsIndex(now = new Date()) {
  setupNextCard(now);
  setupAgenda(now);
  setupArchive(now);
  const sunday = document.querySelector('[data-next-sunday]');
  if (sunday) sunday.textContent = shortLong(nextFirstSunday(now));
}

/** Init an /events/<id>/ page: countdown and past/upcoming state. */
export function initEventDetail(now = new Date()) {
  const root = document.querySelector<HTMLElement>('[data-event-detail]');
  if (!root) return;
  const start = root.dataset.start!;
  const past = !isUpcoming(start, now);
  root.querySelector('[data-countdown]')!.textContent = countdownLabel(parseLocal(start), now);
  all('[data-past-only]', root).forEach((el) => (el.hidden = !past));
  all('[data-upcoming-only]', root).forEach((el) => (el.hidden = past));
}
