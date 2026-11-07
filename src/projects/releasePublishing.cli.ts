import { fileURLToPath } from 'node:url';

type Options = {
  projectSlug?: string;
  isDryRun: boolean;
  isHelp: boolean;
};

class CliError extends Error {}

const help = `Usage: npm run releases:upload -- --project <kebab-slug> [--dry-run]
       npm run releases:upload -- --help

Options:
  --project <kebab-slug>  Required project folder slug.
  --dry-run              Inspect authenticated R2 object metadata without uploading.
  --help, -h             Show this help without credentials or cloud operations.

Archives are discovered in src/content/projects/<project>/releases/<version>/
relative to this repository, not the current working directory.
An empty releases tree needs no credentials and performs no cloud operations.

Configure the root .env or environment with R2_ACCOUNT_ID (32 hexadecimal
characters), R2_ACCESS_KEY_ID, and R2_SECRET_ACCESS_KEY. R2_BUCKET defaults to
dr-jetski-downloads. Dry runs also require valid credentials for authenticated HEAD
requests. No AWS CLI or default credentials provider is used.

Public URLs use https://downloads.drjetski.com. Dry-run URLs are prospective and
not verified. Verify public delivery before publishing any suggested metadata.
This command never fetches public files, edits index.md, deletes, or prunes objects.
`;

function parseOptions(args: readonly string[]): Options {
  const options: Options = { isDryRun: false, isHelp: false };

  for (let index = 0; index < args.length; index += 1) {
    const argument = args[index];

    if (argument === '--project') {
      if (options.projectSlug !== undefined) {
        throw new CliError('Duplicate --project option.');
      }
      const projectSlug = args[index + 1];
      if (!projectSlug || projectSlug.startsWith('-')) {
        throw new CliError('--project requires a kebab-case project slug.');
      }
      if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(projectSlug)) {
        throw new CliError('--project must be a lowercase kebab-case slug.');
      }
      options.projectSlug = projectSlug;
      index += 1;
    } else if (argument === '--dry-run') {
      if (options.isDryRun) {
        throw new CliError('Duplicate --dry-run option.');
      }
      options.isDryRun = true;
    } else if (argument === '--help' || argument === '-h') {
      if (options.isHelp) {
        throw new CliError('Duplicate --help/-h option.');
      }
      options.isHelp = true;
    } else {
      throw new CliError('Unknown option or unexpected positional argument. Use --help for usage.');
    }
  }

  if (!options.isHelp && options.projectSlug === undefined) {
    throw new CliError('Required option missing: --project <kebab-slug>.');
  }

  return options;
}

function requiredEnvironmentVariable(name: string): string {
  const value = process.env[name];
  if (!value?.trim()) {
    throw new CliError(`${name} must be configured with a nonblank value.`);
  }
  return value;
}

function readConfiguration() {
  const accountId = requiredEnvironmentVariable('R2_ACCOUNT_ID');
  if (!/^[a-fA-F0-9]{32}$/.test(accountId)) {
    throw new CliError('R2_ACCOUNT_ID must contain exactly 32 hexadecimal characters.');
  }
  const bucket = process.env.R2_BUCKET ?? 'dr-jetski-downloads';
  if (!bucket.trim()) {
    throw new CliError('R2_BUCKET must be nonblank when configured.');
  }

  return {
    accountId,
    bucket,
    accessKeyId: requiredEnvironmentVariable('R2_ACCESS_KEY_ID'),
    secretAccessKey: requiredEnvironmentVariable('R2_SECRET_ACCESS_KEY'),
  };
}

async function main(): Promise<void> {
  const options = parseOptions(process.argv.slice(2));
  if (options.isHelp) {
    console.log(help);
    return;
  }
  const projectSlug = options.projectSlug;
  if (projectSlug === undefined) {
    throw new CliError('Required option missing: --project <kebab-slug>.');
  }

  const projectsDirectory = fileURLToPath(new URL('../content/projects/', import.meta.url));
  const { discoverLocalReleases } = await import('./localReleaseSource.ts');
  const artifacts = await discoverLocalReleases(projectsDirectory, projectSlug);
  if (artifacts.length === 0) {
    console.log(`No release artifacts found for ${projectSlug}; no cloud operations performed.`);
    return;
  }

  const configuration = readConfiguration();
  const { createR2ReleaseStore } = await import('./r2ReleaseStore.ts');
  const { publishReleases } = await import('./releasePublishing.ts');
  const store = createR2ReleaseStore(configuration);
  const results = await publishReleases(
    artifacts,
    { store, publicBaseUrl: 'https://downloads.drjetski.com' },
    { isDryRun: options.isDryRun },
  );

  for (const result of results) {
    console.log(`${result.status} ${JSON.stringify(result.key)}`);
    console.log(options.isDryRun
      ? 'Prospective URL, not verified; metadata suggestion only:'
      : 'Verify public delivery before publishing this metadata suggestion:');
    console.log(`  url: ${JSON.stringify(result.url)}`);
    console.log(`  version: ${JSON.stringify(result.artifact.version)}`);
    console.log(`  filename: ${JSON.stringify(result.artifact.filename)}`);
    console.log(`  sizeBytes: ${result.artifact.sizeBytes}`);
    console.log(`SHA-256: ${result.artifact.sha256}`);
  }
}

main().catch((error: unknown) => {
  let message = error instanceof Error
    ? error.message
    : 'Release discovery or publishing failed. Check local artifacts, R2 access, and existing object integrity.';
  const secrets = [process.env.R2_ACCESS_KEY_ID, process.env.R2_SECRET_ACCESS_KEY]
    .filter((value): value is string => value !== undefined && value.length > 0)
    .sort((left, right) => right.length - left.length);
  if (secrets.length > 0) {
    const pattern = secrets.map((value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|');
    message = message.replace(new RegExp(pattern, 'g'), '[REDACTED]');
  }
  console.error(message);
  if (!(error instanceof CliError)) {
    console.error('No project metadata was changed.');
  }
  process.exitCode = 1;
});
