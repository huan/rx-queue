#!/usr/bin/env bash
set -euo pipefail

SRC_VERSION_TS_FILE='src/version.ts'

[ -f "${SRC_VERSION_TS_FILE}" ] || {
  echo "${SRC_VERSION_TS_FILE} not found"
  exit 1
}

VERSION=$(node --input-type=module -e "import fs from 'node:fs'; console.log(JSON.parse(fs.readFileSync('package.json', 'utf8')).version)")

cat <<_SRC_ > "${SRC_VERSION_TS_FILE}"
/**
 * This file was auto generated from scripts/generate-version.sh
 */
export const VERSION = '${VERSION}'
_SRC_

echo "${VERSION} generated."
