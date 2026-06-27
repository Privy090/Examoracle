# ExamOracle AI Implementation Roadmap

## Phase 1 - Systems First MVP

- FastAPI project scaffold.
- PostgreSQL schema and migrations.
- JWT auth and role-based access.
- Course CRUD.
- File upload endpoint with validation.
- Local MVP storage under `/storage`.
- Analysis job creation and status polling.
- Worker queue scaffold.
- Text extraction for PDF/DOCX/TXT.
- Topic analysis service.
- Prediction dashboard API.
- Study plan API.

## Phase 2 - AI Quality

- AI provider abstraction.
- Llama, Qwen, Phi, Mistral, and DeepSeek providers.
- LLM-generated explanations.
- Advanced analytics API.
- Revision roadmap API.
- Notification service.
- Job metrics.

## Phase 3 - Multi-Tenant Intelligence

- University-level tenant administration.
- Community dataset ingestion.
- Cross-course intelligence.
- Institution pattern analysis.
- S3-compatible file storage.
- Monitoring, tracing, and error reporting.

## Current Frontend Rule

The frontend may render only what backend APIs return. Local-only frontend prediction logic is disallowed. During backend unavailability, the UI should show empty, loading, queued, or failed states rather than generating fake results.
