import type { Metadata } from 'next'
import { SiteHeader } from '@/components/lotdom/site-header'
import { SiteFooter } from '@/components/lotdom/site-footer'
import { ObjectSummary } from '@/components/lotdom/object-summary'
import {
  Funnel,
  InterestDynamics,
  KpiRow,
  NextCheckpoint,
  Sources,
} from '@/components/seller/report'
import { lots } from '@/lib/lots'

export const metadata: Metadata = {
  title: 'Отчёт по объекту — ЛОТДОМ',
  description: 'Результаты продвижения объекта: просмотры, лиды, показы и допуск покупателей к торгам.',
}

export default function SellerReportPage() {
  const lot = lots[0]

  return (
    <>
      <SiteHeader />
      <main className="mx-auto flex max-w-7xl flex-col gap-8 px-5 py-12 md:px-8 lg:py-16">
        <header className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex flex-col gap-3">
            <p className="text-sm text-muted-foreground">Отчёт продавцу · 14–27 сентября</p>
            <h1 className="text-balance text-4xl font-medium tracking-tight md:text-5xl">
              Как идёт продажа вашего дома
            </h1>
          </div>
          <ObjectSummary lot={lot} statusLabel="Сбор покупателей" stage="collecting" />
        </header>

        <KpiRow />

        <div className="grid gap-4 lg:grid-cols-12">
          <Funnel />
          <InterestDynamics />
          <Sources />
          <NextCheckpoint />
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
