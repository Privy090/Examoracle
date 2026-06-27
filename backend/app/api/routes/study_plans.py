from uuid import UUID

from fastapi import APIRouter

from app.services.study_plan_service import StudyPlanService

router = APIRouter()
service = StudyPlanService()


@router.get("/{course_id}")
def get_study_plan(course_id: UUID) -> dict:
    return service.get_for_course(tenant_id="current-tenant", course_id=str(course_id))
