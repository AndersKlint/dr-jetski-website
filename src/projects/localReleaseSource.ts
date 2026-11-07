import { createHash } from 'node:crypto';
import { constants } from 'node:fs';
import { lstat, open, readdir } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import type { BigIntStats } from 'node:fs';
import { assertReleasePathSegment, assertReleaseProjectSlug } from './releasePublishing.ts';
import type { ReleaseArtifact } from './releasePublishing.ts';

const maximumReleaseBytes = 5 * 1024 ** 3;
const releaseContentTypes: ReadonlyArray<readonly [string, string]> = [
  ['.tar.gz', 'application/gzip'],
  ['.tgz', 'application/gzip'],
  ['.tar.xz', 'application/x-xz'],
  ['.tar.bz2', 'application/x-bzip2'],
  ['.tar.zst', 'application/zstd'],
  ['.zip', 'application/zip'],
  ['.7z', 'application/x-7z-compressed'],
  ['.exe', 'application/octet-stream'],
  ['.msi', 'application/octet-stream'],
  ['.dmg', 'application/octet-stream'],
  ['.pkg', 'application/octet-stream'],
  ['.deb', 'application/octet-stream'],
  ['.rpm', 'application/octet-stream'],
  ['.appimage', 'application/octet-stream'],
  ['.apk', 'application/vnd.android.package-archive'],
  ['.aab', 'application/octet-stream'],
];

function hasStableMetadata(before: BigIntStats, after: BigIntStats): boolean {
  return before.dev === after.dev && before.ino === after.ino && before.size === after.size
    && before.mtimeNs === after.mtimeNs && before.ctimeNs === after.ctimeNs;
}

async function assertRegularDirectory(directory: string): Promise<void> {
  const metadata = await lstat(directory);
  if (!metadata.isDirectory()) {
    throw new Error(`Release discovery requires a regular directory, not a symlink or special entry: ${directory}.`);
  }
}

async function hashRelease(filePath: string): Promise<Pick<ReleaseArtifact, 'sizeBytes' | 'sha256' | 'contentMd5'>> {
  const initial = await lstat(filePath, { bigint: true });
  if (!initial.isFile()) {
    throw new Error(`Release artifacts must be regular files, not symlinks, directories, or special entries: ${filePath}.`);
  }
  const file = await open(filePath, constants.O_RDONLY | constants.O_NOFOLLOW | constants.O_NONBLOCK);
  try {
    const before = await file.stat({ bigint: true });
    if (!before.isFile() || !hasStableMetadata(initial, before)) {
      throw new Error(`Release artifact changed before hashing: ${filePath}.`);
    }
    if (before.size <= 0n || before.size > BigInt(maximumReleaseBytes)) {
      throw new Error(`Release artifact must be nonempty and no larger than the 5 GiB single-upload limit: ${filePath}.`);
    }
    const sha256 = createHash('sha256');
    const md5 = createHash('md5');
    let sizeBytes = 0;
    for await (const chunk of file.createReadStream({ autoClose: false })) {
      sizeBytes += chunk.length;
      if (sizeBytes > maximumReleaseBytes) {
        throw new Error(`Release artifact exceeded the 5 GiB single-upload limit while hashing: ${filePath}.`);
      }
      sha256.update(chunk);
      md5.update(chunk);
    }
    const after = await file.stat({ bigint: true });
    const current = await lstat(filePath, { bigint: true });
    if (!current.isFile() || !hasStableMetadata(before, after) || !hasStableMetadata(before, current) || BigInt(sizeBytes) !== before.size) {
      throw new Error(`Release artifact changed while hashing; retry with a stable file: ${filePath}.`);
    }
    return { sizeBytes, sha256: sha256.digest('hex'), contentMd5: md5.digest('base64') };
  } finally {
    await file.close();
  }
}

export async function discoverLocalReleases(projectsDirectory: string, projectSlug: string): Promise<ReleaseArtifact[]> {
  assertReleaseProjectSlug(projectSlug);
  const projectsPath = resolve(projectsDirectory);
  await assertRegularDirectory(projectsPath);
  const projectDirectory = join(projectsPath, projectSlug);
  await assertRegularDirectory(projectDirectory);
  const indexPath = join(projectDirectory, 'index.md');
  if (!(await lstat(indexPath)).isFile()) {
    throw new Error(`Project requires a regular index.md, not a symlink or special entry: ${indexPath}.`);
  }
  const releasesDirectory = join(projectDirectory, 'releases');
  try {
    await assertRegularDirectory(releasesDirectory);
  } catch (error) {
    if (error instanceof Error && 'code' in error && error.code === 'ENOENT') {
      return [];
    }
    throw error;
  }

  const artifacts: ReleaseArtifact[] = [];
  for (const version of (await readdir(releasesDirectory)).sort()) {
    assertReleasePathSegment(version, 'version');
    const versionDirectory = join(releasesDirectory, version);
    await assertRegularDirectory(versionDirectory);
    for (const filename of (await readdir(versionDirectory)).sort()) {
      assertReleasePathSegment(filename, 'filename');
      const contentType = releaseContentTypes.find(([suffix]) => filename.toLowerCase().endsWith(suffix))?.[1];
      if (!contentType) {
        throw new Error(`Unsupported release artifact ${join(versionDirectory, filename)}; only installer and archive files belong in releases.`);
      }
      const filePath = join(versionDirectory, filename);
      artifacts.push({ projectSlug, version, filename, filePath, contentType, ...await hashRelease(filePath) });
    }
  }
  return artifacts;
}
