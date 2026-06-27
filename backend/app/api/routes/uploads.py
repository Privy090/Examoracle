from uuid import UUID

from fastapi import APIRouter, File, Form, UploadFile

from app.schemas.domain import MaterialType
from app.services.upload_service import UploadService

router = APIRouter()
service = UploadService()


@router.post("")
def upload_file(
    course_id: UUID = Form(...),
    material_type: MaterialType = Form(MaterialType.material),
    file: UploadFile = File(...),
) -> dict:
    return service.store_upload(
        tenant_id="current-tenant",
        user_id="current-user",
        course_id=str(course_id),
        material_type=material_type,
        file=file,
    )
