# Project assets

## Folder

```text
src/content/projects/<slug>/
  index.md               project metadata + body
  media.yaml             ordered gallery + media presentation
  preview.webp           local image/poster, referenced as preview.webp
  diagram.svg            local SVG diagram
```

- The folder name must equal the `slug` field; it is the stable route.
- ClipThat! uses `src/content/projects/clipthat/`, `slug: "clipthat"`,
  `displayName: "ClipThat!"`, and `featuredRank: 6`; its route is `/projects/clipthat`.
- Only `*/index.md` is ingested as a project. Other Markdown is not a project;
  images and posters referenced from `media.yaml` are bundled and optimized.
- `media.yaml` is read directly, without registration in `index.md`. It is the
  only gallery source; there is no fallback to frontmatter gallery entries.
- Reference local media as exact filenames such as `preview.webp`, without `./`.
  Dimensions are read at build time, so
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
---

Short paragraph describing the project.

- One notable feature.

Platform availability: not yet released.
```

Create `media.yaml` beside this template using the examples below. Normal `media`
record order is carousel order; the first supplies the homepage preview unless a
`preview` record selects another gallery item. Project pages show one uncropped selected item with faded
neighbor layers and bounded navigation through round dots, swipe, and keyboard;
a one-item gallery omits navigation and
an empty gallery is not rendered. Set `visibility: "public"` to publish. Add
`featuredRank` to place the card in the homepage featured set; other public
projects appear in the compact grid ordered by `editorialOrder`. Every
referenced file must exist or the build fails. Adding a record automatically
discovers its corresponding local asset on rebuild; files not listed do not
appear. Missing or empty `media.yaml` means an empty gallery.

## HanScan privacy policy

Copy `../hanscan/privacy-policy.md` verbatim into
`src/content/projects/hanscan/privacy.md`, preserving all legal text.
Manually synchronize the bundled copy when the source policy changes;
the website build must not depend on the sibling repository.
This support file is not a project entry. Page presentation and placement
are defined in [DESIGN.md](DESIGN.md).

## Gallery media

- `image`: a local filename with required `alt`; `kind: image` is optional and
  is the default. The minimum record is `media` plus `alt`.
- `preview`: a silent looping preview that plays while active and visible; `media`
  may be a local filename or a real HTTPS video URL, with a flat local `poster`
  filename (no `./`), `alt`, and positive integer `width`/`height` matching the
  video and poster aspect.
- `demo`: visitor-controlled and never autoplays; same fields as `preview` with
  `kind: "demo"` and required `hasAudio` (`true` when it has sound, else `false`).

```yaml
- media: preview.webp
  alt: "Screenshot of My Project showing its main window."
- media: video.mp4
  kind: preview
  poster: video-poster.webp
  alt: "Short silent clip of My Project in use."
  width: 1280
  height: 720
- media: https://downloads.drjetski.com/my-project/v1/demo.mp4
  kind: demo
  poster: demo-poster.webp
  alt: "Demonstration of My Project's editing workflow."
  width: 1920
  height: 1080
  hasAudio: true
```

Keep small local preview videos as H.264 MP4 files. For substantial video,
replace `media` with a real HTTPS R2 URL; the URL above illustrates the format,
not a published destination. Never invent a destination. `isPlaceholder` is an
optional boolean for temporary media. Posters are local files, not separate gallery
items; faded video neighbors show posters without loading or playing the video.

## Per-media settings

`media.yaml` beside `index.md` supplies the gallery and per-media settings, read
directly without registration in the project metadata. The dev server watches
additions, edits, and deletions without a restart.

Use a top-level YAML sequence of normal `media` records and at most one optional
`preview` record. Each record has exactly one selector, `media` or `preview`:

```yaml
- preview: hanscan-demo.mp4
  highlight-color: "#3A8DFF"
  text: "Chinese, Pinyin & English OCR"
  text_side: right
  text_pos_y: 0.12
  text_offset: {x: 0, y: 0}
  style: dark
  preview_crop: {xStart: 0, xEnd: 1, yStart: 0.16, yEnd: 0.84}
- media: hanscan-demo.mp4
  highlight-color: "#3A8DFF"
  kind: preview
  poster: hanscan-demo-poster.webp
  alt: "HanScan recognizing Chinese text."
  width: 720
  height: 1280
  text: "Chinese, Pinyin & English OCR"
  text_pos_y: 0.12
  text_offset: {x: 0, y: 0}
  style: dark
