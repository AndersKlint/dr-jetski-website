import type { PreviewCrop } from '../media/PreviewCrop';

export const projectPreviewCrops: Readonly<Record<string, { crop: PreviewCrop } | undefined>> = {
  hanscan: { crop: { xStart: 0, xEnd: 1, yStart: 0.16, yEnd: 0.8 } },
};

for (const [slug, configuration] of Object.entries(projectPreviewCrops)) {
  if (!configuration) continue;
  const { crop } = configuration;
  const coordinates = [crop.xStart, crop.xEnd, crop.yStart, crop.yEnd];
  if (
    coordinates.some((coordinate) => !Number.isFinite(coordinate) || coordinate < 0 || coordinate > 1) ||
    crop.xEnd <= crop.xStart ||
    crop.yEnd <= crop.yStart
  ) {
    throw new Error(`Invalid homepage preview crop for project "${slug}".`);
  }
}
