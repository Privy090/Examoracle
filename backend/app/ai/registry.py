from app.ai.providers.deepseek import DeepSeekProvider
from app.ai.providers.llama import LlamaProvider
from app.ai.providers.mistral import MistralProvider
from app.ai.providers.phi import PhiProvider
from app.ai.providers.qwen import QwenProvider

PROVIDERS = {
    "llama": LlamaProvider,
    "qwen": QwenProvider,
    "phi": PhiProvider,
    "mistral": MistralProvider,
    "deepseek": DeepSeekProvider,
}


def get_provider(name: str):
    provider = PROVIDERS.get(name)
    if provider is None:
        raise ValueError(f"Unsupported AI provider: {name}")
    return provider()
