# `@ybproductions/api`

Standalone Express API package (backend deliverable). The Angular marketing SPA lives in `../../yashvi-bagga-productions/src` and is **not** required to run or test this package.

```
packages/api/
├── config/          env validation
├── db/              memory / file store
├── repositories/    applications + users
├── services/        business rules
├── routes/          HTTP adapters
├── middleware/      request-id, rate-limit, JWT
├── errors/          AppError serialization
└── lib/             JWT, password, Zod schemas
```

From the **repo root**:

```bash
npm ci
npm run test:server
npm run typecheck:server
```
