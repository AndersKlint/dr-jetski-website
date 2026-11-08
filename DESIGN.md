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
- Featured-project priority is HanScan, JetAlign, WayToClip, wumi - Chinese Flashcards, HanKan, then ClipThat!.
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
- Project-detail carousel headlines are bottom-aligned within the reserved longest-caption height, keeping shorter captions close to the stage without moving the carousel. They may selectively color important words with `--project-color`, the exact project color authored in `media.yaml`, without readability lightening; WayToClip alone uses a text-only variant with HSL lightness raised by 25 percentage points, preserving hue and saturation without white mixing. Its base color remains sourced solely from `media.yaml`; other project accents and headlines are unchanged. Remaining text stays near-white. Apply color only, with no new decorative treatment or changes to font size, weight, layout, or motion. Homepage captions and screenshot exports are unchanged; [PROJECT-ASSETS.md](PROJECT-ASSETS.md) defines optional word selection.
- The project-page banner retains the studio identity and shows only Back to projects, About/contact, and the existing motion control. Omit the project identifier and Downloads jump link. The substantive information/download panel sits below the gallery.
- On project pages, only the compact logo's STUDIOS lettering uses the shared project headline text color, including contrast adjustments such as WayToClip's lighter shade, falling back to studio orange. Preserve the remaining lettering, proportions, and homepage logo.
- Packages and scripts may use relevant diagrams, real usage examples, terminal output, or screenshots, with a shorter media section where appropriate.
- Publish software releases through an explicitly invoked local scripted upload: ignored `src/content/projects/<slug>/releases/<version>/<filename>` maps to R2 `releases/<slug>/<version>/<filename>` via `make upload PROJECT=<slug>` (add `DRY_RUN=1` to preview). Uploads are immutable and upload-only, not a sync or automated retention policy. Verify public bytes before separately editing validated repository metadata and Markdown content; the uploader never edits availability or deploys. Validate locally with `make check`, push `main` for staging, then promote fetched `origin/main` to `release` with `make deploy-prod` to trigger production deployment.

## Homepage composition

```text
Dr. Jetski Studios                                  About/contact
Independent apps, audio tools, and developer utilities.

[ HanScan: uniform-scale preview ]
                          [ JetAlign: uniform-scale preview ]
[ WayToClip: uniform-scale preview ]
                          [ wumi - Chinese Flashcards: uniform-scale preview ]
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

Homepage previews, both featured and compact, use one optional `preview` entry in `media.yaml` to select an exactly matching gallery item, including video, or a separate local image when no gallery item matches. Gallery matches reuse media, poster, and dimensions; an optional nonblank preview alt overrides the gallery alt, otherwise it is inherited. A separate image requires its own nonblank alt and may be used with an empty gallery; standalone videos are not supported. Ambiguous matches and missing assets fail the build. Preview entries never add gallery items or change gallery order, and homepage-only images are excluded from store screenshot exports. Caption and crop settings are independent of normal `media` entries, with no inheritance. Without a `preview` entry, use the first gallery item and its normal media settings. Missing preview text means no homepage caption, even if the gallery item has one. An independent preview cannot override the project color.

Homepage previews retain their existing optional crops, off by default. HanScan's dedicated preview retains its independent homepage caption and current crop; its normal media entry retains the gallery caption without a crop. Apply the same CSS crop to poster and video without modifying the source video, adjusting the displayed aspect ratio and layout height to the visible area rather than merely hiding media inside the original footprint. Captions sit beneath that area, not over it. All project-detail carousel media remain uncropped. Entries may define a crop without text; [PROJECT-ASSETS.md](PROJECT-ASSETS.md) defines the authoring format and validation rules.

## Project-page composition

```text
Studio identity · Back to projects · About/contact · Pause motion

[ selected feature caption: centered display headline, when authored ]

[ carousel: floating layered stack of selected media with scaled neighbor layers, round navigation dots ]

