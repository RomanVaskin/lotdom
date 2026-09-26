import type { Metadata } from 'next'
import Link from 'next/link'
import { AdminShell, AdminTable, Th } from '@/components/admin/shell'
import { StatusBadge } from '@/components/lotdom/status-badge'
import { nextActions, reservePrices } from '@/lib/crm'
import { STAGE_LABEL, formatRub, lotHref, lotShortName, lots, type LotStage } from '@/lib/lots'

export const metadata: Metadata = { title: 'Объекты — ЛОТДОМ', robots: { index: false } }

const statuses: LotStage[] = ['preparation', 'collecting', 'viewings', 'auction', 'sold', 'withdrawn']
const label = (s: LotStage) => (s === 'auction' ? 'Торги' : STAGE_LABEL[s])

export default function AdminObjectsPage() {
  return (
    <AdminShell active="/admin/objects" title="Объекты">
      <ul aria-label="Статусы объектов" className="flex flex-wrap gap-2">
        {statuses.map((s) => (
          <li key={s}>
            <StatusBadge stage={s} label={`${label(s)} · ${lots.filter((l) => l.stage === s).length}`} />
          </li>
        ))}
      </ul>

      <AdminTable
        minWidth={960}
        head={
          <tr>
            <Th>Объект</Th>
            <Th>Статус</Th>
            <Th right>Старт</Th>
            <Th right>Резерв</Th>
            <Th right>Текущая ставка</Th>
            <Th right>Лиды</Th>
            <Th right>Показы</Th>
            <Th right>Допущены</Th>
            <Th>Следующее действие</Th>
          </tr>
        }
      >
        {lots.map((lot) => (
          <tr key={lot.slug} id={lot.slug} className="scroll-mt-24">
            <th scope="row" className="text-left font-medium">
              <Link href={lotHref(lot)} className="hover:underline">
                {lotShortName(lot)}
              </Link>
            </th>
            <td>
              <StatusBadge stage={lot.stage} label={label(lot.stage)} />
            </td>
            <td className="tabular text-right">{formatRub(lot.startPrice)}</td>
            <td className="tabular text-right">{formatRub(reservePrices[lot.slug])}</td>
            <td className="tabular text-right">{lot.currentBid ? formatRub(lot.currentBid) : '—'}</td>
            <td className="tabular text-right">{lot.metrics.leads}</td>
            <td className="tabular text-right">{lot.metrics.viewings}</td>
            <td className="tabular text-right">{lot.metrics.admitted}</td>
            <td className="text-muted-foreground">{nextActions[lot.slug]}</td>
          </tr>
        ))}
      </AdminTable>
      <p className="text-sm text-muted-foreground">
        Резервная цена видна только агентству и продавцу и не публикуется на сайте.
      </p>
    </AdminShell>
  )
}
