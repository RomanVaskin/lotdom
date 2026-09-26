import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { LotCard } from '@/components/lotdom/lot-card'
import { lots } from '@/lib/lots'

export function CurrentLots() {
  return (
    <section id="lots" className="mx-auto flex max-w-7xl scroll-mt-20 flex-col gap-10 px-5 py-20 md:px-8 lg:py-28">
      <div className="flex items-end justify-between gap-4">
        <h2 className="text-3xl font-medium tracking-tight md:text-4xl">Текущие лоты</h2>
        <p className="hidden text-sm text-muted-foreground md:block">
          Резервная цена продавца конфиденциальна и не раскрывается участникам
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {lots.map((lot) => (
          <LotCard key={lot.slug} lot={lot} />
        ))}
      </div>
      <Link
        href="/properties"
        className="inline-flex items-center gap-1.5 self-start text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        Все лоты
        <ArrowRight aria-hidden className="size-4" />
      </Link>
    </section>
  )
}
