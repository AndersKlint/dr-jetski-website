# Public downloads through Cloudflare R2

## Local releases

Place installers/archives in the project's ignored release folders:

```text
src/content/projects/<slug>/releases/<version>/<filename>
→ R2: releases/<slug>/<version>/<filename>
→ https://downloads.drjetski.com/releases/<slug>/<version>/<filename>
```

Release files stay outside Git and the static build. Keep private files out of
the public bucket. See [PROJECT-ASSETS.md](PROJECT-ASSETS.md) for project authoring.

## One-time setup

Run `npm ci` at the repository root. Copy `.env.example` to `.env` **only if
`.env` does not already exist**, then edit it locally:

- `R2_ACCOUNT_ID`: the 32-hex account ID from the R2 overview.
- `R2_ACCESS_KEY_ID` and `R2_SECRET_ACCESS_KEY`: S3 credentials with **Object
  Read & Write**, scoped only to `dr-jetski-downloads`.
- Optional `R2_BUCKET`: defaults to `dr-jetski-downloads`.

The uploader loads ignored `.env`; existing environment values take precedence.
Never commit or share secrets; revoke/rotate exposed credentials. [API token setup](https://developers.cloudflare.com/r2/api/tokens/).

## Upload one project

```sh
make upload PROJECT=jetalign DRY_RUN=1
make upload PROJECT=jetalign
```

`PROJECT` is required; there is no default or all-project upload. `DRY_RUN=1`
performs authenticated HEAD reads only and requires credentials. Review the plan
before uploading. Empty/`0` uploads; other `DRY_RUN` values fail before npm runs.

Matching remote SHA-256 metadata **and size** skips an object. Conflicts, missing
SHA-256 metadata, and API errors stop the command; only missing objects upload.
Versioned keys are immutable: publish changed bytes under a new version.
The uploader never overwrites, deletes, syncs, edits content metadata/availability,
or deploys. Removing local files leaves remote objects intact. Manually remove
only obsolete, unlinked versions; retain the current and last known-good release.

## Verify before publishing

API access does not prove public delivery. Custom-domain activation, HTTPS,
public bytes, and protection still require verification; keep URLs absent and
availability pending until verified. Download the printed public URL and compare
its size and SHA-256 with the local artifact (`sha256sum`); do not use an ETag as
a hash. Check attachment/type/cache headers and no `Content-Encoding: gzip`.
Only then manually add verified download metadata and availability in `index.md`.
JetAlign's prepared Linux CLAP/VST3 release does not establish Windows availability.
Follow the [Git workflow](README.md#workflow) and [Sender gate](README.md#jetalign-updates-form).

## Cloudflare guardrails

- Verify Standard bucket `dr-jetski-downloads`, custom domain
  `downloads.drjetski.com`, and disabled `r2.dev` to prevent a protection bypass.
- Retain the `/releases/` path rule: **5 requests per 10 seconds per IP**, **Block
  for 10 seconds**. Keep `/media/` separate; space verification retries beyond
  10 seconds. Per-IP limiting reduces bursts, not total spending.
- Retain a low billing alert; it is **not a spending cap**. Count media and binaries.

Canonical references: [public buckets](https://developers.cloudflare.com/r2/buckets/public-buckets/),
[rate limiting](https://developers.cloudflare.com/waf/rate-limiting-rules/),
[budget alerts](https://developers.cloudflare.com/billing/manage/budget-alerts/),
[R2 pricing](https://developers.cloudflare.com/r2/pricing/).
