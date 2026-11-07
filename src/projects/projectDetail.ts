import type { GalleryItem, Project, ProjectDownload } from './Project';

export interface ProjectDetail {
  downloads: ProjectDownload[];
  socialImage?: string;
  socialImageAlt?: string;
  isCompactMedia: boolean;
}

function socialSource(item: GalleryItem): { src: string; alt: string } {
  if (item.kind === 'image') {
    return { src: item.image.src, alt: item.alt };
  }
  return { src: item.poster.src, alt: item.alt };
}

export function prepareProjectDetail(project: Project): ProjectDetail {
  const socialItem = project.gallery[0];
  const social = socialItem === undefined ? undefined : socialSource(socialItem);
  return {
    downloads: project.downloads,
    socialImage: social?.src,
    socialImageAlt: social?.alt,
    isCompactMedia:
      project.projectType === 'package' || project.projectType === 'cli' || project.projectType === 'utility',
  };
}
