#!/bin/bash

set -e

SCRIPT_DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)

cd "$SCRIPT_DIR/.."

echo ""
echo "Running codegen for integration tests..."

# Find all graphql-codegen files in any subfolder
find ./integration -name "graphql-codegen.*" -print0 | while IFS= read -r -d '' file; do
  echo "Running codegen for $file"
  cd "$(dirname "$file")"
  yarn graphql-codegen --config "$(basename "$file")"
  cd "$SCRIPT_DIR/.."
done
