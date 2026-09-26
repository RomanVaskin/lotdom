import Image from 'next/image'
import { Building2, Car, Home, TreePine } from 'lucide-react'

export function Section({
  id,
  title,
  children,
}: {
  id?: string
  title: string
  children: React.ReactNode
}) {
  return (
    <section id={id} className="flex scroll-mt-24 flex-col gap-6 border-t border-border pt-10">
      <h2 className="text-2xl font-medium tracking-tight">{title}</h2>
      {children}
    </section>
  )
}

export function Specs({ items }: { items: { label: string; value: string }[] }) {
  return (
    <dl className="grid grid-cols-2 gap-x-8 gap-y-6 md:grid-cols-4">
      {items.map((s) => (
        <div key={s.label} className="flex flex-col gap-1">
          <dt className="text-sm text-muted-foreground">{s.label}</dt>
          <dd className="text-pretty font-medium">{s.value}</dd>
        </div>
      ))}
    </dl>
  )
}

const reasons = [
  {
    icon: Building2,
    title: 'Современная архитектура',
    text: 'Проект бюро с панорамным остеклением и вторым светом в гостиной.',
  },
  {
    icon: TreePine,
    title: 'Участок у леса',
    text: 'Последняя линия посёлка, за забором — сосновый массив.',
  },
  {
    icon: Home,
    title: 'Готов к проживанию',
    text: 'Отделка, кухня, встроенная мебель и инженерные системы.',
  },
  {
    icon: Car,
    title: '30 минут до Москвы',
    text: 'По Новорижскому шоссе без светофоров до МКАД.',
  },
]

export function Reasons() {
  return (
    <ul className="grid gap-4 sm:grid-cols-2">
      {reasons.map(({ icon: Icon, title, text }) => (
        <li key={title} className="flex gap-4 rounded-xl bg-card p-5 ring-1 ring-border">
          <Icon aria-hidden className="mt-0.5 size-5 shrink-0 text-brand" />
          <div className="flex flex-col gap-1">
            <h3 className="font-medium">{title}</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">{text}</p>
          </div>
        </li>
      ))}
    </ul>
  )
}

export function PhotoStrip({ photos }: { photos: { src: string; alt: string }[] }) {
  return (
    <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
      {photos.map((p) => (
        <div key={p.src} className="relative aspect-square overflow-hidden rounded-lg">
          <Image src={p.src} alt={p.alt} fill sizes="200px" className="object-cover" />
        </div>
      ))}
    </div>
  )
}

export function FloorPlan() {
  return (
    <div className="flex flex-col gap-4 rounded-xl bg-card p-6 ring-1 ring-border">
      <div className="flex gap-2" role="tablist" aria-label="Этажи">
        <span role="tab" aria-selected="true" className="rounded-md bg-foreground px-3 py-1.5 text-sm text-background">
          1 этаж · 138 м²
        </span>
        <span role="tab" aria-selected="false" className="rounded-md px-3 py-1.5 text-sm text-muted-foreground ring-1 ring-border">
          2 этаж · 102 м²
        </span>
      </div>
      <div className="relative aspect-[16/10] overflow-hidden rounded-lg bg-card">
        <Image src="/images/floor-plan.png" alt="Планировка первого этажа" fill sizes="720px" className="object-contain" />
      </div>
    </div>
  )
}

const nearby = [
  { label: 'МКАД', value: '32 км · 30 мин' },
  { label: 'Лес', value: 'Прилегает к участку' },
  { label: 'Школа', value: '4 км' },
  { label: 'Истринское вдхр.', value: '9 км' },
]

export function LocationBlock({ address }: { address: string }) {
  return (
    <div className="grid overflow-hidden rounded-xl ring-1 ring-border md:grid-cols-5">
      <div
        className="relative min-h-64 bg-muted md:col-span-3"
        style={{
          backgroundImage:
            'linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
        role="img"
        aria-label="Место для интерактивной карты района"
      >
        <span className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2">
          <span className="grid size-10 place-items-center rounded-full bg-foreground text-background ring-8 ring-foreground/10">
            <Home aria-hidden className="size-4" />
          </span>
          <span className="rounded-md bg-card px-2 py-1 text-xs font-medium ring-1 ring-border">
            Новая Рига
          </span>
        </span>
      </div>
      <div className="flex flex-col gap-5 bg-card p-6 md:col-span-2">
        <p className="text-sm leading-relaxed text-muted-foreground">{address}</p>
        <dl className="flex flex-col">
          {nearby.map((n) => (
            <div key={n.label} className="flex justify-between gap-4 border-b border-border py-2.5 text-sm last:border-b-0">
              <dt className="text-muted-foreground">{n.label}</dt>
              <dd className="font-medium">{n.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  )
}

const admission = [
  { title: 'Оставить заявку', text: 'Менеджер свяжется в течение дня' },
  { title: 'Посетить объект', text: 'Индивидуальный или групповой показ' },
  { title: 'Подтвердить возможность покупки', text: 'Выписка, одобрение ипотеки или иной документ' },
  { title: 'Получить допуск', text: 'Номер участника и доступ к торгам' },
]

export function AdmissionSteps() {
  return (
    <ol className="grid gap-px overflow-hidden rounded-xl bg-border md:grid-cols-4">
      {admission.map((s, i) => (
        <li key={s.title} className="flex flex-col gap-3 bg-card p-5">
          <span className="tabular grid size-7 place-items-center rounded-full bg-muted font-mono text-xs">
            {i + 1}
          </span>
          <h3 className="text-pretty font-medium">{s.title}</h3>
          <p className="text-sm leading-relaxed text-muted-foreground">{s.text}</p>
        </li>
      ))}
    </ol>
  )
}
