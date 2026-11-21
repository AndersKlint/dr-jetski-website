# WayToCook Privacy Policy

Draft updated: 20 November 2026.

**Unpublished internal-testing draft.** The advertising section applies only to Android internal builds with AdMob testing enabled. It does not describe live ads or a public release.

## Who is responsible

WayToCook is provided by **Anders Klint Consulting AB** under the studio name **Dr. Jetski Studios**. Anders Klint Consulting AB is the controller responsible for the personal data processing described in this policy.

For privacy questions or requests, contact [contact@drjetski.com](mailto:contact@drjetski.com). For app support, contact [support@drjetski.com](mailto:support@drjetski.com).

This policy covers the WayToCook Android app and its hosted recipe-generation and subscription services, including AdMob where enabled for internal testing.

## Your recipe book and scanned images

Saved recipes, collections, edits, cooking progress, and preferences are stored on your device. We do not provide recipe-book synchronization or upload your saved recipe book to our servers.

Camera images, imported images, and PDF pages used for recipe recognition are processed on your device. The app does not upload those images or pages for OCR. When you request AI generation, the reviewed recipe text is sent online as described below.

Backups and exports you create are saved to the destination you choose. Android or your device provider may also back up local app data according to your device settings. These copies are separate from any WayToCook server storage. WayToCook recipe backups exclude online credentials and generation balances.

## Information used for online generation

When you request generation or regeneration, we send your reviewed recipe text, specific instructions, and selected instruction detail through our backend to OpenAI to generate a cooking flow. Remove personal or medical details before submitting.

The backend assigns an anonymous identity and stores a hash of its authentication credential. It records generation usage, allowance periods, request identifiers, status, timestamps, and estimated provider spending to provide the service, prevent duplicate charging, and limit abuse. An anonymous identifier is not the same as having no personal data: these records may relate to an identifiable user.

Our backend sees your IP address and uses connection information for delivery, security, and rate limiting. It does not forward your IP address, device metadata, or WayToCook credentials to OpenAI as part of the API request. Our application logs record operational status and timing, not recipe text, generated recipes, authentication credentials, or purchase tokens.

## Google Play subscriptions

Google Play handles subscription checkout and payment details. We do not receive your full payment-card information or payer email through the subscription-verification API.

The app sends Play-signed purchase information to our backend. We retain purchase tokens and linked-token relationships, product and plan information, subscription status, billing dates, order identifiers, and acknowledgement state to verify purchases, restore paid access, and maintain the shared subscription allowance. We use Google Cloud Pub/Sub to receive subscription lifecycle notifications.

Restoring a purchase reconnects paid access and its remaining allowance. It does not restore your previous anonymous identity, generation history, or local recipe book.

## Rewarded ads in Android internal builds

In builds with ads enabled, we use Google's AdMob SDK to show test rewarded ads only when you choose **Watch ad & generate**. There are no ads on startup or resume, in your recipe book, or while cooking. WayToCook does not use ad mediation or a separate analytics SDK and does not independently collect advertising identifiers or app analytics. Google may process data through its advertising and consent SDKs even when the ads shown are test ads.

Google's [Android SDK data disclosure](https://developers.google.com/admob/android/privacy/play-data-disclosure) describes data the SDK may collect and share for advertising, analytics, and fraud prevention: IP address (which may indicate approximate location), app interactions such as launches, taps, and video views, performance and diagnostic information, and device or account identifiers such as the Android advertising ID, app set ID, and applicable signed-in account identifiers. Processing may vary with your settings and choices. See [how Google uses information from apps that use its services](https://policies.google.com/technologies/partner-sites).

WayToCook sends AdMob an opaque code for the individual generation attempt so we can match a reward to that attempt. We do not send recipe text, custom instructions, images, saved recipes, or generated results to AdMob. Our backend processes reward event metadata, such as the event identifier and time, and records reward outcomes or ad-unavailability reasons to verify rewards, prevent duplicate use, and manage generation and retries. These records do not include recipe content.

## Service providers and international processing

We use:

- **Hetzner** to host the backend and database in **Nuremberg, Germany**.
- **OpenAI** to process recipe text and instructions through its Global API.
- **Google Play and Google Cloud** for purchases, verification, and subscription notifications.
- **Google AdMob and User Messaging Platform** for test rewarded ads and regional privacy choices in ads-enabled internal builds.

