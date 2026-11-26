# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Vite dev server
npm run build        # Type-check, then build into dist/
npm run error-check  # TypeScript type check only
npm run lint         # ESLint (Prettier runs as an ESLint rule)
npm run lint:fix     # ESLint + Prettier auto-fix
```

Install with `npm ci`. Keep `package-lock.json` in sync with `package.json`.

## What this is

The dark-mode landing page for Aurolis, the local-first API client in `sagarsen2023/aurolis-api-client`. It follows the app's brand: Wix Madefor Display (sans), Tiro Kannada italic (serif accents), JetBrains Mono, lavender `#edc5fc`, violet `#b9a3ff`, purple `#7b5ce0`, coral `#e73825` on `#0c0b0c`.

## Architecture

- Project structure from calmui (`calmui.json`, template `vite-react`). Add routes with `npx calmui generate-route /path`.
- **TanStack Router** file routes in `src/routes/` (`src/routeTree.gen.ts` is generated). `index.tsx` renders `HomeModule` from `src/modules/home/`.
- `src/modules/home/<section>/`: `splash`, `hero`, `about`, `features`, `footer`. `src/modules/layout/nav-pill.tsx` is the fixed navigation.
- Scroll animation uses `motion` (`useScroll`, `useTransform`) on top of Lenis smooth scrolling (`src/hooks/use-smooth-scroll.ts`). The splash pauses Lenis until it leaves.
- 3D uses React Three Fiber with custom `ShaderMaterial`s from `src/lib/shaders.ts` (hero point blob, footer wave lines). Both canvases are lazy-loaded and stop rendering when off screen. Update uniforms through the mesh or points ref inside `useFrame`, not through a memoized value (the React Compiler lint rules reject that).
- `src/lib/logo-geometry.ts` holds the mark's geometry (A path, tilted orbit, ball position) and the orbit trail used by `LogoDraw`.
- `src/constants/wordmark.ts` holds the real wordmark outlines; `src/constants/splash.ts` the stroke paths the splash draws before it fades to those outlines.
- Every animation must have a reduced-motion path (`useReducedMotion`): no splash, no parallax, final states shown.

## Key conventions

- **No `console.*`**: ESLint enforces `no-console: error`.
- Unused variables must start with `_`.
- Prettier (with `prettier-plugin-tailwindcss`) runs through ESLint; run `npm run lint:fix` before committing.
- Tailwind CSS v4: no `tailwind.config.js`; tokens are in `@theme` in `src/index.css`.
- Don't add code comments; write self-explanatory code.
- Copy describes only what the Aurolis app actually does: no invented stats, testimonials or unbuilt features.
