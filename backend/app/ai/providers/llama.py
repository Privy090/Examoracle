from app.ai.providers.base import AIProvider


class LlamaProvider(AIProvider):
    name = "llama"

    def generate_insights(self, context: dict) -> dict:
        raise NotImplementedError
