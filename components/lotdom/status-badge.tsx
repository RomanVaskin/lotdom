import { cn } from '@/lib/utils'
import { STAGE_LABEL, type LotStage } from '@/lib/lots'

const tone: Record<LotStage, string> = {
  preparation: 'bg-muted text-muted-foreground',
  collecting: 'bg-card text-foreground ring-1 ring-border',
  viewings: 'bg-card text-foreground ring-1 ring-border',
  auction: 'bg-brand text-brand-foreground',
  sold: 'bg-foreground text-background',
  withdrawn: 'bg-muted text-muted-foreground line-through decoration-muted-foreground/50',
}

const dot: Record<LotStage, string> = {
  preparation: 'bg-muted-foreground/50',
  collecting: 'bg-brand',
  viewings: 'bg-foreground',
  auction: 'bg-brand-foreground',
  sold: 'bg-background',
  withdrawn: 'bg-muted-foreground/50',
}

export function StatusBadge({
  stage,
  label,
  className,
}: {
  stage: LotStage
  label?: string
  className?: string
}) {
  return (
    <span
      className={cn(
        'inline-flex h-7 items-center gap-2 rounded-full px-3 text-xs font-medium',
        tone[stage],
        className,
      )}
    >
      <span className="relative flex size-1.5" aria-hidden>
        {stage === 'auction' && (
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-brand-foreground/70" />
        )}
        <span className={cn('relative inline-flex size-1.5 rounded-full', dot[stage])} />
      </span>
      {label ?? STAGE_LABEL[stage]}
    </span>
  )
}
