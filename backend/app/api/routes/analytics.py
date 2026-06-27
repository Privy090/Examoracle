from uuid import UUID

from fastapi import APIRouter

from app.services.analytics_service import AnalyticsService

router = APIRouter()
service = AnalyticsService()


@router.get("/{course_id}")
def get_analytics(course_id: UUID) -> dict:
    return service.get_for_course(tenant_id="current-tenant", course_id=str(course_id))
