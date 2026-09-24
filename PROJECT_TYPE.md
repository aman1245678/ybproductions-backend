# Project type

**Primary class: `backend` (Express API). The Angular SPA is a separate package in this monorepo.**

This repository is a **monorepo**:

| Tree | Path | Evaluated as |
| --- | --- | --- |
| **API (backend)** | `yashvi-bagga-productions/server` | Express host: config → repositories → services → routes, JWT, Zod, Pino, OpenAPI |
| **API tests** | `yashvi-bagga-productions/server/**/*.test.mjs` and repo-root `test/` | `node:test` + Supertest + c8, no SPA build |
| **Marketing SPA** | `yashvi-bagga-productions/src` | Angular 20 site + `/admin` — not part of the API surface |

`npm run test:server` and `npm run typecheck:server` exercise **only** the Express tree. They do not build or boot Angular.

It is **not** Terraform / Kubernetes / Helm / Pulumi infrastructure. There is no `infra/` directory and no IaC product surface.

| Artifact | Path | Role |
| --- | --- | --- |
| Express API | `yashvi-bagga-productions/server` | JWT auth, application intake/review, users, OpenAPI |
| API specs | `test/` + `server/**/*.test.mjs` | Isolated backend suite |
| Angular SPA | `yashvi-bagga-productions/src` | Static site hosted by the same process in production |
| Runtime deps | root `package.json` | `express`, `zod`, `pino`, `pino-http`, `@sentry/node` |

GitHub topics: `backend`, `nodejs`, `express`, `angular`, `typescript`, `web-app`.
