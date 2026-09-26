import Link from 'next/link'
import { Lock, Plus } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { StatusBadge } from '@/components/lotdom/status-badge'
import { nextActions, reservePrices, sellerReport } from '@/lib/crm'
import { formatRub, lotShortName, lots, type Lot, type LotStage } from '@/lib/lots'
import { cn } from '@/lib/utils'

const kpis = [
  { label: 'Новые лиды', value: 18, hint: 'за 7 дней' },
  { label: 'Назначено показов', value: 11, hint: 'на эту неделю' },
  { label: 'Ожидают проверки', value: 4, hint: 'документы загружены' },
  { label: 'Торги скоро', value: 2, hint: 'в ближайшие 14 дней' },
]

export function Kpis() {
  return (
    <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-xl bg-border ring-1 ring-border lg:grid-cols-4">
      {kpis.map((k) => (
        <div key={k.label} className="flex flex-col gap-3 bg-card p-5">
          <dt className="text-sm text-muted-foreground">{k.label}</dt>
          <dd className="flex items-baseline gap-2">
            <span className="tabular text-3xl font-medium tracking-tight">{k.value}</span>
            <span className="text-xs text-muted-foreground">{k.hint}</span>
          </dd>
        </div>
      ))}
    </dl>
  )
}

export function ObjectsTable() {
  return (
    <div className="overflow-x-auto rounded-xl bg-card ring-1 ring-border">
      <table className="w-full min-w-[720px] text-sm">
        <thead className="border-b border-border text-left text-xs text-muted-foreground">
          <tr>
            <th scope="col" className="px-5 py-3 font-normal">Объект</th>
            <th scope="col" className="px-5 py-3 font-normal">Этап</th>
            <th scope="col" className="px-5 py-3 text-right font-normal">Лиды</th>
            <th scope="col" className="px-5 py-3 text-right font-normal">Показы</th>
            <th scope="col" className="px-5 py-3 text-right font-normal">Допущены</th>
            <th scope="col" className="px-5 py-3 font-normal">Следующее действие</th>
          </tr>
        </thead>
        <tbody>
          {lots.map((lot, i) => (
            <tr
              key={lot.slug}
              className={cn(
                'border-b border-border last:border-b-0 hover:bg-muted/50',
                i === 0 && 'bg-muted/60 shadow-[inset_2px_0_0_var(--foreground)]',
              )}
            >
              <th scope="row" className="px-5 py-3.5 text-left font-medium">
                <Link href={`/admin/objects#${lot.slug}`} className="hover:underline">
                  {lotShortName(lot)}
                </Link>
              </th>
              <td className="px-5 py-3.5">
                <StatusBadge stage={lot.stage} label={shortStage[lot.stage]} />
              </td>
              <td className="tabular px-5 py-3.5 text-right">{lot.metrics.leads}</td>
              <td className="tabular px-5 py-3.5 text-right">{lot.metrics.viewings}</td>
              <td className="tabular px-5 py-3.5 text-right">{lot.metrics.admitted}</td>
              <td className="px-5 py-3.5 text-muted-foreground">{nextActions[lot.slug]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

const shortStage: Partial<Record<LotStage, string>> = { collecting: 'Сбор', auction: 'Торги' }

export function Funnel({ lot }: { lot: Lot }) {
  const m = lot.metrics
  const funnel = [
    { label: 'Лидов', value: m.leads },
    { label: 'Квалифицировано', value: m.qualified },
    { label: 'Показов', value: m.viewings },
    { label: 'Подали документы', value: m.documents },
    { label: 'Допущено', value: m.admitted },
  ]
  const max = funnel[0].value
  return (
    <ol className="flex flex-col gap-3">
      {funnel.map((f, i) => {
        const prev = funnel[i - 1]?.value
        const conv = prev ? Math.round((f.value / prev) * 100) : null
        const isLast = i === funnel.length - 1
        return (
          <li key={f.label} className="grid grid-cols-[9rem_1fr_3rem] items-center gap-4 text-sm md:grid-cols-[11rem_1fr_3rem]">
            <span className="text-muted-foreground">{f.label}</span>
            <span className="relative h-8 overflow-hidden rounded-md bg-muted">
              <span
                className={cn('absolute inset-y-0 left-0 flex items-center rounded-md px-3', isLast ? 'bg-brand' : 'bg-foreground/85')}
                style={{ width: `${(f.value / max) * 100}%` }}
              >
                <span className="tabular text-sm font-medium text-background">{f.value}</span>
              </span>
            </span>
            <span className="tabular text-right text-xs text-muted-foreground">{conv ? `${conv}%` : ''}</span>
          </li>
        )
      })}
    </ol>
  )
}

export function SaleParams({ lot }: { lot: Lot }) {
  return (
    <div className="flex flex-col gap-6 rounded-xl bg-card p-6 ring-1 ring-border">
      <h3 className="font-medium">Параметры продажи</h3>
      <dl className="flex flex-col">
        <div className="flex items-baseline justify-between gap-4 border-b border-border py-3">
          <dt className="text-sm text-muted-foreground">Стартовая цена</dt>
          <dd className="tabular font-medium">{formatRub(lot.startPrice)}</dd>
        </div>
        <div className="flex flex-col gap-2 border-b border-border py-3">
          <div className="flex items-baseline justify-between gap-4">
            <dt className="text-sm text-muted-foreground">Резервная цена</dt>
            <dd className="tabular font-medium">{formatRub(reservePrices[lot.slug])}</dd>
          </div>
          <span className="inline-flex w-fit items-center gap-1.5 rounded-md bg-muted px-2 py-1 text-xs text-muted-foreground">
            <Lock aria-hidden className="size-3" />
            Видна только агентству и продавцу
          </span>
        </div>
        <div className="flex items-baseline justify-between gap-4 py-3">
          <dt className="text-sm text-muted-foreground">Контрольная точка</dt>
          <dd className="font-medium">{sellerReport.checkpoint}</dd>
        </div>
      </dl>
      <div className="mt-auto flex flex-col gap-2">
        <Link href="/admin/viewings" className={cn(buttonVariants({ size: 'xl' }), 'w-full')}>
          <Plus aria-hidden />
          Назначить показ
        </Link>
        <Link href="/admin/buyers" className={cn(buttonVariants({ size: 'xl', variant: 'outline' }), 'w-full')}>
          Допустить к торгам
        </Link>
      </div>
    </div>
  )
}
