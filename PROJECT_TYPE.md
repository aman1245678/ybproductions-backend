# Project type

**Primary class: `web-app` / `frontend`**

This repository is an **Angular 20 marketing website and admin CRM** with a small **Node/Express** static host.

It is **not** Terraform / Kubernetes / Helm / Pulumi infrastructure. There is no `infra/` directory and no IaC product surface.

| Artifact | Path | Role |
| --- | --- | --- |
| Angular SPA | `yashvi-bagga-productions/src` | Public site + `/admin` control center |
| Express host | `yashvi-bagga-productions/server`, `scripts/serve-prod.mjs` | Static hosting, `GET /health`, Pino logs, optional Sentry |
| Runtime deps | `yashvi-bagga-productions/package.json` | Authoritative application dependencies (via npm workspaces from root) |

GitHub topics: `angular`, `typescript`, `frontend`, `web-app`, `nodejs`.
