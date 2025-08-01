import * as z from 'zod'

export const SigninSchema = z.object({
  email: z.string().email({ message: 'Email is invalid' }),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(64, 'Password must be at most 64 characters')
})

export const RefreshTokenSchema = z.object({
  refreshToken: z.string()
})

export const SignupSchema = SigninSchema
