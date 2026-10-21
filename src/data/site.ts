import { ptBR } from './pt-BR';
import { es } from './es';

export const locales = [
 { code: 'en', label: 'English', flag: 'us' },
 { code: 'ru', label: 'Русский', flag: 'ru' },
 { code: 'pt-BR', label: 'Português', flag: 'br' },
 { code: 'es', label: 'Español', flag: 'es' },
] as const;
export type Locale = typeof locales[number]['code'];

export type PageName = 'home' | 'support';

// The exact start day is unknown; count completed years from November 2020.
export const careerStart = { year: 2020, month: 11 } as const;
export function getExperienceYears(date = new Date()) {
	return Math.max(0, date.getFullYear() - careerStart.year - (date.getMonth() + 1 < careerStart.month ? 1 : 0));
}

export function formatExperienceText(text: string, locale: Locale, date = new Date()) {
	const years = getExperienceYears(date);
	const category = new Intl.PluralRules(locale).select(years);
	const unit = locale === 'ru' ? (category === 'one' ? 'года' : 'лет') : locale === 'pt-BR' ? (category === 'one' ? 'ano' : 'anos') : locale === 'es' ? (category === 'one' ? 'año' : 'años') : (category === 'one' ? 'year' : 'years');
	return text.replaceAll('{experienceYears}', String(years)).replaceAll('{experienceUnit}', unit);
}

export const profile = {
	name: 'Alex Golubchenko',
	role: 'Senior Software Engineer (.NET)',
	contactEmail: 'contact@alexgolubchenko.com',
	supportEmail: 'support@alexgolubchenko.com',
	linkedin: 'https://www.linkedin.com/in/alexgolubchenko/',
	instagram: 'https://www.instagram.com/alexgolubchenkoglobal/',
	youtube: 'https://www.youtube.com/@AlekseiGolubchenkoChannelEng/featured',
	technologies: ['Unity', 'C#', '.NET', 'Editor tooling', 'Runtime systems'],
	industries: ['Fintech', 'Trading', 'Hospitality', 'Fiscal Solutions', 'Game Development'],
} as const;

export type Project = { id: string; number: string; status: 'preparing' | 'project'; cover: string; screenshots: { src: string; key: string }[]; video?: string };
export const projects: Project[] = [
 { id: 'lobby', number: '01', status: 'preparing', cover: '/images/projects/lobby-cover-v4.png', screenshots: [
   { src: '/images/projects/lobby-asset-1.png', key: 'overview' },
   { src: '/images/projects/lobby-asset-2.png', key: 'creation' },
   { src: '/images/projects/lobby-asset-3.png', key: 'filtering' },
   { src: '/images/projects/lobby-asset-4.png', key: 'joining' },
 ], video: 'https://www.youtube.com/watch?v=eXjHYdSl-No' },
 { id: 'localization', number: '02', status: 'project', cover: '/images/projects/localization-cover-v4.png', screenshots: [
   { src: '/images/projects/localization-input-1.png', key: 'localizedSettings' },
   { src: '/images/projects/localization-input-2.png', key: 'inputBindings' },
   { src: '/images/projects/localization-input-3.png', key: 'graphicsSettings' },
   { src: '/images/projects/localization-input-4.png', key: 'audioSettings' },
 ] },
];

