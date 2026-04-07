from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

# Make sure your XAMPP MySQL server is running!
# Format: mysql+pymysql://user:password@host:port/database_name
# Default XAMPP user is 'root' with no password.
SQLALCHEMY_DATABASE_URL = "mysql+pymysql://root:@localhost:3306/college_portal"

engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# Dependency to get the database session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()