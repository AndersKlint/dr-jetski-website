import { createReadStream } from 'node:fs';
import {
  HeadObjectCommand,
  PutObjectCommand,
  S3Client,
  S3ServiceException,
} from '@aws-sdk/client-s3';
import type { ReleaseStore } from './releasePublishing.ts';

function downloadContentDisposition(filename: string): string {
  const asciiFilename = filename.replace(/[^a-zA-Z0-9._-]/g, '_');
  const disposition = `attachment; filename="${asciiFilename}"`;
  if (asciiFilename === filename) {
    return disposition;
  }
  const encodedFilename = encodeURIComponent(filename).replace(
    /[!'()*]/g,
    (character) => `%${character.charCodeAt(0).toString(16).toUpperCase()}`,
  );
  return `${disposition}; filename*=UTF-8''${encodedFilename}`;
}

export function createR2ReleaseStore(configuration: {
  accountId: string;
  bucket: string;
  accessKeyId: string;
  secretAccessKey: string;
}): ReleaseStore {
  const client = new S3Client({
    endpoint: `https://${configuration.accountId}.r2.cloudflarestorage.com`,
    region: 'auto',
    credentials: {
      accessKeyId: configuration.accessKeyId,
      secretAccessKey: configuration.secretAccessKey,
    },
    requestChecksumCalculation: 'WHEN_REQUIRED',
  });

  return {
    async inspect(key) {
      try {
        const response = await client.send(new HeadObjectCommand({
          Bucket: configuration.bucket,
          Key: key,
        }));
        const sizeBytes = response.ContentLength;
        const sha256 = response.Metadata?.sha256;
        if (sizeBytes === undefined || !Number.isSafeInteger(sizeBytes) || sizeBytes < 0) {
          throw new Error(`Invalid stored release size for "${key}"`);
        }
        if (sha256 !== undefined && !/^[a-f0-9]{64}$/.test(sha256)) {
          throw new Error(`Invalid stored release SHA-256 metadata for "${key}"`);
        }
        return { sizeBytes, sha256 };
      } catch (error) {
        if (error instanceof S3ServiceException && error.$metadata.httpStatusCode === 404) {
          return null;
        }
        throw error;
      }
    },

    async upload(key, artifact) {
      const stream = createReadStream(artifact.filePath);
      try {
        await client.send(new PutObjectCommand({
          Bucket: configuration.bucket,
          Key: key,
          Body: stream,
          ContentLength: artifact.sizeBytes,
          ContentMD5: artifact.contentMd5,
          Metadata: { sha256: artifact.sha256 },
          ContentType: artifact.contentType,
          ContentDisposition: downloadContentDisposition(artifact.filename),
          CacheControl: 'public,max-age=31536000,immutable',
          StorageClass: 'STANDARD',
          IfNoneMatch: '*',
        }));
        return 'uploaded';
      } catch (error) {
        if (error instanceof S3ServiceException && error.$metadata.httpStatusCode === 412) {
          return 'exists';
        }
        throw error;
      } finally {
        stream.destroy();
      }
    },
  };
}
