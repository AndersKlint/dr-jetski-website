# Implementation plan

## Status

Media cropping now uses optional `crop` on every media/preview record, replacing
`preview_crop`. Normal-media crops apply to homepage cards (including pairs),
carousel media and geometry, and store exports. Single homepage previews inherit
their matching gallery crop unless explicitly overridden. HanScan and wumi media
retain the rectangle below `yStart: 0.04`, including HanScan's video/poster.
Source files remain unchanged. This supersedes earlier uncropped-carousel and
uncropped-pair policies. Verification is build/type checks only; visual acceptance
is reserved for the owner.

The mobile-app homepage preview tracer bullet is promoted to the standard design
in DESIGN.md. A shared presentational component consumes a validated, explicitly
authored two-item `mobile-preview` selection from `media.yaml`, without project-slug
branches. HanScan selects its uncropped looping demo and `slope.png`; wumi selects
generation/import and study-back. Featured and compact cards support the same pair;
single-media cards, authored captions, carousels, and store exports retain their
existing behavior. Authoring and validation are defined in PROJECT-ASSETS.md.

Verification passed: `make check` (content/type checks and production build) and
`git diff --check`. Browser checks covered both pairs at 320px, 390px, and 1440px,
correct source order, uncropped media, image loading, single-link cards, and no
horizontal overflow. HanScan automatic playback, global pause, and reduced-motion
unloaded posters passed. Mobile card screenshots were visually inspected. No unit
tests or deployment were performed; owner visual acceptance remains pending.

Implementation plan confirmed by the owner alongside [DESIGN.md](DESIGN.md). Terminology is defined in [GLOSSARY.md](GLOSSARY.md).

Phase 1 is complete: the Astro static foundation, validated content model, catalogue selection service, and ten authored launch projects are implemented.

Phase 2 is complete: the visual system, locally hosted typography, studio wordmark and wake artwork, responsive staggered showcases, compact project grid, About/contact area, and ten replaceable concept previews are implemented. Content/type checks and the production build pass. Chrome verification covered 320–1440px viewports, project ordering, non-overlapping layouts, first-project visibility, image/font loading, and keyboard skip navigation.

Phase 3 is implemented: ten public project routes, card navigation, compact return banners, responsive galleries, Markdown details, platform download/availability panels, social metadata, and page-scoped media playback are in place. Content/type checks and the production build pass. Local Chrome verification covered 320px, 390px, and 1440px layouts, public/draft routing, gallery placement, image loading, navigation, and keyboard skip/focus behavior. Existing media remain still-image placeholders; verification of actual video playback, the three-loop cap, preference fallbacks, audio activation, and throttled video loading remains pending representative media. Real release destinations and production delivery remain phase 4 work.

The supplied logo suite is integrated: the homepage banner displays the full logo with no duplicate header mark, compact wordmarks on other pages, and an SVG favicon. Content/type checks and the production build pass. Local Chrome verification covered 320px, 390px, 768px, and 1440px layouts, logo proportions/loading, first-project visibility, overflow, home links, keyboard focus, and icon delivery.

The coordinated warm suite is integrated: the full, compact, and DRJ marks use the root files coordinated from the latest approved main, including its water overlap and foreground lettering. The compact retains the custom J/e layers with a larger Studios signature; the icon adapts the J foreground treatment to a square composition. The main artwork and colorful archive are unchanged. Content/type checks and the production build pass. Chrome verification covered the homepage and project header at 320px, 390px, and 1440px, compact renders at 192/240/320px, icon renders at 16–128px, and current SVG favicon delivery, with no horizontal overflow or loading errors.

The full homepage logo has since been redesigned and refined in `logo/dr-jetski-studios-logo.svg` following the current logo direction in DESIGN.md. The self-contained SVG retains editable lettering and water layers, and a reusable preview renderer is saved in `logo/tools`. Content/type checks and the production build pass for the latest revision. Chrome verification covered the updated asset at 320px, 390px, 768px, and 1440px homepage viewports, checking rendering, proportions, alternative text, keyboard skip navigation, first-project visibility, and absence of horizontal overflow or loading errors.

The orange/near-white palette refinement is implemented across the interface and all ten temporary preview illustrations, following the updated full logo. Typography, spacing, catalogue content, and responsive composition are unchanged. The owner's full-logo edits and pure-white reference asset are preserved; compact-logo, icon, and light-theme artwork updates remain separate work. Content/type checks pass with no errors, warnings, or hints, and the production build generates all twelve intended pages. Browser visual review is reserved for the owner as requested.

The folder-based project asset workflow is implemented: each project lives at `src/content/projects/<slug>/index.md` with co-located local media, explicit local references, automatic image dimensions, local video posters, and support for R2-hosted preview/demo video and binary URLs. Authoring is defined in [PROJECT-ASSETS.md](PROJECT-ASSETS.md). `ASTRO_TELEMETRY_DISABLED=1 npm run check` passes (29 files, 0 errors/warnings/hints), `ASTRO_TELEMETRY_DISABLED=1 npm run build` generates the 12 intended pages, and `git diff HEAD --check` is clean. Local authoring updates are verified: the dev smoke check returned HTTP 200 for the home and a project detail route, a reversible Markdown edit was visible through HMR, and an SVG replacement updated dimensions and color before being restored. Adapter verification confirmed raster images produce responsive output and a mismatched video/poster aspect ratio fails the build. R2-hosted URLs are supported but no production media is uploaded yet. Representative desktop/mobile visual checks and actual video playback, reduced-motion/data-saving fallbacks, the simultaneous-loop cap, and audio behaviour remain pending real media.

The compact-wordmark and SVG favicon updates are complete using the approved vector master; asset and archive details are in [logo/README.md](logo/README.md). Both derivatives preserve their corresponding master layers exactly. Content/type checks pass with no errors, warnings, or hints, and the production build generates all twelve pages. Chrome verification covered compact renders at 192/240/320px, icon renders at 16–512px, and home/project views at 320px, 390px, and 1440px, including image loading, aspect ratios, overflow, favicon delivery, keyboard focus, and home navigation. The full-vector preview renderer is verified at 768px and 1600px.

