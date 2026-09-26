import { SiteHeader } from '@/components/lotdom/site-header'
import { SiteFooter } from '@/components/lotdom/site-footer'
import { Hero } from '@/components/home/hero'
import { HowItWorks } from '@/components/home/how-it-works'
import { CurrentLots } from '@/components/home/current-lots'
import { Audiences } from '@/components/home/audiences'

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <HowItWorks />
        <CurrentLots />
        <Audiences />
      </main>
      <SiteFooter />
    </>
  )
}
