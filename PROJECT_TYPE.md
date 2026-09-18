# Project type

**Primary class:** `web-app` / `frontend` (Angular 20 marketing site + admin CRM UI)

**Not:** infrastructure-as-code. This repository does not manage cloud with Terraform/Kubernetes/Helm/Pulumi as its product.

| Layer | Location | Role |
| --- | --- | --- |
| Angular SPA | `yashvi-bagga-productions/src` | Public website + `/admin` control center |
| Express host | `yashvi-bagga-productions/server` + `server.ts` | Static/SSR serving, `/health`, Pino, optional Sentry |
| Optional deploy sketch | `infra/` | Documented example Terraform for container hosting |

GitHub topics should include: `angular`, `typescript`, `frontend`, `web-app`, `nodejs`.

Scoring and buyer review should treat this as an **application** repository, not an **infra** repository.
