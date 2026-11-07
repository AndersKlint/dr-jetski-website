---
slug: "clipthat"
displayName: "ClipThat!"
description: "Paste a video link, choose a time range and download just the part you want. Queue multiple clips and save them to your chosen folder."
projectType: "app"
supportedPlatforms: ["Linux", "Windows"]
releaseMaturity: "beta"
visibility: "public"
featuredRank: 6
editorialOrder: 9
availability:
  status: "available"
  message: "Linux and Windows beta downloads are available."
authoringNotes:
  - "Linux Flatpak SHA256: 1432133c336740224d9d882fb9464dfb731a4bdcf6f5364f64749f67ed06fb34"
  - "Windows installer SHA256: 5ae3187ed1dfb3aacffd4e910e6094b04259037dd9d7a1cae51efa32a0d63f85"
  - "Windows portable SHA256: adb24b39c07ad1f0046a0e82ff2e642b8ff3f05443408284b954a72c80bb01b9"
downloads:
  - label: "Linux (x86_64)"
    platform: "Linux"
    format: "Flatpak"
    url: "https://downloads.drjetski.com/releases/clipthat/v0.6.3-beta/ClipThat-v0.6.3-beta-linux-x86_64.flatpak"
    version: "0.6.3-beta"
    sizeBytes: 175599104
    filename: "ClipThat-v0.6.3-beta-linux-x86_64.flatpak"
  - label: "Windows installer (x86_64)"
    platform: "Windows"
    format: "EXE installer"
    url: "https://downloads.drjetski.com/releases/clipthat/v0.6.3-beta/ClipThat-v0.6.3-beta-windows-x86_64-setup.exe"
    version: "0.6.3-beta"
    sizeBytes: 155173025
    filename: "ClipThat-v0.6.3-beta-windows-x86_64-setup.exe"
  - label: "Windows portable (x86_64)"
    platform: "Windows"
    format: "Portable ZIP"
    url: "https://downloads.drjetski.com/releases/clipthat/v0.6.3-beta/ClipThat-v0.6.3-beta-windows-x86_64-portable.zip"
    version: "0.6.3-beta"
    sizeBytes: 210590397
    filename: "ClipThat-v0.6.3-beta-windows-x86_64-portable.zip"
links:
  - label: "View on GitHub"
    kind: "source"
    url: "https://github.com/AndersKlint/clipthat"
---

## Installation

### Linux

With Flatpak installed, run this command from the download folder:

```bash
flatpak install --user ./ClipThat-v0.6.3-beta-linux-x86_64.flatpak
```

Launch the app:

```bash
flatpak run com.drjetski.clipthat
```

### Windows

If needed, install the [Microsoft Visual C++ x64 runtime](https://aka.ms/vs/17/release/vc_redist.x64.exe). It is required by both Windows downloads.

#### Installer

Run `ClipThat-v0.6.3-beta-windows-x86_64-setup.exe` and follow the installer prompts.

#### Portable

Extract the entire ZIP to a folder, then run `yt_section_downloader.exe` inside the extracted `ClipThat` folder. Keep the extracted files together; no installer is required.
