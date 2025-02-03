import { z } from 'zod';

const createUserSchema = z.object({
  name: z.string().nonempty({ message: 'Name is required' }),
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(1, { message: 'Password is required' }),
  isBlocked: z.boolean().optional().default(false),
});

const updateUserSchema = z.object({
  name: z.string().nonempty({ message: 'Name cannot be empty' }).optional(),
  email: z.string().email({ message: 'Invalid email address' }).optional(),
  password: z
    .string()
    .min(1, { message: 'Password cannot be empty' })
    .optional(),
  isBlocked: z.boolean().optional(),
});
export const userValidations = {
  createUserSchema,
  updateUserSchema,
};
