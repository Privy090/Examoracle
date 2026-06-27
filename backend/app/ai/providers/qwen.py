from app.ai.providers.base import AIProvider


class QwenProvider(AIProvider):
    name = "qwen"

    def generate_insights(self, context: dict) -> dict:
        raise NotImplementedError
