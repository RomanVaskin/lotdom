import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Phone } from 'lucide-react'
import { SiteHeader } from '@/components/lotdom/site-header'
import { SiteFooter } from '@/components/lotdom/site-footer'
import { StatusBadge } from '@/components/lotdom/status-badge'
import { buttonVariants } from '@/components/ui/button'
import { auctions, getAuction } from '@/lib/auctions'
import { formatRub, getLotByAuction, manager } from '@/lib/lots'
import { cn } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Вы выиграли торги — ЛОТДОМ',
  description: 'Итоги торгов и следующие шаги до сделки.',
}

const nextSteps = [
  {
    title: 'Менеджер свяжется с вами',
    text: 'Подтвердит итог торгов, ответит на вопросы и назначит встречу с продавцом.',
  },
  {
    title: 'Согласование условий сделки',
    text: 'Сроки, порядок расчётов, передача ключей и перечень того, что остаётся в доме.',
  },
  {
    title: 'Подготовка документов и выход на сделку',
    text: 'Юрист LotDom проверяет документы и сопровождает регистрацию перехода права.',
  },
]

export function generateStaticParams() {
  return Object.keys(auctions).map((id) => ({ id }))
}

export const dynamicParams = false

export default async function AuctionResultPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const auction = getAuction(id)
  const lot = getLotByAuction(id)
  if (!auction || !lot) notFound()
  const { result } = auction

  return (
    <>
      <SiteHeader />
      <main className="mx-auto flex max-w-7xl flex-col gap-16 px-5 py-12 md:px-8 lg:py-20">
        <section className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="flex flex-col gap-6 lg:col-span-5">
            <p className="text-sm text-muted-foreground">Торги завершены · {result.closedAt}</p>
            <h1 className="text-balance text-4xl font-medium tracking-tight md:text-6xl">Вы выиграли торги</h1>
            <p className="max-w-md text-pretty text-lg leading-relaxed text-muted-foreground">
              Ваша ставка стала финальной для этого объекта.
            </p>
            <div className="flex flex-col gap-3 pt-2 sm:flex-row">
              <a href={manager.phoneHref} className={cn(buttonVariants({ size: 'xl' }))}>
                <Phone aria-hidden />
                Связаться с менеджером
              </a>
              <Link
                href={`/properties/${lot.slug}`}
                className={cn(buttonVariants({ variant: 'outline', size: 'xl' }))}
              >
                Посмотреть объект
              </Link>
            </div>
            <p className="text-sm text-muted-foreground">
              Менеджер LotDom свяжется с вами в течение рабочего дня. {manager.name}, {manager.phone}.
            </p>
            <Link href="/buyer" className="self-start text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline">
              Перейти в кабинет покупателя
            </Link>
          </div>

          <article className="overflow-hidden rounded-2xl bg-card ring-1 ring-border lg:col-span-7">
            <div className="relative aspect-[16/10] bg-muted">
              <Image
                src={lot.image}
                alt={`${lot.type}, ${lot.location}`}
                fill
                priority
                sizes="(min-width: 1024px) 55vw, 100vw"
                className="object-cover"
              />
              <StatusBadge stage="sold" label="Торги завершены" className="absolute top-4 left-4" />
            </div>
            <div className="flex flex-col gap-6 p-6 md:p-8">
              <div className="flex flex-col gap-1">
                <h2 className="text-xl font-medium tracking-tight">{lot.type}</h2>
                <p className="text-muted-foreground">
                  {lot.location} · {lot.specs.join(' · ')}
                </p>
              </div>
              <dl className="grid grid-cols-3 gap-6 border-t border-border pt-6">
                <div className="col-span-3 flex flex-col gap-1 sm:col-span-1">
                  <dt className="text-sm text-muted-foreground">Финальная цена</dt>
                  <dd className="tabular text-2xl font-medium tracking-tight">{formatRub(result.finalPrice)}</dd>
                </div>
                <div className="flex flex-col gap-1">
                  <dt className="text-sm text-muted-foreground">Ставок</dt>
                  <dd className="tabular text-2xl font-medium tracking-tight">{result.bids}</dd>
                </div>
                <div className="flex flex-col gap-1">
                  <dt className="text-sm text-muted-foreground">Участников</dt>
                  <dd className="tabular text-2xl font-medium tracking-tight">{result.participants}</dd>
                </div>
              </dl>
            </div>
          </article>
        </section>

        <section aria-labelledby="next-title" className="flex flex-col gap-8 border-t border-border pt-12">
          <h2 id="next-title" className="text-3xl font-medium tracking-tight">
            Что дальше
          </h2>
          <ol className="grid gap-4 md:grid-cols-3">
            {nextSteps.map((step, i) => (
              <li key={step.title} className="flex flex-col gap-4 rounded-2xl bg-card p-6 ring-1 ring-border">
                <span
                  className={cn(
                    'flex size-8 items-center justify-center rounded-full text-sm font-medium tabular',
                    i === 0 ? 'bg-brand text-brand-foreground' : 'bg-muted text-muted-foreground',
                  )}
                >
                  {i + 1}
                </span>
                <h3 className="text-pretty font-medium">{step.title}</h3>
                <p className="text-pretty text-sm leading-relaxed text-muted-foreground">{step.text}</p>
              </li>
            ))}
          </ol>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
