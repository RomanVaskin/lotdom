'use client'

import { useEffect, useState } from 'react'
import { CheckCircle2, Clock, ShieldCheck } from 'lucide-react'
import Link from 'next/link'
import { Button, buttonVariants } from '@/components/ui/button'
import { formatRub } from '@/lib/lots'
import { ANTI_SNIPING_SECONDS, type Auction, type Bid } from '@/lib/auctions'
import { cn } from '@/lib/utils'

function formatClock(total: number) {
  const s = Math.max(0, total)
  const h = Math.floor(s / 3600)
  const m = Math.floor((s % 3600) / 60)
  const sec = s % 60
  const mm = String(m).padStart(2, '0')
  const ss = String(sec).padStart(2, '0')
  return h > 0 ? `${h}:${mm}:${ss}` : `${mm}:${ss}`
}

function nowHHMM() {
  return new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
}

export function AuctionRoom({ auction }: { auction: Auction }) {
  const [bids, setBids] = useState<Bid[]>(auction.bids)
  const [secondsLeft, setSecondsLeft] = useState(auction.secondsLeft)
  const [confirming, setConfirming] = useState(false)
  const [extended, setExtended] = useState(false)

  useEffect(() => {
    const id = setInterval(() => setSecondsLeft((s) => (s > 0 ? s - 1 : 0)), 1000)
    return () => clearInterval(id)
  }, [])

  const current = bids[0].amount
  const leader = bids[0].participant
  const nextBid = current + auction.step
  const growth = ((current - auction.startPrice) / auction.startPrice) * 100
  const iAmLeading = leader === auction.me
  const finished = secondsLeft === 0

  function placeBid() {
    setBids((prev) => [{ participant: auction.me, amount: nextBid, time: nowHHMM() }, ...prev])
    setConfirming(false)
    if (secondsLeft < ANTI_SNIPING_SECONDS) {
      setSecondsLeft(ANTI_SNIPING_SECONDS)
      setExtended(true)
    }
  }

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
      {/* Live console */}
      <section
        aria-label="Ход торгов"
        className="flex min-w-0 flex-col gap-10 rounded-2xl bg-foreground p-6 text-background md:p-10 lg:col-span-8"
      >
        <div className="flex flex-col gap-3">
          <p className="text-sm text-background/60">Текущая ставка</p>
          <p
            className="tabular text-4xl font-medium leading-none tracking-tight sm:text-5xl md:text-7xl"
            aria-live="polite"
          >
            {formatRub(current)}
          </p>
          <p className="tabular text-sm text-background/60">
            {'Участник №'}
            {leader}
            {iAmLeading && <span className="text-brand-soft">{' (вы)'}</span>}
            {' · '}
            <span className="text-brand-soft">{`+${growth.toFixed(1).replace('.', ',')}%`}</span>
            {' к стартовой цене '}
            {formatRub(auction.startPrice)}
          </p>
        </div>

        {auction.reserveMet && (
          <p className="flex items-start gap-3 rounded-xl bg-background/[0.06] p-4 text-sm leading-relaxed ring-1 ring-background/10">
            <CheckCircle2 aria-hidden className="mt-0.5 size-4 shrink-0 text-brand-soft" />
            <span>
              <span className="font-medium">Условия продажи выполнены.</span>{' '}
              <span className="text-background/70">Торги продолжаются.</span>
            </span>
          </p>
        )}

        <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-xl bg-background/10 md:grid-cols-4">
          <div className="flex flex-col gap-2 bg-foreground p-4 md:p-5">
            <dt className="text-xs text-background/60">До окончания</dt>
            <dd
              className={cn(
                'tabular text-2xl font-medium md:text-3xl',
                secondsLeft < ANTI_SNIPING_SECONDS && !finished && 'text-brand-soft',
              )}
            >
              <time>{formatClock(secondsLeft)}</time>
            </dd>
            <dd className="text-xs text-background/50">до {auction.endsAt}</dd>
          </div>
          <div className="flex flex-col gap-2 bg-foreground p-4 md:p-5">
            <dt className="text-xs text-background/60">Участников</dt>
            <dd className="tabular text-2xl font-medium md:text-3xl">{auction.participants}</dd>
          </div>
          <div className="flex flex-col gap-2 bg-foreground p-4 md:p-5">
            <dt className="text-xs text-background/60">Ставок</dt>
            <dd className="tabular text-2xl font-medium md:text-3xl">{bids.length}</dd>
          </div>
          <div className="flex flex-col gap-2 bg-foreground p-4 md:p-5">
            <dt className="text-xs text-background/60">Шаг ставки</dt>
            <dd className="tabular text-lg font-medium md:text-2xl">{formatRub(auction.step)}</dd>
          </div>
        </dl>
      </section>

      {/* Bid panel */}
      <section
        aria-label="Сделать ставку"
        className="flex flex-col gap-6 rounded-2xl bg-card p-6 ring-1 ring-border lg:col-span-4"
      >
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-2 text-sm font-medium">
            <ShieldCheck aria-hidden className="size-4 text-brand" />
            Вы допущены
          </span>
          <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium">
            {'Участник №'}
            {auction.me}
          </span>
        </div>

        <div className="flex flex-col gap-1 border-t border-border pt-6">
          <p className="text-sm text-muted-foreground">Минимальная следующая ставка</p>
          <p className="tabular text-3xl font-medium tracking-tight">{formatRub(nextBid)}</p>
        </div>

        {iAmLeading ? (
          <p className="rounded-lg bg-brand-soft p-4 text-sm font-medium text-foreground">
            Ваша ставка лидирует. Мы сообщим, если её перебьют.
          </p>
        ) : confirming ? (
          <div className="flex flex-col gap-3 rounded-lg p-4 ring-1 ring-foreground">
            <p className="text-sm leading-relaxed">
              Подтвердите ставку <span className="tabular font-semibold">{formatRub(nextBid)}</span>.
              Ставка является обязательством и не может быть отозвана.
            </p>
            <div className="flex gap-2">
              <Button size="xl" className="flex-1" onClick={placeBid}>
                Подтвердить
              </Button>
              <Button size="xl" variant="outline" onClick={() => setConfirming(false)}>
                Отмена
              </Button>
            </div>
          </div>
        ) : (
          <Button size="xl" className="w-full" disabled={finished} onClick={() => setConfirming(true)}>
            {finished ? 'Торги завершены' : `Сделать ставку ${formatRub(nextBid)}`}
          </Button>
        )}

        <p className="mt-auto flex gap-2.5 text-sm leading-relaxed text-muted-foreground">
          <Clock aria-hidden className="mt-0.5 size-4 shrink-0" />
          {extended
            ? 'Торги продлены на 5 минут: ставка сделана в последние 5 минут.'
            : 'Ставка в последние 5 минут продлевает торги на 5 минут.'}
        </p>

        <Link
          href={`/auction/${auction.id}/result`}
          className={cn(buttonVariants({ variant: 'ghost', size: 'sm' }), 'self-start text-muted-foreground')}
        >
          Показать итог торгов (демо)
        </Link>
      </section>

      {/* History */}
      <section aria-label="История ставок" className="flex flex-col gap-4 lg:col-span-8">
        <div className="flex items-baseline justify-between">
          <h2 className="text-xl font-medium tracking-tight">История ставок</h2>
          <span className="text-sm text-muted-foreground">{bids.length} ставок</span>
        </div>
        <div className="overflow-x-auto rounded-xl bg-card ring-1 ring-border">
          <table className="w-full text-sm">
            <thead className="border-b border-border text-left text-xs text-muted-foreground">
              <tr>
                <th scope="col" className="px-5 py-3 font-normal">Участник</th>
                <th scope="col" className="px-5 py-3 text-right font-normal">Ставка</th>
                <th scope="col" className="px-5 py-3 text-right font-normal">Время</th>
              </tr>
            </thead>
            <tbody>
              {bids.map((b, i) => (
                <tr
                  key={`${b.amount}-${b.time}`}
                  className={cn('border-b border-border last:border-b-0', i === 0 && 'bg-brand-soft/60')}
                >
                  <td className="px-5 py-3.5">
                    <span className="inline-flex items-center gap-2">
                      {'Участник №'}
                      {b.participant}
                      {b.participant === auction.me && (
                        <span className="text-xs text-muted-foreground">(вы)</span>
                      )}
                      {i === 0 && (
                        <span className="rounded-full bg-brand px-2 py-0.5 text-[11px] font-medium text-brand-foreground">
                          Лидирует
                        </span>
                      )}
                    </span>
                  </td>
                  <td className={cn('tabular px-5 py-3.5 text-right', i === 0 ? 'font-semibold' : 'text-muted-foreground')}>
                    {formatRub(b.amount)}
                  </td>
                  <td className="tabular px-5 py-3.5 text-right text-muted-foreground">{b.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <aside aria-label="Правила торгов" className="flex flex-col gap-4 lg:col-span-4">
        <h2 className="text-xl font-medium tracking-tight">Правила</h2>
        <ul className="flex flex-col rounded-xl bg-card p-5 text-sm leading-relaxed ring-1 ring-border">
          {[
            'Участвуют только покупатели, прошедшие показ и проверку',
            'Участники видят только номера, без персональных данных',
            'Резервная цена продавца не раскрывается',
            'Ставка в последние 5 минут продлевает торги на 5 минут',
            'Победитель подписывает предварительный договор в течение 3 дней',
          ].map((r) => (
            <li key={r} className="border-b border-border py-2.5 text-muted-foreground first:pt-0 last:border-b-0 last:pb-0">
              {r}
            </li>
          ))}
        </ul>
      </aside>
    </div>
  )
}
