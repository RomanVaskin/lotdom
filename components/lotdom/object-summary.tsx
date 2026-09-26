import Image from 'next/image'
import { StatusBadge } from './status-badge'
import type { Lot } from '@/lib/lots'
import { cn } from '@/lib/utils'

export function ObjectSummary({
  lot,
  statusLabel,
  stage,
  className,
}: {
  lot: Lot
  statusLabel?: string
  stage?: Lot['stage']
  className?: string
}) {
  return (
    <div className={cn('flex items-center gap-4', className)}>
      <div className="relative size-16 shrink-0 overflow-hidden rounded-lg bg-muted">
        <Image src={lot.image} alt="" fill sizes="64px" className="object-cover" />
      </div>
      <div className="flex min-w-0 flex-col gap-1">
        <p className="truncate font-medium">{lot.type}</p>
        <p className="truncate text-sm text-muted-foreground">
          {lot.location} · {lot.specs.join(' · ')}
        </p>
        {statusLabel && (
          <StatusBadge stage={stage ?? lot.stage} label={statusLabel} className="mt-1 self-start" />
        )}
      </div>
    </div>
  )
}
