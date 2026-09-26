import Link from 'next/link'
import { Search } from 'lucide-react'
import { AdminSidebar, adminNav } from '@/components/admin/sidebar'
import { cn } from '@/lib/utils'

export function AdminShell({
  active,
  title,
  children,
}: {
  active: string
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-dvh bg-background">
      <AdminSidebar active={active} />
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-16 items-center justify-between gap-4 border-b border-border bg-card px-5 md:px-8">
          <h1 className="text-lg font-medium">{title}</h1>
          <label className="flex h-9 w-full max-w-xs items-center gap-2 rounded-md bg-muted px-3 text-sm text-muted-foreground">
            <Search aria-hidden className="size-4" />
            <span className="sr-only">Поиск</span>
            <input
              type="search"
              placeholder="Объект, лид, участник"
              className="w-full bg-transparent text-foreground outline-none placeholder:text-muted-foreground"
            />
          </label>
        </header>
        <nav aria-label="Разделы кабинета" className="overflow-x-auto border-b border-border bg-card px-5 lg:hidden">
          <ul className="flex w-max gap-1 py-2">
            {adminNav.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  aria-current={href === active ? 'page' : undefined}
                  className={cn(
                    'inline-flex h-8 items-center rounded-md px-3 text-sm',
                    href === active ? 'bg-muted font-medium text-foreground' : 'text-muted-foreground',
                  )}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <main className="flex flex-col gap-8 p-5 md:p-8">{children}</main>
      </div>
    </div>
  )
}

/** Plain operational table wrapper in the admin style. */
export function AdminTable({ head, children, minWidth = 720 }: { head: React.ReactNode; children: React.ReactNode; minWidth?: number }) {
  return (
    <div className="overflow-x-auto rounded-xl bg-card ring-1 ring-border">
      <table className="w-full text-sm" style={{ minWidth }}>
        <thead className="border-b border-border text-left text-xs text-muted-foreground">{head}</thead>
        <tbody className="[&_td]:px-5 [&_td]:py-3.5 [&_th]:px-5 [&_th]:py-3.5 [&>tr]:border-b [&>tr]:border-border [&>tr:last-child]:border-b-0 [&>tr:hover]:bg-muted/50">
          {children}
        </tbody>
      </table>
    </div>
  )
}

export function Th({ children, right }: { children: React.ReactNode; right?: boolean }) {
  return (
    <th scope="col" className={cn('px-5 py-3 font-normal', right && 'text-right')}>
      {children}
    </th>
  )
}

export function Pill({ children, tone = 'default' }: { children: React.ReactNode; tone?: 'default' | 'brand' | 'dark' | 'muted' }) {
  return (
    <span
      className={cn(
        'inline-flex h-6 items-center whitespace-nowrap rounded-full px-2.5 text-xs font-medium',
        tone === 'default' && 'bg-card ring-1 ring-border',
        tone === 'brand' && 'bg-brand text-brand-foreground',
        tone === 'dark' && 'bg-foreground text-background',
        tone === 'muted' && 'bg-muted text-muted-foreground',
      )}
    >
      {children}
    </span>
  )
}
