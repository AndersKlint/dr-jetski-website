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

export interface ResponsiveImage {
  src: string;
  srcSet?: string;
  sizes?: string;
  width: number;
  height: number;
}

export interface ImageGalleryItem {
  kind: 'image';
  image: ResponsiveImage;
  alt: string;
  isPlaceholder?: boolean;
}

export interface PreviewGalleryItem {
  kind: 'preview';
  src: string;
  poster: ResponsiveImage;
  alt: string;
  width: number;
  height: number;
  isPlaceholder?: boolean;
}

export interface DemoGalleryItem {
  kind: 'demo';
  src: string;
  poster: ResponsiveImage;
  alt: string;
  width: number;
  height: number;
  hasAudio: boolean;
  isPlaceholder?: boolean;
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

export type ActionableDownload = ProjectDownload & { url: string };

export function projectHref(slug: string): string {
  return `/projects/${slug}`;
}

export function selectActionableDownloads(project: Project): ActionableDownload[] {
  return project.downloads.filter((download): download is ActionableDownload => download.url !== undefined);
}
