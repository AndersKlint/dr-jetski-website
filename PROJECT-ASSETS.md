# Project assets

## Folder

```text
src/content/projects/<slug>/
  index.md               project metadata + body
  media.yaml             optional per-media text and homepage crops
  preview.webp           local image/poster, referenced as ./preview.webp
  diagram.svg            local SVG diagram
```

- The folder name must equal the `slug` field; it is the stable route.
- Only `*/index.md` is ingested as a project. Other Markdown is not a project;
  images and posters referenced from `index.md` are bundled and optimized.
- `media.yaml` is an optional support file read directly; it is not
  referenced from `index.md`.
- Reference local images as `./file.ext`. Dimensions are read at build time, so
  images omit `width`/`height`.
- Keep the folder flat.

## Template

Copy for a new project and replace the metadata and media:

```markdown
---
slug: "my-project"
displayName: "My Project"
description: "One sentence describing the project."
projectType: "app"
supportedPlatforms: ["Linux", "Windows"]
releaseMaturity: "prototype"
visibility: "draft"
editorialOrder: 99
availability:
  status: "unavailable"
  message: "In development; not yet available."
authoringNotes:
  - "Owner TODO: replace placeholder metadata and media."
gallery:
  - kind: "image"
    src: "./preview.webp"
    alt: "Screenshot of My Project showing its main window."
---

Short paragraph describing the project.

- One notable feature.

Platform availability: not yet released.
```

`gallery` is optional; its first entry supplies the homepage preview unless a
`preview` entry in `media.yaml` selects another gallery item. Its order remains
the carousel order. Project pages show one uncropped selected item with faded
neighbor layers and bounded navigation through round dots, swipe, and keyboard;
a one-item gallery omits navigation and
an empty gallery is not rendered. Set `visibility: "public"` to publish. Add
`featuredRank` to place the card in the homepage featured set; other public
projects appear in the compact grid ordered by `editorialOrder`. Every
referenced file must exist.

## Gallery media

- `image`: a local `./file.ext` with `alt`.
- `preview`: a silent looping preview that plays while active and visible; `src`
  may be a local `./file.mp4` or an HTTPS R2 URL, with a local `poster`, `alt`,
  and `width`/`height` matching the video and poster aspect.
- `demo`: visitor-controlled and never autoplays; same fields as `preview` with
  `kind: "demo"` and required `hasAudio` (`true` when it has sound, else `false`).

```yaml
gallery:
  - kind: "preview"
    src: "./video.mp4"
    poster: "./video-poster.webp"
    alt: "Short silent clip of My Project in use."
    width: 1280
    height: 720
```

Keep small local preview videos as H.264 MP4 files. For substantial video,
replace `src` with a real HTTPS R2 URL; local `./file.mp4` references remain
valid. Never invent a destination. Posters are local files, not separate gallery
items; faded video neighbors show posters without loading or playing the video.

## Per-media settings

An optional `media.yaml` beside `index.md` supplies per-media settings, read
directly without registration in the project metadata. The dev server watches
additions, edits, and deletions without a restart.

Use a top-level YAML sequence of normal `media` records and at most one optional
`preview` record. Each record has exactly one selector, `media` or `preview`:

```yaml
- preview: hanscan-demo.mp4
  text: "Chinese, Pinyin & English OCR"
  text_pos_y: 0.12
  text_offset: {x: 0, y: 0}
  style: dark
  preview_crop: {xStart: 0, xEnd: 1, yStart: 0.16, yEnd: 0.84}
- media: hanscan-demo.mp4
  text: "Chinese, Pinyin & English OCR"
  text_pos_y: 0.12
  text_offset: {x: 0, y: 0}
  style: dark
- media: slope.png
  text: |
    Quick offline OCR
    from anywhere
  text_offset: {x: -12, y: 8}
  style: light
- media: preview.webp
  preview_crop: {xStart: 0.1, xEnd: 0.9, yStart: 0, yEnd: 1}
```

### Matching and validation

- Each record requires exactly one of `media` or `preview`, never both.
  Either selector must be the exact, case-sensitive original gallery
  source filename, without a directory prefix. For video, use the video source
  filename, not its poster. For HTTPS sources, use the filename in the URL path,
  excluding its query and hash.
- A missing sidecar adds no settings. Valid normal `media` entries with unmatched
  filenames are silently ignored, including nonexistent or unused asset names.
  An unmatched `preview` filename fails the build.
