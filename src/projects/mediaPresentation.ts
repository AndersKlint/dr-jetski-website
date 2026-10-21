import { z } from 'astro/zod';
import { parseDocument } from 'yaml';
import type { FeatureOverlay, MediaCrop } from './Project';

export interface MediaPresentation {
  featureOverlay?: FeatureOverlay;
  homepageCrop?: MediaCrop;
}

export interface ProjectMediaPresentation {
  mediaBySource: Map<string, MediaPresentation>;
  preview?: MediaPresentation & { mediaSource: string };
}

const coordinate = z.number().min(0).max(1);
const mediaCropSchema = z.object({
  xStart: coordinate,
  xEnd: coordinate,
  yStart: coordinate,
  yEnd: coordinate,
}).strict().superRefine((crop, context) => {
  if (crop.xEnd <= crop.xStart) {
    context.addIssue({ code: 'custom', path: ['xEnd'], message: 'Must be greater than xStart' });
  }
  if (crop.yEnd <= crop.yStart) {
    context.addIssue({ code: 'custom', path: ['yEnd'], message: 'Must be greater than yStart' });
  }
});

const mediaFilenameSchema = z.string().refine((value) => value.trim().length > 0 && !/[\\/]/.test(value) && value !== '.' && value !== '..', {
    message: 'Expected an exact media filename without a directory prefix',
  });

const presentationSchema = z.array(z.object({
  media: mediaFilenameSchema.optional(),
  preview: mediaFilenameSchema.optional(),
  text: z.string().refine((value) => value.trim().length > 0, { message: 'Expected nonblank plain text' }).optional(),
  text_pos_y: coordinate.default(0.5),
  text_offset: z.object({
    x: z.number().default(0),
    y: z.number().default(0),
  }).strict().default({ x: 0, y: 0 }),
  style: z.enum(['dark', 'light']).default('dark'),
  preview_crop: mediaCropSchema.optional(),
}).strict().superRefine((entry, context) => {
  if ((entry.media === undefined) === (entry.preview === undefined)) {
    context.addIssue({ code: 'custom', message: 'Expected exactly one selector: media or preview' });
  }
}));

export function mediaSourceBasename(source: string): string | null {
  let pathname = source;
  if (/^https?:\/\//i.test(source)) {
    try {
      pathname = new URL(source).pathname;
    } catch {
      return null;
    }
  }
  const segment = pathname.split('/').at(-1);
  return segment === undefined || segment.length === 0 ? null : segment;
}

export function parseMediaPresentation(raw: string, filePath: string): ProjectMediaPresentation {
  const document = parseDocument(raw, { uniqueKeys: true });
  if (document.errors.length > 0) {
    throw new Error(`${filePath}: ${document.errors.map((error) => error.message).join('; ')}`);
  }
  let records: unknown;
  try {
    records = document.contents === null ? [] : document.toJS();
  } catch (error) {
    throw new Error(`${filePath}: ${error instanceof Error ? error.message : String(error)}`);
  }
  const parsed = presentationSchema.safeParse(records);
  if (!parsed.success) {
    const errors = parsed.error.issues.map((issue) => `${issue.path.join('.') || 'records'}: ${issue.message}`);
    throw new Error(`${filePath}: ${errors.join('; ')}`);
  }
  const presentations = new Map<string, MediaPresentation>();
  let preview: ProjectMediaPresentation['preview'];
  for (const [index, entry] of parsed.data.entries()) {
    const presentation: MediaPresentation = {
      featureOverlay: entry.text === undefined ? undefined : {
        text: entry.text,
        y: entry.text_pos_y,
        offset: entry.text_offset,
        style: entry.style,
      },
      homepageCrop: entry.preview_crop,
    };
    if (entry.preview !== undefined) {
      if (preview !== undefined) {
        throw new Error(`${filePath}: ${index}.preview: Only one preview record is allowed`);
      }
      preview = { mediaSource: entry.preview, ...presentation };
    } else if (entry.media !== undefined) {
      if (presentations.has(entry.media)) {
        throw new Error(`${filePath}: ${index}.media: Duplicate media filename "${entry.media}"`);
      }
      presentations.set(entry.media, presentation);
    }
  }
  return { mediaBySource: presentations, preview };
}
