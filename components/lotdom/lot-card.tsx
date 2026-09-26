import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { StatusBadge } from './status-badge'
import { formatRub, lotHref, type Lot } from '@/lib/lots'

export function LotCard({ lot }: { lot: Lot }) {
  const href = lotHref(lot)

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-xl bg-card ring-1 ring-border transition-shadow hover:shadow-[0_12px_40px_-16px_oklch(0.22_0.012_250/0.25)]">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={lot.image}
          alt={`${lot.type}, ${lot.location}`}
          fill
          sizes="(min-width: 1024px) 400px, 100vw"
          className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        />
        <div className="absolute left-4 top-4">
          <StatusBadge stage={lot.stage} />
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-6 p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-1">
            <p className="text-sm text-muted-foreground">{lot.type}</p>
            <h3 className="text-xl font-medium tracking-tight">
              <Link href={href} className="after:absolute after:inset-0">
                {lot.location}
              </Link>
            </h3>
          </div>
          <ArrowUpRight
            aria-hidden
            className="mt-1 size-5 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground"
          />
        </div>

        <ul className="flex gap-4 text-sm text-muted-foreground">
          {lot.specs.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>

        <dl className="mt-auto grid grid-cols-2 gap-4 border-t border-border pt-5">
          <div className="flex flex-col gap-1">
            <dt className="text-xs text-muted-foreground">Стартовая цена</dt>
            <dd className="tabular text-[15px] font-medium">{formatRub(lot.startPrice)}</dd>
          </div>
          {lot.currentBid ? (
            <div className="flex flex-col gap-1">
              <dt className="text-xs text-brand">Текущая ставка</dt>
              <dd className="tabular text-[15px] font-semibold text-brand">
                {formatRub(lot.currentBid)}
              </dd>
            </div>
          ) : (
            <div className="flex flex-col gap-1">
              <dt className="text-xs text-muted-foreground">Интерес</dt>
              <dd className="text-[15px] font-medium">{lot.interested} заинтересованных</dd>
            </div>
          )}
        </dl>
      </div>
    </article>
  )
}
