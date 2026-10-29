import { locales, type Locale, type PageName } from './site';

export function localeFromPath(pathname: string): Locale {
	return locales.find(locale => locale.code === pathname.split('/')[1])?.code ?? 'en';
}

export function pagePath(locale: Locale, page: PageName = 'home'): string {
	const prefix = locale === 'en' ? '/' : `/${locale}/`;
	return page === 'home' ? prefix : `${prefix}support/`;
}
