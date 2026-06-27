from fastapi import UploadFile

from app.schemas.domain import MaterialType


class UploadService:
    allowed_extensions = {".pdf", ".docx", ".txt", ".png", ".jpg", ".jpeg"}

    def store_upload(
        self,
        tenant_id: str,
        user_id: str,
        course_id: str,
        material_type: MaterialType,
        file: UploadFile,
    ) -> dict:
        """Validate file, persist to storage, and create material metadata."""
        raise NotImplementedError
