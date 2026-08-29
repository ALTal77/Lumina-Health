# AGENTS.md

## Overview
Lumina Health: hospital appointment platform. Two independent apps in this repo:
- **Frontend** (repo root): Vite + React 19 + TypeScript + Tailwind CSS v4, ESM. Deployed to GitHub Pages.
- **Backend** (`lumina-backend/`): Express 5 + `node:sqlite`, CommonJS `.js`. Run separately.

They share no code and must not be cross-imported. Never import backend (CommonJS) into frontend (ESM TS) or vice versa.

## Commands
Frontend (repo root, npm):
- `npm run dev` — Vite dev server on port **3000**
- `npm run build` — production build to `dist/` (this is what CI deploys)
- `npm run lint` — **typecheck only**: `tsc --noEmit` (there is NO ESLint; no test suite exists)
- `npm run clean` — `rm -rf dist server.js` (POSIX `rm`; broken in native Windows PowerShell — not a concern for CI)

Backend (run from `lumina-backend/`):
- `npm run dev` — `node --watch` on port **4000**
- `npm start` — plain `node src/server.js`
- Requires **Node >=22.13** (uses `node:sqlite` `DatabaseSync`).
- `.env` needed (see `.env.example`); gitignored. Requires `JWT_SECRET`, optional `CORS_ORIGIN`, `DB_PATH`.

Package manager: use **npm** (CI uses `npm ci`; backend has `package-lock.json`). Both `bun.lock` and `package-lock.json` exist at root — prefer npm to match CI.

## Local setup / running
1. Backend: `cd lumina-backend && npm install && npm run dev` (creates `lumina-backend/data/lumina.db` on first run, auto-seeds 6 doctors only if the table is empty).
2. Frontend: `npm install && npm run dev` at root.
3. Frontend calls backend at `http://localhost:4000/api` by default (override with `VITE_API_URL`). The UI shows an "offline" banner when the backend is unreachable — don't treat it as broken.

## Architecture notes
- Backend routes: `/api/doctors`, `/api/bookings`, `/api/register`, `/api/contact`, `/api/auth`, `/api/health`. All prefixed `/api`.
- DB: SQLite file at `lumina-backend/data/lumina.db` (configurable via `DB_PATH`). Tables created idempotently on server start; WAL mode + `foreign_keys = ON`. No migrations — schema lives in `src/db/index.js`.
- Seed logic lives in `src/db/index.js` (only runs when `doctors` is empty).
- API JSON uses camelCase (mapped in `src/utils/mappers.js`); DB columns are snake_case.
- Auth: JWT in localStorage under key `lumina_health_session`; `POST /api/auth/login` and protected `/api/auth/me` with `Bearer` token. Dev JWT fallback secret `lumina-dev-secret`.

## Frontend conventions
- Path alias `@/*` → repo root (`src/` layout via `tsconfig.json` & `vite.config.ts`).
- i18n: `src/i18n/{en,ar}.json` via i18next; all UI strings go through `t()`.
- Doctors data shape in `src/data/mockData.ts` mirrors backend `GET /api/doctors` response — update both together if changing fields.

## Engineering standards (how to work)
Act as a senior software engineer. Follow these rules on every task:
- **Preserve the existing code structure and system design.** Match the established patterns, file layout, module boundaries, and naming conventions wherever you add or change code — do not reorganize, "modernize," or introduce a parallel structure.
- **Mimic the surrounding style.** Read neighboring files first, then mirror their idioms: ESM + TS on the frontend, CommonJS `.js` on the backend, camelCase in API JSON vs snake_case in DB, `t()` for all UI strings, existing component/route/middleware shapes.
- **Reuse before you build.** Prefer existing utilities, wrappers (`src/api/client.ts`, `src/utils/mappers.js`, `src/components/ui/*`), and conventions before adding new ones or new dependencies.
- **Make minimal, targeted changes.** Change only what the task requires. Don't refactor unrelated code or expand scope. Keep PRs focused and reviewable.
- **Meet the bar for correctness.** This repo has no test suite, so verify by running `npm run lint` (typecheck) and `npm run build` after changes, and reason carefully through edge cases (validation, error/offline paths, empty states, i18n coverage).
- **Don't break the deployable path.** Keep `vite.config.ts`, CI, and the GitHub Pages `base` intact; new code must build cleanly for CI.

## Gotchas
- `vite.config.ts`: `base: '/Lumina-Health/'` (GitHub Pages subpath). HMR + file-watching are conditionally disabled via `DISABLE_HMR` env (AI Studio); `lumina-backend/**` is excluded from Vite watch. Don't "simplify" this.
- CORS: backend only accepts localhost origins or `CORS_ORIGIN`. Setting `VITE_API_URL` to a non-localhost backend requires `CORS_ORIGIN` to match.
- CI (`.github/workflows/deploy.yml`): on push to `main` runs `npm ci && npm run build`, deploys `dist/` to GitHub Pages. Backend is not deployed by CI.
