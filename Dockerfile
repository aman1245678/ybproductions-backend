# Root Dockerfile — builds the Angular app and serves it via the Express host.
# See also: yashvi-bagga-productions/Dockerfile (same image, app-local context).
FROM node:20-alpine AS build
WORKDIR /app
COPY yashvi-bagga-productions/package.json yashvi-bagga-productions/package-lock.json ./
RUN npm ci
COPY yashvi-bagga-productions/ ./
RUN npm run build

FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV=production PORT=4000
RUN apk add --no-cache wget
COPY yashvi-bagga-productions/package.json yashvi-bagga-productions/package-lock.json ./
RUN npm ci --omit=dev
COPY --from=build /app/dist ./dist
COPY yashvi-bagga-productions/server ./server
COPY yashvi-bagga-productions/scripts/serve-prod.mjs ./scripts/serve-prod.mjs
EXPOSE 4000
HEALTHCHECK --interval=15s --timeout=5s --retries=5 CMD wget -qO- http://127.0.0.1:4000/health || exit 1
CMD ["node", "scripts/serve-prod.mjs"]
