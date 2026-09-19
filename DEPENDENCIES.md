# Dependencies

| File | Role |
| --- | --- |
| `package.json` (repo root) | Workspace root + scripts (`npm test`, `npm start`, …) |
| `package-lock.json` (repo root) | Authoritative lockfile for a fresh `npm ci` |
| `yashvi-bagga-productions/package.json` | **Runtime + app dependencies** (Angular, Express, Pino, Zod, …) |

Always install from the repository root with `npm ci`. Do not add application libraries only to the root package — put them in `yashvi-bagga-productions/package.json`.
