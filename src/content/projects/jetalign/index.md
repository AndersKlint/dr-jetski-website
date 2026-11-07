---
slug: "jetalign"
displayName: "JetAlign"
description: "JetAlign is an easy-to-use vocal and instrument aligner. Tighten up layered performances in just a few clicks with a lightweight, native plugin."
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
  - label: "Linux"
    platform: "Linux x86_64"
    format: "CLAP / VST3"
    url: "https://downloads.drjetski.com/releases/jetalign/v0.5.0-beta.2/JetAlign-v0.5.0-beta.2-linux-x86_64.tar.gz"
    version: "0.5.0-beta.2"
    sizeBytes: 4571716
  - label: "Windows"
    platform: "Windows"
  - label: "Mac"
    platform: "Mac"
links: []
---

## Installation

Extract and copy `JetAlign.clap` to `~/.clap/`, or copy the entire `JetAlign.vst3` folder to `~/.vst3/`:

```bash
# Extract
tar -xzf JetAlign-v0.5.0-beta.2-linux-x86_64.tar.gz
cd JetAlign-v0.5.0-beta.2-linux-x86_64

# Install CLAP
mkdir -p ~/.clap
cp JetAlign.clap ~/.clap/

# Install VST3
mkdir -p ~/.vst3
cp -R JetAlign.vst3 ~/.vst3/
```
