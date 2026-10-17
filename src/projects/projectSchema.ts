import { z } from 'astro/zod';
import type { SchemaContext } from 'astro:content';

const KEBAB_SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const PLACEHOLDER_HOSTS = ['example.com', 'example.org', 'example.net', 'example.edu'];

function isPlaceholderHost(hostname: string): boolean {
  const host = hostname.toLowerCase();
  return PLACEHOLDER_HOSTS.some((placeholder) => host === placeholder || host.endsWith(`.${placeholder}`));
}

function parseAbsoluteHttpsUrl(value: string): URL | null {
  let parsed: URL;
  try {
    parsed = new URL(value);
  } catch {
    return null;
  }
  if (parsed.protocol !== 'https:') {
    return null;
  }
  if (isPlaceholderHost(parsed.hostname)) {
    return null;
  }
  return parsed;
}

const nonBlankString = z.string().refine((value) => value.trim().length > 0, {
  message: 'Expected a non-blank string',
});

const kebabSlug = nonBlankString.refine((value) => KEBAB_SLUG_PATTERN.test(value.trim()), {
  message: 'Expected a stable kebab-case slug',
});

const actionUrl = z.string().refine((value) => parseAbsoluteHttpsUrl(value) !== null, {
  message: 'Expected a real absolute https URL',
});

const dimension = z.number().int().positive();

const availabilitySchema = z.object({
  status: z.enum(['available', 'pending', 'unavailable']),
  message: nonBlankString,
});

const downloadSchema = z.object({
  label: nonBlankString,
  platform: nonBlankString,
  format: nonBlankString,
  url: actionUrl.optional(),
  version: nonBlankString.optional(),
  sizeBytes: z.number().int().positive().optional(),
  filename: nonBlankString.optional(),
  installationNotes: nonBlankString.optional(),
});

const linkSchema = z.object({
  label: nonBlankString,
  kind: z.enum(['source', 'store', 'registry', 'demo', 'website']),
  url: actionUrl,
});

export function projectSchema({ image }: SchemaContext) {
  const galleryItemSchema = z.discriminatedUnion('kind', [
    z.object({
      kind: z.literal('image'),
      src: image(),
      alt: nonBlankString,
      isPlaceholder: z.boolean().optional(),
    }),
    z.object({
      kind: z.literal('preview'),
      src: actionUrl,
      poster: image(),
      alt: nonBlankString,
      width: dimension,
      height: dimension,
      isPlaceholder: z.boolean().optional(),
    }),
    z.object({
      kind: z.literal('demo'),
      src: actionUrl,
      poster: image(),
      alt: nonBlankString,
      width: dimension,
      height: dimension,
      hasAudio: z.boolean(),
      isPlaceholder: z.boolean().optional(),
    }),
  ]);

  return z.object({
    slug: kebabSlug,
    displayName: nonBlankString,
    description: nonBlankString,
    projectType: z.enum(['app', 'audio-plugin', 'cli', 'package', 'extension', 'utility']),
    supportedPlatforms: z.array(nonBlankString),
    releaseMaturity: z.enum(['stable', 'alpha', 'beta', 'mvp', 'prototype']),
    visibility: z.enum(['public', 'draft']),
    featuredRank: z.number().int().positive().optional(),
    editorialOrder: z.number().int().positive(),
    availability: availabilitySchema,
    publicationNote: nonBlankString.optional(),
    authoringNotes: z.array(nonBlankString).default([]),
    downloads: z.array(downloadSchema).default([]),
    links: z.array(linkSchema).default([]),
    gallery: z.array(galleryItemSchema).default([]),
  });
}