The JetAlign rename and manual project-carousel follow-up is implemented: JetAlign is canonical at `/projects/jetalign` with a permanent redirect from the former `/projects/vocal-aligner` route, and project galleries use one uncropped selected item with wraparound previous/next navigation, thumbnails, swipe and keyboard access, and no automatic advance. Selected video previews loop silently near or within the viewport, inactive previews pause, explicit navigation restarts a returned video, and the page-wide three-preview cap and global pause control remain. Local H.264 MP4 previews are supported alongside HTTPS/R2 sources, with generated posters and thumbnails. `ASTRO_TELEMETRY_DISABLED=1 npm run check` passes (32 files, 0 errors/warnings/hints), `ASTRO_TELEMETRY_DISABLED=1 npm run build` generates 12 pages including `/projects/jetalign`, and `git diff --check` passes. Headless Chrome smoke checks covered selection, wraparound, keyboard access, thumbnails, selected-preview lazy loading, restart on return via explicit navigation, scroll pause/resume, the global pause-motion control, reduced-motion fallback, and no overflow at 320px. Save-data behavior, throttled cold-load media fetching, and real touch gestures remain unverified. Production redirect behavior awaits deployment because localhost does not interpret Cloudflare `_redirects`.

The project-carousel presentation redesign is implemented: the selected main media is capped at about 60% of the viewport height without cropping while preserving its aspect ratio, detached previous/next buttons are replaced by clickable, partially transparent cut-off neighbor media previews with large transparent-background arrow overlays, and bottom thumbnails remain. Existing wraparound, swipe, keyboard, no-auto-advance, and selected-only silent looping playback/preferences are unchanged. `ASTRO_TELEMETRY_DISABLED=1 npm run check` passes (33 files, 0 errors/warnings/hints), `ASTRO_TELEMETRY_DISABLED=1 npm run build` generates 12 pages, and `git diff --check` is clean. Chrome verification covered 1440×900 (HanScan 303.8×540 and JetAlign 629.1×540, both 60% with no crop) and 390×844 (HanScan 284.8×506.4, 60%), plus 320px without horizontal overflow. It also covered clickable side peeks selecting the correct neighbor with wraparound, keyboard and thumbnail navigation, scroll/swipe settling rather than physical touchscreen gestures, selected muted looping playback, deferred/inactive video pausing and restart on return, offscreen pause/resume, and reduced-motion posters. The orchestrator visually inspected desktop and mobile screenshots.

The floating layered-stack carousel redesign is implemented. The orchestrator reviewed the source and HanScan/JetAlign desktop/mobile screenshots, and a fixed singleton-preview `isPlaybackManaged` condition makes shared playback observations correct. Independently, `ASTRO_TELEMETRY_DISABLED=1 npm run check` passes (33 files, 0 errors/warnings/hints), `ASTRO_TELEMETRY_DISABLED=1 npm run build` generates 12 pages, and `git diff --check` is clean. Implementer Chrome verification measured 1440×900 HanScan 303.8×540 and JetAlign 629.1×540, 390×844 portrait 284.8×506.4, and 320px without horizontal overflow. Current 5- and 4-item galleries show unique visible slots; clicking an outer neighbor selects exactly, and keyboard wrap, focus plus Enter, thumbnails, and CDP touch swipe work. Hover/focus raises a neighbor to z5 below the selected z6. The selected muted loop plays, inactive videos stay unloaded, return navigation resets, offscreen playback resumes, and the pause control works. Reduced motion disables transitions/video; save-data and background behavior were simulated only. No current gallery has two or three items or mixed aspect ratios, so those branches and aspect handling are reviewed in logic but not browser-verified. Physical touchscreens remain unchecked. Without JavaScript the static initial item and side posters remain usable, but navigation does not change the selected item; an interactive no-JS fallback is not claimed.

The bounded layered-stack carousel refinement is implemented. Navigation stops at the first and last items, depth-2 neighbors remain behind depth-1 during hover/focus, and clickable round dots replace thumbnails and the visible counter. Mouse hover adds no outline; the selected item stays static and keyboard focus remains visible. Persistent layer geometry provides horizontal transform transitions without page jumps, retaining the uncropped 60%-viewport-height cap and selected-only silent looping behavior. Independent content/type checks pass (33 files, 0 errors/warnings/hints), the production build generates 12 pages, and `git diff --check` is clean. Chrome verification covered HanScan and JetAlign at 1440×900, 390px, and 320px: bounded navigation, dots, hover depth, keyboard and emulated swipe, intermediate animation positions with stable page geometry, playback pause/resume/restart, reduced motion, and no horizontal overflow. Height-only viewport resizing correctly updates the stage; mixed-aspect height transitions were checked synthetically. Physical touchscreens, save-data, and background behavior were not rechecked in this refinement.

The initial feature-overlay implementation used an optional `image_overlay_text.md` sidecar per project, ingested as a watched raw asset and not registered in `index.md`. Blocks matched exact, case-sensitive original media filenames; unmatched names were ignored. The centered banner used a fractional `y` coordinate clamped to stay inside the media. Overlays rendered on the homepage's first-media preview and the selected carousel item only. This historical format is superseded by the approved milestone below; current authoring is defined in [PROJECT-ASSETS.md](PROJECT-ASSETS.md) and visual policy in [DESIGN.md](DESIGN.md). `ASTRO_TELEMETRY_DISABLED=1 npm run check` passed (35 files, 0 errors/warnings/hints), the production build generated 12 pages, and `git diff --check` was clean. Final visual and interaction acceptance was reserved for the owner; no further browser or manual verification was performed.

The visual-only feature-overlay refinement is implemented following DESIGN.md. Existing media-relative positioning and edge clamping are retained. Code review, content/type checks (35 files, 0 errors/warnings/hints), the production build (12 pages), and `git diff --check` pass; visual and interaction review remain reserved for the owner.

Optional per-project homepage preview crops are implemented following [DESIGN.md](DESIGN.md), with HanScan configured. Orchestrator verification: `ASTRO_TELEMETRY_DISABLED=1 npm run check` passes (38 files, 0 errors/warnings/hints), `ASTRO_TELEMETRY_DISABLED=1 npm run build` passes (12 pages), and `git diff --check` passes. Quick code review found no major issues. Manual desktop/mobile visual and playback acceptance remains pending.

## YAML per-media settings

Implemented and integrated; review found no major issues. Watched `media.yaml`
sidecars replace all three Markdown sidecars and their parser, preserving captions
and positions and adding pixel offsets, dark/light styles, and authored homepage
crops. HanScan's crop now lives in its media entry; the old format, hardcoded crop
map, and crop-specific `HomeProject` plumbing are removed. Current authoring is
defined in [PROJECT-ASSETS.md](PROJECT-ASSETS.md).

