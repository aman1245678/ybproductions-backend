# Yashvi Bagga Productions

Angular 20 **web-app** for [Yashvi Bagga Productions](https://ybproductions.co.in) — cinematic marketing site + admin control center, with a thin Express host for production static serving.

See [`PROJECT_TYPE.md`](PROJECT_TYPE.md). See [`DEPENDENCIES.md`](DEPENDENCIES.md) for which `package.json` owns runtime deps.

## Tech stack

- Angular 20 standalone components, signals, reactive forms
- Tailwind CSS + SCSS
- Express host with `GET /health`, **Pino** (`pino` / `pino-http`), optional **Sentry**
- Zod validation before `POST /api/v1/applications`

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
| `npm test` | Unit tests (Karma) **and** Express `/health` test — no live API required |
| `npm start` | `ng serve` on port 4200 |
| `npm run lint` | ESLint |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run build` | Production browser build |

`npm test` never contacts a live backend. Specs use `HttpTestingController` / mocks; the host test uses Supertest against an in-memory Express app.

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
| `API_URL` | `http://localhost:5041/api/v1` (manual browser testing only) |
| `LOG_LEVEL` | `info` (Pino) |
| `SENTRY_DSN` | empty (Sentry off) |

## Architecture

```
yashvi-bagga-productions/
├── scripts/serve-prod.mjs     Express production host
├── server/                    health, Pino logging, Sentry, errors
├── src/app/core/              browser logger + error tracking
├── src/app/shared/services/   HTTP clients
├── src/app/shared/validators/ Angular + Zod
└── src/app/pages/             routes (home, about, admin, intake)
```

## CI

`.github/workflows/ci.yml` runs **lint**, **typecheck**, **test** (coverage threshold enforced), and `npm audit` on every push and pull request.

## License

Private — Yashvi Bagga Productions.
