import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

const faq = [
  {
    q: 'Что если резервная цена не будет достигнута?',
    a: 'Сделки не будет — объект не продаётся ниже резерва. Вы получаете отчёт по ставкам и решаете: продлить торги, снизить резерв или забрать объект.',
  },
  {
    q: 'Кто видит резервную цену?',
    a: 'Только вы и агентство. Покупатели видят стартовую цену, текущую ставку и отметку, достигнуты ли условия продажи. Сама сумма резерва не раскрывается.',
  },
  {
    q: 'Сколько это стоит продавцу?',
    a: 'Вы платите комиссию только по факту сделки — процент от итоговой цены. Он фиксируется в договоре при согласовании условий. Упаковка и продвижение входят в услугу.',
  },
  {
    q: 'Как отбираются покупатели, допущенные к торгам?',
    a: 'Покупатель должен побывать на показе и подтвердить платёжеспособность: собственные средства, одобрение ипотеки или гарантийный взнос. Без этого ставку сделать нельзя.',
  },
  {
    q: 'Можно ли забрать объект раньше минимального срока?',
    a: 'Можно. В этом случае вы компенсируете фактические расходы на съёмку и рекламу — сумма и порядок прописаны в договоре заранее.',
  },
]

export function SellerFaq() {
  return (
    <section className="mx-auto grid max-w-7xl gap-10 px-5 py-20 md:px-8 lg:grid-cols-12 lg:py-28">
      <h2 className="text-3xl font-medium tracking-tight md:text-4xl lg:col-span-4">
        Частые вопросы
      </h2>
      <Accordion className="lg:col-span-8">
        {faq.map((item) => (
          <AccordionItem key={item.q} value={item.q} className="border-b border-border">
            <AccordionTrigger className="py-5 text-base hover:no-underline">{item.q}</AccordionTrigger>
            <AccordionContent className="pb-5">
              <p className="max-w-2xl leading-relaxed text-muted-foreground">{item.a}</p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  )
}
