# Changelog

## 1.3.0

- Remove placeholder Terraform `infra/` scaffold that caused infra misclassification.
- Make root `npm ci` / `npm test` work via workspaces; document DEPENDENCIES.md.
- Add Express `/health` + Pino logger tests (Supertest / node:test).
- Add ContactComponent unit specs.

## 1.2.0

- Classify the repo as a web-app (PROJECT_TYPE), add root package.json/Dockerfile/ESLint/Prettier.
- Expand unit tests (admin panel, manpower wizard) and tighten CI detection + LOC gate.

## 1.1.0

- Add repository README, env example, Docker Compose, and CI gates (lint, typecheck, tests, audit).
- Add Zod validation and structured logging around application submissions.
- Split intake form definitions and About page sections into focused modules.
- Add Karma/Jasmine unit tests for validators, form mapping, and application submit flow.

## 1.0.0

- Initial Angular 20 cinematic website and admin control center.
