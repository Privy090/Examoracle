from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles

from app.api.routes import ai, analytics, analysis_jobs, auth, courses, materials, predictions, study_plans, uploads, users
from app.core.config import settings

app = FastAPI(title="ExamOracle AI API", version="0.1.0")
app.mount("/storage", StaticFiles(directory=settings.storage_root), name="storage")

app.include_router(auth.router, prefix="/api/auth", tags=["auth"])
app.include_router(courses.router, prefix="/api/courses", tags=["courses"])
app.include_router(materials.router, prefix="/api/materials", tags=["materials"])
app.include_router(uploads.router, prefix="/api/uploads", tags=["uploads"])
app.include_router(users.router, prefix="/api/users", tags=["users"])
app.include_router(analysis_jobs.router, prefix="/api/analysis-jobs", tags=["analysis-jobs"])
app.include_router(predictions.router, prefix="/api/predictions", tags=["predictions"])
app.include_router(study_plans.router, prefix="/api/study-plans", tags=["study-plans"])
app.include_router(analytics.router, prefix="/api/analytics", tags=["analytics"])
app.include_router(ai.router, prefix="/api/ai", tags=["ai"])


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok", "environment": settings.environment}
