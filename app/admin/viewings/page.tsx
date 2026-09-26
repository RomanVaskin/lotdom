import type { Metadata } from 'next'
import { AdminShell, AdminTable, Pill, Th } from '@/components/admin/shell'
import { VIEWING_STATUS_LABEL, viewings } from '@/lib/crm'
import { getLot, lotShortName } from '@/lib/lots'

export const metadata: Metadata = { title: 'Показы — ЛОТДОМ', robots: { index: false } }

export default function AdminViewingsPage() {
  return (
    <AdminShell active="/admin/viewings" title="Показы">
      <AdminTable
        minWidth={640}
        head={
          <tr>
            <Th>Дата и время</Th>
            <Th>Объект</Th>
            <Th>Покупатель</Th>
            <Th>Статус</Th>
          </tr>
        }
      >
        {viewings.map((v) => (
          <tr key={v.id}>
            <th scope="row" className="tabular text-left font-medium">
              {v.date}, {v.time}
            </th>
            <td>{lotShortName(getLot(v.lotSlug)!)}</td>
            <td className="text-muted-foreground">{v.buyer}</td>
            <td>
              <Pill tone={v.status === 'scheduled' ? 'default' : 'muted'}>{VIEWING_STATUS_LABEL[v.status]}</Pill>
            </td>
          </tr>
        ))}
      </AdminTable>
    </AdminShell>
  )
}
