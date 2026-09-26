import Link from 'next/link'
import { CalendarDays, Gavel, Info, Users } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { StatusBadge } from '@/components/lotdom/status-badge'
import { formatRub } from '@/lib/lots'
import { cn } from '@/lib/utils'

type Props = {
  startPrice: number
  interested: number
  nextViewing: string
  auctionDate: string
  auctionHref: string
}

export function InfoPanel({ startPrice, interested, nextViewing, auctionDate, auctionHref }: Props) {
  return (
    <aside
      aria-label="Условия лота"
      className="flex flex-col gap-6 rounded-2xl bg-card p-6 ring-1 ring-border lg:sticky lg:top-24"
    >
      <div className="flex items-center justify-between">
        <StatusBadge stage="collecting" />
        <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
          <Users aria-hidden className="size-4" />
          {interested} заинтересованных
        </span>
      </div>

      <div className="flex flex-col gap-1">
        <p className="tabular text-4xl font-medium tracking-tight">{formatRub(startPrice)}</p>
        <p className="text-sm text-muted-foreground">Стартовая цена</p>
      </div>

      <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-lg bg-border">
        <div className="flex flex-col gap-1 bg-muted/60 p-4">
          <dt className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
            <CalendarDays aria-hidden className="size-3.5" />
            Следующий показ
          </dt>
          <dd className="font-medium">{nextViewing}</dd>
        </div>
        <div className="flex flex-col gap-1 bg-muted/60 p-4">
          <dt className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
            <Gavel aria-hidden className="size-3.5" />
            Торги
          </dt>
          <dd className="font-medium">
            {auctionDate} <span className="text-xs font-normal text-muted-foreground">(план)</span>
          </dd>
        </div>
      </dl>

      <div className="flex flex-col gap-3">
        <Link href="#" className={cn(buttonVariants({ size: 'xl' }), 'w-full')}>
          Записаться на просмотр
        </Link>
        <Link href={auctionHref} className={cn(buttonVariants({ size: 'xl', variant: 'outline' }), 'w-full')}>
          Участвовать в торгах
        </Link>
      </div>

      <p className="flex gap-2.5 rounded-lg bg-brand-soft p-4 text-sm leading-relaxed text-foreground">
        <Info aria-hidden className="mt-0.5 size-4 shrink-0 text-brand" />
        Для участия необходимо посетить показ и подтвердить платёжеспособность.
      </p>

      <div className="flex items-center gap-3 border-t border-border pt-5">
        <span className="grid size-10 place-items-center rounded-full bg-muted text-sm font-medium">
          АК
        </span>
        <div className="flex flex-col">
          <span className="text-sm font-medium">Анна Королёва</span>
          <span className="text-xs text-muted-foreground">Менеджер объекта</span>
        </div>
      </div>
    </aside>
  )
}
