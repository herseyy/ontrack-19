"""
Main file
"""
import requests
import json

from fastapi import FastAPI, Request, Response, Depends, HTTPException, Form
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates


# EMAIL
# from fastapi import BackgroundTasks
# from send_email import send_email_background, send_email_async

from . import crud, models, schemas
from .database import SessionLocal, engine

# from .schemas import PatientRequest, PatientResponse
# from .models import Symptoms, Patient, PatientSymptoms


from pydantic import BaseModel

# Matic nagccreate na ng table
models.Base.metadata.create_all(bind=engine)
# Main app object
app = FastAPI()
app.mount("/static", StaticFiles(directory="static"), name="static")

origins = [
    "http://localhost.com",
    "https://localhost.tiangolo.com",
    "http://localhost",
    "http://localhost:8080",
    "http://127.0.0.1:8000",
    "*"
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


templates = Jinja2Templates(directory="pages")


# Wag mo muna tong pansinin, malilito ka lang
@app.middleware("http")
async def db_session_middleware(request: Request, call_next):
    response = Response("Internal server error", status_code=500)
    try:
        request.state.db = SessionLocal()
        response = await call_next(request)
    finally:
        request.state.db.close()
    return response


# Db dependency, get db
def get_db(request: Request):
    return request.state.db


def populate_table():
    db = SessionLocal()
    crud.populate_symptoms(db)
    db.close()

 
populate_table()


def send_sms(contact_info, access_token, shortcode):
    clientCorrelator = '1234'

    message = "Thank you for contacting Tayabas Covid Tracker, you will receive a call from our health officer shortly."
    url = "https://devapi.globelabs.com.ph/smsmessaging/v1/outbound/"+shortcode+"/requests"

    querystring = {"access_token": access_token}

    payload = "{\"outboundSMSMessageRequest\": { \"clientCorrelator\": \""+clientCorrelator+"\", \"senderAddress\": \""+shortcode+"\", \"outboundSMSTextMessage\": {\"message\": \""+message+"\"}, \"address\": \""+contact_info+"\" } }"

    headers = { 'Content-Type': "application/json", 'Host': "devapi.globelabs.com.ph" }

    response = requests.request("POST", url, data=payload, headers=headers, params=querystring)

    print(response.text)

    return response.text

# =======================================================================================
# EDIT CODE BELOW HERE
# 1 - Use /symptoms api call para makuha ung list ng symptoms
# 2 - Load list of symptoms sa html page
# 3 - Edit get_covid_form function
# =======================================================================================
@app.get("/")
def index():
    return {"hello": "world"}


# Ang ginagawa lang neto, sinasabe na yung response format ay galing sa schema na Symptoms
# Tapos yung function ay tatangap ng db object galing dun sa get_db function sa taas
@app.get("/symptoms", response_model=list[schemas.Symptoms])
def get_symptoms(db: Session = Depends(get_db)):
    # Pass db dun sa get_symptoms na function
    symptoms = crud.get_symptoms(db)
    return symptoms


@app.get("/patients/{patient_id}", response_model=schemas.PatientResponse, response_model_exclude={"name"})
def get_patients_by_id(patient_id:int, db:Session = Depends(get_db)):
    db_patient = crud.get_patient_by_id(db=db, id=patient_id)
    
    if db_patient is None:
        raise HTTPException(404, detail="User not found!")


    return crud.format_patient(db_patient)


# update
@app.patch("/update/{patient_id}")
def update(patient_id:int, info: schemas.PatientUpdate, db:Session = Depends(get_db)):
    db_patient = crud.update_patient(db=db, id=patient_id, info=info)
    
    if db_patient is None:
        raise HTTPException(404, detail="User not found!")

    # return crud.format_patient(db_patient)
    return crud.format_patient(db_patient)


@app.get("/patients", response_model=list[schemas.PatientResponse], response_model_exclude={"name"})
def read(db:Session = Depends(get_db)):
    patients = crud.get_patients(db)
    return [crud.format_patient(p) for p in patients]


# query parameterrrrr
@app.get("/filter", response_model=list[schemas.PatientResponse], response_model_exclude={"name", "contact_number", "symptoms"})
def filter(p_filter: schemas.PatientFilter = Depends(), db:Session = Depends(get_db)):
    patients = crud.get_patients(db, p_filter)
    return [crud.format_patient(p) for p in patients]


@app.delete("/patients/{patient_id}", response_model=list[schemas.PatientResponse], response_model_exclude={"name"})
def delete(patient_id: int, db:Session = Depends(get_db)):
    db_patient = crud.get_patient_by_id(db=db, id=patient_id)

    if db_patient is None:
        raise HTTPException(404, detail="User not found!")

    patients = models.Patient
    # db.query(patients).filter(patients.id == patient_id).delete()
    db.query(patients).delete()
    symptoms = models.PatientSymptoms
    # db.query(symptoms).filter(symptoms.patient_id == patient_id).delete()
    db.query(symptoms).delete()

    db.commit()

    remaining_patients = crud.get_patients(db)
    return [crud.format_patient(p) for p in remaining_patients]

@app.post("/submit_form", response_model=schemas.PatientResponse, response_model_exclude={"name"})
def get_covid_form(patient: schemas.PatientRequest, db: Session = Depends(get_db)):
    created_patient = crud.create_patients(db=db, patient=patient)
    return crud.format_patient(created_patient)



@app.get("/form", response_class=HTMLResponse)
async def submit(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})


