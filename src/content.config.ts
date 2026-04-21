import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const workshops = defineCollection({
  loader: glob({
    pattern: '**/index.mdoc',
    base: './src/content/workshops',
  }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    summary: z.string(),
    colabUrl: z.string().url().optional(),
    slidesUrl: z.string().url().optional(),
    pythonCells: z
      .array(
        z.object({
          label: z.string().optional(),
          code: z.string(),
        })
      )
      .default([]),
    resources: z
      .array(
        z.object({
          label: z.string(),
          url: z.string().url(),
        })
      )
      .default([]),
    contributors: z.array(z.string()).default([]),
  }),
});

const contributors = defineCollection({
  loader: glob({
    pattern: '**/index.{yaml,yml}',
    base: './src/content/contributors',
  }),
  schema: z.object({
    name: z.string(),
    personalUrl: z.string().url().optional(),
    role: z.string().optional(),
    bio: z.string().optional(),
  }),
});

export const collections = { workshops, contributors };
