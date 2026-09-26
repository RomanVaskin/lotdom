'use client'

import { useActionState } from 'react'
import Link from 'next/link'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { submitApplication, type ApplicationState } from '@/app/sell/actions'
import { Button, buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'

const propertyTypes = [
  { value: 'apartment', label: 'Квартира' },
  { value: 'house', label: 'Загородный дом' },
  { value: 'townhouse', label: 'Таунхаус' },
  { value: 'penthouse', label: 'Пентхаус' },
  { value: 'land', label: 'Участок' },
]

const initialState: ApplicationState = { status: 'idle' }
const fieldClass = 'h-11 bg-background px-3 text-base md:text-sm'

export function ApplicationForm() {
  const [state, formAction, pending] = useActionState(submitApplication, initialState)

  return (
    <section id="application" className="scroll-mt-20 border-t border-border bg-card">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 md:px-8 lg:grid-cols-12 lg:py-28">
        <div className="flex flex-col gap-4 lg:col-span-4">
          <h2 className="text-balance text-3xl font-medium tracking-tight md:text-4xl">
            Заявка на объект
          </h2>
          <p className="text-pretty leading-relaxed text-muted-foreground">
            Перезвоним в течение рабочего дня, уточним детали и предложим стартовую цену и резерв.
            Заявка ни к чему не обязывает.
          </p>
        </div>

        <div className="lg:col-span-8">
          {state.status === 'success' ? (
            <div
              role="status"
              className="flex flex-col items-start gap-4 rounded-xl bg-background p-8 ring-1 ring-border"
            >
              <CheckCircle2 aria-hidden className="size-6 text-brand" />
              <h3 className="text-xl font-medium tracking-tight">Заявка отправлена</h3>
              <p className="leading-relaxed text-muted-foreground">Менеджер LotDom свяжется с вами.</p>
              <Link
                href="/seller"
                className={cn(buttonVariants({ variant: 'outline', size: 'xl' }), 'mt-2')}
              >
                Перейти в кабинет продавца
                <ArrowRight aria-hidden />
              </Link>
            </div>
          ) : (
            <form action={formAction} className="grid gap-6 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <Label htmlFor="name">Имя</Label>
                <Input id="name" name="name" autoComplete="name" placeholder="Анна" className={fieldClass} />
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="phone">Телефон</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  autoComplete="tel"
                  placeholder="+7 900 000-00-00"
                  className={fieldClass}
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="type">Тип объекта</Label>
                <Select name="type" items={propertyTypes}>
                  <SelectTrigger id="type" className={`${fieldClass} w-full`}>
                    <SelectValue placeholder="Выберите тип" />
                  </SelectTrigger>
                  <SelectContent>
                    {propertyTypes.map((t) => (
                      <SelectItem key={t.value} value={t.value}>
                        {t.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="location">Локация</Label>
                <Input
                  id="location"
                  name="location"
                  placeholder="Москва, Хамовники"
                  autoComplete="address-level2"
                  className={fieldClass}
                />
              </div>

              <div className="flex flex-col gap-2 sm:col-span-2">
                <Label htmlFor="market-value">{'Ориентировочная рыночная стоимость, ₽'}</Label>
                <Input
                  id="market-value"
                  name="marketValue"
                  inputMode="numeric"
                  placeholder="45 000 000"
                  className={fieldClass}
                />
              </div>

              <div className="flex flex-col gap-2 sm:col-span-2">
                <Label htmlFor="comment">Комментарий</Label>
                <textarea
                  id="comment"
                  name="comment"
                  rows={3}
                  placeholder="Площадь, состояние, сроки продажи"
                  className="min-h-24 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-base outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 md:text-sm"
                />
              </div>

              <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-muted-foreground">
                  Отправляя заявку, вы соглашаетесь на обработку персональных данных.
                </p>
                <Button type="submit" size="xl" disabled={pending}>
                  {pending ? 'Отправляем…' : 'Отправить заявку'}
                </Button>
              </div>

              {state.status === 'error' && (
                <p role="alert" className="text-sm text-destructive sm:col-span-2">
                  Укажите телефон, чтобы мы могли связаться с вами.
                </p>
              )}
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
