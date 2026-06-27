from app.schemas.domain import RegisterRequest


class AuthService:
    def register(self, payload: RegisterRequest) -> dict:
        """Create tenant-aware user and return JWT pair."""
        raise NotImplementedError

    def login(self, email: str, password: str) -> dict:
        """Validate credentials and return JWT pair."""
        raise NotImplementedError
