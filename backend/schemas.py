from pydantic import BaseModel
from typing import List, Optional
from datetime import date
from models import UserRole

# --- AUTH SCHEMAS ---
class LoginRequest(BaseModel):
    user_id: str
    password: str

class UserResponse(BaseModel):
    id: int
    user_id: str
    name: str
    role: UserRole
    class Config:
        from_attributes = True

# --- SUBJECT SCHEMAS ---
class SubjectResponse(BaseModel):
    id: int
    subject_code: str
    name: str
    teacher_id: int
    class Config:
        from_attributes = True

# --- ATTENDANCE SCHEMAS ---
class AttendanceCreate(BaseModel):
    student_id: int
    subject_id: int
    date: date
    status: str

class AttendanceResponse(AttendanceCreate):
    id: int
    class Config:
        from_attributes = True

# --- MARKS SCHEMAS ---
class MarkCreate(BaseModel):
    student_id: int
    subject_id: int
    exam_name: str
    score: float
    max_score: float

class MarkResponse(MarkCreate):
    id: int
    class Config:
        from_attributes = True