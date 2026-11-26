# Aurolis website

The landing page for [Aurolis](https://github.com/sagarsen2023/aurolis-api-client), the open-source, local-first API client.

Built with React, TanStack Router, Tailwind CSS v4, React Three Fiber, Motion and Lenis. The project structure comes from [calmui](https://www.npmjs.com/package/calmui).

## Commands

```bash
npm ci               # install
npm run dev          # local dev server
npm run build        # type-check, then build into dist/
npm run preview      # serve the production build
npm run error-check  # TypeScript only
npm run lint         # ESLint (Prettier runs as an ESLint rule)
npm run lint:fix     # ESLint + Prettier auto-fix
```

## Link previews

`public/og-image.png` (1200 x 630) is the Open Graph and Twitter image. Social sites need absolute URLs, so set the deployed address before building:

```bash
cp .env.example .env   # then set VITE_PUBLIC_SITE_URL to the site address
```

The build fills `%SITE_URL%` in `index.html` (canonical link, `og:url`, `og:image`, `twitter:image`) with that value.

## Page flow

1. **Splash**: the wordmark draws itself on a starfield; the Aurolis mark stands in for the "A".
2. **Hero**: a dotted 3D blob (React Three Fiber) behind the wordmark and an app screenshot, moving at different scroll speeds.
3. **About**: the mark draws on scroll (the A lights up, then the red ball draws the orbit), followed by a kinetic statement and a word-by-word paragraph.
4. **Features**: a large headline with floating cards, then a three-column grid with illustrations.
5. **Footer**: the wordmark over animated wave lines, a download panel, contact email, grouped links and a large wordmark.

With `prefers-reduced-motion`, the splash is skipped and every section renders without scroll animation.

## Structure

- `src/routes/`: TanStack Router file routes. `index.tsx` renders `HomeModule`.
- `src/modules/home/`: the landing page, one folder per section (`splash`, `hero`, `about`, `features`, `footer`).
- `src/modules/layout/`: the floating navigation pill.
- `src/components/`: shared pieces (mark, animated mark, wordmark, starfield, app window, buttons, cards, icons).
- `src/constants/`: links, wordmark glyphs, splash timing and the about-section copy.
- `src/lib/`: logo geometry, GLSL shaders and `cn`.
- `src/hooks/`: smooth scrolling, in-view and media-query hooks.
- `src/types/home/`: types for the landing page data.
- `public/images/`: the app screenshot (1440 and 2880 wide).
- `public/og-image.png`: the link preview image.
