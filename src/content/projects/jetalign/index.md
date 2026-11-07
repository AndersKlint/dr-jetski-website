---
slug: "jetalign"
displayName: "JetAlign"
description: "VST3/CLAP plugin that aligns a dub vocal track to a guide track for tight vocal stacks."
projectType: "audio-plugin"
supportedPlatforms: ["Windows", "Linux"]
releaseMaturity: "beta"
visibility: "public"
featuredRank: 2
editorialOrder: 2
availability:
  status: "available"
  message: "The Linux x86_64 beta is downloadable as a combined CLAP/VST3 archive. Windows public downloads are still pending."
authoringNotes:
  - "Download-protection effectiveness and disabled r2.dev remain unverified."
  - "Linux archive SHA256: 11508b5b2df3e382e471a8399c5bd46b33045a3b214e42143e453ce0685f364c"
  - "Owner TODO: supply the Windows public download URLs, beta versions, file sizes, filenames, and install notes."
  - "The plugin may become paid later, but there is no sales flow at launch; do not add purchase UI."
downloads:
  - label: "Windows VST3 (beta)"
    platform: "Windows"
    format: "VST3"
  - label: "Windows CLAP (beta)"
    platform: "Windows"
    format: "CLAP"
  - label: "Linux CLAP + VST3 (beta)"
    platform: "Linux x86_64"
    format: "CLAP + VST3 (.tar.gz)"
    url: "https://downloads.drjetski.com/releases/jetalign/v0.5.0-beta.2/JetAlign-v0.5.0-beta.2-linux-x86_64.tar.gz"
    version: "0.5.0-beta.2"
    sizeBytes: 4571716
    filename: "JetAlign-v0.5.0-beta.2-linux-x86_64.tar.gz"
    installationNotes: "Extract the archive, copy JetAlign.clap to ~/.clap/ and the whole JetAlign.vst3 folder to ~/.vst3/, then rescan plugins or restart your DAW."
links: []
---

JetAlign time-aligns a dub vocal track to a guide track, producing tightly timed vocal stacks and doubles.

Linux support is a key intended differentiator alongside Windows.

- VST3 and CLAP formats.
- Guide-track referenced timing alignment for dub takes.
- Beta builds for Windows and Linux.

Platform availability: The Linux x86_64 beta is available to download as a combined CLAP/VST3 archive. Windows beta builds exist, but their public download links are still pending.

## Linux requirements and installation

The Linux x86_64 beta targets modern Linux distributions (Ubuntu 22.04+ or recent Fedora). It requires system libsndfile, X11 or XWayland, OpenGL, and a DAW that supports Linux CLAP or VST3 plugins.

Download and extract the archive, then copy `JetAlign.clap` to `~/.clap/` and the whole `JetAlign.vst3` folder to `~/.vst3/`. Rescan plugins or restart your DAW. The archive includes a README with installation directions and licenses.
