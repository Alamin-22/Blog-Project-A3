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

const loginValidationSchema = z.object({
  body: z.object({
    id: z.string({ required_error: 'Id is Required' }),
    password: z.string({ required_error: 'Password Is Required' }),
  }),
});

const changePasswordValidationSchema = z.object({
  body: z.object({
    oldPassword: z.string({ required_error: 'Old Password Is Required' }),
    NewPassword: z.string({ required_error: 'Password Is Required' }),
  }),
});

const refreshTokenValidationSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({ required_error: 'Refresh Token Is Required' }),
  }),
});

export const AuthValidations = {
  loginValidationSchema,
  changePasswordValidationSchema,
  refreshTokenValidationSchema,
};
