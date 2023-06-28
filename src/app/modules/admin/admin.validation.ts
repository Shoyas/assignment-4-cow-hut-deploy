import { z } from 'zod';
import { userRoles } from '../users/user.constant';

const createAdminZodSchema = z.object({
  body: z.object({
    phoneNumber: z.string({
      required_error: 'Phone No. is required',
    }),
    role: z.enum([...userRoles] as [string, ...string[]], {
      required_error: 'Role is required',
    }),
    password: z.string({
      required_error: 'Password is required',
    }),
    name: z.object({
      firstName: z.string({
        required_error: 'First name is required',
      }),
      lastName: z.string({
        required_error: 'Last name is required',
      }),
    }),
    address: z.string({
      required_error: 'Address is required',
    }),
  }),
});

const loginZodSchema = z.object({
  body: z.object({
    phoneNumber: z.string({
      required_error: 'Phone No. is required',
    }),
    password: z.string({
      required_error: 'Password is required',
    }),
  }),
});

const refreshTokenZodSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: 'Refresh token is required',
    }),
  }),
});

export const AdminValidation = {
  createAdminZodSchema,
  loginZodSchema,
  refreshTokenZodSchema,
};