Final orchestrator verification passed: `ASTRO_TELEMETRY_DISABLED=1 npm run check`
covered 35 files with 0 errors, 0 warnings, and 0 hints;
`ASTRO_TELEMETRY_DISABLED=1 npm run build` generated 12 pages; and
`git diff --check` passed. Owner manual desktop/mobile visual, overflow, carousel,
and playback acceptance remains pending.

## Independent homepage preview selection

Implemented; quick integration review found no major issues. Preview selection
and independent settings follow [PROJECT-ASSETS.md](PROJECT-ASSETS.md) and
[DESIGN.md](DESIGN.md). All three existing `media.yaml` files have explicit preview
entries seeded with current settings to preserve homepage appearance: HanScan
retains its `yEnd: 0.84` crop, JetAlign selects `jetalign_default.png` at
`text_pos_y: 0.26`, and WayToClip selects `1_waytoclip_demo.mp4` with its current
caption, `text_pos_y: 0.1`, and offset `y: -38`. HanScan's normal media entry
retains its gallery caption without a crop. Final orchestrator verification passed:
`ASTRO_TELEMETRY_DISABLED=1 npm run check` covered 35 files with 0 errors,
0 warnings, and 0 hints; `npm run build` generated 12 pages; and
`git diff --check` was clean. Manual desktop/mobile visual, overflow, carousel,
and playback acceptance remains pending with the owner.

## Early WIP deployment milestone

Historical record: the Pages-specific setup proposed below is superseded by the
current Workers hosting and downloads preparation milestone. Retain its local
verification as history, not as instructions to provision a Pages project.

Accepted scope: publish the current static site to the confirmed domain in
[DESIGN.md](DESIGN.md), allowing existing pending downloads and clearly marked
content/media placeholders. This is an early WIP, not completion of phase 4.

- Historical initial repository preparation used root `make prod` for sequential
  content/type checks and a static production build into `dist/`, Astro's `site`
  is `https://drjetski.com`, and [README.md](README.md) documents local preparation
  and Git deployment. The main orchestrator reviewed the full diff and Makefile
  with no major issues. `make prod` passed: Astro checked 35 files with 0 errors,
  warnings, or hints, and the production static build generated 12 pages.
  `git diff --check` also passed.
- Manual Cloudflare setup remains unperformed: verify account access, connect
  the existing GitHub repository to a static Pages project with production
  branch `release` and preview branch `main`, configure the build, deploy, and attach the domain through Pages
  Custom domains. Domain activation and actual deployment remain pending; verify
  HTTPS, routes, redirects, and media on the deployed site afterward.
- Defer R2 provisioning and binary publication until needed for substantial
  media/downloads; full release metadata and final content remain phase 4 work.

## Historical milestone: staging and production promotion workflow

The Git promotion commands and their verification remain applicable. The
Pages-specific hosting configuration and preview-hostname instructions below are
superseded by the current Workers milestone; they are not current setup tasks.

The revised branch decision is recorded in [DESIGN.md](DESIGN.md); operational
instructions are in [README.md](README.md). The owner confirms `release` already
exists. The initial `make prod` command and its verification above are historical.

- Replace `make prod` with `make check`, with no compatibility alias: run
  content/type checks and then the production static build to ignored `dist/`,
  sequentially and stopping on failure. This command does not publish.
- Add `make deploy-prod` with `check` as a prerequisite: content/type checks and
  the production build must succeed before any Git command runs, including with
  `make -j`; failure stops deployment. Then run the exact sequence `git fetch origin`,
  `git switch release`, `git pull --ff-only origin release`,
  `git merge --ff-only origin/main`, `git push origin release`, `git switch main`.
  Document a committed clean worktree and already-pushed desired `main` commits
  as prerequisites. Promotion uses fetched `origin/main`, excludes unpushed
  commits, stops on failure, and may leave `release` checked out. The push triggers
  an asynchronous Pages deployment; the target does not wait for it.
- Configure source-only Pages Git integration with production branch `release`,
  staging previews for `main` (optionally all non-production branches), and the
  same `npm run check && npm run build`, output `dist`, and existing Node setting
  for both. Do not commit or upload `dist/`.
- Verify a successful `main.<project>.pages.dev` preview using the actual project
  name. Optionally register `staging.drjetski.com` in Pages Custom domains, then
  update the CNAME created by Pages to target that branch alias and ensure it is
  proxied. Previews are public by default;
  Access is optional. Production uses `drjetski.com`; R2 assets may be shared.
- Final orchestrator verification passed: `make -n deploy-prod` shows the exact
  six requested commands, and `make -n check` shows the expected checks/build.
  `make check` passed Astro content/type checks (35 files, 0 errors, 0 warnings,
  0 hints) and the static production build (12 pages); `git diff --check` passed.
  Quick review found no major issues. `deploy-prod` was only dry-run; no fetch,
  switch, pull, merge, or push was executed. Cloudflare configuration,
  staging/production deployment, custom-domain HTTPS,
  deployed routes, redirects, and media verification remain pending.

## Workers hosting and downloads preparation

Accepted scope: correct the documented hosting model and prepare the first R2
release without account changes, uploads, or deployment. Hosting decisions are in
[DESIGN.md](DESIGN.md), deployment operations in [README.md](README.md), and R2
account/upload/protection operations in [DOWNLOADS.md](DOWNLOADS.md).

- The owner reports the site already uses Workers Static Assets deployed by
  Workers Builds Git integration. Repository inspection confirms `wrangler.json`
  names `dr-jetski-website`, serves `./dist`, and includes `previews: {}`. No
  Makefile or Wrangler changes are needed for this preparation milestone.
- Retain the intended `release` production / `main` staging workflow and existing
  `make check` / `make deploy-prod` commands. Verify the existing Workers Builds
  branch, build, and deployment settings in the dashboard; record actual URLs
  rather than assuming Pages branch aliases. Independently verify domain/DNS,
  HTTPS, deployed routes, redirects, and media. These checks remain pending.
- Verify the agreed R2 Standard public releases bucket `dr-jetski-downloads`
  and `downloads.drjetski.com` using DOWNLOADS.md. The owner now reports the bucket,
  rate-limit rule, and budget alert are set up; no live settings are independently
  verified. Domain activation, disabled `r2.dev`, credentials, public delivery, and
  protection effectiveness remain unverified. A renewed November 7, 2026
  orchestrator `curl --head https://downloads.drjetski.com/` check still fails DNS
  resolution from this environment. API credential/access verification is
  separate from public custom-domain activation; neither establishes the other.
