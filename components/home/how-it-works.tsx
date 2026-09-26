const steps = [
  {
    title: 'Стартовая цена',
    text: 'Определяем стратегию продажи и цену, которая привлекает спрос.',
  },
  {
    title: 'Продвижение',
    text: 'Фото, видео, реклама, ЦИАН и работа с базой покупателей.',
  },
  {
    title: 'Показы',
    text: 'Собираем заинтересованных покупателей и проводим показы.',
  },
  {
    title: 'Торги',
    text: 'Допущенные покупатели конкурируют предложениями цены.',
  },
]

export function HowItWorks() {
  return (
    <section id="how" className="scroll-mt-20 border-y border-border bg-card">
      <div className="mx-auto flex max-w-7xl flex-col gap-14 px-5 py-20 md:px-8 lg:py-28">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <h2 className="text-3xl font-medium tracking-tight md:text-4xl">Как работает ЛОТДОМ</h2>
          <p className="max-w-md text-pretty leading-relaxed text-muted-foreground">
            Цена формируется не оценкой, а конкуренцией реальных покупателей, прошедших показ и
            проверку платёжеспособности.
          </p>
        </div>

        <ol className="grid gap-px overflow-hidden rounded-xl bg-border md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <li key={step.title} className="flex flex-col gap-12 bg-card p-7">
              <div className="flex items-center gap-3">
                <span className="tabular font-mono text-sm text-brand">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span aria-hidden className="h-px flex-1 bg-border" />
              </div>
              <div className="flex flex-col gap-3">
                <h3 className="text-xl font-medium tracking-tight">{step.title}</h3>
                <p className="leading-relaxed text-muted-foreground">{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
