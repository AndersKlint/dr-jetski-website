# Dr. Jetski Studios website

## Status

Phase 1 foundation: Astro static site with a validated project catalogue
(`src/content/projects/*.md`, ten public entries). Visual design, homepage
showcase, media galleries, and project detail pages arrive in later phases.
No placeholder media or detail routes are wired up yet.

## Commands

Requires Node >=22.22.0 and npm >=9.6.5 (`npm ci` for a clean install).

- `npm run dev` — local development server.
- `npm run check` — Astro content/type checks.
- `npm run build` — production build.
- `npm run preview` — preview the production build.

Run checks with telemetry disabled if init fails in restricted environments:

- `ASTRO_TELEMETRY_DISABLED=1 npm run check`

## Authoring contract

One file per project in `src/content/projects/`; the file stem is the stable
route slug, independent of the editable `displayName`. Frontmatter must
satisfy `src/projects/projectSchema.ts`; invalid content fails the build.

- `downloads` records are raw authored data: a record without a `url` is a
  known-planned artifact, never rendered as a link. Only records with real
  `https` URLs become actions.
- `releaseMaturity` (dev state), `availability.status` (can a visitor get it
  now), and `visibility` (included in the catalogue or not at this phase;
  per-project routes arrive later) are independent: a finished private
  package is `stable` + `pending`, an alpha/beta can carry real downloads.
- The first three public featured projects by rank are the leads; the
  remaining ranked projects are secondary.
- Compact projects sort by `editorialOrder`: paddle-my-pdf, then the two
  Flutter packages adjacent, then yt-clip-extractor, spotify-screensave.
- Unknowns go in frontmatter `authoringNotes`, never as public calls to
  action or invented links. Gallery stays `[]` until Phase 2 placeholders.

## Workflow

Edit the project Markdown, run `npm run check`, then `npm run build` before
pushing. Publishing a release means uploading the versioned artifact to R2,
adding its real URL/version/size/filename to the entry, and redeploying.

## Owner-input TODOs

Marked per file in `authoringNotes`; still needed before launch:

- Public download URLs, versions, sizes, filenames, install notes (all builds).
- HanScan: whether English translation works offline (only OCR is offline).
- Vocal aligner: final product name (working name only).
- WayToClip: source URL (unknown — not linked) and GNOME listing URL.
- LaoZi: desktop/web artifacts (only the Android APK is confirmed).
- HanKan Windows/Linux, yt-clip-extractor: exact bundle/extension/installer formats.
- Paddle-my-pdf / spotify-screensave: source/install destinations.
- Flutter packages: pub.dev URLs once published.
- Contact details, professional links, and real screenshots/previews (Phase 2).
