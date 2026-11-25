#!/usr/bin/env bash
set -e

REPO_DIR=$(pwd)
TMPDIR=
cleanup () {
  git checkout src/version.ts 2>/dev/null || true
  if [ -n "$TMPDIR" ] && [ -d "$TMPDIR" ]; then
    rm -rf "$TMPDIR"
  fi
}
trap cleanup EXIT

./scripts/generate-version.sh
npm run dist

TARBALL=$(npm pack | tail -n 1)
git checkout src/version.ts

TMPDIR="/tmp/npm-pack-testing.$$"
mkdir -p "$TMPDIR"
mv "$TARBALL" "$TMPDIR"
cp tests/fixtures/smoke-testing.ts "$TMPDIR"

cd "$TMPDIR"

npm init -y
npm pkg set type=module
npm install ./"$TARBALL" @types/node typescript

./node_modules/.bin/tsc \
  --lib esnext \
  --types node \
  --noEmitOnError \
  --noImplicitAny \
  --skipLibCheck \
  --target esnext \
  --module NodeNext \
  --moduleResolution NodeNext \
  smoke-testing.ts

echo
echo "ES Module: pack testing..."
node smoke-testing.js

echo
echo "Deno: pack testing..."
if command -v deno >/dev/null 2>&1; then
  deno run --node-modules-dir=manual -A smoke-testing.js
else
  echo "deno not found, skipping"
fi
