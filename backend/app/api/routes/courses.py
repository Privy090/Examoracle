from fastapi import APIRouter

from app.schemas.domain import CourseCreate
from app.services.course_service import CourseService

router = APIRouter()
service = CourseService()


@router.get("")
def list_courses() -> list[dict]:
    return service.list_for_user(tenant_id="current-tenant", user_id="current-user")


@router.post("")
def create_course(payload: CourseCreate) -> dict:
    return service.create(tenant_id="current-tenant", user_id="current-user", payload=payload)
