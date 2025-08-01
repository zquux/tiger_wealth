import { queryOptions } from '@tanstack/react-query'

import { cryptoBoardService } from './service'

export const cryptoBoardQueries = {
  cryptoBoardKey: () => ['cryptoBoard'] as const,
  cryptoBoard: () =>
    queryOptions({
      queryKey: cryptoBoardQueries.cryptoBoardKey(),
      queryFn: cryptoBoardService.getCryptoFromContentful
    })
}
