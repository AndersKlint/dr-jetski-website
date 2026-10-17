# Project assets

## Folder

```text
src/content/projects/<slug>/
  index.md      project metadata + body
  preview.webp  local image/poster, referenced as ./preview.webp
  diagram.svg   local SVG diagram
```

- The folder name must equal the `slug` field; it is the stable route.
- Only `*/index.md` is ingested as a project. Other Markdown is not a project;
  images and posters referenced from `index.md` are bundled and optimized.
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

`gallery` is optional; its first entry becomes the homepage card. Set
`visibility: "public"` to publish. Add `featuredRank` to place the card in the
homepage featured set; other public projects appear in the compact grid ordered
by `editorialOrder`. Every referenced file must exist.

## Gallery media

- `image`: a local `./file.ext` with `alt`.
- `preview`: a silent looping preview that plays while visible; remote R2 `src`,
  local `poster`, and `width`/`height` matching the video and poster aspect.
- `demo`: visitor-controlled and never autoplays; same fields as `preview` with
  `kind: "demo"` and required `hasAudio` (`true` when it has sound, else `false`).

```yaml
gallery:
  - kind: "preview"
    src: "https://REPLACE-WITH-R2-HOST/previews/my-project/v1/loop.mp4"
    poster: "./preview.webp"
    alt: "Short silent clip of My Project in use."
    width: 1280
    height: 720
```

Replace the placeholder URL before use; never invent a destination.

## Preparation

| Asset | Format | Guidance |
| --- | --- | --- |
| Images | PNG, JPEG, WebP; SVG diagrams | longest edge 1600–2400px when available, preserve aspect, no upscaling |
| Looping preview | WebM or MP4 (H.264) | 5–15s, silent, ≤1280px longest edge, 24–30fps, a few MB |
| Demo | WebM or MP4 (H.264) | may be longer and include audio; never autoplays |

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
