import { z, defineCollection, reference } from 'astro:content';

const projects = defineCollection({
  type: 'data',
  schema: z.object({
    isDraft: z.boolean(),
    sortOrder: z.number(),
    title: z.string(),
    description: z.string().optional(),
    shortDescription: z.string(),
    link: z.string().optional(),
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

const blogCollection = defineCollection({
  type: 'content', // v2.5.0 and later
  schema: z.object({
    isDraft: z.boolean(),
    publishDate: z.date(),
    title: z.string(),
    relatedPosts: z.array(reference('blog')).optional(),
  }),
});

export const collections = { projects, blog: blogCollection };