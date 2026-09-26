import type { Metadata } from 'next'
import Link from 'next/link'
import { SiteHeader } from '@/components/lotdom/site-header'
import { SiteFooter } from '@/components/lotdom/site-footer'
import { LotCard } from '@/components/lotdom/lot-card'
import { AdmissionSteps, Section } from '@/components/property/sections'
import { STAGE_LABEL, lots, type LotStage } from '@/lib/lots'
import { cn } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Лоты — ЛОТДОМ',
  description: 'Объекты в продаже через торги: сбор покупателей, показы и открытые торги. Москва и Московская область.',
}

const filters: LotStage[] = ['collecting', 'viewings', 'auction']

export default async function PropertiesPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const { stage } = await searchParams
  const active = filters.find((f) => f === stage)
  const list = active ? lots.filter((l) => l.stage === active) : lots

  return (
    <>
      <SiteHeader />
      <main className="mx-auto flex max-w-7xl flex-col gap-10 px-5 pb-24 pt-12 md:px-8 lg:pt-16">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col gap-3">
            <p className="text-sm text-muted-foreground">Москва и Московская область</p>
            <h1 className="text-balance text-4xl font-medium tracking-tight md:text-5xl">Лоты</h1>
          </div>
          <p className="max-w-md text-pretty text-sm leading-relaxed text-muted-foreground">
            Резервная цена продавца конфиденциальна и не раскрывается участникам
          </p>
        </div>

        <nav aria-label="Этап продажи" className="-mx-5 overflow-x-auto px-5 md:mx-0 md:px-0">
          <ul className="flex w-max gap-2">
            {[undefined, ...filters].map((f) => {
              const selected = f === active
              return (
                <li key={f ?? 'all'}>
                  <Link
                    href={f ? `/properties?stage=${f}` : '/properties'}
                    aria-current={selected ? 'page' : undefined}
                    className={cn(
                      'inline-flex h-9 items-center rounded-full px-4 text-sm ring-1 transition-colors',
                      selected
                        ? 'bg-foreground text-background ring-foreground'
                        : 'bg-card text-muted-foreground ring-border hover:text-foreground',
                    )}
                  >
                    {f ? STAGE_LABEL[f] : 'Все'}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        {list.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {list.map((lot) => (
              <LotCard key={lot.slug} lot={lot} />
            ))}
          </div>
        ) : (
          <p className="rounded-xl bg-card p-8 text-muted-foreground ring-1 ring-border">
            Сейчас нет объектов на этом этапе.
          </p>
        )}

        <Section title="Как попасть на торги">
          <AdmissionSteps />
        </Section>
      </main>
      <SiteFooter />
    </>
  )
}
