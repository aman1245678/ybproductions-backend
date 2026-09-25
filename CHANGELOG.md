# Changelog

## 1.8.0

- Paginate `GET /api/v1/users`; reject invalid user-create and application status bodies with 400.
- JWT expiry and malformed bearer coverage; c8 API gate raised to 80% lines.
- `scripts/verify-fresh-clone.sh` proves `npm ci && npm run test:server` from a clean tree (no live API).
- Document ChromeHeadlessNoSandbox flags for full `npm test`.

## 1.7.0

- HMAC JWT login, scrypt password hashes, memory/file store, application review, OpenAPI.
- Discriminated AppError types (`ValidationError`, `AuthError`, `NotFoundError`, `ForbiddenError`, `ConflictError`).

## 1.6.0

- Grow Express host: metrics, request-id, rate-limit middleware with paired tests.
- Enforce Express coverage via c8 (≥70% lines); split CI into unit + server test steps.
- Extract large page templates to `.html` files; restore 500-LOC CI gate.
- Complete root + workspace `.env.example` admin placeholders (no weak password in README).

## 1.5.0

- Add Express `POST /api/v1/applications` and `POST /api/v1/auth/login` with Zod validation.
- Add typed `AppError` / Result helpers and structured error middleware tests.
- Expose runtime deps at the workspace root; document coverage thresholds for scanners.

## 1.4.0

- Expand unit specs (services, vocational training, manpower outsourcing, join-network, toast, notifications).
- Enforce higher Karma coverage floor; CI production `build` job.
- Add SECURITY.md; refresh CONTRIBUTING for root workspace commands.

## 1.3.0

- Remove placeholder Terraform `infra/` scaffold that caused infra misclassification.
- Make root `npm ci` / `npm test` work via workspaces; document DEPENDENCIES.md.
- Add Express `/health` + Pino logger tests (Supertest / node:test).
- Add ContactComponent unit specs.

## 1.2.0

- Classify the repo as a web-app (PROJECT_TYPE), add root package.json/Dockerfile/ESLint/Prettier.
- Expand unit tests (admin panel, manpower wizard) and tighten CI detection + LOC gate.

## 1.1.0

- Add repository README, env example, Docker Compose, and CI gates (lint, typecheck, tests, audit).
- Add Zod validation and structured logging around application submissions.
- Split intake form definitions and About page sections into focused modules.
- Add Karma/Jasmine unit tests for validators, form mapping, and application submit flow.

## 1.0.0

- Initial Angular 20 cinematic website and admin control center.
