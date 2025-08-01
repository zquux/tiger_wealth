import { axiosInstance } from '@/config'

type MarketData = {
  marketCap: number
  currentPrice: number
  symbol: string
  title: string
}

export const fetchMarketData = async (ids: string[]): Promise<MarketData[]> => {
  const response = await axiosInstance.get(
    'https://api.coingecko.com/api/v3/coins/markets',
    {
      params: {
        vs_currency: 'usd',
        ids: ids.join(',')
      }
    }
  )

  return response.data.map((item: any) => ({
    marketCap: item.market_cap,
    currentPrice: item.current_price,
    symbol: item.symbol,
    title: item.id
  }))
}
