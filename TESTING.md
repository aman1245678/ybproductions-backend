# Testing

This repository has a **runnable test suite** at HEAD.

## Commands (from repo root)

```bash
npm ci
npm test              # unit (Karma/Jasmine) + server (node:test + c8)
npm run test:unit     # Angular specs only
npm run test:server   # Express host specs with ≥70% line coverage (c8)
npm run typecheck:server  # node --check on the API entry (no Angular)
make test             # same as npm test
```

## Frameworks

| Suite | Runner | Location |
| --- | --- | --- |
| Unit | Karma + Jasmine | `yashvi-bagga-productions/src/**/*.spec.ts` |
| Server | `node:test` + Supertest + c8 | `yashvi-bagga-productions/server/**/*.test.mjs` and repo-root `test/` |

Coverage floors:

- Karma: `yashvi-bagga-productions/coverage-thresholds.json`
- Express: `c8 --check-coverage --lines 70` in `npm run test:server`

`npm run test:server` does **not** build the Angular SPA.

CI (`.github/workflows/ci.yml`) runs `npm test` on every push and pull request to `main`.
