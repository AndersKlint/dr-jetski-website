# Logo assets

| Version | Intended use | SVG |
| --- | --- | --- |
| Full logo | Homepage banner and larger presentations; also scales to the phone banner | [Flat main](dr-jetski-studios-logo.svg) |
| Compact wordmark | Headers and smaller placements, 192px wide or more; prefer 240px+ for the Studios signature | [Warm compact](dr-jetski-studios-logo-compact.svg) |
| DRJ icon | Favicons, avatars, and square placements | [Warm icon](dr-jetski-studios-icon.svg) |

The full logo is the main editing source of truth. Its design direction is recorded in [DESIGN.md](../DESIGN.md). The 1600 × 540 SVG reuses the original custom bold letter paths and bold italic Studios signature. All lettering is self-contained vector artwork, with no font dependency. The original forward-leaning transform is retained; the main lettering has a single 16-unit dark outline painted beneath its solid fill.

| Main SVG color | Value |
| --- | --- |
| Dr. amber-orange | `#d69c4d` |
| Jetski pale gold | `#e5ce91` |
| Dark outlines | `#201d19` |
| Water body | `#3f768b` |
| Water currents and spray | `#6f9fac` |
| Foam and Studios | `#f0e5ca` |

The main SVG has named Inkscape layers for rear lettering (`tski`), water, foreground lettering (`Dr. Je`), and Studios. Within the water layer, the wake, streams, foam, t splash, and spray have separate identifiers. Letter interiors and the background remain transparent. These groups support later water animation while retaining a complete static mark.

The compact wordmark uses the earlier warm arcade artwork with custom J/e foreground shapes, a tighter 3.2:1 frame, and a Studios signature enlarged by 25%. It is sized at 320 × 100 and scales to 240 × 75 or 192 × 60. It has not yet been adapted to the flat main.

The 512 × 512 DRJ icon uses the earlier warm arcade lettering in a square composition, a simplified wave, and a shaded J in front of the water. Its editable layers retain the copper, gold, blue, and ivory palette. Both derivatives are self-contained SVGs; adaptations to the main artwork need explicit updates.

The earlier warm arcade suite is preserved in [alternative_arcade](alternative_arcade): [full logo](alternative_arcade/dr-jetski-studios-logo.svg), [compact wordmark](alternative_arcade/dr-jetski-studios-logo-compact.svg), and [icon](alternative_arcade/dr-jetski-studios-icon.svg).

The full colorful suite is archived untouched in [alternative_colorful](alternative_colorful): [full logo](alternative_colorful/dr-jetski-studios-logo.svg), [compact wordmark](alternative_colorful/dr-jetski-studios-logo-compact.svg), [icon](alternative_colorful/dr-jetski-studios-icon.svg), and [source PNG](alternative_colorful/dr-jetski-studios-logo.png).

The earlier minimal lettering study is preserved in [super_minimal](super_minimal).

Use SVG for sharp rendering at any display density. The active SVGs have transparent backgrounds and are suitable for vector use.

For placements narrower than the compact wordmark's minimum size, use the DRJ icon rather than shrinking the full name further.

## Preview renderer

[tools/render-logo.mjs](tools/render-logo.mjs) renders the main SVG on the site's charcoal background at 1600px and 768px wide. It resolves the SVG relative to the script, so it can be launched from any working directory. It requires Node.js 20+ and Google Chrome; set `CHROME_PATH` to use another Chromium executable. [tools/requirements.txt](tools/requirements.txt) contains the npm dependency specification.

From the repository root:

```sh
xargs npm install --no-save --package-lock=false --prefix logo/tools < logo/tools/requirements.txt
node logo/tools/render-logo.mjs
```

Previews are saved in `logo/tools/previews/`. Pass an output directory as the first argument to save them elsewhere.

## Favicon and social metadata

The favicon is the DRJ icon SVG (the root warm icon). PNG/ICO, apple-touch, and studio social-image fallbacks were removed: Apple touch icons and social-image clients do not support SVG, so no raster fallback is supplied for the studio mark. Descriptive metadata remains, and supplied project image metadata is unaffected.
