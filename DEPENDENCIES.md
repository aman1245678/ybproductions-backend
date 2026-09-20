# Dependencies

| File | Role |
| --- | --- |
| `package.json` (repo root) | Workspace root, shared scripts, and **visible runtime deps** (`express`, `pino`, `pino-http`, `zod`, `@sentry/node`) so scanners/auditors see the API host surface |
| `package-lock.json` (repo root) | Authoritative lockfile for a fresh `npm ci` |
| `yashvi-bagga-productions/package.json` | Full application + host dependencies (Angular + Express + tooling) |

## Ownership

- **Runtime / production libs for the Express host:** declared at the **repo root** and again in the workspace (npm workspaces hoist a single copy).
- **Angular SPA libs:** only in `yashvi-bagga-productions/package.json`.
- Always install from the repository root with `npm ci`.

Dependabot watches both `/` and `/yashvi-bagga-productions` via `.github/dependabot.yml`.
