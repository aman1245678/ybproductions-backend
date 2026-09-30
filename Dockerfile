# Root Dockerfile — builds the Angular SPA and serves it via packages/api.
FROM node:20-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
COPY packages/api/package.json ./packages/api/
COPY yashvi-bagga-productions/package.json ./yashvi-bagga-productions/
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV=production PORT=4000
RUN apk add --no-cache wget
COPY package.json package-lock.json ./
COPY packages/api/package.json ./packages/api/
COPY yashvi-bagga-productions/package.json ./yashvi-bagga-productions/
RUN npm ci --omit=dev
COPY --from=build /app/yashvi-bagga-productions/dist ./yashvi-bagga-productions/dist
COPY packages/api ./packages/api
COPY yashvi-bagga-productions/scripts/serve-prod.mjs ./yashvi-bagga-productions/scripts/serve-prod.mjs
EXPOSE 4000
HEALTHCHECK --interval=15s --timeout=5s --retries=5 CMD wget -qO- http://127.0.0.1:4000/health || exit 1
CMD ["node", "yashvi-bagga-productions/scripts/serve-prod.mjs"]
