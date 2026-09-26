import type { Metadata } from 'next'
import Link from 'next/link'
import { AdminShell, AdminTable, Pill, Th } from '@/components/admin/shell'
import { auctions } from '@/lib/auctions'
import { reservePrices } from '@/lib/crm'
import { formatRub, getLot } from '@/lib/lots'

export const metadata: Metadata = { title: 'Торги — ЛОТДОМ', robots: { index: false } }

export default function AdminAuctionsPage() {
  return (
    <AdminShell active="/admin/auctions" title="Торги">
      <AdminTable
        minWidth={1040}
        head={
          <tr>
            <Th>Объект</Th>
            <Th>Статус</Th>
            <Th right>Старт</Th>
            <Th right>Текущая ставка</Th>
            <Th right>Резерв</Th>
            <Th right>Участники</Th>
            <Th right>Ставки</Th>
            <Th>Окончание</Th>
            <Th>Ссылки</Th>
          </tr>
        }
      >
        {Object.values(auctions).map((a) => {
          const lot = getLot(a.propertySlug)!
          const live = lot.stage === 'auction'
          return (
            <tr key={a.id}>
              <th scope="row" className="text-left font-medium">
                {a.location}
                <span className="block text-xs font-normal text-muted-foreground">{a.id}</span>
              </th>
              <td>
                <Pill tone={live ? 'brand' : 'default'}>{live ? 'Идут' : `Запланированы · ${lot.auctionDate}`}</Pill>
              </td>
              <td className="tabular text-right">{formatRub(a.startPrice)}</td>
              <td className="tabular text-right">{live ? formatRub(a.bids[0].amount) : '—'}</td>
              <td className="tabular text-right">
                {formatRub(reservePrices[a.propertySlug])}
                <span className="block text-xs text-muted-foreground">
                  {live ? (a.reserveMet ? 'достигнут' : 'не достигнут') : '—'}
                </span>
              </td>
              <td className="tabular text-right">{a.participants}</td>
              <td className="tabular text-right">{live ? a.bids.length : '—'}</td>
              <td className="text-muted-foreground">{a.endsAt}</td>
              <td>
                <span className="flex gap-3 whitespace-nowrap">
                  <Link href={`/auction/${a.id}`} className="hover:underline">
                    Комната
                  </Link>
                  <Link href={`/auction/${a.id}/result`} className="text-muted-foreground hover:underline">
                    Итог
                  </Link>
                </span>
              </td>
            </tr>
          )
        })}
      </AdminTable>
    </AdminShell>
  )
}
