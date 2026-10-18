/** Site-wide constants: navigation, contact details and social links. */

export const SITE = {
  name: 'Snesie&',
  url: 'https://www.snesie.nl',
  tagline: 'Chinese zielen, Surinaamse wortels, Nederlandse stemmen',
  description:
    'Stichting Snesie& maakt de geschiedenis en het erfgoed van Chinees-Surinaamse, met name Hakka-Chinese, gemeenschappen zichtbaar.',
  email: 'info@snesie.nl',
  googleForm:
    'https://docs.google.com/forms/d/e/1FAIpQLSdSYbNtZKMvjLYZIG_TjfUewuBf-_cmJ6GLApOqx61PP3R6BA/viewform',
} as const;

export type NavKey = 'wij' | 'events' | 'thuis' | 'media' | 'join';

export const NAV: { key: NavKey; href: string; label: string }[] = [
  { key: 'wij', href: '/wij/', label: 'Wij' },
  { key: 'events', href: '/events/', label: 'Events' },
  { key: 'thuis', href: '/thuis/', label: 'Thuis' },
  { key: 'media', href: '/media/', label: 'Media' },
];

export const JOIN = { key: 'join' as NavKey, href: '/join-us/', label: 'Join us' };

export const SOCIAL = [
  { label: 'Instagram', href: 'https://www.instagram.com/snesieand' },
  { label: 'Facebook', href: 'https://www.facebook.com/profile.php?id=61593634627413' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/snesie/' },
];

/** Self-hosted documents in /public/files. */
export const FILES = {
  tijdlijn: '/files/tijdlijn.pdf',
  wegVanDeChinees: '/files/weg-van-de-chinees.pdf',
  onderzoekstips: '/files/onderzoekstips-roots.pdf',
  stamboomMelvinChang: '/files/stamboom-melvin-chang.pdf',
  stamboomRelyHoogendijk: '/files/stamboom-rely-hoogendijk.pdf',
  essayFlyer: '/files/flyer-jouw-geschiedenis-jouw-stem.pdf',
} as const;
