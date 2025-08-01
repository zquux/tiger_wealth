type Tokens = {
  accessToken: string
  refreshToken: string
}

type ApiMemoryStorage = {
  accessToken: string
  refreshToken: string
  getTokens: (data: Pick<Tokens, 'refreshToken'>) => Promise<Tokens>
  setTokens: (data: Tokens) => void
  logout: () => void
}

let __internalMemoryStorage: () => ApiMemoryStorage

const assertMemoryStorage = () => {
  if (!__internalMemoryStorage) {
    throw new Error('❌ ApiMemoryStorage is not attached!')
  }
  return __internalMemoryStorage()
}

export const attachInternalApiMemoryStorage = (data: ApiMemoryStorage) => {
  __internalMemoryStorage = () => data
}

export const getApiAccessToken = () => {
  return assertMemoryStorage().accessToken
}

export const getRefreshedTokens = () => {
  const { getTokens, refreshToken } = assertMemoryStorage()
  return getTokens({ refreshToken })
}

export const setTokens = (data: Tokens) => {
  return assertMemoryStorage().setTokens(data)
}

export const logUserOut = () => {
  return assertMemoryStorage().logout()
}
