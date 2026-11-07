# Website design

## Status

Design confirmed by the owner after the design interview. See [PLAN.md](PLAN.md) for the agreed implementation sequence.

## Confirmed direction

- Dr. Jetski Studios is the primary brand and home for the project catalogue.
- Visitors discovering and using software take priority over consulting prospects when homepage space competes. Professional background and technical detail should remain accessible.
- The visual direction is a crisp, high-contrast, restrained, slightly industrial studio UI, retaining personality in the existing typography, logo, and screenshots.
- No purchasing flow is needed for launch. JetAlign may become paid later; that future change should not drive the launch design.
- Content will be maintained in repository files and published through Git.
- Most project names are provisional. The inventory includes finished software, publicly downloadable prereleases, private packages awaiting publication, and a prototype excluded from launch.
- Use placeholder media during design; screenshots and other real assets will come later.
- The site should remain pragmatic, fast, lightweight, and extremely inexpensive to host.
- The homepage will have a short studio introduction, selected prominent projects, and a more compact visual collection of the remaining public projects. Each public project gets its own page. The introduction should leave at least the first project visible immediately in a typical initial viewport.
- Featured-project priority is HanScan, JetAlign, WayToClip, LaoZi AI Flashcards, HanKan, then ClipThat!.
- Project pages are media-first: a compact studio-identity banner, a substantial demo gallery, then project explanation, downloads, installation notes, and optional engineering detail.
- Use a restrained abstract water/wake motif as the studio's distinctive visual thread.
- Include a compact About/contact area with the creator's DevOps/full-stack background and professional links.
- Give all six featured projects a uniform card scale matching the current second card, JetAlign, with no visual lead/secondary sizing hierarchy. Preserve natural media aspect ratios and resulting variable heights rather than forcing equal-height cards. Arrange all six cards asymmetrically: first on the left, second lower on the right, third back on the left beneath the first, continuing the alternating rhythm. Cards have generous breathing room and do not overlap. On mobile, preserve priority order in one column.
- Use minimal navigation: studio mark/name, a small About/contact link, and a clear Back to projects link on project pages. About/contact belongs near the bottom of the homepage.
- Some project cards play short, silent, inline looping previews, loading near the viewport and pausing offscreen. At most three previews play together. Use still posters for reduced-motion or data-saving preferences, provide a simple pause-motion control, and keep audio user-activated.
- Use a neutral dark studio palette: page `#101114`, raised/card surfaces `#191b1f`, borders `#30343b`, primary text `#f4f4f2`, secondary text `#a9adb5`, and retained studio orange `#ee7135`. Keep card borders and hover treatments subtle, titles stronger, descriptions secondary, stable/supporting metadata neutral, and trial labels restrained orange. Project-specific color accents belong only on project-detail pages, with readable variants where necessary; backgrounds stay neutral and homepage/studio accents stay orange. Preserve actual product colors in screenshots.
- This is focused visual refinement, not a layout redesign. Preserve logos, screenshot assets, fonts, homepage cards/captions/crops, and carousel dimensions, opacity, shadows, depth/overlap, dots, focus indicators, navigation, transitions, playback, and animations. The approved project-detail headline shifts the stage vertically rather than shrinking screenshots; the subtle media edge and corner rounding below are the only other carousel presentation changes.
- Build with Astro static output on Cloudflare Workers Static Assets, deployed through Workers Builds Git integration. Maintain content in Git and add client JavaScript only where interactions require it.
- Initial software downloads are estimated at 2–5 GB total. Use the agreed Cloudflare R2 Standard public releases bucket `dr-jetski-downloads` behind `downloads.drjetski.com`, with versioned files outside Git and current builds published first. All installers use `/releases/<project>/<version>/<filename>` so one Free-plan path rule covers all projects and formats; preview media uses the separate `/media/` namespace outside that rule. The owner reports the bucket, rate-limit rule, and budget alert are set up, not independently verified; domain activation, disabled `r2.dev`, credentials, and public delivery remain unverified. [DOWNLOADS.md](DOWNLOADS.md) defines the operational process.
- Project pages list explicit platform downloads, version and alpha/beta labels where applicable, file sizes, and concise installation notes when known. Only show real store or registry destinations.
- Include both private Flutter packages in the compact launch collection, with informative pages and a clear publication-in-preparation message. Add source/registry actions only once public destinations exist.
- Use the supplied orange/near-white Dr. Jetski Studios full logo as the homepage banner with no duplicate header mark: a jet-powered rider and wake emblem above bold Dr. Jetski lettering and a spaced Studios signature. Coordinate the interface with the full logo's colors. Derive the compact wordmark from the lettering alone and the square icon from the complete emblem without lettering, preserving the shapes and proportions of `logo/dr-jetski-studios-logo-vector.svg`; light-theme artwork is deferred. Earlier artwork is preserved in `logo/alternative_arcade`, `logo/alternative_colorful`, and `logo/super_minimal`. Retain characterful readable headings, locally hosted fonts, and sparse wake-line artwork.
- Use project-specific placeholder media initially. The About/contact area provides contact@drjetski.com for general contact and support@drjetski.com for support, both as email links. Personal details and professional links await owner-supplied information.
- The remaining collection uses a compact, manually ordered grid with small media, titles, and concise descriptions. Keep the two Flutter packages together. Visitors browse the small catalogue directly, without search or filter controls.
- Every project page presents its gallery as a manual floating layered stack: one uncropped selected item whose height is capped at `60svh`, preserving its aspect ratio so its displayed size follows the media and portrait or landscape items do not fill the page. No panel, surrounding frame, or overlay arrows are shown. Each carousel media layer has a subtle 1px neutral edge at approximately 20% white and a small 6–8px corner radius; the edge is a ring that does not affect geometry. Up to two naturally available adjacent items per side sit behind the selected item as scaled-down, faded layers; the nearest layer is roughly half hidden by the selected item, and the outer layer is further overlapped, smaller, and fainter. The selected item stays above all neighbors. Depth-2 neighbors always remain behind depth-1 neighbors, including on hover or keyboard focus. Items never repeat to fill the stack, and the first item has no left neighbor while the last has no right neighbor; navigation is bounded and never wraps. Phones show at most one neighbor per side. Hovering or keyboard-focusing a neighbor may enlarge it and reduce its transparency while it keeps its depth order; the selected item stays static when hovered, and media show no hover outline or color change. Clicking a neighbor selects that exact item. No thumbnail strip is shown. Keyboard focus remains visibly indicated on interactive layers and controls. Navigation uses clickable round dots with accessible labels and current-state indication; the active dot is opaque and inactive dots are faded, and no visible slide counter is shown. Swipe and keyboard navigation are supported, and the gallery never advances automatically. A one-item gallery omits redundant navigation; an empty gallery is omitted.
- Selected video previews play silently and inline only while near or within the viewport; inactive previews pause and are not eagerly downloaded. Neighbor layers show video posters only, without loading or playing their video. Explicit slide navigation restarts a video when its slide is returned to; scrolling away, backgrounding, or the global pause-motion control pauses playback, and returning resumes it. The page-wide three-preview cap, reduced-motion/data-saving posters, and global pause control still apply. Horizontal slide changes move with a natural transition rather than snapping or jumping pages; scale, position, opacity, and selected-size changes use a short transition, and all are disabled under reduced motion.
- Website media has no feature overlays. Homepage feature captions remain small, plain secondary text beneath their previews, with cards and crops unchanged. On project-detail pages, the selected media's feature caption becomes an important centered headline above the carousel stage: use the existing display font, near-white text, 36–40px on desktop and 24–28px on mobile, tight line spacing, a readable text width, and a 24–32px gap before the stage. Preserve all authored text and line breaks, synchronized through the existing slide-selection binding; reserve the longest text's height so slide changes do not move surrounding content. Render no text region when there is no authored text. Do not add a panel, stripe, pill, or new motion. Feature captions remain distinct from alt text. Overlay positioning and style settings remain for store screenshot exports only; their rendering and export behavior are unchanged. [PROJECT-ASSETS.md](PROJECT-ASSETS.md) defines authoring and export options.
- Project-detail carousel headlines are bottom-aligned within the reserved longest-caption height, keeping shorter captions close to the stage without moving the carousel. They may selectively color important words with the existing readable `--project-accent` derived from `project-color`; remaining text stays near-white. Apply color only, with no new decorative treatment or changes to font size, weight, layout, or motion. Homepage captions and screenshot exports are unchanged; [PROJECT-ASSETS.md](PROJECT-ASSETS.md) defines optional word selection.
- The project-page banner includes the studio identity, a return link, a small project identifier, and a Downloads jump link when downloads exist. The substantive information/download panel sits below the gallery.
- Packages and scripts may use relevant diagrams, real usage examples, terminal output, or screenshots, with a shorter media section where appropriate.
- Publish software releases through an explicitly invoked local scripted upload: ignored `src/content/projects/<slug>/releases/<version>/<filename>` maps to R2 `releases/<slug>/<version>/<filename>` via `make upload PROJECT=<slug>` (add `DRY_RUN=1` to preview). Uploads are immutable and upload-only, not a sync or automated retention policy. Verify public bytes before separately editing validated repository metadata and Markdown content; the uploader never edits availability or deploys. Validate locally with `make check`, push `main` for staging, then promote fetched `origin/main` to `release` with `make deploy-prod` to trigger production deployment.

