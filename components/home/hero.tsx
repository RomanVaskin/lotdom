import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { StatusBadge } from '@/components/lotdom/status-badge'
import { cn } from '@/lib/utils'

export function Hero() {
  return (
    <section className="mx-auto grid max-w-7xl gap-10 px-5 pb-20 pt-12 md:px-8 lg:grid-cols-12 lg:gap-12 lg:pb-28 lg:pt-20">
      <div className="flex flex-col justify-center gap-8 lg:col-span-5">
        <p className="text-sm text-muted-foreground">
          Москва и Московская область · от 20 до 150 млн ₽
        </p>
        <h1 className="text-balance text-4xl font-medium leading-[1.05] tracking-tight md:text-5xl lg:text-[56px]">
          Продажа недвижимости через конкурентный спрос
        </h1>
        <p className="max-w-md text-pretty text-lg leading-relaxed text-muted-foreground">
          Упаковываем объект, привлекаем покупателей и проводим открытые торги между
          заинтересованными участниками.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link href="#sell" className={cn(buttonVariants({ size: 'xl' }))}>
            Продать объект
            <ArrowRight aria-hidden />
          </Link>
          <Link href="#lots" className={cn(buttonVariants({ size: 'xl', variant: 'outline' }))}>
            Смотреть лоты
          </Link>
        </div>
      </div>

      <div className="relative lg:col-span-7">
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl lg:aspect-[5/4]">
          <Image
            src="/images/house-novaya-riga.png"
            alt="Современный дом с деревянным фасадом и панорамным остеклением у соснового леса"
            fill
            priority
            sizes="(min-width: 1024px) 720px, 100vw"
            className="object-cover"
          />
        </div>

        <Link
          href="/auction/hm-118"
          className="absolute bottom-4 left-4 right-4 flex flex-col gap-4 rounded-xl bg-card/95 p-5 ring-1 ring-border backdrop-blur transition-colors hover:bg-card sm:left-auto sm:w-80 lg:-left-10 lg:bottom-10 lg:right-auto"
        >
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Хамовники, 118 м²</span>
            <StatusBadge stage="auction" />
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-xs text-muted-foreground">Текущая ставка</span>
            <span className="tabular text-2xl font-medium tracking-tight">
              {'78\u00a0500\u00a0000\u00a0₽'}
            </span>
          </div>
          <div className="flex items-center justify-between border-t border-border pt-3 text-xs text-muted-foreground">
            <span>{'Старт 72\u00a0000\u00a0000\u00a0₽'}</span>
            <span className="tabular text-brand">{'+9,0%'}</span>
          </div>
        </Link>
      </div>
    </section>
  )
}