- media: slope.png
  alt: "HanScan reading Chinese text on a slope sign."
  text: |
    Quick offline OCR
    from anywhere
  text_offset: {x: -12, y: 8}
  style: light
- media: preview.webp
  alt: "My Project's main window."
  preview_crop: {xStart: 0.1, xEnd: 0.9, yStart: 0, yEnd: 1}
```

### Matching and validation

- Each record requires exactly one of `media` or `preview`, never both. A normal
  `media` record authors a gallery item using an exact, case-sensitive flat local
  filename or, for video, the complete real HTTPS URL.
- A `preview` selector matches the exact source basename of an existing gallery
  item, not its poster. For HTTPS sources, use the filename in the URL path,
  excluding query and hash. An unmatched selector fails the build.
- Duplicate gallery sources are invalid, and at most one `preview` entry is
  allowed. A `preview` and a `media` entry may select the same source.
  Invalid YAML, a non-sequence root,
  malformed entries, duplicate YAML keys or duplicate media filenames, unknown
  fields (including nested fields), and invalid field values fail the build.
- Optional fields may be omitted; explicit nulls are not defaults. Numeric
  fields require finite numbers, not numeric strings.

### Homepage selection and independent settings

- An explicit `preview` selects an existing gallery item for both featured and
  compact homepage cards, reusing its source, poster, dimensions, and alt text.
  It neither adds a gallery item nor changes gallery order; moving or adding the
  selector anywhere in the YAML sequence has no effect on carousel order.
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
   displayed media, or the visible cropped area on the homepage. There is no
   horizontal position fraction.
- `text_side` is optional and accepts only `left` (default) or `right`, on normal
   `media` records or independent `preview` records. Left anchors the label at
   the left edge, extending rightward; right anchors it at the right edge,
   extending leftward, with the highlight on the far right. Mirror the shared
   horizontal inset and placement, keeping text readable and unmirrored.
- Edge-clamp the base banner position inside the media before applying
   `text_offset`. This optional mapping contains numeric CSS-pixel `x` and `y`
   offsets, each independently defaulting to `0`. Negative values are allowed.
   After clamping, shift outward by 38 CSS pixels: left for `left`, right for `right`.
   Apply authored offsets additively on top of that placement so intentional
   overflow outside the media remains visible; offsets do not reserve space or
   change layout dimensions. Offsets stay in screen axes on either side:
   positive `x` moves right and positive `y` moves down.
- `style` is optional and accepts only `dark` (default) or `light`. Dark retains
  the existing opaque cool-neutral gradient and near-white text; light uses a
  light-neutral background and dark text. Both retain the same typography,
   authored accent color, rounded shape, padding, and shadow.
- `highlight-color` is optional on normal `media` and independent `preview`
  records: a quoted six-digit `#hex` string such as `"#3A8DFF"`. It sets the
   feature overlay's accent on the chosen side in either style; omission defaults to the site's
  orange `--ember` token. An independent preview does not inherit the media color.
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

## Store screenshot generation

From the repository root, run `npm ci` to install dependencies, including
`playwright-core`, and install Chrome separately. Set `CHROME_PATH` to the Chrome
executable to override browser discovery. Rendering uses headless Chrome with
the site's Inter font and shared [feature-overlay CSS](src/media/featureOverlay.css).

```sh
./store-screenshot-generator/store-screenshot-generator --project-name hanscan
./store-screenshot-generator/store-screenshot-generator --project-name hanscan --background-color 211e1b
./store-screenshot-generator/store-screenshot-generator --project-name hanscan --background-color '#211e1b' --output-dir ./screenshots
./store-screenshot-generator/store-screenshot-generator --project-name hanscan --padding 2.5
./store-screenshot-generator/store-screenshot-generator --project-name hanscan --no-padding --no-text-overlay
./store-screenshot-generator/store-screenshot-generator --project-name hanscan --highlight-color 33aaff
./store-screenshot-generator/store-screenshot-generator --project-name hanscan --phone-frame
./store-screenshot-generator/store-screenshot-generator --project-name hanscan --stylized-frame --no-text-overlay
./store-screenshot-generator/store-screenshot-generator --project-name hanscan --stylized-frame --crop-status-bar 80
./store-screenshot-generator/store-screenshot-generator --project-name hanscan --background-image ./store-screenshot-generator/hanscan-9-20/gradient_bkg.png --stylized-frame --stylized-text
./store-screenshot-generator/store-screenshot-generator --project-name hanscan --image-dir ./store-screenshot-generator/hanscan-9-20
./store-screenshot-generator/store-screenshot-generator --project-name hanscan --text-offset=-20,10
./store-screenshot-generator/store-screenshot-generator --help
```