Project title and explanation · maturity / availability where useful
Platform downloads · file details · source / store destinations
Features · installation · optional engineering detail
```

The carousel stays before the substantive description/download panel on all screens. Content sections are optional; avoid empty headings or artificial media galleries for packages and scripts.

Simplified download and store cards stretch equally within each grid row, with actions bottom-aligned despite wrapping titles or metadata; retain minimum spacing above actions without fixed heights or equalizing separate rows.

HanScan has a straightforward static text privacy-policy page at https://drjetski.com/projects/hanscan/privacy. A small, normal “Privacy policy” link appears at the bottom of HanScan's project information, with no homepage or main-navigation entry.

HanScan follows JetAlign's simplified information layout while retaining its existing gallery and blue accent. Use a short description of reading Chinese from photos and screenshots with a popup dictionary, pinyin and English translation, followed by the offline model-download qualification and “Free. No ads. No account required.” Show compact Android and iOS cards: Android links to the actual Google Play listing; iOS says “Coming soon” without a link. Omit duplicate platform badges, availability paragraphs, APK-pending copy and longer feature sections. Android remains the only currently supported platform.

wumi - Chinese Flashcards uses folder `src/content/projects/wumi`, slug `wumi`, route `/projects/wumi`, and featured priority 4. Follow HanScan's simplified information layout with the existing generic simplified download cards, not HanScan's Android/iOS store cards. Use primary green `#6EAA7B`, an alpha label, and a short description of AI-generated Chinese flashcards from photos of vocabulary lists, entered words, and PDF pages, with spaced repetition for study. Omit duplicate platform badges, availability paragraphs, and longer feature lists. Keep the existing Android alpha APK card pending without a release link; do not add platforms or coming-soon cards, or claim free, offline, or no-account use.

wumi's real screenshots follow chronological order using file modification times because no embedded capture dates are available: `wumi-main.png`, `wumi-deck-details.png`, `wumi-study-back.png`, `wumi-edit-card.png`, `wumi-generate-import.png`, `wumi-review-generated.png`, `wumi-customize-spaced-repetition.png`, `wumi-customize-card-layout.png`, `wumi-card-browser.png`, then `wumi-dark-mode.png`. Use the separate local `wumi-preview.png` as the homepage-only preview without changing carousel order or store screenshot exports. Exclude `wumi-decks.png` from the gallery because it is byte-identical to `wumi-main.png`.

WayToClip follows JetAlign's simplified information layout while retaining its existing gallery and green accent. Use the description “A keyboard-driven clipboard manager for GNOME Shell. Press a shortcut to open history at your cursor, then press 1–9 to paste. Fast, simple, efficient.” Show one Linux (GNOME Shell) ZIP card and a clearly labeled GitHub source link. Omit duplicate platform badges, availability paragraphs, and feature lists. Place a concise Installation subsection (h3) beneath the download card: require GNOME Shell 46–51, install the downloaded ZIP with `gnome-extensions install`, log out and back in, then enable `waytoclip@andersklint.github.io`. Boldly state that no shortcut is set by default and direct visitors to “Toggle the cursor popup” in extension settings, with Alt+X as an example. Briefly credit CLCL and Clipboard Indicator with links. The GNOME Extensions listing remains under review; do not show a store action. Public ZIP delivery is verified; link the manual download and mark availability as available.

HanKan - Chinese Reader retains `/projects/hankan` and uses four actual desktop screenshots in this order: popup dictionary (`hankan-desktop-popup.png`), PDF highlighting (`hankan-desktop-pdf-highlight.png`), writing/reading workflow (`hankan-desktop-read-write-mode.png`), and light/dark themes (`hankan-desktop-light-dark-mode.png`). The first screenshot supplies the homepage preview without a separate selector or crop. Use blue project accents matching HanScan (`#3A8DFF`). Use the concise description of reading Chinese PDFs with a popup dictionary and word highlighting, OCR lookup for scanned PDFs without selectable text, and writing or pasting Chinese text before switching to reading mode, with a blank line before the editor description. Follow the simplified information layout with a beta label, no duplicate platform badges, availability paragraph, or feature list. Show three version 0.5.2-beta download cards: Linux x86_64 Flatpak, Windows x86_64 EXE installer, and Windows x86_64 portable ZIP. Android — Google Play, macOS, and iOS have non-actionable Coming soon cards; there is no Android APK for this release. Add a “View on GitHub” source link to https://github.com/AndersKlint/hankan_chinese_reader without a license claim. Installation is a standalone h2 section after Downloads, with h3 platform subsections: install the Flatpak with `flatpak install --user ./HanKan-v0.5.2-beta-linux-x86_64.flatpak`, launch with `flatpak run com.andersklint.hankan_chinese_reader`, run the Windows installer, or extract the entire portable ZIP and run `hankan_chinese_reader.exe` while keeping its files together. Public delivery of all three desktop artifacts is verified; link their versioned releases under `https://downloads.drjetski.com/releases/hankan/v0.5.2-beta/` and mark desktop availability as available. Artifact inspection confirms the Flatpak app ID and GNOME Platform 48 x86_64 runtime and the portable executable name; installation and runtime behavior have not been verified.