## Homepage composition

```text
Dr. Jetski Studios                                  About/contact
Independent apps, audio tools, and developer utilities.

[ HanScan: uniform-scale preview ]
                          [ JetAlign: uniform-scale preview ]
[ WayToClip: uniform-scale preview ]
                          [ LaoZi: uniform-scale preview ]
[ HanKan: uniform-scale preview ]
                          [ ClipThat!: uniform-scale preview ]

More projects
[ compact project ] [ compact project ] [ compact project ]
[ compact project ]

About the maker · contact · professional links
```

This describes relative position and uniform featured-card scale, not fixed dimensions or equal media heights. Stagger cards rather than aligning them into rows. Keep document, keyboard, and mobile reading order identical to editorial priority. Sparse wake linework can connect the composition without competing with the previews.

The homepage introduction is brief and plainspoken; the example line above is editable. Give attention and screen space to the projects. Featured and compact cards contain media, a project title, the optional YAML media caption directly beneath the title, and tags at the bottom, without a separate short description, availability/publication notes, or a visible “View project” action. The media caption replaces the short description; cards without authored media text omit it without a description fallback. Media captions use 1.2rem featured and 1rem compact, weight 500, and 1.4 line height, with larger project titles (2.1rem featured, 1.5rem compact). Featured cards show type, maturity (with highlighted trial badges), and supported platforms; compact cards show type and maturity. Featured cards retain prominent media. This text hierarchy supersedes the earlier small homepage-caption treatment; media assets and crops remain unchanged.

