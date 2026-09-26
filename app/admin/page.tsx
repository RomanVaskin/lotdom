import type { Metadata } from 'next'
import Link from 'next/link'
import { AdminShell } from '@/components/admin/shell'
import { Funnel, Kpis, ObjectsTable, SaleParams } from '@/components/admin/overview'
import { StatusBadge } from '@/components/lotdom/status-badge'
import { lotShortName, lots } from '@/lib/lots'

export const metadata: Metadata = {
  title: 'Кабинет агентства — ЛОТДОМ',
  robots: { index: false },
}

export default function AdminPage() {
  const focus = lots[0]
  const active = lots.filter((l) => l.stage !== 'sold' && l.stage !== 'withdrawn').length

  return (
    <AdminShell active="/admin" title="Обзор">
      <Kpis />

      <section aria-labelledby="objects" className="flex flex-col gap-4">
        <div className="flex items-baseline justify-between">
          <h2 id="objects" className="text-base font-medium">Объекты в работе</h2>
          <Link href="/admin/objects" className="text-sm text-muted-foreground hover:text-foreground">
            {active} активных
          </Link>
        </div>
        <ObjectsTable />
      </section>

      <section aria-labelledby="object-card" className="grid gap-6 xl:grid-cols-3">
        <div className="flex flex-col gap-6 rounded-xl bg-card p-6 ring-1 ring-border xl:col-span-2">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-col gap-1">
              <h2 id="object-card" className="font-medium">{lotShortName(focus)}</h2>
              <p className="text-sm text-muted-foreground">Воронка покупателей</p>
            </div>
            <StatusBadge stage={focus.stage} />
          </div>
          <Funnel lot={focus} />
        </div>
        <SaleParams lot={focus} />
      </section>
    </AdminShell>
  )
}
