import type {
  RefreshTokenDtoSchema,
  SessionResponseDtoSchema,
  SigninDtoSchema,
  SignupDtoSchema
} from './contracts'

import { z } from 'zod'

export type SignupDto = z.infer<typeof SignupDtoSchema>
export type SigninDto = z.infer<typeof SigninDtoSchema>
export type SessionDto = z.infer<typeof SessionResponseDtoSchema>
export type RefreshTokenDto = z.infer<typeof RefreshTokenDtoSchema>
