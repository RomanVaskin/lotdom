import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
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
import { sellerReport } from '@/lib/crm'
import { STAGE_LABEL, getLot } from '@/lib/lots'

export const metadata: Metadata = {
  title: 'Отчёт по объекту — ЛОТДОМ',
  description: 'Результаты продвижения объекта: просмотры, лиды, показы и допуск покупателей к торгам.',
}

export default function SellerReportPage() {
  const lot = getLot(sellerReport.lotSlug)!

  return (
    <>
      <SiteHeader />
      <main className="mx-auto flex max-w-7xl flex-col gap-8 px-5 py-12 md:px-8 lg:py-16">
        <header className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex flex-col gap-3">
            <Link
              href="/seller"
              className="inline-flex items-center gap-2 self-start text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="size-4" aria-hidden />
              Кабинет продавца
            </Link>
            <p className="text-sm text-muted-foreground">Отчёт продавцу · {sellerReport.period}</p>
            <h1 className="text-balance text-4xl font-medium tracking-tight md:text-5xl">
              Как идёт продажа вашего дома
            </h1>
          </div>
          <ObjectSummary lot={lot} statusLabel={STAGE_LABEL[lot.stage]} />
        </header>

        <KpiRow metrics={lot.metrics} />

        <div className="grid gap-4 lg:grid-cols-12">
          <Funnel metrics={lot.metrics} />
          <InterestDynamics />
          <Sources />
          <NextCheckpoint date={sellerReport.checkpoint} />
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
