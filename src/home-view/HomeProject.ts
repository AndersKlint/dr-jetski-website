import type { PreviewCrop } from '../media/PreviewCrop';
import type { Project } from '../projects/Project';

export interface HomeProject extends Project {
  previewCrop?: PreviewCrop;
}
