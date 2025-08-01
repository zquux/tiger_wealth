import { axiosInstance } from '@/config'

export const getSP500 = async (recommendedDate: string): Promise<number> => {
  const now = Date.now()
  const recDate = new Date(recommendedDate).getTime()

  const period1 = Math.floor(Math.min(recDate, now) / 1000)
  const period2 = Math.floor(now / 1000)

  const response = await axiosInstance.get(
    `https://query1.finance.yahoo.com/v8/finance/chart/^GSPC`,
    {
      params: {
        symbol: '^GSPC',
        period1,
        period2,
        interval: '1d'
      }
    }
  )

  const prices = response.data.chart.result[0].indicators.adjclose[0].adjclose
  const startPrice = prices[0]
  const endPrice = prices[prices.length - 1]
  console.log('START PRICE' + startPrice + 'END PRICE' + endPrice)

  const spReturn = ((endPrice - startPrice) / startPrice) * 100

  console.log('REQUEST MADE')

  return +spReturn.toFixed(2)
}
