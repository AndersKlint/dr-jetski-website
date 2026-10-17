import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';
import { getImage } from 'astro:assets';
import type { ImageMetadata } from 'astro';
import { projectHref, type GalleryItem, type Project, type ResponsiveImage } from './Project';
import { ProjectCatalogService } from './ProjectCatalogService';

const RESPONSIVE_WIDTHS = [480, 800, 1200, 1600];
const RESPONSIVE_SIZES = '(min-width: 60rem) 50vw, (min-width: 40rem) 70vw, 100vw';
const POSTER_ASPECT_RATIO_TOLERANCE = 0.02;

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

async function toResponsiveImage(image: ImageMetadata): Promise<ResponsiveImage> {
  if (image.format === 'svg') {
    return { src: image.src, width: image.width, height: image.height };
  }
  const widths = RESPONSIVE_WIDTHS.filter((width) => width <= image.width);
  const baseWidth = widths.at(-1) ?? image.width;
  const result =
    widths.length > 0
      ? await getImage({ src: image, width: baseWidth, widths, sizes: RESPONSIVE_SIZES })
      : await getImage({ src: image, width: baseWidth });
  return {
    src: result.src,
    srcSet: widths.length > 0 ? result.srcSet.attribute : undefined,
    sizes: widths.length > 0 ? RESPONSIVE_SIZES : undefined,
    width: Number(result.attributes.width),
    height: Number(result.attributes.height),
  };
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

async function toGalleryItem(item: AuthoredGalleryItem, slug: string, index: number): Promise<GalleryItem> {
  if (item.kind === 'image') {
    return {
      kind: 'image',
      image: await toResponsiveImage(item.src),
      alt: item.alt,
      isPlaceholder: item.isPlaceholder,
    };
  }
  assertPosterAspectRatio(item, slug, index);
  const poster = await toResponsiveImage(item.poster);
  if (item.kind === 'preview') {
    return {
      kind: 'preview',
      src: item.src,
      poster,
      alt: item.alt,
      width: item.width,
      height: item.height,
      isPlaceholder: item.isPlaceholder,
    };
  }
  return {
    kind: 'demo',
    src: item.src,
    poster,
    alt: item.alt,
    width: item.width,
    height: item.height,
    hasAudio: item.hasAudio,
    isPlaceholder: item.isPlaceholder,
  };
}

async function toProject(entry: ProjectEntry): Promise<Project> {
  const fileSlug = canonicalSlugFromFile(entry);
  if (fileSlug !== null && fileSlug !== entry.data.slug) {
    throw new Error(`Project slug "${entry.data.slug}" does not match its folder name "${fileSlug}"`);
  }
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
    gallery: await Promise.all(
      entry.data.gallery.map((item, index) => toGalleryItem(item, entry.data.slug, index)),
    ),
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
