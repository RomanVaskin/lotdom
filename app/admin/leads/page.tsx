import type { Metadata } from 'next'
import { AdminShell, AdminTable, Pill, Th } from '@/components/admin/shell'
import { LEAD_STATUS_LABEL, leads, type LeadStatus } from '@/lib/crm'
import { getLot, lotShortName } from '@/lib/lots'

export const metadata: Metadata = { title: 'Лиды — ЛОТДОМ', robots: { index: false } }

const statuses = Object.keys(LEAD_STATUS_LABEL) as LeadStatus[]
const tone: Record<LeadStatus, 'default' | 'brand' | 'dark' | 'muted'> = {
  new: 'muted',
  contacted: 'default',
  qualified: 'default',
  viewing: 'default',
  admitted: 'brand',
  deal: 'dark',
}

export default function AdminLeadsPage() {
  return (
    <AdminShell active="/admin/leads" title="Лиды">
      <ul aria-label="Статусы лидов" className="flex flex-wrap gap-2">
        {statuses.map((s) => (
          <li key={s}>
            <Pill tone={tone[s]}>
              {LEAD_STATUS_LABEL[s]} · {leads.filter((l) => l.status === s).length}
            </Pill>
          </li>
        ))}
      </ul>
      <AdminTable
        head={
          <tr>
            <Th>Лид</Th>
            <Th>Контакт</Th>
            <Th>Объект</Th>
            <Th>Источник</Th>
            <Th>Статус</Th>
            <Th>Создан</Th>
          </tr>
        }
      >
        {leads.map((l) => (
          <tr key={l.id}>
            <th scope="row" className="text-left font-medium">
              <span className="block">{l.name}</span>
              <span className="text-xs font-normal text-muted-foreground">{l.id}</span>
            </th>
            <td className="tabular text-muted-foreground">{l.phone}</td>
            <td>{lotShortName(getLot(l.lotSlug)!)}</td>
            <td className="text-muted-foreground">{l.source}</td>
            <td>
              <Pill tone={tone[l.status]}>{LEAD_STATUS_LABEL[l.status]}</Pill>
            </td>
            <td className="text-muted-foreground">{l.createdAt}</td>
          </tr>
        ))}
      </AdminTable>
    </AdminShell>
  )
}
