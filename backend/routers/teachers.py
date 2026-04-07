from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from pydantic import BaseModel
import models, schemas
from database import get_db

router = APIRouter(prefix="/teachers", tags=["Teachers"])

# Schema for creating a teacher via the Admin Portal
class TeacherCreate(BaseModel):
    name: str
    user_id: str # This acts as their Employee ID

@router.get("/", response_model=List[schemas.UserResponse])
def get_all_teachers(db: Session = Depends(get_db)):
    # Fetch only users who have the 'teacher' role
    return db.query(models.User).filter(models.User.role == models.UserRole.teacher).all()

@router.post("/", response_model=schemas.UserResponse)
def add_teacher(teacher: TeacherCreate, db: Session = Depends(get_db)):
    # Check if Employee ID already exists
    existing = db.query(models.User).filter(models.User.user_id == teacher.user_id).first()
    if existing:
        raise HTTPException(status_code=400, detail="Employee ID already registered")

    new_teacher = models.User(
        name=teacher.name,
        user_id=teacher.user_id,
        password="teacherpassword123", # Default password
        role=models.UserRole.teacher
    )
    db.add(new_teacher)
    db.commit()
    db.refresh(new_teacher)
    return new_teacher

@router.delete("/{teacher_id}")
def remove_teacher(teacher_id: int, db: Session = Depends(get_db)):
    teacher = db.query(models.User).filter(models.User.id == teacher_id).first()
    if not teacher:
        raise HTTPException(status_code=404, detail="Teacher not found")
    
    db.delete(teacher)
    db.commit()
    return {"message": "Teacher successfully removed"}