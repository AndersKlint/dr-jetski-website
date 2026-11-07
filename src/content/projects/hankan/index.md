---
slug: "hankan"
displayName: "HanKan - Chinese Reader"
description: "Read Chinese PDFs with a popup dictionary and highlight important details. The dictionary even works with scanned PDFs without selectable text - just scan an area to look up words.\n\nHanKan also works as a document editor. Write or paste Chinese text, then switch to reading mode to use the same popup dictionary."
projectType: "app"
supportedPlatforms: ["Windows", "Linux", "Android"]
releaseMaturity: "beta"
visibility: "public"
featuredRank: 5
editorialOrder: 5
availability:
  status: "available"
  message: "Linux and Windows beta downloads are available. Android on Google Play, macOS, and iOS are coming soon."
authoringNotes:
  - "Linux Flatpak SHA256: c7226b94a2dc1394f91ff7d876e25434f894c60cd35f7806a2cd8e29d732795d"
  - "Windows installer SHA256: 64c235cbbd895d41f3c5edd75b4a2fdf8b18d84182c85841f594ca66ec1c0ecc"
  - "Windows portable SHA256: 37d4c016d1c5724f95dafca719b759844fd57d811b778834ead64e8a9d613c7d"
downloads:
  - label: "Linux (x86_64)"
    platform: "Linux"
    format: "Flatpak"
    url: "https://downloads.drjetski.com/releases/hankan/v0.5.2-beta/HanKan-v0.5.2-beta-linux-x86_64.flatpak"
    version: "0.5.2-beta"
    sizeBytes: 79655752
    filename: "HanKan-v0.5.2-beta-linux-x86_64.flatpak"
  - label: "Windows installer (x86_64)"
    platform: "Windows"
    format: "EXE installer"
    url: "https://downloads.drjetski.com/releases/hankan/v0.5.2-beta/HanKan-v0.5.2-beta-windows-x86_64-setup.exe"
    version: "0.5.2-beta"
    sizeBytes: 76728664
    filename: "HanKan-v0.5.2-beta-windows-x86_64-setup.exe"
  - label: "Windows portable (x86_64)"
    platform: "Windows"
    format: "Portable ZIP"
    url: "https://downloads.drjetski.com/releases/hankan/v0.5.2-beta/HanKan-v0.5.2-beta-windows-x86_64-portable.zip"
    version: "0.5.2-beta"
    sizeBytes: 82317665
    filename: "HanKan-v0.5.2-beta-windows-x86_64-portable.zip"
  - label: "Android — Google Play"
    platform: "Android"
  - label: "macOS"
    platform: "macOS"
  - label: "iOS"
    platform: "iOS"
links:
  - label: "View on GitHub"
    kind: "source"
    url: "https://github.com/AndersKlint/hankan_chinese_reader"
---

## Installation

### Linux

With Flatpak installed, run this command from the download folder:

```bash
flatpak install --user ./HanKan-v0.5.2-beta-linux-x86_64.flatpak
```

Launch the app:

```bash
flatpak run com.andersklint.hankan_chinese_reader
```

### Windows installer

Run `HanKan-v0.5.2-beta-windows-x86_64-setup.exe` and follow the installer prompts.

### Windows portable

Extract the entire ZIP to a folder, then run `hankan_chinese_reader.exe`. Keep the extracted files together; no installer is required.
