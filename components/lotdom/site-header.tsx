import Link from 'next/link'
import { Logo } from './logo'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const nav = [
  { href: '/#lots', label: 'Лоты' },
  { href: '/#sell', label: 'Продать объект' },
  { href: '/#how', label: 'Как это работает' },
]

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:px-8">
        <div className="flex items-center gap-12">
          <Logo />
          <nav aria-label="Основная навигация" className="hidden md:block">
            <ul className="flex items-center gap-8">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <Link href="#" className={cn(buttonVariants({ variant: 'outline' }), 'h-9 px-4')}>
          Войти
        </Link>
      </div>
    </header>
  )
}
