/**
 * Decap CMS preview templates. They render the same markup and class names as
 * the real pages (src/pages/blog/[slug].astro, src/pages/events/[id].astro),
 * styled by the same stylesheets, so editors see what visitors will see.
 *
 * Decap exposes React's createElement as the global `h`.
 */
import { MONTHS_SHORT, formatLong, parseLocal } from '@/lib/dates';

type El = unknown;
type H = (tag: string, props?: Record<string, unknown> | null, ...children: unknown[]) => El;
interface Entry {
  getIn(path: string[]): { toJS(): unknown } | string | number | boolean | undefined;
}
interface PreviewProps {
  entry: Entry;
  getAsset: (path: string) => { toString(): string } | undefined;
}
interface DecapCMS {
  registerPreviewStyle(url: string): void;
  registerPreviewTemplate(name: string, component: (props: PreviewProps) => El): void;
}

declare global {
  interface Window {
    CMS?: DecapCMS;
    h?: H;
  }
}

/** Plain JS value of an entry field (Immutable → JS). */
function field<T>(entry: Entry, ...path: string[]): T | undefined {
  const v = entry.getIn(['data', ...path]);
  return (v && typeof v === 'object' && 'toJS' in v ? v.toJS() : v) as T | undefined;
}

const validDate = (s?: string) => !!s && /^\d{4}-\d{2}-\d{2}/.test(s);

