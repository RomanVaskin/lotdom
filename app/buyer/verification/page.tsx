import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { SiteHeader } from '@/components/lotdom/site-header'
import { SiteFooter } from '@/components/lotdom/site-footer'
import { VerificationFlow } from '@/components/buyer/verification-flow'
import { getAuction } from '@/lib/auctions'
import { leads, viewings } from '@/lib/crm'
import { getLot, lots } from '@/lib/lots'

export const metadata: Metadata = {
  title: 'Допуск к торгам — ЛОТДОМ',
  description: 'Подтвердите платёжеспособность, чтобы участвовать в торгах по объекту.',
}

export default async function VerificationPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const { lot: slug } = await searchParams
  const lot = getLot(typeof slug === 'string' ? slug : undefined) ?? lots[0]
  const auction = lot.auctionId ? getAuction(lot.auctionId) : undefined
  const myLead = leads.find((l) => l.lotSlug === lot.slug && l.isMe)
  const myViewing = viewings.find((v) => v.lotSlug === lot.slug && v.isMe)

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
          <h1 className="text-balance text-4xl font-medium tracking-tight md:text-5xl">Допуск к торгам</h1>
        </div>
        <VerificationFlow
          lot={lot}
          auctionHref={auction ? `/auction/${auction.id}` : undefined}
          bidStep={auction?.step}
          applicationDate={myLead?.createdAt ?? '24 сентября'}
          viewingDate={myViewing ? `${myViewing.date}, ${myViewing.time}` : 'Пройден'}
        />
      </main>
      <SiteFooter />
    </>
  )
}
