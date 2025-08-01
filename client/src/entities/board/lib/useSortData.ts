import type { CryptoEntry, headerType } from '../model/types'

import { useState } from 'react'

export function useSortData() {
  const [sort, setSort] = useState<{
    keyToSort: keyof CryptoEntry
    direction: 'asc' | 'desc'
  }>({ keyToSort: 'title', direction: 'asc' })

  function handleSort(header: headerType) {
    setSort({
      keyToSort: header.field as keyof CryptoEntry,
      direction: header.direction
    })
  }

  function getSortedArray(arrayToSort: CryptoEntry[]) {
    if (sort.keyToSort === 'isOpen') {
      if (sort.direction === 'asc') {
        return arrayToSort.sort((a, b) =>
          a[sort.keyToSort] > b[sort.keyToSort] ? -1 : 1
        )
      }
      return arrayToSort.sort((a, b) =>
        a[sort.keyToSort] > b[sort.keyToSort] ? 1 : -1
      )
    }
    if (sort.keyToSort === 'risk') {
      const riskOrder = ['Low', 'Medium', 'High']

      return arrayToSort.sort((a, b) => {
        const valA = riskOrder.indexOf(a.risk ?? '')
        const valB = riskOrder.indexOf(b.risk ?? '')
        return sort.direction === 'asc' ? valB - valA : valA - valB
      })
    }
    if (sort.direction === 'asc') {
      return arrayToSort.sort((a, b) =>
        a[sort.keyToSort] > b[sort.keyToSort] ? 1 : -1
      )
    }
    return arrayToSort.sort((a, b) =>
      a[sort.keyToSort] > b[sort.keyToSort] ? -1 : 1
    )
  }

  return {
    sort,
    handleSort,
    getSortedArray
  }
}
