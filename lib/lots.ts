export type LotStage =
  | 'preparation'
  | 'collecting'
  | 'viewings'
  | 'auction'
  | 'sold'
  | 'withdrawn'

export const STAGE_LABEL: Record<LotStage, string> = {
  preparation: 'Подготовка',
  collecting: 'Сбор покупателей',
  viewings: 'Показы',
  auction: 'Торги идут',
  sold: 'Продано',
  withdrawn: 'Снят с торгов',
}

export type Lot = {
  slug: string
  auctionId?: string
  type: string
  location: string
  image: string
  specs: string[]
  startPrice: number
  currentBid?: number
  stage: LotStage
  interested?: number
}

export const lots: Lot[] = [
  {
    slug: 'novaya-riga-dom-240',
    auctionId: 'nr-240',
    type: 'Современный дом',
    location: 'Новая Рига',
    image: '/images/house-novaya-riga.png',
    specs: ['240 м²', '15 соток'],
    startPrice: 38_000_000,
    stage: 'collecting',
    interested: 12,
  },
  {
    slug: 'khamovniki-118',
    auctionId: 'hm-118',
    type: 'Квартира',
    location: 'Хамовники',
    image: '/images/apt-khamovniki.png',
    specs: ['118 м²', '3 комнаты'],
    startPrice: 72_000_000,
    currentBid: 78_500_000,
    stage: 'auction',
  },
  {
    slug: 'ramenki-86',
    type: 'Квартира',
    location: 'Раменки',
    image: '/images/apt-ramenki.png',
    specs: ['86 м²', '3 комнаты'],
    startPrice: 34_000_000,
    stage: 'viewings',
    interested: 8,
  },
]

export function formatRub(value: number) {
  return new Intl.NumberFormat('ru-RU').format(value).replace(/[\u00a0\u202f ]/g, '\u00a0') + '\u00a0₽'
}
