import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    // pubDate is now optional - will be populated from git history if not provided
    pubDate: z.date().optional(),
    updatedDate: z.date().optional(),
    author: z.string().default('Joel Montano'),
    tags: z.array(z.string()),
    draft: z.boolean().default(false),
    image: z.string().optional(),
  }),
});

export const collections = {
  blog: blogCollection,
};
