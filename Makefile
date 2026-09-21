.PHONY: install test test-unit test-server lint typecheck build

install:
	npm ci

test:
	npm test

test-unit:
	npm run test:unit

test-server:
	npm run test:server

lint:
	npm run lint

typecheck:
	npm run typecheck

build:
	npm run build
