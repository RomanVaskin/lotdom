import Link from 'next/link'
import { Check } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const seller = [
  'Упаковка объекта: съёмка, видео, презентация',
  'Концентрация спроса в короткий период',
  'Цена растёт за счёт конкуренции, а не торга вниз',
  'Резервная цена защищает от продажи ниже ваших условий',
]

const buyer = [
  'Оставить заявку на объект',
  'Посетить показ',
  'Подтвердить возможность покупки',
  'Получить допуск и участвовать в торгах',
]

export function Audiences() {
  return (
    <section id="sell" className="mx-auto max-w-7xl scroll-mt-20 px-5 pb-20 md:px-8 lg:pb-28">
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="flex flex-col gap-8 rounded-2xl bg-foreground p-8 text-background md:p-10">
          <div className="flex flex-col gap-3">
            <p className="text-sm text-background/60">Продавцам</p>
            <h2 className="text-balance text-3xl font-medium tracking-tight">
              Управляемая продажа вместо ожидания звонков
            </h2>
          </div>
          <ul className="flex flex-col gap-3">
            {seller.map((t) => (
              <li key={t} className="flex gap-3 leading-relaxed text-background/85">
                <Check aria-hidden className="mt-1 size-4 shrink-0 text-brand-soft" />
                {t}
              </li>
            ))}
          </ul>
          <Link
            href="/sell#application"
            className={cn(
              buttonVariants({ size: 'xl' }),
              'mt-auto w-fit bg-background text-foreground [a]:hover:bg-background/90',
            )}
          >
            Оставить заявку на продажу
          </Link>
        </div>

        <div className="flex flex-col gap-8 rounded-2xl bg-card p-8 ring-1 ring-border md:p-10">
          <div className="flex flex-col gap-3">
            <p className="text-sm text-muted-foreground">Покупателям</p>
            <h2 className="text-balance text-3xl font-medium tracking-tight">
              Честная конкуренция среди проверенных участников
            </h2>
          </div>
          <ol className="flex flex-col">
            {buyer.map((t, i) => (
              <li
                key={t}
                className="flex items-center gap-4 border-b border-border py-3 last:border-b-0"
              >
                <span className="tabular grid size-7 shrink-0 place-items-center rounded-full bg-muted font-mono text-xs">
                  {i + 1}
                </span>
                <span className="leading-relaxed">{t}</span>
              </li>
            ))}
          </ol>
          <Link
            href="/properties"
            className={cn(buttonVariants({ size: 'xl', variant: 'outline' }), 'mt-auto w-fit')}
          >
            Смотреть лоты
          </Link>
        </div>
      </div>
    </section>
  )
}
