# Implementation plan

## Status

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

## Current milestone: staging and production promotion workflow

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

## 1. Static foundation and project content

- Initialize Astro with TypeScript and static output.
- Use Astro content collections with one folder per project (`<slug>/index.md`) and validated structured metadata.
- Follow [AGENTS.md](AGENTS.md) for flat domain organization, presentational UI, explicit dependency injection, and build/browser state lifetimes.
- Define stable project routes, display names, short descriptions, project types, optional featured ranks, release maturity, visibility, publication notes, platform downloads, external links, and gallery items.
- Derive the first three lead and two secondary projects from featured rank. Keep the compact collection in a deliberate editorial order, with Flutter packages adjacent.
- Distinguish gallery images, silent looping video previews, and user-activated demonstrations with audio. Store poster images and accessible text with their media records.
- Add the ten launch entries from the agreed inventory. Keep WORLD-vocoder-vst unpublished if retained as draft content.
- Draft project copy from the owner's descriptions. Leave unknown release details and contact information explicitly marked in the authoring content; render only real actionable links.

## 2. Visual system and homepage

- Establish the shared palette defined in DESIGN.md, with readable primary/secondary text, dark labels on orange fills, and visible focus states.
- Choose characterful readable heading typography and neutral body typography; self-host the fonts.
- Create the initial typeset studio wordmark and lightweight wake-line artwork.
- Keep the introduction short enough that the first project is visible immediately in representative desktop and phone viewports.
- Implement the non-overlapping staggered trail: HanScan left, JetAlign lower/right, WayToClip lower/left, LaoZi lower/right at smaller scale, HanKan lower/left at smaller scale.
- Use layout rules that preserve editorial order in the document and during keyboard navigation; collapse to a single column on mobile.
- Add the compact five-project collection and homepage About/contact area.
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

- Connect the source repository to Cloudflare Pages with `release` production and `main` staging previews, following the current workflow milestone.
- Configure the studio domain and an R2 Standard bucket with a production downloads subdomain.
- Upload current software builds under versioned paths, keeping binaries out of Git and the Pages build.
- Serve substantial preview video through R2 as needed; retain small optimized imagery in the static site.
- Set appropriate content types and download filenames; verify real file delivery and video playback from the published origin.
- Populate actual release versions, sizes, installation notes, source links, and store/registry destinations as available.
- Document the routine publishing steps: upload artifact, edit project metadata/content, run `make check`, commit/push `main`, review staging, run `make deploy-prod`, and check the asynchronous production deployment and deployed page.

## 5. Verification and completion criteria

- Astro content validation/type checks and the production build pass.
- All ten intended project pages are generated; WORLD-vocoder-vst has no public launch route or card.
- Featured ordering and hierarchy match the agreed five-project sequence.
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
