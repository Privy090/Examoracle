from app.ai.providers.base import AIProvider


class DeepSeekProvider(AIProvider):
    name = "deepseek"

    def generate_insights(self, context: dict) -> dict:
        raise NotImplementedError
