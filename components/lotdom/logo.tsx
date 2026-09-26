import Link from 'next/link'
import { cn } from '@/lib/utils'

export function Logo({ className, href = '/' }: { className?: string; href?: string }) {
  return (
    <Link
      href={href}
      className={cn('inline-flex items-center gap-2.5 text-foreground', className)}
      aria-label="ЛОТДОМ — на главную"
    >
      <span aria-hidden className="grid size-7 grid-cols-2 gap-0.5 rounded-md bg-foreground p-1.5">
        <span className="rounded-[1px] bg-background" />
        <span className="rounded-[1px] bg-background/40" />
        <span className="rounded-[1px] bg-background/40" />
        <span className="rounded-[1px] bg-brand-soft" />
      </span>
      <span className="text-[15px] font-semibold tracking-[0.18em]">ЛОТДОМ</span>
    </Link>
  )
}
