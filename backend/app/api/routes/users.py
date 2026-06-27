from fastapi import APIRouter, File, Form, HTTPException, UploadFile

from app.core.config import settings
from app.services.user_service import UserService

router = APIRouter()
service = UserService(settings.storage_root)


@router.post("/avatar")
async def upload_avatar(user_id: str = Form(...), file: UploadFile = File(...)) -> dict:
    content = await file.read()
    if not content:
        raise HTTPException(status_code=400, detail="Avatar file is empty")

    result = service.store_avatar(user_id=user_id, filename=file.filename, content=content)
    return {"avatarUrl": result["avatarUrl"]}
