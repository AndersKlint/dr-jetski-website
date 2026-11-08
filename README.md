# Dr. Jetski Studios website

## Status

Phases 1 and 2 are complete: an Astro static site with ten validated project
entries, a responsive staggered homepage, compact project grid, locally hosted
fonts, studio identity, and About/contact area. Project media is replaceable
through each content folder; most entries still use clearly labeled concept
previews, while JetAlign uses real media.

Phase 3 provides project detail pages, card navigation, and preview playback;
project galleries use a manual layered carousel with dots, swipe, and keyboard
access. Project authoring uses one folder per project with co-located media; see
[PROJECT-ASSETS.md](PROJECT-ASSETS.md) for the authoring guide. See
[PLAN.md](PLAN.md) for the implementation milestones and [AGENTS.md](AGENTS.md)
for source organization.

## Commands

Requires Node >=22.22.0 and npm >=9.6.5. Run `npm ci` from the repository root
for a clean dependency install. The `make` commands also require `make`;
`make deploy-prod` requires Git and access to `origin`.

- `npm run dev` — local development server.
- `npm run check` — Astro content/type checks.
- `npm run build` — production build.
- `make check` — local production preparation: runs
  `ASTRO_TELEMETRY_DISABLED=1 npm run check`, then `npm run build` sequentially,
  stopping if checks fail. Writes the static site to `dist/`; this does not deploy it.
- `npm run preview` — preview the production build.
- `make upload PROJECT=jetalign` — explicitly upload ignored local release
  folders to R2; add `DRY_RUN=1` for authenticated reads
  only. See [DOWNLOADS.md](DOWNLOADS.md) for credentials, safety checks, and public
  verification; this command does not publish metadata or deploy the site.
- `make deploy-prod` — first require `make check` to succeed, then fast-forward
  `release` to fetched `origin/main` and push it to trigger the Cloudflare
  Workers Builds production deployment; see the workflow below.

`make check` replaces `make prod`; there is no compatibility alias.

Run checks with telemetry disabled if init fails in restricted environments:

- `ASTRO_TELEMETRY_DISABLED=1 npm run check`

## JetAlign updates form

Only `/projects/jetalign` loads Sender's inline head loader and embeds the owner's
form below the installation section in `#updates`. Sender owns the heading, copy,
fields, and signup behavior; `src/newsletter/` contains the loader and mount.
The account and form identifiers are public, not secrets. No backend or custom
signup logic is involved. JavaScript and access to Sender are required.

The owner reports that double opt-in is now enabled. Sender sender/domain
verification status remains unknown; widget rendering and confirmation/unsubscribe
behavior have not yet been verified with the updated embed.

**Keep this integration local until Sender verification and the checks below are
complete. Public staging can collect real submissions too.** Before publishing
through the owner's Workers Git integration:

- Complete Sender's sender/domain verification. In Cloudflare DNS, add exactly
  the record types, names, values, and proxy settings supplied by Sender, then
  confirm verification in Sender; do not guess DNS values.
- Review the form's consent text,
  privacy information, confirmation message, and success state in Sender.
- Confirm the updated supplied form renders locally; rendering remains unchecked.
- Manually use an owner-controlled address to check that an unconfirmed signup
  is not subscribed, the confirmation link activates it, and the unsubscribe
  link removes it. This check sends real email and must be performed by the owner.
- Review the loaded widget on desktop/mobile, keyboard focus, and confirmation/
  unsubscribe behavior before public launch. No hosted-form fallback URL has
  been supplied; the no-JavaScript message does not offer an invented link.

## Deployment on Cloudflare Workers Builds

The owner confirms the static site is deployed through Git-connected **Workers
Builds**, not Pages. The production target is https://drjetski.com. Actual account
settings, branch mappings, and deployed routes have not been independently
verified. Existing pending downloads and marked placeholders are acceptable for
the early WIP; the Sender launch gate above still applies to public staging.

In **Workers & Pages**, open the existing `dr-jetski-website` Worker rather than
creating a Pages project. Verify its Git connection to
`AndersKlint/dr-jetski-website` and these build settings:

