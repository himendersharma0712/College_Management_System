from pydantic import BaseModel
from models import UserRole

# Schema for the incoming login request from React
class LoginRequest(BaseModel):
    user_id: str
    password: str

# Schema for the outgoing response back to React
class UserResponse(BaseModel):
    id: int
    user_id: str
    name: str
    role: UserRole

    class Config:
        from_attributes = True