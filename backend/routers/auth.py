from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
import models, schemas
from database import get_db

router = APIRouter(prefix="/auth", tags=["Authentication"])

@router.post("/login", response_model=schemas.UserResponse)
def login(request: schemas.LoginRequest, db: Session = Depends(get_db)):
    # Query the database for the user
    user = db.query(models.User).filter(models.User.user_id == request.user_id).first()
    
    # Check if user exists and password matches (Note: Implement hashing later!)
    if not user or user.password != request.password:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials"
        )
    
    return user