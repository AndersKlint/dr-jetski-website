# Implementation plan

## Status

Implementation plan confirmed by the owner alongside [DESIGN.md](DESIGN.md). Terminology is defined in [GLOSSARY.md](GLOSSARY.md).

Phase 1 is complete: the Astro static foundation, validated content model, catalogue selection service, and ten authored launch projects are implemented.

Phase 2 is complete: the visual system, locally hosted typography, studio wordmark and wake artwork, responsive staggered showcases, compact project grid, About/contact area, and ten replaceable concept previews are implemented. Content/type checks and the production build pass. Chrome verification covered 320–1440px viewports, project ordering, non-overlapping layouts, first-project visibility, image/font loading, and keyboard skip navigation.

Phase 3 is implemented: ten public project routes, card navigation, compact return banners, responsive galleries, Markdown details, platform download/availability panels, social metadata, and page-scoped media playback are in place. Content/type checks and the production build pass. Local Chrome verification covered 320px, 390px, and 1440px layouts, public/draft routing, gallery placement, image loading, navigation, and keyboard skip/focus behavior. Existing media remain still-image placeholders; verification of actual video playback, the three-loop cap, preference fallbacks, audio activation, and throttled video loading remains pending representative media. Real release destinations and production delivery remain phase 4 work.

The supplied logo suite is integrated: the homepage banner displays the full logo with no duplicate header mark, compact wordmarks on other pages, and an SVG favicon. Content/type checks and the production build pass. Local Chrome verification covered 320px, 390px, 768px, and 1440px layouts, logo proportions/loading, first-project visibility, overflow, home links, keyboard focus, and icon delivery.

Main-only warm recolor is integrated pending visual approval: the full logo uses the new root warm main, while compact/icon intentionally use the archived colorful originals until their recolor is approved. The approved palette preserves the original geometry and editable SVG structure, and the colorful archive is unchanged. Content/type checks and the production build pass. Local Chrome verification at 320px, 390px, and 1440px confirmed the warm banner loads with its original proportions, no horizontal overflow, and the first project visible without scrolling; the compact wordmark and favicon also load.

## 1. Static foundation and project content

- Initialize Astro with TypeScript and static output.
- Use Astro content collections with one Markdown file per project and validated structured metadata.
- Follow [AGENTS.md](AGENTS.md) for flat domain organization, presentational UI, explicit dependency injection, and build/browser state lifetimes.
- Define stable project routes, display names, short descriptions, project types, optional featured ranks, release maturity, visibility, publication notes, platform downloads, external links, and gallery items.
- Derive the first three lead and two secondary projects from featured rank. Keep the compact collection in a deliberate editorial order, with Flutter packages adjacent.
- Distinguish gallery images, silent looping video previews, and user-activated demonstrations with audio. Store poster images and accessible text with their media records.
- Add the ten launch entries from the agreed inventory. Keep WORLD-vocoder-vst unpublished if retained as draft content.
- Draft project copy from the owner's descriptions. Leave unknown release details and contact information explicitly marked in the authoring content; render only real actionable links.

## 2. Visual system and homepage

- Establish warm charcoal, cream, burnt-orange, and quiet warm-gray tokens, with readable contrast and visible focus states.
- Choose characterful readable heading typography and neutral body typography; self-host the fonts.
- Create the initial typeset studio wordmark and lightweight wake-line artwork.
- Keep the introduction short enough that the first project is visible immediately in representative desktop and phone viewports.
- Implement the non-overlapping staggered trail: HanScan left, vocal aligner lower/right, WayToClip lower/left, LaoZi lower/right at smaller scale, HanKan lower/left at smaller scale.
- Use layout rules that preserve editorial order in the document and during keyboard navigation; collapse to a single column on mobile.
- Add the compact five-project collection and homepage About/contact area.
- Make project-specific placeholder media replaceable through content files, without changing the page layout.

## 3. Media-first project pages and interactions

- Generate one route per public project from the content collection.
- Implement the compact identity/return banner and optional Downloads jump link.
- Build prominent responsive multi-column galleries, preserving meaningful media aspect ratios and collapsing to one column on phones.
- Place substantive project information, explicit platform downloads, installation notes, and optional engineering sections below the gallery.
- Adapt package/script pages to relevant diagrams, examples, or compact media sections.
- Add a page-scoped playback service in `media/`, composed by thin browser bindings: load near the viewport, play silent inline loops only while visible, pause offscreen, and cap simultaneous loops at three across the page.
- Use poster fallbacks for reduced-motion/data-saving preferences and expose a keyboard-accessible pause-motion control. Audio remains user-activated.
- Add page titles, descriptions, social-preview metadata, useful media alternatives, semantic headings, and a not-found route.

## 4. Downloads and deployment

- Connect the repository to Cloudflare Pages for static Git-based deployment.
- Configure the studio domain and an R2 Standard bucket with a production downloads subdomain.
- Upload current software builds under versioned paths, keeping binaries out of Git and the Pages build.
- Serve substantial preview video through R2 as needed; retain small optimized imagery in the static site.
- Set appropriate content types and download filenames; verify real file delivery and video playback from the published origin.
- Populate actual release versions, sizes, installation notes, source links, and store/registry destinations as available.
- Document the routine publishing steps: upload artifact, edit project metadata/content, validate locally, commit/push, and check the deployed page.

## 5. Verification and completion criteria

- Astro content validation/type checks and the production build pass.
- All ten intended project pages are generated; WORLD-vocoder-vst has no public launch route or card.
- Featured ordering and hierarchy match the agreed five-project sequence.
- The homepage is staggered on wide screens, single-column on phones, and has no horizontal overflow or overlapping cards.
- The first project is visible without scrolling past an oversized introduction in representative desktop/mobile viewports.
- Project galleries dominate the opening content; descriptions and download panels follow them, and the banner shortcut reaches real downloads.
- Missing destinations produce honest availability text rather than fake or inactive download/store links.
- Keyboard navigation follows visual reading order, focus is visible, and media controls are operable.
- Reduced-motion/data-saving fallbacks work; offscreen clips pause; no more than three previews play simultaneously; audio never starts automatically.
- Test a throttled cold load with representative media. Initial page requests do not eagerly fetch every project video; posters reserve media space and avoid disruptive layout shifts.
- Check internal navigation, external destinations, and representative Android, desktop, and plugin downloads after deployment.
- Keep final visual tuning and owner-supplied assets/content in the same design direction; check for leftover authoring placeholders before the owner treats a deployment as the public launch.

## Expected deliverable

A fast static studio website with a distinctive staggered project homepage, ten flexible media-led project pages, a compact personal introduction, and direct platform downloads. Content and releases are maintained through validated repository files, manual R2 uploads, and Git-triggered deployment.
