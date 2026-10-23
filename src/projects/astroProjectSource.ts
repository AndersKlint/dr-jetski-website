import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';
import { getImage } from 'astro:assets';
import type { ImageMetadata } from 'astro';
import { projectHref, type GalleryItem, type Project, type ResponsiveImage } from './Project';
import { ProjectCatalogService } from './ProjectCatalogService';
import { mediaSourceBasename, parseMediaPresentation, type AuthoredMediaItem, type ProjectMediaPresentation } from './mediaPresentation';

const RESPONSIVE_WIDTHS = [640, 960, 1280, 1600, 2000];
const RESPONSIVE_SIZES = '(min-width: 72rem) 70vw, 100vw';
const SCREENSHOT_QUALITY = 92;
const THUMBNAIL_WIDTHS = [160, 320];
const THUMBNAIL_SIZES = '(min-width: 64rem) 10rem, (min-width: 40rem) 8rem, 6rem';
const POSTER_ASPECT_RATIO_TOLERANCE = 0.02;

const LOCAL_VIDEO_SOURCES = import.meta.glob('/src/content/projects/**/*.{mp4,webm,mov,m4v,ogv}', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>;

const MEDIA_PRESENTATION_SOURCES = import.meta.glob('/src/content/projects/*/media.yaml', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>;

const LOCAL_IMAGES = import.meta.glob<ImageMetadata>('/src/content/projects/*/*.{avif,gif,jpeg,jpg,png,svg,tiff,webp}', {
  eager: true,
  import: 'default',
});
type ProjectEntry = CollectionEntry<'projects'>;

function canonicalSlugFromFile(entry: ProjectEntry): string | null {
  const filePath = entry.filePath;
  if (typeof filePath !== 'string') {
    return null;
  }
  const segments = filePath.split('/');
  const fileName = segments[segments.length - 1];
  if (fileName !== 'index.md' || segments.length < 2) {
    return null;
  }
  return segments[segments.length - 2] ?? null;
}

async function toResponsiveImage(
  image: ImageMetadata,
  widths: number[] = RESPONSIVE_WIDTHS,
  sizes: string = RESPONSIVE_SIZES,
  quality?: number,
): Promise<ResponsiveImage> {
  if (image.format === 'svg') {
    return { src: image.src, width: image.width, height: image.height };
  }
  const fittedWidths = widths.filter((width) => width <= image.width);
  const baseWidth = fittedWidths.at(-1) ?? image.width;
  const result =
    fittedWidths.length > 0
      ? await getImage({
          src: image,
          width: baseWidth,
          widths: fittedWidths,
          sizes,
          format: 'webp',
          quality,
        })
      : await getImage({ src: image, width: baseWidth, format: 'webp', quality });
  return {
    src: result.src,
    srcSet: fittedWidths.length > 0 ? result.srcSet.attribute : undefined,
    sizes: fittedWidths.length > 0 ? sizes : undefined,
    width: Number(result.attributes.width),
    height: Number(result.attributes.height),
  };
}

function toScreenshot(image: ImageMetadata): Promise<ResponsiveImage> {
  const widths = [...RESPONSIVE_WIDTHS.filter((width) => width < image.width), image.width];
  return toResponsiveImage(image, widths, RESPONSIVE_SIZES, SCREENSHOT_QUALITY);
}

function toThumbnail(image: ImageMetadata): Promise<ResponsiveImage> {
  return toResponsiveImage(image, THUMBNAIL_WIDTHS, THUMBNAIL_SIZES);
}

function projectDirectoryFromFile(entry: ProjectEntry): string {
  const filePath = entry.filePath;
  if (typeof filePath !== 'string') {
    throw new Error(`Project "${entry.data.slug}" has no content file path`);
  }
  const normalized = filePath.replaceAll('\\', '/');
  const directory = normalized.slice(0, normalized.lastIndexOf('/'));
  if (!directory.startsWith('src/content/projects/')) {
    throw new Error(`Project "${entry.data.slug}" is not inside src/content/projects`);
  }
  return directory;
}

function mediaPresentationForProject(entry: ProjectEntry): ProjectMediaPresentation {
  const directory = projectDirectoryFromFile(entry);
  const presentationPath = `/${directory}/media.yaml`;
  const raw = MEDIA_PRESENTATION_SOURCES[presentationPath];
  if (raw === undefined) {
    return { mediaBySource: new Map(), gallery: [] };
  }
  return parseMediaPresentation(raw, presentationPath);
}

function resolveImage(source: string, entry: ProjectEntry): ImageMetadata {
  const path = `/${projectDirectoryFromFile(entry)}/${source}`;
  const image = LOCAL_IMAGES[path];
  if (image === undefined) {
    throw new Error(`Project "${entry.data.slug}" references missing or unsupported image "${source}" at ${path}`);
  }
  return image;
}

function resolveVideoSource(source: string, entry: ProjectEntry): string {
  if (/^https:\/\//i.test(source)) {
    return source;
  }
  const directory = projectDirectoryFromFile(entry);
  const assetPath = `/${directory}/${source}`;
  const assetUrl = LOCAL_VIDEO_SOURCES[assetPath];
  if (assetUrl === undefined) {
    throw new Error(
      `Project "${entry.data.slug}" references local video "${source}", but no supported video exists at ${assetPath}`,
    );
  }
  return assetUrl;
}

function assertPosterAspectRatio(item: AuthoredMediaItem, poster: ImageMetadata, slug: string, index: number): void {
  if (item.kind === 'image') {
    return;
  }
  const videoRatio = item.width / item.height;
  const posterRatio = poster.width / poster.height;
  if (Math.abs(videoRatio - posterRatio) / videoRatio > POSTER_ASPECT_RATIO_TOLERANCE) {
    throw new Error(
      `Project "${slug}" gallery item ${index}: poster aspect ratio ${posterRatio.toFixed(3)} must match the video aspect ratio ${videoRatio.toFixed(3)}`,
    );
  }
}

async function toGalleryItem(
  item: AuthoredMediaItem,
  entry: ProjectEntry,
  index: number,
): Promise<GalleryItem> {
  const presentation = { featureOverlay: item.featureOverlay, homepageCrop: item.homepageCrop };
  if (item.kind === 'image') {
    const image = resolveImage(item.media, entry);
    return {
      kind: 'image',
      image: await toScreenshot(image),
      thumbnail: await toThumbnail(image),
      alt: item.alt,
      isPlaceholder: item.isPlaceholder,
      ...presentation,
    };
  }
  const posterImage = resolveImage(item.poster, entry);
  assertPosterAspectRatio(item, posterImage, entry.data.slug, index);
  const poster = await toResponsiveImage(posterImage);
  const thumbnail = await toThumbnail(posterImage);
  const src = resolveVideoSource(item.media, entry);
  if (item.kind === 'preview') {
    return {
      kind: 'preview',
      src,
      poster,
      thumbnail,
      alt: item.alt,
      width: item.width,
      height: item.height,
      isPlaceholder: item.isPlaceholder,
      ...presentation,
    };
  }
  return {
    kind: 'demo',
    src,
    poster,
    thumbnail,
    alt: item.alt,
    width: item.width,
    height: item.height,
    hasAudio: item.hasAudio,
    isPlaceholder: item.isPlaceholder,
    ...presentation,
  };
}

async function toProject(entry: ProjectEntry): Promise<Project> {
  const fileSlug = canonicalSlugFromFile(entry);
  if (fileSlug !== null && fileSlug !== entry.data.slug) {
    throw new Error(`Project slug "${entry.data.slug}" does not match its folder name "${fileSlug}"`);
  }
  const { gallery: authoredGallery, preview } = mediaPresentationForProject(entry);
  const previewIndex = preview === undefined ? 0 : authoredGallery.findIndex(
    (item) => mediaSourceBasename(item.media) === preview.mediaSource,
  );
  if (previewIndex === -1) {
    throw new Error(`/${projectDirectoryFromFile(entry)}/media.yaml: preview: No gallery item matches "${preview?.mediaSource}"`);
  }
  const gallery = await Promise.all(
    authoredGallery.map((item, index) => toGalleryItem(item, entry, index)),
  );
  const homepagePreview = preview === undefined ? gallery[0] : {
    ...gallery[previewIndex]!,
    featureOverlay: preview.featureOverlay,
    homepageCrop: preview.homepageCrop,
  };
  return {
    slug: entry.data.slug,
    displayName: entry.data.displayName,
    description: entry.data.description,
    projectType: entry.data.projectType,
    supportedPlatforms: entry.data.supportedPlatforms,
    releaseMaturity: entry.data.releaseMaturity,
    visibility: entry.data.visibility,
    featuredRank: entry.data.featuredRank,
    editorialOrder: entry.data.editorialOrder,
    availability: entry.data.availability,
    publicationNote: entry.data.publicationNote,
    authoringNotes: entry.data.authoringNotes,
    downloads: entry.data.downloads,
    links: entry.data.links,
    gallery,
    homepagePreview,
    href: projectHref(entry.data.slug),
    body: entry.body ?? '',
  };
}

export async function loadProjectRecords(): Promise<Project[]> {
  const entries = await getCollection('projects');
  return Promise.all(entries.map(toProject));
}

export interface ProjectDetailSource {
  project: Project;
  entry: ProjectEntry;
  privacyEntry?: CollectionEntry<'projectPolicies'>;
}

export async function loadPublicProjectDetails(): Promise<ProjectDetailSource[]> {
  const entries = await getCollection('projects');
  const bySlug = new Map(entries.map((entry) => [entry.data.slug, entry]));
  const policies = await getCollection('projectPolicies');
  const policyBySlug = new Map(policies.map((entry) => [entry.id, entry]));
  for (const policy of policies) {
    if (!bySlug.has(policy.id)) {
      throw new Error(`Privacy policy "${policy.id}" has no matching project`);
    }
    if (!policy.body?.trim()) {
      throw new Error(`Privacy policy "${policy.id}" must not be empty`);
    }
  }
  const projects = await Promise.all(entries.map(toProject));
  const catalog = new ProjectCatalogService(projects);
  return catalog.publicProjects().map((project) => ({
    project,
    entry: bySlug.get(project.slug) as ProjectEntry,
    privacyEntry: policyBySlug.get(project.slug),
  }));
}