| Setting | Value |
| --- | --- |
| Root directory | Repository root |
| Build command | `npm run check && npm run build` |
| Deploy command | `npx wrangler deploy` |
| Static assets | `wrangler.json`: `assets.directory` is `./dist` |
| Worker name | `dr-jetski-website`, matching `wrangler.json` and the dashboard |
| Environment variable | `NODE_VERSION=22.22.0` (or a compatible supported newer version) |

The intended mapping remains `release` for production and `main` for staging.
Verify the actual production branch and non-production preview settings in
Workers Builds before relying on promotion. Use the actual Worker preview URL
shown in the dashboard for a successful `main` build; no staging hostname is
assumed provisioned. Verify that `drjetski.com` is attached to the production
Worker, then check HTTPS, project routes, media, and the
`/projects/vocal-aligner` redirect on the deployed site.

Connect only source through Git. Cloudflare generates `dist/` before Wrangler
uploads its static assets; do not commit `dist/` or manually upload it as part of
this workflow. `make check` only validates and builds locally; use
`npm run preview` to inspect that build. Astro static output needs no SSR adapter or R2
Worker binding.

See [DOWNLOADS.md](DOWNLOADS.md) for owner-operated R2 setup, protection, upload,
and delivery verification. Binaries go directly to R2, outside the site build.

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
- The six public featured projects follow the priority in [DESIGN.md](DESIGN.md):
  the first three are leads and the next three are secondary, with ClipThat! sixth.
  These are catalogue groups only; all six homepage cards use uniform scale,
  preserving natural media aspect ratios and variable heights.
- Compact projects sort by `editorialOrder`: paddle-my-pdf, then the two
  Flutter packages adjacent, then spotify-screensaver (four compact projects total).
- ClipThat! uses display name `ClipThat!`, folder slug `clipthat`, and route
  `/projects/clipthat`, with `featuredRank: 6`.
- JetAlign is canonical at `/projects/jetalign`; `/projects/vocal-aligner`
  permanently redirects there. Its folder slug is `jetalign`.
- Unknowns go in frontmatter `authoringNotes`, never as public calls to
  action or invented links.
- Author gallery membership, order, and presentation in each project's
  `media.yaml`; `index.md` contains no gallery. Homepage cards use its first
  media item unless an independent `preview` record selects another. To replace
  a concept preview, update its `media` filename and `alt`, and remove
  `isPlaceholder: true`. See the authoring guide for image and video records.

## Workflow

Edit the project Markdown and media YAML, run `make check`, optionally inspect with
`npm run preview`, then commit and push the desired commits to `main`. Review
the resulting staging preview before promoting production.

Run `make deploy-prod` from a committed, clean worktree after the desired `main`
commits have been pushed. Its `check` prerequisite must complete content/type
checks and the production build successfully before any Git command runs, even
with `make -j`; failure stops deployment. It then runs these commands sequentially:

```sh
git fetch origin
git switch release
git pull --ff-only origin release
git merge --ff-only origin/main
git push origin release
git switch main
```

The merge uses fetched `origin/main`, so unpushed local `main` commits are not
deployed. Fast-forward failures require resolving the branch history before
retrying. If any command fails, make stops and may leave `release` checked out;
there is no automatic cleanup or branch restoration. A successful push triggers
Workers Builds asynchronously when `release` advances and the intended branch
mapping is configured; the target does not wait for the Cloudflare build or
verify deployment success. Inspect the Worker deployment and
production site afterward.

Publishing a software release also means explicitly running the local release
uploader, verifying public delivery, and only then adding its real URL/version/size/filename
to the entry before this Git workflow. Follow [DOWNLOADS.md](DOWNLOADS.md).
Staging and production may use the same R2 assets.

## Owner-input TODOs

Marked per file in `authoringNotes`; still needed before the full public launch
(not blockers for the accepted early WIP deployment):

- Public download URLs, versions, sizes, filenames, install notes (all builds).
- HanScan: whether English translation works offline (only OCR is offline).
- WayToClip: source URL (unknown — not linked) and GNOME listing URL.
- wumi: desktop/web artifacts (only the Android APK is confirmed).
- HanKan Windows/Linux, ClipThat!: exact bundle/extension/installer formats.
- Paddle-my-pdf / spotify-screensaver: source/install destinations.
- Flutter packages: pub.dev URLs once published.
- Contact details, professional links, and real screenshots/previews to replace
  the initial concept placeholders.
