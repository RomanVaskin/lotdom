export type ReasonIcon = 'architecture' | 'nature' | 'ready' | 'transport' | 'district' | 'view'

export type PropertyDetails = {
  slug: string
  headline: string
  address: string
  description: string[]
  photos: { src: string; alt: string }[]
  specs: { label: string; value: string }[]
  reasons: { icon: ReasonIcon; title: string; text: string }[]
  nearby: { label: string; value: string }[]
  floorPlan?: { src: string; tabs: string[] }
}

export const properties: Record<string, PropertyDetails> = {
  'novaya-riga-dom-240': {
    slug: 'novaya-riga-dom-240',
    headline: '240 м² · 15 соток · 4 спальни',
    address: 'Истринский г. о., КП у Новорижского шоссе, 32 км от МКАД',
    description: [
      'Двухэтажный дом из клеёного бруса на последней линии посёлка у Новорижского шоссе. Панорамное остекление гостиной выходит прямо в сосновый лес — участок граничит с лесным массивом, соседей с этой стороны нет.',
      'Дом полностью готов к проживанию: чистовая отделка, кухня, встроенные шкафы, тёплые полы и система вентиляции. На первом этаже — гостиная-столовая со вторым светом, кабинет и гостевая спальня; на втором — три спальни, включая мастер-спальню с гардеробной.',
    ],
    photos: [
      { src: '/images/house-novaya-riga.png', alt: 'Фасад дома с панорамным остеклением у леса' },
      { src: '/images/house-interior.png', alt: 'Гостиная со вторым светом и камином' },
      { src: '/images/house-terrace.png', alt: 'Терраса с видом на участок и лес' },
      { src: '/images/house-bedroom.png', alt: 'Мастер-спальня с окном в сосны' },
    ],
    specs: [
      { label: 'Площадь дома', value: '240 м²' },
      { label: 'Участок', value: '15 соток' },
      { label: 'Спальни', value: '4' },
      { label: 'Санузлы', value: '3' },
      { label: 'Этажность', value: '2' },
      { label: 'Год постройки', value: '2022' },
      { label: 'Материал', value: 'Клеёный брус, стекло' },
      { label: 'Коммуникации', value: 'Газ, электричество 30 кВт, скважина' },
    ],
    reasons: [
      { icon: 'architecture', title: 'Современная архитектура', text: 'Проект бюро с панорамным остеклением и вторым светом в гостиной.' },
      { icon: 'nature', title: 'Участок у леса', text: 'Последняя линия посёлка, за забором — сосновый массив.' },
      { icon: 'ready', title: 'Готов к проживанию', text: 'Отделка, кухня, встроенная мебель и инженерные системы.' },
      { icon: 'transport', title: '30 минут до Москвы', text: 'По Новорижскому шоссе без светофоров до МКАД.' },
    ],
    nearby: [
      { label: 'МКАД', value: '32 км · 30 мин' },
      { label: 'Лес', value: 'Прилегает к участку' },
      { label: 'Школа', value: '4 км' },
      { label: 'Истринское вдхр.', value: '9 км' },
    ],
    floorPlan: { src: '/images/floor-plan.png', tabs: ['1 этаж · 138 м²', '2 этаж · 102 м²'] },
  },
  'khamovniki-118': {
    slug: 'khamovniki-118',
    headline: '118 м² · 3 комнаты · 5/7 этаж',
    address: 'Москва, Хамовники, 7 минут пешком до м. Фрунзенская',
    description: [
      'Трёхкомнатная квартира в клубном доме на тихой улице Хамовников. Окна гостиной и мастер-спальни выходят во двор, кухня-гостиная — на восток.',
      'Выполнен дизайнерский ремонт с полной заменой инженерии. Остаются кухня, встроенная мебель и техника. В доме — консьерж и подземный паркинг, одно машино-место входит в сделку.',
    ],
    photos: [{ src: '/images/apt-khamovniki.png', alt: 'Гостиная квартиры в Хамовниках' }],
    specs: [
      { label: 'Площадь', value: '118 м²' },
      { label: 'Комнаты', value: '3' },
      { label: 'Этаж', value: '5 из 7' },
      { label: 'Санузлы', value: '2' },
      { label: 'Потолки', value: '3,2 м' },
      { label: 'Год постройки', value: '2012' },
      { label: 'Паркинг', value: '1 машино-место' },
      { label: 'Ремонт', value: 'Дизайнерский' },
    ],
    reasons: [
      { icon: 'district', title: 'Клубный дом', text: 'Семь этажей, 28 квартир, консьерж и закрытый двор.' },
      { icon: 'ready', title: 'Заезжай и живи', text: 'Дизайнерский ремонт, кухня и техника остаются.' },
      { icon: 'nature', title: 'Рядом парки', text: 'Нескучный сад и Парк Горького — 10 минут пешком.' },
      { icon: 'transport', title: 'Центр рядом', text: 'Метро Фрунзенская в 7 минутах, Садовое — в 5 минутах на машине.' },
    ],
    nearby: [
      { label: 'м. Фрунзенская', value: '7 мин пешком' },
      { label: 'Нескучный сад', value: '10 мин' },
      { label: 'Школа', value: '400 м' },
      { label: 'Садовое кольцо', value: '1,8 км' },
    ],
  },
  'ramenki-86': {
    slug: 'ramenki-86',
    headline: '86 м² · 3 комнаты · 12/24 этаж',
    address: 'Москва, Раменки, 5 минут пешком до м. Мичуринский проспект',
    description: [
      'Светлая трёхкомнатная квартира в монолитном доме бизнес-класса. Окна на две стороны, из гостиной виден МГУ.',
      'Современный ремонт, изолированные спальни и просторная кухня-гостиная. Во дворе без машин — детские и спортивные площадки.',
    ],
    photos: [{ src: '/images/apt-ramenki.png', alt: 'Кухня-гостиная квартиры в Раменках' }],
    specs: [
      { label: 'Площадь', value: '86 м²' },
      { label: 'Комнаты', value: '3' },
      { label: 'Этаж', value: '12 из 24' },
      { label: 'Санузлы', value: '2' },
      { label: 'Потолки', value: '3 м' },
      { label: 'Год постройки', value: '2018' },
      { label: 'Окна', value: 'На две стороны' },
      { label: 'Ремонт', value: 'Современный' },
    ],
    reasons: [
      { icon: 'view', title: 'Вид на МГУ', text: 'Высокий этаж и открытый вид из гостиной.' },
      { icon: 'district', title: 'Двор без машин', text: 'Закрытая территория, паркинг под домом.' },
      { icon: 'transport', title: 'Метро рядом', text: 'Мичуринский проспект — 5 минут пешком.' },
      { icon: 'nature', title: 'Парки рядом', text: 'Раменский парк и Воробьёвы горы поблизости.' },
    ],
    nearby: [
      { label: 'м. Мичуринский пр-т', value: '5 мин пешком' },
      { label: 'МГУ', value: '2,5 км' },
      { label: 'Школа', value: '300 м' },
      { label: 'Раменский парк', value: '800 м' },
    ],
  },
}

export function getProperty(slug: string): PropertyDetails | undefined {
  return properties[slug]
}
