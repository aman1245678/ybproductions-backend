# Yashvi Bagga Productions

Angular 20 **web-app** + Express **API host** for [Yashvi Bagga Productions](https://ybproductions.co.in) — cinematic marketing site, admin control center, and Zod-validated intake endpoints.

See [`PROJECT_TYPE.md`](PROJECT_TYPE.md). See [`DEPENDENCIES.md`](DEPENDENCIES.md) for which `package.json` owns runtime deps.

## Tech stack

- Angular 20 standalone components, signals, reactive forms
- Tailwind CSS + SCSS
- Express host: `GET /health`, `POST /api/v1/applications`, `POST /api/v1/auth/login`
- **Pino** / **pino-http**, optional **Sentry**, typed `AppError` middleware
- Zod validation on application + login bodies (server + browser)

## Fresh clone (only steps you need)

Requires Node.js 20+.

```bash
git clone https://github.com/aman1245678/ybproductions-backend.git
cd ybproductions-backend
cp yashvi-bagga-productions/.env.example yashvi-bagga-productions/.env
npm ci
npm test
npm start
```

| Command | Purpose |
| --- | --- |
| `npm ci` | Install root + app workspace dependencies (lockfile at repo root) |
| `npm test` | Karma unit specs **and** Express host tests (`node:test` + Supertest) — no live Azure required |
| `npm start` | `ng serve` on port 4200 |
| `npm run lint` | ESLint |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run build` | Production browser build |

Coverage floor is enforced via `yashvi-bagga-productions/coverage-thresholds.json` (wired in `karma.conf.js`). `test-framework.json` documents Karma + `node:test`.

`npm test` never contacts a live Azure API. Browser specs use `HttpTestingController` / mocks; host tests use Supertest against an in-memory Express app.

## Host API (Express)

| Method | Path | Notes |
| --- | --- | --- |
| `GET` | `/health` | Liveness JSON |
| `POST` | `/api/v1/applications` | Zod-validated intake → `202 Accepted` |
| `POST` | `/api/v1/auth/login` | Admin login (`ADMIN_EMAIL` / `ADMIN_PASSWORD`) |

## Docker

```bash
docker compose up --build
```

Health: [http://localhost:4200/health](http://localhost:4200/health).

## Environment

| Variable | Default |
| --- | --- |
| `PORT` | `4000` (Express) / `4200` (`ng serve`) |
| `SITE_URL` | `http://localhost:4200` |
| `API_URL` | `http://localhost:5041/api/v1` (optional external CRM) |
| `ADMIN_EMAIL` | `admin@ybproductions.local` |
| `ADMIN_PASSWORD` | `Admin@12345` |
| `LOG_LEVEL` | `info` (Pino) |
| `SENTRY_DSN` | empty (Sentry off) |

## Architecture

```
yashvi-bagga-productions/
├── scripts/serve-prod.mjs     Express production host
├── server/                    health, applications, auth, Pino, errors
├── coverage-thresholds.json   enforced Karma coverage floor
├── src/app/core/              browser logger + error tracking
├── src/app/shared/services/   HTTP clients
├── src/app/shared/validators/ Angular + Zod
└── src/app/pages/             routes (home, about, admin, intake)
```

## CI

`.github/workflows/ci.yml` runs **lint**, **typecheck**, **test** (coverage floor enforced), **build**, and `npm audit` on every push and pull request.

## License

Private — Yashvi Bagga Productions.
