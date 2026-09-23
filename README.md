# Yashvi Bagga Productions API

Express **backend** for [Yashvi Bagga Productions](https://ybproductions.co.in) — JWT admin auth, application intake/review, user directory, OpenAPI, plus an Angular 20 SPA served from the same host.

See [`PROJECT_TYPE.md`](PROJECT_TYPE.md). See [`DEPENDENCIES.md`](DEPENDENCIES.md) for which `package.json` owns runtime deps.

## Tech stack

- Angular 20 standalone components, signals, reactive forms
- Tailwind CSS + SCSS
- Express API: health/ready, applications CRUD, JWT login, users, OpenAPI
- Layered host: `config` → `repositories` → `services` → thin `routes`
- HMAC JWT (`JWT_SECRET`), scrypt password hashes, memory or file store
- **Pino** / **pino-http**, optional **Sentry**, discriminated `AppError` types
- Zod validation on application, login, user, and status bodies

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
| `npm test` | Runs `test:unit` (Karma/Jasmine) then `test:server` (node:test + c8 coverage gate ≥70% lines) |
| `npm run test:unit` | Angular unit specs only |
| `npm run test:server` | Express host specs with c8 coverage enforcement |
| `make test` | Same as `npm test` (see `Makefile`) |
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
| `GET` | `/ready` | Store readiness + counters |
| `GET` | `/api/v1/openapi.json` | OpenAPI 3 document |
| `POST` | `/api/v1/applications` | Zod-validated intake → `202 Accepted` |
| `GET` | `/api/v1/applications` | Admin list (Bearer JWT) |
| `GET` | `/api/v1/applications/:id` | Fetch one application |
| `PATCH` | `/api/v1/applications/:id` | Admin status update |
| `POST` | `/api/v1/auth/login` | Issues a signed JWT |
| `GET` | `/api/v1/users/me` | Current user |
| `GET` | `/api/v1/users` | Admin directory |
| `POST` | `/api/v1/users` | Admin creates a user |

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
| `ADMIN_EMAIL` | seed admin email (see `.env.example`) |
| `ADMIN_PASSWORD` | seed admin password (hashed at boot) |
| `JWT_SECRET` | HMAC secret for access tokens |
| `JWT_EXPIRES_SECONDS` | `3600` |
| `STORE_DRIVER` | `memory` (tests) or `file` |
| `DATA_DIR` | `./data` when `STORE_DRIVER=file` |
| `LOG_LEVEL` | `info` (Pino) |
| `SENTRY_DSN` | empty (Sentry off) |

## Architecture

```
yashvi-bagga-productions/
├── scripts/serve-prod.mjs     Express production host
├── server/                    config, db, repositories, services, routes, JWT
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
