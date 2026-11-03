# isaiahiruoha.com

Personal website of Isaiah Iruoha, built with React and Vite.

## Development

Requires Node 24 (see `.nvmrc`).

```sh
npm ci
npm run dev      # local dev server
npm run lint     # ESLint
npm test         # Vitest smoke tests
npm run build    # production build into dist/
npm run preview  # serve the production build locally
```

## Deployment

Every push to `main` runs lint, tests, and the build in GitHub Actions, then deploys `dist/` to GitHub Pages.
Pull requests run the same checks without deploying.
The custom domain is configured through `public/CNAME`.

Google Analytics only loads on the production domain, so local development never sends analytics hits.
