import { useEffect } from 'react'

import { sessionService, useSessionStore } from '@/entities/session'

import { attachInternalApiMemoryStorage } from '@/shared/api/apiMemoryStorage'

export const useInitAuth = () => {
  const accessToken = useSessionStore(state => state.accessToken)
  const refreshToken = useSessionStore(state => state.refreshToken)
  const logout = useSessionStore(state => state.logout)

  const setTokens = (tokens: { accessToken: string; refreshToken: string }) => {
    useSessionStore.setState(tokens)
  }

  useEffect(() => {
    attachInternalApiMemoryStorage({
      accessToken,
      refreshToken,
      getTokens: sessionService.getTokens,
      setTokens,
      logout
    })
  })
}
