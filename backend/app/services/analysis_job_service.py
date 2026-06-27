from app.schemas.domain import AnalysisJobCreate


class AnalysisJobService:
    def create_job(self, tenant_id: str, user_id: str, payload: AnalysisJobCreate) -> dict:
        """Create analysis job and enqueue worker task. Heavy work never runs in request cycle."""
        raise NotImplementedError

    def get_job(self, tenant_id: str, job_id: str) -> dict:
        raise NotImplementedError
