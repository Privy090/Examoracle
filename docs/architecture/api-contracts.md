# ExamOracle AI API Contracts

Base URL is provided to the frontend as `NEXT_PUBLIC_API_URL`.

## Authentication

### POST `/api/auth/register`

Request:

```json
{
  "full_name": "string",
  "email": "student@example.edu",
  "password": "string",
  "university": "string",
  "faculty": "string",
  "department": "string",
  "level": "300"
}
```

Response:

```json
{
  "user": { "id": "uuid", "tenant_id": "uuid", "email": "string", "role": "student" },
  "access_token": "jwt",
  "refresh_token": "jwt"
}
```

### POST `/api/auth/login`

### POST `/api/auth/refresh`

### POST `/api/auth/logout`

## Courses

### GET `/api/courses`

Returns courses for the authenticated user and tenant.

### POST `/api/courses`

Request:

```json
{
  "code": "CSC301",
  "title": "Operating Systems",
  "level": "300",
  "credits": 3,
  "department_id": "uuid"
}
```

## Uploads And Materials

### POST `/api/uploads`

Multipart form fields:

- `course_id`
- `file`
- `material_type`: `material | past_question | handout | lecture_note | course_outline`

Response:

```json
{
  "id": "uuid",
  "course_id": "uuid",
  "status": "stored",
  "storage_path": "/storage/users/{user_id}/course-materials/{file}",
  "checksum": "sha256"
}
```

### GET `/api/materials?course_id={course_id}`

## Analysis Jobs

### POST `/api/analysis-jobs`

Request:

```json
{
  "course_id": "uuid",
  "model_provider": "llama",
  "include_past_questions": true
}
```

Response:

```json
{
  "id": "uuid",
  "course_id": "uuid",
  "status": "queued",
  "queued_at": "ISO-8601"
}
```

### GET `/api/analysis-jobs/{job_id}`

Statuses: `queued`, `processing`, `completed`, `failed`, `cancelled`.

## Predictions

### GET `/api/predictions/{course_id}`

Response:

```json
{
  "id": "uuid",
  "course_id": "uuid",
  "model_provider": "llama",
  "confidence": 86,
  "topics": [
    {
      "id": "uuid",
      "name": "Memory Management",
      "probability": 92,
      "priority": "high",
      "evidence": ["past_questions", "lecture_notes"]
    }
  ],
  "recommendations": ["string"],
  "created_at": "ISO-8601"
}
```

## Study Plans

### GET `/api/study-plans/{course_id}`

## Analytics

### GET `/api/analytics/{course_id}`

Returns topic frequency, question frequency, difficulty estimation, prediction confidence, study priority, roadmap, and exam readiness.

## AI Providers

### GET `/api/ai/providers`

Returns enabled providers and model metadata.
