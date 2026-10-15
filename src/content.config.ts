import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { projectSchema } from './projects/projectSchema';

const projects = defineCollection({
  loader: glob({ base: './src/content/projects', pattern: '**/*.md' }),
  schema: projectSchema,
});

export const collections = { projects };
