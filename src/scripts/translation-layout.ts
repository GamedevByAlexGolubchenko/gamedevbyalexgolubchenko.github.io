import { formatExperienceText } from '../data/experience';
import type { Locale } from '../data/site';

// The URL already provides translated HTML. Only hidden measurement copies need
// localization; never rewrite the live page or its accessible names at startup.
const dictionaries = JSON.parse(document.querySelector('#i18n-data')?.textContent || '{}');
const shell = document.querySelector<HTMLElement>('.page-shell')!;
const stableSelector = '.hero-main, h1[data-i18n]:not(.hero-main *), h2[data-i18n], h3[data-i18n], p[data-i18n]:not(.hero-main *), .project-features li, .project-status, .skills-list li, .capability-list li, .hero-stack-description, .capability-label, .button-link, .project-link, .primary-nav a';

function localizeProbe(probe: HTMLElement, locale: Locale) {
	probe.lang = locale;
	const dictionary = dictionaries[locale];
	const valueAt = (path: string) => path.split('.').reduce((value, key) => value?.[key], dictionary);
	probe.querySelectorAll<HTMLElement>('[data-i18n]').forEach(element => {
		const value = valueAt(element.dataset.i18n!);
		if (typeof value === 'string') element.textContent = formatExperienceText(value, locale);
	});
	probe.querySelectorAll<HTMLElement>('[data-i18n-list]').forEach(list => {
		const values = valueAt(list.dataset.i18nList!);
		list.querySelectorAll('[data-list-item]').forEach((item, index) => {
			if (typeof values?.[index] === 'string') item.textContent = values[index];
		});
	});
}

let fontRevision = 0;
let lastMeasurement = '';

