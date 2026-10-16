import type { Project } from './Project';

export const LEAD_FEATURED_COUNT = 3;

export function validateProjectCatalog(projects: readonly Project[]): void {
  const seenSlugs = new Set<string>();
  for (const project of projects) {
    if (seenSlugs.has(project.slug)) {
      throw new Error(`Duplicate project slug "${project.slug}"`);
    }
    seenSlugs.add(project.slug);
  }
  const seenRanks = new Set<number>();
  for (const project of projects) {
    if (project.featuredRank === undefined) {
      continue;
    }
    if (seenRanks.has(project.featuredRank)) {
      throw new Error(`Duplicate featured rank ${project.featuredRank}`);
    }
    seenRanks.add(project.featuredRank);
  }
}

function compareFeatured(a: Project, b: Project): number {
  const rank = (a.featuredRank ?? 0) - (b.featuredRank ?? 0);
  return rank !== 0 ? rank : a.slug.localeCompare(b.slug);
}

function compareEditorial(a: Project, b: Project): number {
  const order = a.editorialOrder - b.editorialOrder;
  return order !== 0 ? order : a.slug.localeCompare(b.slug);
}

export class ProjectCatalogService {
  private readonly projects: readonly Project[];

  constructor(projects: readonly Project[]) {
    validateProjectCatalog(projects);
    this.projects = projects;
  }

  private featuredByRank(): Project[] {
    return this.projects
      .filter((project) => project.visibility === 'public' && project.featuredRank !== undefined)
      .sort(compareFeatured);
  }

  leadFeatured(): Project[] {
    return this.featuredByRank().slice(0, LEAD_FEATURED_COUNT);
  }

  secondaryFeatured(): Project[] {
    return this.featuredByRank().slice(LEAD_FEATURED_COUNT);
  }

  compactProjects(): Project[] {
    return this.projects
      .filter((project) => project.visibility === 'public' && project.featuredRank === undefined)
      .sort(compareEditorial);
  }

  publicProjects(): Project[] {
    return [...this.featuredByRank(), ...this.compactProjects()];
  }
}