@app.get("/results", response_class=HTMLResponse)
async def submit(request: Request):
    return templates.TemplateResponse("results.html", {"request": request})


@app.get("/day_filter")
def day_filter(db:Session = Depends(get_db)):
    users = crud.days_filter(db)

    return users
    


@app.get("/filter", response_model=list[schemas.PatientResponse], response_model_exclude={"name", "contact_number", "symptoms"})
def filter(p_filter: schemas.PatientFilter = Depends(), db:Session = Depends(get_db)):
    patients = crud.get_patients(db, p_filter)
    return [crud.format_patient(p) for p in patients]



@app.post("/sms_uri")
def sms_redirect(request: Request):
    print(request)


@app.get("/redirect_uri")
def redirect(access_token: str, subscriber_number: str, db:Session = Depends(get_db)):
    print(access_token)
    print(subscriber_number)
    shortcode = "21669460"


    send_sms(subscriber_number, access_token, shortcode)
    
    addSMSNotif = crud.addSMSNotif(db, access_token, subscriber_number)
    # db_sms = models.SMSNotif(
    #     subscriber_number = subscriber_number,
    #     access_token = access_token
    #     )

    # db.add(db_sms)
    # db.commit()
    return ""



@app.patch("/contacted/{user_id}")
def already_contacted(user_id:int, contacted: bool, db:Session = Depends(get_db)):
    db_user = crud.update_user(db=db, id=user_id, already_contacted = contacted)

    if db_user is None:
        raise HTTPException(404, detail="User not found!")

    return db_user



@app.post("/redirect_uri")
def redirect2():
    # addSMSNotif = crud.addSMSNotif(db = db, access_token = access_token, subscriber_number = subscriber_number)
    # print(addSMSNotif)
    return ""


@app.get("/user_numbers")
def getUserNumbers(db:Session = Depends(get_db)):
    users = crud.getUsers(db=db)

    return users



@app.get("/patients", response_model=list[schemas.PatientResponse], response_model_exclude={"name"})
def read(db:Session = Depends(get_db)):
    patients = crud.get_patients(db)
    return [crud.format_patient(p) for p in patients]





"""

curl -X POST
"https://devapi.globelabs.com.ph/smsmessaging/v1/outbound/9460/requests?access_token=qD9PzkdvoOVnmLTTojB2rrgowg_zh8TGz1zET7IfYDs" -H "Content-Type: application/json" -d
{"outboundSMSMessageRequest": {"clientCorrelator": "123456",




"senderAddress": "9460",
"outboundSMSTextMessage": {"message": "Hello World"},
"address": "9175247735"
 }
}


"""