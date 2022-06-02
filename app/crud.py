from dateutil.relativedelta import relativedelta
from fastapi import HTTPException

from sqlalchemy import and_
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
  
from .models import Symptoms, Patient, PatientSymptoms, SMSNotif, VaccinationSched, User
from .schemas import PatientRequest, PatientResponse, PatientFilter, PatientUpdate, Contact, EventRequest, EventResponse, UserCreate
from datetime import datetime, date, timedelta
from dateutil.relativedelta import relativedelta



from jose import JWTError, jwt
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from passlib.context import CryptContext
# from datetime import datetime, timedelta
from typing import Optional

SECRET_KEY = "fee403330f70976be4d849c751a59d9760b3c13a3b7a0ca43ae38e9192db6ca3"
ALGORITHM = "HS256"

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password):
    return pwd_context.hash(password)


def get_user(db, username: str):
    return db.query(User).filter(User.username== username).first()

def create_user(db: Session, user: UserCreate):
    db_user = User(username=user.username,hashed_password=get_password_hash(user.password))
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def authenticate_user(fake_db, username: str, password: str):
    user = get_user(fake_db, username)
    if not user:
        return False
    if not verify_password(password, user.hashed_password):
        return False
    return user


def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt








def get_symptoms(db: Session):
    return db.query(Symptoms).all()

def getDays(date_positive):
    d0 = date_positive
    d1 = date.today()
    print(d0)
    print(d1)
    # delta = d1 - d0
    # print(delta.days)


def get_patients(db: Session, p_filter: PatientFilter = None):
    query = db.query(Patient)

    # print(query.all())
    # less_day = ''
    # greater_day = ''
    # date = db.query(Patient.date_positive).all()
    # for i in date:
    #     dict_ = i._asdict()
    #     val_list = list(dict_.values())
    #     for item in val_list:
    #         positive_date = item
    #         if 
    #         print(item)

    
    if p_filter == None:
        return query.all()

    if p_filter.barangay is not None:
        query = query.filter(Patient.barangay == p_filter.barangay)
    if p_filter.date_positive is not None:
        query = query.filter(Patient.date_positive == p_filter.date_positive)
    if p_filter.lowerDay is not None and p_filter.upperDay is not None:
        lower_day = datetime.now() - relativedelta(days=p_filter.upperDay)
        upper_day = datetime.now() - relativedelta(days=p_filter.lowerDay)
        print(lower_day)
        print(upper_day)
        query = query.filter(
            and_((Patient.date_positive > lower_day), 
            (Patient.date_positive <= upper_day)))
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
    # if info.asymptomatic != None:
    #     patient.asymptomatic = info.asymptomatic
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
