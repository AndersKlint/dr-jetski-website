import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';
import { projectHref, type Project } from './Project';

function canonicalSlugFromFile(entry: CollectionEntry<'projects'>): string | null {
  const filePath = entry.filePath;
  if (typeof filePath !== 'string') {
    return null;
  }
  const fileName = filePath.split('/').pop() ?? filePath;
  return fileName.replace(/\.md$/, '');
}

function toProject(entry: CollectionEntry<'projects'>): Project {
  const fileSlug = canonicalSlugFromFile(entry);
  if (fileSlug !== null && fileSlug !== entry.data.slug) {
    throw new Error(`Project slug "${entry.data.slug}" does not match its file name "${fileSlug}"`);
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
    gallery: entry.data.gallery,
    href: projectHref(entry.data.slug),
    body: entry.body ?? '',
  };
}

export async function loadProjectRecords(): Promise<Project[]> {
  const entries = await getCollection('projects');
  return entries.map(toProject);
}
