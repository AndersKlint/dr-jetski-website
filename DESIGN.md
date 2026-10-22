# Website design

## Status

Design confirmed by the owner after the design interview. See [PLAN.md](PLAN.md) for the agreed implementation sequence.

## Confirmed direction

- Dr. Jetski Studios is the primary brand and home for the project catalogue.
- Visitors discovering and using software take priority over consulting prospects when homepage space competes. Professional background and technical detail should remain accessible.
- The visual direction is a warm, slightly eccentric, carefully crafted independent studio, with generous spacing and personality in typography, the wordmark, and selected graphic details.
- No purchasing flow is needed for launch. JetAlign may become paid later; that future change should not drive the launch design.
- Content will be maintained in repository files and published through Git.
- Most project names are provisional. The inventory includes finished software, publicly downloadable prereleases, private packages awaiting publication, and a prototype excluded from launch.
- Use placeholder media during design; screenshots and other real assets will come later.
- The site should remain pragmatic, fast, lightweight, and extremely inexpensive to host.
- The homepage will have a short studio introduction, selected prominent projects, and a more compact visual collection of the remaining public projects. Each public project gets its own page. The introduction should leave at least the first project visible immediately in a typical initial viewport.
- Featured-project priority is HanScan, JetAlign, WayToClip, LaoZi AI Flashcards, then HanKan.
- Project pages are media-first: a compact studio-identity banner, a substantial demo gallery, then project explanation, downloads, installation notes, and optional engineering detail.
- Use a restrained abstract water/wake motif as the studio's distinctive visual thread.
- Include a compact About/contact area with the creator's DevOps/full-stack background and professional links.
- Give the first three featured projects lead treatment; LaoZi AI Flashcards and HanKan receive smaller secondary treatment. Arrange all five cards asymmetrically: first on the left, second lower on the right, third back on the left beneath the first, continuing the alternating rhythm. Cards have generous breathing room and do not overlap. On mobile, preserve priority order in one column.
- Use minimal navigation: studio mark/name, a small About/contact link, and a clear Back to projects link on project pages. About/contact belongs near the bottom of the homepage.
- Some project cards play short, silent, inline looping previews, loading near the viewport and pausing offscreen. At most three previews play together. Use still posters for reduced-motion or data-saving preferences, provide a simple pause-motion control, and keep audio user-activated.
- Use one dark studio palette: warm charcoal background `#211E1B`, recessed surfaces `#181614`, raised surfaces `#2C2824`, primary near-white text `#F7F4EF`, brighter warm-gray secondary text `#D2CCC4`, and logo-orange accents `#EE7135`. Use dark `#211E1B` labels on orange fills, near-white dividers at 20% opacity, and subdued warm-gray wake linework. Reserve orange for actions, selected badges, hover accents, and keyboard focus; keep most text near-white or gray. Temporary illustrations use coordinated neutral warm off-white surfaces, charcoal framing, and orange highlights while retaining useful project-specific colors. Preserve actual product colors in real screenshots.
- Build with Astro static output on Cloudflare Pages. Maintain content in Git and add client JavaScript only where interactions require it.
- Initial software downloads are estimated at 2–5 GB total. Use Cloudflare R2 Standard storage behind a downloads subdomain, with versioned files outside Git and current builds published first. Account setup and the exact downloads subdomain are launch tasks.
- Project pages list explicit platform downloads, version and alpha/beta labels where applicable, file sizes, and concise installation notes when known. Only show real store or registry destinations.
- Include both private Flutter packages in the compact launch collection, with informative pages and a clear publication-in-preparation message. Add source/registry actions only once public destinations exist.
- Use the supplied orange/near-white Dr. Jetski Studios full logo as the homepage banner with no duplicate header mark: a jet-powered rider and wake emblem above bold Dr. Jetski lettering and a spaced Studios signature. Coordinate the interface with the full logo's colors. Derive the compact wordmark from the lettering alone and the square icon from the complete emblem without lettering, preserving the shapes and proportions of `logo/dr-jetski-studios-logo-vector.svg`; light-theme artwork is deferred. Earlier artwork is preserved in `logo/alternative_arcade`, `logo/alternative_colorful`, and `logo/super_minimal`. Retain characterful readable headings, locally hosted fonts, and sparse wake-line artwork.
- Use project-specific placeholder media initially. Personal/contact details remain explicitly marked for the owner to supply; do not invent identities or live destinations.
- The remaining collection uses a compact, manually ordered grid with small media, concise descriptions, project-type labels, and relevant availability messages. Keep the two Flutter packages together. Visitors browse the small catalogue directly, without search or filter controls.
- Every project page presents its gallery as a manual floating layered stack: one uncropped selected item whose height is at most about 60% of the viewport height, preserving its aspect ratio so its displayed size follows the media and portrait or landscape items do not fill the page. No panel, frame, border, or overlay arrows are shown. Up to two naturally available adjacent items per side sit behind the selected item as scaled-down, faded layers; the nearest layer is roughly half hidden by the selected item, and the outer layer is further overlapped, smaller, and fainter. The selected item stays above all neighbors. Depth-2 neighbors always remain behind depth-1 neighbors, including on hover or keyboard focus. Items never repeat to fill the stack, and the first item has no left neighbor while the last has no right neighbor; navigation is bounded and never wraps. Phones show at most one neighbor per side. Hovering or keyboard-focusing a neighbor may enlarge it and reduce its transparency while it keeps its depth order; the selected item stays static when hovered, and media show no hover outline or color change. Clicking a neighbor selects that exact item. No thumbnail strip is shown. Keyboard focus remains visibly indicated on interactive layers and controls. Navigation uses clickable round dots with accessible labels and current-state indication; the active dot is opaque and inactive dots are faded, and no visible slide counter is shown. Swipe and keyboard navigation are supported, and the gallery never advances automatically. A one-item gallery omits redundant navigation; an empty gallery is omitted.
- Selected video previews play silently and inline only while near or within the viewport; inactive previews pause and are not eagerly downloaded. Neighbor layers show video posters only, without loading or playing their video. Explicit slide navigation restarts a video when its slide is returned to; scrolling away, backgrounding, or the global pause-motion control pauses playback, and returning resumes it. The page-wide three-preview cap, reduced-motion/data-saving posters, and global pause control still apply. Horizontal slide changes move with a natural transition rather than snapping or jumping pages; scale, position, opacity, and selected-size changes use a short transition, and all are disabled under reduced motion.
- Prominent media may carry a feature overlay: left-aligned, balanced plain text preserving authored line breaks over an inset, fit-content rounded rectangle. The default dark style retains an opaque cool-neutral gray gradient and near-white text, independently of the warm site surfaces; an optional light style uses a light-neutral background and dark text. Both use the studio body font at weight 800, responsive sizing, tight line spacing, generous padding, an orange left rule, and a soft dark shadow, with the same shape and no banner animation. Overlays appear on the homepage card's selected preview and on the selected carousel item only; faded neighbor layers show no banner. Retain the shared horizontal left inset and a fractional vertical center, defaulting to halfway down the displayed media, with base positioning edge-clamped inside its bounds. After clamping, retain the current default shift of 38 CSS pixels left for overlap. Optional CSS-pixel offsets, each defaulting to zero, apply additively on top of this default placement, may intentionally move the banner outside the media, and reserve no layout space; there is no horizontal position fraction. The overlay is part of the media presentation, so it follows the media's geometry, movement, and scaling, persists across poster and playback states, and never intercepts click or swipe navigation. Its text remains accessible independently of the media alt text.
- The project-page banner includes the studio identity, a return link, a small project identifier, and a Downloads jump link when downloads exist. The substantive information/download panel sits below the gallery.
- Packages and scripts may use relevant diagrams, real usage examples, terminal output, or screenshots, with a shorter media section where appropriate.
- Publish software releases by manually uploading versioned files to R2 and updating validated repository metadata and Markdown content. Validate locally with `make check`, push `main` for staging, then promote fetched `origin/main` to `release` with `make deploy-prod` to trigger production deployment.

