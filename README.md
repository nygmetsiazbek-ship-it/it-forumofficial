# IT Forum

Сайт IT-мектебі: сабақ кестесі, олимпиадалар, жаңалықтар, үздік оқушылар рейтингі,
форум және админ-панель.

Stack: React 18 + TypeScript + Vite 6 + Tailwind CSS v4 + Radix UI + Supabase.

## Іске қосу / Запуск

```bash
npm install
npm run dev      # http://localhost:3000
```

Прод-сборка:

```bash
npm run build    # tsc --noEmit + vite build -> build/
npm run preview
```

## Supabase

Ключи по умолчанию зашиты в `src/supabaseClient.ts`. Чтобы указать свой проект,
скопируйте `.env.example` в `.env`:

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

Приложение читает таблицы `news`, `olympiads`, `schedule_pdfs`, `top_students`,
`forum_posts` и подписывается на их realtime-изменения. Если таблица недоступна,
соответствующий раздел просто показывает пустое состояние — приложение не падает.

## Структура

```
index.html              точка входа Vite
vite.config.ts          конфиг сборки (alias @ -> src)
src/
  main.tsx              монтирование React
  App.tsx               роутинг по страницам + загрузка данных из Supabase
  supabaseClient.ts     клиент Supabase
  components/           страницы приложения (Header, Navigation, ITLines, ...)
  components/ui/        shadcn/ui компоненты на Radix
  styles/globals.css    Tailwind v4 + токены темы
supabase/functions/     Deno edge function (не входит в сборку фронтенда)
docs/legacy/            неиспользуемые компоненты из исходного шаблона
```

## Деплой

В репозитории есть workflow `.github/workflows/deploy.yml`, который собирает
приложение и публикует его на GitHub Pages.

Один раз нужно зайти в Settings → Pages и выбрать **Source: GitHub Actions**
(включить Pages из workflow нельзя — GitHub не даёт токену Actions создавать
Pages-сайт). После этого каждый push в `main` собирает и публикует сайт.

Сайт открывается по адресу
`https://nygmetsiazbek-ship-it.github.io/it-forumofficial/`, а каждый push
в `main` автоматически обновляет его.

`base: './'` в `vite.config.ts` делает пути к ассетам относительными, поэтому
одна и та же сборка работает и локально, и на подпути GitHub Pages.
