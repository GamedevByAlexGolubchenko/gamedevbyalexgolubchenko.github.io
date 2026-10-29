import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site }) => {
	if (!site) throw new Error('Set Astro site before generating robots.txt.');
	// Keep redirects crawlable so search engines can read their noindex tags.
	return new Response(`User-agent: *\nAllow: /\n\nSitemap: ${new URL('/sitemap.xml', site)}\n`, {
		headers: { 'Content-Type': 'text/plain; charset=utf-8' },
	});
};
