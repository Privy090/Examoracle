# Project Folder Structure

## Repository Root

```text
EXAMORACLE/
  backend/
    app/
      api/routes/          FastAPI route modules mapped to /api/*
      ai/providers/        AIProvider abstraction and model adapters
      core/                Configuration, security, observability settings
      db/                  Database session and migration integration
      models/              SQLAlchemy ORM models
      schemas/             Pydantic request/response schemas
      services/            Domain services and orchestration boundaries
      workers/             Queue worker entrypoints
    storage/
      users/
      course-materials/
      past-questions/
      analysis-results/
    pyproject.toml
  docs/architecture/
    system-architecture.md
    api-contracts.md
    database-schema.sql
    event-flows.md
    implementation-roadmap.md
    folder-structure.md
    codebase-alignment-audit.md
  src/
    app/                   Next.js App Router routes only
    components/            UI-only components
    features/              UI feature composition
    services/api/          Frontend HTTP clients only
    hooks/                 React Query/upload hooks
    store/                 Client session/UI state only
    types/                 Shared frontend DTO types
    validators/            Client request validation only
```

## Boundary Rule

- `backend/app/services/**` owns product logic.
- `backend/app/ai/**` owns AI model access and interpretation.
- `src/features/**` may not implement prediction, topic extraction, scoring, text extraction, OCR, or analytics algorithms.
- `src/services/api/**` may only call backend endpoints and map transport data.
