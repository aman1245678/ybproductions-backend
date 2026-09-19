# Security

## Reporting

Email security concerns to the repository maintainers. Do not open public issues for active vulnerabilities.

## Practices in this repo

- No secrets in git: use `.env` locally; only `.env.example` is committed
- Runtime input validated with **Zod** before application submissions leave the browser
- Express host disables `X-Powered-By`, serves `/health`, and logs via **Pino**
- Optional **Sentry** when `SENTRY_DSN` is set
- CI runs `npm audit --audit-level=critical` on every push
- Dependabot watches npm dependencies under `.github/dependabot.yml`
