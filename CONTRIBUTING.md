# Contributing

1. Use Node.js 20 and install with `npm ci` inside `yashvi-bagga-productions`.
2. Keep each feature or fix in its own commit, with tests that pin the new behavior.
3. Do not mix formatting, refactors, and features in one commit.
4. Before opening a PR, run:

```bash
cd yashvi-bagga-productions
npm run lint
npm run typecheck
npm test -- --watch=false --code-coverage
```

CI must stay green. Do not commit secrets, `.env`, or API keys — use `.env.example` as the template.
