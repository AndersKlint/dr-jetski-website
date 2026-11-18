# WayToCook Privacy Policy

Draft updated: 18 November 2026.

**Internal-testing draft — planned backups are not yet confirmed active. The DeepSeek data-processing and international-transfer review remains open before public release; internal testing does not remove applicable data-protection obligations.**

## Who is responsible

WayToCook is provided by **Anders Klint Consulting AB** under the studio name **Dr. Jetski Studios**. Anders Klint Consulting AB is the controller responsible for the personal data processing described in this policy.

For privacy questions or requests, contact [contact@drjetski.com](mailto:contact@drjetski.com). For app support, contact [support@drjetski.com](mailto:support@drjetski.com).

This policy covers the WayToCook Android app and its hosted recipe-generation and subscription services.

## Your recipe book and scanned images

Saved recipes, collections, edits, cooking progress, and preferences are stored on your device. We do not provide recipe-book synchronization or upload your saved recipe book to our servers.

Camera images, imported images, and PDF pages used for recipe recognition are processed on your device. The app does not upload those images or pages for OCR. When you request AI generation, the reviewed recipe text is sent online as described below.

Backups and exports you create are saved to the destination you choose. Android or your device provider may also back up local app data according to your device settings. These copies are separate from any WayToCook server storage. WayToCook recipe backups exclude online credentials and generation balances.

## Information used for online generation

When you request generation or regeneration, we send your reviewed recipe text, specific instructions, and selected instruction detail through our backend to DeepSeek to generate a cooking flow. Do not include information you do not want processed online, including sensitive personal information about yourself or others.

The backend assigns an anonymous identity and stores a hash of its authentication credential. It records generation usage, allowance periods, request identifiers, status, timestamps, and estimated provider spending to provide the service, prevent duplicate charging, and limit abuse. An anonymous identifier is not the same as having no personal data: these records may relate to an identifiable user.

Online connections also expose technical information such as your IP address to the services handling the connection. We use connection information for delivery, security, and rate limiting. Our application logs record operational status and timing, not recipe text, generated recipes, authentication credentials, or purchase tokens.

## Google Play subscriptions

Google Play handles subscription checkout and payment details. We do not receive your full payment-card information or payer email through the subscription-verification API.

The app sends Play-signed purchase information to our backend. We retain purchase tokens and linked-token relationships, product and plan information, subscription status, billing dates, order identifiers, and acknowledgement state to verify purchases, restore paid access, and maintain the shared subscription allowance. We use Google Cloud Pub/Sub to receive subscription lifecycle notifications.

Restoring a purchase reconnects paid access and its remaining allowance. It does not restore your previous anonymous identity, generation history, or local recipe book.

## Service providers and international processing

We use:

- **Vultr** to host the backend and database in **Miami, Florida, United States**.
- **DeepSeek** to process submitted recipe text and instructions and return generated results.
- **Google Play and Google Cloud** for purchases, verification, and subscription notifications.

Opening our website or legal pages may also involve its hosting provider, Cloudflare. Website hosting is separate from the app's generation API.

These services may process information outside your country, including outside the EEA or UK. Our backend is in the United States; DeepSeek processing may involve China. Google services may process information in multiple countries. Miami hosting does not restrict all providers to that location.

DeepSeek's [Terms of Use](https://cdn.deepseek.com/policies/en-US/deepseek-terms-of-use.html), section 4.3, permit limited use of inputs and outputs to provide, maintain, operate, develop, or improve its services or underlying technologies, subject to the encryption and de-identification conditions stated there. We use a standard API account and have not established an API-specific no-training or zero-retention arrangement.

