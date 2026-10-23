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
- `make deploy-prod` — first require `make check` to succeed, then fast-forward
  `release` to fetched `origin/main` and push it to trigger the Cloudflare Pages
  production deployment; see the workflow below.

`make check` replaces `make prod`; there is no compatibility alias.

Run checks with telemetry disabled if init fails in restricted environments:

- `ASTRO_TELEMETRY_DISABLED=1 npm run check`

## Early WIP deployment on Cloudflare Pages

The accepted initial target is https://drjetski.com. Cloudflare provisioning and
the actual deployment are still pending; account setup has not been verified.
Existing pending-download states and clearly marked content/media placeholders
are acceptable for this early WIP. R2 setup can wait until substantial media or
software binaries need public delivery.

1. In Cloudflare, create a **Pages** project using Git integration and authorize
   access to the existing GitHub repository `AndersKlint/dr-jetski-website`.
   Choose a static Pages project; Astro static output needs no SSR adapter.
2. Set the production branch to `release` (already created by the owner), enable
   preview deployments for `main` (or optionally all non-production branches),
   and use the repository root as the root directory (leave the root-directory
   override empty). Apply the same build settings to production and previews:

   | Setting | Value |
   | --- | --- |
   | Build command | `npm run check && npm run build` |
   | Build output directory | `dist` |
   | Environment variable | `NODE_VERSION=22.22.0` (or a compatible supported newer version) |

3. Start the first deployment and inspect its build log and generated site.
4. In the Pages project's **Custom domains**, add `drjetski.com` and follow
   Cloudflare's domain/DNS instructions, including any required zone/nameserver
   setup for the apex domain. Register the domain with Pages through this flow;
   manually adding a DNS record alone does not connect it to the project.
5. Once domain activation and HTTPS are ready, verify the homepage, project
   routes, media, and the `/projects/vocal-aligner` redirect on https://drjetski.com.

Connect only the source repository through Git integration. `dist/` is generated
locally or by Cloudflare and is ignored by Git; do not commit or manually upload
it. `make check` validates and builds locally without publishing; optionally run
`npm run preview` to inspect that build.

After Git integration is configured, pushes to `main` trigger staging previews
at `https://main.<project>.pages.dev`; pushes to `release` trigger production at
https://drjetski.com once its custom domain is active. Replace `<project>` with
the actual Pages project name; it is a placeholder, not a provisioned project.
Preview URLs are public by default; Cloudflare Access protection is optional.

For an optional `staging.drjetski.com` hostname, first obtain a successful `main`
preview deployment. Add `staging.drjetski.com` in the Pages project's **Custom
domains**; Pages creates its DNS CNAME. Update that existing CNAME's target to
`main.<project>.pages.dev` using the actual project name and ensure it is
**proxied**. Verify domain activation,
HTTPS, and that the hostname serves the `main` preview. A DNS record alone does
not register the hostname with Pages.

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
  Flutter packages adjacent, then yt-clip-extractor, spotify-screensaver.
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
Pages asynchronously when `release` advances; the target does not wait for the
Cloudflare build or verify deployment success. Inspect the Pages deployment and
production site afterward.

Publishing a software release also means uploading the versioned artifact to
R2 and adding its real URL/version/size/filename to the entry before this Git
workflow. Staging and production may use the same R2 assets.

## Owner-input TODOs

Marked per file in `authoringNotes`; still needed before the full public launch
(not blockers for the accepted early WIP deployment):

- Public download URLs, versions, sizes, filenames, install notes (all builds).
- HanScan: whether English translation works offline (only OCR is offline).
- WayToClip: source URL (unknown — not linked) and GNOME listing URL.
- LaoZi: desktop/web artifacts (only the Android APK is confirmed).
- HanKan Windows/Linux, yt-clip-extractor: exact bundle/extension/installer formats.
- Paddle-my-pdf / spotify-screensaver: source/install destinations.
- Flutter packages: pub.dev URLs once published.
- Contact details, professional links, and real screenshots/previews to replace
  the initial concept placeholders.
