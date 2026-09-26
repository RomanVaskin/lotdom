import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const flow = ['Старт ниже рынка', 'Сбор покупателей', 'Торги на повышение']

export function SellHero() {
  return (
    <section className="mx-auto grid max-w-7xl gap-10 px-5 pb-20 pt-12 md:px-8 lg:grid-cols-12 lg:gap-12 lg:pb-28 lg:pt-20">
      <div className="flex flex-col justify-center gap-8 lg:col-span-6">
        <p className="text-sm text-muted-foreground">Для собственников · Москва и Московская область</p>
        <h1 className="text-balance text-4xl font-medium leading-[1.05] tracking-tight md:text-5xl lg:text-[56px]">
          Мы упакуем объект, приведём покупателей и устроим торги
        </h1>
        <p className="max-w-lg text-pretty text-lg leading-relaxed text-muted-foreground">
          Стартовая цена ниже рынка собирает спрос. Покупатели смотрят объект, проходят проверку и
          конкурируют ставками. Итоговую цену определяет конкуренция, а не торг один на один.
        </p>

        <ol className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm font-medium">
          {flow.map((item, i) => (
            <li key={item} className="flex items-center gap-3">
              <span className="rounded-full bg-card px-3 py-1.5 ring-1 ring-border">{item}</span>
              {i < flow.length - 1 && <ArrowRight aria-hidden className="size-4 text-brand" />}
            </li>
          ))}
        </ol>

        <div>
          <Link href="#application" className={cn(buttonVariants({ size: 'xl' }))}>
            Оставить заявку на объект
            <ArrowRight aria-hidden />
          </Link>
        </div>
      </div>

      <div className="relative lg:col-span-6">
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl lg:aspect-[5/4]">
          <Image
            src="/images/house-terrace.png"
            alt="Терраса загородного дома с видом на лес"
            fill
            priority
            sizes="(min-width: 1024px) 620px, 100vw"
            className="object-cover"
          />
        </div>
        <div className="absolute bottom-4 left-4 right-4 flex flex-col gap-3 rounded-xl bg-card/95 p-5 ring-1 ring-border backdrop-blur sm:left-auto sm:w-72 lg:-left-10 lg:bottom-10 lg:right-auto">
          <span className="text-xs text-muted-foreground">Продано на торгах · Новая Рига</span>
          <div className="flex items-baseline justify-between gap-4">
            <span className="tabular text-2xl font-medium tracking-tight">
              {'47\u00a0250\u00a0000\u00a0₽'}
            </span>
            <span className="tabular text-sm text-brand">{'+5,0%'}</span>
          </div>
          <span className="border-t border-border pt-3 text-xs text-muted-foreground">
            {'Выше резервной цены продавца · 14 ставок'}
          </span>
        </div>
      </div>
    </section>
  )
}
