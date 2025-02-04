import { z } from 'zod';

const createUserValidationSchema = z.object({
  body: z.object({
    password: z.string().max(20).min(4, { message: 'Password is required' }),
    user: z.object({
      name: z.string().nonempty({ message: 'Name is required' }),
      email: z.string().email({ message: 'Invalid email address' }),
      isBlocked: z.boolean().optional().default(false),
    }),
  }),
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
  createUserValidationSchema,
};
