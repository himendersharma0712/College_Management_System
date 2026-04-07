from sqlalchemy import Column, Integer, String, Enum
from database import Base
import enum

class UserRole(str, enum.Enum):
    student = "student"
    teacher = "teacher"
    admin = "admin"

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(String(50), unique=True, index=True) # e.g., Roll No or Employee ID
    password = Column(String(255)) # In a real app, this must be hashed
    role = Column(Enum(UserRole), default=UserRole.student)
    name = Column(String(100))