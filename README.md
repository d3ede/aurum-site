# Aurum website

A standalone presentation website for Aurum Launcher. React, TypeScript, and Vite; static output with no backend. Separate Git repository from the launcher.

## Local development

Requires Node.js 22.12 or newer.

```sh
npm ci
npm run dev
```

Open http://127.0.0.1:4173. `npm run build` checks TypeScript and produces `dist/`. `npm run preview` serves that build.

## GitHub Pages

1. Create a new GitHub repository and push this repository's `main` branch.
2. In **Settings → Pages → Build and deployment**, select **GitHub Actions**.
3. Run the **Deploy to GitHub Pages** workflow (or push to `main`).

The workflow builds and deploys `dist/`. Vite uses `base: './'`, and all image paths use `import.meta.env.BASE_URL`, so both repository subpaths and a custom domain work without editing the code. There is no client-side router.

## Editing

- Content, RU/EN translations, screenshot gallery, and links: `src/main.tsx`.
- Theme colors, layout, hover and motion: `src/styles.css`.
- Launcher vector patterns: `src/Patterns.tsx`.
- Actual launcher screenshots and branding: `public/assets/`.
- Theme follows the operating system on first visit; manual theme and language choices are saved locally.

Downloads point to the launcher's latest GitHub release. No analytics or external runtime requests are used. Screenshots contain demonstration data. The catalog copy describes search, installation and updates through Modrinth and CurseForge, plus optional search across sources.

## Assets and license

Original artwork, copied launcher patterns, screenshots, and branding are from [Aurum Launcher](https://github.com/d3ede/aurum-launcher). Preserve `LICENSE`, `NOTICE`, and `ASSETS.md` when distributing the site. This is a source-available project under PolyForm Noncommercial 1.0.0; third-party assets retain their own terms.
