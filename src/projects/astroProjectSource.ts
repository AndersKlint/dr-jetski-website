import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';
import { getImage } from 'astro:assets';
import type { ImageMetadata } from 'astro';
import { projectHref, type GalleryItem, type Project, type ResponsiveImage } from './Project';
import { ProjectCatalogService } from './ProjectCatalogService';
import { mediaSourceBasename, parseMediaPresentation, type MediaPresentation, type ProjectMediaPresentation } from './mediaPresentation';

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
// SVG component metadata omits fsPath; glob keys preserve original names for every image format.
const IMAGE_SOURCE_PATHS = new Map(Object.entries(LOCAL_IMAGES).map(([path, image]) => [image.src, path]));

type ProjectEntry = CollectionEntry<'projects'>;
type AuthoredGalleryItem = ProjectEntry['data']['gallery'][number];

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
    return { mediaBySource: new Map() };
  }
  return parseMediaPresentation(raw, presentationPath);
}

function galleryItemSourceBasename(item: AuthoredGalleryItem): string | null {
  const source = item.kind === 'image' ? IMAGE_SOURCE_PATHS.get(item.src.src) : item.src;
  if (source === undefined) {
    throw new Error('No original asset path for gallery image');
  }
  return mediaSourceBasename(source);
}

function resolveVideoSource(source: string, entry: ProjectEntry): string {
  if (!source.startsWith('./')) {
    return source;
  }
  const directory = projectDirectoryFromFile(entry);
  const assetPath = `/${directory}/${source.slice(2)}`;
  const assetUrl = LOCAL_VIDEO_SOURCES[assetPath];
  if (assetUrl === undefined) {
    throw new Error(
      `Project "${entry.data.slug}" references local video "${source}", but no supported video exists at ${assetPath}`,
    );
  }
  return assetUrl;
}

function assertPosterAspectRatio(item: AuthoredGalleryItem, slug: string, index: number): void {
  if (item.kind === 'image') {
    return;
  }
  const videoRatio = item.width / item.height;
  const posterRatio = item.poster.width / item.poster.height;
  if (Math.abs(videoRatio - posterRatio) / videoRatio > POSTER_ASPECT_RATIO_TOLERANCE) {
    throw new Error(
      `Project "${slug}" gallery item ${index}: poster aspect ratio ${posterRatio.toFixed(3)} must match the video aspect ratio ${videoRatio.toFixed(3)}`,
    );
  }
}

async function toGalleryItem(
  item: AuthoredGalleryItem,
  entry: ProjectEntry,
  index: number,
  presentationBySource: ReadonlyMap<string, MediaPresentation>,
): Promise<GalleryItem> {
  const basename = galleryItemSourceBasename(item);
  const presentation = basename === null ? undefined : presentationBySource.get(basename);
  if (item.kind === 'image') {
    return {
      kind: 'image',
      image: await toScreenshot(item.src),
      thumbnail: await toThumbnail(item.src),
      alt: item.alt,
      isPlaceholder: item.isPlaceholder,
      ...presentation,
    };
  }
  assertPosterAspectRatio(item, entry.data.slug, index);
  const poster = await toResponsiveImage(item.poster);
  const thumbnail = await toThumbnail(item.poster);
  const src = resolveVideoSource(item.src, entry);
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
  const { mediaBySource, preview } = mediaPresentationForProject(entry);
  const previewIndex = preview === undefined ? 0 : entry.data.gallery.findIndex(
    (item) => galleryItemSourceBasename(item) === preview.mediaSource,
  );
  if (previewIndex === -1) {
    throw new Error(`/${projectDirectoryFromFile(entry)}/media.yaml: preview: No gallery item matches "${preview?.mediaSource}"`);
  }
  const gallery = await Promise.all(
    entry.data.gallery.map((item, index) => toGalleryItem(item, entry, index, mediaBySource)),
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
}

export async function loadPublicProjectDetails(): Promise<ProjectDetailSource[]> {
  const entries = await getCollection('projects');
  const bySlug = new Map(entries.map((entry) => [entry.data.slug, entry]));
  const projects = await Promise.all(entries.map(toProject));
  const catalog = new ProjectCatalogService(projects);
  return catalog.publicProjects().map((project) => ({
    project,
    entry: bySlug.get(project.slug) as ProjectEntry,
  }));
}
