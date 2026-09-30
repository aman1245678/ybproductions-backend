# Security

## Reporting

Email security concerns to the repository maintainers. Do not open public issues for active vulnerabilities.

## Practices in this repo

- No secrets in git: use `.env` locally; only `.env.example` is committed
- Runtime input validated with **Zod** before application submissions leave the browser
- Express host disables `X-Powered-By`, serves `/health`, and logs via **Pino**
- Optional **Sentry** when `SENTRY_DSN` is set
- CI runs `npm audit --audit-level=high` on every push (deps job)
- Dependabot watches npm dependencies under `.github/dependabot.yml`

## Zod validation boundaries (`packages/api`)

| Route | Schema | Rejects |
| --- | --- | --- |
| `POST /api/v1/applications` | `submitApplicationSchema` | missing name/email, bad formType |
| `PATCH /api/v1/applications/:id` | status enum | unknown status values |
| `POST /api/v1/auth/login` | email + password | invalid email, short password |
| `POST /api/v1/users` | email + password + optional role | missing email, invalid role |
| `GET /api/v1/users` | limit/offset query | non-integer pagination |

Unauthenticated admin routes return **401**; Staff tokens on Admin routes return **403**.