DeepSeek's [API documentation](https://api-docs.deepseek.com/guides/kv_cache) describes on-disk caching enabled by default. It says unused cache is usually cleared within hours to days; this is not a deletion deadline for all provider-held content or records. Our backend's ten-minute retrieval window does not limit DeepSeek's retention. DeepSeek's [Privacy Policy](https://cdn.deepseek.com/policies/en-US/deepseek-privacy-policy.html) also explains that downstream app developers must provide their own privacy disclosures; it is not a processor agreement for WayToCook.

For the providers' published information, see [Vultr's Privacy Notice](https://www.vultr.com/legal/privacy/), [Google's Privacy Policy](https://policies.google.com/privacy), and the [Google Cloud Data Processing Addendum](https://cloud.google.com/terms/data-processing-addendum). Provider retention and international processing follow the applicable service arrangements, not our result-retrieval window.

[DEFERRED UNTIL BEFORE PUBLIC RELEASE: establish the applicable data-processing agreements and international-transfer safeguards for EEA/UK personal data, especially for the standard DeepSeek API account. Public statements that a provider offers SCCs or participates in the Data Privacy Framework do not establish coverage of every transfer. No API-specific DeepSeek transfer arrangement has been verified for this draft.]

We do not sell personal information. This version of WayToCook contains no advertising or third-party analytics SDK.

## Why we process information

Where EEA or UK data-protection law applies, we rely on:

- Performance of our contract with you for requested generation, subscription verification, allowance management, and restoration.
- Our legitimate interests in operating and securing the service, preventing abuse, and resolving support requests.
- Compliance with applicable legal obligations for records we are required to retain.

Merely publishing this policy does not constitute consent to unrelated processing.

## How long information is kept

- **Local recipe-book data:** until you remove it or clear the app's data. Copies in your exports or device backups follow the retention of their storage provider.
- **Temporary generation content on our backend:** queued source content is removed from the database when work starts or ends without starting. It remains in working memory while needed for generation. A completed result, including its associated source text, is available for ten minutes after completion; scheduled cleanup removes expired content from the active content table.
- **Content-free identity, usage, and billing records:** these records do not currently expire automatically. We retain them to maintain anonymous access and allowance history, prevent duplicate allowance grants, reconcile subscriptions and restorations, investigate abuse, and meet applicable legal obligations. Deletion requests are reviewed manually; records may need to remain where necessary for an ongoing subscription, a legal obligation, or the establishment or defence of legal claims.
- **Operational logs:** logs are kept in size-limited rotating files and replaced as new records are written. Their duration varies with service activity rather than a fixed number of days.
- **Support correspondence:** kept as needed to respond and handle follow-up. Contact us to request deletion, subject to applicable obligations and email-provider limitations.
- **Database backups and recovery copies:** daily encrypted database backups to the operator's development machine in Sweden, retained for 30 days, are planned but not yet confirmed active. They are intended to exclude temporary generation input and result content. Vultr automatic backups and snapshots are not enabled. Deleting active rows does not instantly remove historical copies or database recovery records; once backups are enabled, deleted records may remain in those copies until the 30-day rotation removes them. [CONFIRM BEFORE PUBLICATION: backup activation, temporary-content exclusion, and enforcement of the 30-day rotation.]

Provider-held data follows the applicable provider arrangements described above, not the ten-minute result window.

## Your choices and rights

You can use saved recipes without online generation or a subscription. You can remove local recipes in the app and manage device backups through your platform settings. Uninstalling the app does not cancel a Google Play subscription or automatically delete backend billing and usage records.

Depending on applicable law, you may have rights to access, correct, delete, restrict, object to, or obtain a portable copy of personal information, and to complain to your local data-protection authority. Contact [contact@drjetski.com](mailto:contact@drjetski.com) to make a request.

We may need proportionate information to locate your anonymous or purchase-related records and verify your request. Without that connection, we may not be able to identify which records concern you. Do not send passwords, authentication credentials, purchase tokens, or private keys by email. Records subject to a valid legal retention requirement may be retained with their use restricted as appropriate.

## Email and external links

If you contact us, your email provider and ours process your address, message, and anything you choose to attach. Avoid including sensitive information unless you intend to share it. External links open services such as Google Play or third-party websites, whose policies govern information they receive.

## Changes

We will update this policy when our practices change and provide additional notice where required by law. The published policy will state its effective date.
