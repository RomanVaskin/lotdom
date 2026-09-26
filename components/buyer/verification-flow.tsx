'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Check, Clock, FileText, Lock, Upload } from 'lucide-react'
import { Button, buttonVariants } from '@/components/ui/button'
import { ObjectSummary } from '@/components/lotdom/object-summary'
import type { Lot } from '@/lib/lots'
import { cn } from '@/lib/utils'

type Phase = 'idle' | 'reviewing' | 'passed'
type ProofType = 'mortgage' | 'own'

const proofOptions: { value: ProofType; title: string; hint: string }[] = [
  {
    value: 'mortgage',
    title: 'Одобрение ипотеки',
    hint: 'Решение банка с суммой одобренного кредита',
  },
  {
    value: 'own',
    title: 'Подтверждение собственных средств',
    hint: 'Выписка со счёта или справка об остатке',
  },
]

export function VerificationFlow({ lot, auctionHref }: { lot: Lot; auctionHref: string }) {
  const [phase, setPhase] = useState<Phase>('idle')
  const [proof, setProof] = useState<ProofType>('mortgage')

  const steps = [
    { title: 'Заявка отправлена', meta: '16 сентября', state: 'done' },
    { title: 'Показ пройден', meta: '21 сентября', state: 'done' },
    {
      title: 'Подтверждение средств',
      meta: phase === 'passed' ? 'Проверка пройдена' : phase === 'reviewing' ? 'На проверке' : 'Требуется документ',
      state: phase === 'passed' ? 'done' : 'current',
    },
    {
      title: 'Допуск к торгам',
      meta: phase === 'passed' ? 'Вы допущены' : 'После проверки',
      state: phase === 'passed' ? 'done' : 'upcoming',
    },
  ] as const

  return (
    <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
      <aside className="flex flex-col gap-6 lg:col-span-4">
        <div className="flex flex-col gap-4 rounded-2xl bg-card p-5 ring-1 ring-border">
          <ObjectSummary lot={lot} />
          <div className="flex flex-col gap-2 border-t border-border pt-4">
            <p className="text-sm text-muted-foreground">Статус участия</p>
            <p className="flex items-center gap-2 text-sm font-medium">
              <span
                aria-hidden
                className={cn('size-1.5 shrink-0 rounded-full', phase === 'passed' ? 'bg-brand' : 'bg-foreground')}
              />
              {phase === 'passed' ? 'Допуск к торгам получен' : 'Требуется подтверждение платёжеспособности'}
            </p>
          </div>
        </div>

        <nav aria-label="Этапы допуска" className="rounded-2xl bg-card p-5 ring-1 ring-border">
          <ol className="flex flex-col">
            {steps.map((step, i) => (
              <li key={step.title} className="relative flex gap-4 pb-6 last:pb-0">
                {i < steps.length - 1 && (
                  <span
                    aria-hidden
                    className={cn(
                      'absolute top-7 left-3 h-[calc(100%-1.75rem)] w-px',
                      step.state === 'done' ? 'bg-brand' : 'bg-border',
                    )}
                  />
                )}
                <span
                  aria-hidden
                  className={cn(
                    'relative flex size-6 shrink-0 items-center justify-center rounded-full text-xs',
                    step.state === 'done' && 'bg-brand text-brand-foreground',
                    step.state === 'current' && 'bg-card ring-2 ring-brand',
                    step.state === 'upcoming' && 'bg-card ring-1 ring-border',
                  )}
                >
                  {step.state === 'done' ? (
                    <Check className="size-3.5" strokeWidth={2.5} />
                  ) : step.state === 'current' ? (
                    <span className="size-2 rounded-full bg-brand" />
                  ) : null}
                </span>
                <div className="flex flex-col gap-0.5" aria-current={step.state === 'current' ? 'step' : undefined}>
                  <p
                    className={cn(
                      'text-sm font-medium',
                      step.state === 'upcoming' && 'text-muted-foreground',
                    )}
                  >
                    {step.title}
                  </p>
                  <p className="text-sm text-muted-foreground">{step.meta}</p>
                </div>
              </li>
            ))}
          </ol>
        </nav>
      </aside>

      <section
        aria-labelledby="proof-title"
        className="flex flex-col gap-8 rounded-2xl bg-card p-6 ring-1 ring-border md:p-10 lg:col-span-8"
      >
        {phase === 'passed' ? (
          <div role="status" className="flex flex-col items-start gap-6">
            <span className="flex size-11 items-center justify-center rounded-full bg-brand-soft text-brand">
              <Check className="size-5" strokeWidth={2.5} aria-hidden />
            </span>
            <div className="flex flex-col gap-3">
              <h2 id="proof-title" className="text-balance text-3xl font-medium tracking-tight">
                Проверка пройдена
              </h2>
              <p className="max-w-xl text-pretty leading-relaxed text-muted-foreground">
                Вы допущены к торгам по объекту «{lot.type}, {lot.location}». Торги пройдут онлайн, ставки
                делаются шагом от 250 000 ₽.
              </p>
            </div>
            <dl className="grid w-full gap-px overflow-hidden rounded-xl bg-border ring-1 ring-border sm:grid-cols-3">
              {[
                ['Документ', 'mortgage-approval.pdf'],
                ['Решение', '27 сентября, 15:40'],
                ['Старт торгов', '3 октября, 12:00'],
              ].map(([k, v]) => (
                <div key={k} className="flex flex-col gap-1 bg-card p-4">
                  <dt className="text-sm text-muted-foreground">{k}</dt>
                  <dd className="truncate text-sm font-medium">{v}</dd>
                </div>
              ))}
            </dl>
            <Link href={auctionHref} className={cn(buttonVariants({ size: 'xl' }))}>
              Перейти к аукциону
              <ArrowRight aria-hidden />
            </Link>
          </div>
        ) : (
          <>
            <div className="flex flex-col gap-3">
              <h2 id="proof-title" className="text-balance text-3xl font-medium tracking-tight">
                Подтвердите возможность покупки
              </h2>
              <p className="max-w-xl text-pretty leading-relaxed text-muted-foreground">
                Мы проверяем платёжеспособность участников, чтобы в торгах участвовали только реальные
                покупатели.
              </p>
            </div>

            <fieldset className="flex flex-col gap-3" disabled={phase === 'reviewing'}>
              <legend className="mb-3 text-sm font-medium">Способ подтверждения</legend>
              <div className="grid gap-3 sm:grid-cols-2">
                {proofOptions.map((opt) => {
                  const selected = proof === opt.value
                  return (
                    <label
                      key={opt.value}
                      className={cn(
                        'flex cursor-pointer gap-3 rounded-xl p-4 ring-1 transition-colors has-focus-visible:ring-2 has-focus-visible:ring-ring/50 has-disabled:cursor-default',
                        selected ? 'bg-brand-soft/60 ring-brand' : 'bg-background ring-border hover:bg-muted',
                      )}
                    >
                      <input
                        type="radio"
                        name="proof"
                        value={opt.value}
                        checked={selected}
                        onChange={() => setProof(opt.value)}
                        className="sr-only"
                      />
                      <span
                        aria-hidden
                        className={cn(
                          'mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full ring-1',
                          selected ? 'ring-brand' : 'ring-border bg-card',
                        )}
                      >
                        {selected && <span className="size-2 rounded-full bg-brand" />}
                      </span>
                      <span className="flex flex-col gap-1">
                        <span className="text-sm font-medium">{opt.title}</span>
                        <span className="text-sm leading-relaxed text-muted-foreground">{opt.hint}</span>
                      </span>
                    </label>
                  )
                })}
              </div>
            </fieldset>

            {phase === 'idle' ? (
              <button
                type="button"
                onClick={() => setPhase('reviewing')}
                className="flex flex-col items-center gap-3 rounded-xl border border-dashed border-border bg-background px-6 py-10 text-center transition-colors outline-none hover:border-foreground/30 hover:bg-muted/60 focus-visible:ring-3 focus-visible:ring-ring/50"
              >
                <span className="flex size-10 items-center justify-center rounded-full bg-card ring-1 ring-border">
                  <Upload className="size-4" aria-hidden />
                </span>
                <span className="font-medium">Загрузить документ</span>
                <span className="text-sm text-muted-foreground">PDF, JPG, PNG · до 20 МБ</span>
              </button>
            ) : (
              <div role="status" className="flex flex-col gap-4 rounded-xl bg-background p-5 ring-1 ring-border">
                <div className="flex items-center gap-4">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-card ring-1 ring-border">
                    <FileText className="size-4" aria-hidden />
                  </span>
                  <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                    <p className="truncate text-sm font-medium">mortgage-approval.pdf</p>
                    <p className="text-sm text-muted-foreground">1,2 МБ · загружен сегодня в 11:08</p>
                  </div>
                  <span className="inline-flex h-7 shrink-0 items-center gap-2 rounded-full bg-card px-3 text-xs font-medium ring-1 ring-border">
                    <span aria-hidden className="size-1.5 rounded-full bg-brand" />
                    На проверке
                  </span>
                </div>
                <div className="flex flex-col gap-3 border-t border-border pt-4 sm:flex-row sm:items-center sm:justify-between">
                  <p className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="size-4" aria-hidden />
                    Обычно до 1 рабочего дня
                  </p>
                  <Button variant="ghost" size="sm" onClick={() => setPhase('passed')}>
                    Показать результат (демо)
                  </Button>
                </div>
              </div>
            )}

            <p className="flex items-start gap-3 rounded-xl bg-muted/70 p-4 text-sm leading-relaxed text-muted-foreground">
              <Lock className="mt-0.5 size-4 shrink-0 text-foreground" aria-hidden />
              Документы используются только для проверки допуска к торгам и не публикуются другим участникам.
            </p>
          </>
        )}
      </section>
    </div>
  )
}
