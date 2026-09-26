import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const _geist = Geist({ subsets: ['latin', 'cyrillic'] })
const _geistMono = Geist_Mono({ subsets: ['latin', 'cyrillic'] })

export const metadata: Metadata = {
  title: 'ЛОТДОМ — платформа конкурентной продажи недвижимости',
  description:
    'Упаковываем объект, привлекаем покупателей и проводим открытые торги между заинтересованными участниками. Москва и Московская область.',
  icons: {
    icon: [{ url: '/icon.svg', type: 'image/svg+xml' }],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#f6f7f8',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru" className="bg-background">
      <body className="antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
