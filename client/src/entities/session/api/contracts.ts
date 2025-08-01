import z from 'zod'

import { UserDtoSchema } from '@/entities/user/@x'

export const SigninDtoSchema = z.object({
  email: z.string().trim().email(),
  password: z
    .string()
    .trim()
    .min(8, 'Password must be at least 8 characters')
    .max(64, 'Password must be at most 64 characters')
})

export const SignupDtoSchema = SigninDtoSchema

export const RefreshTokenDtoSchema = z.object({
  refreshToken: z.string()
})

export const SessionResponseDtoSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
  user: z.lazy(() => UserDtoSchema)
})

export const TokensDtoSchema = SessionResponseDtoSchema.omit({ user: true })
