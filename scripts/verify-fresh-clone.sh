#!/usr/bin/env bash
# Prove the API suite installs and runs from a clean tree (no Azure / live network).
# Usage:
#   bash scripts/verify-fresh-clone.sh           # npm ci + test:server (no Chrome)
#   bash scripts/verify-fresh-clone.sh --clean   # also delete node_modules first
#   bash scripts/verify-fresh-clone.sh --full    # npm test (needs Chrome Headless)
set -euo pipefail
root="$(cd "$(dirname "$0")/.." && pwd)"
cd "$root"

if [[ "${1:-}" == "--clean" || "${2:-}" == "--clean" ]]; then
  rm -rf node_modules yashvi-bagga-productions/node_modules
fi

npm ci --offline || npm ci

if [[ "${1:-}" == "--full" || "${2:-}" == "--full" ]]; then
  npm test
else
  npm run test:server
fi
