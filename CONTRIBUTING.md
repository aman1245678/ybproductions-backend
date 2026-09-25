# Contributing

1. Use Node.js 20+. From the **repository root** run `npm ci` (npm workspaces install the Angular app).
2. Keep each feature or fix in its own commit, with tests that pin the new behavior. Pull requests must include tests (see `.github/pull_request_template.md`).
3. Do not mix formatting, refactors, and features in one commit.
4. Before opening a PR, from the repo root run:

```bash
npm ci
npm run lint
npm run typecheck
npm test
npm run build
```

`npm test` runs Karma unit specs **and** Express `/health` host tests. CI must stay green.

Do not commit secrets, `.env`, or API keys — use `yashvi-bagga-productions/.env.example` as the template.
