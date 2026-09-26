import Link from 'next/link'
import { CalendarDays } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const kpis = [
  { label: 'Просмотры карточки', value: '8 420', delta: '+12% к прошлой неделе' },
  { label: 'Новые лиды', value: '24', delta: '+18%' },
  { label: 'Квалифицированы', value: '14', delta: '58% от лидов' },
  { label: 'Проведено показов', value: '11', delta: '3 запланировано' },
  { label: 'Допущены к торгам', value: '8', delta: 'Цель — от 5' },
]

const funnel = [
  { label: 'Новые лиды', value: 24 },
  { label: 'Связались', value: 19 },
  { label: 'Квалифицированы', value: 14 },
  { label: 'Показ', value: 11 },
  { label: 'Допущены', value: 8 },
]

const dailyLeads = [1, 2, 1, 2, 1, 3, 1, 2, 1, 2, 3, 2, 1, 2]

const sources = [
  { label: 'ЦИАН', value: 9 },
  { label: 'Яндекс', value: 6 },
  { label: 'База покупателей', value: 5 },
  { label: 'Telegram', value: 4 },
]

function Panel({
  title,
  aside,
  children,
  className,
}: {
  title: string
  aside?: React.ReactNode
  children: React.ReactNode
  className?: string
}) {
  const id = `panel-${title.replace(/\s+/g, '-')}`
  return (
    <section
      aria-labelledby={id}
      className={cn('flex flex-col gap-6 rounded-2xl bg-card p-6 ring-1 ring-border md:p-8', className)}
    >
      <div className="flex items-baseline justify-between gap-4">
        <h2 id={id} className="text-lg font-medium tracking-tight">
          {title}
        </h2>
        {aside}
      </div>
      {children}
    </section>
  )
}

export function KpiRow() {
  return (
    <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-border ring-1 ring-border md:grid-cols-5">
      {kpis.map((k, i) => (
        <div
          key={k.label}
          className={cn('flex flex-col gap-2 bg-card p-5 md:p-6', i === 0 && 'col-span-2 md:col-span-1')}
        >
          <dt className="text-sm text-muted-foreground">{k.label}</dt>
          <dd className="tabular text-3xl font-medium tracking-tight">{k.value}</dd>
          <dd className="text-xs text-muted-foreground">{k.delta}</dd>
        </div>
      ))}
    </dl>
  )
}

export function Funnel() {
  const max = funnel[0].value
  return (
    <Panel
      title="Воронка покупателей"
      aside={<span className="text-sm text-muted-foreground">Конверсия в допуск — 33%</span>}
      className="lg:col-span-7"
    >
      <ol className="flex flex-col gap-4">
        {funnel.map((step, i) => {
          const prev = funnel[i - 1]?.value
          const isLast = i === funnel.length - 1
          return (
            <li key={step.label} className="grid grid-cols-[8rem_1fr_3rem] items-center gap-4 sm:grid-cols-[10rem_1fr_3.5rem]">
              <span className="text-sm">{step.label}</span>
              <span className="h-8 overflow-hidden rounded-md bg-muted">
                <span
                  className={cn(
                    'flex h-full items-center justify-end rounded-md px-3 text-sm font-medium tabular',
                    isLast ? 'bg-brand text-brand-foreground' : 'bg-foreground/85 text-background',
                  )}
                  style={{ width: `${(step.value / max) * 100}%` }}
                >
                  {step.value}
                </span>
              </span>
              <span className="text-right text-xs text-muted-foreground tabular">
                {prev ? `${Math.round((step.value / prev) * 100)}%` : ''}
              </span>
            </li>
          )
        })}
      </ol>
    </Panel>
  )
}

