import Image from 'next/image'
import { Images } from 'lucide-react'
import { cn } from '@/lib/utils'

type Photo = { src: string; alt: string }

export function Gallery({ photos }: { photos: Photo[] }) {
  const [main, ...rest] = photos
  return (
    <div className="grid gap-2 overflow-hidden rounded-2xl md:grid-cols-3 md:grid-rows-2">
      <div
        className={cn(
          'relative aspect-[4/3] md:col-span-2 md:row-span-2 md:aspect-auto md:min-h-[520px]',
          rest.length === 0 && 'md:col-span-3',
        )}
      >
        <Image src={main.src} alt={main.alt} fill priority sizes="(min-width: 1024px) 560px, 100vw" className="object-cover" />
      </div>
      {rest.slice(0, 2).map((p, i) => (
        <div key={p.src} className="relative hidden aspect-[4/3] md:block md:aspect-auto">
          <Image src={p.src} alt={p.alt} fill sizes="280px" className="object-cover" />
          {i === 1 && (
            <a
              href="#gallery"
              className="absolute bottom-3 right-3 inline-flex h-9 items-center gap-2 rounded-lg bg-card/95 px-3 text-sm font-medium ring-1 ring-border backdrop-blur hover:bg-card"
            >
              <Images aria-hidden className="size-4" />
              Все фото · {photos.length}
            </a>
          )}
        </div>
      ))}
    </div>
  )
}
