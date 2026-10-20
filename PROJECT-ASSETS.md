# Project assets

## Folder

```text
src/content/projects/<slug>/
  index.md               project metadata + body
  image_overlay_text.md  optional feature overlays
  preview.webp           local image/poster, referenced as ./preview.webp
  diagram.svg            local SVG diagram
```

- The folder name must equal the `slug` field; it is the stable route.
- Only `*/index.md` is ingested as a project. Other Markdown is not a project;
  images and posters referenced from `index.md` are bundled and optimized.
- `image_overlay_text.md` is an optional support file read directly; it is not
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

`gallery` is optional; its first entry becomes the homepage card and its order
is the carousel order. Project pages show one uncropped item at a time with
previous/next navigation and thumbnails; a one-item gallery omits navigation and
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
valid. Never invent a destination. Posters are local files; thumbnails are
generated during ingestion and are not authored fields.

## Feature overlays

`image_overlay_text.md` is optional. It attaches short captions to preview media
without changing `index.md`. Astro's dev server watches the file directly, so
adding, editing, or deleting it takes effect without a restart.

Each overlay is one fenced plain-text block:

````text
```hanscan-demo.mp4 y=0.3
Overlay Chinese, Pinyin or English
```

```slope.png
Quick offline OCR from anywhere
```
````

- `filename` must match a gallery media source's original filename exactly and
  case-sensitively; write just the filename, without a directory prefix. For a
  video, use the video source filename, not its poster. For an HTTPS URL, use
  the filename in its path, excluding the query and hash.
- `y` is optional and defaults to `0.5`. It is the fractional vertical center
  position of the banner in the actual media, from `0` (top) to `1` (bottom),
  inclusive.
- Overlay text is plain text, may span multiple lines, and is rendered centered.
  It must not be empty.
- Only one block may target a filename.
- A missing sidecar, or a name with no matching gallery item, adds no overlay.
  Names that do not correspond to a rendered gallery item are ignored silently,
  including names of nonexistent or unused assets; they are not build errors.
- Malformed blocks, duplicate filenames, empty text, and non-numeric or
  out-of-range `y` values fail the build as authoring errors.
- The former `h` position syntax is not supported.

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
