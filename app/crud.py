from dateutil.relativedelta import relativedelta
from fastapi import HTTPException

from sqlalchemy import and_
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
  
from .models import Symptoms, Patient, PatientSymptoms, SMSNotif, VaccinationSched
from .schemas import PatientRequest, PatientResponse, PatientFilter, PatientUpdate, Contact, EventRequest, EventResponse
from datetime import datetime
from dateutil.relativedelta import relativedelta

def get_symptoms(db: Session):
    return db.query(Symptoms).all()




def get_patients(db: Session, p_filter: PatientFilter = None):
    query = db.query(Patient)

    # print(query.all())
    
    if p_filter == None:
        return query.all()

    if p_filter.barangay is not None:
        query = query.filter(Patient.barangay == p_filter.barangay)
    if p_filter.date_positive is not None:
        query = query.filter(Patient.date_positive == p_filter.date_positive)
    if p_filter.sex is not None:
        query = query.filter(Patient.sex == p_filter.sex)
    if p_filter.lowerAge is not None and p_filter.upperAge is not None:
        lower_date = datetime.now() - relativedelta(years=p_filter.upperAge)
        upper_date = datetime.now() - relativedelta(years=p_filter.lowerAge)
        
        query = query.filter(
            and_((Patient.birthday >= lower_date), 
            (Patient.birthday <= upper_date)))
    if p_filter.asymptomatic is not None:
        query = query.filter(Patient.asymptomatic == p_filter.asymptomatic)    
    if p_filter.status is not None:
        query = query.filter(Patient.status == p_filter.status)


    return query.all()


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


# update
def update_patient(db: Session, id: int, info: PatientUpdate):

    patient = db.query(Patient).filter(Patient.id == id).first()


    if info.status != None:
        patient.status = info.status
    if info.asymptomatic != None:
        patient.asymptomatic = info.asymptomatic
    # if info.symptoms != None:
    #     patient.symptoms = info.symptoms


    db.commit()
    # print(patient.status)

    return patient


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



def addSMSNotif(db:Session, access_token: str, subscriber_number: str):
    db_sms = SMSNotif(
        subscriber_number = subscriber_number,
        access_token = access_token
        )
    db.add(db_sms)
    db.commit()

    return db_sms


# def getUsers(db:Session):
#     return db.query(SMSNotif).all()



def getUsers(db:Session, contacted_filter: Contact):
    query = db.query(SMSNotif)
    # return query.all()


    if contacted_filter.contacted != None:
        query = query.filter(SMSNotif.already_contacted == contacted_filter.contacted)
        print(contacted_filter.contacted)
        print(SMSNotif)
        return query.all()

    else: return query.all()



def update_user(db:Session, id: int, already_contacted: bool):
    user = db.query(SMSNotif).filter(SMSNotif.id == id).first()

    if already_contacted != None:
        # user.already_contacted = True
        user.already_contacted = already_contacted

    db.commit()

    return user


def days_filter(db:Session):
    patients = db.query(Patient).all()

    for i in patients:
        print(i.created_at)
    # print(patients.created_at)
    return patients


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



# create
def create_event(db: Session, event: EventRequest):
    
    try:
        db_event = VaccinationSched(
            dose = event.dose,
            vaccine_type = event.vaccine_type,
            date = event.date,
            time = event.time,
            location = event.location,
            slots = event.slots,
            age = event.age
            )

        db.add(db_event)
        db.commit()

    except IntegrityError:
        db.rollback()
        raise HTTPException(status_code=401, detail="Some fields have constraints!")
    return db_event


def format_event(db_event: VaccinationSched):

    return EventResponse(
        id=db_event.id,
        dose = db_event.dose,
        vaccine_type = db_event.vaccine_type,
        date = db_event.date,
        time = db_event.time,
        location = db_event.location,
        slots = db_event.slots,
        age = db_event.age
        )

def get_events(db: Session):
    query = db.query(VaccinationSched)
    return query.all()
