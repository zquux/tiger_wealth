import { boardCrypto } from '@/types'

import { contentfulClient } from '@/config'

export const getCryptoEntries = async (): Promise<boardCrypto[]> => {
  const entries = await contentfulClient.getEntries({ content_type: 'board' })
  return entries.items.map(item => ({
    title: typeof item.fields.title === 'string' ? item.fields.title : '-',
    recommendedDate:
      typeof item.fields.recommendedDate === 'string'
        ? item.fields.recommendedDate
        : '-',
    recommendedPrice:
      typeof item.fields.recommendedPrice === 'number'
        ? item.fields.recommendedPrice
        : 0,
    risk: typeof item.fields.risk === 'string' ? item.fields.risk : 'Unknown',
    isOpen:
      typeof item.fields.isOpen === 'boolean' ? item.fields.isOpen : false,
    closingPrice:
      typeof item.fields.closingPrice === 'number'
        ? item.fields.closingPrice
        : 0,
    closingDate:
      typeof item.fields.closingDate === 'string'
        ? item.fields.closingDate
        : '-'
  }))
}

export const extractTitles = (items: boardCrypto[]): string[] => {
  return items.map(item => item.title.toLowerCase())
}
