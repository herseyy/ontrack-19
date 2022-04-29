from sqlalchemy.orm import Session
  
from .models import Symptoms
from . import models, schemas


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
        "Ubo (Cough)",
        "Sipon (Colds)",
        "Pagkawala ng Panlasa (Loss of Taste)",
        "Pagkawala ng Pang-amoy (Loss of Smell)",
        "Pagtatae (Diarrhea)",
        "Masakit na lalamunan (Sore Throat)",
        "Panghihina ng Katawan (Body Malaise)",
        "Masakit ang Ulo (Headache)",
        "Lagnat 37.5 C Pataas (Fever)",
        "Hirap sa Paghinga (Difficulty of Breathing)",
        "Madaling Mapagod (Easy Fatigability)",
    ]

    # Delete everythin first
    db.query(Symptoms).delete()
    
    for i, symptom in enumerate(symptoms):
        db.add(Symptoms(id = i + 1, description=symptom))

    db.commit()


# read
def get_patient_by_id(db: Session, id: int):
    return db.query(models.Patient).filter(models.Patient.id == id).first()

# def get_user_by_email(db: Session, email: str):
#     return db.query(models.User).filter(models.User.email == email).first()


# create
def create_patients(db: Session, patient: schemas.PatientRequest):
    db_patient = models.Patient(
        date_positive = patient.date_positive,
        birthday = patient.birthday,
        # sex = patient.sex,
        barangay = patient.barangay,
        contact_number = patient.contact_number,
        asymptomatic = patient.asymptomatic,
        status = patient.status
        # created_at = patient.created_at,
        # updated_at = patient.updated_at
        )

    db.add(db_patient)
    db.commit()
    db.refresh(db_patient)
    return db_patient
