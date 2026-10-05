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

## Before Unity Asset Store submission

The portfolio contains Lobby System and Localization & Input Rebinding. The Lobby System gallery contains four asset-edition screenshots, including the demo's current joining limitation. Its video is explicitly labelled as the game version. The Localization & Input Rebinding gallery contains four screenshots showing Spanish localization, input bindings, graphics settings, and audio settings. Covers are generated presentation concepts based on the project interfaces, not exact product screenshots. Product support is available at `support@alexgolubchenko.com`.

Project media is configured in `src/data/site.ts`. Each screenshot has a source path and a translation key; add that key and its `Alt` counterpart to the project's English and Russian copy. Galleries start on the cover and change only through manual controls. Video links are optional.
