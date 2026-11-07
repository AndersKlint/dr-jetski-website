export interface ReleaseArtifact {
  projectSlug: string;
  version: string;
  filename: string;
  filePath: string;
  sizeBytes: number;
  sha256: string;
  contentMd5: string;
  contentType: string;
}

export interface StoredRelease {
  sizeBytes: number;
  sha256?: string;
}

export interface ReleaseStore {
  inspect(key: string): Promise<StoredRelease | null>;
  upload(key: string, artifact: ReleaseArtifact): Promise<'uploaded' | 'exists'>;
}

export interface ReleasePublishResult {
  artifact: ReleaseArtifact;
  key: string;
  url: string;
  status: 'uploaded' | 'skipped' | 'would-upload';
}

export function assertReleaseProjectSlug(projectSlug: string): void {
  if (/^[a-z0-9]+(?:-[a-z0-9]+)*$/.exec(projectSlug)?.[0] !== projectSlug) {
    throw new Error(`Invalid project slug ${JSON.stringify(projectSlug)}; use lowercase kebab-case.`);
  }
}

export function assertReleasePathSegment(value: string, label: string): void {
  if (/^[A-Za-z0-9](?:[A-Za-z0-9 ._()+-]*[A-Za-z0-9_()+-])?$/.exec(value)?.[0] !== value) {
    throw new Error(`Unsafe release ${label}: ${JSON.stringify(value)}.`);
  }
}

function assertStoredReleaseMatches(key: string, artifact: ReleaseArtifact, stored: StoredRelease): void {
  if (!stored.sha256) {
    throw new Error(`Release ${key} has no SHA-256 metadata; manually verify the existing object before proceeding. ETags are not used as content hashes.`);
  }
  if (stored.sizeBytes !== artifact.sizeBytes || stored.sha256 !== artifact.sha256) {
    throw new Error(`Release conflict at ${key}: existing content differs. Publish changed bytes under a new version; existing releases are never overwritten.`);
  }
}

function encodePathSegment(value: string): string {
  return encodeURIComponent(value).replace(/[!'()*]/g, (character) => `%${character.charCodeAt(0).toString(16).toUpperCase()}`);
}

export async function publishReleases(
  artifacts: readonly ReleaseArtifact[],
  dependencies: { store: ReleaseStore; publicBaseUrl: string },
  options: { isDryRun: boolean },
): Promise<ReleasePublishResult[]> {
  const publicBaseUrl = new URL(dependencies.publicBaseUrl);
  if (publicBaseUrl.protocol !== 'https:' || publicBaseUrl.username || publicBaseUrl.password || publicBaseUrl.search || publicBaseUrl.hash) {
    throw new Error('The public release base URL must be HTTPS without credentials, a query, or a fragment.');
  }
  const keys = new Set<string>();
  const releases = artifacts.map((artifact) => {
    assertReleaseProjectSlug(artifact.projectSlug);
    assertReleasePathSegment(artifact.version, 'version');
    assertReleasePathSegment(artifact.filename, 'filename');
    if (!Number.isSafeInteger(artifact.sizeBytes) || artifact.sizeBytes <= 0 || artifact.sizeBytes > 5 * 1024 ** 3 || artifact.sha256.length !== 64 || !/^[a-f0-9]{64}$/.test(artifact.sha256)) {
      throw new Error(`Invalid release size or SHA-256 for ${artifact.filename}.`);
    }
    const segments = ['releases', artifact.projectSlug, artifact.version, artifact.filename];
    const key = segments.join('/');
    if (keys.has(key)) {
      throw new Error(`Duplicate release key: ${key}.`);
    }
    keys.add(key);
    const url = `${publicBaseUrl.href.replace(/\/+$/, '')}/${segments.map(encodePathSegment).join('/')}`;
    return { artifact, key, url };
  });

  const preflight: Array<StoredRelease | null> = [];
  for (const { artifact, key } of releases) {
    const stored = await dependencies.store.inspect(key);
    if (stored !== null) {
      assertStoredReleaseMatches(key, artifact, stored);
    }
    preflight.push(stored);
  }

  const results: ReleasePublishResult[] = [];
  for (const [index, release] of releases.entries()) {
    if (preflight[index] !== null) {
      results.push({ ...release, status: 'skipped' });
      continue;
    }
    if (options.isDryRun) {
      results.push({ ...release, status: 'would-upload' });
      continue;
    }
    const outcome = await dependencies.store.upload(release.key, release.artifact);
    const stored = await dependencies.store.inspect(release.key);
    if (stored === null) {
      throw new Error(`Release ${release.key} is missing after upload; verify the remote object manually.`);
    }
    assertStoredReleaseMatches(release.key, release.artifact, stored);
    results.push({ ...release, status: outcome === 'uploaded' ? 'uploaded' : 'skipped' });
  }
  return results;
}
