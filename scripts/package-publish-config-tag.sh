#!/usr/bin/env bash
set -euo pipefail

# Stable releases (no prerelease) publish on the `latest` dist-tag.
# Prereleases stay on `next`, which is also the package.json default.
node --input-type=module <<'EOF'
import fs from 'node:fs'

const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'))
const version = String(pkg.version)
const isProd = /^\d+\.\d+\.\d+(?:\+.*)?$/.test(version)

pkg.publishConfig ??= {}
pkg.publishConfig.tag = isProd ? 'latest' : 'next'
fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2) + '\n')

const kind = isProd ? 'production' : 'development'
console.log(`${kind} release: publishConfig.tag set to ${pkg.publishConfig.tag}.`)
EOF
