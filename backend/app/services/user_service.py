from pathlib import Path
from uuid import uuid4

from app.schemas.domain import RegisterRequest


class UserService:
    def __init__(self, storage_root: str):
        self.storage_root = Path(storage_root)

    def store_avatar(self, user_id: str, filename: str, content: bytes) -> dict:
        user_dir = self.storage_root / "users" / user_id
        user_dir.mkdir(parents=True, exist_ok=True)
        avatar_path = user_dir / filename
        avatar_path.write_bytes(content)
        return {
            "userId": user_id,
            "avatarUrl": f"/storage/users/{user_id}/{filename}",
            "id": str(uuid4()),
            "filename": filename,
        }

    def register_user(self, payload: RegisterRequest) -> dict:
        raise NotImplementedError