Featured and compact homepage cards use whole-card navigation to their single project-page destination, including still imagery, silent looping previews, and feature captions. The title supplies the single native navigation link per card, with an accessible project-specific name, normal open-in-new-tab behavior, and a visible whole-card keyboard focus indicator. Visitor-controlled demo videos retain independent, operable media controls instead of navigating when used.

Homepage previews, both featured and compact, may select an existing gallery item through one optional `preview` entry in `media.yaml`, without changing gallery order. It reuses that item's media, poster, dimensions, and alt text, but its caption and crop settings are independent of the matching normal `media` entry, with no inheritance. Without a `preview` entry, use the first gallery item and its normal media settings. Missing preview text means no homepage caption, even if the gallery item has one. An independent preview cannot override the project color.

Homepage previews retain their existing optional crops, off by default. HanScan's dedicated preview retains its independent homepage caption and current crop; its normal media entry retains the gallery caption without a crop. Apply the same CSS crop to poster and video without modifying the source video, adjusting the displayed aspect ratio and layout height to the visible area rather than merely hiding media inside the original footprint. Captions sit beneath that area, not over it. All project-detail carousel media remain uncropped. Entries may define a crop without text; [PROJECT-ASSETS.md](PROJECT-ASSETS.md) defines the authoring format and validation rules.

