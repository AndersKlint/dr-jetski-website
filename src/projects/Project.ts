export type ProjectType = 'app' | 'audio-plugin' | 'cli' | 'package' | 'extension' | 'utility';

export type ReleaseMaturity = 'stable' | 'alpha' | 'beta' | 'mvp' | 'prototype';

export type ProjectVisibility = 'public' | 'draft';

export type AvailabilityStatus = 'available' | 'pending' | 'unavailable';

export type LinkKind = 'source' | 'store' | 'registry' | 'demo' | 'website';

export type GalleryKind = 'image' | 'preview' | 'demo';

export interface ProjectAvailability {
  status: AvailabilityStatus;
  message: string;
}

export interface ProjectDownload {
  label: string;
  platform: string;
  format: string;
  url?: string;
  version?: string;
  sizeBytes?: number;
  filename?: string;
  installationNotes?: string;
}

export interface ProjectLink {
  label: string;
  kind: LinkKind;
  url: string;
}

export interface ImageGalleryItem {
  kind: 'image';
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface PreviewGalleryItem {
  kind: 'preview';
  src: string;
  poster: string;
  alt: string;
  width: number;
  height: number;
}

export interface DemoGalleryItem {
  kind: 'demo';
  src: string;
  poster: string;
  alt: string;
  width: number;
  height: number;
  hasAudio: boolean;
}

export type GalleryItem = ImageGalleryItem | PreviewGalleryItem | DemoGalleryItem;

export interface Project {
  slug: string;
  displayName: string;
  description: string;
  projectType: ProjectType;
  supportedPlatforms: string[];
  releaseMaturity: ReleaseMaturity;
  visibility: ProjectVisibility;
  featuredRank?: number;
  editorialOrder: number;
  availability: ProjectAvailability;
  publicationNote?: string;
  authoringNotes: string[];
  downloads: ProjectDownload[];
  links: ProjectLink[];
  gallery: GalleryItem[];
  href: string;
  body: string;
}

export function projectHref(slug: string): string {
  return `/projects/${slug}`;
}

export function selectActionableDownloads(project: Project): ProjectDownload[] {
  return project.downloads.filter((download) => download.url !== undefined);
}
