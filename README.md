# alexgolubchenko.com

Personal Unity and .NET developer site built with Astro and deployed to GitHub Pages.

## Commands

| Command | Action |
| --- | --- |
| `npm install` | Install dependencies |
| `npm run dev -- --background` | Start Astro's background development server |
| `npm run build` | Build the static production site |
| `npm run preview` | Preview the production build |

Manage the background server with `npx astro dev status`, `npx astro dev logs`, and `npx astro dev stop`.

## Search indexing

The build generates `/robots.txt` and `/sitemap.xml` using the production domain in `astro.config.mjs`. Add new canonical public pages to `src/pages/sitemap.xml.ts`; exclude redirects and draft pages. Legacy `/design-draft/` routes already produce redirects with `noindex` and must remain crawlable so search engines can see that directive.

After deployment, verify the domain in Google Search Console and submit `https://alexgolubchenko.com/sitemap.xml`. English uses `/` and `/support/`. Russian, Spanish, and Brazilian Portuguese use `/ru/`, `/es/`, and `/pt-BR/` prefixes, including support pages. All pages render their translation at build time and declare self-canonical and reciprocal `hreflang` URLs. The sitemap derives the eight public URLs from the shared locale routing helper. The URL controls the language; saved browser preferences do not override it.

## Before Unity Asset Store submission

The portfolio contains Lobby System and Localization & Input Rebinding. The Lobby System gallery contains four asset-edition screenshots, including the demo's current joining limitation. Its video is explicitly labelled as the game version. The Localization & Input Rebinding gallery contains four screenshots showing Spanish localization, input bindings, graphics settings, and audio settings. Covers are generated presentation concepts based on the project interfaces, not exact product screenshots. Product support is available at `support@alexgolubchenko.com`.

Project media is configured in `src/data/site.ts` using image imports from `src/assets/projects/`. Each screenshot has an image and a translation key; add that key and its `Alt` counterpart to all four translations. Astro generates responsive WebP thumbnails at build time. Screenshots receive their image URLs only when selected, and expanding the gallery loads the unmodified full-resolution original. Galleries start on the cover and change only through manual controls. Video links are optional.

Shared layout measurements run after fonts load and reserve space for every supported translation at the current container width. Measurement copies have no active image URLs. Reads and writes are batched; resizing is coalesced, and unchanged widths are skipped. Font changes invalidate the measurements. The live page stays in the language rendered from its URL.
