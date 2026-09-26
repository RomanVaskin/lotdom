const steps = [
  { title: 'Заявка', text: 'Оставляете адрес и параметры объекта.' },
  { title: 'Оценка и условия', text: 'Согласуем старт, резерв и сроки.' },
  { title: 'Упаковка', text: 'Снимаем фото, видео и планировки.' },
  { title: 'Покупатели и показы', text: 'Продвигаем, показываем, проверяем.' },
  { title: 'Торги и сделка', text: 'Покупатели повышают цену, вы продаёте.' },
]

export function SellerSteps() {
  return (
    <section className="border-y border-border bg-card">
      <div className="mx-auto flex max-w-7xl flex-col gap-14 px-5 py-20 md:px-8 lg:py-28">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <h2 className="text-3xl font-medium tracking-tight md:text-4xl">
            Как это работает для продавца
          </h2>
          <p className="max-w-md text-pretty leading-relaxed text-muted-foreground">
            От заявки до сделки вы принимаете только ключевые решения. Всё остальное делаем мы.
          </p>
        </div>

        <ol className="grid gap-px overflow-hidden rounded-xl bg-border sm:grid-cols-2 lg:grid-cols-5">
          {steps.map((step, i) => (
            <li key={step.title} className="flex flex-col gap-10 bg-card p-6">
              <div className="flex items-center gap-3">
                <span className="tabular font-mono text-sm text-brand">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span aria-hidden className="h-px flex-1 bg-border" />
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-lg font-medium tracking-tight">{step.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
