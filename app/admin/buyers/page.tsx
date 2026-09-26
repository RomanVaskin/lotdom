import type { Metadata } from 'next'
import { AdminShell, AdminTable, Pill, Th } from '@/components/admin/shell'
import { VERIFICATION_STATUS_LABEL, participants, type VerificationStatus } from '@/lib/crm'
import { getLot, lotShortName } from '@/lib/lots'

export const metadata: Metadata = { title: 'Покупатели — ЛОТДОМ', robots: { index: false } }

const tone: Record<VerificationStatus, 'default' | 'brand' | 'dark' | 'muted'> = {
  missing: 'muted',
  uploaded: 'default',
  reviewing: 'default',
  passed: 'brand',
}

export default function AdminBuyersPage() {
  return (
    <AdminShell active="/admin/buyers" title="Покупатели">
      <AdminTable
        head={
          <tr>
            <Th>Покупатель</Th>
            <Th>Объект</Th>
            <Th>Подтверждение средств</Th>
            <Th>Проверка</Th>
            <Th>Номер в торгах</Th>
          </tr>
        }
      >
        {participants.map((p) => (
          <tr key={`${p.name}-${p.lotSlug}`}>
            <th scope="row" className="text-left font-medium">{p.name}</th>
            <td>{lotShortName(getLot(p.lotSlug)!)}</td>
            <td className="text-muted-foreground">{p.proof}</td>
            <td>
              <Pill tone={tone[p.verification]}>{VERIFICATION_STATUS_LABEL[p.verification]}</Pill>
            </td>
            <td className="tabular">{p.number ? `Участник №${p.number}` : '—'}</td>
          </tr>
        ))}
      </AdminTable>
      <p className="text-sm text-muted-foreground">
        Участники торгов видят друг друга только по номерам. Номер присваивается после допуска.
      </p>
    </AdminShell>
  )
}
