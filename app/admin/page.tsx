import type { Metadata } from 'next'
import { Search } from 'lucide-react'
import { AdminSidebar } from '@/components/admin/sidebar'
import { Funnel, Kpis, ObjectsTable, SaleParams } from '@/components/admin/overview'
import { StatusBadge } from '@/components/lotdom/status-badge'

export const metadata: Metadata = {
  title: 'Кабинет агентства — ЛОТДОМ',
  robots: { index: false },
}

export default function AdminPage() {
  return (
    <div className="flex min-h-dvh bg-background">
      <AdminSidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-16 items-center justify-between gap-4 border-b border-border bg-card px-5 md:px-8">
          <h1 className="text-lg font-medium">Обзор</h1>
          <label className="flex h-9 w-full max-w-xs items-center gap-2 rounded-md bg-muted px-3 text-sm text-muted-foreground">
            <Search aria-hidden className="size-4" />
            <span className="sr-only">Поиск</span>
            <input
              type="search"
              placeholder="Объект, лид, участник"
              className="w-full bg-transparent text-foreground outline-none placeholder:text-muted-foreground"
            />
          </label>
        </header>

        <main className="flex flex-col gap-8 p-5 md:p-8">
          <Kpis />

          <section aria-labelledby="objects" className="flex flex-col gap-4">
            <div className="flex items-baseline justify-between">
              <h2 id="objects" className="text-base font-medium">Объекты в работе</h2>
              <span className="text-sm text-muted-foreground">3 активных</span>
            </div>
            <ObjectsTable />
          </section>

          <section aria-labelledby="object-card" className="grid gap-6 xl:grid-cols-3">
            <div className="flex flex-col gap-6 rounded-xl bg-card p-6 ring-1 ring-border xl:col-span-2">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-col gap-1">
                  <h2 id="object-card" className="font-medium">Новая Рига, дом 240 м²</h2>
                  <p className="text-sm text-muted-foreground">Воронка покупателей</p>
                </div>
                <StatusBadge stage="collecting" />
              </div>
              <Funnel />
            </div>
            <SaleParams />
          </section>
        </main>
      </div>
    </div>
  )
}