export const translations = {
 es,
	'pt-BR': ptBR,
	en: {
		meta: {
			homeTitle: 'Alex Golubchenko — Senior Software Engineer',
			homeDescription: 'Software engineering by Alex Golubchenko: maintainable .NET systems, Unity tools, and reusable game-development software.',
			supportTitle: 'Support — Alex Golubchenko',
			supportDescription: 'Product support and contact information for Unity tools by Alex Golubchenko.',
		},
		gallery: { previous: 'Previous', next: 'Next', open: 'Expand image', close: 'Close gallery', cover: 'Cover', label: 'Project gallery' },
		nav: { home: 'Home', work: 'Work', support: 'Support', language: 'Switch language' },
		common: {
			name: 'Alex Golubchenko',
			homeLinkLabel: 'Alex Golubchenko — home',
			status: 'Senior Software Engineer',
			linkedin: 'LinkedIn',
			instagram: 'Instagram',
			youtube: 'YouTube',
			footerLine: 'Maintainable software, engineered with care.',
			copyright: 'Alex Golubchenko',
		},
		home: {
			eyebrow: 'Unity / C# / .NET',
			title: 'Software built to stay maintainable.',
			intro: 'I build software of varying complexity across .NET and Unity, with an emphasis on clean architecture, reusable systems, and long-term maintainability.',
			primaryCta: 'View selected work',
			secondaryCta: 'Get support',
			indexLabel: 'Specialization',
			indexItems: ['.NET', 'Unity', 'Distributed systems'],
			aboutLabel: 'Experience',
			aboutTitle: 'Production engineering across systems and domains.',
			aboutBody: 'I am a Senior Software Engineer with over {experienceYears} {experienceUnit} of experience building and maintaining business-critical backend systems across fintech, fiscal compliance, hospitality, and trading. My work includes distributed systems, microservices, event-driven architecture, database optimization, real-time systems, and reusable Unity software.',
			skillsLabel: 'Core capabilities',
			technologiesLabel: 'Technologies',
			technologyItems: profile.technologies,
			industryItems: profile.industries,
			stackBackend: 'Backend systems',
			stackLanguage: 'Application code',
			stackUnity: 'Game development tools',
			industriesLabel: 'Industries',
			workLabel: 'Projects',
			workTitle: 'Tools for Unity',
			workIntro: 'Multiplayer lobbies, localization, and input rebinding.',
			projects: [
  {
    "status": "Preparing for publication",
    "title": "Lobby System",
    "body": "A Unity lobby system used in my own game. I’m developing a standalone asset based on it with an updated interface.",
    "features": [
      "Lobby discovery and filtering",
      "Validation and real-time updates",
      "View selected lobby details"
    ],
    "meta": "Unity · C# · Steamworks",
    "cta": "Watch demo",
    "coverAlt": "Lobby System cover with the lobby browser interface with navy framing and rust accents",
    "gameScreenshot": "Original game version — Server Observer lobby browser",
    "gameScreenshotAlt": "Game-version lobby browser with player counts and ping values.",
    "overview": "Asset edition — lobby browser and selected lobby details",
    "overviewAlt": "Steam Lobby Observer Demo listing lobbies with player counts, ping, mode, map, selected lobby details and a status log.",
    "creation": "Asset edition — create a lobby",
    "creationAlt": "Create Lobby dialog with lobby name, maximum players, game mode and map fields.",
    "filtering": "Asset edition — filter lobbies by map",
    "filteringAlt": "Lobby browser filtered to the Desert map, showing four matching lobbies.",
    "joining": "Demo limitation — joining games is not yet implemented",
    "joiningAlt": "Join Lobby Info dialog stating that the ability to join games is coming in future updates."
  },
  {
    "status": "Project",
    "title": "Localization & Input Rebinding",
    "body": "A settings system used in my Unity game. It brings together interface localization, input rebinding, and graphics and audio settings.",
    "features": [
      "Localization",
      "Input rebinding",
      "Graphics and audio settings"
    ],
    "meta": "Unity · C#",
    "cta": "Watch demonstration",
    "coverAlt": "Localization & Input Rebinding cover with controls, Spanish localization, graphics and audio interfaces with navy framing and rust accents",
    "gameScreenshot": "",
    "gameScreenshotAlt": "",
    "localizedSettings": "Spanish localization — unsaved changes dialog",
    "localizedSettingsAlt": "Settings in Spanish with Español selected and a confirmation dialog for leaving without applying unsaved changes.",
    "inputBindings": "Controls — keyboard and mouse bindings",
    "inputBindingsAlt": "Controls settings showing movement, jump, run, inventory and attack bindings, including Up Arrow for moving forward and B for jumping.",
    "graphicsSettings": "Graphics — display settings",
    "graphicsSettingsAlt": "Graphics settings showing 1920×1080 at 120 Hz, borderless window mode and a 120 FPS limit.",
    "audioSettings": "Audio — volume controls",
    "audioSettingsAlt": "Audio settings with separate sliders for master, music, sound effects and voice chat volume."
  }
],
			supportLabel: 'Product support',
			supportTitle: 'Help with your tools.',
			supportBody: 'The support page is the permanent contact point for published Unity assets and explains what to include in a useful report.',
			supportCta: 'Open support page',
		},
		support: {
			eyebrow: 'Product support',
			title: 'Let’s solve the issue.',
			intro: 'Need help with my Unity assets? Email support and tell me about the issue. Include the information listed below — it will help me investigate faster.',
			availabilityLabel: 'Send a report',
			availabilityBody: 'Include the asset name, Unity version, and steps to reproduce.',
			emailCta: 'Write an email',
			copyEmailCta: 'Copy email address',
			copyEmailSuccess: 'Email address copied.',
			copyEmailError: 'Could not copy. Please select and copy the address above.',
			processLabel: 'Before reporting',
			processTitle: 'What to include',
			stepOneTitle: 'Environment',
			stepOneBody: 'Unity version, render pipeline, operating system, and target platform.',
			stepTwoTitle: 'Package',
			stepTwoBody: 'Asset name and version, plus any relevant project configuration.',
			stepThreeTitle: 'Reproduction',
			stepThreeBody: 'Short steps, expected result, actual result, and the complete console error.',
			scopeLabel: 'Support scope',
			scopeTitle: 'How I can help',
			scopeItems: ['Installation and setup', 'Compatibility questions', 'Bug reports and regressions', 'Documentation corrections'],
			contactLabel: 'Partnerships',
			contactTitle: 'Let’s work together.',
			contactBody: 'For professional enquiries, freelance work, or partnership ideas, get in touch by email.',
			contactCta: 'Contact Alex',
		},
	},
	ru: {
		meta: {
			homeTitle: 'Алексей Голубченко — Senior Software Engineer',
			homeDescription: 'Разработка поддерживаемых .NET-систем, Unity-инструментов и многократно используемого ПО для геймдева.',
			supportTitle: 'Поддержка — Алексей Голубченко',
			supportDescription: 'Поддержка Unity-инструментов и контактная информация Алексея Голубченко.',
		},
		gallery: { previous: 'Назад', next: 'Вперёд', open: 'Увеличить изображение', close: 'Закрыть галерею', cover: 'Обложка', label: 'Галерея проекта' },
		nav: { home: 'Главная', work: 'Работы', support: 'Поддержка', language: 'Сменить язык' },
		common: {
			name: 'Алексей Голубченко',
			homeLinkLabel: 'Алексей Голубченко — главная',
			status: 'Senior Software Engineer',
			linkedin: 'LinkedIn',
			instagram: 'Instagram',
			youtube: 'YouTube',
			footerLine: 'Поддерживаемое ПО с инженерным вниманием к деталям.',
			copyright: 'Алексей Голубченко',
		},
		home: {
			eyebrow: 'Unity / C# / .NET',
			title: 'Создаю ПО, которое легко поддерживать.',
			intro: 'Я разрабатываю программное обеспечение различной сложности на .NET и Unity, уделяя особое внимание чистой архитектуре, многократно используемым системам и долгосрочной поддерживаемости.',
			primaryCta: 'Смотреть работы',
			secondaryCta: 'Получить поддержку',
			indexLabel: 'Специализация',
			indexItems: ['.NET', 'Unity', 'Распределённые системы'],
			aboutLabel: 'Опыт',
			aboutTitle: 'Производственная разработка систем для разных отраслей.',
			aboutBody: 'Я Senior Software Engineer с опытом более {experienceYears} {experienceUnit} в разработке и поддержке критически важных backend-систем для финтеха, фискального соответствия, гостиничного бизнеса и трейдинга. Моя специализация включает распределённые системы, микросервисы, событийную архитектуру, оптимизацию баз данных, системы реального времени и многократно используемое ПО для Unity.',
			skillsLabel: 'Основные компетенции',
			technologiesLabel: 'Технологии',
			technologyItems: profile.technologies,
			industryItems: profile.industries,
			stackBackend: 'Серверные системы',
			stackLanguage: 'Прикладной код',
			stackUnity: 'Инструменты для игр',
			industriesLabel: 'Отрасли',
			workLabel: 'Проекты',
			workTitle: 'Инструменты для Unity',
			workIntro: 'Мультиплеерное лобби, локализация и переназначение управления.',
			projects: [
  {
    "status": "Готовится к публикации",
    "title": "Lobby System",
    "body": "Система лобби для Unity, используемая в моей игре. На её основе готовлю отдельный ассет с обновлённым интерфейсом.",
    "features": [
      "Поиск и фильтрация лобби",
      "Валидация и обновления в реальном времени",
      "Просмотр параметров выбранного лобби"
    ],
    "meta": "Unity · C# · Steamworks",
    "cta": "Смотреть демо",
    "coverAlt": "Обложка Lobby System с интерфейсом браузера лобби на тёмно-синем фоне с оранжевыми акцентами",
    "gameScreenshot": "Исходная версия для игры — браузер лобби Server Observer",
    "gameScreenshotAlt": "Браузер лобби игровой версии с количеством игроков и показателями пинга.",
    "overview": "Версия ассета — браузер лобби и сведения о выбранном лобби",
    "overviewAlt": "Steam Lobby Observer Demo: список лобби с количеством игроков, пингом, режимом, картой, сведениями о выбранном лобби и журналом событий.",
    "creation": "Версия ассета — создание лобби",
    "creationAlt": "Окно создания лобби с названием, максимальным количеством игроков, режимом игры и картой.",
    "filtering": "Версия ассета — фильтрация лобби по карте",
    "filteringAlt": "Браузер лобби с фильтром по карте Desert и четырьмя подходящими лобби.",
    "joining": "Ограничение демо — подключение к игре пока не реализовано",
    "joiningAlt": "Окно Join Lobby Info сообщает, что возможность подключения к играм появится в будущих обновлениях."
  },
  {
    "status": "Проект",
    "title": "Localization & Input Rebinding",
    "body": "Система настроек для Unity, используемая в моей игре. Объединяет локализацию интерфейса, переназначение управления, настройки графики и звука.",
    "features": [
      "Локализация",
      "Переназначение управления",
      "Настройки графики и звука"
    ],
    "meta": "Unity · C#",
    "cta": "Смотреть демонстрацию",
    "coverAlt": "Обложка Localization & Input Rebinding с интерфейсами управления, испанской локализации, графики и звука на тёмно-синем фоне с оранжевыми акцентами",
    "gameScreenshot": "",
    "gameScreenshotAlt": "",
    "localizedSettings": "Испанская локализация — предупреждение о несохранённых изменениях",
    "localizedSettingsAlt": "Настройки на испанском языке: выбран Español и открыто окно подтверждения выхода без применения несохранённых изменений.",
    "inputBindings": "Управление — назначение клавиш и кнопок мыши",
    "inputBindingsAlt": "Настройки управления с назначениями для движения, прыжка, бега, инвентаря и атаки: стрелка вверх для движения вперёд и B для прыжка.",
    "graphicsSettings": "Графика — настройки экрана",
    "graphicsSettingsAlt": "Настройки графики: разрешение 1920×1080 при 120 Гц, оконный режим без рамки и ограничение 120 FPS.",
    "audioSettings": "Звук — регулировка громкости",
    "audioSettingsAlt": "Настройки звука с отдельными ползунками общей громкости, музыки, звуковых эффектов и голосового чата."
  }
],
			supportLabel: 'Поддержка продуктов',
			supportTitle: 'Помощь с инструментами.',
			supportBody: 'Страница поддержки — постоянный контакт для опубликованных Unity-ассетов; на ней указано, что приложить к полезному обращению.',
			supportCta: 'Открыть поддержку',
		},
		support: {
			eyebrow: 'Поддержка продуктов',
			title: 'Поможем разобраться.',
			intro: 'Нужна помощь с моими Unity-ассетами? Напишите на почту поддержки и расскажите о проблеме. Приложите информацию из списка ниже — это поможет быстрее разобраться.',
			availabilityLabel: 'Сообщить о проблеме',
			availabilityBody: 'Укажите название ассета, версию Unity и шаги воспроизведения.',
			emailCta: 'Написать письмо',
			copyEmailCta: 'Скопировать адрес',
			copyEmailSuccess: 'Адрес скопирован.',
			copyEmailError: 'Не удалось скопировать. Выделите и скопируйте адрес выше.',
			processLabel: 'Перед обращением',
			processTitle: 'Что приложить',
			stepOneTitle: 'Окружение',
			stepOneBody: 'Версию Unity, render pipeline, операционную систему и целевую платформу.',
			stepTwoTitle: 'Пакет',
			stepTwoBody: 'Название и версию ассета, а также важные настройки проекта.',
			stepThreeTitle: 'Воспроизведение',
			stepThreeBody: 'Короткие шаги, ожидаемый и фактический результат, полный текст ошибки из Console.',
			scopeLabel: 'Область поддержки',
			scopeTitle: 'С чем помогу',
			scopeItems: ['Установка и настройка', 'Вопросы совместимости', 'Ошибки и регрессии', 'Исправления документации'],
			contactLabel: 'Сотрудничество',
			contactTitle: 'Обсудим вашу идею.',
			contactBody: 'По вопросам профессионального сотрудничества, фриланса или партнёрских идей напишите по электронной почте.',
			contactCta: 'Связаться с Алексеем',
		},
	},
} as const;
