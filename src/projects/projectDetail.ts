import { selectActionableDownloads, type GalleryItem, type Project, type ProjectDownload } from './Project';

export interface ProjectDetail {
  downloads: ProjectDownload[];
  hasDownloads: boolean;
  socialImage?: string;
  socialImageAlt?: string;
  isCompactMedia: boolean;
}

function socialSource(item: GalleryItem): { src: string; alt: string } {
  if (item.kind === 'image') {
    return { src: item.src, alt: item.alt };
  }
  return { src: item.poster, alt: item.alt };
}

export function prepareProjectDetail(project: Project): ProjectDetail {
  const socialItem = project.gallery[0];
  const social = socialItem === undefined ? undefined : socialSource(socialItem);
  return {
    downloads: project.downloads,
    hasDownloads: selectActionableDownloads(project).length > 0,
    socialImage: social?.src,
    socialImageAlt: social?.alt,
    isCompactMedia:
      project.projectType === 'package' || project.projectType === 'cli' || project.projectType === 'utility',
  };
}
