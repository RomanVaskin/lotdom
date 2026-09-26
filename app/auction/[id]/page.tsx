import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowUpRight } from 'lucide-react'
import { SiteHeader } from '@/components/lotdom/site-header'
import { SiteFooter } from '@/components/lotdom/site-footer'
import { StatusBadge } from '@/components/lotdom/status-badge'
import { AuctionRoom } from '@/components/auction/auction-room'
import { auctions, getAuction } from '@/lib/auctions'
import { getLot } from '@/lib/lots'

type Params = { params: Promise<{ id: string }> }

export function generateStaticParams() {
  return Object.keys(auctions).map((id) => ({ id }))
}

export const dynamicParams = false

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { id } = await params
  const auction = getAuction(id)
  return {
    title: auction ? `Торги: ${auction.title}, ${auction.location} — ЛОТДОМ` : 'Торги — ЛОТДОМ',
    description: 'Открытые торги между допущенными покупателями.',
  }
}

export default async function AuctionPage({ params }: Params) {
  const { id } = await params
  const auction = getAuction(id)
  if (!auction) notFound()
  const lot = getLot(auction.propertySlug)
  // The buyer demo reaches this room before the lot's auction date — say so instead of pretending it is live.
  const scheduled = lot && lot.stage !== 'auction'

  return (
    <>
      <SiteHeader />
      <main className="mx-auto flex max-w-7xl flex-col gap-8 px-5 pb-24 pt-8 md:px-8">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <div className="relative size-16 shrink-0 overflow-hidden rounded-lg">
              <Image src={auction.image} alt="" fill sizes="64px" className="object-cover" />
            </div>
            <div className="flex flex-col gap-1">
              <h1 className="text-2xl font-medium tracking-tight md:text-3xl">
                {auction.title}, {auction.location}
              </h1>
              <p className="text-sm text-muted-foreground">{auction.specs}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <StatusBadge stage="auction" />
            <Link
              href={`/properties/${auction.propertySlug}`}
              className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
            >
              Карточка объекта
              <ArrowUpRight aria-hidden className="size-4" />
            </Link>
          </div>
        </div>

        {scheduled && (
          <p className="rounded-xl bg-muted/70 p-4 text-sm leading-relaxed text-muted-foreground">
            Демонстрационный режим: торги по объекту начнутся {lot.auctionDate}. Так будет выглядеть комната
            торгов для допущенного участника.
          </p>
        )}

        <AuctionRoom auction={auction} />
      </main>
      <SiteFooter />
    </>
  )
}