function reserveTranslationSpace() {
	const shellWidth = shell.getBoundingClientRect().width;
	const key = `${shellWidth}:${fontRevision}`;
	if (!shellWidth || key === lastMeasurement) return;
	const compactMobile = matchMedia('(max-width: 800px)').matches;
	const followsContent = (element: Element) => compactMobile && element.matches('.experience-section :is(h2, p)[data-i18n], .home-support-callout :is(h2, p)[data-i18n], .projects-section :is(h2, h3, p)[data-i18n], .project-features li, .support-hero-main :is(h1, p)[data-i18n]');
	const candidates = [...shell.querySelectorAll<HTMLElement>(stableSelector)];
	const targets = candidates.filter(element => !followsContent(element));
	candidates.forEach(element => {
		if (followsContent(element)) {
			element.classList.remove('translation-reserved');
			element.style.removeProperty('--translation-min-height');
		}
		if (element.matches('h1, h2, h3, p, .hero-stack-description') && !followsContent(element)) {
			element.classList.add('translation-space-centered');
		}
	});

	// Prepare every locale before attaching anything. Strip resource URLs so
	// measuring a page cannot download gallery images, including deferred slides.
	const probes = (Object.keys(dictionaries) as Locale[]).map(locale => {
		const probe = shell.cloneNode(true) as HTMLElement;
		probe.setAttribute('aria-hidden', 'true');
		probe.inert = true;
		probe.classList.add('translation-measure');
		probe.style.width = `${shellWidth}px`;
		probe.querySelectorAll('img, source, video, audio, iframe').forEach(element => {
			for (const attribute of ['src', 'srcset', 'poster']) element.removeAttribute(attribute);
		});
		probe.querySelectorAll('[id]').forEach(element => element.removeAttribute('id'));
		probe.querySelectorAll<HTMLElement>(stableSelector).forEach(element => {
			element.classList.remove('translation-reserved');
			element.style.removeProperty('min-height');
			element.style.removeProperty('--translation-min-height');
			element.style.removeProperty('min-width');
		});
		const title = probe.querySelector<HTMLElement>('.support-hero h1');
		title?.style.removeProperty('--support-title-size');
		localizeProbe(probe, locale);
		let titleWidthProbe: HTMLElement | undefined;
		if (title && !compactMobile) {
			titleWidthProbe = title.cloneNode(true) as HTMLElement;
			titleWidthProbe.style.cssText = 'position: absolute; width: max-content; max-width: none; min-width: 0;';
			title.parentElement!.append(titleWidthProbe);
		}
		return {
			probe, title, titleWidthProbe,
			samples: [...probe.querySelectorAll<HTMLElement>(stableSelector)]
				.filter(element => element !== titleWidthProbe && !followsContent(element)),
		};
	});
	const fragment = document.createDocumentFragment();
	probes.forEach(({ probe }) => fragment.append(probe));
	document.body.append(fragment);
	const heights = targets.map(() => 0);
	const widths = targets.map(() => 0);
	let titleSize: number | undefined;
	try {
		// Read all natural title widths together, then write one common fitted size.
		const firstTitle = probes[0]?.title;
		if (firstTitle && !compactMobile) {
			const availableWidth = firstTitle.getBoundingClientRect().width;
			const baseSize = parseFloat(getComputedStyle(firstTitle).fontSize);
			const widestTitle = Math.max(...probes.map(({ titleWidthProbe }) => titleWidthProbe!.getBoundingClientRect().width));
			titleSize = baseSize * Math.min(1, availableWidth / widestTitle);
			probes.forEach(({ title }) => title!.style.setProperty('--support-title-size', `${titleSize}px`));
		}
		// One layout read phase for all translated elements, instead of repeatedly
		// changing a single clone between reads. All live writes happen afterward.
		probes.forEach(({ samples }) => samples.forEach((element, index) => {
			const rect = element.getBoundingClientRect();
			heights[index] = Math.max(heights[index], rect.height);
			if (element.matches('.primary-nav a, .action-row .button-link')) widths[index] = Math.max(widths[index], rect.width);
		}));
	} finally {
		probes.forEach(({ probe }) => probe.remove());
	}

	const targetIndexes = new Map(targets.map((element, index) => [element, index]));
	const equalizeCollection = (root: Element, selector: string) => {
		const indexes = [...root.querySelectorAll(selector)]
			.map(element => targetIndexes.get(element as HTMLElement)).filter((index): index is number => index !== undefined);
		const height = Math.max(0, ...indexes.map(index => heights[index]));
		indexes.forEach(index => { heights[index] = height; });
	};
	shell.querySelectorAll('.capability-groups').forEach(group => {
		equalizeCollection(group, '.capability-list li');
		equalizeCollection(group, '.capability-label');
	});
	shell.querySelectorAll('.skills-list').forEach(list => equalizeCollection(list, 'li'));
	shell.querySelectorAll('.hero-stack').forEach(list => equalizeCollection(list, '.hero-stack-description'));
	targets.forEach((element, index) => {
		element.classList.add('translation-reserved');
		element.style.setProperty('--translation-min-height', `${Math.ceil(heights[index])}px`);
		if (widths[index]) element.style.minWidth = `${Math.ceil(widths[index])}px`;
	});
	const title = shell.querySelector<HTMLElement>('.support-hero h1');
	if (titleSize !== undefined) title?.style.setProperty('--support-title-size', `${titleSize}px`);
	else title?.style.removeProperty('--support-title-size');
	lastMeasurement = key;
}

let fontsReady = false;
let resizeTimer: ReturnType<typeof setTimeout>;
function scheduleMeasurement(delay = 120) {
	if (!fontsReady) return;
	clearTimeout(resizeTimer);
	resizeTimer = setTimeout(() => requestAnimationFrame(reserveTranslationSpace), delay);
}

// The preloaded font is ready before the initial measurement. Coalesce resize
// bursts, and do not repeat work when neither width nor loaded fonts changed.
document.fonts.ready.then(() => {
	fontsReady = true;
	scheduleMeasurement(0);
});
document.fonts.addEventListener('loadingdone', () => {
	fontRevision++;
	scheduleMeasurement(0);
});
new ResizeObserver(() => scheduleMeasurement()).observe(shell);
