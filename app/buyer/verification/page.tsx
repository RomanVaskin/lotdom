import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { SiteHeader } from '@/components/lotdom/site-header'
import { SiteFooter } from '@/components/lotdom/site-footer'
import { VerificationFlow } from '@/components/buyer/verification-flow'
import { lots } from '@/lib/lots'

export const metadata: Metadata = {
  title: 'Допуск к торгам — ЛОТДОМ',
  description: 'Подтвердите платёжеспособность, чтобы участвовать в торгах по объекту.',
}

export default function VerificationPage() {
  const lot = lots[0]

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
        <VerificationFlow lot={lot} auctionHref={`/auction/${lot.auctionId}`} />
      </main>
      <SiteFooter />
    </>
  )
}
