# Portfolio Analytics BFF

A backend-for-frontend seed for portfolio allocation and performance attribution responses optimized for financial dashboard consumers.

## Stack

Node.js, MERN-style backend-for-frontend, portfolio analytics

## Problem

Dashboard clients should not duplicate portfolio aggregation and attribution logic. This project shapes financial data into frontend-ready contracts.

## Architecture

- llocation.mjs groups exposure by sector and computes weights.
- Performance attribution sorts largest contributors first.
- Tests verify exposure aggregation and attribution ordering.

## Implemented Production Readiness

- CI runs the Node test suite.
- Responses are deterministic and ready for API transport.
- Calculations are isolated from storage and framework code.

## Run And Test

```powershell
npm test
```

## Quality Gates

- Project-specific GitHub Actions workflow included under .github/workflows/ci.yml.
- Generated build outputs and dependency folders are excluded through .gitignore.
- Tests and validation commands are intentionally small enough to run during code review.

## Production Extension Points

- Add Express or Apollo GraphQL endpoints.
- Add MongoDB aggregation adapters.
- Add Redis caching for dashboard reads.

## Repository Hygiene

This repository contains original portfolio code only. It does not include employer source code, private resumes, generated binaries, local credentials, or large media files.

