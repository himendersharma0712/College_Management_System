from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import models
from database import engine
from routers import auth
from routers import students
from routers import teachers

# Create all tables in the database automatically
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="College Portal API")

# VERY IMPORTANT FOR REACT: CORS Configuration
# This allows your Vite frontend (port 5173) to talk to this backend (port 8000)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include your separated routes
app.include_router(auth.router)
app.include_router(students.router)
app.include_router(teachers.router)

@app.get("/")
def root():
    return {"message": "API is running. Go to /docs for Swagger UI."}