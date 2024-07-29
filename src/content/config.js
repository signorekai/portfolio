import { z, defineCollection } from 'astro:content';

const projects = defineCollection({
  type: 'data',
  schema: z.object({
    isDraft: z.boolean(),
    sortOrder: z.number(),
    title: z.string(),
    description: z.string(),
    shortDescription: z.string().optional(),
    items: z.array(z.object({
      media: z.string(),
      mediaType: z.string(),
      description: z.string(),
      padding: z.number().default(48),
      customClass: z.string().default(""),
      blockStyle: z.any().default({}),
      width: z.number(),
      height: z.number(),
      maxWidth: z.string().default("fit-content"),
      maxHeight: z.string().default("fit-content"),
    }))
  })
});

export const collections = { projects };