/* ============================================================
   Every word and every link on the site lives here.
   Nothing else has copy in it.

   House rule: no em dashes. Break the sentence instead.
   ============================================================ */

export const site = {
  url: 'https://www.whoisreiki.com',
  name: 'RKI',
  kana: 'レイキ',
  label: 'LTE WORLDWIDE',
  city: 'MINNEAPOLIS, MN',
  timezone: 'America/Chicago',
  description:
    'RKI (レイキ). Minneapolis. rap, r&b and noise on LTE Worldwide. new single "together" out now.',

  /** the line that runs along the bottom of the hero, on repeat. */
  ticker: [
    'NEW SINGLE "TOGETHER" OUT NOW',
    'LTE WORLDWIDE',
    'MINNEAPOLIS, MN',
    'レイキ',
    'ARCHIVE 002 UNLOCKED',
  ],

  links: {
    spotify: 'https://open.spotify.com/artist/3lQGGKiPEpznrWhccpIHqV',
    apple: 'https://music.apple.com/us/artist/reiki/1473990353',
    youtube: 'https://youtube.com/@reikiworldwide',
    instagram: 'https://www.instagram.com/theonlyreiki',
    twitter: 'https://twitter.com/theonlyreiki',
    facebook: 'https://www.facebook.com/theonlyreiki',
  },

  /** management. the only address shown anywhere on the site. */
  contact: {
    name: 'ashanti',
    org: 'san francisco supply',
    email: 'ashanti@sanfranciscosupply.co',
    subject: 'RKI Inquiry',
  },

  /** the feature at the top of music. one release, front and centre. */
  featured: {
    slug: 'together',
    title: 'together',
    kind: 'single',
    year: '2026',
    cover: '/media/cover-together.webp',
    note: 'maybe you have never heard a song like this from someone who looks like me.',
    spotify: 'https://open.spotify.com/album/42aJ9Zn7dyubHGSQQJTqI6',
    apple: 'https://music.apple.com/us/album/together-single/1894560303',
    /** loaded only when someone asks for it. nothing from spotify runs before that. */
    embed: 'https://open.spotify.com/embed/album/42aJ9Zn7dyubHGSQQJTqI6',
    video: 'https://www.instagram.com/reel/DbeuiIvRCQR/',
  },

  /** the archive. hold a file to open it. sealed ones have no link yet. */
  archive: {
    lede: 'welcome to archive. you unlock what you want to hear.',
    files: [
      {
        no: '001',
        title: 'highwaytoheaven',
        status: 'unreleased',
        note: 'a rap, r&b memoir about the inner struggle of identity, faith and existential crisis.',
        href: 'https://www.instagram.com/reel/DclxbK0R5vc/',
      },
      {
        no: '002',
        title: "drippin' sweat",
        status: 'unreleased',
        note: 'a mosh anthem. plain and simple. written at a time of going to hardcore shows and jumping in pits.',
        href: 'https://www.instagram.com/reel/Dc1TKs4BFsB/',
      },
      {
        no: '003',
        title: 'zoom!',
        status: 'sealed',
        note: 'prod. by RKI. not out yet.',
        href: 'https://www.instagram.com/reel/DdEvNDkxOPa/',
      },
    ],
  },

  /** the contact sheet. drag it. */
  visuals: {
    lede: 'stills from the archive.',
    credit: 'shot with bumpopera and friends.',
    frames: [
      { src: '/media/mesh.webp', alt: 'RKI leaning against a steel mesh gate in hard sunlight' },
      { src: '/media/twins.webp', alt: 'RKI mirrored under the armory arch' },
      { src: '/media/stage-bw.webp', alt: 'RKI on a mic stand mid set' },
      { src: '/media/halftone.webp', alt: 'two figures in hoods, halftone treatment' },
      { src: '/media/silo-guitar.webp', alt: 'RKI with a guitar in tall grass under the grain silos' },
      { src: '/media/crowd.webp', alt: 'RKI facing a full room with both arms up' },
      { src: '/media/red-mic.webp', alt: 'RKI at the mic under red lights' },
      { src: '/media/studio.webp', alt: 'RKI tracking in the studio' },
      { src: '/media/hoods.webp', alt: 'two figures in hoods outside a bar' },
      { src: '/media/silhouette.webp', alt: 'RKI in silhouette under a single spotlight' },
      { src: '/media/bridge.webp', alt: 'RKI on a rail bridge' },
      { src: '/media/crystal.webp', alt: 'RKI holding a lit crystal in both hands' },
      { src: '/media/blue-mic.webp', alt: 'RKI singing under blue stage light' },
      { src: '/media/silo-zoom.webp', alt: 'RKI in front of the silos, zoom blur' },
      { src: '/media/armory-bts.webp', alt: 'behind the scenes at the armory' },
      { src: '/media/spotlight.webp', alt: 'RKI at the mic seen from the back of the room' },
      { src: '/media/stage-tee.webp', alt: 'RKI on stage in a RAGE tee' },
      { src: '/media/portrait-dark.webp', alt: 'RKI in near darkness, head down' },
    ],
  },

  /** type this anywhere on the page. */
  secret: { code: 'reiki', line: 'レイキ' },
} as const;

