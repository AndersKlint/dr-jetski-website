import { z } from 'astro/zod';
import { parseDocument } from 'yaml';
import type { FeatureOverlay, MediaCrop } from './Project';

export interface MediaPresentation {
  featureOverlay?: FeatureOverlay;
  homepageCrop?: MediaCrop;
}

export interface ProjectMediaPresentation {
  mediaBySource: Map<string, MediaPresentation>;
  gallery: AuthoredMediaItem[];
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

const presentationFields = {
  text: z.string().refine((value) => value.trim().length > 0, { message: 'Expected nonblank plain text' }).optional(),
  text_pos_y: coordinate.default(0.5),
  text_side: z.enum(['left', 'right']).default('left'),
  text_offset: z.object({
    x: z.number().default(0),
    y: z.number().default(0),
  }).strict().default({ x: 0, y: 0 }),
  style: z.enum(['dark', 'light']).default('dark'),
  'highlight-color': z.string().regex(/^#?[0-9a-fA-F]{6}$/, {
    message: 'Expected exactly six hex digits, optionally prefixed with #',
  }).transform((value) => `#${value.replace(/^#/, '')}`).optional(),
  preview_crop: mediaCropSchema.optional(),
};

const videoSourceSchema = z.string().refine((value) => {
  if (mediaFilenameSchema.safeParse(value).success) return /\.(mp4|webm|mov|m4v|ogv)$/.test(value);
  try {
    const url = new URL(value);
    return url.protocol === 'https:' && !/(^|\.)example\.(com|org|net|edu)$/i.test(url.hostname) && mediaSourceBasename(value) !== null;
  } catch {
    return false;
  }
}, { message: 'Expected a local video filename or a real HTTPS video URL' });

const mediaFields = {
  ...presentationFields,
  alt: z.string().refine((value) => value.trim().length > 0, { message: 'Expected nonblank alt text' }),
  isPlaceholder: z.boolean().optional(),
};
const videoFields = {
  ...mediaFields,
  media: videoSourceSchema,
  poster: mediaFilenameSchema,
  width: z.number().int().positive(),
  height: z.number().int().positive(),
};
const mediaItemSchema = z.union([
  z.object({ ...mediaFields, media: mediaFilenameSchema, kind: z.literal('image').default('image') }).strict(),
  z.object({ ...videoFields, kind: z.literal('preview') }).strict(),
  z.object({ ...videoFields, kind: z.literal('demo'), hasAudio: z.boolean() }).strict(),
]);
const presentationSchema = z.array(z.union([
  mediaItemSchema,
  z.object({ ...presentationFields, preview: mediaFilenameSchema }).strict(),
]));

export type AuthoredMediaItem = MediaPresentation & (
  | { media: string; kind: 'image'; alt: string; isPlaceholder?: boolean }
  | { media: string; kind: 'preview'; alt: string; poster: string; width: number; height: number; isPlaceholder?: boolean }
  | { media: string; kind: 'demo'; alt: string; poster: string; width: number; height: number; hasAudio: boolean; isPlaceholder?: boolean }
);

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
  const gallery: AuthoredMediaItem[] = [];
  let preview: ProjectMediaPresentation['preview'];
  for (const [index, entry] of parsed.data.entries()) {
    const presentation: MediaPresentation = {
      featureOverlay: entry.text === undefined ? undefined : {
        text: entry.text,
        side: entry.text_side,
        y: entry.text_pos_y,
        offset: entry.text_offset,
        style: entry.style,
        highlightColor: entry['highlight-color'],
      },
      homepageCrop: entry.preview_crop,
    };
    if ('preview' in entry) {
      if (preview !== undefined) {
        throw new Error(`${filePath}: ${index}.preview: Only one preview record is allowed`);
      }
      preview = { mediaSource: entry.preview, ...presentation };
    } else {
      if (presentations.has(entry.media)) {
        throw new Error(`${filePath}: ${index}.media: Duplicate media filename "${entry.media}"`);
      }
      presentations.set(entry.media, presentation);
      const { text, text_pos_y, text_side, text_offset, style, 'highlight-color': highlightColor, preview_crop, ...media } = entry;
      gallery.push({ ...media, ...presentation });
    }
  }
  if (preview !== undefined) {
    const matches = gallery.filter((item) => mediaSourceBasename(item.media) === preview.mediaSource);
    if (matches.length !== 1) {
      throw new Error(`${filePath}: preview: Expected exactly one gallery item matching "${preview.mediaSource}"`);
    }
  }
  return { mediaBySource: presentations, gallery, preview };
}
