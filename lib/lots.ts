import { auctions } from './auctions'

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

export const STAGE_ORDER: LotStage[] = ['preparation', 'collecting', 'viewings', 'auction', 'sold']

/** Buyer funnel for a lot — one source for seller report, seller dashboard and admin. */
export type LotMetrics = {
  views: number
  leads: number
  contacted: number
  qualified: number
  viewings: number
  viewingsPlanned: number
  documents: number
  admitted: number
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
  nextViewing?: string
  auctionDate: string
  metrics: LotMetrics
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
    nextViewing: '29 сентября',
    auctionDate: '3 октября, 12:00',
    metrics: { views: 8420, leads: 24, contacted: 19, qualified: 14, viewings: 11, viewingsPlanned: 3, documents: 10, admitted: 8 },
  },
  {
    slug: 'khamovniki-118',
    auctionId: 'hm-118',
    type: 'Квартира',
    location: 'Хамовники',
    image: '/images/apt-khamovniki.png',
    specs: ['118 м²', '3 комнаты'],
    startPrice: 72_000_000,
    currentBid: auctions['hm-118'].bids[0].amount,
    stage: 'auction',
    auctionDate: 'идут сейчас',
    metrics: { views: 11_260, leads: 31, contacted: 26, qualified: 17, viewings: 12, viewingsPlanned: 0, documents: 8, admitted: 6 },
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
    nextViewing: '30 сентября',
    auctionDate: '10 октября, 12:00',
    metrics: { views: 5140, leads: 13, contacted: 11, qualified: 7, viewings: 5, viewingsPlanned: 2, documents: 4, admitted: 3 },
  },
]

export function getLot(slug: string | undefined): Lot | undefined {
  return lots.find((l) => l.slug === slug)
}

export function getLotByAuction(auctionId: string): Lot | undefined {
  return lots.find((l) => l.auctionId === auctionId)
}

/** Short internal name, e.g. «Новая Рига, дом 240 м²». */
export function lotShortName(lot: Lot) {
  return `${lot.location}, ${lot.type === 'Квартира' ? '' : 'дом '}${lot.specs[0]}`
}

/** Public card route: active auctions open the bidding room, everything else — the object page. */
export function lotHref(lot: Lot) {
  return lot.stage === 'auction' && lot.auctionId ? `/auction/${lot.auctionId}` : `/properties/${lot.slug}`
}

export const manager = {
  name: 'Анна Королёва',
  initials: 'АК',
  role: 'Менеджер объекта',
  phone: '+7 495 000-00-00',
  phoneHref: 'tel:+74950000000',
}

export function formatRub(value: number) {
  return new Intl.NumberFormat('ru-RU').format(value).replace(/[   ]/g, ' ') + ' ₽'
}

export function formatNumber(value: number) {
  return new Intl.NumberFormat('ru-RU').format(value).replace(/[   ]/g, ' ')
}
