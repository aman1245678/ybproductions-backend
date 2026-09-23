# Project type

**Primary class: `backend` (Express API + optional Angular SPA host)**

This repository is a **Node/Express API**: Zod-validated intake, HMAC JWT auth, file/memory persistence, user directory, OpenAPI, Pino, and typed `AppError`s. An Angular 20 marketing SPA is served as static files from the same host.

It is **not** Terraform / Kubernetes / Helm / Pulumi infrastructure. There is no `infra/` directory and no IaC product surface.

| Artifact | Path | Role |
| --- | --- | --- |
| Angular SPA | `yashvi-bagga-productions/src` | Public site + `/admin` control center |
| Express API | `yashvi-bagga-productions/server` | Config, JWT, repositories, applications CRUD, users, OpenAPI, Pino, optional Sentry |
| Runtime deps | root + `yashvi-bagga-productions/package.json` | See [`DEPENDENCIES.md`](DEPENDENCIES.md) |

GitHub topics: `angular`, `typescript`, `frontend`, `web-app`, `backend`, `nodejs`.
