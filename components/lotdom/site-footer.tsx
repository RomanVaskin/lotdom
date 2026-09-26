import { Logo } from './logo'

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-10 md:flex-row md:items-center md:justify-between md:px-8">
        <div className="flex flex-col gap-2">
          <Logo />
          <p className="text-sm text-muted-foreground">
            Платформа конкурентной продажи недвижимости. Москва и Московская область.
          </p>
        </div>
        <p className="text-sm text-muted-foreground">{'© 2026 lotdom.ru'}</p>
      </div>
    </footer>
  )
}