- `--project-name` is required and takes the project folder's slug.
- `--device <phone|tablet>` selects the output preset and defaults to `phone`.
  Phone output retains source-based orientation; tablet output is always
  3840×2160 landscape, including for portrait or square sources. Sources retain
  their aspect ratio and fit inside the available space. Supply tablet screenshots
  through `--image-dir` and a matching 3840×2160 `--background-image` for an exact
  background fit. Other background sizes retain centered cover behavior.
- `--image-dir` optionally loads images from another folder, resolving relative
  paths against the current working directory. Supply the exact same filenames
  (including extensions) as the project's gallery images. The project's existing
  `index.md` and `media.yaml` still provide metadata, gallery order, and captions;
  only image sources change. Rendering uses the replacement images' actual
  dimensions and aspect ratios. Every gallery image must exist in the alternate
  folder; missing files fail instead of falling back to the originals. Omission
  uses the project's original images.
- `--highlight-color` is optional: exactly six hexadecimal digits, optionally
  prefixed with `#` (quote a leading `#` in the shell). It overrides the caption's
   accent on the chosen side in dark and light styles, with or without either frame, only in
  the generated document. Precedence: explicit CLI override, then each normal
  media record's authored `highlight-color`, then the website's `--ember` token.
- `--text-offset <x,y>` optionally replaces both YAML `text_offset` coordinates
  for every existing caption in the export. Supply two comma-separated finite
  numbers in CSS pixels; negative and decimal values are allowed. Positive `x`
  moves right and positive `y` moves down. These offsets scale with the image,
  just like authored YAML offsets. Use `--text-offset=-20,10` when the value
  starts with a minus sign. Omission retains each caption's YAML offset;
  `--text-offset=0,0` resets both coordinates. Uncaptioned images stay uncaptioned.
- `--no-text-overlay` omits every caption bubble, including its background,
  accent, and shadow. The project's authored captions stay intact.
- `--stylized-text` replaces normal caption bubbles with large, centered white
  headings above the screenshot, using each image's normal `media.yaml` `text`.
  Use the local Inter font at weight 900, tight line spacing, and balanced wrapping;
  preserve authored line breaks. Reserve the measured heading height and a gap,
  then uniformly fit and center the full screenshot or phone in the remaining
  area, retaining its selected padding. Long headings shrink to fit within a
  quarter of the canvas height in phone mode, or 20% in tablet mode. Tablet
  headings start at 7.5% of the canvas short edge, rather than 9.5% for phone,
  reserving more room for a landscape screenshot. Images without captions keep the normal layout.
  This works with either frame or neither. `--no-text-overlay` hides bubbles only,
  not stylized headings; authored caption positions, offsets, side, style, and
  highlight colors do not apply to headings.
- `--crop-status-bar <pixels>` removes a fixed number of pixels from the top
  of every loaded image, for example `--crop-status-bar 80` to remove empty
  status-bar safe-area space. Use a non-negative integer, default `0`, smaller
  than each source image's height. Units are original image pixels, including
  replacement images supplied through `--image-dir`, not CSS or output pixels.
  Apply cropping before orientation selection, sizing, corner rounding, shadows,
  phone framing, and caption placement. Captions use the remaining image's
  geometry. Original files and project content are not modified.
- `--background-color` is optional: six hexadecimal digits, optionally prefixed
  with `#` (quote a leading `#` in the shell). Omit this option for a transparent
  background; remove `--background-color ffffff` from `hanscan.sh` when needed.
  Default outputs are generic assets with alpha, not Google Play-compliant
  screenshots. Supply `--background-color 211e1b` for opaque RGB PNG exports:
  the solid background sits behind the entire composition, including transparent
  pixels in the original image. Google Play does not accept transparent screenshots.
- `--background-image <path>` loads a local PNG, JPEG, WebP, SVG, or AVIF image,
  with relative paths resolved from the invocation working directory. Fill the
  entire output canvas using centered cover sizing, preserving aspect ratio and
  cropping background edges as needed. The image sits behind all screenshot and
  text content, above `--background-color` when supplied. Transparent background
  pixels reveal that color or remain transparent when no color is supplied.
- `--padding <percent>` is optional and defaults to `8`. Accept a finite decimal
  percentage from `0` inclusive to `50` exclusive. It sets the minimum inset on
  every edge, measured as a percentage of the final canvas's short edge. Without
  `--phone-frame`, this is image padding, including with `--stylized-frame`;
  with the phone frame, it measures the frame's outer edges.
  Captions and shadows do not count toward this inset.
