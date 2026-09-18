# Yashvi Bagga Productions

> **Project type:** Angular 20 **web-app / frontend** (marketing site + admin CRM). See [`PROJECT_TYPE.md`](PROJECT_TYPE.md). This is **not** an infrastructure-as-code repository.

Public website and admin control center for [Yashvi Bagga Productions](https://ybproductions.co.in).

## Tech stack

- Angular 20 standalone components, signals, and reactive forms
- Tailwind CSS + SCSS
- Node/Express host (`server.ts`) with `/health`, **Pino** structured logging, and optional **Sentry** error tracking
- Zod validation on application submissions before they hit `POST /api/v1/applications`

## Quick start

Requires Node.js 20+. From the repository root:

```bash
cp yashvi-bagga-productions/.env.example yashvi-bagga-productions/.env
cd yashvi-bagga-productions
npm ci
npm start
```

Or use the root scripts after `npm ci` in `yashvi-bagga-productions/`:

```bash
npm start      # from yashvi-bagga-productions, or npm --prefix yashvi-bagga-productions start
npm test
npm run lint
npm run typecheck
npm run build
```

The site runs at [http://localhost:4200](http://localhost:4200). Point `apiUrl` in `src/environments/environment.ts` at a running YBP API (default `http://localhost:5041/api/v1`) for **manual** browser testing only.

### Commands

| Command | Purpose |
| --- | --- |
| `npm start` | Dev server (`ng serve`, port `4200` / `PORT`) |
| `npm run build` | Production browser build |
| `npm test` | Karma/Jasmine unit tests with coverage (threshold enforced) |
| `npm run lint` | ESLint |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run serve:ssr` / `npm run start:prod` | Express host after build |

Clone into an empty folder and follow only this README: `npm ci`, `npm test`, and `npm start` inside `yashvi-bagga-productions` are the three commands a fresh machine needs.

## Docker

```bash
docker compose up --build
```

Uses the root [`Dockerfile`](Dockerfile). Health: [http://localhost:4200/health](http://localhost:4200/health).

Optional hosting sketch: [`infra/`](infra/) (Terraform example for Azure Container Apps).

## Environment

See [`yashvi-bagga-productions/.env.example`](yashvi-bagga-productions/.env.example) and root [`.env.example`](.env.example).

| Variable | Used by | Default |
| --- | --- | --- |
| `PORT` | Express host / Docker | `4000` (`4200` for `ng serve`) |
| `SITE_URL` | Canonical site URL | `http://localhost:4200` |
| `API_URL` | Browser API base (build-time environment files) | `http://localhost:5041/api/v1` |
| `SENTRY_DSN` | Optional error tracking | empty (disabled) |
| `LOG_LEVEL` | Pino log level | `info` |

## Architecture

```
yashvi-bagga-productions/
├── server.ts                  Express host
├── server/                    Host layering (routes, middleware, services) — Pino + Sentry
├── src/app/core/              Logger, error tracking, interceptors
├── src/app/shared/models/intake-forms/  Config-driven multi-step forms
├── src/app/shared/services/   HTTP clients (forms, auth, admin)
├── src/app/shared/validators/ Angular + Zod validation
└── src/app/pages/             Lazy-loaded routes (home, about, admin, intake)
infra/                         Optional Terraform sketch for container hosting
```

## Tests and CI

```bash
cd yashvi-bagga-productions
npm test
```

Unit tests **never call a live backend**. Specs use Angular `HttpTestingController` and service mocks only — no real `fetch`/XHR against `apiUrl`. Coverage is written to `yashvi-bagga-productions/coverage/` and Karma fails the run if global thresholds are missed.

CI (`.github/workflows/ci.yml`) runs **lint**, **typecheck**, **test** (with coverage), **npm audit**, and a **500 LOC** file gate on every push/PR.

## License

Private — Yashvi Bagga Productions.
