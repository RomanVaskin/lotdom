export type Bid = { participant: number; amount: number; time: string }

export type AuctionResult = {
  finalPrice: number
  bids: number
  participants: number
  closedAt: string
}

export type Auction = {
  id: string
  propertySlug: string
  title: string
  location: string
  specs: string
  image: string
  startPrice: number
  step: number
  participants: number
  secondsLeft: number
  /** Human-readable end time; the countdown above is mock. */
  endsAt: string
  /** Only the fact that the seller's reserve is reached is public — never the amount. */
  reserveMet: boolean
  me: number
  bids: Bid[]
  result: AuctionResult
}

export const auctions: Record<string, Auction> = {
  'nr-240': {
    id: 'nr-240',
    propertySlug: 'novaya-riga-dom-240',
    title: 'Современный дом',
    location: 'Новая Рига',
    specs: '240 м² · 15 соток · 4 спальни',
    image: '/images/house-novaya-riga.png',
    startPrice: 38_000_000,
    step: 250_000,
    participants: 8,
    secondsLeft: 42 * 60 + 17,
    endsAt: '3 октября, 18:00',
    reserveMet: true,
    me: 5,
    bids: [
      { participant: 3, amount: 46_250_000, time: '14:32' },
      { participant: 7, amount: 46_000_000, time: '14:29' },
      { participant: 2, amount: 45_750_000, time: '14:24' },
      { participant: 3, amount: 45_500_000, time: '14:18' },
      { participant: 8, amount: 45_000_000, time: '14:11' },
      { participant: 5, amount: 44_500_000, time: '14:03' },
      { participant: 7, amount: 43_750_000, time: '13:52' },
    ],
    result: { finalPrice: 47_250_000, bids: 23, participants: 8, closedAt: '3 октября, 18:42' },
  },
  'hm-118': {
    id: 'hm-118',
    propertySlug: 'khamovniki-118',
    title: 'Квартира',
    location: 'Хамовники',
    specs: '118 м² · 3 комнаты',
    image: '/images/apt-khamovniki.png',
    startPrice: 72_000_000,
    step: 500_000,
    participants: 6,
    secondsLeft: 1 * 3600 + 8 * 60 + 40,
    endsAt: '26 сентября, 16:00',
    reserveMet: false,
    me: 4,
    bids: [
      { participant: 2, amount: 78_500_000, time: '14:30' },
      { participant: 6, amount: 78_000_000, time: '14:21' },
      { participant: 1, amount: 77_000_000, time: '14:09' },
      { participant: 2, amount: 76_000_000, time: '13:55' },
      { participant: 3, amount: 74_500_000, time: '13:40' },
    ],
    result: { finalPrice: 80_500_000, bids: 14, participants: 6, closedAt: '26 сентября, 16:10' },
  },
}

export function getAuction(id: string): Auction | undefined {
  return auctions[id]
}

export const ANTI_SNIPING_SECONDS = 5 * 60
