import Image from 'next/image'
import { Building2, Car, Eye, Home, MapPin, TreePine, type LucideIcon } from 'lucide-react'
import type { PropertyDetails, ReasonIcon } from '@/lib/property'

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

const reasonIcons: Record<ReasonIcon, LucideIcon> = {
  architecture: Building2,
  nature: TreePine,
  ready: Home,
  transport: Car,
  district: MapPin,
  view: Eye,
}

export function Reasons({ items }: { items: PropertyDetails['reasons'] }) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2">
      {items.map(({ icon, title, text }) => {
        const Icon = reasonIcons[icon]
        return (
          <li key={title} className="flex gap-4 rounded-xl bg-card p-5 ring-1 ring-border">
            <Icon aria-hidden className="mt-0.5 size-5 shrink-0 text-brand" />
            <div className="flex flex-col gap-1">
              <h3 className="font-medium">{title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{text}</p>
            </div>
          </li>
        )
      })}
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

export function FloorPlan({ plan }: { plan: NonNullable<PropertyDetails['floorPlan']> }) {
  return (
    <div className="flex flex-col gap-4 rounded-xl bg-card p-6 ring-1 ring-border">
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Этажи">
        {plan.tabs.map((tab, i) => (
          <span
            key={tab}
            role="tab"
            aria-selected={i === 0}
            className={
              i === 0
                ? 'rounded-md bg-foreground px-3 py-1.5 text-sm text-background'
                : 'rounded-md px-3 py-1.5 text-sm text-muted-foreground ring-1 ring-border'
            }
          >
            {tab}
          </span>
        ))}
      </div>
      <div className="relative aspect-[16/10] overflow-hidden rounded-lg bg-card">
        <Image src={plan.src} alt="Планировка первого этажа" fill sizes="720px" className="object-contain" />
      </div>
    </div>
  )
}

export function LocationBlock({
  address,
  label,
  nearby,
}: {
  address: string
  label: string
  nearby: PropertyDetails['nearby']
}) {
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
            {label}
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
