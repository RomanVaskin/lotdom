'use client'

import { useState } from 'react'
import Link from 'next/link'
import { CalendarPlus, Check } from 'lucide-react'
import { Button, buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import type { Lot } from '@/lib/lots'
import { cn } from '@/lib/utils'

const dates = [
  { iso: '2026-09-29', day: '29', month: 'сентября', weekday: 'вт' },
  { iso: '2026-09-30', day: '30', month: 'сентября', weekday: 'ср' },
  { iso: '2026-10-01', day: '1', month: 'октября', weekday: 'чт' },
  { iso: '2026-10-02', day: '2', month: 'октября', weekday: 'пт' },
  { iso: '2026-10-03', day: '3', month: 'октября', weekday: 'сб' },
  { iso: '2026-10-05', day: '5', month: 'октября', weekday: 'пн' },
]

const times = ['10:00', '12:00', '14:00', '16:00', '18:00']

const booked: Record<string, string[]> = {
  '2026-09-29': ['10:00', '18:00'],
  '2026-09-30': ['12:00'],
  '2026-10-03': ['10:00', '12:00', '14:00'],
}

const fieldClass = 'h-11 bg-background px-3 text-base md:text-sm'

function SlotButton({
  selected,
  disabled,
  onClick,
  children,
  className,
}: {
  selected: boolean
  disabled?: boolean
  onClick: () => void
  children: React.ReactNode
  className?: string
}) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        'rounded-xl ring-1 transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:text-muted-foreground/60 disabled:line-through disabled:decoration-muted-foreground/40',
        selected
          ? 'bg-foreground text-background ring-foreground'
          : 'bg-background ring-border hover:bg-muted disabled:hover:bg-background',
        className,
      )}
    >
      {children}
    </button>
  )
}

function Step({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <fieldset className="flex flex-col gap-4">
      <legend className="mb-4 flex items-center gap-3 text-sm font-medium">
        <span className="flex size-6 items-center justify-center rounded-full bg-muted text-xs tabular">{n}</span>
        {title}
      </legend>
      {children}
    </fieldset>
  )
}

function icsHref(lot: Lot, iso: string, time: string) {
  const stamp = `${iso.replaceAll('-', '')}T${time.replace(':', '')}00`
  const [h, m] = time.split(':').map(Number)
  const end = `${iso.replaceAll('-', '')}T${String(h + 1).padStart(2, '0')}${String(m).padStart(2, '0')}00`
  const body = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'BEGIN:VEVENT',
    `DTSTART;TZID=Europe/Moscow:${stamp}`,
    `DTEND;TZID=Europe/Moscow:${end}`,
    `SUMMARY:Просмотр: ${lot.type}, ${lot.location}`,
    'DESCRIPTION:ЛОТДОМ. Менеджер подтвердит детали по телефону.',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n')
  return `data:text/calendar;charset=utf-8,${encodeURIComponent(body)}`
}

