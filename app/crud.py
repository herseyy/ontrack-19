from fastapi import HTTPException

from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
  
from .models import Symptoms, Patient, PatientSymptoms
from .schemas import PatientRequest, PatientResponse


def get_symptoms(db: Session):
    return db.query(Symptoms).all()


def get_patients(db: Session):
    return db.query(Patient).all()


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
        "Madaling Mapagod (Easy Fatigability)"
    ]

    # Delete everythin first
    db.query(Symptoms).delete()
    
    for i, symptom in enumerate(symptoms):
        db.add(Symptoms(id=i, description=symptom))

    db.commit()


# read
def get_patient_by_id(db: Session, id: int):
    return db.query(Patient).filter(Patient.id == id).first()


# create
def create_patients(db: Session, patient: PatientRequest):
    
    try:
        db_patient = Patient(
            date_positive = patient.date_positive,
            name = patient.name,
            birthday = patient.birthday,
            sex = patient.sex,
            barangay = patient.barangay,
            contact_number = patient.contact_number,
            asymptomatic = patient.asymptomatic,
            status = patient.status
            )

        db.add(db_patient)
        db.flush()

        for i in xxxx:
            db_symptoms = PatientSymptoms(
                symptom_id = i,
                patient_id = db_patient.id
            )
            db.add(db_symptoms)

        db.flush()
        db.commit()
    except IntegrityError:
        db.rollback()
        raise HTTPException(status_code=401, detail="Some fields have constraints!")

    return db_patient


def format_patient(db_patient: Patient):
    _symptoms = []

    for xxxx in xxxx:
        if xxxx is not None:
            _symptoms.append(xxxx)

    return PatientResponse(
        id=db_patient.id,
        name=db_patient.name,
        date_positive=db_patient.date_positive,
        birthday=db_patient.birthday,
        sex=db_patient.sex,
        barangay=db_patient.barangay,
        contact_number=db_patient.contact_number,
        asymptomatic=db_patient.asymptomatic,
        status=db_patient.status.value,
        symptoms=_symptoms
        )
