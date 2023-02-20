#!/usr/bin/env sh
set -e

npm ci && npm run typeorm migration:run -- -d src/db/data-source.ts && npm run start:dev
