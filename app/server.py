"""
Main file
"""
import secrets

import requests
import json


from fastapi import FastAPI, Request, Response, Depends, HTTPException, Form, status
from fastapi.security import HTTPBasic, HTTPBasicCredentials, OAuth2PasswordBearer, OAuth2PasswordRequestForm
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from fastapi.responses import HTMLResponse, RedirectResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates


from fastapi.openapi.docs import get_redoc_html, get_swagger_ui_html
from fastapi.openapi.utils import get_openapi


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
# app = FastAPI()
app = FastAPI(
    title="FastAPI",
    version="0.1.0",
    docs_url=None,
    redoc_url=None,
    openapi_url = None,
)
security = HTTPBasic()

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



# def get_current_username(credentials: HTTPBasicCredentials = Depends(security)):
#     correct_username = secrets.compare_digest(credentials.username, "user")
#     correct_password = secrets.compare_digest(credentials.password, "pass")
#     if not (correct_username and correct_password):
#         raise HTTPException(
#             status_code=status.HTTP_401_UNAUTHORIZED,
#             detail="Incorrect email or password",
#             headers={"WWW-Authenticate": "Basic"},
#         )
#     return credentials.username


# @app.get("/docs")
# async def get_documentation(username: str = Depends(get_current_username)):
#     return get_swagger_ui_html(openapi_url="/openapi.json", title="docs")


# @app.get("/openapi.json")
# async def openapi(username: str = Depends(get_current_username)):
#     return get_openapi(title = "FastAPI", version="0.1.0", routes=app.routes)

def get_current_username(credentials: HTTPBasicCredentials = Depends(security)):
    correct_username = secrets.compare_digest(credentials.username, "secret")
    correct_password = secrets.compare_digest(credentials.password, "secret")
    if not (correct_username and correct_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Basic"},
        )
    return credentials.username


@app.get("/docs", include_in_schema=False)
async def get_swagger_documentation(username: str = Depends(get_current_username)):
    return get_swagger_ui_html(openapi_url="/openapi.json", title="docs")


@app.get("/redoc", include_in_schema=False)
async def get_redoc_documentation(username: str = Depends(get_current_username)):
    return get_redoc_html(openapi_url="/openapi.json", title="docs")


@app.get("/openapi.json", include_in_schema=False)
async def openapi(username: str = Depends(get_current_username)):
    return get_openapi(title=app.title, version=app.version, routes=app.routes)

@app.get("/users/me")
def read_current_user(username: str = Depends(get_current_username)):
    return {"username": username}








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


@app.get("/symptoms", response_model=list[schemas.Symptoms])
def get_symptoms(db: Session = Depends(get_db)):
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
def update(patient_id:int, info: schemas.PatientUpdate, username: str = Depends(get_current_username), db:Session = Depends(get_db)):
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

@app.get("/filter_update", response_model=list[schemas.PatientResponse], response_model_exclude={"name", "symptoms"})
def filter(p_filter: schemas.PatientFilter = Depends(), db:Session = Depends(get_db)):
    patients = crud.get_patients(db, p_filter)
    return [crud.format_patient(p) for p in patients]


@app.delete("/patients/{patient_id}", response_model=list[schemas.PatientResponse], response_model_exclude={"name"})
def delete(patient_id: int, db:Session = Depends(get_db)):
    db_patient = crud.get_patient_by_id(db=db, id=patient_id)

    if db_patient is None:
        raise HTTPException(404, detail="User not found!")

    patients = models.Patient
    db.query(patients).filter(patients.id == patient_id).delete()
    # db.query(patients).delete()
    symptoms = models.PatientSymptoms
    db.query(symptoms).filter(symptoms.patient_id == patient_id).delete()
    # db.query(symptoms).delete()

    db.commit()

    remaining_patients = crud.get_patients(db)
    # return ""
    return [crud.format_patient(p) for p in remaining_patients]


