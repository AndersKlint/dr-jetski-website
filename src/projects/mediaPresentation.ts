import { z } from 'astro/zod';
import { parseDocument } from 'yaml';
import type { FeatureOverlay, MediaCrop } from './Project';

export interface MediaPresentation {
  featureOverlay?: FeatureOverlay;
  crop?: MediaCrop;
}

export interface ProjectMediaPresentation {
  projectColor?: string;
  mediaBySource: Map<string, MediaPresentation>;
  gallery: AuthoredMediaItem[];
  preview?: MediaPresentation & { mediaSource: string; alt?: string };
  mobilePreview?: [string, string];
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
  crop: mediaCropSchema.optional(),
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

const altTextSchema = z.string().refine((value) => value.trim().length > 0, { message: 'Expected nonblank alt text' });

const mediaFields = {
  ...presentationFields,
  'highlighted-words': z.string().transform((value) => value.split(',').map((term) => term.trim()).filter((term) => term.length > 0)).optional(),
  alt: altTextSchema,
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
const presentationSchema = z.object({
  'mobile-preview': z.tuple([mediaFilenameSchema, mediaFilenameSchema]).refine(
    ([left, right]) => left !== right,
    { message: 'Expected two distinct gallery filenames' },
  ).optional(),
  'project-color': z.string().regex(/^#?[0-9a-fA-F]{6}$/, {
    message: 'Expected exactly six hex digits, optionally prefixed with #',
  }).transform((value) => `#${value.replace(/^#/, '')}`).optional(),
  items: z.array(z.union([
    mediaItemSchema,
    z.object({ ...presentationFields, preview: mediaFilenameSchema, alt: altTextSchema.optional() }).strict(),
  ])).default([]),
}).strict();

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
    records = document.contents === null ? {} : document.toJS();
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
  const projectColor = parsed.data['project-color'];
  let preview: ProjectMediaPresentation['preview'];
  for (const [index, entry] of parsed.data.items.entries()) {
    const presentation: MediaPresentation = {
      featureOverlay: entry.text === undefined ? undefined : {
        text: entry.text,
        highlightedWords: 'highlighted-words' in entry ? entry['highlighted-words'] : undefined,
        side: entry.text_side,
        y: entry.text_pos_y,
        offset: entry.text_offset,
        style: entry.style,
        highlightColor: projectColor,
      },
      crop: entry.crop,
    };
    if ('preview' in entry) {
      if (preview !== undefined) {
        throw new Error(`${filePath}: items.${index}.preview: Only one preview record is allowed`);
      }
      preview = { mediaSource: entry.preview, alt: entry.alt, ...presentation };
    } else {
      if (presentations.has(entry.media)) {
        throw new Error(`${filePath}: items.${index}.media: Duplicate media filename "${entry.media}"`);
      }
      presentations.set(entry.media, presentation);
      const { text, 'highlighted-words': highlightedWords, text_pos_y, text_side, text_offset, style, crop, ...media } = entry;
      gallery.push({ ...media, ...presentation });
    }
  }
  if (preview !== undefined) {
    const matches = gallery.filter((item) => mediaSourceBasename(item.media) === preview.mediaSource);
    if (matches.length > 1) {
      throw new Error(`${filePath}: preview: Expected exactly one gallery item matching "${preview.mediaSource}"`);
    }
    if (matches.length === 0 && preview.alt === undefined) {
      throw new Error(`${filePath}: preview.alt: A standalone homepage image "${preview.mediaSource}" requires nonblank alt text`);
    }
  }
  const mobilePreview = parsed.data['mobile-preview'];
  for (const source of mobilePreview ?? []) {
    const matches = gallery.filter((item) => mediaSourceBasename(item.media) === source);
    if (matches.length !== 1 || matches[0]!.kind === 'demo') {
      throw new Error(`${filePath}: mobile-preview: "${source}" must match exactly one gallery image or silent looping preview`);
    }
  }
  return { projectColor, mediaBySource: presentations, gallery, preview, mobilePreview };
}