export type Release = {
  title: string;
  year: string;
  /** a feature credit: who else is on it, or the project it appears on. */
  with?: string;
  /** true when RKI is the guest rather than the lead. */
  guest?: boolean;
  cover?: string;
  spotify?: string;
  apple: string;
};

/** newest first. */
export const releases: Release[] = [
    {
      title: 'together',
      year: '2026',
      cover: '/media/cover-together.webp',
      spotify: 'https://open.spotify.com/album/42aJ9Zn7dyubHGSQQJTqI6',
      apple: 'https://music.apple.com/us/album/together-single/1894560303',
    },
    {
      title: 'DMA',
      year: '2025',
      with: 'NOT AGAIN!',
      guest: true,
      apple: 'https://music.apple.com/us/album/dma-feat-reiki/1810568731',
    },
    {
      title: 'drowning',
      year: '2023',
      with: 'Mila Lucia',
      cover: '/media/cover-drowning.webp',
      spotify: 'https://open.spotify.com/album/31Fv4GokBorrQOVcsCeKtN',
      apple: 'https://music.apple.com/us/album/drowning-feat-mila-lucia-single/1699053752',
    },
    {
      title: 'chaos',
      year: '2023',
      cover: '/media/cover-chaos.webp',
      spotify: 'https://open.spotify.com/track/5v3XPFkz8mmnVS5dQIdJqH',
      apple: 'https://music.apple.com/us/album/chaos-single/1698512510',
    },
    {
      title: "Closest I've Ever Been",
      year: '2023',
      with: 'Svanoe',
      guest: true,
      apple:
        "https://music.apple.com/us/album/closest-ive-ever-been-feat-reiki-svanoe/1677134580",
    },
    {
      title: 'Riskin Survival',
      year: '2023',
      with: 'Peacegod, Juice Lord',
      guest: true,
      apple:
        'https://music.apple.com/us/album/riskin-survival-feat-peacegod-reiki-juice-lord/1660880677',
    },
    {
      title: 'News.',
      year: '2022',
      cover: '/media/cover-news.webp',
      spotify: 'https://open.spotify.com/track/3IINBVQsVZGy0CcTRJuAZy',
      apple: 'https://music.apple.com/us/album/news-single/1626035059',
    },
    {
      title: 'Normal.',
      year: '2021',
      cover: '/media/cover-normal.webp',
      apple: 'https://music.apple.com/us/album/normal-single/1628178440',
    },
    {
      title: 'N2b',
      year: '2021',
      cover: '/media/cover-n2b.webp',
      apple: 'https://music.apple.com/us/album/n2b-single/1573488259',
    },
    {
      title: 'Focus',
      year: '2020',
      cover: '/media/cover-focus.webp',
      apple: 'https://music.apple.com/us/album/focus-single/1528117442',
    },
  ];