export function registerPreviews(cms: DecapCMS, h: H, stylesheet: string) {
  cms.registerPreviewStyle(stylesheet);

  const image = (props: PreviewProps, name?: string) => (name ? props.getAsset(name)?.toString() : undefined);

  /* ---------- Blog post ---------- */

  type Block =
    | { t: 'lead' | 'p' | 'credit'; text?: string }
    | { t: 'link'; label?: string; text?: string; href?: string }
    | { t: 'gallery'; images?: string[] };

  const blogBlock = (props: PreviewProps, b: Block, i: number): El => {
    switch (b.t) {
      case 'lead':
        return h('p', { key: i, className: 'lead' }, b.text);
      case 'p':
        return h('p', { key: i, className: 'p' }, b.text);
      case 'credit':
        return h('p', { key: i, className: 'credit' }, b.text);
      case 'link':
        return h(
          'a',
          { key: i, className: 'link-card', href: b.href, target: '_blank', rel: 'noopener noreferrer' },
          h('span', { className: 'link-text' }, h('span', { className: 'link-label' }, b.label), h('span', { className: 'link-title' }, b.text)),
          h('span', { className: 'link-arrow', 'aria-hidden': 'true' }, '↗'),
        );
      case 'gallery':
        return h(
          'div',
          { key: i, className: 'gallery' },
          (b.images ?? []).map((src, n) => h('span', { key: n, className: 'g-item' }, h('img', { src: image(props, src), alt: `Foto ${n + 1}` }))),
        );
      default:
        return null;
    }
  };

  cms.registerPreviewTemplate('blog', (props) => {
    const { entry } = props;
    const title = field<string>(entry, 'title') ?? '';
    const author = field<string>(entry, 'author') ?? '';
    const date = field<string>(entry, 'date');
    const caption = field<string>(entry, 'caption');
    const hero = image(props, field<string>(entry, 'hero'));
    const blocks = field<Block[]>(entry, 'blocks') ?? [];
    let dateLabel = '';
    if (validDate(date)) {
      const d = parseLocal(date!);
      dateLabel = `${d.getDate()} ${MONTHS_SHORT[d.getMonth()]} ${d.getFullYear()}`;
    }

    return h(
      'article',
      { className: 'post-page' },
      h(
        'header',
        { className: 'head container' },
        h(
          'nav',
          { className: 'crumbs' },
          h('a', null, 'Media'),
          h('span', { className: 'sep' }, '/'),
          h('a', null, 'Blog'),
          h('span', { className: 'sep' }, '/'),
          h('span', { className: 'here' }, field<string>(entry, 'tag')),
        ),
        h('h1', null, title),
        h(
          'div',
          { className: 'metabar' },
          h('span', { className: 'author' }, h('span', { className: 'avatar' }, author.charAt(0)), h('span', { className: 'author-name' }, author)),
          dateLabel && h('span', { className: 'muted' }, dateLabel),
          h('span', { className: 'muted' }, field<string>(entry, 'read')),
          h('button', { type: 'button', className: 'share' }, 'Deel dit bericht'),
        ),
      ),
      h(
        'figure',
        { className: 'hero container' },
        h('div', { className: 'hero-frame' }, hero && h('img', { src: hero, alt: title })),
        caption && h('figcaption', null, caption),
      ),
      h('div', { className: 'body' }, blocks.map((b, i) => blogBlock(props, b, i))),
    );
  });

  /* ---------- Events ---------- */

  type EventBlock = { t: 'lead' | 'p'; text?: string } | { t: 'speaker'; name?: string; text?: string };
  interface Ev {
    id?: string;
    type?: string;
    city?: string;
    title?: string;
    sub?: string;
    start?: string;
    time?: string;
    venue?: string;
    where?: string;
    price?: string;
    image?: string;
    signup?: string;
    body?: EventBlock[];
  }

  const eventBlock = (b: EventBlock, i: number): El =>
    b.t === 'speaker'
      ? h(
          'div',
          { key: i, className: 'speaker' },
          h('span', { className: 'avatar' }, (b.name ?? '').charAt(0)),
          h(
            'div',
            { className: 'speaker-text' },
            h('span', { className: 'label label--small label--muted' }, 'Spreker'),
            h('span', { className: 'speaker-name' }, b.name),
            h('span', { className: 'speaker-bio' }, b.text),
          ),
        )
      : h('p', { key: i, className: b.t === 'lead' ? 'lead' : 'p' }, b.text);

  const eventView = (props: PreviewProps, ev: Ev, key: number): El => {
    const d = validDate(ev.start) ? parseLocal(ev.start!) : null;
    const when = d ? formatLong(d) + (ev.time ? `, ${ev.time}` : '') : 'Datum volgt';
    const month = d ? d.toLocaleDateString('nl-NL', { month: 'long', year: 'numeric' }) : '';
    const src = image(props, ev.image);

    return h(
      'div',
      { key, className: 'event-page' },
      h(
        'section',
        { className: 'container head' },
        h('nav', { className: 'crumbs' }, h('a', null, '← Events'), h('span', { className: 'sep' }, '/'), h('span', { className: 'crumb-type' }, `${ev.type ?? ''} · ${ev.city ?? ''}`)),
        h('h1', null, ev.title),
        ev.sub && h('p', { className: 'sub' }, ev.sub),
      ),
      h(
        'section',
        { className: 'container layout' },
        h(
          'div',
          { className: 'content' },
          src && h('img', { className: 'hero-img', src, alt: ev.venue }),
          ev.body?.length
            ? h('div', { className: 'body' }, ev.body.map(eventBlock))
            : h('p', { className: 'preview-note' }, 'Geen tekst voor de eventpagina: dit event krijgt geen eigen pagina.'),
        ),
        h(
          'aside',
          { className: 'aside' },
          h(
            'div',
            { className: 'panel' },
            h('div', { className: 'date' }, h('span', { className: 'day' }, d ? d.getDate() : '—'), h('span', { className: 'date-meta' }, h('span', { className: 'month' }, month))),
            h('dl', { className: 'facts' }, h('dt', null, 'Wanneer'), h('dd', null, when), h('dt', null, 'Waar'), h('dd', null, ev.where), h('dt', null, 'Deelname'), h('dd', null, ev.price)),
            h(
              'div',
              { className: 'actions' },
              ev.signup && h('span', { className: 'btn btn--light' }, 'Aanmelden ↗'),
              h('div', { className: 'actions-row' }, h('span', { className: 'btn btn--outline-light' }, 'Zet in agenda'), h('span', { className: 'btn btn--outline-light' }, 'Route ↗')),
            ),
          ),
        ),
      ),
    );
  };

  cms.registerPreviewTemplate('events', (props) => {
    const events = field<Ev[]>(props.entry, 'events') ?? [];
    return h(
      'div',
      null,
      h('p', { className: 'preview-note' }, `Voorbeeld van de eventpagina's (${events.length} events), in de volgorde van de lijst.`),
      events.map((ev, i) => eventView(props, ev, i)),
    );
  });

  cms.registerPreviewTemplate('archive', (props) => {
    const items = field<{ date?: string; title?: string }[]>(props.entry, 'archive') ?? [];
    const sorted = [...items].sort((a, b) => (b.date ?? '').localeCompare(a.date ?? ''));
    return h(
      'div',
      { className: 'preview-archive' },
      h('div', { className: 'label label--muted' }, 'Eerdere events'),
      h(
        'ul',
        { style: { listStyle: 'none', padding: 0 } },
        sorted.map((it, i) => {
          const label = validDate(it.date) ? it.date!.slice(8, 10) + '-' + it.date!.slice(5, 7) + '-' + it.date!.slice(0, 4) : '—';
          return h('li', { key: i }, h('span', null, label), it.title);
        }),
      ),
    );
  });
}
