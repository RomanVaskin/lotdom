import { Check } from 'lucide-react'
import { STAGE_LABEL, STAGE_ORDER, type LotStage } from '@/lib/lots'
import { cn } from '@/lib/utils'

/** Horizontal sale-stage tracker shared by the seller dashboard and admin object list. */
export function StageProgress({ stage, className }: { stage: LotStage; className?: string }) {
  const current = STAGE_ORDER.indexOf(stage)
  return (
    <ol className={cn('grid grid-cols-5 gap-2', className)} aria-label="Этапы продажи">
      {STAGE_ORDER.map((s, i) => {
        const state = current === -1 ? 'upcoming' : i < current ? 'done' : i === current ? 'current' : 'upcoming'
        return (
          <li key={s} className="flex flex-col gap-2" aria-current={state === 'current' ? 'step' : undefined}>
            <span
              aria-hidden
              className={cn('h-1 rounded-full', state === 'upcoming' ? 'bg-border' : 'bg-brand')}
            />
            <span
              className={cn(
                'flex items-center gap-1 text-xs',
                state === 'current' ? 'font-medium text-foreground' : 'text-muted-foreground',
              )}
            >
              {state === 'done' && <Check aria-hidden className="size-3 shrink-0 text-brand" />}
              {s === 'auction' ? 'Торги' : STAGE_LABEL[s]}
            </span>
          </li>
        )
      })}
    </ol>
  )
}
