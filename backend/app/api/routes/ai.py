from fastapi import APIRouter

from app.ai.registry import PROVIDERS

router = APIRouter()


@router.get("/providers")
def providers() -> list[dict[str, str]]:
    return [{"id": key, "name": provider.name} for key, provider in PROVIDERS.items()]
