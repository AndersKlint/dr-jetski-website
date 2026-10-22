import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { projectSchema } from './projects/projectSchema';

const projects = defineCollection({
  loader: glob({ base: './src/content/projects', pattern: '*/index.md' }),
  schema: projectSchema,
});

const projectPolicies = defineCollection({
  loader: glob({
    base: './src/content/projects',
    pattern: '*/privacy.md',
    generateId: ({ entry }) => entry.split('/')[0]!,
  }),
  schema: z.object({}).strict(),
});

export const collections = { projects, projectPolicies };
