import type { Metadata } from 'next'
import { SiteHeader } from '@/components/lotdom/site-header'
import { SiteFooter } from '@/components/lotdom/site-footer'
import { SellHero } from '@/components/sell/sell-hero'
import { SellerSteps } from '@/components/sell/seller-steps'
import { ReservePrice } from '@/components/sell/reserve-price'
import { Terms } from '@/components/sell/terms'
import { SellerFaq } from '@/components/sell/seller-faq'
import { ApplicationForm } from '@/components/sell/application-form'

export const metadata: Metadata = {
  title: 'Продать недвижимость через торги — ЛОТДОМ',
  description:
    'Упакуем объект, соберём покупателей и проведём торги на повышение. Резервная цена гарантирует, что вы не продадите дешевле согласованного минимума.',
}

export default function SellPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <SellHero />
        <SellerSteps />
        <ReservePrice />
        <Terms />
        <SellerFaq />
        <ApplicationForm />
      </main>
      <SiteFooter />
    </>
  )
}
