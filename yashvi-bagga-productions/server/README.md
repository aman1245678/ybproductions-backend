# Express API surface

This directory is the **backend deliverable**. The Angular marketing SPA lives in `../src` and is not required to run or test the API.

```
server/
├── config/          env validation
├── db/              memory / file store
├── repositories/    applications + users
├── services/        business rules
├── routes/          HTTP adapters + Supertest specs
├── middleware/      request-id, rate-limit, JWT
├── errors/          AppError serialization
└── lib/             JWT, password, Zod schemas
```

Isolated (no SPA build):

```bash
npm run typecheck:server
npm run test:server
```
