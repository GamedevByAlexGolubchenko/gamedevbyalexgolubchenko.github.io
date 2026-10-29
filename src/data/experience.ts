import type { Locale } from './site';

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
