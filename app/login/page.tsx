import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Building2, Home, KeyRound } from 'lucide-react'
import { SiteHeader } from '@/components/lotdom/site-header'
import { SiteFooter } from '@/components/lotdom/site-footer'

export const metadata: Metadata = {
  title: 'Вход — ЛОТДОМ',
  robots: { index: false },
}

// Mock entry point: real auth is out of scope for the prototype.
const roles = [
  { href: '/buyer', icon: KeyRound, title: 'Покупатель', text: 'Показы, проверка средств, допуск и торги' },
  { href: '/seller', icon: Home, title: 'Продавец', text: 'Статус объекта, воронка покупателей и отчёт' },
  { href: '/admin', icon: Building2, title: 'Агентство', text: 'Объекты, лиды, покупатели, показы и торги' },
]

export default function LoginPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto flex max-w-xl flex-col gap-8 px-5 py-16 md:py-24">
        <div className="flex flex-col gap-3">
          <h1 className="text-balance text-4xl font-medium tracking-tight">Вход в кабинет</h1>
          <p className="text-pretty leading-relaxed text-muted-foreground">
            Демо-версия: выберите роль, чтобы открыть соответствующий кабинет.
          </p>
        </div>
        <ul className="flex flex-col gap-3">
          {roles.map(({ href, icon: Icon, title, text }) => (
            <li key={href}>
              <Link
                href={href}
                className="group flex items-center gap-4 rounded-xl bg-card p-5 ring-1 ring-border transition-colors hover:bg-muted/60"
              >
                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-muted">
                  <Icon aria-hidden className="size-4" />
                </span>
                <span className="flex flex-1 flex-col gap-0.5">
                  <span className="font-medium">{title}</span>
                  <span className="text-sm text-muted-foreground">{text}</span>
                </span>
                <ArrowRight
                  aria-hidden
                  className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5"
                />
              </Link>
            </li>
          ))}
        </ul>
      </main>
      <SiteFooter />
    </>
  )
}
