from sqlalchemy.orm import Session

from .models import Symptoms
# from . import models, schemas


def get_symptoms(db: Session):
    return db.query(Symptoms).all()


# def create_user(db: Session, user: schemas.UserCreate):
#     fake_hashed_password = user.password + "notreallyhashed"
#     db_user = models.User(email=user.email, hashed_password=fake_hashed_password)
#     db.add(db_user)
#     db.commit()
#     db.refresh(db_user)
#     return db_user


# def get_items(db: Session, skip: int = 0, limit: int = 100):
#     return db.query(models.Item).offset(skip).limit(limit).all()


# def create_user_item(db: Session, item: schemas.ItemCreate, user_id: int):
#     db_item = models.Item(**item.dict(), owner_id=user_id)
#     db.add(db_item)
#     db.commit()
#     db.refresh(db_item)
#     return db_item


# Dagdagan mo na lang yung mga symptoms
def populate_symptoms(db: Session):
    symptoms = [
        "Headache",
        "Fever above 38 degrees",
        "Body pain",
        "Sneezing",
        "Sore throat",
        "Cold"
    ]

    # Delete everythin first
    db.query(Symptoms).delete()
    
    for i, symptom in enumerate(symptoms):
        db.add(Symptoms(id = i + 1, description=symptom))

    db.commit()
