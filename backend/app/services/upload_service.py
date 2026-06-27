from datetime import datetime
from pathlib import Path
from uuid import uuid4

from fastapi import HTTPException, UploadFile

from app.core.config import settings
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
        extension = Path(file.filename).suffix.lower()
        if extension not in self.allowed_extensions:
            raise HTTPException(status_code=400, detail=f"Unsupported file type: {extension}")

        content = file.file.read()
        course_dir = Path(settings.storage_root) / "course-materials" / course_id
        course_dir.mkdir(parents=True, exist_ok=True)
        file_path = course_dir / file.filename
        file_path.write_bytes(content)

        return {
            "id": str(uuid4()),
            "courseId": course_id,
            "name": file.filename,
            "size": len(content),
            "type": file.content_type,
            "status": "completed",
            "uploadedAt": datetime.utcnow().isoformat(),
        }
