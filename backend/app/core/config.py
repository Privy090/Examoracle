from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8")

    environment: str = "development"
    database_url: str = "postgresql+psycopg://examoracle:examoracle@localhost:5432/examoracle"
    jwt_secret: str = "change-me"
    jwt_algorithm: str = "HS256"
    storage_root: str = "storage"
    queue_url: str = "redis://localhost:6379/0"
    default_ai_provider: str = "llama"


settings = Settings()
