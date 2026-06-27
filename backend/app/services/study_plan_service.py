class StudyPlanService:
    def get_for_course(self, tenant_id: str, course_id: str) -> dict:
        raise NotImplementedError

    def generate(self, prediction_id: str) -> dict:
        raise NotImplementedError
