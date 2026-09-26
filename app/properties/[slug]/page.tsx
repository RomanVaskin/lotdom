import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
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
import { getAuction } from '@/lib/auctions'
import { STAGE_LABEL, formatRub, getLot, lots } from '@/lib/lots'
import { getProperty } from '@/lib/property'

type Params = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return lots.map((l) => ({ slug: l.slug }))
}

export const dynamicParams = false

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params
  const lot = getLot(slug)
  const p = getProperty(slug)
  if (!lot || !p) return {}
  return {
    title: `${lot.type}, ${lot.location} — ЛОТДОМ`,
    description: `${p.headline}. Стартовая цена ${formatRub(lot.startPrice)}. ${STAGE_LABEL[lot.stage]}.`,
  }
}

export default async function PropertyPage({ params }: Params) {
  const { slug } = await params
  const lot = getLot(slug)
  const p = getProperty(slug)
  if (!lot || !p) notFound()
  const auction = lot.auctionId ? getAuction(lot.auctionId) : undefined

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-5 pb-24 pt-8 md:px-8">
        <Link href="/properties" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
          <ChevronLeft aria-hidden className="size-4" />
          Все лоты
        </Link>

        <div className="mt-6 flex flex-col gap-2">
          <p className="text-sm text-muted-foreground">{lot.type}</p>
          <h1 className="text-balance text-4xl font-medium tracking-tight md:text-5xl">
            {lot.location}
            <span className="text-muted-foreground">{` · ${p.headline}`}</span>
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
                {p.description.map((text) => (
                  <p key={text}>{text}</p>
                ))}
              </div>
            </Section>

            <Section title="Почему стоит посмотреть">
              <Reasons items={p.reasons} />
            </Section>

            {p.photos.length > 1 && (
              <Section id="gallery" title="Галерея">
                <PhotoStrip photos={p.photos} />
              </Section>
            )}

            {p.floorPlan && (
              <Section title="Планировка">
                <FloorPlan plan={p.floorPlan} />
              </Section>
            )}

            <Section title="Район">
              <LocationBlock address={p.address} label={lot.location} nearby={p.nearby} />
            </Section>

            <Section title="Как попасть на торги">
              <AdmissionSteps />
            </Section>
          </div>

          <div className="lg:col-span-4">
            <InfoPanel lot={lot} auctionEndsAt={auction?.endsAt} participants={auction?.participants} />
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
