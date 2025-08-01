import type { CryptoEntry } from '../model/types'

import { useQuery } from '@tanstack/react-query'

import { cryptoBoardQueries } from '../api/queries'
import { formatDate } from '../lib/formatDate'
import { formatMarketCap } from '../lib/formatMarketCap'
import { useSortData } from '../lib/useSortData'
import headers from '../model/headers.json'
import { SortableHeader } from './SortableHeader'

export function Board() {
  const { data, isPending, isError, error } = useQuery(
    cryptoBoardQueries.cryptoBoard()
  )
  const { handleSort, getSortedArray } = useSortData()

  if (isPending) return <div>Loading...</div>
  if (isError) return <div>Error: {error.message}</div>
  if (!data) return <div>No data found</div>

  const sortedData = getSortedArray(data)

  return (
    <div
      className='relative mx-auto max-w-[1150px] overflow-x-auto rounded-[38px]
        border-[15px] border-[rgba(255,255,255,0.12)] bg-light-gray'>
      <h2 className='p-6 font-Nexa text-2xl font-bold text-traffic-white'>
        Tiger&apos;s stock leaderboard
      </h2>
      <div className='px-6 sm:px-10'>
        <table className='table-auto text-left'>
          <thead>
            <tr className='font-PTSerif text-sm text-traffic-white'>
              {headers.map(header => (
                <th
                  key={header.title}
                  className='pr-2 align-top'>
                  <SortableHeader
                    title={header.title}
                    name1={header.name1}
                    name2={header.name2}
                    field={header.field}
                    onSort={handleSort}
                  />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedData.map((item: CryptoEntry) => (
              <tr
                key={item.title}
                className='font-PTSerif'>
                <td className='p-2 uppercase text-tangerine'>{item.symbol}</td>
                <td className='text-traffic-white'>
                  $
                  {item.currentPrice.toLocaleString('en-US', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                  })}
                </td>
                <td className='text-silver-gray'>
                  {formatDate(item.recommendedDate)}
                </td>
                <td className='text-silver-gray'>
                  ${formatMarketCap(item.marketCap)}
                </td>
                <td className='text-traffic-white'>
                  $
                  {item.recommendedPrice.toLocaleString('en-US', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                  })}
                </td>
                <td
                  className={
                    item.returnSinceRec > 0
                      ? 'text-light-green'
                      : 'text-paradise-red'
                  }>
                  {item.returnSinceRec > 0
                    ? `+${item.returnSinceRec}%`
                    : `${item.returnSinceRec}%`}
                </td>
                <td
                  className={
                    item.sp500Return > 0
                      ? 'text-light-green'
                      : 'text-paradise-red'
                  }>
                  {item.sp500Return > 0
                    ? `+${item.sp500Return}%`
                    : `${item.sp500Return}%`}
                </td>
                <td
                  className={
                    item.sp500vsReturn > 0
                      ? 'text-light-green'
                      : 'text-paradise-red'
                  }>
                  {item.sp500vsReturn > 0
                    ? `+${item.sp500vsReturn.toFixed(2)}%`
                    : `${item.sp500vsReturn.toFixed(2)}%`}
                </td>
                <td className='text-silver-gray'>{item.risk}</td>
                <td className='text-traffic-white'>
                  {item.isOpen ? 'Open' : 'Close'}
                </td>
                <td className='text-traffic-white'>
                  $
                  {item.closingPrice.toLocaleString('en-US', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                  })}
                </td>
                <td className='text-silver-gray'>
                  {formatDate(item.closingDate)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
