# ExamOracle AI Event Flows

## Registration Flow

```mermaid
sequenceDiagram
  participant Student
  participant Frontend
  participant API
  participant DB
  Student->>Frontend: Submit registration
  Frontend->>API: POST /api/auth/register
  API->>DB: Create user with tenant_id
  API-->>Frontend: JWT + profile
  Frontend->>Student: Show onboarding
```

## Upload And Analysis Flow

```mermaid
sequenceDiagram
  participant Student
  participant Frontend
  participant API
  participant Storage
  participant DB
  participant Queue
  participant Worker
  participant AI

  Student->>Frontend: Upload file
  Frontend->>API: POST /api/uploads
  API->>Storage: Store file
  API->>DB: Create material record
  API-->>Frontend: Upload stored
  Student->>Frontend: Run analysis
  Frontend->>API: POST /api/analysis-jobs
  API->>DB: Create queued job
  API->>Queue: Enqueue job id
  API-->>Frontend: Job queued
  Worker->>Queue: Consume job
  Worker->>Storage: Fetch course files
  Worker->>AI: Extract topics and generate prediction
  Worker->>DB: Store predictions, topics, analytics, study plan
  Frontend->>API: Poll /api/analysis-jobs/{id}
  Frontend->>API: GET predictions/study-plan/analytics
```

## AI Processing Pipeline

1. File uploaded.
2. OCR if required.
3. Text extraction.
4. Text cleaning.
5. Topic extraction.
6. Question classification.
7. Pattern analysis.
8. Probability scoring.
9. AI interpretation.
10. Prediction report persisted.

## Failure Handling

- Upload validation failures return `422`.
- Unsupported file types are rejected before storage.
- Analysis failures update `analysis_jobs.status = failed`.
- Worker errors are logged to `activity_logs`.
- Frontend displays backend-provided job state and errors.
