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
  - "Owner TODO: replace the concept placeholder gallery entry with a real screenshot or preview when supplied."
downloads:
  - label: "Android APK"
    platform: "Android"
    format: "APK"
links: []
gallery:
  - kind: "image"
    src: "/images/placeholders/hanscan.svg"
    alt: "Illustrative placeholder: concept mockup of HanScan overlaying recognition results on a phone photo, not a real screenshot."
    width: 1200
    height: 800
    isPlaceholder: true
---

HanScan recognizes Chinese text in photos taken with the camera or picked from the gallery, and overlays the results at their positions in the image.

It is intended for Chinese learners reading textbooks and for travelers reading signs or menus.

- Offline recognition with PaddleOCR v6.
- Result overlay at the recognized image positions.
- Modes for original hanzi, tap-to-open dictionary, pinyin, and English translation.
- Camera and gallery input.

Platform availability: Android only. A finished APK exists but its public download link is still pending; there is no Play Store release yet.