- `--no-padding` sets the minimum inset to zero, overriding `--padding` when
  both are supplied. The full image or frame still fits the fixed-size canvas
  without cropping, so aspect-ratio differences can leave space on two sides.
  This does not remove black padding inside a phone screen.
- `--phone-frame` is an optional boolean flag, off by default. It requests a
  silver phone frame from `store-screenshot-generator/phone-frame-9-20.svg`, with
  flat side buttons, rounded screen corners, and a black camera dot over the
  image. Its fixed native screen opening is 1440×3200 (9:20); screenshots at
  that aspect ratio fill it exactly. Center other source aspect ratios inside
  the screen with black padding, preserving the full image without distortion.
  Rotate the frame for landscape images. Only screen-corner rounding and the
  camera obscure content.
- `--stylized-frame` is an optional boolean flag, off by default, mutually
  exclusive with `--phone-frame`. It uses
  `store-screenshot-generator/stylized-frame.svg` for a larger corner radius
  and strong drop shadow applied directly to the screenshot. There is no visible
  frame, border, or added letterboxing; the source keeps its natural aspect ratio.
  The SVG defines the reference corner radius and shadow filter. Padding measures
  the screenshot, excluding its shadow; small or zero padding can clip the shadow
  at the canvas edge.
- Output defaults to `store-screenshot-generator/output/<slug>/`, relative to
  the tool, with each image named `<original-basename>.png`. The default output
  folder is ignored by Git; reruns overwrite matching generated outputs.
  `--output-dir` overrides the destination and resolves relative paths against
  the current working directory.
- The tool processes original images in `media.yaml` normal-record order, including
  images without captions, and skips all videos. Author captions in normal
   `media` records in `media.yaml` using `text`, `text_side`, `text_pos_y`, `text_offset`,
  `style`, and `highlight-color` as documented above. It uses the shared parser's
  gallery items and ignores homepage-specific captions and crops.
- With `--device phone`, final output is 1440×2560 for portrait or square images
  and 2560×1440 for landscape images, using dimensions after any
  `--crop-status-bar` crop. With `--device tablet`, final output is always
  3840×2160 landscape. Use separate output directories to retain both device sets.
  Without `--phone-frame`, uniformly fit the remaining image inside the selected
  padding and center the image itself on the canvas.
  With `--phone-frame`, uniformly fit and center the entire frame, including its outer
  edges, inside that padding. Preserve the source aspect ratio
  without crop-to-fill or cover sizing; the source may be resampled to fit.
  In both modes, captions remain relative to the actual screen/image box, not
  the frame body. Ignore the feature overlay and shadows when computing fit,
  centering, and padding. They follow the image's scale and authored placement,
  may extend into the padding, and may clip at the output canvas edge.
- With `--stylized-text`, reserve the separate heading area before fitting;
  the screenshot is centered in the remaining space rather than the full canvas.
- Without either frame, the only intentional image clipping remains subtle corner rounding: an 8 CSS-pixel
  image-only radius at the 360 CSS-pixel image-width reference, scaled with the
  image and optionally capped for a narrow shorter dimension. With `--stylized-frame`,
  use a 24 CSS-pixel reference radius, capped at one twelfth of the shorter image
  dimension, plus the SVG shadow filter. In tablet mode, use a radius of 1.5% of
  the screenshot's shorter edge without a frame, or 3.5% with `--stylized-frame`;
  scale the SVG shadow offset and blur using that shorter edge as the reference
  instead of its width. With `--phone-frame`,
  the screenshot corners match the SVG screen opening. The final output canvas
  keeps square corners in both modes. The inset adds background padding;
  it does not guarantee protection from unspecified Google Play UI behavior.
- With an explicit background color, outputs target Google Play phone screenshot geometry and format, following
  the [official screenshot requirements](https://support.google.com/googleplay/android-developer/answer/9866151?hl=en):
  JPEG or 24-bit PNG without alpha, minimum dimension 320px, maximum dimension
  3840px, and a longer edge no more than twice the shorter edge. For apps, Google
  recommends at least four screenshots at 1080px or higher in 9:16 portrait or
  16:9 landscape. Geometry and format alone do not guarantee suitability for all
  device listings or promotion eligibility; manually review captions and other
   content requirements before uploading. The optional generic phone frame is a
   marketing asset, not a claim of Google Play promotion compliance; official
   guidance recommends avoiding device imagery. There are no image-selection options.

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
