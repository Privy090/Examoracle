from app.ai.providers.base import AIProvider


class MistralProvider(AIProvider):
    name = "mistral"

    def generate_insights(self, context: dict) -> dict:
        raise NotImplementedError
