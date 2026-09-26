import Link from 'next/link'
import { CalendarDays, Gavel, Info, Users } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { StatusBadge } from '@/components/lotdom/status-badge'
import { formatRub, manager, type Lot } from '@/lib/lots'
import { cn } from '@/lib/utils'

type Props = {
  lot: Lot
  /** Set when the lot's auction is live: shown instead of the viewing date. */
  auctionEndsAt?: string
  participants?: number
}

export function InfoPanel({ lot, auctionEndsAt, participants }: Props) {
  const live = lot.stage === 'auction' && lot.auctionId
  const viewingHref = `/buyer/viewing?lot=${lot.slug}`
  const admissionHref = `/buyer/verification?lot=${lot.slug}`

  return (
    <aside
      aria-label="Условия лота"
      className="flex flex-col gap-6 rounded-2xl bg-card p-6 ring-1 ring-border lg:sticky lg:top-24"
    >
      <div className="flex items-center justify-between">
        <StatusBadge stage={lot.stage} />
        {live ? (
          <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
            <Users aria-hidden className="size-4" />
            {participants} участников
          </span>
        ) : (
          <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
            <Users aria-hidden className="size-4" />
            {lot.interested} заинтересованных
          </span>
        )}
      </div>

      {live && lot.currentBid ? (
        <div className="flex flex-col gap-1">
          <p className="tabular text-4xl font-medium tracking-tight text-brand">{formatRub(lot.currentBid)}</p>
          <p className="text-sm text-muted-foreground">
            Текущая ставка · старт {formatRub(lot.startPrice)}
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-1">
          <p className="tabular text-4xl font-medium tracking-tight">{formatRub(lot.startPrice)}</p>
          <p className="text-sm text-muted-foreground">Стартовая цена</p>
        </div>
      )}

      <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-lg bg-border">
        <div className="flex flex-col gap-1 bg-muted/60 p-4">
          <dt className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
            <CalendarDays aria-hidden className="size-3.5" />
            {live ? 'Показы' : 'Следующий показ'}
          </dt>
          <dd className="font-medium">{live ? 'Завершены' : lot.nextViewing}</dd>
        </div>
        <div className="flex flex-col gap-1 bg-muted/60 p-4">
          <dt className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
            <Gavel aria-hidden className="size-3.5" />
            {live ? 'Окончание торгов' : 'Торги'}
          </dt>
          <dd className="font-medium">
            {live ? (
              auctionEndsAt
            ) : (
              <>
                {lot.auctionDate} <span className="text-xs font-normal text-muted-foreground">(план)</span>
              </>
            )}
          </dd>
        </div>
      </dl>

      <div className="flex flex-col gap-3">
        {live ? (
          <>
            <Link href={`/auction/${lot.auctionId}`} className={cn(buttonVariants({ size: 'xl' }), 'w-full')}>
              Перейти к торгам
            </Link>
            <Link href={admissionHref} className={cn(buttonVariants({ size: 'xl', variant: 'outline' }), 'w-full')}>
              Статус допуска
            </Link>
          </>
        ) : (
          <>
            <Link href={viewingHref} className={cn(buttonVariants({ size: 'xl' }), 'w-full')}>
              Записаться на показ
            </Link>
            <Link href={admissionHref} className={cn(buttonVariants({ size: 'xl', variant: 'outline' }), 'w-full')}>
              Участвовать в торгах
            </Link>
          </>
        )}
      </div>

      <p className="flex gap-2.5 rounded-lg bg-brand-soft p-4 text-sm leading-relaxed text-foreground">
        <Info aria-hidden className="mt-0.5 size-4 shrink-0 text-brand" />
        {live
          ? 'Ставки делают только допущенные участники — прошедшие показ и проверку платёжеспособности.'
          : 'Для участия необходимо посетить показ и подтвердить платёжеспособность.'}
      </p>

      <div className="flex items-center gap-3 border-t border-border pt-5">
        <span className="grid size-10 place-items-center rounded-full bg-muted text-sm font-medium">
          {manager.initials}
        </span>
        <div className="flex flex-col">
          <span className="text-sm font-medium">{manager.name}</span>
          <a href={manager.phoneHref} className="text-xs text-muted-foreground hover:text-foreground">
            {manager.role} · {manager.phone}
          </a>
        </div>
      </div>
    </aside>
  )
}