## Project-page composition

```text
Studio identity · Back to projects · project identifier · Downloads

[ selected feature caption: centered display headline, when authored ]

[ carousel: floating layered stack of selected media with scaled neighbor layers, round navigation dots ]

Project title and explanation · maturity / availability where useful
Platform downloads · file details · source / store destinations
Features · installation · optional engineering detail
```

The carousel stays before the substantive description/download panel on all screens. The Downloads jump link gives repeat visitors a direct route past the gallery. Content sections are optional; avoid empty headings or artificial media galleries for packages and scripts.

HanScan has a straightforward static text privacy-policy page at https://drjetski.com/projects/hanscan/privacy. A small, normal “Privacy policy” link appears at the bottom of HanScan's project information, with no homepage or main-navigation entry.

JetAlign alone embeds the owner's Sender updates form immediately below downloads,
before the Markdown detail sections. The accessibly named `#updates` section uses
the existing 62ch detail measure and no additional visible heading or copy: Sender
owns the form's presentation and wording. Its inline head loader runs only on
`/projects/jetalign`; other pages remain free of Sender. The owner reports double
opt-in is enabled; sender/domain verification status remains unknown. Keep the
integration local, including before public staging, until verification, rendering,
and confirmation/unsubscribe checks are complete.
[README.md](README.md#jetalign-updates-form) holds the launch checklist.

## Content and delivery

- Ten launch projects: six featured projects and four compact projects. WORLD-vocoder-vst is a future draft, not a generated public launch page.
- Each project is one folder named for its stable route slug under `src/content/projects/<slug>/`, containing `index.md`, `media.yaml`, and co-located local media. Stable routing is independent of the editable display name. JetAlign uses `/projects/jetalign`; the former `/projects/vocal-aligner` route permanently redirects there. ClipThat! uses folder slug `clipthat` and route `/projects/clipthat`.
- The `index.md` holds short descriptive metadata, Markdown detail sections, and real download references. `media.yaml` is the single source of truth for every project's gallery and media presentation: normal media records define carousel membership and order, and referenced local assets are discovered on rebuild. Unlisted files do not appear; missing referenced assets fail the build. Missing or empty YAML gives an empty gallery, with no gallery fallback to `index.md`. The first gallery item supplies the homepage preview unless an independent `preview` record selects another gallery item; adding or moving that selector does not affect carousel order.
- Track featured priority, release maturity, public availability, and page visibility separately. A private finished package can have a public explanatory page; an alpha can have a public download.
- Download records identify platform and format, URL, and known version/size details. Only render actionable links when their destinations are real; records without a real URL render an honest pending state.
- Keep public source/registry/store links optional. Do not imply that private projects are open source or that unreleased store listings exist.
- Gallery media reference flat local filenames without `./`; videos may instead use real HTTPS URLs such as versioned R2 paths. Each video has a local generated poster plus alt text and intrinsic width/height. Keep small optimized images, posters, diagrams, local H.264 MP4 previews, and local fonts with the static site. Serve substantial preview video and binaries separately through R2 under versioned paths; total R2 usage includes media as well as software.
- [PROJECT-ASSETS.md](PROJECT-ASSETS.md) is the authoritative operational guide for the project folder layout, the `index.md` template, media dimensions, and preview/demo preparation. [PLAN.md](PLAN.md) names the sequence.
- Build a static homepage, ten project routes, and a useful not-found page. The About/contact area is part of the homepage.

## Candidate launch inventory

Project descriptions below reflect the owner's account, rather than independently verified capabilities or release availability.

### HanScan

Flutter phone app, currently Android, with possible future iOS support. Uses PaddleOCR v6 for accurate offline recognition of Chinese text from camera or gallery images. Overlays results at their image positions, with modes for original hanzi and a tap-to-open dictionary, pinyin, or English translation. Intended for Chinese learners reading textbooks and travelers reading signs or menus. Finished, with an Android APK ready; no Play Store release yet. OCR is described as offline; translation connectivity is not yet established.

### LaoZi AI Flashcards

Spaced-repetition app focused on pragmatic, productive Chinese study, with possible expansion to other languages. AI generates detailed flashcards, descriptions, and example sentences from inputs such as a photograph of a textbook vocabulary list. Targets serious learners, including university language students. Platforms described: Android, Linux, Windows, and web; no Apple platforms yet. A fully functional alpha Android APK is ready for public download; other platform destinations still need to be supplied.

### HanKan

Chinese-learning app with a simple text editor and a reading mode featuring a popup dictionary. Also opens PDFs and uses targeted OCR at the tapped or clicked position to provide dictionary lookup for the selected word. PDF lookup may become the primary feature. Finished, with Windows, Linux, and Android builds available; no Play Store release yet.

### Paddle-my-pdf

Desktop command-line tool using PaddleOCR to convert large scanned PDFs into searchable, copyable PDFs by adding a recognized text layer. Particularly aimed at Asian languages. A user-facing GUI may be added later.

### JetAlign

VST3/CLAP plugin that aligns a dub vocal track to a guide track for tightly timed vocal stacks. Linux support is a key intended differentiator. Windows and Linux beta builds are ready for public download. It may become paid later.

### chinese_popup_dict

Flutter package wrapping text widgets with Chinese popup-dictionary interaction. Pressing a Chinese character opens the dictionary.

### dart_paddle_ocr

Flutter package providing end-to-end, optimized on-device OCR inference with PaddleOCR v6 and v5 models, with extensibility to other Paddle models. Fully offline, with particular strength in Chinese and other Asian languages. Handles text direction and input-image rotation.

### WayToClip

Keyboard-centric GNOME Shell clipboard-manager extension. A shortcut opens history at the mouse cursor; entries can be selected with number keys, arrow keys, or the mouse. Includes search, favorites, and image support. Can exclude password-manager content when the appropriate metadata is present, such as from KeePass.

### WORLD-vocoder-vst — working name

Early work-in-progress voice-processing and synthesis plugin. An initial analysis decomposes a voice into components, followed by parameter modification and real-time MIDI-controlled resynthesis. Intended uses include voice transformation, harmonies, pitched vocal playback, voice-based synthesis, and unusual sound effects. Final name and plugin formats remain to be confirmed.

### ClipThat!

Small desktop app using yt-dl to download and cut a video between two timestamped YouTube URLs.

### spotify-screensaver

Small Linux desktop app displaying the current song's album artwork, title, and artist as a styled screensaver.

## Availability and launch visibility

| Project | Owner-reported readiness | Launch treatment |
| --- | --- | --- |
| HanScan | Finished; Android APK ready; not on Play Store | Featured priority 1; direct APK download destination needed |
| JetAlign | Finished beta; Linux and Windows VST3/CLAP builds available | Featured priority 2; publish beta downloads at launch |
| WayToClip | Finished; submitted to GNOME Extensions and awaiting review | Featured priority 3; show pending-review note, GitHub link, manual-install instructions, and pluginbundle.zip download |
| LaoZi AI Flashcards | Fully functional alpha; Android APK ready; not on Play Store | Featured priority 4; publish alpha download at launch; other platform downloads still to confirm |
| HanKan | Finished; Windows, Linux, and Android builds available; not on Play Store | Featured priority 5; download destinations needed |
| ClipThat! | Minimal MVP; Linux and Windows builds available | Featured priority 6; supply current download destinations |
| Paddle-my-pdf | Finished CLI; unpolished, no installer, Python requirements file | Confirm source/install destination |
| dart_paddle_ocr | Finished implementation; package not yet polished, still closed source; pub.dev publication planned | Include an informative page with publication-in-preparation status; no public package/source actions yet |
| chinese_popup_dict | Finished implementation; package not yet polished, still closed source; pub.dev publication planned | Include an informative page with publication-in-preparation status; no public package/source actions yet |
| WORLD-vocoder-vst | Prototype | Exclude from the launch site; future project |
| spotify-screensaver | Finished script; screenshot available | Confirm source/install destination |

## Execution details and owner-supplied content

The confirmed palette and existing fonts are retained as specified above. Breakpoints, card dimensions, and spacing remain within the agreed composition; the project-detail headline adds vertical space without changing carousel media dimensions, and the media edge does not affect geometry.

The owner will supply final product names where changing, personal/contact information, real screenshots/previews, artifact versions and sizes, download/source/install destinations, and any additional public platform releases. Initial layout work uses clearly temporary project-specific media and content markers.

The confirmed production domain is https://drjetski.com. The owner reports the current Astro static site is already hosted through Cloudflare Workers Static Assets and Workers Builds Git integration, not Pages. The repository's `wrangler.json` identifies `dr-jetski-website`, serves `./dist`, and includes preview configuration. Dashboard settings, deployed URLs, domain/DNS attachment, HTTPS, routes, redirects, and media have not been independently verified. Existing pending-download states and clearly marked content/media placeholders are accepted for the early WIP, not the final launch.

The intended Workers Builds workflow retains `release` for production and `main` for staging; the owner confirms `release` already exists. Verify the existing Git integration's branch/build/deploy settings and obtain actual production and preview URLs from Cloudflare rather than assuming a hostname. An optional `staging.drjetski.com` hostname and any preview access protection remain unverified. Both branches should build from source with the same checks/build; generated `dist/` stays out of Git. Staging and production may share R2 assets. [README.md](README.md) documents deployment verification and the simple promotion commands. Earlier Pages-specific setup instructions are superseded; no new Pages project is required.

The current downloads milestone prepares the local uploader and first JetAlign Linux release without account changes or uploads. The supplied `JetAlign-v0.5.0-beta.2-linux-x86_64.tar.gz` was verified locally as a Linux CLAP/VST3 bundle, version `v0.5.0-beta.2`, size 4,571,716 bytes. Keep its download pending without a URL until public delivery is verified. A renewed November 7, 2026 orchestrator `curl --head https://downloads.drjetski.com/` check still fails DNS resolution from this environment, consistent with the prior check. The owner's bucket, rate-limit rule, and budget-alert setup report is not independent verification of live settings or delivery. Uploader API credentials/access and public custom-domain activation are separate gates; a successful upload does not establish public availability. [DOWNLOADS.md](DOWNLOADS.md) is authoritative for account setup, versioned upload paths, public-hostname verification, cost safeguards, and download protection. Measure the combined media/binary footprint when preparing uploads.

## Verified technical references

- [Astro configuration](https://docs.astro.build/en/reference/configuration-reference/#output): static output is the default.
- [Astro components](https://docs.astro.build/en/basics/astro-components/): components produce HTML without shipping their server/build-time JavaScript to the browser.
- [Cloudflare Workers Static Assets](https://developers.cloudflare.com/workers/static-assets/): serves files from the configured assets directory without requiring a Worker script.
- [Cloudflare Workers Builds](https://developers.cloudflare.com/workers/ci-cd/builds/): Git integration builds and deploys on push; actual build settings and preview URLs are available in the dashboard.
- [Cloudflare R2 pricing](https://developers.cloudflare.com/r2/pricing/): Standard storage free tier includes 10 GB-month, one million Class A requests, and ten million Class B requests per month; direct egress is free. Usage beyond free allowances is billed.
- [Cloudflare R2 public buckets](https://developers.cloudflare.com/r2/buckets/public-buckets/): use a custom domain for production public delivery; r2.dev is rate-limited and intended for development.
