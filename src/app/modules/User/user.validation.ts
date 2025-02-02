import { z } from 'zod';

const createUserValidationSchema = z.object({
  body: z.object({
    password: z.string().max(20),
    user: z.object({
      name: z.string(),
      email: z.string().email(),
      role: z.enum(['admin', 'user']).default('user'),
      isBlocked: z.boolean().default(false),
    }),
  }),
});

const updateUserValidationSchema = z.object({
  body: z.object({
    password: z.string().max(20).optional(),
    user: z.object({
      name: z.string().optional(),
      email: z.string().email().optional(),
      role: z.enum(['admin', 'user']).default('user').optional(),
      isBlocked: z.boolean().default(false).optional(),
    }),
  }),
});

export const StudentValidations = {
  createUserValidationSchema,
  updateUserValidationSchema,
};
