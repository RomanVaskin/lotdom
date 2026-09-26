# lotdom

This is a [Next.js](https://nextjs.org) project bootstrapped with [v0](https://v0.app).

## Built with v0

This repository is linked to a [v0](https://v0.app) project. You can continue developing by visiting the link below -- start new chats to make changes, and v0 will push commits directly to this repo. Every merge to `main` will automatically deploy.

[Continue working on v0 →](https://v0.app/chat/projects/prj_i3eUXArA9q3b8L5KJfJnaktUEkSS)

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Learn More

To learn more, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [v0 Documentation](https://v0.app/docs) - learn about v0 and how to use it.

## Frontend-прототип: маршруты

Интерактивный прототип без backend: все данные — mock, состояния форм живут в браузере.

| Маршрут | Экран |
| --- | --- |
| `/` | Главная |
| `/properties` | Каталог лотов (`?stage=collecting\|viewings\|auction`) |
| `/properties/[slug]` | Карточка объекта |
| `/buyer/viewing?lot=[slug]` | Запись на показ → «Показ подтверждён» |
| `/buyer/verification?lot=[slug]` | Подтверждение средств: не загружен → загружен → на проверке → пройдена |
| `/auction/[id]` | Комната торгов (резерв не раскрывается, только «Условия продажи выполнены») |
| `/auction/[id]/result` | Результат торгов (победитель) |
| `/buyer` | Кабинет покупателя |
| `/sell` | Продавцу + заявка |
| `/seller`, `/seller/report` | Кабинет и отчёт продавца |
| `/login` | Mock-вход: выбор роли |
| `/admin`, `/admin/{objects,leads,buyers,viewings,auctions}` | Кабинет агентства |

Источники mock-данных (одно место на сущность):

- `lib/lots.ts` — лоты, этапы, воронка (`metrics`), менеджер объекта;
- `lib/property.ts` — детали карточки объекта;
- `lib/auctions.ts` — торги, ставки, итоги;
- `lib/crm.ts` — лиды, показы, покупатели, отчёт продавца; `reservePrices` — только для admin.