- Only one normal `media` entry may target a filename, and at most one `preview`
  entry is allowed. A `preview` and a `media` entry may target the same filename.
  Invalid YAML, a non-sequence root,
  malformed entries, duplicate YAML keys or duplicate media filenames, unknown
  fields (including nested fields), and invalid field values fail the build.
  Validate entries even when their filenames do not match a gallery item.
- Optional fields may be omitted; explicit nulls are not defaults. Numeric
  fields require finite numbers, not numeric strings.

### Homepage selection and independent settings

- An explicit `preview` selects an existing gallery item for both featured and
  compact homepage cards, reusing its source, poster, dimensions, and alt text.
  It neither adds a gallery item nor changes gallery order.
- Both record types support the same optional settings below. An explicit
  preview uses only its own settings and their defaults, never settings inherited
  from the matching normal media record. Omitted `text` means no homepage banner;
  omitted `preview_crop` means no crop.
- Without a `preview` entry, use the first gallery item with its normal `media`
  settings, preserving the current fallback behavior.
- Normal `media` records continue to control gallery captions and presentation;
  explicit preview settings apply only on the homepage. All gallery items remain
  uncropped.
- The HanScan example above has its homepage caption, position, offsets,
  dark style, and `yEnd: 0.84` crop in the dedicated preview record; the normal
  media record has its own gallery caption and no crop.
  Captions are independent: changing only the preview's `text` to
  `Read Chinese anywhere` would leave the gallery caption
  `Chinese, Pinyin & English OCR` unchanged.

### Feature-overlay text

- `text` is optional plain, nonblank text. Use `|` for multiline text; preserve
  authored line breaks and do not interpret Markdown or HTML. Without `text`,
  no banner is rendered, so crop-only entries are valid.
- `text_pos_y` is optional, defaults to `0.5`, and must be a finite number from
  `0` to `1` inclusive. It sets the banner's vertical center relative to the
  displayed media, or the visible cropped area on the homepage. Keep the current
  shared horizontal left inset; there is no horizontal position fraction.
- Edge-clamp the base banner position inside the media before applying
  `text_offset`. This optional mapping contains numeric CSS-pixel `x` and `y`
  offsets, each independently defaulting to `0`. Negative values are allowed.
  After clamping, retain the current default shift of 38 CSS pixels left for overlap.
  Apply authored offsets additively on top of that placement so intentional
  overflow outside the media remains visible; offsets do not reserve space or
  change layout dimensions.
- `style` is optional and accepts only `dark` (default) or `light`. Dark retains
  the existing opaque cool-neutral gradient and near-white text; light uses a
  light-neutral background and dark text. Both retain the same typography,
  orange left rule, rounded shape, padding, and shadow.
- Text settings apply to the homepage preview (featured and compact) according to
  the selection rules above, and normal media text applies to the selected
  project-carousel item, never faded neighbors. The banner
  follows media movement/scaling and persists through poster/playback changes,
  does not intercept navigation, and stays accessible separately from alt text.

### Homepage preview crops

- `preview_crop` is optional; omission means no crop. When supplied, it requires
  all four normalized coordinates in authoring order `xStart`, `xEnd`, `yStart`,
  `yEnd`. Each must be finite and within `0`–`1` inclusive, with
  `xStart < xEnd` and `yStart < yEnd` so the retained rectangle has positive spans.
- Crops apply only when the matching item is the selected homepage preview,
  for both featured and compact cards. All project-gallery items stay uncropped,
  including the selected item and faded neighbors.
- Apply the same crop to poster and video without modifying source files.
  Displayed aspect ratio and layout height follow the retained rectangle rather
  than reserving the uncropped footprint. Overlay positions use that visible area.

## Preparation

| Asset | Format | Guidance |
| --- | --- | --- |
| Images | PNG, JPEG, WebP; SVG diagrams | longest edge 1600–2400px when available, preserve aspect, no upscaling |
| Looping preview | MP4 (H.264) | 5–15s, silent, ≤1280px longest edge, 24–30fps, a few MB |
| Preview poster | PNG, JPEG, WebP | local, same aspect as the video, with authored `alt`, `width`, and `height` |
| Demo | MP4 (H.264) | may be longer and include audio; never autoplays |

## Downloads

Upload binaries to R2 under versioned paths, outside Git. Each record needs
`label`, `platform`, and `format`; a real `https` `url` makes it an action, and
`version`, `sizeBytes`, `filename`, and `installationNotes` carry release
detail. A record without a real `url` renders an honest pending state.

## Workflow

1. `npm run dev` to review local edits.
2. `npm run check`, then `npm run build`, before committing.
3. Commit and push; Cloudflare Pages deploys from Git.

Allowed enum values: [src/projects/projectSchema.ts](src/projects/projectSchema.ts).