Opening our website or legal pages may also involve its hosting provider, Cloudflare. Website hosting is separate from the app's generation API.

OpenAI and Google may process information outside your country, including outside the EEA and UK. The WayToCook backend and database are in Germany, but we do not restrict OpenAI processing to Europe.

OpenAI [does not use API content for training by default](https://developers.openai.com/api/docs/guides/your-data). Its default abuse-monitoring logs may retain submitted text and responses for up to 30 days, or longer in limited cases. For more on provider processing, see [Hetzner's Privacy Policy](https://www.hetzner.com/legal/privacy-policy/), [OpenAI's Data Processing Addendum](https://openai.com/policies/data-processing-addendum/), and the [Google Cloud Data Processing Addendum](https://cloud.google.com/terms/data-processing-addendum).

Outside the AdMob processing described above, we do not sell personal information.

## Why we process information

Where EEA or UK data-protection law applies, we rely on:

- Performance of our contract with you for requested generation, subscription verification, allowance management, and restoration.
- Our legitimate interests in operating and securing the service, preventing abuse, and resolving support requests.
- Compliance with applicable legal obligations for records we are required to retain.
- Your consent for advertising processing where required. Advertising privacy choices are separate from accepting the app's terms.

Merely publishing this policy does not constitute consent to unrelated processing.

## How long information is kept

- **Local recipe-book data:** until you remove it or clear the app's data. Copies in your exports or device backups follow the retention of their storage provider.
- **Temporary generation content on our backend:** queued source content is removed from the database when work starts or ends without starting. It remains in working memory while needed for generation. A completed result, including its associated source text, is available for ten minutes after completion; scheduled cleanup removes expired content from the active content table.
- **Content-free identity, usage, and billing records:** these records do not currently expire automatically. We retain them to maintain anonymous access and allowance history, prevent duplicate allowance grants, reconcile subscriptions and restorations, investigate abuse, and meet applicable legal obligations. Reward outcomes and ad-unavailability reasons are usage records. Deletion requests are reviewed manually; records may need to remain where necessary for an ongoing subscription, a legal obligation, or the establishment or defence of legal claims.
- **Operational logs:** logs are kept in size-limited rotating files and replaced as new records are written. Their duration varies with service activity rather than a fixed number of days.
- **Support correspondence:** kept as needed to respond and handle follow-up. Contact us to request deletion, subject to applicable obligations and email-provider limitations.
- **Server backups:** Hetzner takes daily whole-server backups for recovery. A backup can capture database records and temporary generation content that was on disk at the time. Deleting data from the active server does not remove it from existing backups; those copies age out as backups rotate.

Provider-held data follows the applicable provider arrangements described above, not the ten-minute result window.

## Your choices and rights

You can use saved recipes without online generation or a subscription. You can remove local recipes in the app and manage device backups through your platform settings. Uninstalling the app does not cancel a Google Play subscription or automatically delete backend billing and usage records.

In ads-enabled internal builds, Google's User Messaging Platform may offer consent choices based on your region. Where available, go to **Settings → Plan & usage → Ad privacy options** to revisit those choices or withdraw consent. Declining personalized ads may still allow non-personalized ads. You can also manage your advertising ID in Android settings.

Depending on applicable law, you may have rights to access, correct, delete, restrict, object to, or obtain a portable copy of personal information, and to complain to your local data-protection authority. Contact [contact@drjetski.com](mailto:contact@drjetski.com) to make a request.

We may need proportionate information to locate your anonymous or purchase-related records and verify your request. Without that connection, we may not be able to identify which records concern you. Do not send passwords, authentication credentials, purchase tokens, or private keys by email. Records subject to a valid legal retention requirement may be retained with their use restricted as appropriate.

## Email and external links

If you contact us, your email provider and ours process your address, message, and anything you choose to attach. Avoid including sensitive information unless you intend to share it. External links open services such as Google Play or third-party websites, whose policies govern information they receive.

## Changes

We will update this policy when our practices change and provide additional notice where required by law. The published policy will state its effective date.
