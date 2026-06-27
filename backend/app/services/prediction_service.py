class PredictionService:
    def get_for_course(self, tenant_id: str, course_id: str) -> dict:
        raise NotImplementedError

    def generate_from_job(self, job_id: str) -> dict:
        raise NotImplementedError