ClipThat! follows HanKan's simplified information layout, retaining its screenshots, feature captions, and red `#A93246` project color. Use the description “Paste a video link, choose a time range and download just the part you want. Queue multiple clips and save them to your chosen folder.” Show a beta label and three version 0.6.3-beta download cards: Linux x86_64 Flatpak, Windows x86_64 EXE installer, and Windows x86_64 portable ZIP, with version and size. Omit duplicate platform badges, availability paragraphs, and feature lists; do not add other platforms or coming-soon platform cards. Add a “View on GitHub” source link to https://github.com/AndersKlint/clipthat without a license claim. Installation is a standalone h2 section after Downloads, with h3 Linux and Windows subsections and h4 Installer and Portable subsections under Windows. Install the Flatpak with `flatpak install --user ./ClipThat-v0.6.3-beta-linux-x86_64.flatpak` and launch with `flatpak run com.drjetski.clipthat`; run the Windows setup executable or extract the entire portable ZIP and run `yt_section_downloader.exe` inside the extracted `ClipThat` folder, keeping its files together. Under Windows, state: “If needed, install the [Microsoft Visual C++ x64 runtime](https://aka.ms/vs/17/release/vc_redist.x64.exe). It is required by both Windows downloads.” Public delivery of all three artifacts is verified; link their versioned releases under `https://downloads.drjetski.com/releases/clipthat/v0.6.3-beta/` and mark availability as available. Artifact inspection confirms the Flatpak app ID, GNOME Platform 50 x86_64 runtime, and portable executable path. No installers have been executed or runtime behavior verified. The owner reports licensing issues are resolved; this is not an independent legal certification.

