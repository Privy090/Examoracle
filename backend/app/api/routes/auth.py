from fastapi import APIRouter

from app.schemas.domain import RegisterRequest
from app.services.auth_service import AuthService

router = APIRouter()
service = AuthService()


@router.post("/register")
def register(payload: RegisterRequest) -> dict:
    return service.register(payload)


@router.post("/login")
def login() -> dict:
    raise NotImplementedError


@router.post("/refresh")
def refresh() -> dict:
    raise NotImplementedError


@router.post("/logout")
def logout() -> dict:
    return {"status": "ok"}
