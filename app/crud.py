from fastapi import HTTPException

from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
  
from .models import Symptoms, Patient, PatientSymptoms
from .schemas import PatientRequest, PatientResponse, PatientFilter
from datetime import datetime
from dateutil.relativedelta import relativedelta

def get_symptoms(db: Session):
    return db.query(Symptoms).all()





def get_patients(db: Session, p_filter: PatientFilter = None):
    query = db.query(Patient)

    if p_filter == None:
        return query.all()

    if p_filter.barangay is not None:
        query = query.filter(Patient.barangay == p_filter.barangay)
    # print(type(p_filter.date_positive))
    if p_filter.date_positive is not None:
        query = query.filter(Patient.date_positive == p_filter.date_positive)
    if p_filter.sex is not None:
        query = query.filter(Patient.sex == p_filter.sex)
    if p_filter.lowerAge is not None:

    if p_filter.upperAge is not None:
        
    if p_filter.asymptomatic is not None:
        query = query.filter(Patient.asymptomatic == p_filter.asymptomatic)    
    if p_filter.status is not None:
        query = query.filter(Patient.status == p_filter.status)


    return query.all()


# Dagdagan mo na lang yung mga symptoms
def populate_symptoms(db: Session):
    symptoms = [
        "None",
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
            name = patient.name,
            date_positive = patient.date_positive,
            birthday = patient.birthday,
            sex = patient.sex,
            barangay = patient.barangay,
            contact_number = patient.contact_number,
            asymptomatic = patient.asymptomatic,
            status = patient.status
            )

        db.add(db_patient)
        db.flush()
        # print(patient.symptoms)

        for i in patient.symptoms:
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

    symptoms = db_patient.symptoms
    # print(symptoms)

    for i in symptoms:
        if symptoms is not None:
            _symptoms.append(i.description)
    # print(_symptoms) 


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

