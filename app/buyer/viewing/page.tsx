import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, MapPin } from 'lucide-react'
import { SiteHeader } from '@/components/lotdom/site-header'
import { SiteFooter } from '@/components/lotdom/site-footer'
import { StatusBadge } from '@/components/lotdom/status-badge'
import { ViewingBooking } from '@/components/buyer/viewing-booking'
import { formatRub, getLot, lots } from '@/lib/lots'

export const metadata: Metadata = {
  title: 'Запись на показ — ЛОТДОМ',
  description: 'Выберите удобную дату и время, чтобы посмотреть объект вместе с менеджером LotDom.',
}

export default async function ViewingPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const { lot: slug } = await searchParams
  const lot = getLot(typeof slug === 'string' ? slug : undefined) ?? lots[0]

  return (
    <>
      <SiteHeader />
      <main className="mx-auto flex max-w-7xl flex-col gap-10 px-5 py-12 md:px-8 lg:py-16">
        <div className="flex flex-col gap-4">
          <Link
            href={`/properties/${lot.slug}`}
            className="inline-flex items-center gap-2 self-start text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4" aria-hidden />К объекту
          </Link>
          <h1 className="text-balance text-4xl font-medium tracking-tight md:text-5xl">Запись на показ</h1>
        </div>

        <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
          <aside className="flex flex-col overflow-hidden rounded-2xl bg-card ring-1 ring-border lg:sticky lg:top-24 lg:col-span-4 lg:self-start">
            <div className="relative aspect-[4/3] bg-muted">
              <Image
                src={lot.image}
                alt={`${lot.type}, ${lot.location}`}
                fill
                sizes="(min-width: 1024px) 30vw, 100vw"
                className="object-cover"
              />
              <StatusBadge stage={lot.stage} className="absolute top-4 left-4" />
            </div>
            <div className="flex flex-col gap-4 p-6">
              <div className="flex flex-col gap-1">
                <h2 className="text-lg font-medium tracking-tight">{lot.type}</h2>
                <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <MapPin className="size-3.5" aria-hidden />
                  {lot.location} · {lot.specs.join(' · ')}
                </p>
              </div>
              <div className="flex items-baseline justify-between border-t border-border pt-4">
                <span className="text-sm text-muted-foreground">Стартовая цена</span>
                <span className="tabular font-medium">{formatRub(lot.startPrice)}</span>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Показ проводит менеджер LotDom. Посещение показа — обязательный шаг для допуска к торгам.
              </p>
            </div>
          </aside>

          <div className="lg:col-span-8">
            <ViewingBooking lot={lot} />
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
