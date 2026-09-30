# Project type

**Primary class: `backend` (Express API in `packages/api`). The Angular SPA is a separate workspace package.**

This repository is a **monorepo**:

| Tree | Path | Evaluated as |
| --- | --- | --- |
| **API (backend)** | `packages/api` | Express host: config → repositories → services → routes, JWT, Zod, Pino, OpenAPI |
| **API tests** | `packages/api/**/*.test.mjs` and repo-root `test/` | `node:test` + Supertest + c8, no SPA build |
| **Marketing SPA** | `yashvi-bagga-productions/src` | Angular 20 site + `/admin` — not part of the API surface |

`npm run test:server` and `npm run typecheck:server` exercise **only** `@ybproductions/api`. They do not build or boot Angular.

It is **not** Terraform / Kubernetes / Helm / Pulumi infrastructure. There is no `infra/` directory and no IaC product surface.

| Artifact | Path | Role |
| --- | --- | --- |
| Express API | `packages/api` | JWT auth, application intake/review, users, OpenAPI |
| API specs | `test/` + `packages/api/**/*.test.mjs` | Isolated backend suite |
| Angular SPA | `yashvi-bagga-productions/src` | Static site hosted by the API in production |
| Runtime deps | `packages/api/package.json` + root | `express`, `zod`, `pino`, `pino-http`, `@sentry/node` |

GitHub topics: `backend`, `nodejs`, `express`, `angular`, `typescript`, `web-app`.
