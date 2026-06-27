from datetime import datetime
from enum import Enum
from uuid import UUID

from pydantic import BaseModel, EmailStr, Field


class Role(str, Enum):
    student = "student"
    admin = "admin"
    support = "support"


class MaterialType(str, Enum):
    material = "material"
    past_question = "past_question"
    handout = "handout"
    lecture_note = "lecture_note"
    course_outline = "course_outline"


class JobStatus(str, Enum):
    queued = "queued"
    processing = "processing"
    completed = "completed"
    failed = "failed"
    cancelled = "cancelled"


class RegisterRequest(BaseModel):
    full_name: str
    email: EmailStr
    password: str = Field(min_length=8)
    university: str
    faculty: str
    department: str
    level: str


class CourseCreate(BaseModel):
    code: str
    title: str
    level: str
    credits: int = Field(ge=1, le=6)
    department_id: UUID | None = None


class CourseRead(CourseCreate):
    id: UUID
    tenant_id: UUID
    user_id: UUID
    created_at: datetime


class UploadRead(BaseModel):
    id: UUID
    course_id: UUID
    status: str
    storage_path: str
    checksum: str


class AnalysisJobCreate(BaseModel):
    course_id: UUID
    model_provider: str = "llama"
    include_past_questions: bool = True


class AnalysisJobRead(BaseModel):
    id: UUID
    course_id: UUID
    status: JobStatus
    queued_at: datetime


class TopicRead(BaseModel):
    id: UUID
    name: str
    probability: int
    priority: str
    evidence: list[str]


class PredictionRead(BaseModel):
    id: UUID
    course_id: UUID
    model_provider: str
    confidence: int
    topics: list[TopicRead]
    recommendations: list[str]
    created_at: datetime
