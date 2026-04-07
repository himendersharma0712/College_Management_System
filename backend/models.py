from sqlalchemy import Column, Integer, String, Enum, ForeignKey, Date, Float
from sqlalchemy.orm import relationship
from database import Base
import enum

class UserRole(str, enum.Enum):
    student = "student"
    teacher = "teacher"
    admin = "admin"

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(String(50), unique=True, index=True) # Roll No or Emp ID
    password = Column(String(255))
    role = Column(Enum(UserRole), default=UserRole.student)
    name = Column(String(100))

    # Relationships
    attendances = relationship("Attendance", back_populates="student")
    marks = relationship("Mark", back_populates="student")

class Subject(Base):
    __tablename__ = "subjects"

    id = Column(Integer, primary_key=True, index=True)
    subject_code = Column(String(20), unique=True, index=True)
    name = Column(String(100))
    teacher_id = Column(Integer, ForeignKey("users.id")) # Which teacher teaches this

    attendances = relationship("Attendance", back_populates="subject")
    marks = relationship("Mark", back_populates="subject")

class Attendance(Base):
    __tablename__ = "attendance"

    id = Column(Integer, primary_key=True, index=True)
    student_id = Column(Integer, ForeignKey("users.id"))
    subject_id = Column(Integer, ForeignKey("subjects.id"))
    date = Column(Date)
    status = Column(String(10)) # "Present" or "Absent"

    student = relationship("User", back_populates="attendances")
    subject = relationship("Subject", back_populates="attendances")

class Mark(Base):
    __tablename__ = "marks"

    id = Column(Integer, primary_key=True, index=True)
    student_id = Column(Integer, ForeignKey("users.id"))
    subject_id = Column(Integer, ForeignKey("subjects.id"))
    exam_name = Column(String(50)) # e.g., "Mid-Term", "Final"
    score = Column(Float)
    max_score = Column(Float)

    student = relationship("User", back_populates="marks")
    subject = relationship("Subject", back_populates="marks")