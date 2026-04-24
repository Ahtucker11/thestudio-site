import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const faqs = defineCollection({
  loader: glob({ pattern: "**/*.yaml", base: "./src/content/faqs" }),
  schema: z.object({
    items: z.array(
      z.object({
        question: z.string(),
        answer: z.string(),
        category: z.string().optional(),
        sortOrder: z.number().optional(),
      })
    ),
  }),
});

const services = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/services" }),
  schema: z.object({
    title: z.string(),
    tagline: z.string(),
    icon: z.string().optional(),
    features: z.array(z.string()).optional(),
    sortOrder: z.number().default(0),
    seo: z.object({
      title: z.string().optional(),
      description: z.string(),
    }),
  }),
});

const testimonials = defineCollection({
  loader: glob({ pattern: "**/*.yaml", base: "./src/content/testimonials" }),
  schema: z.object({
    items: z.array(
      z.object({
        quote: z.string(),
        name: z.string(),
        role: z.string(),
        company: z.string().optional(),
        image: z.string().optional(),
      })
    ),
  }),
});

const team = defineCollection({
  loader: glob({ pattern: "**/*.yaml", base: "./src/content/team" }),
  schema: z.object({
    members: z.array(
      z.object({
        name: z.string(),
        role: z.string(),
        bio: z.string(),
        image: z.string().optional(),
        social: z
          .object({
            linkedin: z.string().optional(),
            email: z.string().optional(),
          })
          .optional(),
      })
    ),
  }),
});

export const collections = { faqs, services, testimonials, team };