## Homepage composition

```text
Dr. Jetski Studios                                  About/contact
Independent apps, audio tools, and developer utilities.

[ HanScan: large preview ]
                          [ JetAlign: large preview ]
[ WayToClip: large preview ]
                          [ LaoZi: smaller preview ]
[ HanKan: smaller preview ]

More projects
[ compact project ] [ compact project ] [ compact project ]
[ compact project ] [ compact project ]

About the maker · contact · professional links
```

This describes relative position and hierarchy, not fixed dimensions. Stagger cards rather than aligning them into rows. Keep document, keyboard, and mobile reading order identical to editorial priority. Sparse wake linework can connect the composition without competing with the previews.

The homepage introduction is brief and plainspoken; the example line above is editable. Give attention and screen space to the projects. Featured cards contain prominent media, a title, a concise explanation, useful type/status context, and a clear route to the project page.

Homepage previews, both featured and compact, may select an existing gallery item through one optional `preview` entry in `media.yaml`, without changing gallery order. It reuses that item's media, poster, dimensions, and alt text, but its overlay and crop settings are independent of the matching normal `media` entry, with no inheritance. Without a `preview` entry, use the first gallery item and its normal media settings. Missing preview text means no homepage banner, even if the gallery item has one.

Homepage previews support optional crops authored alongside overlay settings in `media.yaml`, off by default. The crop is a normalized retained rectangle with positive spans, in property order `xStart`, `xEnd`, `yStart`, `yEnd`. HanScan's dedicated preview entry holds its homepage video caption/settings and crop `{xStart:0,xEnd:1,yStart:0.16,yEnd:0.84}`; its normal media entry retains the gallery caption without a crop. Apply the same CSS crop to poster and video without modifying the source video, adjusting the displayed aspect ratio and layout height to the visible area rather than merely hiding media inside the original footprint. Feature-overlay coordinates are relative to that visible cropped area. All project-detail carousel media remain uncropped and retain their normal media settings. Entries may define a crop without overlay text; [PROJECT-ASSETS.md](PROJECT-ASSETS.md) defines the authoring format and validation rules.

## Project-page composition

