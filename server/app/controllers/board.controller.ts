import { Request, Response } from 'express'
import { boardService } from '@/services'

import { env, redis } from '@/config'

class BoardController {
  getInfo = async (_req: Request, res: Response) => {
    try {
      const cached = await redis.get(env.REDIS_CACHE_KEY)
      if (cached) {
        console.log('Returning cached result')
        return res.json(cached)
      }
      const entries = await boardService.getCryptoEntries()
      const titles = boardService.extractTitles(entries)

      const marketData = await boardService.fetchMarketData(titles)

      const merged = await Promise.all(
        entries.map(async entry => {
          const filteredMarketData = marketData.find(
            m => m.title.toLowerCase() === entry.title.toLowerCase()
          )

          const currentPrice = filteredMarketData?.currentPrice ?? 0
          const recommendedPrice = entry.recommendedPrice ?? 1
          const closingPrice = entry.closingPrice ?? 0

          const returnSinceRec = entry.isOpen
            ? +(
                ((currentPrice - recommendedPrice) / recommendedPrice) *
                100
              ).toFixed(2)
            : +(
                ((closingPrice - recommendedPrice) / recommendedPrice) *
                100
              ).toFixed(2)

          const sp500Return = await boardService.getSP500(entry.recommendedDate)

          const sp500vsReturn = returnSinceRec - sp500Return

          return {
            ...entry,
            symbol: filteredMarketData?.symbol,
            marketCap: filteredMarketData?.marketCap,
            currentPrice: currentPrice,
            returnSinceRec: returnSinceRec,
            sp500Return: sp500Return,
            sp500vsReturn: sp500vsReturn
          }
        })
      )

      await redis.set(env.REDIS_CACHE_KEY, merged, {
        ex: env.REDIS_CACHE_TTL_SECONDS
      })
      console.log('Stored in Redis')

      res.json(merged)
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch data' })
      console.log(error)
    }
  }
}

export const boardController = new BoardController()
