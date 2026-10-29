import type { APIRoute } from 'astro';
import { locales } from '../data/site';
import { pagePath } from '../data/routing';

// Only canonical, indexable pages belong here. Add new public pages as they ship.
const paths = locales.flatMap(locale => [pagePath(locale.code), pagePath(locale.code, 'support')]);

export const GET: APIRoute = ({ site }) => {
	if (!site) throw new Error('Set Astro site before generating the sitemap.');
	const escapeXml = (value: string) => value.replace(/[<>&'\"]/g, character => ({
		'<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;',
	}[character]!));
	const urls = paths.map(path => `<url><loc>${escapeXml(new URL(path, site).href)}</loc></url>`).join('\n');
	return new Response(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`, {
		headers: { 'Content-Type': 'application/xml; charset=utf-8' },
	});
};
