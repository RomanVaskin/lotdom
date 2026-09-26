'use client'

import { useActionState } from 'react'
import { CheckCircle2 } from 'lucide-react'
import { submitApplication, type ApplicationState } from '@/app/sell/actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

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
              <h3 className="text-xl font-medium tracking-tight">
                {state.name ? `${state.name}, заявка принята` : 'Заявка принята'}
              </h3>
              <p className="leading-relaxed text-muted-foreground">
                Менеджер свяжется с вами по указанному телефону в течение рабочего дня.
              </p>
            </div>
          ) : (
            <form action={formAction} className="grid gap-6 sm:grid-cols-2">
              <div className="flex flex-col gap-2 sm:col-span-2">
                <Label htmlFor="address">Адрес объекта</Label>
                <Input
                  id="address"
                  name="address"
                  placeholder="Москва, Хамовники, ул. Остоженка, 12"
                  autoComplete="street-address"
                  className={fieldClass}
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="type">Тип недвижимости</Label>
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
                <Label htmlFor="area">{'Площадь, м²'}</Label>
                <Input
                  id="area"
                  name="area"
                  type="number"
                  inputMode="decimal"
                  min={1}
                  placeholder="120"
                  className={fieldClass}
                />
              </div>

              <div className="flex flex-col gap-2 sm:col-span-2">
                <Label htmlFor="price">{'Желаемая стартовая цена, ₽'}</Label>
                <Input
                  id="price"
                  name="price"
                  inputMode="numeric"
                  placeholder="40 000 000"
                  className={fieldClass}
                />
              </div>

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
