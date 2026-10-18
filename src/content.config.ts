import { defineCollection } from 'astro:content';
import { file, glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { imageNames } from './lib/images';

/*
 * Editable content. Events and blog posts are plain JSON files so they can be
 * edited by hand or through a git-based CMS (see public/admin/config.yml).
 * Images are referenced by file name from src/assets/img.
 */

// Accepts "kickoff.jpg" or a path such as "src/assets/img/kickoff.jpg" (what the CMS stores).
const imageName = z.string().refine((n) => imageNames().includes(n.split('/').pop()!), {
  message: 'Unknown image: add the file to src/assets/img first',
});

/** "YYYY-MM-DD" or "YYYY-MM-DDTHH:mm", Amsterdam local time. */
const localDate = z.string().regex(/^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2})?$/, 'Use YYYY-MM-DD or YYYY-MM-DDTHH:mm');

const eventBlock = z.discriminatedUnion('t', [
  z.object({ t: z.literal('lead'), text: z.string() }),
  z.object({ t: z.literal('p'), text: z.string() }),
  z.object({ t: z.literal('speaker'), name: z.string(), text: z.string() }),
]);

const events = defineCollection({
  loader: file('src/content/events.json', { parser: (text) => JSON.parse(text).events }),
  schema: z.object({
    /** Groups events in a series (they link to each other on the detail page). */
    series: z.string().optional(),
    type: z.string(),
    city: z.string(),
    /** H1 on the detail page. */
    title: z.string(),
    /** Title in the agenda and archive. */
    listTitle: z.string(),
    /** Optional shorter title for the "Volgende" teaser on the home page. */
    homeTitle: z.string().optional(),
    sub: z.string().optional(),
    start: localDate,
    /** End time "HH:mm" on the same day (only for timed events). */
    end: z.string().regex(/^\d{2}:\d{2}$/).optional(),
    /** Human readable time, e.g. "13.00–17.30 uur". */
    time: z.string().optional(),
    /** The date is a sign-up deadline rather than the event itself. */
    deadline: z.boolean().default(false),
    venue: z.string(),
    where: z.string(),
    address: z.string().optional(),
    image: imageName,
    signup: z.url().optional(),
    price: z.string(),
    summary: z.string(),
    /** Overrides the default link to the detail page (external page, mailto…). */
    link: z.string().optional(),
    cta: z.string().default('Meer info →'),
    /** Body of the detail page. Events without a body get no detail page. */
    body: z.array(eventBlock).optional(),
  }),
});

const eventArchive = defineCollection({
  loader: file('src/content/event-archive.json', { parser: (text) => JSON.parse(text).archive }),
  schema: z.object({ date: localDate, title: z.string() }),
});

const blogBlock = z.discriminatedUnion('t', [
  z.object({ t: z.literal('lead'), text: z.string() }),
  z.object({ t: z.literal('p'), text: z.string() }),
  z.object({ t: z.literal('link'), label: z.string(), text: z.string(), href: z.string() }),
  z.object({ t: z.literal('gallery'), images: z.array(imageName).min(1) }),
  z.object({ t: z.literal('credit'), text: z.string() }),
]);

const blog = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/blog' }),
  schema: z.object({
    /** Position in the index and in prev/next navigation (1 = first). */
    order: z.number().int(),
    tag: z.string(),
    author: z.string(),
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
    read: z.string(),
    title: z.string(),
    hero: imageName,
    ratio: z.string().default('3/2'),
    caption: z.string().optional(),
    blocks: z.array(blogBlock),
  }),
});

export const collections = { events, eventArchive, blog };
