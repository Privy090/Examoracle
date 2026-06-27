from uuid import UUID

from fastapi import APIRouter

from app.schemas.domain import AnalysisJobCreate
from app.services.analysis_job_service import AnalysisJobService

router = APIRouter()
service = AnalysisJobService()


@router.post("")
def create_job(payload: AnalysisJobCreate) -> dict:
    return service.create_job(tenant_id="current-tenant", user_id="current-user", payload=payload)


@router.get("/{job_id}")
def get_job(job_id: UUID) -> dict:
    return service.get_job(tenant_id="current-tenant", job_id=str(job_id))
