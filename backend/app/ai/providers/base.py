from abc import ABC, abstractmethod


class AIProvider(ABC):
    name: str

    @abstractmethod
    def generate_insights(self, context: dict) -> dict:
        """Return model interpretation for extracted topics and pattern scores."""
        raise NotImplementedError