- The supplied local `JetAlign-v0.5.0-beta.2-linux-x86_64.tar.gz` is verified as
  a Linux CLAP/VST3 bundle, version `v0.5.0-beta.2`, size 4,571,716 bytes. Prepare
  one combined Linux download record, retaining a pending state with no URL until
  the versioned public artifact is uploaded and verified. Other releases remain
  dependent on supplied artifacts and destinations.
- DOWNLOADS.md owns the operational protection and cost constraints; preparation
  does not mean protection is installed, billing is capped, or public delivery
  works. No account operation, upload, or deployment is performed by this
  milestone. Content and documentation preparation is implemented. Independent
  orchestrator verification re-read the archive and confirmed its exact size and
  SHA-256; `make check` passed Astro content/type checks (43 files, 0 errors,
  warnings, or hints) and the production build (14 routes). DNS control confirmed
  `drjetski.com` resolved while `downloads.drjetski.com` did not at that prior check. No unit tests,
  browser checks, or live delivery tests were run. Owner account, public delivery,
  and protection verification gates above remain pending despite the subsequent
  owner-reported setup. Phase 4 remains incomplete.

## Current milestone: local upload-only release folders

Approved bounded scope: implement the local uploader and document its operation,
without account changes, authenticated account calls, uploads, or deployment.
Implementation and integration are complete with local verification below; live
API behavior and public delivery remain unverified. Phase 4 remains incomplete.

- Ignore `src/content/projects/<slug>/releases/<version>/<filename>` in Git and
  exclude it from the static build. Map it to R2
  `releases/<slug>/<version>/<filename>`. Stage the supplied JetAlign Linux archive
  at `releases/v0.5.0-beta.2/` within its project, retaining the original in Downloads
  and the verified metadata above; keep its download URL absent.
- Require explicit `npm run releases:upload -- --project <slug>`; support `--help`
  and authenticated read-only `--dry-run`. Install the S3 SDK through npm, with no
  AWS CLI dependency. Load ignored local `.env` through Node
  `--env-file-if-exists`, with an empty-value `.env.example`.
- Require 32-hex `R2_ACCOUNT_ID`, `R2_ACCESS_KEY_ID`, and `R2_SECRET_ACCESS_KEY`;
  optional `R2_BUCKET` defaults to `dr-jetski-downloads`. Document bucket-scoped
  Object Read & Write S3 credentials and local-only secret handling in DOWNLOADS.md.
- Discover supported installers/archives in version folders and stream hashes.
  HEAD each remote key first: skip only matching SHA-256 metadata plus size,
  upload only on 404, and stop on other errors, conflicts, or missing SHA metadata.
  Do not adopt legacy objects automatically or download all remote bytes each run.
- Upload atomically with `If-None-Match: *`, MIME/attachment headers, immutable
  caching, SHA-256 metadata, and Content-MD5 integrity. Never overwrite, delete,
  sync, or prune; removing local files leaves remote versions intact. Retention
  remains manual removal of obsolete unlinked versions, with current plus last
  known-good recommended rather than an automated policy.
