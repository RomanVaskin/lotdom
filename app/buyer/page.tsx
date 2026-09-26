import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight, ShieldCheck } from 'lucide-react'
import { SiteHeader } from '@/components/lotdom/site-header'
import { SiteFooter } from '@/components/lotdom/site-footer'
import { ObjectSummary } from '@/components/lotdom/object-summary'
import { buttonVariants } from '@/components/ui/button'
import { getAuction } from '@/lib/auctions'
import { VERIFICATION_STATUS_LABEL, VIEWING_STATUS_LABEL, participants, viewings } from '@/lib/crm'
import { STAGE_LABEL, formatRub, getLot, lotHref, lots } from '@/lib/lots'
import { cn } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Кабинет покупателя — ЛОТДОМ',
  robots: { index: false },
}

function Panel({ title, aside, children }: { title: string; aside?: React.ReactNode; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-5 rounded-2xl bg-card p-6 ring-1 ring-border md:p-8">
      <div className="flex items-baseline justify-between gap-4">
        <h2 className="text-lg font-medium tracking-tight">{title}</h2>
        {aside}
      </div>
      {children}
    </section>
  )
}

export default function BuyerPage() {
  const mine = participants.filter((p) => p.isMe)
  const myViewings = viewings.filter((v) => v.isMe)
  const admitted = mine.filter((p) => p.verification === 'passed')
  const live = admitted
    .map((p) => {
      const lot = getLot(p.lotSlug)
      const auction = lot?.auctionId ? getAuction(lot.auctionId) : undefined
      return lot && auction && lot.stage === 'auction' ? { lot, auction, number: p.number } : null
    })
    .filter((x) => x !== null)

  return (
    <>
      <SiteHeader />
      <main className="mx-auto flex max-w-7xl flex-col gap-8 px-5 py-12 md:px-8 lg:py-16">
        <header className="flex flex-col gap-3">
          <p className="text-sm text-muted-foreground">Кабинет покупателя · демо</p>
          <h1 className="text-balance text-4xl font-medium tracking-tight md:text-5xl">Ваши объекты и торги</h1>
        </header>

        {live.map(({ lot, auction, number }) => (
          <section
            key={auction.id}
            aria-label="Активные торги"
            className="flex flex-col gap-6 rounded-2xl bg-foreground p-6 text-background md:flex-row md:items-center md:justify-between md:p-8"
          >
            <div className="flex flex-col gap-2">
              <p className="flex items-center gap-2 text-sm text-background/60">
                <span aria-hidden className="size-1.5 rounded-full bg-brand-soft" />
                Активные торги · вы Участник №{number}
              </p>
              <p className="text-2xl font-medium tracking-tight">
                {lot.type}, {lot.location}
              </p>
              <p className="tabular text-sm text-background/60">
                Текущая ставка {formatRub(auction.bids[0].amount)} · окончание {auction.endsAt}
              </p>
            </div>
            <Link
              href={`/auction/${auction.id}`}
              className={cn(buttonVariants({ size: 'xl' }), 'bg-background text-foreground [a]:hover:bg-background/90')}
            >
              Перейти к торгам
              <ArrowRight aria-hidden />
            </Link>
          </section>
        ))}

        <div className="grid gap-4 lg:grid-cols-2">
          <Panel title="Проверка и допуск" aside={<span className="text-sm text-muted-foreground">Допусков: {admitted.length}</span>}>
            <ul className="flex flex-col">
              {mine.map((p) => {
                const lot = getLot(p.lotSlug)!
                const passed = p.verification === 'passed'
                return (
                  <li key={p.lotSlug} className="flex flex-col gap-3 border-b border-border py-4 first:pt-0 last:border-b-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex flex-col gap-1">
                      <p className="font-medium">
                        {lot.type}, {lot.location}
                      </p>
                      <p className="flex items-center gap-2 text-sm text-muted-foreground">
                        {passed && <ShieldCheck aria-hidden className="size-4 text-brand" />}
                        {passed ? `Допущен · Участник №${p.number}` : VERIFICATION_STATUS_LABEL[p.verification]}
                      </p>
                    </div>
                    <Link
                      href={`/buyer/verification?lot=${lot.slug}`}
                      className={cn(buttonVariants({ variant: passed ? 'ghost' : 'outline' }), 'h-9 self-start px-4 sm:self-auto')}
                    >
                      {passed ? 'Детали допуска' : 'Подтвердить средства'}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </Panel>

          <Panel title="Назначенные показы">
            <ul className="flex flex-col">
              {myViewings.map((v) => {
                const lot = getLot(v.lotSlug)!
                return (
                  <li key={v.id} className="flex items-center justify-between gap-4 border-b border-border py-4 first:pt-0 last:border-b-0 last:pb-0">
                    <div className="flex flex-col gap-1">
                      <p className="tabular font-medium">
                        {v.date}, {v.time}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {lot.type}, {lot.location} · {VIEWING_STATUS_LABEL[v.status]}
                      </p>
                    </div>
                    <Link
                      href={`/properties/${lot.slug}`}
                      className="inline-flex shrink-0 items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
                    >
                      Объект
                      <ArrowUpRight aria-hidden className="size-4" />
                    </Link>
                  </li>
                )
              })}
            </ul>
            <Link href="/buyer/viewing?lot=ramenki-86" className={cn(buttonVariants({ variant: 'outline' }), 'h-9 self-start px-4')}>
              Записаться на показ
            </Link>
          </Panel>
        </div>

        <Panel title="Интересующие объекты" aside={<Link href="/properties" className="text-sm text-muted-foreground hover:text-foreground">Все лоты</Link>}>
          <ul className="grid gap-4 md:grid-cols-3">
            {lots.map((lot) => (
              <li key={lot.slug}>
                <Link
                  href={lotHref(lot)}
                  className="flex h-full flex-col gap-4 rounded-xl bg-background p-4 ring-1 ring-border transition-colors hover:bg-muted/60"
                >
                  <ObjectSummary lot={lot} statusLabel={STAGE_LABEL[lot.stage]} />
                  <p className="tabular mt-auto border-t border-border pt-3 text-sm text-muted-foreground">
                    {lot.currentBid ? `Текущая ставка ${formatRub(lot.currentBid)}` : `Старт ${formatRub(lot.startPrice)}`}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </Panel>
      </main>
      <SiteFooter />
    </>
  )
}
