import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, CalendarDays, Check, FileBarChart } from 'lucide-react'
import { SiteHeader } from '@/components/lotdom/site-header'
import { SiteFooter } from '@/components/lotdom/site-footer'
import { ObjectSummary } from '@/components/lotdom/object-summary'
import { StageProgress } from '@/components/lotdom/stage-progress'
import { KpiRow } from '@/components/seller/report'
import { buttonVariants } from '@/components/ui/button'
import { VIEWING_STATUS_LABEL, sellerReport, viewings } from '@/lib/crm'
import { STAGE_LABEL, getLot, manager } from '@/lib/lots'
import { cn } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Кабинет продавца — ЛОТДОМ',
  robots: { index: false },
}

export default async function SellerPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const { strategy } = await searchParams
  const lot = getLot(sellerReport.lotSlug)!
  const lotViewings = viewings.filter((v) => v.lotSlug === lot.slug)

  return (
    <>
      <SiteHeader />
      <main className="mx-auto flex max-w-7xl flex-col gap-8 px-5 py-12 md:px-8 lg:py-16">
        <header className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex flex-col gap-3">
            <p className="text-sm text-muted-foreground">Кабинет продавца</p>
            <h1 className="text-balance text-4xl font-medium tracking-tight md:text-5xl">Ваш объект</h1>
          </div>
          <Link href="/seller/report" className={cn(buttonVariants({ size: 'xl' }), 'self-start lg:self-auto')}>
            <FileBarChart aria-hidden />
            Отчёт за {sellerReport.period}
          </Link>
        </header>

        {strategy === 'confirmed' && (
          <p role="status" className="flex items-start gap-3 rounded-xl bg-brand-soft p-4 text-sm leading-relaxed">
            <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-brand" />
            Стратегия подтверждена. Менеджер подготовит объект к переходу в торги и согласует с вами дату.
          </p>
        )}

        <section
          aria-label="Объект и статус"
          className="flex flex-col gap-6 rounded-2xl bg-card p-6 ring-1 ring-border md:p-8"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <ObjectSummary lot={lot} statusLabel={STAGE_LABEL[lot.stage]} />
            <Link
              href={`/properties/${lot.slug}`}
              className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
            >
              Публичная карточка
              <ArrowRight aria-hidden className="size-4" />
            </Link>
          </div>
          <StageProgress stage={lot.stage} />
        </section>

        <KpiRow metrics={lot.metrics} />

        <div className="grid gap-4 lg:grid-cols-12">
          <section
            aria-labelledby="viewings-title"
            className="flex flex-col gap-6 rounded-2xl bg-card p-6 ring-1 ring-border md:p-8 lg:col-span-7"
          >
            <div className="flex items-baseline justify-between gap-4">
              <h2 id="viewings-title" className="text-lg font-medium tracking-tight">
                Показы
              </h2>
              <span className="text-sm text-muted-foreground">
                {lot.metrics.viewings} проведено · {lot.metrics.viewingsPlanned} запланировано
              </span>
            </div>
            <ul className="flex flex-col">
              {lotViewings.map((v) => (
                <li
                  key={v.id}
                  className="flex items-center justify-between gap-4 border-b border-border py-3 text-sm last:border-b-0"
                >
                  <span className="tabular font-medium">
                    {v.date}, {v.time}
                  </span>
                  <span className="text-muted-foreground">{VIEWING_STATUS_LABEL[v.status]}</span>
                </li>
              ))}
            </ul>
            <p className="text-sm text-muted-foreground">
              Имена покупателей видит только агентство. Допущено к торгам: {lot.metrics.admitted}.
            </p>
          </section>

          <div className="flex flex-col gap-4 lg:col-span-5">
            <section
              aria-labelledby="checkpoint-title"
              className="flex flex-col gap-4 rounded-2xl bg-card p-6 ring-1 ring-border sm:flex-row sm:items-center md:p-8"
            >
              <div className="flex size-14 shrink-0 items-center justify-center rounded-xl bg-muted">
                <CalendarDays className="size-5" aria-hidden />
              </div>
              <div className="flex flex-col gap-1">
                <h2 id="checkpoint-title" className="text-sm text-muted-foreground">
                  Следующий контрольный этап
                </h2>
                <p className="text-xl font-medium tracking-tight">{sellerReport.checkpoint}</p>
                <p className="text-pretty text-sm leading-relaxed text-muted-foreground">
                  Оцениваем динамику спроса и решаем о переходе в торги. План торгов — {lot.auctionDate}.
                </p>
              </div>
            </section>

            <section
              aria-label="Менеджер объекта"
              className="flex flex-1 flex-col justify-between gap-6 rounded-2xl bg-foreground p-6 text-background md:p-8"
            >
              <div className="flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-full bg-background/10 text-sm font-medium">
                  {manager.initials}
                </span>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{manager.name}</span>
                  <span className="text-xs text-background/60">{manager.role}</span>
                </div>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/seller/report"
                  className={cn(buttonVariants({ size: 'xl' }), 'bg-background text-foreground [a]:hover:bg-background/90')}
                >
                  Открыть отчёт
                </Link>
                <a
                  href={manager.phoneHref}
                  className={cn(
                    buttonVariants({ variant: 'outline', size: 'xl' }),
                    'border-background/25 bg-transparent text-background hover:bg-background/10 hover:text-background',
                  )}
                >
                  Позвонить
                </a>
              </div>
            </section>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
