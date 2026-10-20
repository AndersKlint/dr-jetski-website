# Dr. Jetski Studios website

## Status

Phases 1 and 2 are complete: an Astro static site with ten validated project
entries, a responsive staggered homepage, compact project grid, locally hosted
fonts, studio identity, and About/contact area. Project media is replaceable
through each content folder; most entries still use clearly labeled concept
previews, while JetAlign uses real media.

Phase 3 provides project detail pages, card navigation, and preview playback;
project galleries use a manual carousel with thumbnails, swipe, and keyboard
access. Project authoring uses one folder per project with co-located media; see
[PROJECT-ASSETS.md](PROJECT-ASSETS.md) for the authoring guide. See
[PLAN.md](PLAN.md) for the implementation milestones and [AGENTS.md](AGENTS.md)
for source organization.

## Commands

Requires Node >=22.22.0 and npm >=9.6.5 (`npm ci` for a clean install).

- `npm run dev` — local development server.
- `npm run check` — Astro content/type checks.
- `npm run build` — production build.
- `npm run preview` — preview the production build.

Run checks with telemetry disabled if init fails in restricted environments:

- `ASTRO_TELEMETRY_DISABLED=1 npm run check`

## Authoring contract

One folder per project at `src/content/projects/<slug>/index.md`; the folder
name is the stable route slug, independent of the editable `displayName`.
Frontmatter must satisfy `src/projects/projectSchema.ts`; invalid content fails
the build. [PROJECT-ASSETS.md](PROJECT-ASSETS.md) is the operational authoring
guide for folder layout, the `index.md` template, image dimensions, and media
and video rules.

- `downloads` records are raw authored data: a record without a `url` is a
  known-planned artifact, never rendered as a link. Only records with real
  `https` URLs become actions.
- `releaseMaturity` (dev state), `availability.status` (can a visitor get it
  now), and `visibility` (included in the catalogue or not) are independent: a
  finished private package is `stable` + `pending`, an alpha/beta can carry
  real downloads.
- The first three public featured projects by rank are the leads; the
  remaining ranked projects are secondary.
- Compact projects sort by `editorialOrder`: paddle-my-pdf, then the two
  Flutter packages adjacent, then yt-clip-extractor, spotify-screensave.
- JetAlign is canonical at `/projects/jetalign`; `/projects/vocal-aligner`
  permanently redirects there. Its folder slug is `jetalign`.
- Unknowns go in frontmatter `authoringNotes`, never as public calls to
  action or invented links.
- Homepage cards use the first `gallery` entry; the same order drives the
  project carousel. To replace a concept preview, point its `src` at the new
  local file, update `alt`, and remove `isPlaceholder: true`. Image dimensions
  are read automatically; preview thumbnails are generated, not authored.

## Workflow

Edit the project Markdown, run `npm run check`, then `npm run build` before
pushing. Publishing a release means uploading the versioned artifact to R2,
adding its real URL/version/size/filename to the entry, and redeploying.

## Owner-input TODOs

Marked per file in `authoringNotes`; still needed before launch:

- Public download URLs, versions, sizes, filenames, install notes (all builds).
- HanScan: whether English translation works offline (only OCR is offline).
- WayToClip: source URL (unknown — not linked) and GNOME listing URL.
- LaoZi: desktop/web artifacts (only the Android APK is confirmed).
- HanKan Windows/Linux, yt-clip-extractor: exact bundle/extension/installer formats.
- Paddle-my-pdf / spotify-screensave: source/install destinations.
- Flutter packages: pub.dev URLs once published.
- Contact details, professional links, and real screenshots/previews to replace
  the initial concept placeholders.
