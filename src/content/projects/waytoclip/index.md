---
slug: "waytoclip"
displayName: "WayToClip"
description: "A keyboard-driven clipboard manager for GNOME Shell. Press a shortcut to open history at your cursor, then press 1–9 to paste.\n\nFast, simple, efficient - once you try it, you'll never go back."
projectType: "extension"
supportedPlatforms: ["Linux (GNOME Shell)"]
releaseMaturity: "stable"
visibility: "public"
featuredRank: 3
editorialOrder: 3
availability:
  status: "available"
  message: "Available as a manual-install ZIP for GNOME Shell."
publicationNote: "Submitted to GNOME Extensions; awaiting review."
authoringNotes:
  - "ZIP SHA256: fbc2473c1ab47e3ef6ba7064dfe7e5d71e5db95cd4fccc7b1438176ce7046569"
downloads:
  - label: "Linux (GNOME Shell)"
    platform: "Linux (GNOME Shell)"
    format: "ZIP"
    url: "https://downloads.drjetski.com/releases/waytoclip/v1.0.1/WayToClip-v1.0.1-gnome-shell.zip"
    version: "1.0.1"
    sizeBytes: 214334
    filename: "WayToClip-v1.0.1-gnome-shell.zip"
links:
  - label: "View on GitHub"
    kind: "source"
    url: "https://github.com/AndersKlint/way-to-clip"
---

## Installation

Requires GNOME Shell 46–51. The GNOME Extensions listing is awaiting review.

Install the downloaded ZIP:

```bash
gnome-extensions install WayToClip-v1.0.1-gnome-shell.zip
```

Log out and log back in, then enable the extension:

```bash
gnome-extensions enable waytoclip@andersklint.github.io
```

**No shortcut is set by default.** Open the extension settings and set “Toggle the cursor popup” to a shortcut such as Alt+X.

Inspired by the classic Windows utility [CLCL](https://nakka.com/soft/clcl/index_eng.html), with monitoring logic built upon [Clipboard Indicator](https://github.com/Tudmotu/gnome-shell-extension-clipboard-indicator).
