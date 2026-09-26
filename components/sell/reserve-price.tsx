import { EyeOff, Handshake, ShieldCheck } from 'lucide-react'

const points = [
  {
    icon: Handshake,
    title: 'Согласуете заранее',
    text: 'Минимальную цену вы называете до старта. Она фиксируется в договоре.',
  },
  {
    icon: EyeOff,
    title: 'Покупатели её не видят',
    text: 'Участники торгов видят только старт и ставки. Резерв знаете вы и агентство.',
  },
  {
    icon: ShieldCheck,
    title: 'Дешевле не продадим',
    text: 'Если ставки не дошли до резерва, сделки нет. Решение остаётся за вами.',
  },
]

export function ReservePrice() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-20 md:px-8 lg:py-28">
      <div className="grid gap-12 overflow-hidden rounded-2xl bg-foreground p-8 text-background md:p-12 lg:grid-cols-12 lg:p-16">
        <div className="flex flex-col gap-6 lg:col-span-5">
          <span className="text-sm text-brand-soft">Главная гарантия продавца</span>
          <h2 className="text-balance text-3xl font-medium tracking-tight md:text-4xl">
            Резервная цена: ниже неё объект не уйдёт
          </h2>
          <p className="text-pretty leading-relaxed text-background/70">
            Старт ниже рынка нужен, чтобы собрать спрос. Он не означает, что вы продадите дёшево.
            Нижнюю границу задаёте вы сами.
          </p>
        </div>

        <div className="flex flex-col gap-8 lg:col-span-7">
          <div
            className="flex flex-col gap-3 rounded-xl p-5 ring-1 ring-background/15"
            aria-label="Пример шкалы цен"
          >
            <div className="flex justify-between text-xs text-background/60">
              <span>Старт</span>
              <span>Резерв</span>
              <span>Итог торгов</span>
            </div>
            <div className="relative h-2 rounded-full bg-background/15">
              <div className="absolute inset-y-0 left-0 w-[88%] rounded-full bg-brand-soft" />
              <div className="absolute -top-1.5 left-1/2 h-5 w-0.5 -translate-x-1/2 bg-background" />
            </div>
            <div className="tabular flex justify-between text-sm font-medium">
              <span>{'40\u00a0млн ₽'}</span>
              <span>{'45\u00a0млн ₽'}</span>
              <span className="text-brand-soft">{'47,25\u00a0млн ₽'}</span>
            </div>
          </div>

          <ul className="grid gap-6 sm:grid-cols-3">
            {points.map(({ icon: Icon, title, text }) => (
              <li key={title} className="flex flex-col gap-3">
                <Icon aria-hidden className="size-5 text-brand-soft" />
                <h3 className="font-medium">{title}</h3>
                <p className="text-sm leading-relaxed text-background/70">{text}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
