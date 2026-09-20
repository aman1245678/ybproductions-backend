# Project type

**Primary class: `web-app` / `backend` (Express API host + Angular SPA)**

This repository is an **Angular 20 marketing website and admin CRM** with a **Node/Express** host that serves the SPA and exposes `GET /health`, `POST /api/v1/applications`, and `POST /api/v1/auth/login`.

It is **not** Terraform / Kubernetes / Helm / Pulumi infrastructure. There is no `infra/` directory and no IaC product surface.

| Artifact | Path | Role |
| --- | --- | --- |
| Angular SPA | `yashvi-bagga-productions/src` | Public site + `/admin` control center |
| Express host | `yashvi-bagga-productions/server` | Static hosting, health, Zod-validated applications + auth API, Pino, optional Sentry |
| Runtime deps | root + `yashvi-bagga-productions/package.json` | See [`DEPENDENCIES.md`](DEPENDENCIES.md) |

GitHub topics: `angular`, `typescript`, `frontend`, `web-app`, `backend`, `nodejs`.
