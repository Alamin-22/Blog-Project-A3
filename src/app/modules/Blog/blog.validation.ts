import { z } from 'zod';

const createBlogValidationSchema = z.object({
  body: z.object({
    title: z.string().min(5, 'Title must be at least 5 characters long'),
    content: z
      .string()
      .min(10, 'Content must have at least 10 characters')
      .max(250, 'Content must not exceed 250 characters')
      .refine((val) => val.replace(/<[^>]*>/g, '').split(/\s+/).length >= 10, {
        message: 'Content must have at least 10 words (excluding HTML tags)',
      }), // Ensures at least 10 words
    author: z.string().min(1, 'Author ID is required'), // Should be a valid MongoDB ObjectId
    isPublished: z.boolean().optional().default(true), // Default is true if not provided
  }),
});

export const BlogValidations = {
  createBlogValidationSchema,
};
