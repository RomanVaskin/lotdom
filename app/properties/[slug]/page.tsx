import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import { SiteHeader } from '@/components/lotdom/site-header'
import { SiteFooter } from '@/components/lotdom/site-footer'
import { Gallery } from '@/components/property/gallery'
import { InfoPanel } from '@/components/property/info-panel'
import {
  AdmissionSteps,
  FloorPlan,
  LocationBlock,
  PhotoStrip,
  Reasons,
  Section,
  Specs,
} from '@/components/property/sections'
import { property } from '@/lib/property'

export const metadata: Metadata = {
  title: 'Современный дом, Новая Рига — ЛОТДОМ',
  description: '240 м², 15 соток, 4 спальни. Стартовая цена 38 000 000 ₽. Сбор покупателей.',
}

export default async function PropertyPage({ params }: { params: Promise<{ slug: string }> }) {
  await params
  const p = property

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-5 pb-24 pt-8 md:px-8">
        <Link href="/#lots" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
          <ChevronLeft aria-hidden className="size-4" />
          Все лоты
        </Link>

        <div className="mt-6 flex flex-col gap-2">
          <p className="text-sm text-muted-foreground">{p.type}</p>
          <h1 className="text-balance text-4xl font-medium tracking-tight md:text-5xl">
            {p.location}
            <span className="text-muted-foreground">{' · 240 м² · 15 соток · 4 спальни'}</span>
          </h1>
        </div>

        <div className="mt-8 grid gap-10 lg:grid-cols-12">
          <div className="flex flex-col gap-10 lg:col-span-8">
            <Gallery photos={p.photos} />

            <Section title="Характеристики">
              <Specs items={p.specs} />
            </Section>

            <Section title="Об объекте">
              <div className="flex max-w-2xl flex-col gap-4 leading-relaxed text-muted-foreground">
                <p>
                  Двухэтажный дом из клеёного бруса на последней линии посёлка у Новорижского шоссе.
                  Панорамное остекление гостиной выходит прямо в сосновый лес — участок граничит с
                  лесным массивом, соседей с этой стороны нет.
                </p>
                <p>
                  Дом полностью готов к проживанию: чистовая отделка, кухня, встроенные шкафы, тёплые
                  полы и система вентиляции. На первом этаже — гостиная-столовая со вторым светом,
                  кабинет и гостевая спальня; на втором — три спальни, включая мастер-спальню с
                  гардеробной.
                </p>
              </div>
            </Section>

            <Section title="Почему стоит посмотреть">
              <Reasons />
            </Section>

            <Section title="Галерея">
              <PhotoStrip photos={p.photos} />
            </Section>

            <Section title="Планировка">
              <FloorPlan />
            </Section>

            <Section title="Район">
              <LocationBlock address={p.address} />
            </Section>

            <Section title="Как попасть на торги">
              <AdmissionSteps />
            </Section>
          </div>

          <div className="lg:col-span-4">
            <InfoPanel
              startPrice={p.startPrice}
              interested={p.interested}
              nextViewing={p.nextViewing}
              auctionDate={p.auctionDate}
              auctionHref={`/auction/${p.auctionId}`}
            />
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
