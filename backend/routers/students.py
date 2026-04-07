from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from pydantic import BaseModel
import models, schemas
from database import get_db

router = APIRouter(prefix="/students", tags=["Students"])

# Schema for creating a student via the Teacher Portal
class StudentCreate(BaseModel):
    name: str
    user_id: str # This acts as their Roll Number

@router.get("/", response_model=List[schemas.UserResponse])
def get_all_students(db: Session = Depends(get_db)):
    # Fetch only users who have the 'student' role
    return db.query(models.User).filter(models.User.role == models.UserRole.student).all()

@router.post("/", response_model=schemas.UserResponse)
def add_student(student: StudentCreate, db: Session = Depends(get_db)):
    # Check if roll number already exists
    existing = db.query(models.User).filter(models.User.user_id == student.user_id).first()
    if existing:
        raise HTTPException(status_code=400, detail="Roll Number already registered")

    new_student = models.User(
        name=student.name,
        user_id=student.user_id,
        password="defaultpassword123", # In a real app, auto-generate and email this
        role=models.UserRole.student
    )
    db.add(new_student)
    db.commit()
    db.refresh(new_student)
    return new_student

@router.delete("/{student_id}")
def remove_student(student_id: int, db: Session = Depends(get_db)):
    student = db.query(models.User).filter(models.User.id == student_id).first()
    if not student:
        raise HTTPException(status_code=404, detail="Student not found")
    
    db.delete(student)
    db.commit()
    return {"message": "Student successfully removed"}