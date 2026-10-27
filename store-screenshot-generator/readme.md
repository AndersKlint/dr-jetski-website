# Store screenshot generator

Export a project's gallery images as PNGs, optionally with caption bubbles or
bold headings, a phone frame or rounded corners with a strong shadow, and a
solid or image background.
Videos are skipped. Run commands from
the repository root after `npm ci`; Chrome must be installed separately.
Set `CHROME_PATH` to override its executable location.

## Common uses

Default export with authored captions and a transparent background:

```sh
./store-screenshot-generator/store-screenshot-generator --project-name hanscan
```

Clean, transparent export using alternate images:

```sh
./store-screenshot-generator/store-screenshot-generator \
  --project-name hanscan \
  --image-dir ./store-screenshot-generator/hanscan-9-20 \
  --no-padding \
  --no-text-overlay \
  --output-dir ./store-screenshot-generator/output/hanscan-clean
```

Phone-framed export with a white background and blue caption accent:

```sh
./store-screenshot-generator/store-screenshot-generator \
  --project-name hanscan \
  --phone-frame \
  --background-color ffffff \
  --highlight-color 3A8DFF
```

Borderless screenshot with rounded corners and a strong shadow, removing
80 source-image pixels of empty status-bar space from the top:

```sh
./store-screenshot-generator/store-screenshot-generator \
  --project-name hanscan \
  --image-dir ./store-screenshot-generator/hanscan-9-20 \
  --stylized-frame \
  --crop-status-bar 80 \
  --no-text-overlay \
  --background-color ffffff \
  --output-dir ./store-screenshot-generator/output/hanscan-stylized
```

Gradient background with a bold heading from each image's `media.yaml` text:

```sh
./store-screenshot-generator/store-screenshot-generator \
  --project-name hanscan \
  --image-dir ./store-screenshot-generator/hanscan-9-20 \
  --background-image ./store-screenshot-generator/hanscan-9-20/gradient_bkg.png \
  --stylized-frame \
  --stylized-text \
  --crop-status-bar 80 \
  --output-dir ./store-screenshot-generator/output/hanscan-stylized-text
```

Landscape tablet export at 3840×2160, using matching tablet screenshots and background:

```sh
./store-screenshot-generator/store-screenshot-generator \
  --project-name hanscan \
  --device tablet \
  --image-dir "./store-screenshot-generator/hanscan-tablet-9:16" \
  --background-image "./store-screenshot-generator/hanscan-tablet-9:16/gradient_bkg.png" \
  --stylized-frame \
  --stylized-text \
  --output-dir ./store-screenshot-generator/output/hanscan-tablet
```

## Parameters

| Parameter | Purpose |
| --- | --- |
| `--project-name <slug>` | Required project folder slug, such as `hanscan`. |
| `--device <phone\|tablet>` | Output preset, default `phone`. Tablet always exports 3840×2160 landscape with adjusted corners, shadows, and heading scale. |
| `--image-dir <directory>` | Load alternate images with the same filenames as the project's gallery images. Defaults to the project's source folder. |
| `--output-dir <directory>` | Override the output folder. Defaults to this tool's `output/<slug>/`. Created automatically. |
| `--background-color <hex>` | Solid background using six hex digits, optionally prefixed with `#` (quote it in the shell). Omit for transparency. |
| `--background-image <path>` | Local background image, centered and scaled to cover the canvas without distortion. Resolves from the current working directory. Sits above any background color. |
| `--highlight-color <hex>` | Override caption accents using six hex digits, optionally prefixed with `#`. Defaults to authored colors, then studio orange. |
| `--padding <percent>` | Minimum margin around the image or frame, measured against the canvas's short edge. Default `8`; accepts `0` to less than `50`, including decimals. |
| `--no-padding` | Set the minimum margin to zero; overrides `--padding`. |
| `--no-text-overlay` | Remove caption bubbles, including their background, accent, and shadow. |
| `--text-offset <x,y>` | Override every caption's offset in CSS pixels; positive x moves right, positive y moves down. For negative values, use `--text-offset=-20,60`. |
| `--crop-status-bar <pixels>` | Remove this many pixels from the top of every source image before sizing and effects. Non-negative integer, default `0`; must be less than each image's height. |
| `--phone-frame` | Add the silver phone frame with a fixed 9:20 screen; rotates for landscape images. |
| `--stylized-frame` | Give the screenshot rounded corners and a strong drop shadow, with no border. Preserves its natural aspect ratio. Cannot be combined with `--phone-frame`. |
| `--stylized-text` | Replace caption bubbles with large, centered white Inter headings above the screenshot. Uses each image's normal YAML text and scales the screenshot to fit beneath it. |
| `--help` | Show CLI usage. |

## Output details

- Relative input/output directory arguments resolve from your current working directory.
- Images follow the gallery order in `src/content/projects/<slug>/media.yaml`,
  using normal gallery captions rather than homepage preview settings.
- Stylized headings preserve authored line breaks and wrap automatically. Long
  headings shrink to fit; images without captions keep their usual layout.
  `--no-text-overlay` hides bubbles, not stylized headings. Caption offsets,
  side, style, and highlight colors do not affect headings.
- Output filenames retain the source basename with a `.png` extension. Reruns
  overwrite matching files and retain unrelated files.
- Top cropping affects exports only; original image files stay intact. Values
  use pixels in the loaded source image (including alternate `--image-dir` images),
  not output or CSS pixels. Captions are positioned relative to the cropped image.
- With `--device phone` (the default), output is 1440×2560 for portrait/square
  images or 2560×1440 for landscape, using dimensions after any top crop.
  With `--device tablet`, output is always 3840×2160 landscape. Images fit without additional cropping,
  so `--no-padding` can still leave space on two
  sides when aspect ratios differ.
- The phone frame preserves its opening proportions and uses black letterboxing
  when needed. `--no-padding` removes the outer margin, not that letterboxing.
- `--stylized-frame` adds no frame or letterboxing: only the screenshot's own
  rounded edges and shadow. [stylized-frame.svg](stylized-frame.svg) defines
  the corner radius and shadow. Padding measures the screenshot, excluding its
  shadow; small or zero padding may clip the shadow at the output edge.
- Tablet corners are subtler: 3.5% of the screenshot's shorter edge with
  `--stylized-frame`, or 1.5% without it. Shadow size follows that shorter edge.
  Tablet headings reserve up to 20% of the canvas height, leaving more room
  for the screenshot. The legacy `--phone-frame` retains its fixed 9:20 opening.
- A background image fills the entire canvas behind the screenshot and text;
  cover sizing may crop its edges. Transparent parts reveal `--background-color`,
  or remain transparent when that option is omitted.
  Use a 3840×2160 background for tablet output to fill it exactly.
- Use separate `--output-dir` folders for phone and tablet exports to retain both.
- Transparent backgrounds preserve source transparency; they do not remove
  backgrounds already present in source images. In `hanscan.sh`, remove
  `--background-color ffffff` for a transparent canvas.

See [PROJECT-ASSETS.md](../PROJECT-ASSETS.md#store-screenshot-generation) for
caption authoring and store-upload requirements.
