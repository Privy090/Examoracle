from uuid import UUID

from fastapi import APIRouter

from app.services.prediction_service import PredictionService

router = APIRouter()
service = PredictionService()


@router.get("/{course_id}")
def get_prediction(course_id: UUID) -> dict:
    return service.get_for_course(tenant_id="current-tenant", course_id=str(course_id))
