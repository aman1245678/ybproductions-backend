# Backend test suite

These files are the **runnable Express suite** at repo root. They use `node:test` + Supertest against `createHostApp({ skipStatic: true })`.

```bash
npm run test:server
```

No Angular install step beyond `npm ci` is required. `API_URL` is unused.
