# Codebase Alignment Audit

## Current Alignment Status

The repository now contains both:

- A Next.js frontend client.
- A FastAPI backend architecture scaffold.

The previous frontend-owned mock fixtures and local prediction engine have been removed from production source. The frontend now routes analysis requests through `/api/analysis-jobs` and uploads through `/api/uploads`.

## Blueprint Compliance

| Blueprint Area | Status | Notes |
| --- | --- | --- |
| Frontend only UI | Mostly aligned | Frontend validates forms/files and displays state. AI scoring logic has been removed. |
| FastAPI backend | Scaffolded | Routes/services/providers are present; implementations are intentionally pending. |
| API gateway paths | Aligned | Frontend services use `/api/auth`, `/api/courses`, `/api/uploads`, `/api/analysis-jobs`, `/api/predictions`, `/api/study-plans`, `/api/analytics`. |
| PostgreSQL schema | Defined | See `database-schema.sql`. |
| File storage layer | Defined | Backend `/storage` layout exists for MVP. |
| AI provider abstraction | Scaffolded | Base provider plus Llama, Qwen, Mistral, DeepSeek adapters. Phi should be added during provider implementation. |
| Job queue | Scaffolded | Worker entrypoint exists. Celery/RQ/Dramatiq implementation is next. |
| Multi-tenancy | Planned in schema | `tenant_id` exists in major database tables. |
| Security | Partially scaffolded | JWT config exists; route auth dependencies, RBAC, rate limits, and audit logs still need implementation. |
| Observability | Pending | Logging/metrics/error tracking need concrete implementation. |

## High-Priority Gaps

1. Implement backend services and database models.
2. Add migrations with Alembic.
3. Implement JWT auth dependencies and RBAC.
4. Implement upload storage and file validation in FastAPI.
5. Add queue adapter and worker runtime.
6. Implement text extraction/OCR/topic extraction services.
7. Implement AI providers and provider switching.
8. Replace client-side persisted course/session state with React Query data sourced from backend APIs.
9. Add frontend polling for analysis job status and result hydration.
10. Add observability and audit logs.

## Non-Negotiable Rule

No frontend component may generate predictions. The frontend can only display backend responses or explicit unavailable/empty/queued/error states.
