import type { ProjectType, ReleaseMaturity } from '../projects/Project';

const TYPE_LABELS: Record<ProjectType, string> = {
  app: 'App',
  'audio-plugin': 'Audio plugin',
  cli: 'Command-line tool',
  package: 'Package',
  extension: 'Desktop extension',
  utility: 'Utility',
};

const MATURITY_LABELS: Record<ReleaseMaturity, string> = {
  stable: 'Stable',
  alpha: 'Alpha',
  beta: 'Beta',
  mvp: 'MVP',
  prototype: 'Prototype',
};

export function typeLabel(projectType: ProjectType): string {
  return TYPE_LABELS[projectType];
}

export function maturityLabel(releaseMaturity: ReleaseMaturity): string {
  return MATURITY_LABELS[releaseMaturity];
}

export function isTrialMaturity(releaseMaturity: ReleaseMaturity): boolean {
  return releaseMaturity === 'alpha' || releaseMaturity === 'beta';
}