JetAlign alone embeds the owner's Sender updates form below the installation
section that follows downloads. The accessibly named `#updates` section uses
the existing 62ch detail measure and no additional visible heading or copy: Sender
owns the form's presentation and wording. Its inline head loader runs only on
`/projects/jetalign`; other pages remain free of Sender. The owner reports double
opt-in is enabled; sender/domain verification status remains unknown. Keep the
integration local, including before public staging, until verification, rendering,
and confirmation/unsubscribe checks are complete.
[README.md](README.md#jetalign-updates-form) holds the launch checklist.

JetAlign's beta page keeps the existing gallery as its main feature explanation,
followed by the project title, beta label, and a short description of its easy-to-use,
lightweight native vocal and instrument alignment. Omit duplicate platform badges,
availability paragraphs and feature lists. Inside Downloads below the download
cards, show an Installation subsection (h3), a Linux sub-subsection (h4), and a
short paragraph explaining archive extraction
and copying `JetAlign.clap` to `~/.clap/` or the entire `JetAlign.vst3` folder to
`~/.vst3/`. Follow it with Bash snippets for extracting the current archive and
installing CLAP and VST3, with short labels in smaller bold body text using the
normal text color, visually subordinate to Linux, and horizontally scrollable code
blocks. Inline code uses a subtle card-colored background, border, and padding,
without affecting fenced code-block highlighting.
Between the description and downloads, show
separate native Before and After audio players for the full guitar examples, with
no autoplay, synchronization, or eager audio loading. Keep native controls with
rounded corners and card-colored backgrounds; request the project accent for
controls where the browser supports it, without custom player logic or color filters.
Native seekbar accent rendering remains browser-dependent. Bundle stereo 96 kbps Opus/WebM
copies with the static site, retaining source timing and volume without additional
processing. Show three compact download cards: Linux with version, CLAP / VST3,
file size, and download action; Windows and Mac with only their names and Coming
soon. Do not display filenames in download cards. Keep the existing updates form
below the installation section.
The installation, audio and updates presentation applies only to JetAlign; live release delivery
verification remains a separate launch gate.

## Content and delivery

- Ten launch projects: six featured projects and four compact projects. WORLD-vocoder-vst is a future draft, not a generated public launch page.
- Each project is one folder named for its stable route slug under `src/content/projects/<slug>/`, containing `index.md`, `media.yaml`, and co-located local media. Stable routing is independent of the editable display name. JetAlign uses `/projects/jetalign`; the former `/projects/vocal-aligner` route permanently redirects there. ClipThat! uses folder slug `clipthat` and route `/projects/clipthat`.
- The `index.md` holds short descriptive metadata, Markdown detail sections, and real download references. `media.yaml` is the single source of truth for every project's gallery and media presentation: normal media records define carousel membership and order, and explicitly referenced local assets are discovered on rebuild, never automatically added to the gallery. Unlisted files do not appear; missing referenced assets fail the build. Missing or empty YAML gives an empty gallery, with no gallery fallback to `index.md`. The first gallery item supplies the homepage preview unless an independent `preview` record selects a gallery item or a separate local image; adding or moving that selector does not affect carousel order.
- Track featured priority, release maturity, public availability, and page visibility separately. A private finished package can have a public explanatory page; an alpha can have a public download.
- Download records identify platform and format, URL, and known version/size details. Only render actionable links when their destinations are real; records without a real URL render an honest pending state.
- Keep public source/registry/store links optional. Do not imply that private projects are open source or that unreleased store listings exist.
- Gallery media reference flat local filenames without `./`; videos may instead use real HTTPS URLs such as versioned R2 paths. Each video has a local generated poster plus alt text and intrinsic width/height. Keep small optimized images, posters, diagrams, local H.264 MP4 previews, and local fonts with the static site. Serve substantial preview video and binaries separately through R2 under versioned paths; total R2 usage includes media as well as software.
- [PROJECT-ASSETS.md](PROJECT-ASSETS.md) is the authoritative operational guide for the project folder layout, the `index.md` template, media dimensions, and preview/demo preparation. [PLAN.md](PLAN.md) names the sequence.
- Build a static homepage, ten project routes, and a useful not-found page. The About/contact area is part of the homepage.

## Candidate launch inventory

Project descriptions below reflect the owner's account, rather than independently verified capabilities or release availability.

### HanScan

Flutter phone app available on Google Play for Android, with iOS coming soon. Reads Chinese from photos and screenshots with a popup dictionary, pinyin and English translation. OCR and dictionary work offline; English translation works offline after a one-time model download. Free, with no ads or account requirement.

### wumi - Chinese Flashcards

Spaced-repetition app focused on pragmatic, productive Chinese study, with possible expansion to other languages. AI generates detailed flashcards, descriptions, and example sentences from photos of vocabulary lists, entered words, and PDF pages. Targets serious learners, including university language students. Platforms described: Android, Linux, Windows, and web; no Apple platforms yet. A fully functional alpha Android APK is ready, but its public download link is pending; other platform destinations still need to be supplied.

### HanKan - Chinese Reader

Beta Chinese reader for PDFs and written or pasted text, with a popup dictionary, word highlighting, and OCR word lookup for scanned PDFs without selectable text. Currently supports Linux, Windows, and Android; macOS and iOS are coming soon, not currently supported. The publicly available desktop release is 0.5.2-beta: Linux x86_64 Flatpak (79,655,752 bytes), Windows x86_64 EXE installer (76,728,664 bytes), and Windows x86_64 portable ZIP (82,317,665 bytes). All three public GET requests returned HTTP 200 with size and SHA-256 matching the GitHub release assets, correct attachment filenames and content types, immutable caching with max-age 31536000, and no content encoding. No installers were executed; runtime behavior remains unverified. Android's Google Play listing is coming soon, with no APK supplied for this release. Source: https://github.com/AndersKlint/hankan_chinese_reader.

### Paddle-my-pdf

Desktop command-line tool using PaddleOCR to convert large scanned PDFs into searchable, copyable PDFs by adding a recognized text layer. Particularly aimed at Asian languages. A user-facing GUI may be added later.

### JetAlign

VST3/CLAP plugin that aligns a dub vocal track to a guide track for tightly timed vocal stacks. Linux support is a key intended differentiator. Windows and Linux beta builds are ready for public download. It may become paid later.

### chinese_popup_dict

Flutter package wrapping text widgets with Chinese popup-dictionary interaction. Pressing a Chinese character opens the dictionary.

### dart_paddle_ocr

Flutter package providing end-to-end, optimized on-device OCR inference with PaddleOCR v6 and v5 models, with extensibility to other Paddle models. Fully offline, with particular strength in Chinese and other Asian languages. Handles text direction and input-image rotation.

### WayToClip

Keyboard-driven GNOME Shell clipboard-manager extension. A shortcut opens history at the cursor; press 1–9 to paste. Supports GNOME Shell 46–51. The manual ZIP is `WayToClip-v1.0.1-gnome-shell.zip`, version 1.0.1, 214,334 bytes, with extension UUID `waytoclip@andersklint.github.io`. Source is public at https://github.com/AndersKlint/way-to-clip. Public manual ZIP delivery is verified by a successful GET with matching size and SHA-256; the GNOME Extensions listing is awaiting review.

### WORLD-vocoder-vst — working name

Early work-in-progress voice-processing and synthesis plugin. An initial analysis decomposes a voice into components, followed by parameter modification and real-time MIDI-controlled resynthesis. Intended uses include voice transformation, harmonies, pitched vocal playback, voice-based synthesis, and unusual sound effects. Final name and plugin formats remain to be confirmed.

### ClipThat!

Desktop app for downloading selected time ranges from video links, queuing multiple clips, and saving them to a chosen folder. Release v0.6.3-beta is treated as beta. Public downloads are Linux x86_64 Flatpak (175,599,104 bytes), Windows x86_64 EXE installer (155,173,025 bytes), and Windows x86_64 portable ZIP (210,590,397 bytes). All three public GET requests returned HTTP 200 with matching source size and SHA-256, correct MIME types and attachment filenames, immutable caching with max-age 31536000, and no Content-Encoding. No installers were executed; runtime behavior remains unverified. Source: https://github.com/AndersKlint/clipthat. The owner reports licensing issues are resolved; this is not an independent legal certification.

### spotify-screensaver

Small Linux desktop app displaying the current song's album artwork, title, and artist as a styled screensaver.

## Availability and launch visibility

| Project | Owner-reported readiness | Launch treatment |
| --- | --- | --- |
| HanScan | Available on Google Play for Android; iOS coming soon | Featured priority 1; link to the Google Play listing and show non-actionable iOS coming soon |
| JetAlign | Finished beta; Linux and Windows VST3/CLAP builds available | Featured priority 2; publish beta downloads at launch |
| WayToClip | Finished; public manual ZIP delivery verified; GNOME Extensions review pending | Featured priority 3; simplified Linux ZIP download card, GitHub source link, manual-install instructions, and pending-review note; no store action |
| wumi - Chinese Flashcards | Fully functional alpha; Android APK ready; public link pending; not on Play Store | Featured priority 4; simplified pending Android APK card until public delivery is verified; other platform downloads still to confirm |
| HanKan - Chinese Reader | Beta 0.5.2-beta desktop downloads publicly verified; Linux, Windows, and Android supported; runtime behavior unverified | Featured priority 5; linked simplified Flatpak/EXE/portable ZIP cards, standalone Installation section, GitHub source link; Android Google Play, macOS, and iOS coming soon |
| ClipThat! | Beta 0.6.3-beta; Linux Flatpak and Windows installer/portable downloads publicly verified; runtime behavior unverified | Featured priority 6; three linked simplified desktop download cards, standalone Installation section with Linux and grouped Windows instructions, GitHub source link |
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
