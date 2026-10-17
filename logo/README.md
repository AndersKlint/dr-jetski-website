# Logo assets

| Version | Intended use | SVG |
| --- | --- | --- |
| Full vector logo | Editing master and larger presentations | [Vector master](dr-jetski-studios-logo-vector.svg) |
| Compact wordmark | Headers and smaller placements, 192px wide or more; prefer 240px+ for the Studios signature | [Text-only compact](dr-jetski-studios-logo-compact.svg) |
| Rider icon | Favicons, avatars, and square placements | [Emblem-only icon](dr-jetski-studios-icon.svg) |
| Balanced rider icon | Alternative square composition with contained exhaust and wake | [Centered alternative](dr-jetski-studios-icon-alt.svg) |

The 4000 × 2668 vector master is the editing source of truth. Its design direction and two-color palette are recorded in [DESIGN.md](../DESIGN.md). The master and its derivatives contain only vector shapes, with transparent backgrounds and no font dependencies or embedded images. The originally supplied [full-logo reference](dr-jetski-studios-logo.svg) is preserved separately and remains the homepage banner asset.

The master has six named Inkscape layers: frame, jet exhaust, rider, wake and spray, Dr. Jetski lettering, and Studios. Major shapes and individual letters have stable identifiers for editing.

The 320 × 64 compact wordmark contains the master's two lettering layers, preserving their shapes, colors, spacing, and proportions. It scales to 240 × 48 or 192 × 38.4 without distortion. The emblem is omitted and the canvas is cropped around the lettering.

The 512 × 512 rider icon contains the master's frame, jet exhaust, rider, and wake layers, preserving their shapes and proportions. The lettering is omitted and the complete emblem is centered on a square canvas with transparent padding.

The compact wordmark and original rider icon are self-contained copies of the corresponding master layers. After editing the master, update those layers in the derivatives explicitly.

The 512 × 512 alternative icon retains the rider inside a closed, symmetrical rounded-square frame. Its shortened exhaust and simplified wake stay inside the frame, with the interior artwork centered independently of the border. It retains the two-color palette and four named editable layers.

The earlier warm arcade suite is preserved in [alternative_arcade](alternative_arcade): [full logo](alternative_arcade/dr-jetski-studios-logo.svg), [compact wordmark](alternative_arcade/dr-jetski-studios-logo-compact.svg), and [icon](alternative_arcade/dr-jetski-studios-icon.svg). The compact wordmark replaced during the vector update is preserved byte-for-byte as [dr-jetski-studios-logo-compact_old.svg](alternative_arcade/dr-jetski-studios-logo-compact_old.svg).

The full colorful suite is archived untouched in [alternative_colorful](alternative_colorful): [full logo](alternative_colorful/dr-jetski-studios-logo.svg), [compact wordmark](alternative_colorful/dr-jetski-studios-logo-compact.svg), [icon](alternative_colorful/dr-jetski-studios-icon.svg), and [source PNG](alternative_colorful/dr-jetski-studios-logo.png).

The earlier minimal lettering study is preserved in [super_minimal](super_minimal).

The vector master and its derivatives scale sharply at any display density and have transparent backgrounds.

For placements narrower than the compact wordmark's minimum size, use the rider icon.

## Preview renderer

[tools/render-logo.mjs](tools/render-logo.mjs) renders the full vector master on the site's charcoal background at 1600px and 768px wide. It resolves the SVG relative to the script, so it can be launched from any working directory. It requires Node.js 20+ and Google Chrome; set `CHROME_PATH` to use another Chromium executable. [tools/requirements.txt](tools/requirements.txt) contains the npm dependency specification.

From the repository root:

```sh
xargs npm install --no-save --package-lock=false --prefix logo/tools < logo/tools/requirements.txt
node logo/tools/render-logo.mjs
```

Previews are saved in `logo/tools/previews/`. Pass an output directory as the first argument to save them elsewhere.

## Favicon and social metadata

The favicon uses the root rider icon SVG. PNG/ICO, apple-touch, and studio social-image fallbacks were removed: Apple touch icons and social-image clients do not support SVG, so no raster fallback is supplied for the studio mark. Descriptive metadata remains, and supplied project image metadata is unaffected.
