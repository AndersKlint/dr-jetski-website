# HanScan Privacy Policy

Last updated: 2026-10-28

HanScan - Offline Chinese OCR is provided by Anders Klint Consulting AB under the studio name Dr. Jetski Studios. Anders Klint Consulting AB is responsible for the personal data processing described in this policy. For privacy questions or requests, contact **contact@drjetski.com**.

## Images, text, and offline processing

HanScan recognizes Chinese text from your camera, selected images, and screenshots on your device. OCR, dictionary lookups, and downloaded-model translation run locally. HanScan does not upload your images, screenshots, or recognized text to the studio, Sentry, or Google for processing.

Camera access is used for captures you request. Image selection uses your device's image picker. Screen capture requires Android's screen-capture permission and a foreground service while active; it is used to obtain the screenshot you request, not to continuously record your activity.

## Translation downloads and Google diagnostics

Chinese-to-English translation uses Google ML Kit on-device translation. You can choose to download its translation models; downloading requires a network connection. Once the required models are installed, translation works offline.

Google ML Kit automatically collects certain device and app information, device/app/install identifiers, performance and usage metrics, and translation source and target languages. Google infrastructure, including Firebase components, may process diagnostic information associated with the SDK and model delivery. These SDK communications are separate from HanScan's optional Sentry reporting: turning off Sentry does not turn off Google SDK diagnostics. Translation input text and images are not sent to Google for translation.

See [ML Kit data collection disclosures](https://developers.google.com/ml-kit/terms) and [Google's Privacy Policy](https://policies.google.com/privacy) for Google's handling of information. Network services may receive connection metadata, including your IP address.

## Optional error reporting

Sentry error reporting is **disabled by default**. You can enable or disable it in Settings. When enabled in release builds, HanScan sends sanitized application error reports to help diagnose faults. These include app version and build information, error type, known technical error codes, sanitized code stack traces, device manufacturer/model and CPU architecture, operating-system name/version/build, runtime names/versions/compiler information, and technical report metadata such as timestamps and whether an error was handled.

Application reports exclude original error messages, local file paths, images and image attachments, recognized text, breadcrumbs, user information, device names, and persistent device or installation identifiers. Native crash collection, automatic session tracking, and performance tracing are disabled. Sentry's network infrastructure may still receive your IP address and other connection metadata; removing user fields from reports does not prevent that network-level processing.

Disabling reporting stops future application reports. It does not automatically delete reports already received by Sentry. Reports are subject to the Sentry project's configured retention and deletion settings; this policy does not promise a fixed retention period. Contact us to request information or deletion. Because reports do not include an account or user identity, we may be unable to locate a particular report. See [Sentry's Privacy Policy](https://sentry.io/privacy/).

## Local storage and deletion

Preferences, including the error-reporting choice, are stored locally. Camera captures and screenshots use temporary app storage. Pending screenshot recovery files may be retained across app restarts so a result can be recovered. Clearing the active result removes associated temporary files through the app's cleanup paths, but interruptions or crashes can leave files behind until app storage is cleared or the operating system removes them. Original gallery images are not deleted by HanScan.

You can clear app data through Android settings to remove local app preferences and app-managed files. Uninstalling normally removes app-private storage. Downloaded models are managed by the translation SDK and operating system. Android backup and device-transfer settings may back up or restore eligible app data, including preferences, unless excluded by the app's backup configuration; local storage is not a guarantee that data cannot be included in an operating-system backup.

## Email and external links

Contact, bug-report, and feature-request actions open your chosen email application. Sending a message is your choice. Your email provider and our email provider process the address, message, and anything you choose to attach. Avoid including sensitive images or text unless you intend to share them. Support correspondence is kept as needed to respond and handle follow-up; contact us to request deletion, subject to any applicable obligations and provider limitations.

External links open services such as Google Play or third-party websites. Their privacy policies govern information they receive when you use them.

## Accounts, advertising, and audience

HanScan has no user accounts or advertising platform, does not sell personal information, and is free with no ads. It is a general-purpose tool for travel, reading, and learning, and is not directed at children.

## Changes and contact

We may update this policy when the app or its services change. The date above identifies the latest revision. For general questions, questions about your data, or a privacy request, email **contact@drjetski.com**. For app support, email **support@drjetski.com**.
