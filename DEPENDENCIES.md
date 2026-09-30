# Dependencies

| File | Role |
| --- | --- |
| `packages/api/package.json` | **Backend package** — `express`, `pino`, `pino-http`, `zod`, `@sentry/node` |
| `package.json` (repo root) | Workspace root, shared scripts, mirrors API runtime deps |
| `package-lock.json` (repo root) | Authoritative lockfile for a fresh `npm ci` |
| `yashvi-bagga-productions/package.json` | Angular SPA + tooling (not required for `npm run test:server`) |

## Ownership

- **Express API runtime:** `packages/api` (and mirrored at the root for scanners).
- **Angular SPA libs:** only in `yashvi-bagga-productions/package.json`.
- Always install from the repository root with `npm ci`.

Dependabot watches both `/` and `/yashvi-bagga-productions` via `.github/dependabot.yml` (weekly npm + GitHub Actions).

## Direct runtime freshness (repo root)

| Package | Declared | Policy |
| --- | --- | --- |
| `express` | `^4.18.2` | stay on Express 4 until a dedicated 5.x upgrade PR |
| `zod` | `^3.24.2` | current major |
| `pino` | `^9.6.0` | current major |
| `pino-http` | `^10.4.0` | current major |
| `@sentry/node` | `^9.0.0` | current major |

`npm outdated --workspaces` is the recurring check; Dependabot opens weekly PRs. Transitive count is dominated by the Angular workspace, not the five API runtime packages.