export function InterestDynamics() {
  const max = Math.max(...dailyLeads)
  const week1 = dailyLeads.slice(0, 7).reduce((a, b) => a + b, 0)
  const week2 = dailyLeads.slice(7).reduce((a, b) => a + b, 0)
  return (
    <Panel
      title="Динамика интереса"
      aside={<span className="text-sm text-brand">+{Math.round(((week2 - week1) / week1) * 100)}% заявок</span>}
      className="lg:col-span-5"
    >
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <p className="text-sm text-muted-foreground">1-я неделя</p>
          <p className="tabular text-2xl font-medium tracking-tight">{week1} заявок</p>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-sm text-muted-foreground">2-я неделя</p>
          <p className="tabular text-2xl font-medium tracking-tight">{week2} заявок</p>
        </div>
      </div>
      <figure className="flex flex-col gap-2">
        <div
          className="flex h-32 items-end gap-1.5"
          role="img"
          aria-label={`Заявки по дням с 14 по 27 сентября: ${dailyLeads.join(', ')}`}
        >
          {dailyLeads.map((v, i) => (
            <span
              key={i}
              className={cn('flex-1 rounded-sm', i < 7 ? 'bg-muted-foreground/30' : 'bg-brand')}
              style={{ height: `${(v / max) * 100}%` }}
            />
          ))}
        </div>
        <figcaption className="flex justify-between text-xs text-muted-foreground tabular">
          <span>14 сен</span>
          <span>20 сен</span>
          <span>27 сен</span>
        </figcaption>
      </figure>
    </Panel>
  )
}

export function Sources() {
  const total = sources.reduce((a, s) => a + s.value, 0)
  return (
    <Panel
      title="Источники покупателей"
      aside={<span className="text-sm text-muted-foreground tabular">{total} лида</span>}
      className="lg:col-span-5"
    >
      <ul className="flex flex-col gap-5">
        {sources.map((s) => (
          <li key={s.label} className="flex flex-col gap-2">
            <div className="flex items-baseline justify-between text-sm">
              <span>{s.label}</span>
              <span className="tabular text-muted-foreground">
                {s.value} {s.value > 4 ? 'лидов' : 'лида'}
              </span>
            </div>
            <span className="h-1.5 overflow-hidden rounded-full bg-muted">
              <span className="block h-full rounded-full bg-foreground/80" style={{ width: `${(s.value / total) * 100}%` }} />
            </span>
          </li>
        ))}
      </ul>
      <p className="mt-auto border-t border-border pt-5 text-pretty text-sm leading-relaxed text-muted-foreground">
        Лучшая конверсия в показ — у базы покупателей LotDom: 4 из 5 лидов уже побывали на объекте.
      </p>
    </Panel>
  )
}

export function NextCheckpoint() {
  return (
    <div className="flex flex-col gap-4 lg:col-span-7">
      <section
        aria-labelledby="checkpoint-title"
        className="flex flex-col gap-4 rounded-2xl bg-card p-6 ring-1 ring-border sm:flex-row sm:items-center md:p-8"
      >
        <div className="flex size-14 shrink-0 flex-col items-center justify-center rounded-xl bg-muted">
          <CalendarDays className="size-5" aria-hidden />
        </div>
        <div className="flex flex-col gap-1">
          <h2 id="checkpoint-title" className="text-sm text-muted-foreground">
            Следующая контрольная точка
          </h2>
          <p className="text-xl font-medium tracking-tight">30 сентября</p>
          <p className="text-pretty text-sm leading-relaxed text-muted-foreground">
            На следующей контрольной точке оцениваем динамику спроса и принимаем решение о следующем этапе.
          </p>
        </div>
      </section>

      <section
        aria-labelledby="reco-title"
        className="flex flex-1 flex-col justify-between gap-8 rounded-2xl bg-foreground p-6 text-background md:p-8"
      >
        <div className="flex flex-col gap-3">
          <h2 id="reco-title" className="flex items-center gap-2 text-sm text-background/60">
            <span aria-hidden className="size-1.5 rounded-full bg-brand-soft" />
            Рекомендация LotDom
          </h2>
          <p className="text-pretty text-2xl font-medium leading-snug tracking-tight">
            Спрос устойчивый. Рекомендуем продолжить текущую стратегию и подготовить объект к переходу в торги.
          </p>
          <p className="text-sm text-background/60">Анна Соколова, менеджер объекта</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            href="#"
            className={cn(buttonVariants({ size: 'xl' }), 'bg-background text-foreground [a]:hover:bg-background/90')}
          >
            Продолжить стратегию
          </Link>
          <Link
            href="#"
            className={cn(
              buttonVariants({ variant: 'outline', size: 'xl' }),
              'border-background/25 bg-transparent text-background hover:bg-background/10 hover:text-background',
            )}
          >
            Обсудить с менеджером
          </Link>
        </div>
      </section>
    </div>
  )
}
