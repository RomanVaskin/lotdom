import Link from 'next/link'
import {
  CalendarDays,
  Gavel,
  Home,
  LayoutGrid,
  Settings,
  UserCheck,
  Users,
} from 'lucide-react'
import { Logo } from '@/components/lotdom/logo'
import { cn } from '@/lib/utils'

const items = [
  { label: 'Обзор', icon: LayoutGrid, active: true },
  { label: 'Объекты', icon: Home },
  { label: 'Лиды', icon: Users },
  { label: 'Показы', icon: CalendarDays },
  { label: 'Допуски', icon: UserCheck },
  { label: 'Торги', icon: Gavel },
  { label: 'Настройки', icon: Settings },
]

export function AdminSidebar() {
  return (
    <aside className="hidden w-60 shrink-0 flex-col border-r border-border bg-card lg:flex">
      <div className="flex h-16 items-center border-b border-border px-5">
        <Logo href="/admin" />
      </div>
      <nav aria-label="Разделы кабинета" className="flex-1 p-3">
        <ul className="flex flex-col gap-0.5">
          {items.map(({ label, icon: Icon, active }) => (
            <li key={label}>
              <Link
                href="#"
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'flex h-9 items-center gap-3 rounded-md px-3 text-sm transition-colors',
                  active
                    ? 'bg-muted font-medium text-foreground'
                    : 'text-muted-foreground hover:bg-muted/60 hover:text-foreground',
                )}
              >
                <Icon aria-hidden className="size-4" />
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="flex items-center gap-3 border-t border-border p-4">
        <span className="grid size-8 place-items-center rounded-full bg-muted text-xs font-medium">АК</span>
        <div className="flex flex-col">
          <span className="text-sm font-medium">Анна Королёва</span>
          <span className="text-xs text-muted-foreground">Менеджер</span>
        </div>
      </div>
    </aside>
  )
}