export function ViewingBooking({ lot }: { lot: Lot }) {
  const [date, setDate] = useState(dates[0].iso)
  const [time, setTime] = useState<string | null>('14:00')
  const [confirmed, setConfirmed] = useState(false)

  const selectedDate = dates.find((d) => d.iso === date)!
  const taken = booked[date] ?? []

  if (confirmed && time) {
    return (
      <section
        role="status"
        aria-labelledby="confirmed-title"
        className="flex flex-col items-start gap-8 rounded-2xl bg-card p-6 ring-1 ring-border md:p-10"
      >
        <span className="flex size-11 items-center justify-center rounded-full bg-brand-soft text-brand">
          <Check className="size-5" strokeWidth={2.5} aria-hidden />
        </span>
        <div className="flex flex-col gap-2">
          <h2 id="confirmed-title" className="text-3xl font-medium tracking-tight">
            Просмотр подтверждён
          </h2>
          <p className="text-muted-foreground">Менеджер подтвердит детали по телефону.</p>
        </div>
        <dl className="grid w-full gap-px overflow-hidden rounded-xl bg-border ring-1 ring-border sm:grid-cols-3">
          {[
            ['Дата', `${selectedDate.day} ${selectedDate.month}`],
            ['Время', time],
            ['Объект', `${lot.type}, ${lot.location}`],
          ].map(([k, v]) => (
            <div key={k} className="flex flex-col gap-1 bg-card p-4">
              <dt className="text-sm text-muted-foreground">{k}</dt>
              <dd className="font-medium">{v}</dd>
            </div>
          ))}
        </dl>
        <div className="flex flex-col gap-3 sm:flex-row">
          <a
            href={icsHref(lot, date, time)}
            download="lotdom-viewing.ics"
            className={cn(buttonVariants({ variant: 'outline', size: 'xl' }))}
          >
            <CalendarPlus aria-hidden />
            Добавить в календарь
          </a>
          <Link href={`/properties/${lot.slug}`} className={cn(buttonVariants({ variant: 'ghost', size: 'xl' }))}>
            Вернуться к объекту
          </Link>
        </div>
      </section>
    )
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        if (time) setConfirmed(true)
      }}
      className="flex flex-col gap-10 rounded-2xl bg-card p-6 ring-1 ring-border md:p-10"
    >
      <Step n={1} title="Дата">
        <div role="radiogroup" aria-label="Дата просмотра" className="grid grid-cols-3 gap-2 sm:grid-cols-6">
          {dates.map((d) => (
            <SlotButton
              key={d.iso}
              selected={d.iso === date}
              onClick={() => {
                setDate(d.iso)
                if (time && booked[d.iso]?.includes(time)) setTime(null)
              }}
              className="flex flex-col items-center gap-0.5 px-2 py-3"
            >
              <span className={cn('text-xs', d.iso === date ? 'text-background/70' : 'text-muted-foreground')}>
                {d.weekday}
              </span>
              <span className="tabular text-xl font-medium">{d.day}</span>
              <span className={cn('text-xs', d.iso === date ? 'text-background/70' : 'text-muted-foreground')}>
                {d.month.slice(0, 3)}
              </span>
            </SlotButton>
          ))}
        </div>
      </Step>

      <Step n={2} title="Время">
        <div role="radiogroup" aria-label="Время просмотра" className="grid grid-cols-3 gap-2 sm:grid-cols-5">
          {times.map((t) => {
            const isTaken = taken.includes(t)
            return (
              <SlotButton
                key={t}
                selected={t === time}
                disabled={isTaken}
                onClick={() => setTime(t)}
                className="h-11 text-sm font-medium tabular"
              >
                {t}
                {isTaken && <span className="sr-only"> — занято</span>}
              </SlotButton>
            )
          })}
        </div>
        <p className="text-sm text-muted-foreground">Просмотр длится около часа. Зачёркнутые слоты уже заняты.</p>
      </Step>

      <Step n={3} title="Контактные данные">
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="flex flex-col gap-2">
            <Label htmlFor="v-name">Имя</Label>
            <Input id="v-name" name="name" required autoComplete="name" placeholder="Анна" className={fieldClass} />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="v-phone">Телефон</Label>
            <Input
              id="v-phone"
              name="phone"
              type="tel"
              required
              autoComplete="tel"
              placeholder="+7 900 000-00-00"
              className={fieldClass}
            />
          </div>
          <div className="flex flex-col gap-2 sm:col-span-2">
            <Label htmlFor="v-email">Email</Label>
            <Input
              id="v-email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="anna@example.com"
              className={fieldClass}
            />
          </div>
          <div className="flex flex-col gap-2 sm:col-span-2">
            <Label htmlFor="v-comment">Комментарий</Label>
            <textarea
              id="v-comment"
              name="comment"
              rows={3}
              placeholder="Например: приеду с супругой, интересует баня"
              className="min-h-24 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-base outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 md:text-sm"
            />
          </div>
        </div>
      </Step>

      <div className="flex flex-col gap-4 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground" aria-live="polite">
          {time ? (
            <>
              Вы выбрали{' '}
              <span className="font-medium text-foreground">
                {selectedDate.day} {selectedDate.month}, {time}
              </span>
            </>
          ) : (
            'Выберите время просмотра'
          )}
        </p>
        <Button type="submit" size="xl" disabled={!time}>
          Записаться на просмотр
        </Button>
      </div>
    </form>
  )
}
