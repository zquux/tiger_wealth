export type CryptoEntry = {
  title: string
  symbol: string
  currentPrice: number
  recommendedDate: string
  marketCap: number
  recommendedPrice: number
  returnSinceRec: number
  sp500Return: number
  sp500vsReturn: number
  risk: string
  isOpen: boolean
  closingPrice: number
  closingDate: string
}

export type headerType = {
  title: string
  field: string
  name1: string
  name2: string
  direction: 'asc' | 'desc'
}