@app.delete("/patientsall/{patient_id}", response_model=list[schemas.PatientResponse], response_model_exclude={"name"})
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
def get_covid_form(patient: schemas.PatientRequest, username: str = Depends(get_current_username), db: Session = Depends(get_db)):
    created_patient = crud.create_patients(db=db, patient=patient)
    return crud.format_patient(created_patient)


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
    return ""


@app.post("/redirect_uri")
def redirect2():
    # addSMSNotif = crud.addSMSNotif(db = db, access_token = access_token, subscriber_number = subscriber_number)
    # print(addSMSNotif)
    return ""



@app.patch("/contacted/{user_id}")
def already_contacted(user_id:int, contacted: bool, username: str = Depends(get_current_username), db:Session = Depends(get_db)):
    # print(user)
    db_user = crud.update_user(db=db, id=user_id, already_contacted = contacted)

    if db_user is None:
        raise HTTPException(404, detail="User not found!")
    print(db_user.already_contacted)
    return db_user
    # return "asd"


@app.get("/user_numbers")
def getUserNumbers(contacted_filter: schemas.Contact = Depends(), db:Session = Depends(get_db)):
    users = crud.getUsers(db=db, contacted_filter=contacted_filter)

    return users


@app.post("/event_form", response_model=schemas.EventResponse)
def event_form(event: schemas.EventRequest, username: str = Depends(get_current_username), db: Session = Depends(get_db)):
    created_event = crud.create_event(db=db, event=event)
    return crud.format_event(created_event)


@app.get("/events", response_model=list[schemas.EventResponse])
def get_events(db:Session = Depends(get_db)):
    events = crud.get_events(db)
    return [crud.format_event(e) for e in events]

@app.delete("/events_delete")
def get_events(db:Session = Depends(get_db)):
    events = models.VaccinationSched

    #     patients = models.Patient
    # # db.query(patients).filter(patients.id == patient_id).delete()
    # db.query(patients).delete()

    db.query(events).delete()

    db.commit()

    return ''


@app.delete("/user_delete")
def get_events(db:Session = Depends(get_db)):
    users = models.User

    #     patients = models.Patient
    # # db.query(patients).filter(patients.id == patient_id).delete()
    # db.query(patients).delete()

    db.query(users).delete()

    db.commit()

    return ''



# PUBLIC
@app.get("/", response_class=HTMLResponse)
async def submit(request: Request):
    return templates.TemplateResponse("public/front.html", {"request": request})

@app.get("/announcements", response_class=HTMLResponse)
async def about(request: Request):
    return templates.TemplateResponse("public/announcement.html", {"request": request})

@app.get("/results", response_class=HTMLResponse)
async def submit(request: Request):
    return templates.TemplateResponse("public/results.html", {"request": request})

@app.get("/more", response_class=HTMLResponse)
async def more(request:Request):
    return templates.TemplateResponse("public/more.html", {"request": request})

@app.get("/about_us", response_class=HTMLResponse)
async def more(request:Request):
    return templates.TemplateResponse("public/about.html", {"request": request})

@app.get("/reference", response_class=HTMLResponse)
async def more(request:Request):
    return templates.TemplateResponse("public/reference.html", {"request": request})

@app.get("/pass", response_class=HTMLResponse)
async def more(request:Request):
    return templates.TemplateResponse("public/pass.html", {"request": request})



# PRIVATE
@app.get("/form", response_class=HTMLResponse)
async def submit(request: Request, username: str = Depends(get_current_username)):
    return templates.TemplateResponse("private/index.html", {"request": request})

@app.get("/form_event", response_class=HTMLResponse)
async def form_event(request:Request, username: str = Depends(get_current_username)):
    return templates.TemplateResponse("private/event.html", {"request": request})
    
@app.get("/users_no", response_class=HTMLResponse)
async def submit(request: Request, username: str = Depends(get_current_username)):
    return templates.TemplateResponse("private/users_to_contact.html", {"request": request})

@app.get("/results_update", response_class=HTMLResponse)
async def submit(request: Request, username: str = Depends(get_current_username)):
    return templates.TemplateResponse("private/results_update.html", {"request": request})

















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