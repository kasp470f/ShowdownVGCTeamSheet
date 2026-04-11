#!/bin/bash

set -e

cd "$(dirname "$0")/.." || exit 1
node scripts/package-extension.mjs "${1:-chrome}"