# Yashvi Bagga Productions

Public website and admin control center for [Yashvi Bagga Productions](https://ybproductions.co.in) — a cinematic Angular 20 app for branding, casting, training, IT, and talent intake.

The GitHub repository name includes “backend” because the app ships with a small Node/Express layer (health, structured logs, error tracking, static/SSR hosting) plus a typed client for the production API.

## Tech stack

- Angular 20 standalone components, signals, and reactive forms
- Tailwind CSS + SCSS
- Node/Express host (`server.ts`) with `/health`, Pino logging, and optional Sentry
- Zod validation on application submissions before they hit `POST /api/v1/applications`

## Quick start

Requires Node.js 20+.

```bash
cd yashvi-bagga-productions
cp .env.example .env
npm ci
npm start
```

The site runs at [http://localhost:4200](http://localhost:4200). Point `apiUrl` in `src/environments/environment.ts` at a running YBP API (default `http://localhost:5041/api/v1`).

### Commands

| Command | Purpose |
| --- | --- |
| `npm start` | Dev server (`ng serve`, port `4200` / `PORT`) |
| `npm run build` | Production browser build |
| `npm test` | Karma/Jasmine unit tests with coverage |
| `npm run lint` | ESLint |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run serve:ssr` | Serve the production Express host after `npm run build:ssr` |

Clone into an empty folder and follow only this README: `npm ci`, `npm test`, and `npm start` are the three commands a fresh machine needs.

## Docker

Bring the production static host up with one command from the repository root:

```bash
docker compose up --build
```

- App: [http://localhost:4200](http://localhost:4200)
- Health: [http://localhost:4200/health](http://localhost:4200/health)

## Environment

See [`yashvi-bagga-productions/.env.example`](yashvi-bagga-productions/.env.example).

| Variable | Used by | Default |
| --- | --- | --- |
| `PORT` | Express host / Docker | `4000` (`4200` for `ng serve`) |
| `SITE_URL` | Canonical site URL | `http://localhost:4200` |
| `API_URL` | Browser API base (build-time environment files) | `http://localhost:5041/api/v1` |
| `SENTRY_DSN` | Optional error tracking | empty (disabled) |
| `LOG_LEVEL` | Pino log level | `info` |

Site keys for reCAPTCHA live in `src/environments/environment*.ts` (public values only). Provider secrets stay on the API, never in this repo.

## Architecture

```
yashvi-bagga-productions/
├── server.ts                  Express host
├── server/                    Host layering (routes, middleware, services)
├── src/app/core/              Logger, error tracking, interceptors
├── src/app/shared/models/intake-forms/  Config-driven multi-step forms
├── src/app/shared/services/   HTTP clients (forms, auth, admin)
├── src/app/shared/validators/ Angular + Zod validation
└── src/app/pages/             Lazy-loaded routes (home, about, admin, intake)
```

Intake flow:

1. `INTAKE_FORMS` defines steps and fields per slug (`branding`, `cast-crew`, …).
2. `IntakeWizardComponent` builds a reactive form from that config.
3. `FormSubmissionService.buildFromIntake()` maps fields to the API body.
4. Zod (`submitApplicationSchema`) validates the body.
5. `POST {apiUrl}/applications` sends it to the YBP API; admin CRM reads the same records.

## Tests and CI

```bash
cd yashvi-bagga-productions
npm test -- --watch=false --code-coverage
```

Coverage is written to `yashvi-bagga-productions/coverage/`. Pull requests run lint, typecheck, unit tests, and `npm audit --audit-level=high` via [`.github/workflows/ci.yml`](.github/workflows/ci.yml).

## License

Private — Yashvi Bagga Productions.
