## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Design conventions

- When the user flags a visual issue, inspect all equivalent elements and adjacent sections on both pages for the same inconsistency before editing. Fix the shared cause across the affected component family, including all supported translations and responsive layouts; do not patch only the named item. Preserve deliberate differences between compact tags, content cards, and actions, and report what was checked and any verification limits.
- When the user flags a visual issue, inspect all equivalent elements and adjacent sections on both pages for the same inconsistency before editing. Fix the shared cause across the affected component family, including all supported translations and responsive layouts; do not patch only the named item. Preserve deliberate differences between compact tags, content cards, and actions, and report what was checked and any verification limits.
- Prefer scalable, content-driven solutions before hardcoded values or one-off offsets. Use intrinsic layout, shared styles, and actual content measurements where needed. For localization, calculate space from all supported translations at the current container width and recalculate after font loading or container resizing; preserve alignment without language-specific fixed heights or manual spacing patches.
- Prefer scalable, content-driven solutions before hardcoded values or one-off offsets. Use intrinsic layout, shared styles, and actual content measurements where needed. For localization, calculate space from all supported translations at the current container width and recalculate after font loading or container resizing; preserve alignment without language-specific fixed heights or manual spacing patches.
- Every hover effect must have equivalent visual feedback on mobile touch, including decorative cards and tags. Use `:active` for feedback while pressed; keep hover styles within `(hover: hover) and (pointer: fine)` so touch devices do not retain sticky hover states. Preserve keyboard `:focus-visible` feedback and respect reduced-motion preferences.
- Treat `src/pages/index.astro`, `src/styles/global.css` (layout), and `src/styles/theme.css` (approved Engine V01 visual system) as the reference for every page. Before changing a page, compare its equivalent sections with the home page.
- Use the approved navy #0B1020, raised #1C293A, deep #152236, rust #E87943, cyan #49C4D4, text #EDF3F8/#98AABC, and border #344559 tokens from `theme.css`. Use locally hosted Inter, 18px card corners, and restrained 150–250ms transitions. Orange emphasizes actions; cyan expresses technical links. Keep ordinary cards neutral and never invent project statuses or dependencies for decoration.
- Reuse the existing typography, color variables, spacing, section-heading columns, bordered cards, and primary/secondary button styles. Extend shared classes or tokens for recurring patterns instead of introducing page-specific copies or overrides.
- Align section details with their heading's content column. The experience section uses a stacked label/heading/description on one left edge, 64px desktop outer spacing, and two equal capability panels with compact tags; stack the panels on mobile. Do not reintroduce the old nested left offsets. Use the shared skills-list pattern for simple card collections and capability-list for compact tags.
- Keep the home hero compact and content-sized: 64px desktop/48px mobile outer spacing, a restrained headline, and a rounded technology panel. Avoid fixed full-screen heights or returning to the tall decorative diagram. Keep both language layouts stable.
- Keep English and Russian layouts stable when switching languages: reserve enough room for both translations, especially around cards, artwork, and images. Preserve responsive behavior and never clip translated text.
- Preserve agreed refinements: the Russian support title fits on one line, support copy uses a natural first-person tone and refers to Unity assets, and email contact offers both writing and copying the address.
- Every `mailto:` contact action must have a nearby copy-address button and a visible, selectable email address. Reuse `src/components/EmailContact.astro` for localized feedback and clipboard error handling; each contact must copy its own address.
- Check changes in both languages and at desktop/mobile widths when browser tooling is available. Run the production build and report any verification limitations.

## Astro documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
