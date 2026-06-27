from uuid import UUID

from fastapi import APIRouter

router = APIRouter()


@router.get("")
def list_materials(course_id: UUID) -> list[dict]:
    raise NotImplementedError