- Print URL/version/filename/size/hash without modifying metadata, availability,
  or deployment. The owner must verify public downloaded bytes before manually
  publishing the Linux URL and availability; Windows stays pending and the
  [Sender gate](README.md#jetalign-updates-form) still applies.
- Operational instructions are authoritative in [DOWNLOADS.md](DOWNLOADS.md);
  folder authoring is in [PROJECT-ASSETS.md](PROJECT-ASSETS.md). No tests or live
  account verification are part of this milestone's implementation work.

Integrated verification:

- Installed S3 SDK `3.1164.0` and Node 22 type declarations. The JetAlign archive
  is staged in its ignored release folder; independent `cmp` against the source
  and SHA-256 verification passed. Git ignore checks confirmed the archive and
  local `.env` are excluded.
- CLI help passed. An actual HanScan empty-tree dry-run exited without credentials
  or cloud access. JetAlign discovery with credentials explicitly absent reached
  the expected `R2_ACCOUNT_ID` required failure before network access. Native S3
  adapter import passed without API calls.
- Independent static safety review found no major issues. Final orchestrator
  `make check` passed: 47 files, 0 errors/warnings/hints, and 14 production routes.
  `git diff --check` passed.
- No unit tests or test harnesses, authenticated cloud reads, uploads, account
  changes, deployment, browser acceptance, or 200 MB transfer validation were
  performed. Real credentials/API access and actual remote skip/conflict responses
  remain unverified. The custom hostname still fails DNS resolution from this
  environment; public-domain activation and downloaded-byte verification remain
  separate outstanding gates. No live functionality validation is claimed.

## HanScan privacy policy

Confirmed scope is defined in [DESIGN.md](DESIGN.md); policy authoring and
manual synchronization are defined in [PROJECT-ASSETS.md](PROJECT-ASSETS.md).

Implemented; orchestrator quick code review found no major issues. `cmp` confirmed
the bundled policy is byte-for-byte equal to `../hanscan/privacy-policy.md`.
`make check` passed content/type checks (37 files, 0 errors/warnings/hints) and
the production build (13 pages, including `/projects/hanscan/privacy`).
`git diff --check` passed before this final documentation edit. Manual
desktop/mobile and keyboard review and publication verification remain pending.

## Store screenshot generator milestone

Accepted scope: a local CLI at
`./store-screenshot-generator/store-screenshot-generator` renders original gallery
images with their normal feature-overlay settings. Setup, options, output paths,
and caption authoring are defined in [PROJECT-ASSETS.md](PROJECT-ASSETS.md).

- Require `--project-name`; support optional six-digit `--highlight-color` for
  the caption left accent (default site `--ember`, generated-document override
  only) and `--background-color`
  (with or without `#`), `--background-image <path>`, `--stylized-text`,
  `--text-outline` (optional black caption/heading outline, preserving text fill),
  `--text-shadow` (optional slightly blurred black caption/heading drop shadow),
  `--padding <percent>`, `--no-padding`,
  `--device <phone|tablet>` (default phone),
  `--no-text-overlay`, mutually exclusive boolean `--phone-frame` and
  `--stylized-frame` (both default off),
  `--image-dir`, `--output-dir`, `--text-offset <x,y>` (override caption YAML
  offsets), `--crop-status-bar <pixels>`, and `--help`. Default to transparent
  generic PNG assets and ignored tool-relative `output/<slug>/`, overwriting matching
  generated PNGs. Transparent defaults are not Google Play-compliant; use
  `--background-color 211e1b` for opaque RGB exports, including source transparency.
- Read images in `media.yaml` gallery order, include uncaptioned images, skip all
  videos, and reuse the existing parser's gallery items and normal media settings.
  Homepage preview captions and crops do not apply.
- `--background-image <path>` fills the canvas behind text and screenshots with
  a local image using centered cover sizing. Resolve relative paths from the
  invocation directory. Composite it above any selected background color.
- `--stylized-text` replaces each image's normal caption bubble with a centered
  white Inter 900 heading above the screenshot. Preserve authored line breaks,
  wrap and shrink long headings to fit, and reserve measured heading space before
  fitting the full screenshot or phone beneath it. Images without text keep the
  normal layout. Bubble-specific positions, accents, styles, and offsets do not
  apply; `--no-text-overlay` does not suppress stylized headings.
- Use headless Chrome through `playwright-core`, the site's Inter font, and
  `src/media/featureOverlay.css` shared verbatim with `FeatureOverlay.astro`.
  Preserve site presentation when extracting the existing CSS.
- `--crop-status-bar <pixels>` removes a non-negative integer number of source
  pixels from the top of every loaded image, defaulting to zero. Require the
  amount to be less than each image's height. Apply before orientation selection,
  fitting, rounding, shadows, phone framing, and caption placement; captions use
  the cropped geometry. Keep original files unchanged.
- In phone mode, render 1440×2560 for portrait or square images and 2560×1440
  for landscape images, using dimensions after any top crop. Tablet mode always
  renders a 3840×2160 landscape canvas; expect a matching-resolution background.
  Tablet image corners use 1.5% of the screenshot's shorter edge, or 3.5% with
  `--stylized-frame`, with SVG shadow dimensions scaled against that edge.
  Tablet headings start at 7.5% of the canvas short edge and shrink to fit within
  20% of its height. Keep source aspect ratios and the existing padding behavior.
  Without `--phone-frame`, uniformly fit the remaining image inside
  the selected padding and center the image itself on the canvas. Padding sets the image's minimum
  inset on every edge as a percentage of the canvas's short edge. Default
  to 8%; accept finite decimal percentages from 0 inclusive to 50 exclusive
  (for example, `--padding 2.5`). `--no-padding` overrides the minimum inset to
  zero; `--no-text-overlay` omits all caption bubbles. Preserve source aspect ratio without
  crop-to-fill or cover sizing; resampling to fit is allowed. Ignore the feature
  overlay and shadow when computing fit, centering, and padding. They follow the
  image's scale and authored placement, may extend into the padding, and may
  clip at the output canvas edge; they are not part of the minimum inset.
- With `--phone-frame`, use `store-screenshot-generator/phone-frame-9-20.svg` with
  its metallic rim, flat side buttons, rounded screen opening, and black camera
  dot. Keep its native opening fixed at 1440×3200 (9:20) and rotate for landscape
  images. Fit screenshots uniformly inside the opening, centering them with
  black padding when their aspect ratio differs; preserve the frame proportions.
  Screen-corner rounding and the camera may obscure the screenshot.
  Uniformly fit and center the entire phone's outer edges within the selected
  padding, shrinking the screenshot within the phone. Caption geometry remains
  relative to the actual screen/image box, excluded from fit and padding, and
  retains the same allowed overflow and canvas-edge clipping.
- With `--stylized-frame`, use `store-screenshot-generator/stylized-frame.svg`:
  apply rounded corners and a strong drop shadow directly to the screenshot,
  with no visible frame, border, or added letterboxing. Preserve the source's
  natural aspect ratio. Use a 24 CSS-pixel reference radius at a 360 CSS-pixel
  image width, capped at one twelfth of the shorter image dimension. Fit and
  center the screenshot inside the selected padding, excluding its shadow
  from bounds; small or zero padding may clip the shadow at the canvas edge.
- Without either frame, retain subtle image-corner rounding: 8 CSS pixels at a 360 CSS-pixel image
  width, scaled with the image and optionally capped for a narrow shorter
  dimension. Keep output canvas corners square. Padding is not a guarantee
  against unspecified Google Play UI behavior.
- For opaque exports, follow the Google Play phone screenshot geometry/format and upload guidance
  linked in [PROJECT-ASSETS.md](PROJECT-ASSETS.md); do not claim all-device listing
  suitability or promotion eligibility from geometry alone. Caption and other
  content requirements still need manual review. The optional generic phone
  frame is a marketing asset, not a promotion-compliance claim; official guidance
  recommends avoiding device imagery.
- Keep the same executable, gallery processing, output locations, overwrite and
  working-directory behavior. No image selection, video support, or broad
  platform-compatibility work. Chrome is installed separately, with `CHROME_PATH`
  available to override discovery.

The initial CSS phone framing with rounded outer corners, square unclipped screens,
and highlight-color support is implemented. Orchestrator quick review found no
major issues. Running the CLI with `--project-name hanscan --phone-frame
--highlight-color 33aaff --output-dir /tmp/opencode/store-rounded-phone` produced
four PNGs; visual inspection of `workbook_popup.png` confirmed the rounded outer
phone, square screen, and blue accent together. Earlier manual exports covered
portrait/landscape, transparent/opaque, and unframed output, with centered bezel
bounds meeting minimum padding; highlight validation and pixel comparison also
passed. Final orchestrator verification passed:
`ASTRO_TELEMETRY_DISABLED=1 npm run check` covered 37 files with 0 errors,
warnings, or hints, and `npm run build` generated 13 pages. Owner final visual
acceptance remains pending.

The first silver SVG frame replaced the initial CSS bezel. That version adapted the
SVG's straight sections to the source aspect ratio, preserves its corner radii
and camera circle, and rotates it for landscape images. HanScan portrait and
JetAlign landscape exports were rendered and visually inspected in
`/tmp/opencode/store-svg-phone-hanscan` and
`/tmp/opencode/store-svg-phone-landscape`. Content/type checks passed with
39 files and no errors, warnings, or hints; the production build generated
13 pages.

The supported phone frame is now `phone-frame-9-20.svg`; the old 9:16 asset is
removed. Its screen stays fixed at 1440×3200, with other screenshot ratios
centered inside black padding rather than changing the phone's proportions.
Portrait and landscape exports were visually inspected in
`/tmp/opencode/store-fixed-modern-hanscan` and
`/tmp/opencode/store-fixed-modern-landscape`. Content/type checks passed with
37 files and no errors, warnings, or hints; the production build generated
13 pages, and `git diff --check` passed.

## YAML-driven carousel milestone

Implementation is complete and follows the content-delivery decision in [DESIGN.md](DESIGN.md)
and authoring format in [PROJECT-ASSETS.md](PROJECT-ASSETS.md).

- Migrated every project's gallery from `index.md` to ordered `media.yaml`
  records, with no legacy fallback. Independent homepage preview selection
  and presentation add no item and do not affect carousel order.
- Authored media is validated at the shared parser seam and referenced assets
  resolve in the app, supporting local images and local/HTTPS videos with full metadata.
- Updated the screenshot generator to consume parsed YAML gallery order, image
  sources, and feature overlays while skipping videos and retaining slug and
  preview-match validation and existing rendering/options.
- Final orchestrator review covered core, parser, adapter, migrations, exporter,
  and docs and found no major issues. `ASTRO_TELEMETRY_DISABLED=1 make check`
  passed content/type checks (37 files, 0 errors/warnings/hints) and the production
  static build generated 13 pages, including optimized handwritten/gate assets.
  No unit tests were run. Owner manual visual/carousel acceptance remains pending.

## Feature-overlay side selection

Accepted scope: optional left/right label placement for normal media and independent
homepage previews, following [DESIGN.md](DESIGN.md); authoring is defined in
[PROJECT-ASSETS.md](PROJECT-ASSETS.md). Preserve readable text and additive
screen-axis offsets while mirroring the outer accent and default overlap.
Implementation is complete; orchestrator quick review found no major issues.
Independent orchestrator verification passed: `ASTRO_TELEMETRY_DISABLED=1 npm run check`
covered 37 files with 0 errors, warnings, or hints;
`ASTRO_TELEMETRY_DISABLED=1 npm run build` generated 13 pages; and
`git diff --check` passed. No unit tests were run. Owner manual desktop/mobile
visual acceptance remains pending.

## Feature-overlay ribbon wrap (overruled)

Reverted in favor of the original flat label. The final design, reference image,
and restoration code are archived in
[wrap-around-ribbon.md](overruled_design_decisions/wrap-around-ribbon.md).

## ClipThat! rename and sixth featured project

Implementation is complete; orchestrator quick review found no major issues.
yt-clip-extractor is renamed to ClipThat!, with project folder and slug `clipthat`,
route `/projects/clipthat`, and featured rank 6. Screenshots and `media.yaml` were
preserved unchanged in the folder move. Rank/catalogue review confirms six
featured projects split into three leads and three secondary cards, leaving four
compact projects, following [DESIGN.md](DESIGN.md).

Independent orchestrator verification passed:
`ASTRO_TELEMETRY_DISABLED=1 npm run check` covered 37 files with 0 errors,
warnings, or hints; `npm run build` generated 13 pages including
`/projects/clipthat`; and `git diff --check` passed. No unit tests were run.
Browser verification is not claimed; owner manual desktop/mobile visual
acceptance remains pending.

## Uniform featured-card scale

Accepted scope: all six featured homepage cards use the current #2 JetAlign
scale, following [DESIGN.md](DESIGN.md). Preserve alternating stagger, featured
rank, document/keyboard/mobile order, and natural media aspect ratios with variable
heights. Existing lead/secondary catalogue grouping remains unchanged and no longer
determines visual sizing.

Implementation is complete; orchestrator quick code review found no major issues.
Independent orchestrator verification passed:
`ASTRO_TELEMETRY_DISABLED=1 npm run check` covered 37 files with 0 errors,
warnings, or hints; `npm run build` generated 13 pages; and `git diff --check`
passed. No unit tests were run. Manual desktop/mobile visual acceptance of uniform
scale, spacing, no overlap or horizontal overflow, and preserved media geometry
and navigation order remains pending. Browser verification is not claimed.

## Focused visual refinement and project color

Implemented and integrated; production build and Chrome verification passed within
the coverage below. Owner visual approval remains pending. Visual policy is defined in [DESIGN.md](DESIGN.md), authoring in
[PROJECT-ASSETS.md](PROJECT-ASSETS.md).

- Apply the neutral dark palette, subtler card borders/hover, stronger titles,
  secondary descriptions, neutral stable/supporting metadata, and restrained
  orange trial labels. Keep studio/homepage accents orange; project color accents
  project-detail pages only, with readable variants and neutral backgrounds.
- Historical scope, superseded for project-detail placement by the follow-up below:
  replace website overlays with small plain secondary captions beneath homepage
  previews and below the carousel near unchanged dots. Extend the existing
  slide-selection binding and reserve space against text-driven movement. Omit captions
  without text; preserve independent homepage text and existing crops.
- Migrate `media.yaml` to a root mapping with optional `project-color` and `items`
  (default empty). Accept six hex digits with optional `#`; default to studio
  orange. Missing/empty YAML remains an empty gallery. No old sequence format or
  YAML `highlight-color` compatibility; no per-item or `index.md` project color.
- Retain screenshot-export overlays, positioning/styles, `FeatureOverlay.astro`,
  `featureOverlay.css`, CLI options, and export behavior. Accent precedence is
  CLI `--highlight-color` > root `project-color` > studio orange.
- Do not redesign layouts or alter logos, screenshots, fonts, carousel geometry,
  opacity, shadows, dots, navigation/transitions, playback, or animations.
- Orchestrator static review and independent scoped integration review found no
  major issues. Carousel changes only extend caption selection and remove obsolete
  overlay-hiding CSS; geometry and playback remain untouched.
- Orchestrator `make check` passed: Astro checked 40 files with 0 errors,
  warnings, or hints; the production build generated 14 routes.
  `git diff --check` passed. No unit tests were run.
- Independent migration audit against `HEAD` passed for all 11 YAML files:
  media, preview, text, crop, and export settings were retained, with repeated
  colors consolidated once per project.
- HanScan exported 6 PNGs with authored blue to
  `/tmp/opencode/store-project-color-hanscan`; the orchestrator inspected
  `workbook_popup.png`. JetAlign exported 2 PNGs with explicit
  `--highlight-color 33aaff` to `/tmp/opencode/dr-jetski-refinement/export-override`;
  inspection of `jetalign_default.png` confirmed the CLI override and retained overlay.
- Chrome verified the homepage at 1440px, 390px, and 320px: correct six-featured/
  four-compact ordering, stagger/single-column layout, equal featured widths,
  no overlap or overflow, first-project visibility, image loading, captions,
  and whole-card keyboard focus/navigation.
- All ten project routes were checked at 320px. The initially clipped
  `chinese_popup_dict` title was corrected with `.title { overflow-wrap: anywhere; }`
  in `ProjectDetailView.astro`. Orchestrator `make check` then passed again
  (40 files, 0 diagnostics, 14 routes). Direct rechecks at 320/390/1440px found
  document widths equal to viewports, title client/scroll widths equal at
  280/350/626px, and every title line within the viewport. No clipping was found
  on the other nine routes.
- HanScan/JetAlign stage, selected-media, and dot geometry matched the previous
  presentation at 1440×900 and 390×844: 48 scalar measurements each differed by
  exactly 0px. These measurements describe the then-current below-carousel caption;
  absolute stage/media/dot y-values do not apply after the headline moves above the
  stage. Captions followed dots, keyboard, neighbor clicks, and synthetic
  swipe with bounded ends and correct visibility/`aria-hidden` state. Same-aspect
  introduction produced 0px movement; the initial no-JavaScript caption rendered,
  and singleton galleries omitted dots.
- Actual HanScan muted inline playback, inactive/offscreen pause, scroll resume,
  pause-control pause/resume, explicit-selection restart, and reduced-motion
  posters/disabled transitions passed. No browser errors were observed.
- The orchestrator visually reviewed `after-jetalign-1440.png`,
  `after-hanscan-390.png`, and `after-home-1440-full.png` in
  `/tmp/opencode/dr-jetski-refinement`. Browser `REPORT.md`, `verification.json`,
  and `followup.json` there predate the title fix; `title-fix.json` and
  `fixed-chinese-popup-dict-320.png` document the correction.
- Owner visual approval remains pending. Physical touchscreen behavior, save-data,
  screen-reader live announcements, page backgrounding, throttled-network loading,
  and the three-preview stress cap were not reverified. No deployment was performed
  or unit tests run; this milestone does not mark the whole phase complete.

## Current follow-up: project-detail feature headline and screenshot edge

Implemented with covered automated verification complete; owner visual approval
remains pending. Scope follows [DESIGN.md](DESIGN.md) and supersedes the previous
milestone's below-carousel caption placement, not its historical verification.

- Only `ProjectGallery.astro` changed: existing captions and script hooks now sit
  above the stage, using centered near-white display text at weight 750, responsive
  24–40px sizing, a longest-caption grid reserve, and 24–32px spacing. Media use an
  8px radius and geometry-neutral 1px ring at 20% white. No client/service,
  shared-media, homepage, content, or export code changed.
- Orchestrator `make check` passed: 40 files, 0 errors/warnings/hints, and 14
  production routes. `git diff --check` passed.
- Browser verification at 1440×900, 390×844, and 320×844 covered 33 HanScan/JetAlign
  slide states: full caption order/selection and hidden/ARIA states, stable
  longest-text height, expected typography/edges, and no horizontal overflow.
  The initial heading works without JavaScript; an uncaptioned singleton has
  neither heading nor dots.
- Baseline comparisons of the first two slides per project/viewport preserved
  stage/media/layer dimensions, horizontal positions, transforms, relative vertical
  offsets, and relative dot positions within 0.1px. Absolute stage y shifts down
  intentionally; screenshots retain their dimensions and `60svh` cap. All ten
  homepage card boxes exactly matched baseline at all three widths.
- Actual HanScan muted playback with rounded edges, pause/resume, neighbor-click
  and keyboard headline selection, and the distinct orange 3px focus ring passed.
  Reduced motion retained an unloaded/paused video, poster, and zero-duration
  transitions. No page errors were observed.
- The orchestrator visually inspected `after-hanscan-1440.png`,
  `after-hanscan-390.png`, and `after-jetalign-320.png`. Artifacts in
  `/tmp/opencode/dr-jetski-carousel-headlines` include `baseline.json`,
  `verification.json`, `interaction-check.json`, and HanScan/JetAlign screenshots
  at all three widths.
- Owner visual acceptance remains pending. No new physical-touch, save-data, or
  screen-reader verification is claimed. No unit tests or deployment were run.

## Follow-up: selective project-detail headline color

Accepted scope follows [DESIGN.md](DESIGN.md); field authoring and matching rules
are defined in [PROJECT-ASSETS.md](PROJECT-ASSETS.md). Implemented with covered
verification passed; owner visual and fine-tuning acceptance remains pending.
Earlier verification above is unchanged.

- Normal-media-only `highlighted-words` parses an optional comma-separated string
  into `FeatureOverlay.highlightedWords`, ignoring blank entries. Non-string
  values and root/independent-preview placement remain invalid.
- A pure build-time formatter performs Unicode-aware, case-insensitive whole-term
  matching with escaped literal terms and all-occurrences matching. Overlaps resolve
  longest-first without nesting; missing/unmatched terms leave text unchanged.
  Safe Astro spans apply only the existing readable project accent, preserving
  authored wording, case, whitespace, line breaks, typography, layout, and motion.
  Homepage captions and store exports are unchanged.
- Seeded 18 captioned normal records with restrained 1–3 useful words each:
  HanScan 7, JetAlign 4, WayToClip 3, ClipThat! 2, and the unreferenced
  `yt-clip-extractor` folder 2. Caption copy and root project colors are unchanged.
- Orchestrator `make check` passed: 41 files, 0 errors/warnings/hints, and 14
  production routes. `git diff --check` passed.
- Browser comparisons against baseline at 1440×900, 390×844, and 320×844 covered
  48 selected slide states across the four public captioned projects. Seeded spans,
  text/case, color-only styling, hidden/ARIA states, and keyboard selection passed,
  with no overflow or browser errors. Headline, caption, and stage boxes and all
  ten homepage card boxes/text matched baseline within 0.1px; homepage captions
  contained no highlight spans. HanScan's initial three highlights rendered with
  JavaScript disabled.
- JetAlign screenshot generation with `--highlight-color 33aaff` produced two PNGs;
  `cmp` confirmed both byte-for-byte equal to pre-highlight exports.
- The orchestrator visually reviewed HanScan at 1440px, JetAlign at 390px,
  WayToClip at 1440px, and ClipThat! at 390px. Artifacts in
  `/tmp/opencode/dr-jetski-headline-highlights` include `baseline.json`,
  `verification.json`, `after-<slug>-<width>.png`, and `export/*.png`.
- Matching edge cases and all-occurrences logic were statically reviewed; no
  synthetic edge-case runtime checks or repetitive-caption unit test are claimed.
  No unit tests or deployment were run. Owner visual/fine-tuning acceptance remains
  pending; physical devices, screen readers, and save-data were not newly verified.

## 1. Static foundation and project content

- Initialize Astro with TypeScript and static output.
- Use Astro content collections with one folder per project (`<slug>/index.md`) and validated structured metadata.
- Follow [AGENTS.md](AGENTS.md) for flat domain organization, presentational UI, explicit dependency injection, and build/browser state lifetimes.
- Define stable project routes, display names, short descriptions, project types, optional featured ranks, release maturity, visibility, publication notes, platform downloads, external links, and gallery items.
- Derive the first three lead and next three secondary projects from featured rank as catalogue groups only; all six render at uniform scale. Keep the four-project compact collection in a deliberate editorial order, with Flutter packages adjacent.
- Distinguish gallery images, silent looping video previews, and user-activated demonstrations with audio. Store poster images and accessible text with their media records.
- Add the ten launch entries from the agreed inventory. Keep WORLD-vocoder-vst unpublished if retained as draft content.
- Draft project copy from the owner's descriptions. Leave unknown release details and contact information explicitly marked in the authoring content; render only real actionable links.

## 2. Visual system and homepage

- Establish the shared palette defined in DESIGN.md, with readable primary/secondary text, dark labels on orange fills, and visible focus states.
- Choose characterful readable heading typography and neutral body typography; self-host the fonts.
- Create the initial typeset studio wordmark and lightweight wake-line artwork.
- Keep the introduction short enough that the first project is visible immediately in representative desktop and phone viewports.
- Implement the non-overlapping staggered trail: HanScan left, JetAlign lower/right, WayToClip lower/left, wumi lower/right, HanKan lower/left, ClipThat! lower/right. Give all six cards the current #2 JetAlign scale, preserving natural media aspect ratios and variable heights.
- Use layout rules that preserve editorial order in the document and during keyboard navigation; collapse to a single column on mobile.
- Add the compact four-project collection and homepage About/contact area.
- Make project-specific placeholder media replaceable through content files, without changing the page layout.

## 3. Media-first project pages and interactions

- Generate one route per public project from the content collection.
- Implement the compact identity/return banner and optional Downloads jump link.
- Build a bounded manual project carousel that shows one uncropped item at a time with a dynamic selected size within the 60% viewport-height cap, preserves meaningful media aspect ratios, and shows only naturally available ±1/±2 neighbors (one per side on phones) without repeating items. The first item has no left neighbor and the last no right neighbor; navigation never wraps. Use clickable round dots with accessible labels and selected state, natural horizontal sliding transitions, swipe, and keyboard access, with no automatic advance, thumbnail strip, or visible slide counter. Omit redundant navigation for one item and the gallery for none.
- Place substantive project information, explicit platform downloads, installation notes, and optional engineering sections below the carousel.
- Adapt package/script pages to relevant diagrams, examples, or compact media sections.
- Add a page-scoped playback service in `media/`, composed by thin browser bindings: load only active previews near the viewport, play silent inline loops while active and visible, pause inactive or offscreen previews, and cap simultaneous loops at three across the page.
- Restart a video when explicit slide navigation returns to it; pause on scroll-away or page backgrounding and resume after return. Use poster fallbacks for reduced-motion/data-saving preferences and expose a keyboard-accessible pause-motion control. Audio remains user-activated.
- Support local H.264 MP4 gallery video sources as well as HTTPS/R2 sources, with generated posters.
- Add page titles, descriptions, social-preview metadata, useful media alternatives, semantic headings, and a not-found route.

## 4. Downloads and deployment

- Verify the existing Workers Static Assets / Workers Builds Git integration and the intended `release` production / `main` staging workflow, following the current hosting milestone and [README.md](README.md). Confirm actual deployment URLs and studio-domain configuration.
- Configure and verify the agreed R2 Standard bucket and public downloads hostname, billing safeguards, and download protection following [DOWNLOADS.md](DOWNLOADS.md).
- Explicitly upload current software builds from ignored local release folders using the uploader, keeping binaries out of Git and the Workers static-assets build; verify public delivery before manually adding actionable URLs.
- Serve substantial preview video through R2 as needed; retain small optimized imagery in the static site.
- Set appropriate content types and download filenames; verify real file delivery and video playback from the published origin.
- Populate actual release versions, sizes, installation notes, source links, and store/registry destinations as available.
- Document the routine publishing steps: upload artifact, edit project metadata/content, run `make check`, commit/push `main`, review staging, run `make deploy-prod`, and check the asynchronous production deployment and deployed page.

## 5. Verification and completion criteria

- Astro content validation/type checks and the production build pass.
- All ten intended project pages are generated; WORLD-vocoder-vst has no public launch route or card.
- Featured ordering matches the agreed six-project sequence, with ClipThat! sixth; all six cards use uniform scale matching the current #2 JetAlign, without a visual lead/secondary sizing hierarchy. Natural media aspect ratios and variable heights are preserved; four projects remain compact.
- The homepage is staggered on wide screens, single-column on phones, and has no horizontal overflow or overlapping cards.
- The first project is visible without scrolling past an oversized introduction in representative desktop/mobile viewports.
- The project carousel dominates the opening content, uses clickable round dots with accessible labels and current state, supports swipe and keyboard access, never advances automatically, never wraps or repeats items, and handles one-item and empty galleries without redundant controls. The selected item remains uncropped with dynamic size within the 60% viewport-height cap, depth-2 neighbors stay behind depth-1 on hover/focus with the selected item on top, transitions respect reduced motion, and no thumbnail strip or visible slide counter appears. Descriptions and download panels follow it, and the banner shortcut reaches real downloads.
- Missing destinations produce honest availability text rather than fake or inactive download/store links.
- Keyboard navigation follows visual reading order, focus is visible, and media controls are operable.
- Reduced-motion/data-saving fallbacks work; inactive and offscreen clips pause; returning by explicit slide navigation restarts a clip; no more than three previews play simultaneously; audio never starts automatically.
- Test a throttled cold load with representative media. Initial page requests do not eagerly fetch every project video; posters reserve media space and avoid disruptive layout shifts.
- Check internal navigation, external destinations, and representative Android, desktop, and plugin downloads after deployment.
- Keep final visual tuning and owner-supplied assets/content in the same design direction; check for leftover authoring placeholders before the owner treats a deployment as the public launch.

## Expected deliverable

A fast static studio website with a distinctive staggered project homepage, ten flexible media-led project pages, a compact personal introduction, and direct platform downloads. Content and releases are maintained through validated repository files, manual R2 uploads, and Git-triggered deployment.
