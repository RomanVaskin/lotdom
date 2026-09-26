/**
 * Operational mock data (leads, viewings, buyers). Admin reads all of it;
 * buyer and seller dashboards read only what belongs to them.
 * No backend yet — this is the single mock source.
 */

export type LeadStatus = 'new' | 'contacted' | 'qualified' | 'viewing' | 'admitted' | 'deal'

export const LEAD_STATUS_LABEL: Record<LeadStatus, string> = {
  new: 'Новый',
  contacted: 'Связались',
  qualified: 'Квалифицирован',
  viewing: 'Показ',
  admitted: 'Допущен к торгам',
  deal: 'Сделка',
}

export type Lead = {
  id: string
  name: string
  phone: string
  lotSlug: string
  source: string
  status: LeadStatus
  createdAt: string
  isMe?: boolean
}

export const leads: Lead[] = [
  { id: 'L-1042', name: 'Игорь М.', phone: '+7 916 ***-**-21', lotSlug: 'novaya-riga-dom-240', source: 'ЦИАН', status: 'new', createdAt: '26 сентября' },
  { id: 'L-1041', name: 'Светлана К.', phone: '+7 903 ***-**-08', lotSlug: 'ramenki-86', source: 'Яндекс', status: 'contacted', createdAt: '25 сентября' },
  { id: 'L-1039', name: 'Вы (демо-покупатель)', phone: '+7 900 ***-**-00', lotSlug: 'novaya-riga-dom-240', source: 'Сайт', status: 'viewing', createdAt: '24 сентября', isMe: true },
  { id: 'L-1036', name: 'Дмитрий Р.', phone: '+7 925 ***-**-47', lotSlug: 'novaya-riga-dom-240', source: 'База покупателей', status: 'qualified', createdAt: '23 сентября' },
  { id: 'L-1031', name: 'Ольга Т.', phone: '+7 977 ***-**-15', lotSlug: 'novaya-riga-dom-240', source: 'Telegram', status: 'admitted', createdAt: '20 сентября' },
  { id: 'L-1027', name: 'Павел Н.', phone: '+7 915 ***-**-62', lotSlug: 'ramenki-86', source: 'ЦИАН', status: 'viewing', createdAt: '19 сентября' },
  { id: 'L-1019', name: 'Марина Л.', phone: '+7 926 ***-**-39', lotSlug: 'khamovniki-118', source: 'База покупателей', status: 'admitted', createdAt: '9 сентября' },
  { id: 'L-1004', name: 'Андрей В.', phone: '+7 985 ***-**-73', lotSlug: 'khamovniki-118', source: 'Яндекс', status: 'deal', createdAt: '2 сентября' },
]

export type ViewingStatus = 'scheduled' | 'done' | 'cancelled'

export const VIEWING_STATUS_LABEL: Record<ViewingStatus, string> = {
  scheduled: 'Назначен',
  done: 'Проведён',
  cancelled: 'Отменён',
}

export type Viewing = {
  id: string
  lotSlug: string
  date: string
  time: string
  buyer: string
  status: ViewingStatus
  isMe?: boolean
}

export const viewings: Viewing[] = [
  { id: 'V-311', lotSlug: 'novaya-riga-dom-240', date: '29 сентября', time: '14:00', buyer: 'Вы (демо-покупатель)', status: 'scheduled', isMe: true },
  { id: 'V-310', lotSlug: 'novaya-riga-dom-240', date: '29 сентября', time: '16:00', buyer: 'Дмитрий Р.', status: 'scheduled' },
  { id: 'V-309', lotSlug: 'ramenki-86', date: '30 сентября', time: '12:00', buyer: 'Павел Н.', status: 'scheduled' },
  { id: 'V-307', lotSlug: 'novaya-riga-dom-240', date: '1 октября', time: '10:00', buyer: 'Групповой показ', status: 'scheduled' },
  { id: 'V-298', lotSlug: 'novaya-riga-dom-240', date: '21 сентября', time: '12:00', buyer: 'Ольга Т.', status: 'done' },
  { id: 'V-281', lotSlug: 'khamovniki-118', date: '12 сентября', time: '18:00', buyer: 'Вы (демо-покупатель)', status: 'done', isMe: true },
]

export type VerificationStatus = 'missing' | 'uploaded' | 'reviewing' | 'passed'

export const VERIFICATION_STATUS_LABEL: Record<VerificationStatus, string> = {
  missing: 'Документ не загружен',
  uploaded: 'Документ загружен',
  reviewing: 'На проверке',
  passed: 'Проверка пройдена',
}

export type Participant = {
  name: string
  lotSlug: string
  proof: string
  verification: VerificationStatus
  /** Anonymous number in the auction, assigned on admission. */
  number?: number
  isMe?: boolean
}

export const participants: Participant[] = [
  { name: 'Вы (демо-покупатель)', lotSlug: 'novaya-riga-dom-240', proof: 'Одобрение ипотеки', verification: 'missing', isMe: true },
  { name: 'Вы (демо-покупатель)', lotSlug: 'khamovniki-118', proof: 'Выписка со счёта', verification: 'passed', number: 4, isMe: true },
  { name: 'Дмитрий Р.', lotSlug: 'novaya-riga-dom-240', proof: 'Одобрение ипотеки', verification: 'reviewing' },
  { name: 'Ольга Т.', lotSlug: 'novaya-riga-dom-240', proof: 'Выписка со счёта', verification: 'passed', number: 3 },
  { name: 'Павел Н.', lotSlug: 'ramenki-86', proof: 'Выписка со счёта', verification: 'uploaded' },
  { name: 'Марина Л.', lotSlug: 'khamovniki-118', proof: 'Выписка со счёта', verification: 'passed', number: 2 },
]

/** Admin-only. Never import this into public pages or seller report. */
export const reservePrices: Record<string, number> = {
  'novaya-riga-dom-240': 44_000_000,
  'khamovniki-118': 80_000_000,
  'ramenki-86': 38_500_000,
}

/** Admin next actions per lot. */
export const nextActions: Record<string, string> = {
  'novaya-riga-dom-240': 'Показ 29.09',
  'khamovniki-118': 'Итоги торгов',
  'ramenki-86': 'Проверка документов',
}

export const sellerReport = {
  lotSlug: 'novaya-riga-dom-240',
  period: '14–27 сентября',
  checkpoint: '30 сентября',
}