```text
Studio identity · Back to projects · project identifier · Downloads

[ carousel: floating layered stack of selected media with scaled neighbor layers, round navigation dots ]

Project title and explanation · maturity / availability where useful
Platform downloads · file details · source / store destinations
Features · installation · optional engineering detail
```

The carousel stays before the substantive description/download panel on all screens. The Downloads jump link gives repeat visitors a direct route past the gallery. Content sections are optional; avoid empty headings or artificial media galleries for packages and scripts.

HanScan has a straightforward static text privacy-policy page at https://drjetski.com/projects/hanscan/privacy. A small, normal “Privacy policy” link appears at the bottom of HanScan's project information, with no homepage or main-navigation entry.

## Content and delivery

- Ten launch projects: the five featured projects and five compact projects. WORLD-vocoder-vst is a future draft, not a generated public launch page.
- Each project is one folder named for its stable route slug under `src/content/projects/<slug>/`, containing `index.md` plus co-located local media. Stable routing is independent of the editable display name; local media are referenced explicitly, not discovered. JetAlign uses `/projects/jetalign`; the former `/projects/vocal-aligner` route permanently redirects there.
- The `index.md` holds short descriptive metadata, the ordered gallery, Markdown detail sections, and real download references. Its first gallery item supplies the homepage preview unless `media.yaml` explicitly selects another gallery item.
- Track featured priority, release maturity, public availability, and page visibility separately. A private finished package can have a public explanatory page; an alpha can have a public download.
- Download records identify platform and format, URL, and known version/size details. Only render actionable links when their destinations are real; records without a real URL render an honest pending state.
- Keep public source/registry/store links optional. Do not imply that private projects are open source or that unreleased store listings exist.
- Gallery media may reference small local files such as `./file.ext` or HTTPS R2 URLs. Each preview has a local generated poster plus alt text and intrinsic width/height. Keep small optimized images, posters, diagrams, local H.264 MP4 previews, and local fonts with the static site. Serve substantial preview video and binaries separately through R2 under versioned paths; total R2 usage includes media as well as software.
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

### yt-clip-extractor

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
| Paddle-my-pdf | Finished CLI; unpolished, no installer, Python requirements file | Confirm source/install destination |
| dart_paddle_ocr | Finished implementation; package not yet polished, still closed source; pub.dev publication planned | Include an informative page with publication-in-preparation status; no public package/source actions yet |
| chinese_popup_dict | Finished implementation; package not yet polished, still closed source; pub.dev publication planned | Include an informative page with publication-in-preparation status; no public package/source actions yet |
| WORLD-vocoder-vst | Prototype | Exclude from the launch site; future project |
| yt-clip-extractor | Minimal MVP; Linux and Windows builds available | Include in compact collection; supply current download destinations |
| spotify-screensaver | Finished script; screenshot available | Confirm source/install destination |

## Execution details and owner-supplied content

Exact font families, color values, breakpoints, card dimensions, and spacing are visual-tuning tasks during implementation, within the agreed direction.

The owner will supply final product names where changing, personal/contact information, real screenshots/previews, artifact versions and sizes, download/source/install destinations, and any additional public platform releases. Initial layout work uses clearly temporary project-specific media and content markers.

The confirmed production domain is https://drjetski.com. An early WIP deployment of the current Astro static site through Cloudflare Pages Git integration is accepted with existing pending-download states and clearly marked content/media placeholders. Cloudflare account setup is unverified; Pages provisioning, domain/DNS connection through Pages Custom domains, and actual deployment remain pending. R2 bucket and downloads-subdomain setup can wait until substantial media or binaries need public delivery. Measure the actual combined media/binary storage footprint when preparing uploads.

Cloudflare Pages Git integration uses `release` as the production branch and `main` as the staging preview at `main.<project>.pages.dev`, where `<project>` is the actual Pages project name. The owner confirms `release` already exists. An optional `staging.drjetski.com` custom hostname may point to that preview; previews are public by default, with Access protection optional. Both branches build from source with the same settings; generated `dist/` stays out of Git. Staging and production may share R2 assets. [README.md](README.md) documents setup and the simple promotion commands; setup and deployment verification remain pending.

## Verified technical references

- [Astro configuration](https://docs.astro.build/en/reference/configuration-reference/#output): static output is the default.
- [Astro components](https://docs.astro.build/en/basics/astro-components/): components produce HTML without shipping their server/build-time JavaScript to the browser.
- [Cloudflare Pages limits](https://developers.cloudflare.com/pages/platform/limits/): 25 MiB maximum per asset; Free includes 500 builds per month and 20,000 files per site.
- [Cloudflare Pages pricing](https://developers.cloudflare.com/pages/functions/pricing/): static asset requests are free and unlimited; Functions have separate quotas.
- [Cloudflare R2 pricing](https://developers.cloudflare.com/r2/pricing/): Standard storage free tier includes 10 GB-month, one million Class A requests, and ten million Class B requests per month; direct egress is free. Usage beyond free allowances is billed.
- [Cloudflare R2 public buckets](https://developers.cloudflare.com/r2/buckets/public-buckets/): use a custom domain for production public delivery; r2.dev is rate-limited and intended for development.
