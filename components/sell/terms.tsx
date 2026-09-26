const checkpoints = ['Неделя 6', 'Неделя 8', 'Неделя 10', 'Неделя 12']

const options = [
  { title: 'Продолжить', text: 'Оставляем условия и продлеваем ещё на две недели.' },
  { title: 'Снизить резерв', text: 'Смотрим на ставки и корректируем нижнюю границу.' },
  { title: 'Забрать объект', text: 'Снимаем с торгов без сделки и без обязательств.' },
]

export function Terms() {
  return (
    <section className="border-y border-border bg-card">
      <div className="mx-auto flex max-w-7xl flex-col gap-14 px-5 py-20 md:px-8 lg:py-28">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <h2 className="text-3xl font-medium tracking-tight md:text-4xl">Сроки участия</h2>
          <p className="max-w-md text-pretty leading-relaxed text-muted-foreground">
            Минимум — один месяц. Этого хватает на упаковку, показы и торги. Дальше срок продлеваете
            вы, с отчётом каждые две недели.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-3 md:flex-row md:gap-2">
            <div className="flex flex-col gap-3 rounded-xl bg-foreground p-5 text-background md:w-2/5">
              <span className="text-xs text-background/60">Недели 1–4</span>
              <span className="font-medium">Минимальный срок</span>
              <span className="text-sm text-background/70">Упаковка, продвижение, показы, торги</span>
            </div>
            <ol className="grid flex-1 grid-cols-2 gap-2 md:grid-cols-4">
              {checkpoints.map((c) => (
                <li
                  key={c}
                  className="flex flex-col gap-3 rounded-xl border border-dashed border-border p-5"
                >
                  <span className="text-xs text-muted-foreground">{c}</span>
                  <span className="font-medium">Контрольная точка</span>
                  <span className="text-sm text-muted-foreground">Отчёт по динамике</span>
                </li>
              ))}
            </ol>
          </div>
          <p className="text-sm text-muted-foreground">
            В отчёте — просмотры, показы, допущенные покупатели и ставки за период.
          </p>
        </div>

        <div className="flex flex-col gap-6">
          <h3 className="text-xl font-medium tracking-tight">
            Если за месяц резерв не достигнут, вы выбираете:
          </h3>
          <ul className="grid gap-4 md:grid-cols-3">
            {options.map((o) => (
              <li key={o.title} className="flex flex-col gap-2 rounded-xl bg-background p-6 ring-1 ring-border">
                <span className="font-medium">{o.title}</span>
                <span className="text-sm leading-relaxed text-muted-foreground">{o.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
