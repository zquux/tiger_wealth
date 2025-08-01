import type { RefreshTokenDto, SignupDto } from './types'

import { axiosInstance } from '@/shared/api'

import {
  RefreshTokenDtoSchema,
  SessionResponseDtoSchema,
  SignupDtoSchema,
  TokensDtoSchema
} from './contracts'
import { sessionApiEndpoints } from './endpoints'

export const sessionService = {
  async signup(data: SignupDto) {
    const signupDto = SignupDtoSchema.parse(data)

    const response = await axiosInstance.post(
      sessionApiEndpoints.signup,
      signupDto
    )

    const parsedData = SessionResponseDtoSchema.parse(response.data)

    return parsedData
  },

  async getTokens(data: RefreshTokenDto) {
    const refreshTokenDto = RefreshTokenDtoSchema.parse(data)

    const response = await axiosInstance.post(
      sessionApiEndpoints.tokens,
      refreshTokenDto
    )

    const parsedData = TokensDtoSchema.parse(response.data)

    return parsedData
  },

  async logout() {
    await axiosInstance.post(sessionApiEndpoints.logout)
  }
}
