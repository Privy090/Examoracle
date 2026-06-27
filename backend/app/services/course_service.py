from app.schemas.domain import CourseCreate


class CourseService:
    def list_for_user(self, tenant_id: str, user_id: str) -> list[dict]:
        raise NotImplementedError

    def create(self, tenant_id: str, user_id: str, payload: CourseCreate) -> dict:
        raise NotImplementedError
