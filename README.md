# RKI レイキ

One page. Next.js (App Router) + TypeScript, no CSS framework, no CMS, fully
static. Deploys to Vercel with no configuration. Separate project from
cozyfiles: nothing is shared between the two.

```
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run typecheck  # types only
```

Or double-click `preview.command` to see it, `deploy.command` to put it online.

---

## The one file you'll actually edit

**`content/site.ts`** is every word, every link, the release list, the archive
files and the photo list. Nothing else on the site has copy in it. Adding a
release is a line in `releases`. Adding a photo is a line in `visuals.frames`.

---

## Structure

```
app/
  page.tsx            the page, in order
  layout.tsx          metadata, fonts, the grain plate
  globals.css         the whole visual system. every token lives here
components/
  Hero.tsx            the picture, the mark, the nav, the ticker
  Status.tsx          LTE bars and the live Minneapolis clock
  Intro.tsx           one line and one frame
  Music.tsx           the feature, the player, the register
  Archive.tsx         the locked files. hold one to open it
  Visuals.tsx         the contact sheet and the lightbox
  Worldwide.tsx       the globe, contact, socials
  Mark.tsx            the wordmark, as a vector
  Secret.tsx          type "reiki" anywhere
  Grain.tsx           one static film plate
lib/
  zoom-blur.ts        the hero shader
  mark.ts             the traced wordmark path. do not hand-edit
content/site.ts       all copy, links and lists
public/media/         photography and cover art
public/brand/         the wordmark as a standalone SVG
```

---

## The design, in short

**Black ground, bone type, one cold blue.** The blue (`--glow`) only ever means
live or here: the unlocked state of an archive file, a focus ring, the play
button. Everything else is black, white and the photography, which is the only
real colour on the site and is held to black and white almost everywhere so
that cover art is the thing that has colour.

**The label is the interface.** LTE Worldwide, so the top right corner of the
site is a signal reading: four bars and the real time in Minneapolis. It is the
one live thing on the page that is not decoration.

**The hero is the ZOOM! treatment, made live.** A radial blur converging on
wherever the pointer is, in a shader, over a single photograph. Move fast and
it smears. Sit still and it settles and you can read the room. On phones there
is no pointer, so there is no shader: the still is sharper and the battery is
better off. Reduced motion pins it.

**The register, not a grid of squares.** Ten releases read faster as a
catalogue: year, title, who it was with, and whether he is the lead or the
guest. The cover rides with the cursor rather than sitting in a tile, so the
list stays a list.

**The archive is the hook.** "you unlock what you want to hear" is his line, so
the unreleased files are locked and you hold one to open it. The note is
redacted until then. It is one interaction and it is worth it because the thing
behind it is genuinely unreleased.

**Nothing loads from Spotify until someone asks.** The player is a button, and
the iframe is only created after it is pressed. Same reasoning as the CSP in
`next.config.mjs`: the only outside host the browser is allowed to talk to at
all is `open.spotify.com`, and only in a frame.

**House rule.** No em dashes in the copy. Break the sentence instead.

---

## Where the media came from

Everything in `public/media` was pulled from the live Squarespace site, from
Apple Music and from the `@theonlyreiki` grid, then resized and converted to
webp. That means:

- the photographs are at web size, not original size. If a frame needs to be
  used large, replace it with the original file from the photographer
  (`@bumpopera` shot a lot of these).
- `public/brand/rki-mark.svg` and `lib/mark.ts` are the wordmark **traced** from
  the PNG on the old site. It is clean and it scales, but if the real vector
  turns up, re-export from that instead and replace both.
- the hero video from the old site could not be pulled off Squarespace. If the
  original mp4 turns up, it belongs in the hero: see the TODO in `Hero.tsx`.

## Deploying

`npx vercel --prod` from this folder, or push to a repo and import it on
Vercel. Then point `whoisreiki.com` at it under Domains and cancel the
Squarespace site. Nothing here needs environment variables.
