from app.ai.providers.base import AIProvider


class PhiProvider(AIProvider):
    name = "phi"

    def generate_insights(self, context: dict) -> dict:
        raise NotImplementedError
