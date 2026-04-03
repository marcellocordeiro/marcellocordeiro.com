# Documentation: https://github.com/casey/just
# Cheat sheet: https://cheatography.com/linux-china/cheat-sheets/justfile/

# List all available scripts
[private]
default:
  @just --list --unsorted

# Lint the project
[group("maintenance")]
lint *ARGS:
  pnpm lint:eslint
  pnpm lint:biome
  pnpm lint {{ARGS}}

# Format the project
[group("maintenance")]
format:
  pnpm format:prettier
  pnpm format:biome
  pnpm format

# Lint and fix the project, then format
[group("maintenance")]
fix: (lint "--fix") format

# Update dependencies
[group("maintenance")]
update:
  pnpm update

# Start development server
[group("development")]
dev:
  pnpm dev

# Build project
[group("development")]
build:
  pnpm build

# Build and preview
[group("development")]
preview:
  pnpm build
  pnpm preview

