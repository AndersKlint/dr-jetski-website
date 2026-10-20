---
slug: "hanscan"
displayName: "HanScan"
description: "Offline Chinese text recognition for phone photos, with overlay results and dictionary lookup."
projectType: "app"
supportedPlatforms: ["Android"]
releaseMaturity: "stable"
visibility: "public"
featuredRank: 1
editorialOrder: 1
availability:
  status: "pending"
  message: "Finished app with an Android APK ready. The public download link is still pending; there is no Play Store release yet."
authoringNotes:
  - "Owner TODO: supply the public APK URL, version, file size, filename, and install notes."
  - "Only OCR is established as offline (PaddleOCR v6); do not claim English translation works offline."
  - "Possible future iOS support is unconfirmed, so supportedPlatforms lists Android only."
downloads:
  - label: "Android APK"
    platform: "Android"
    format: "APK"
links: []
gallery:
  - kind: "preview"
    src: "./hanscan-demo.mp4"
    poster: "./hanscan-demo-poster.webp"
    alt: "Short silent clip of HanScan recognizing a Chinese workbook exercise, then showing pinyin and English translation overlays."
    width: 1440
    height: 2560
  - kind: "image"
    src: "./slope.png"
    alt: "HanScan translating a Chinese road sign in English mode, with the recognized text shown over a steep-slope warning sign."
  - kind: "image"
    src: "./workbook_popup.png"
    alt: "HanScan dictionary popup on the Chinese word 准时 (zhǔnshí), showing its reading and English definitions over a workbook exercise."
  - kind: "image"
    src: "./workbook_pinyin.png"
    alt: "HanScan pinyin mode overlaying readings on a Chinese workbook matching exercise, with a pinyin transcript below."
  - kind: "image"
    src: "./workbook_stack_translate.png"
    alt: "HanScan English mode translating a Chinese workbook matching exercise, with translated labels over the text and a transcript below."
---

HanScan recognizes Chinese text in photos taken with the camera or picked from the gallery, and overlays the results at their positions in the image.

It is intended for Chinese learners reading textbooks and for travelers reading signs or menus.

- Offline recognition with PaddleOCR v6.
- Result overlay at the recognized image positions.
- Modes for original hanzi, tap-to-open dictionary, pinyin, and English translation.
- Camera and gallery input.

Platform availability: Android only. A finished APK exists but its public download link is still pending; there is no Play Store release yet.
