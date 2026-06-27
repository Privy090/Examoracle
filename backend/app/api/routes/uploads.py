from uuid import uuid4
import os
from pathlib import Path
from fastapi import APIRouter, File, Form, UploadFile, Request, HTTPException
from pydantic import BaseModel

from app.schemas.domain import MaterialType
from app.services.upload_service import UploadService
from app.core.config import settings

router = APIRouter()
service = UploadService()


class PresignRequest(BaseModel):
    course_id: str
    filename: str
    content_type: str
    material_type: MaterialType = MaterialType.material


@router.post("/presign")
def presign_upload(req: PresignRequest):
    upload_id = str(uuid4())
    # uploadUrl points to the direct upload endpoint on this server
    upload_url = f"/api/uploads/direct/{upload_id}"
    # create temp path placeholder
    temp_dir = Path(settings.storage_root) / "course-materials" / "temp"
    temp_dir.mkdir(parents=True, exist_ok=True)
    return {"uploadId": upload_id, "uploadUrl": upload_url}


@router.put("/direct/{upload_id}")
async def direct_upload(upload_id: str, request: Request):
    # Expect headers: x-filename and content-type set by the client
    filename = request.headers.get("x-filename")
    if not filename:
        raise HTTPException(status_code=400, detail="Missing x-filename header")
    temp_dir = Path(settings.storage_root) / "course-materials" / "temp"
    temp_dir.mkdir(parents=True, exist_ok=True)
    temp_path = temp_dir / f"{upload_id}"
    body = await request.body()
    with open(temp_path, "wb") as fh:
        fh.write(body)
    return {"uploadId": upload_id, "size": temp_path.stat().st_size}


class CompleteRequest(BaseModel):
    uploadId: str
    courseId: str
    name: str
    size: int
    type: str
    materialType: MaterialType = MaterialType.material


@router.post("/complete")
def complete_upload(req: CompleteRequest):
    temp_dir = Path(settings.storage_root) / "course-materials" / "temp"
    temp_path = temp_dir / f"{req.uploadId}"
    if not temp_path.exists():
        raise HTTPException(status_code=404, detail="Upload not found")
    final_dir = Path(settings.storage_root) / "course-materials" / req.courseId
    final_dir.mkdir(parents=True, exist_ok=True)
    final_path = final_dir / req.name
    temp_path.replace(final_path)
    # delegate to service to create metadata record if needed
    return {
        "id": req.uploadId,
        "courseId": req.courseId,
        "name": req.name,
        "size": req.size,
        "type": req.type,
        "status": "completed",
        "uploadedAt": temp_path.stat().st_mtime,
    }


@router.post("")
def upload_file(
    course_id: str = Form(...),
    material_type: MaterialType = Form(MaterialType.material),
    file: UploadFile = File(...),
):
    return service.store_upload(
        tenant_id="current-tenant",
        user_id="current-user",
        course_id=str(course_id),
        material_type=material_type,
        file=file,
    )
