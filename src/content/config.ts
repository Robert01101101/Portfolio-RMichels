import { defineCollection, z } from 'astro:content';

const projectSchema = z.object({
  name: z.object({ en: z.string(), de: z.string() }),
  projectType: z.object({ en: z.string(), de: z.string() }),
  year: z.string(),
  company: z.string().optional(),
  inDevelopment: z.boolean().default(false),
  roles: z.array(z.string()).default([]),
  teammembers: z.array(z.string()).optional(),
  description: z.object({ en: z.string(), de: z.string() }),
  links: z.array(z.object({ label: z.string(), url: z.string() })).optional(),
  heroAltLayout: z.boolean().optional(),
  threeMockup: z.enum(['phone', 'hololens']).nullable().optional(),
  gallery: z.array(z.string()).optional(),
  draft: z.boolean().optional(),
  order: z.number().optional(),
});

export const collections = {
  projects: defineCollection({ type: 'content', schema: projectSchema }),
  'projects-de': defineCollection({ type: 'content', schema: projectSchema }),
};
